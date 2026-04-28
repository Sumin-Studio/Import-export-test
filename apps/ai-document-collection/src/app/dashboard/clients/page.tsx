"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ClientsTable, type ClientStatus } from "@/components/dashboard/ClientsTable";
import { OnboardingModal } from "@/components/dashboard/OnboardingModal";
import { clients } from "@/data/clients";
import { Send, RefreshCw } from "lucide-react";
import type { Client } from "@/data/clients";

export default function ClientsPage() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [status, setStatus] = useState<ClientStatus>({});
  const [refreshingAll, setRefreshingAll] = useState(false);

  const fetchStatus = useCallback(() => {
    fetch("/api/clients/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({}));
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleSendOnboarding = (client: Client) => {
    setSelectedClient(client);
    setOnboardingOpen(true);
  };

  const handleOnboardingClose = () => {
    setOnboardingOpen(false);
    setSelectedClient(null);
  };

  const handleRefreshAll = async () => {
    setRefreshingAll(true);
    try {
      await fetch("/api/scan-all", { method: "POST" });
      fetchStatus();
    } finally {
      setRefreshingAll(false);
    }
  };

  const handleDisconnect = async (client: Client) => {
    try {
      const res = await fetch(`/api/clients/${client.id}/disconnect`, {
        method: "POST",
      });
      if (res.ok) fetchStatus();
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Clients
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage client connections and agent scans
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefreshAll}
            disabled={refreshingAll}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshingAll ? "animate-spin" : ""}`} />
            Scan all clients
          </Button>
          <Button onClick={() => setOnboardingOpen(true)}>
            Send bulk request
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200/50">
        <ClientsTable
          clients={clients}
          status={status}
          onSendOnboarding={handleSendOnboarding}
          onDisconnect={handleDisconnect}
        />
      </div>

      <OnboardingModal
        open={onboardingOpen}
        onOpenChange={(open) => !open && handleOnboardingClose()}
        preselectedClient={selectedClient}
      />
    </div>
  );
}
