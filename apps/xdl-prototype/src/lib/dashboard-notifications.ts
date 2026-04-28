"use client";

import type { Client } from "@/lib/data-store";
import { buildClientsUrl } from "@/lib/clients-route";

export interface DashboardNotification {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  count?: number;
  urgency?: "high" | "medium" | "low";
}

/**
 * Build notifications from client data for the Home dashboard.
 * Each notification links to the Clients page with relevant filters.
 */
export function getDashboardNotifications(clients: Client[]): DashboardNotification[] {
  const blocked = clients.filter((c) => c.readinessTier === "blocked");
  const actionRequired = clients.filter((c) => c.readinessTier === "action_required");
  const w9Overdue = clients.filter(
    (c) => c.blockers?.some((b) => /W-9|w9/i.test(b)) || c.mainSignal?.toLowerCase().includes("w-9")
  );
  const bankFeedIssues = clients.filter(
    (c) => c.blockers?.some((b) => /bank feed|disconnect/i.test(b)) || c.mainSignal?.toLowerCase().includes("bank")
  );
  const overdue1099 = clients.filter(
    (c) =>
      (c.services.includes("1099") || c.services.includes("1040")) &&
      c.readinessTier !== "ready" &&
      (c.mainSignal?.toLowerCase().includes("1099") || c.mainSignal?.toLowerCase().includes("filing"))
  );
  const reconPending = clients.filter(
    (c) => c.reconStatus && c.reconStatus !== "Complete" && c.readinessTier !== "ready"
  );

  const notifications: DashboardNotification[] = [];

  if (blocked.length > 0) {
    notifications.push({
      id: "blocked",
      title: `${blocked.length} client${blocked.length === 1 ? "" : "s"} blocked`,
      subtitle: "Need immediate attention",
      href: buildClientsUrl({ view: "incomplete", readiness: "blocked" }),
      count: blocked.length,
      urgency: "high",
    });
  }

  if (actionRequired.length > 0) {
    notifications.push({
      id: "action-required",
      title: `${actionRequired.length} client${actionRequired.length === 1 ? "" : "s"} need attention`,
      subtitle: "Action required",
      href: buildClientsUrl({ view: "incomplete", readiness: "action_required" }),
      count: actionRequired.length,
      urgency: "medium",
    });
  }

  if (w9Overdue.length > 0) {
    notifications.push({
      id: "w9-overdue",
      title: `W-9 collection overdue`,
      subtitle: `${w9Overdue.length} client${w9Overdue.length === 1 ? "" : "s"}`,
      href: buildClientsUrl({ mode: "tax", view: "incomplete", readiness: "blocked,action_required" }),
      count: w9Overdue.length,
      urgency: "high",
    });
  }

  if (bankFeedIssues.length > 0) {
    const first = bankFeedIssues[0];
    notifications.push({
      id: "bank-feed",
      title: "Bank feed disconnected",
      subtitle: first ? `${first.entityName} and ${bankFeedIssues.length - 1} more` : `${bankFeedIssues.length} clients`,
      href: buildClientsUrl({ mode: "bookkeeping", view: "incomplete" }),
      count: bankFeedIssues.length,
      urgency: "high",
    });
  }

  if (overdue1099.length > 0) {
    notifications.push({
      id: "1099-overdue",
      title: "1099 filing pending",
      subtitle: `${overdue1099.length} client${overdue1099.length === 1 ? "" : "s"}`,
      href: buildClientsUrl({ mode: "tax", view: "incomplete" }),
      count: overdue1099.length,
      urgency: "high",
    });
  }

  if (reconPending.length > 0) {
    notifications.push({
      id: "recon-pending",
      title: "Reconciliation incomplete",
      subtitle: `${reconPending.length} client${reconPending.length === 1 ? "" : "s"} with open items`,
      href: buildClientsUrl({ mode: "bookkeeping", view: "incomplete" }),
      count: reconPending.length,
      urgency: "medium",
    });
  }

  return notifications.slice(0, 8);
}
