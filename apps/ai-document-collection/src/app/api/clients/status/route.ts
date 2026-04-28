import { NextResponse } from "next/server";
import { clients } from "@/data/clients";

export const dynamic = "force-dynamic";
import {
  getToken,
  getScanResult,
  getEngagementStore,
  syncStoreFromPersistence,
} from "@/lib/store";

export async function GET() {
  await syncStoreFromPersistence();
  const engagementStore = getEngagementStore();
  const status: Record<
    string,
    {
      connected: boolean;
      folderPath?: string;
      lastScanAt?: string | null;
      docsReadinessStatus?: string;
      docsCompletenessPercent?: number;
      /** Only set when connected (e.g. "Dropbox"); unknown until then. */
      storageSource?: string | null;
    }
  > = {};

  for (const client of clients) {
    const connection = getToken(client.id);
    const scan = getScanResult(client.id);
    const engagement = connection
      ? engagementStore.engagements.find(
          (e) => e.clientId === client.id && e.type === "ANNUAL_TAX"
        )
      : null;
    let docsReadinessStatus = connection
      ? (engagement?.readinessStatus ?? "NOT_STARTED")
      : "NOT_STARTED";
    if (connection?.isDemo && docsReadinessStatus === "READY") {
      docsReadinessStatus = "WAITING_ON_CLIENT";
    }
    status[client.id] = {
      connected: !!connection,
      folderPath: connection?.folderPath,
      lastScanAt: scan?.scannedAt ?? null,
      docsReadinessStatus,
      docsCompletenessPercent: connection
        ? (engagement?.completenessPercent ?? 0)
        : 0,
      storageSource: connection
        ? connection.isDemo
          ? "Dropbox (demo)"
          : "Dropbox"
        : null,
    };
  }

  return NextResponse.json(status);
}
