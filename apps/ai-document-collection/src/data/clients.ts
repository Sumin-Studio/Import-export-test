export type ConnectionStatus = "connected" | "pending";
export type StorageSource = "Dropbox" | "Google Drive";

export interface Client {
  id: string;
  name: string;
  email: string;
  connectionStatus: ConnectionStatus;
  /** Only known after client connects; use status from API for display. */
  storageSource?: StorageSource;
  lastAgentScan: string | null;
}

export const clients: Client[] = [
  {
    id: "1",
    name: "Memphis Music",
    email: "finance@memphismusic.com",
    connectionStatus: "connected",
    lastAgentScan: "2025-03-04T09:15:00Z",
  },
  {
    id: "2",
    name: "Summit Ventures LLC",
    email: "accounts@summitventures.com",
    connectionStatus: "pending",
    lastAgentScan: null,
  },
  {
    id: "3",
    name: "Greenfield Accounting",
    email: "admin@greenfield.io",
    connectionStatus: "connected",
    lastAgentScan: "2025-03-03T14:22:00Z",
  },
  {
    id: "4",
    name: "Northgate Industries",
    email: "bookkeeping@northgate.com",
    connectionStatus: "pending",
    lastAgentScan: null,
  },
  {
    id: "5",
    name: "Pioneer Design Studio",
    email: "finance@pioneerdesign.co",
    connectionStatus: "connected",
    lastAgentScan: "2025-03-01T11:00:00Z",
  },
];

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}
