/**
 * Mock economic nexus status per US state (full state names match us-atlas / TopoJSON).
 * States omitted default to inactive with no affected clients.
 */

export type NexusInsightStatus =
  | "inactive"
  | "approaching"
  | "exposed"
  | "active";

export type StateNexusRow = {
  status: NexusInsightStatus;
  /** Clients with nexus / filing relevance in this state (prototype copy). */
  clients: string[];
};

export const NEXUS_STATUS_FILL: Record<NexusInsightStatus, string> = {
  inactive: "#F0F1F3",
  approaching: "#FFF2AC",
  exposed: "#F9BDBF",
  active: "#B7D7BC",
};

/** State name → nexus row (matches GeoJSON `properties.name` from us-atlas states). */
export const US_ECONOMIC_NEXUS_BY_STATE: Record<string, StateNexusRow> = {
  California: {
    status: "active",
    clients: ["Riverside Cafe", "Summit Home Services"],
  },
  Texas: {
    status: "active",
    clients: ["Lone Star Distillers"],
  },
  Illinois: {
    status: "exposed",
    clients: ["Riverside Cafe", "Chicago Loop Bakery"],
  },
  "New York": {
    status: "approaching",
    clients: ["Harbor View Holdings", "Northwind Logistics"],
  },
};

export function getNexusRowForStateName(name: string): StateNexusRow {
  return (
    US_ECONOMIC_NEXUS_BY_STATE[name] ?? {
      status: "inactive",
      clients: [],
    }
  );
}
