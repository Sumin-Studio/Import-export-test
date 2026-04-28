/**
 * Widgets that stay off the dashboard and out of the Add widget list for this
 * prototype build (can be removed when these tiles ship).
 */
export const PROTOTYPE_EXCLUDED_WIDGET_IDS = new Set([
  /** Full-height tile removed; compact Tax alerts remains. */
  "tax-alerts",
]);

export function isPrototypeExcludedWidgetId(id: string): boolean {
  return PROTOTYPE_EXCLUDED_WIDGET_IDS.has(id);
}
