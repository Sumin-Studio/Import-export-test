"use client";

import type { FilterState } from "@/lib/data-store";
import { INITIAL_FILTER_STATE } from "@/lib/data-store";
import {
  defaultGoal,
  defaultPeriod,
  defaultSortKey,
  type DashboardMode,
} from "@/lib/dashboard-modes";
import { getThisMonthPeriod } from "@/lib/data-store";

export type ClientsSearchParams = {
  mode?: string;
  view?: "all" | "incomplete" | "ready";
  readiness?: string; // comma-separated: blocked,action_required
  search?: string;
  partner?: string; // comma-separated names
};

const VALID_MODES: DashboardMode[] = ["crm", "bookkeeping", "tax", "sales_tax", "payroll", "advisory"];

/**
 * Parse URL search params into initial filter state and view for the Clients page.
 */
export function parseSearchParamsIntoClientState(
  params: ClientsSearchParams
): {
  mode: DashboardMode;
  viewTab: "all" | "incomplete" | "ready";
  filterState: Partial<FilterState>;
} {
  const mode = params.mode && VALID_MODES.includes(params.mode as DashboardMode)
    ? (params.mode as DashboardMode)
    : "crm";

  const viewTab =
    params.view === "all" ? "all" : params.view === "ready" ? "ready" : "incomplete";

  const readinessTiers: FilterState["readinessTiers"] = [];
  if (params.readiness) {
    const parts = params.readiness.split(",").map((s) => s.trim());
    if (parts.includes("blocked")) readinessTiers.push("blocked");
    if (parts.includes("action_required")) readinessTiers.push("action_required");
    if (parts.includes("ready")) readinessTiers.push("ready");
  }

  const partners = params.partner ? params.partner.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const period = getThisMonthPeriod();

  const filterState: Partial<FilterState> = {
    searchQuery: params.search ?? "",
    readinessTiers: readinessTiers.length ? readinessTiers : undefined,
    partners: partners.length ? partners : undefined,
    goal: defaultGoal(mode),
    period,
    sortKey: defaultSortKey(mode),
    sortDirection: "asc",
  };

  return { mode, viewTab, filterState };
}

/**
 * Build /clients href with search params for a notification link.
 */
export function buildClientsUrl(params: ClientsSearchParams): string {
  const searchParams = new URLSearchParams();
  if (params.mode) searchParams.set("mode", params.mode);
  if (params.view) searchParams.set("view", params.view);
  if (params.readiness) searchParams.set("readiness", params.readiness);
  if (params.search) searchParams.set("search", params.search);
  if (params.partner) searchParams.set("partner", params.partner);
  const q = searchParams.toString();
  return q ? `/clients?${q}` : "/clients";
}
