"use client";

import type { FilterState, PeriodValue } from "./data-store";

const STORAGE_KEY = "client-readiness-custom-views";

export type ReadinessScope = "all" | "incomplete" | "ready";

export interface CustomView {
  id: string;
  name: string;
  filterState: FilterState;
  readinessScope: ReadinessScope;
}

/** Serialize FilterState for localStorage (period dates → ISO strings) */
function serializeFilterState(state: FilterState): string {
  return JSON.stringify(state, (_, value) => {
    if (value instanceof Date) return value.toISOString();
    return value;
  });
}

/** Deserialize FilterState from localStorage */
function deserializeFilterState(json: string): FilterState {
  const raw = JSON.parse(json) as Record<string, unknown>;
  if (raw.period && raw.period !== null && typeof raw.period === "object") {
    const p = raw.period as { label: string; start: string; end: string };
    raw.period = {
      label: p.label,
      start: new Date(p.start),
      end: new Date(p.end),
    } as PeriodValue;
  }
  return raw as unknown as FilterState;
}

interface StoredView {
  id: string;
  name: string;
  filterStateJson: string;
  readinessScope: ReadinessScope;
}

function loadStored(): StoredView[] {
  if (typeof window === "undefined") return [];
  try {
    const s = window.localStorage.getItem(STORAGE_KEY);
    if (!s) return [];
    const parsed = JSON.parse(s) as StoredView[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStored(views: StoredView[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  } catch {
    // ignore
  }
}

export function getCustomViews(): CustomView[] {
  const stored = loadStored();
  return stored
    .map((v) => {
      try {
        return {
          id: v.id,
          name: v.name,
          filterState: deserializeFilterState(v.filterStateJson),
          readinessScope: v.readinessScope,
        };
      } catch {
        return null;
      }
    })
    .filter((v): v is CustomView => v !== null);
}

export function addCustomView(view: Omit<CustomView, "id">): CustomView {
  const id = `custom-${crypto.randomUUID()}`;
  const full: CustomView = { ...view, id };
  const stored = loadStored();
  stored.push({
    id: full.id,
    name: full.name,
    filterStateJson: serializeFilterState(full.filterState),
    readinessScope: full.readinessScope,
  });
  saveStored(stored);
  return full;
}

export function updateCustomView(
  id: string,
  updates: Partial<Pick<CustomView, "name" | "filterState" | "readinessScope">>
): void {
  const stored = loadStored();
  const i = stored.findIndex((v) => v.id === id);
  if (i === -1) return;
  const existing = getCustomViews().find((v) => v.id === id);
  if (!existing) return;
  const merged: CustomView = {
    ...existing,
    ...updates,
  };
  stored[i] = {
    id: merged.id,
    name: merged.name,
    filterStateJson: serializeFilterState(merged.filterState),
    readinessScope: merged.readinessScope,
  };
  saveStored(stored);
}

export function deleteCustomView(id: string): void {
  saveStored(loadStored().filter((v) => v.id !== id));
}
