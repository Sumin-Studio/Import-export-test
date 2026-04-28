import {
  getEngagementStore,
  saveEngagementStore,
  getChaseStore,
  saveChaseStore,
  getToken,
} from "@/lib/store";
import type { ScanResult } from "@/lib/store";
import {
  getTemplatesForEngagementType,
  type ExpectedItemTemplate,
} from "@/lib/engagement-templates";

export type EngagementType = "ANNUAL_TAX" | "BOOKKEEPING_MONTHLY";
export type ReadinessStatus = "NOT_STARTED" | "WAITING_ON_CLIENT" | "READY";

export interface Engagement {
  id: string;
  clientId: string;
  type: EngagementType;
  label: string;
  readinessStatus: ReadinessStatus;
  completenessPercent: number;
  missingItemCount: number;
  updatedAt: string;
}

export type ExpectedItemStatus = "NOT_RECEIVED" | "RECEIVED" | "WAIVED";

export interface ExpectedItemInstance {
  id: string;
  clientId: string;
  engagementId: string;
  templateId: string;
  status: ExpectedItemStatus;
  matchedFilePaths: string[];
  lastUpdatedAt: string;
}

export interface EngagementStore {
  engagements: Engagement[];
  expectedItems: ExpectedItemInstance[];
}

const DEFAULT_ANNUAL_TAX_LABEL = "Annual Tax (Default)";

function ensureDefaultEngagement(
  store: EngagementStore,
  clientId: string
): Engagement {
  const existing = store.engagements.find(
    (e) => e.clientId === clientId && e.type === "ANNUAL_TAX"
  );
  if (existing) return existing;
  const id = `eng-${clientId}-annual`;
  const engagement: Engagement = {
    id,
    clientId,
    type: "ANNUAL_TAX",
    label: DEFAULT_ANNUAL_TAX_LABEL,
    readinessStatus: "NOT_STARTED",
    completenessPercent: 0,
    missingItemCount: 0,
    updatedAt: new Date().toISOString(),
  };
  store.engagements.push(engagement);
  return engagement;
}

function ensureExpectedItemInstances(
  store: EngagementStore,
  engagement: Engagement,
  templates: ExpectedItemTemplate[]
): ExpectedItemInstance[] {
  const instances: ExpectedItemInstance[] = [];
  for (const template of templates) {
    const existing = store.expectedItems.find(
      (ei) =>
        ei.clientId === engagement.clientId &&
        ei.engagementId === engagement.id &&
        ei.templateId === template.id
    );
    if (existing) {
      instances.push(existing);
    } else {
      const ei: ExpectedItemInstance = {
        id: `ei-${engagement.clientId}-${engagement.id}-${template.id}`,
        clientId: engagement.clientId,
        engagementId: engagement.id,
        templateId: template.id,
        status: "NOT_RECEIVED",
        matchedFilePaths: [],
        lastUpdatedAt: new Date().toISOString(),
      };
      store.expectedItems.push(ei);
      instances.push(ei);
    }
  }
  return instances;
}

/** Map classified file category to ANNUAL_TAX template id. */
function categoryToTemplateId(category: string): string | null {
  if (category === "Tax Documents") return "ANNUAL_TAX_1099";
  if (category === "Bank Statements") return "ANNUAL_TAX_BANK_STATEMENTS";
  return null;
}

/**
 * After a successful scan, update engagement readiness: ensure default ANNUAL_TAX
 * engagement and expected item instances, match classified files to items, compute
 * completeness and readiness status, and persist.
 */
