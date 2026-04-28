/**
 * Named snapshots of dashboard layout (order, visibility, widget sizing).
 * Bump storage key if the payload shape changes incompatibly.
 */
const STORAGE_KEY = "xph-dashboard-saved-views-v1";
const MAX_VIEWS_PER_REGION = 40;

export type SavedDashboardWidgetConfig = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  width: number;
  height: number;
  colSpan?: 1 | 2;
  regions?: string[];
};

export type SavedDashboardView = {
  id: string;
  name: string;
  savedAt: number;
  region: string;
  stage: string;
  orderedIds: string[];
  hiddenWidgetIds: string[];
  taxWidgetsOnly: boolean;
  widgetScope: "tax" | "all";
  widgetConfigs: SavedDashboardWidgetConfig[];
};

function storageKeyForRegion(region: string): string {
  return `${STORAGE_KEY}:${region}`;
}

function isSavedView(x: unknown): x is SavedDashboardView {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.savedAt === "number" &&
    typeof o.region === "string" &&
    typeof o.stage === "string" &&
    Array.isArray(o.orderedIds) &&
    o.orderedIds.every((id) => typeof id === "string") &&
    Array.isArray(o.hiddenWidgetIds) &&
    o.hiddenWidgetIds.every((id) => typeof id === "string") &&
    typeof o.taxWidgetsOnly === "boolean" &&
    (o.widgetScope === "tax" || o.widgetScope === "all") &&
    Array.isArray(o.widgetConfigs)
  );
}

export function loadSavedViews(region: string): SavedDashboardView[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKeyForRegion(region));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedView);
  } catch {
    return [];
  }
}

export function appendSavedView(
  region: string,
  view: SavedDashboardView
): SavedDashboardView[] {
  if (typeof window === "undefined") return [view];
  const existing = loadSavedViews(region);
  const next = [...existing, view].slice(-MAX_VIEWS_PER_REGION);
  try {
    window.localStorage.setItem(
      storageKeyForRegion(region),
      JSON.stringify(next)
    );
  } catch {
    // ignore quota / private mode
  }
  return next;
}
