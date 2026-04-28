import type {
  PrototypeStageId,
  PrototypeWidgetScope,
} from "@/app/lib/prototypeSettings";

/**
 * Single source of truth for the NZ default overview: placement order and default visibility.
 * Used on first load, refresh (no saved layout), and Reset layout.
 */

/**
 * NZ **GA** stage only: the draggable overview shows Tax alerts compact, Tax returns by status,
 * and Returns by month (same tax row as Agentic). XPAC, AI, and Tailor are unchanged.
 */
export const NZ_GA_OVERVIEW_WIDGET_IDS: readonly string[] = [
  "tax-alerts-compact",
  "returns-by-status",
  "returns-by-month-line",
] as const;

export const NZ_GA_OVERVIEW_WIDGET_ID_SET = new Set(NZ_GA_OVERVIEW_WIDGET_IDS);

/**
 * Hidden until toggled on in “Add widget” (full Tax returns, Returns by type,
 * NZ tax insight tiles — default-hidden on ALL. GA NZ overview adds only Tax alerts, Tax returns,
 * and Returns by month; XPAC/AI/Tailor use the full NZ catalog rules elsewhere.
 */
export const NZ_DEFAULT_HIDDEN_WIDGET_IDS: readonly string[] = [
  "annual-tax-returns",
  "return-by-type",
  "nz-tax-due-countdown",
  "nz-gst-tracker",
  "nz-client-compliance-health",
];

/** NZ-only: tax insight tiles — Tailor prototype screen only, not GA / XPAC / AI overview. */
export const NZ_TAX_INSIGHT_WIDGET_IDS: readonly string[] = [
  "nz-tax-due-countdown",
  "nz-gst-tracker",
  "nz-client-compliance-health",
];

export const NZ_TAX_INSIGHT_WIDGET_ID_SET = new Set(NZ_TAX_INSIGHT_WIDGET_IDS);

/**
 * When prototype stage is XPAC, these are also hidden by default (see {@link getDefaultHiddenWidgetIds}).
 */
export const NZ_XPAC_DEFAULT_EXTRA_HIDDEN_WIDGET_IDS: readonly string[] = [
  "lodgements",
];

/**
 * Grid placement order (react-grid-layout fills top-left first). NZ insight tiles are not on
 * this grid (Tailor screen only); see {@link NZ_TAX_INSIGHT_WIDGET_IDS}.
 */
export const NZ_WIDGET_ORDER: readonly string[] = [
  "tax-alerts-compact",
  "returns-by-status",
  "returns-by-month-line",
  "lodgements",
  "annual-tax-returns",
  "return-by-type",
  "quick-actions",
  "bank-reconciliation",
  "jobs",
  "xero-updates",
  "time-summary",
  "billable-hours",
  "favourite-xero-organisations",
  "bank-feed-alerts",
  "client-contact-information",
];

/**
 * True when this widget may appear on the NZ overview for the current prototype stage.
 * NZ **GA** + prototype Widgets → **Tax** keeps the minimal tax row only; **All** shows the full catalog.
 */
export function isWidgetIdOnNzOverviewForStage(
  widgetId: string,
  region: string,
  stage: PrototypeStageId,
  widgetScope: PrototypeWidgetScope
): boolean {
  if (region !== "NZ" || stage !== "ga") return true;
  if (widgetScope === "all") return true;
  return NZ_GA_OVERVIEW_WIDGET_ID_SET.has(widgetId);
}

/**
 * Intersect ordered ids with the NZ GA minimal tax row when prototype Widgets → Tax.
 * Widgets → All leaves order unchanged.
 */
export function filterIdsToNzGaOverviewIfApplicable(
  region: string,
  stage: PrototypeStageId,
  ids: readonly string[],
  widgetScope: PrototypeWidgetScope
): string[] {
  if (region !== "NZ" || stage !== "ga" || widgetScope === "all") {
    return [...ids];
  }
  return NZ_WIDGET_ORDER.filter(
    (id) => NZ_GA_OVERVIEW_WIDGET_ID_SET.has(id) && ids.includes(id)
  );
}
