import { NZ_TAX_INSIGHT_WIDGET_IDS } from "@/app/lib/nzDashboardCanonical";
import { TAX_BETA_WIDGET_IDS } from "@/app/lib/taxBetaWidgetIds";

const STORAGE_KEY = "xph-dashboard-widget-order-tax-only-v1";

export function loadTaxOnlyWidgetOrder(region: string): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_KEY}:${region}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.every((x) => typeof x === "string")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveTaxOnlyWidgetOrder(region: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      `${STORAGE_KEY}:${region}`,
      JSON.stringify(ids)
    );
  } catch {
    // ignore
  }
}

export function clearTaxOnlyWidgetOrder(region: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(`${STORAGE_KEY}:${region}`);
  } catch {
    // ignore
  }
}

/**
 * NZ tax-only canonical order — core row (Tax alerts, Tax returns, Returns by month), then
 * Lodgements / optional tiles. NZ insight tiles append after this list when they are allowed
 * on the grid (GA or revealed NZ Tailor); see {@link NZ_TAX_INSIGHT_WIDGET_IDS}.
 */
export const NZ_TAX_ONLY_BETA_ORDER: readonly string[] = [
  "tax-alerts-compact",
  "returns-by-status",
  "returns-by-month-line",
  "lodgements",
  "annual-tax-returns",
  "return-by-type",
];

/**
 * AU tax-only grid: compact Tax alerts, Income tax returns, Activity statements, Lodgements.
 */
export const AU_TAX_ONLY_BETA_ORDER: readonly string[] = [
  "tax-alerts-compact",
  "returns-by-status",
  "activity-statements",
  "lodgements",
];

/** US practice overview: compact alerts, economic nexus map, and 1099 workload (no income-tax return widgets). */
export const USA_TAX_ONLY_BETA_ORDER: readonly string[] = [
  "tax-alerts-compact",
  "us-economic-nexus-insights",
  "us-1099-returns-pipeline",
];

/**
 * Tax-only mode: NZ and AU use fixed beta orders; other regions keep beta ids in build order.
 */
function defaultTaxOnlyVisibleIds(
  sortedWidgetIdsForRegion: string[],
  taxOnlyVisibleIds?: Set<string>
): Set<string> {
  return (
    taxOnlyVisibleIds ??
    new Set(
      sortedWidgetIdsForRegion.filter((id) => TAX_BETA_WIDGET_IDS.has(id))
    )
  );
}

export function normalizeTaxOnlyWidgetOrder(
  region: string,
  orderedIds: string[],
  sortedWidgetIdsForRegion: string[],
  taxOnlyVisibleIds?: Set<string>
): string[] {
  const allowed = defaultTaxOnlyVisibleIds(
    sortedWidgetIdsForRegion,
    taxOnlyVisibleIds
  );
  if (region === "NZ") {
    const present = new Set(orderedIds);
    const core = NZ_TAX_ONLY_BETA_ORDER.filter(
      (id) => present.has(id) && allowed.has(id)
    );
    const insights = NZ_TAX_INSIGHT_WIDGET_IDS.filter(
      (id) => present.has(id) && allowed.has(id)
    );
    return [...core, ...insights];
  }
  if (region === "AU") {
    const present = new Set(orderedIds);
    return AU_TAX_ONLY_BETA_ORDER.filter(
      (id) => present.has(id) && allowed.has(id)
    );
  }
  if (region === "USA") {
    /** Always surface the full US tax-only set when allowed; do not drop new tiles when saved order predates them. */
    return USA_TAX_ONLY_BETA_ORDER.filter((id) => allowed.has(id));
  }
  return orderedIds.filter((id) => allowed.has(id));
}

/** Preserve relative order of beta widgets from a full visible order; append any missing betas in region order. */
export function buildTaxOnlyOrderFromFullOrder(
  region: string,
  fullVisibleOrder: string[],
  sortedWidgetIdsForRegion: string[],
  taxOnlyVisibleIds?: Set<string>
): string[] {
  const allowed = defaultTaxOnlyVisibleIds(
    sortedWidgetIdsForRegion,
    taxOnlyVisibleIds
  );
  const betaSet = new Set(
    sortedWidgetIdsForRegion.filter((id) => allowed.has(id))
  );
  const ordered: string[] = [];
  for (const id of fullVisibleOrder) {
    if (betaSet.has(id)) ordered.push(id);
  }
  for (const id of sortedWidgetIdsForRegion) {
    if (betaSet.has(id) && !ordered.includes(id)) ordered.push(id);
  }
  return normalizeTaxOnlyWidgetOrder(
    region,
    ordered,
    sortedWidgetIdsForRegion,
    taxOnlyVisibleIds
  );
}