export function updateEngagementReadinessFromScan(
  clientId: string,
  scanResult: ScanResult
): void {
  const store = getEngagementStore();
  const templates = getTemplatesForEngagementType("ANNUAL_TAX");
  const engagement = ensureDefaultEngagement(store, clientId);
  const instances = ensureExpectedItemInstances(store, engagement, templates);

  const now = new Date().toISOString();
  const templateIdToInstance = new Map(instances.map((ei) => [ei.templateId, ei]));

  for (const instance of instances) {
    instance.matchedFilePaths = [];
    instance.status = "NOT_RECEIVED";
    instance.lastUpdatedAt = now;
  }

  for (const file of scanResult.files) {
    const templateId = categoryToTemplateId(file.category);
    if (!templateId) continue;
    const instance = templateIdToInstance.get(templateId);
    if (!instance) continue;
    if (!instance.matchedFilePaths.includes(file.path_display)) {
      instance.matchedFilePaths.push(file.path_display);
    }
    instance.status = "RECEIVED";
    instance.lastUpdatedAt = now;
    console.log(
      "[engagement-readiness] Matched file to expected item:",
      { clientId, path: file.path_display, category: file.category, templateId }
    );
  }

  const total = instances.length;
  let receivedOrWaived = instances.filter(
    (ei) => ei.status === "RECEIVED" || ei.status === "WAIVED"
  ).length;
  let missing = instances.filter((ei) => ei.status === "NOT_RECEIVED").length;
  let completenessPercent = total === 0 ? 100 : Math.round((receivedOrWaived / total) * 100);

  const isDemo = getToken(clientId)?.isDemo === true;
  // Demo storage never reaches "ready": keep at least one open item so the chasing-agent setup UI stays available.
  if (isDemo && missing === 0 && total > 0) {
    const bank = templateIdToInstance.get("ANNUAL_TAX_BANK_STATEMENTS");
    const toClear =
      bank?.status === "RECEIVED"
        ? bank
        : instances.find((ei) => ei.status === "RECEIVED");
    if (toClear) {
      toClear.status = "NOT_RECEIVED";
      toClear.matchedFilePaths = [];
      toClear.lastUpdatedAt = now;
    }
    receivedOrWaived = instances.filter(
      (ei) => ei.status === "RECEIVED" || ei.status === "WAIVED"
    ).length;
    missing = instances.filter((ei) => ei.status === "NOT_RECEIVED").length;
    completenessPercent = total === 0 ? 100 : Math.round((receivedOrWaived / total) * 100);
  }

  engagement.completenessPercent = completenessPercent;
  engagement.missingItemCount = missing;
  engagement.updatedAt = now;
  if (isDemo) {
    engagement.readinessStatus =
      receivedOrWaived === 0 ? "NOT_STARTED" : "WAITING_ON_CLIENT";
  } else if (receivedOrWaived === 0) {
    engagement.readinessStatus = "NOT_STARTED";
  } else if (receivedOrWaived < total) {
    engagement.readinessStatus = "WAITING_ON_CLIENT";
  } else {
    engagement.readinessStatus = "READY";
  }

  saveEngagementStore(store);

  if (!isDemo) {
    // Mark chase plans as RESOLVED when all expectedItemIds are now RECEIVED or WAIVED
    const chaseStore = getChaseStore();
    const receivedOrWaivedIds = new Set(
      store.expectedItems
        .filter((ei) => ei.status === "RECEIVED" || ei.status === "WAIVED")
        .map((ei) => ei.id)
    );
    let chaseUpdated = false;
    for (const plan of chaseStore.chasePlans) {
      if (plan.clientId !== clientId || plan.engagementId !== engagement.id) continue;
      if (plan.status !== "SENT") continue;
      const allResolved = plan.expectedItemIds.every((id) => receivedOrWaivedIds.has(id));
      if (allResolved) {
        plan.status = "RESOLVED";
        plan.updatedAt = now;
        chaseUpdated = true;
        console.log("[engagement-readiness] Chase plan marked RESOLVED:", {
          clientId,
          engagementId: plan.engagementId,
          planId: plan.id,
        });
      }
    }
    if (chaseUpdated) saveChaseStore(chaseStore);
  }
}

/**
 * Reset engagement and chase status for a client when they disconnect,
 * so status shows NOT_STARTED / 0% until they reconnect and scan again.
 */
export function resetClientStatusOnDisconnect(clientId: string): void {
  const store = getEngagementStore();
  store.engagements = store.engagements.filter((e) => e.clientId !== clientId);
  store.expectedItems = store.expectedItems.filter((ei) => ei.clientId !== clientId);
  saveEngagementStore(store);
  const chaseStore = getChaseStore();
  chaseStore.chasePlans = chaseStore.chasePlans.filter((p) => p.clientId !== clientId);
  saveChaseStore(chaseStore);
}
