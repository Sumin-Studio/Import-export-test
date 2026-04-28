"use client";

import { useEffect, useState } from "react";
import type { WorkloadViewMode } from "@/app/components/charts/WorkloadInsights";
import type {
  WorkloadFilterRole,
  WorkloadTimePeriod,
} from "@/app/lib/mockData/workloadInsights";
import {
  overflowLabeledPrimaryLabelClass,
  overflowLabeledRangeRowClass,
  overflowLabeledRangeTextClass,
  overflowLabeledSectionTitleClass,
} from "./overflowLabeledRows";
import WorkloadFilterRoleDrilldown, {
  type WorkloadFilterSubmenu,
} from "./WorkloadFilterRoleDrilldown";

/** NZ FY (Apr–Mar); prototype copy — adjust FY labels when refreshing the build. */
export const WORKLOAD_TIME_PERIOD_OPTIONS: readonly {
  id: WorkloadTimePeriod;
  label: string;
  rangeLabel: string;
}[] = [
  {
    id: "thisYear",
    label: "This year",
    rangeLabel: "Apr 2025 – Mar 2026",
  },
  {
    id: "lastYear",
    label: "Last year",
    rangeLabel: "Apr 2024 – Mar 2025",
  },
];

export {
  WORKLOAD_ACCOUNT_MANAGERS,
  WORKLOAD_MANAGERS,
} from "./workload-filter-people";

export type WorkloadTimePeriodOverflowLayout = "yearRadios" | "lastYearCheckbox";

interface ComponentProps {
  className?: string;
  /** Unique prefix for radio `name` attributes when multiple workload widgets are on the page */
  radioGroupPrefix?: string;
  /** When true, omit the Month / Return type section (e.g. Returns by type widget). */
  hideDisplayFilter?: boolean;
  viewMode: WorkloadViewMode;
  onViewModeChange: (mode: WorkloadViewMode) => void;
  timePeriod: WorkloadTimePeriod;
  onTimePeriodChange: (period: WorkloadTimePeriod) => void;
  /**
   * `"yearRadios"`: This year / Last year buttons (default).
   * `"lastYearCheckbox"`: single “Last year” checkbox — Returns by month overlay only.
   */
  timePeriodLayout?: WorkloadTimePeriodOverflowLayout;
  /** When `timePeriodLayout === "lastYearCheckbox"`, toggles the prior-FY trend line on the chart. */
  showLastYearTrend?: boolean;
  onShowLastYearTrendChange?: (show: boolean) => void;
  /**
   * When `timePeriodLayout === "lastYearCheckbox"`, label for that checkbox (default “Last year”).
   * NZ GA / Agentic Returns by month uses “This time last year” for clarity.
   */
  lastYearTrendCheckboxLabel?: string;
  filterRole: WorkloadFilterRole;
  onFilterRoleChange: (role: WorkloadFilterRole) => void;
  selectedAccountManagerId: string;
  onAccountManagerChange: (id: string) => void;
  selectedManagerId: string;
  onManagerChange: (id: string) => void;
  /** First row under Filter (default “All returns”). */
  firmFilterRowLabel?: string;
}

export default function WorkloadInsightsOverflow({
  className = "",
  radioGroupPrefix = "workload-insights",
  hideDisplayFilter = false,
  viewMode,
  onViewModeChange,
  timePeriod,
  onTimePeriodChange,
  timePeriodLayout = "yearRadios",
  showLastYearTrend = false,
  onShowLastYearTrendChange,
  lastYearTrendCheckboxLabel,
  filterRole,
  onFilterRoleChange,
  selectedAccountManagerId,
  onAccountManagerChange,
  selectedManagerId,
  onManagerChange,
  firmFilterRowLabel,
}: ComponentProps) {
  const p = radioGroupPrefix;
  const lastYearCheckboxId = `${p}-last-year-trend`;
  const trimmedCompareLabel = lastYearTrendCheckboxLabel?.trim();
  const compareCheckboxLabel =
    trimmedCompareLabel && trimmedCompareLabel.length > 0
      ? trimmedCompareLabel
      : "Last year";
  const [filterSubmenu, setFilterSubmenu] =
    useState<WorkloadFilterSubmenu>("main");

  useEffect(() => {
    if (filterRole === "firm") {
      setFilterSubmenu("main");
    }
  }, [filterRole]);

  const drillProps = {
    radioGroupPrefix: p,
    filterRole,
    onFilterRoleChange,
    selectedAccountManagerId,
    onAccountManagerChange,
    selectedManagerId,
    onManagerChange,
    onSubmenuChange: setFilterSubmenu,
    firmFilterRowLabel,
  };

  return (
    <div className={className}>
      {filterSubmenu === "main" ? (
        <>
          <div className="border-border-primary border-b">
            <h3 className={overflowLabeledSectionTitleClass}>
              {timePeriodLayout === "lastYearCheckbox" ? "Compare" : "Time period"}
            </h3>
            {timePeriodLayout === "lastYearCheckbox" &&
            onShowLastYearTrendChange ? (
              <div className="text-content-primary flex flex-col pb-1 text-[15px]/[24px]">
                <div className="hover:bg-background-primary flex w-full items-center gap-2 px-5 py-2">
                  <input
                    type="checkbox"
                    id={lastYearCheckboxId}
                    className="h-4 w-4 cursor-pointer"
                    checked={showLastYearTrend}
                    onChange={(e) =>
                      onShowLastYearTrendChange(e.target.checked)
                    }
                  />
                  <label
                    htmlFor={lastYearCheckboxId}
                    className="cursor-pointer font-normal"
                  >
                    {compareCheckboxLabel}
                  </label>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col pb-1"
                role="group"
                aria-label="Time period"
              >
                {WORKLOAD_TIME_PERIOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={overflowLabeledRangeRowClass(
                      timePeriod === opt.id
                    )}
                    onClick={() => onTimePeriodChange(opt.id)}
                  >
                    <span className={overflowLabeledPrimaryLabelClass}>
                      {opt.label}
                    </span>
                    <span className={overflowLabeledRangeTextClass}>
                      {opt.rangeLabel}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!hideDisplayFilter ? (
            <div>
              <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
                Display
              </h3>
              <nav className="flex flex-col pb-1 text-[15px]/[24px]">
                <button
                  type="button"
                  className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left font-normal transition-[color,box-shadow] duration-300 ease-out ${
                    viewMode === "month"
                      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                      : "text-content-primary"
                  }`}
                  onClick={() => onViewModeChange("month")}
                >
                  Month
                </button>
                <button
                  type="button"
                  className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left font-normal transition-[color,box-shadow] duration-300 ease-out ${
                    viewMode === "returnType"
                      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                      : "text-content-primary"
                  }`}
                  onClick={() => onViewModeChange("returnType")}
                >
                  Return type
                </button>
              </nav>
            </div>
          ) : null}

          <WorkloadFilterRoleDrilldown submenu="main" {...drillProps} />
        </>
      ) : (
        <WorkloadFilterRoleDrilldown
          submenu={filterSubmenu}
          {...drillProps}
        />
      )}
    </div>
  );
}
