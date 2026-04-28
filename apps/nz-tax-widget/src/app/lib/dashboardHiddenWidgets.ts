/** Bump when default hidden IDs change (e.g. NZ optional tiles). */
const STORAGE_KEY = "xph-dashboard-hidden-widgets-v20";

export function loadHiddenWidgets(region: string): string[] | null {
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

export function saveHiddenWidgets(region: string, ids: string[]): void {
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
