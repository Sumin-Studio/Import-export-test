import { pinClientNameFirstIds, type ColumnId } from "@/lib/dashboard-columns";

/** One prefs bucket for the whole Clients table (all CRM / Books / 1099 / … tabs). */
export const CLIENTS_TABLE_PREFS_KEY = "clients";

export type ClientsTablePrefs = {
  order: ColumnId[];
  /** Hidden in every mode that exposes the column (client_name cannot be hidden). */
  hidden: ColumnId[];
};

export function mergeOrderWithBase(storedOrder: ColumnId[], baseColumnIds: ColumnId[]): ColumnId[] {
  const baseSet = new Set(baseColumnIds);
  const fromStored = storedOrder.filter((id) => baseSet.has(id));
  const seen = new Set(fromStored);
  const tail = baseColumnIds.filter((id) => !seen.has(id));
  return pinClientNameFirstIds([...fromStored, ...tail]);
}

function hiddenGlobalFromRaw(raw: Partial<ClientsTablePrefs> | undefined): Set<ColumnId> {
  if (raw?.hidden != null) {
    return new Set(raw.hidden.filter((id) => id !== "client_name"));
  }
  return new Set();
}

export function resolveClientsTablePrefs(
  raw: Partial<ClientsTablePrefs> | undefined,
  baseColumnIds: ColumnId[],
): { order: ColumnId[]; hiddenGlobal: Set<ColumnId> } {
  const order = mergeOrderWithBase(raw?.order ?? baseColumnIds, baseColumnIds);
  return { order, hiddenGlobal: hiddenGlobalFromRaw(raw) };
}

export function visibleIdsForMode(hiddenGlobal: Set<ColumnId>, baseColumnIds: ColumnId[]): ColumnId[] {
  return baseColumnIds.filter((id) => id === "client_name" || !hiddenGlobal.has(id));
}
