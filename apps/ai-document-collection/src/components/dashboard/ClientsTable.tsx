"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Client } from "@/data/clients";
import { Send, ExternalLink, Unplug } from "lucide-react";
import { cn } from "@/lib/utils";

function formatLastScan(iso: string | null | undefined): string {
  if (!iso) return "Never";
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export type ClientStatus = Record<
  string,
  {
    connected: boolean;
    folderPath?: string;
    lastScanAt?: string | null;
    docsReadinessStatus?: string;
    docsCompletenessPercent?: number;
    /** Storage source (e.g. "Dropbox") when connected; null until then. */
    storageSource?: string | null;
  }
>;

interface ClientsTableProps {
  clients: Client[];
  status: ClientStatus;
  onSendOnboarding: (client: Client) => void;
  onDisconnect?: (client: Client) => void;
}

export function ClientsTable({
  clients,
  status,
  onSendOnboarding,
  onDisconnect,
}: ClientsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Connection Status</TableHead>
          <TableHead>Storage Source</TableHead>
          <TableHead>Last Agent Scan</TableHead>
          <TableHead>Docs readiness</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => {
          const s = status[client.id];
          const connected = s?.connected ?? false;
          const lastScanAt = s?.lastScanAt ?? null;
          const docsStatus = s?.docsReadinessStatus ?? "NOT_STARTED";
          const docsPercent = s?.docsCompletenessPercent ?? 0;
          const statusVariant =
            docsStatus === "READY"
              ? "success"
              : docsStatus === "WAITING_ON_CLIENT"
                ? "warning"
                : "secondary";
          return (
            <TableRow key={client.id}>
              <TableCell>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className={cn(
                    "font-medium text-slate-900 hover:text-primary hover:underline"
                  )}
                >
                  {client.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant={connected ? "success" : "warning"}>
                  {connected ? "Connected" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {connected ? (s?.storageSource ?? "—") : "—"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatLastScan(lastScanAt)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {docsPercent}%
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant}>
                  {docsStatus === "READY"
                    ? "Ready"
                    : docsStatus === "WAITING_ON_CLIENT"
                      ? "Waiting"
                      : "Not started"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {connected ? (
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/clients/${client.id}`}>
                        View
                        <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    {onDisconnect && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => onDisconnect(client)}
                        title="Disconnect (for testing)"
                      >
                        <Unplug className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onSendOnboarding(client)}
                  >
                    Send Onboarding Request
                    <Send className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
