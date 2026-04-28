/**
 * Tax overview widget ids (Tax returns tiles, Tax alerts, Activity statements (AU),
 * WorkloadInsights variants, Lodgements). NZ insight tiles are Tailor-screen only;
 * see {@link getTaxOnlyVisibleWidgetIdsForRegion}.
 * Shown in TAX scope per region: NZ uses {@link getTaxOnlyVisibleWidgetIdsForRegion}
 * (ALL-visible betas); other regions use this set intersected with widgets valid for that region.
 * Used by the dashboard “tax widgets only” master toggle.
 */
export const TAX_BETA_WIDGET_IDS = new Set<string>([
  "activity-statements",
  "annual-tax-returns",
  "tax-alerts-compact",
  "returns-by-status",
  "returns-by-month-line",
  "lodgements",
  "return-by-type",
  "us-economic-nexus-insights",
  "us-1099-returns-pipeline",
]);

export function isTaxBetaWidgetId(id: string): boolean {
  return TAX_BETA_WIDGET_IDS.has(id);
}

/**
 * True when every id in `taxOnlyVisibleIds` is shown and every other catalog id is hidden.
 * `taxOnlyVisibleIds` is usually from {@link getTaxOnlyVisibleWidgetIdsForRegion}.
 */
export function isTaxOnlyLayout(
  hidden: Set<string>,
  sortedWidgetIds: string[],
  taxOnlyVisibleIds: Set<string>
): boolean {
  for (const id of sortedWidgetIds) {
    const shouldShow = taxOnlyVisibleIds.has(id);
    const isHidden = hidden.has(id);
    if (shouldShow && isHidden) return false;
    if (!shouldShow && !isHidden) return false;
  }
  return true;
}
