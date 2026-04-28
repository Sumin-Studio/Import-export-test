"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import WorkloadFilterRoleDrilldown, {
  type WorkloadFilterSubmenu,
} from "./WorkloadFilterRoleDrilldown";

export interface TaxAlertsScopeOverflowProps {
  className?: string;
  radioGroupPrefix: string;
  filterRole: WorkloadFilterRole;
  onFilterRoleChange: (role: WorkloadFilterRole) => void;
  selectedAccountManagerId: string;
  onAccountManagerChange: (id: string) => void;
  selectedManagerId: string;
  onManagerChange: (id: string) => void;
  /** Optional content above the Filter block (e.g. Agentic Actions sort). */
  children?: ReactNode;
}

/**
 * NZ GA / Agentic Tax alerts overflow: Practice, Partner, Manager (same drilldown as Tax returns).
 */
export default function TaxAlertsScopeOverflow({
  className = "",
  radioGroupPrefix,
  filterRole,
  onFilterRoleChange,
  selectedAccountManagerId,
  onAccountManagerChange,
  selectedManagerId,
  onManagerChange,
  children,
}: TaxAlertsScopeOverflowProps) {
  const [filterSubmenu, setFilterSubmenu] =
    useState<WorkloadFilterSubmenu>("main");

  useEffect(() => {
    if (filterRole === "firm") {
      setFilterSubmenu("main");
    }
  }, [filterRole]);

  const drillProps = {
    radioGroupPrefix,
    filterRole,
    onFilterRoleChange,
    selectedAccountManagerId,
    onAccountManagerChange,
    selectedManagerId,
    onManagerChange,
    onSubmenuChange: setFilterSubmenu,
    firmFilterRowLabel: "Practice",
  };

  return (
    <div className={className}>
      {children}
      {filterSubmenu === "main" ? (
        <WorkloadFilterRoleDrilldown submenu="main" {...drillProps} />
      ) : (
        <WorkloadFilterRoleDrilldown
          submenu={filterSubmenu}
          {...drillProps}
        />
      )}
    </div>
  );
}
