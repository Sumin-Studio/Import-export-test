/**
 * Bump when default widget order / visibility baseline changes so saved layouts
 * don’t override first paint or Reset layout (NZ: nzDashboardCanonical.ts).
 */
const STORAGE_KEY = "xph-dashboard-widget-order-v25";

export function loadWidgetOrder(region: string): string[] | null {
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

export function saveWidgetOrder(region: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${STORAGE_KEY}:${region}`, JSON.stringify(ids));
  } catch {
    // ignore quota / private mode
  }
}

export function clearWidgetOrder(region: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(`${STORAGE_KEY}:${region}`);
  } catch {
    // ignore
  }
}

/**
 * Merge persisted order with the canonical visible list. Keeps relative order of ids that
 * appear in `saved`, and inserts any id in `baseIds` but not in `saved` at its canonical
 * index (so e.g. Filed tax returns lands below Tax alerts / returns tiles, not at the end).
 */
export function mergeSavedWithBase(saved: string[], baseIds: string[]): string[] {
  const baseSet = new Set(baseIds);
  const indexInBase = (id: string) => baseIds.indexOf(id);
  const savedFiltered = saved.filter((id) => baseSet.has(id));
  const missing = baseIds.filter((id) => !savedFiltered.includes(id));
  const result = [...savedFiltered];
  for (const m of [...missing].sort((a, b) => indexInBase(a) - indexInBase(b))) {
    const pos = indexInBase(m);
    let insertAt = 0;
    for (let i = 0; i < result.length; i++) {
      if (indexInBase(result[i]) < pos) insertAt = i + 1;
    }
    result.splice(insertAt, 0, m);
  }
  return result;
}
