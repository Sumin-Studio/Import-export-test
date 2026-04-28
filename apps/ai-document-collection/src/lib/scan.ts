import {
  getToken,
  getScanResult,
  setScanResult,
  syncStoreFromPersistence,
  persistStoreToBackend,
} from "@/lib/store";
import { listFolderFiles } from "@/lib/dropbox";
import { listDemoFolderFilesRecursive } from "@/lib/demo-storage";
import { classifyDocument, classifyFromFilenameOnly, isAccountingCategory } from "@/lib/ollama";
import { getClassificationPreview } from "@/lib/content-extract";
import { getAgentConfig } from "@/lib/agent-config";
import { linkDocumentsToXero } from "@/lib/xero-linking";
import { updateEngagementReadinessFromScan } from "@/lib/engagements";
import type { ClassifiedFile, ScanResult } from "@/lib/store";
import type { DropboxEntry } from "@/lib/dropbox";

// Scan is invoked from: (1) POST /api/clients/[clientId]/scan — fullRescan (reclassify all files),
// (2) POST /api/scan-all — fullRescan per client, (3) connect folder POST — incremental (new paths only).
// path_display from Dropbox is stored on each ClassifiedFile in ScanResult.files (see store.ts).
const SCAN_CONCURRENCY = 20;

/** Process items in parallel with a concurrency limit. */
async function processBatch<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;
  async function worker(): Promise<void> {
    while (index < items.length) {
      const i = index++;
      const item = items[i];
      if (!item) continue;
      try {
        const result = await fn(item);
        results[i] = result;
      } catch {
        // leave results[i] undefined; caller can handle
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

export type RunScanOptions = {
  /** When true (e.g. user clicked "Run agent scan"), reclassify every file in the folder. */
  fullRescan?: boolean;
};

export async function runScanForClient(
  clientId: string,
  options?: RunScanOptions
): Promise<ScanResult | null> {
  await syncStoreFromPersistence();
  const connection = getToken(clientId);
  if (!connection) return null;

  try {
  const fullRescan = options?.fullRescan ?? false;

  const folderPath =
    connection.folderPath === ""
      ? ""
      : connection.folderPath.startsWith("/")
        ? connection.folderPath
        : `/${connection.folderPath}`;

  const log: string[] = [];
  let files: ClassifiedFile[] = [];
  let previousResult: ScanResult | null = getScanResult(clientId);

  try {
    if (connection.isDemo) {
      log.push("Demo storage — simulated Dropbox folder (no cloud account).");
    } else {
      log.push("Connecting to Dropbox…");
    }
    log.push(`Scanning folder "${folderPath || "/"}…`);

    const entries = connection.isDemo
      ? listDemoFolderFilesRecursive(folderPath)
      : await listFolderFiles(connection.accessToken, folderPath);
    const currentPaths = entries.map((e) => e.path_display);
    const lastSeen = new Set(previousResult?.lastSeenPaths ?? []);
    const newEntries = entries.filter((e) => !lastSeen.has(e.path_display));
    const isInitialScan = lastSeen.size === 0;

    if (fullRescan) {
      log.push(`Found ${entries.length} files (full rescan — reclassifying all).`);
    } else if (isInitialScan) {
      log.push(`Found ${entries.length} files (initial scan).`);
    } else {
      log.push(`Found ${entries.length} files, ${newEntries.length} new since last scan.`);
    }

    if (!fullRescan && newEntries.length === 0) {
      log.push("No new files to classify.");
      const currentSet = new Set(currentPaths);
      const filesStillInFolder = (previousResult?.files ?? [])
        .filter((f) => currentSet.has(f.path_display))
        .filter((f) => isAccountingCategory(f.category));
      const result: ScanResult = {
        log,
        files: filesStillInFolder,
        scannedAt: new Date().toISOString(),
        lastSeenPaths: currentPaths,
      };
      setScanResult(clientId, result);
      updateEngagementReadinessFromScan(clientId, result);
      return result;
    }

    const { maxFilesPerScan, useContentForClassification } = getAgentConfig();
    const sourceEntries = fullRescan ? entries : newEntries;
    const toProcess =
      maxFilesPerScan > 0 ? sourceEntries.slice(0, maxFilesPerScan) : sourceEntries;
    if (maxFilesPerScan > 0 && sourceEntries.length > maxFilesPerScan)
      log.push(`Processing first ${maxFilesPerScan} of ${sourceEntries.length} files.`);

    const classified = await processBatch<DropboxEntry, ClassifiedFile | null>(
      toProcess,
      SCAN_CONCURRENCY,
      async (entry) => {
        log.push(`Classifying ${entry.name}…`);
        try {
          // Fast path: if filename alone determines category, skip content fetch and Ollama.
          const fastResult = classifyFromFilenameOnly(entry.name);
          if (fastResult) {
            log.push(`Categorized ${entry.name} → ${fastResult.category} (filename)`);
            return {
              name: entry.name,
              path_display: entry.path_display,
              category: fastResult.category,
              confidence: fastResult.confidence,
              lowConfidenceReason: fastResult.lowConfidenceReason,
              reason: fastResult.reason,
            };
          }
          const textPreview =
            !connection.isDemo && useContentForClassification
              ? await getClassificationPreview(
                  connection.accessToken,
                  entry.path_display,
                  entry.name
                )
              : undefined;
          const { category, confidence, lowConfidenceReason, reason } = await classifyDocument(
            entry.name,
            textPreview
          );
          log.push(`Categorized ${entry.name} → ${category}`);
          return {
            name: entry.name,
            path_display: entry.path_display,
            category,
            confidence,
            lowConfidenceReason,
            reason,
          };
        } catch {
          log.push(`Failed to classify ${entry.name}, marked as Other`);
          return {
            name: entry.name,
            path_display: entry.path_display,
            category: "Other",
            confidence: 0,
          };
        }
      }
    );

    for (const f of classified) {
      if (f && isAccountingCategory(f.category)) files.push(f);
    }
    const excluded = classified.filter((f) => f && !isAccountingCategory(f!.category)).length;
    if (excluded > 0) log.push(`Excluded ${excluded} file(s) not related to accounting and bookkeeping work.`);

    log.push(
      fullRescan
        ? `Scan complete. ${files.length} file(s) reclassified.`
        : `Scan complete. ${files.length} new file(s) indexed.`
    );
    const linkedFiles = linkDocumentsToXero(clientId, files);
    log.push("Linked documents to Xero (invoices, bills, bank txns, jobs).");

    const currentSet = new Set(currentPaths);
    let mergedFiles: ClassifiedFile[];
    if (fullRescan) {
      mergedFiles = linkedFiles.filter((f) => currentSet.has(f.path_display));
    } else {
      const previousFiles = previousResult?.files ?? [];
      const byPath = new Map(previousFiles.map((f) => [f.path_display, f]));
      for (const f of linkedFiles) byPath.set(f.path_display, f);
      mergedFiles = Array.from(byPath.values())
        .filter((f) => currentSet.has(f.path_display))
        .filter((f) => isAccountingCategory(f.category));
    }

    const result: ScanResult = {
      log,
      files: mergedFiles,
      scannedAt: new Date().toISOString(),
      lastSeenPaths: currentPaths,
    };
    setScanResult(clientId, result);
    updateEngagementReadinessFromScan(clientId, result);
    return result;
  } catch (e) {
    console.error("Scan error:", e);
    log.push(`Error: ${e instanceof Error ? e.message : "Scan failed"}`);
    const linkedFiles = linkDocumentsToXero(clientId, files);
    const previousFiles = previousResult?.files ?? [];
    const byPath = new Map(previousFiles.map((f) => [f.path_display, f]));
    for (const f of linkedFiles) byPath.set(f.path_display, f);
    const mergedFiles = Array.from(byPath.values()).filter((f) =>
      isAccountingCategory(f.category)
    );
    const result: ScanResult = {
      log,
      files: mergedFiles,
      scannedAt: new Date().toISOString(),
      lastSeenPaths: previousResult?.lastSeenPaths,
    };
    setScanResult(clientId, result);
    updateEngagementReadinessFromScan(clientId, result);
    return result;
  }
  } finally {
    await persistStoreToBackend();
  }
}
