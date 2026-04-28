import {
  DEFAULT_TAX_ACTION_PANEL,
  mergeTaxActionPanels,
  TAX_ACTION_PANELS,
  type TaxActionPanelDetail,
} from "@/app/lib/taxActionsPanelContent";
import {
  getTaxAiActionsByTab,
  type TaxAiActionTabId,
} from "@/app/lib/taxAlertsAiTileContent";

type AggCategory = "tax" | "payroll" | "insights" | "bookkeeping";

const AGG_GROUP_TITLE: Record<AggCategory, string> = {
  tax: "Tax actions to review",
  payroll: "Payroll actions to review",
  insights: "Insights",
  bookkeeping: "Bookkeeping actions to review",
};

function regionToAggKey(region: string): string {
  switch (region) {
    case "NZ":
      return "nz";
    case "AU":
      return "au";
    case "UK":
      return "uk";
    case "USA":
      return "us";
    default:
      return "row";
  }
}

/**
 * Sidebar body for Actions: single alert panels by id, or merged lists for
 * `nz-agg-tax` style aggregate ids from the widget.
 */
export function getTaxActionSidebarDetail(
  id: string | null | undefined,
  region: string
): TaxActionPanelDetail {
  if (!id) {
    return DEFAULT_TAX_ACTION_PANEL;
  }
  if (TAX_ACTION_PANELS[id]) {
    return TAX_ACTION_PANELS[id];
  }

  const rk = regionToAggKey(region);
  const m = id.match(
    /^(nz|au|uk|us|row)-agg-(tax|payroll|insights|bookkeeping)$/
  );
  if (m?.[1] === rk) {
    const cat = m[2] as AggCategory;
    const byTab = getTaxAiActionsByTab(region);
    const memberIds = byTab[cat].map((r) => r.id);
    return mergeTaxActionPanels(memberIds, AGG_GROUP_TITLE[cat]);
  }

  return DEFAULT_TAX_ACTION_PANEL;
}

const AGG_ID_PREFIX = /^(nz|au|uk|us|row)-agg-/;

/**
 * Sidebar body when the user picks a tab: merged category view, a specific action
 * opened from the widget when it belongs to that tab, or (All tab) merged all actions.
 */
export function getTaxActionSidebarDetailForTab(
  openedId: string | null | undefined,
  region: string,
  selectedTab: TaxAiActionTabId
): TaxActionPanelDetail {
  const rk = regionToAggKey(region);
  const byTab = getTaxAiActionsByTab(region);

  if (selectedTab === "all") {
    const openedIsAggregate = !!openedId && AGG_ID_PREFIX.test(openedId);
    if (!openedId || openedIsAggregate) {
      const memberIds = [
        ...byTab.tax.map((r) => r.id),
        ...byTab.payroll.map((r) => r.id),
        ...byTab.insights.map((r) => r.id),
        ...byTab.bookkeeping.map((r) => r.id),
      ];
      return mergeTaxActionPanels(memberIds, "All actions");
    }
    return getTaxActionSidebarDetail(openedId, region);
  }

  if (
    openedId &&
    byTab[selectedTab].some((r) => r.id === openedId) &&
    TAX_ACTION_PANELS[openedId]
  ) {
    return getTaxActionSidebarDetail(openedId, region);
  }

  return getTaxActionSidebarDetail(`${rk}-agg-${selectedTab}`, region);
}

const CATEGORY_TABS: TaxAiActionTabId[] = [
  "tax",
  "payroll",
  "insights",
  "bookkeeping",
];

/** Derive initial tab when a row opens the panel (aggregate row → matching tab). */
export function parseInitialTaxActionSidebarTab(
  openedId: string | null | undefined,
  region?: string
): TaxAiActionTabId {
  if (!openedId) return "all";
  const m = openedId.match(
    /^(?:nz|au|uk|us|row)-agg-(tax|payroll|insights|bookkeeping)$/
  );
  if (m) return m[1] as TaxAiActionTabId;
  if (region) {
    const tabs = getTaxAiActionsByTab(region);
    for (const tabId of CATEGORY_TABS) {
      if (tabs[tabId].some((r) => r.id === openedId)) {
        return tabId;
      }
    }
  }
  return "all";
}

const SIDEBAR_TAB_ORDER: TaxAiActionTabId[] = [
  "all",
  "tax",
  "payroll",
  "insights",
  "bookkeeping",
];

/**
 * Tab badge counts for the Actions sidebar: number of list rows (client cards),
 * same merge rules as {@link getTaxActionSidebarDetailForTab} (`openedId` null =
 * browse; pass `activeSubPanel` when open). All dedupes clients across categories.
 */
export function getTaxActionSidebarTabListItemCounts(
  openedId: string | null | undefined,
  region: string
): Record<TaxAiActionTabId, number> {
  const out = {} as Record<TaxAiActionTabId, number>;
  for (const tabId of SIDEBAR_TAB_ORDER) {
    const detail = getTaxActionSidebarDetailForTab(openedId, region, tabId);
    out[tabId] =
      detail.actionQueueBundle?.bundleTotalCount ?? detail.clients.length;
  }
  return out;
}
