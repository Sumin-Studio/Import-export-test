"use client";

import { useClose } from "@headlessui/react";
import { Chevron } from "@/app/components/ui/icons";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import {
  WORKLOAD_ACCOUNT_MANAGERS,
  WORKLOAD_MANAGERS,
} from "./workload-filter-people";

export type WorkloadFilterSubmenu = "main" | "partner" | "manager";

/** Child list row: optional left accent when selected (no radio — full row is clickable). */
const personRowClass = (selected: boolean) =>
  `hover:bg-background-primary flex w-full cursor-pointer items-center px-5 py-2.5 text-left text-[15px]/[24px] transition-[color,box-shadow] duration-200 ease-out ${
    selected
      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
      : "text-content-primary"
  }`;

/** Partner / Manager row on main: chevron + optional subtitle; blue bar when that filter is active. */
function filterDrilldownNavRowClass(active: boolean): string {
  return [
    "hover:bg-background-primary flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-2.5 text-left transition-[color,box-shadow] duration-200 ease-out",
    active
      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
      : "text-content-primary",
  ].join(" ");
}

interface WorkloadFilterRoleDrilldownProps {
  radioGroupPrefix: string;
  submenu: WorkloadFilterSubmenu;
  onSubmenuChange: (submenu: WorkloadFilterSubmenu) => void;
  filterRole: WorkloadFilterRole;
  onFilterRoleChange: (role: WorkloadFilterRole) => void;
  selectedAccountManagerId: string;
  onAccountManagerChange: (id: string) => void;
  selectedManagerId: string;
  onManagerChange: (id: string) => void;
  /** Label for the firm / whole-practice row under “Filter” (default “All returns”). */
  firmFilterRowLabel?: string;
}

export default function WorkloadFilterRoleDrilldown({
  radioGroupPrefix: _radioGroupPrefix,
  submenu,
  onSubmenuChange,
  filterRole,
  onFilterRoleChange,
  selectedAccountManagerId,
  onAccountManagerChange,
  selectedManagerId,
  onManagerChange,
  firmFilterRowLabel,
}: WorkloadFilterRoleDrilldownProps) {
  const closePopover = useClose();

  const partnerSubtitle =
    WORKLOAD_ACCOUNT_MANAGERS.find((p) => p.id === selectedAccountManagerId)
      ?.name ?? "";
  const managerSubtitle =
    WORKLOAD_MANAGERS.find((p) => p.id === selectedManagerId)?.name ?? "";

  if (submenu === "partner") {
    return (
      <div className="min-w-0">
        <div className="border-border-primary flex min-h-[44px] items-center gap-2 border-b px-5 py-2">
          <button
            type="button"
            className="text-content-secondary hover:text-content-primary flex size-8 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0078c8]/40"
            aria-label="Back to filters"
            onClick={() => onSubmenuChange("main")}
          >
            <Chevron className="h-3 w-3 rotate-90 fill-current" />
          </button>
          <span className="text-content-primary text-[15px]/[24px] font-semibold">
            Partner
          </span>
        </div>
        <div
          className="flex flex-col pb-2 pt-1"
          role="group"
          aria-label="Choose partner"
        >
          {WORKLOAD_ACCOUNT_MANAGERS.map((person) => (
            <button
              key={person.id}
              type="button"
              className={personRowClass(false)}
              onClick={() => {
                onFilterRoleChange("accountManager");
                onAccountManagerChange(person.id);
                onSubmenuChange("main");
                closePopover();
              }}
            >
              {person.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (submenu === "manager") {
    return (
      <div className="min-w-0">
        <div className="border-border-primary flex min-h-[44px] items-center gap-2 border-b px-5 py-2">
          <button
            type="button"
            className="text-content-secondary hover:text-content-primary flex size-8 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0078c8]/40"
            aria-label="Back to filters"
            onClick={() => onSubmenuChange("main")}
          >
            <Chevron className="h-3 w-3 rotate-90 fill-current" />
          </button>
          <span className="text-content-primary text-[15px]/[24px] font-semibold">
            Manager
          </span>
        </div>
        <div
          className="flex flex-col pb-2 pt-1"
          role="group"
          aria-label="Choose manager"
        >
          {WORKLOAD_MANAGERS.map((person) => (
            <button
              key={person.id}
              type="button"
              className={personRowClass(false)}
              onClick={() => {
                onFilterRoleChange("manager");
                onManagerChange(person.id);
                onSubmenuChange("main");
                closePopover();
              }}
            >
              {person.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
        Filter
      </h3>
      <div className="flex flex-col pb-1" role="group" aria-label="Filter">
        <button
          type="button"
          aria-current={filterRole === "firm" ? "true" : undefined}
          className={personRowClass(filterRole === "firm")}
          onClick={() => onFilterRoleChange("firm")}
        >
          {firmFilterRowLabel ?? "All returns"}
        </button>
        <button
          type="button"
          className={filterDrilldownNavRowClass(
            filterRole === "accountManager"
          )}
          onClick={() => onSubmenuChange("partner")}
        >
          <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
            <span className="text-[15px]/[22px] font-normal">Partner</span>
            {filterRole === "accountManager" && partnerSubtitle ? (
              <span className="text-content-secondary max-w-full truncate text-[13px]/[16px] font-normal">
                {partnerSubtitle}
              </span>
            ) : null}
          </span>
          <Chevron
            className="h-3 w-3 shrink-0 -rotate-90"
            fill={
              filterRole === "accountManager"
                ? "fill-current"
                : "fill-content-secondary"
            }
          />
        </button>
        <button
          type="button"
          className={filterDrilldownNavRowClass(filterRole === "manager")}
          onClick={() => onSubmenuChange("manager")}
        >
          <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
            <span className="text-[15px]/[22px] font-normal">Manager</span>
            {filterRole === "manager" && managerSubtitle ? (
              <span className="text-content-secondary max-w-full truncate text-[13px]/[16px] font-normal">
                {managerSubtitle}
              </span>
            ) : null}
          </span>
          <Chevron
            className="h-3 w-3 shrink-0 -rotate-90"
            fill={
              filterRole === "manager"
                ? "fill-current"
                : "fill-content-secondary"
            }
          />
        </button>
      </div>
    </div>
  );
}
