"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { WorkloadInsightsChart } from "@/components/charts";
import {
  MONTH_AGGREGATE_FILED_COLOR,
  MONTH_AGGREGATE_FILED_LABEL,
  MONTH_LINE_SERIES_CURRENT,
  MONTH_LINE_SERIES_PREVIOUS,
  RETURN_TYPE_COLORS,
  RETURN_TYPE_LABELS,
  type WorkloadViewMode,
} from "@/app/components/charts/WorkloadInsights";
import { colors } from "@/app/components/charts/Theme";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { MoreButton } from "@/components/global";
import { WorkloadInsightsOverflow } from "./overflow";
import {
  WORKLOAD_ACCOUNT_MANAGERS,
  WORKLOAD_MANAGERS,
  WORKLOAD_TIME_PERIOD_OPTIONS,
} from "./overflow/workload-insights";
import {
  WORKLOAD_EOT_TARGET_LINE_LABEL,
  type WorkloadFilterRole,
  type WorkloadTimePeriod,
} from "@/app/lib/mockData/workloadInsights";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
  /**
   * Initial chart grouping; default is stacked columns by return type per month.
   * Use `"monthLine"` for the trend chart (current vs previous year).
   */
  initialViewMode?: WorkloadViewMode;
  /** Main heading before the subtitle bullet. */
  title?: string;
  /**
   * Stacked month view only: show prior-year monthly total as a **line** (bars + reference line)
   * instead of grey backdrop columns.
   */
  monthPriorYearAsLine?: boolean;
}

const VIEW_MODE_EXIT_MS = 200;
const VIEW_MODE_ENTER_MS = 320;

function timePeriodLabel(period: WorkloadTimePeriod): string {
  return (
    WORKLOAD_TIME_PERIOD_OPTIONS.find((o) => o.id === period)?.label ?? "This year"
  );
}

function personDisplayName(
  role: WorkloadFilterRole,
  accountManagerId: string,
  managerId: string
): string {
  if (role === "accountManager") {
    return (
      WORKLOAD_ACCOUNT_MANAGERS.find((p) => p.id === accountManagerId)
        ?.name ?? ""
    );
  }
  return WORKLOAD_MANAGERS.find((p) => p.id === managerId)?.name ?? "";
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function WorkloadInsights({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 2,
  canToggleSize = false,
  initialViewMode = "month",
  title = "Returns by month",
  monthPriorYearAsLine = false,
}: ComponentProps) {
  const [viewMode, setViewMode] = useState<WorkloadViewMode>(initialViewMode);
  const [chartViewMode, setChartViewMode] =
    useState<WorkloadViewMode>(initialViewMode);
  const [chartReveal, setChartReveal] = useState(true);
  const viewModeTransitionRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  const [filterRole, setFilterRole] =
    useState<WorkloadFilterRole>("firm");
  const [accountManagerId, setAccountManagerId] = useState<string>(
    WORKLOAD_ACCOUNT_MANAGERS[0].id
  );
  const [managerId, setManagerId] = useState<string>(
    WORKLOAD_MANAGERS[0].id
  );
  const [timePeriod, setTimePeriod] =
    useState<WorkloadTimePeriod>("thisYear");

  const [legendHoverIndex, setLegendHoverIndex] = useState<number | null>(null);
  const [monthBreakdownByReturnType, setMonthBreakdownByReturnType] =
    useState(true);

  const chartPersonId =
    filterRole === "firm"
      ? ""
      : filterRole === "accountManager"
        ? accountManagerId
        : managerId;

  const subtitleLine = useMemo(() => {
    const period = timePeriodLabel(timePeriod);
    if (filterRole === "firm") {
      return `${period} • All returns`;
    }
    const name = personDisplayName(
      filterRole,
      accountManagerId,
      managerId
    );
    return `${period} • ${name}`;
  }, [timePeriod, filterRole, accountManagerId, managerId]);

  useEffect(() => {
    if (viewMode === chartViewMode) {
      if (viewModeTransitionRef.current) {
        clearTimeout(viewModeTransitionRef.current);
        viewModeTransitionRef.current = null;
      }
      setChartReveal(true);
      return;
    }

    if (prefersReducedMotion) {
      setChartViewMode(viewMode);
      setChartReveal(true);
      return;
    }

    setChartReveal(false);
    if (viewModeTransitionRef.current) {
      clearTimeout(viewModeTransitionRef.current);
    }
    viewModeTransitionRef.current = setTimeout(() => {
      setChartViewMode(viewMode);
      viewModeTransitionRef.current = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setChartReveal(true));
      });
    }, VIEW_MODE_EXIT_MS);
    return () => {
      if (viewModeTransitionRef.current) {
        clearTimeout(viewModeTransitionRef.current);
        viewModeTransitionRef.current = null;
      }
    };
  }, [viewMode, chartViewMode, prefersReducedMotion]);

  useEffect(() => {
    setLegendHoverIndex(null);
  }, [monthBreakdownByReturnType]);

  const comparisonLegendIndex =
    chartViewMode === "month" && !monthBreakdownByReturnType
      ? 1
      : RETURN_TYPE_LABELS.length;

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[522px] min-h-0 ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex h-[54px] shrink-0 items-center justify-between gap-2 pt-3.5 pr-2 pb-2 pl-6">
          <div className="text-content-primary flex min-w-0 flex-1 flex-wrap items-baseline gap-0 text-[17px]/[24px]">
            <h3 className="min-w-0 text-left">
              <span className="font-bold">{title}</span>
              {" "}
              <span className="font-normal">
                • {subtitleLine}
              </span>
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <MoreButton
              menu={
                <WorkloadInsightsOverflow
                  hideDisplayFilter
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  monthBreakdownByReturnType={monthBreakdownByReturnType}
                  onMonthBreakdownByReturnTypeChange={
                    setMonthBreakdownByReturnType
                  }
                  timePeriod={timePeriod}
                  onTimePeriodChange={setTimePeriod}
                  filterRole={filterRole}
                  onFilterRoleChange={setFilterRole}
                  selectedAccountManagerId={accountManagerId}
                  onAccountManagerChange={setAccountManagerId}
                  selectedManagerId={managerId}
                  onManagerChange={setManagerId}
                />
              }
              menuClassName="min-w-[300px] max-w-[360px]"
              position={{ to: "bottom end", gap: "4px" }}
            />
          </div>
        </div>

        {/* Chart + legend: chart flex-1 fills body; legend shrink-0; footer mt-auto */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mt-4 flex min-h-0 min-w-0 flex-1 flex-col px-4 pt-2">
            <div
              className={`flex min-h-0 min-w-0 flex-1 flex-col origin-top will-change-[opacity,transform] motion-reduce:transition-none ${
                prefersReducedMotion
                  ? ""
                  : `transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)]`
              }`}
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      transitionDuration: chartReveal
                        ? `${VIEW_MODE_ENTER_MS}ms`
                        : `${VIEW_MODE_EXIT_MS}ms`,
                      opacity: chartReveal ? 1 : 0,
                      transform: chartReveal
                        ? "translateY(0) scale(1)"
                        : "translateY(6px) scale(0.985)",
                    }
              }
            >
              <WorkloadInsightsChart
                key={`${chartViewMode}-${filterRole}-${chartPersonId}-${timePeriod}-${monthBreakdownByReturnType}-${monthPriorYearAsLine}`}
                className="min-h-0"
                colSpan={colSpan}
                viewMode={chartViewMode}
                filterRole={filterRole}
                personId={chartPersonId}
                timePeriod={timePeriod}
                motionReduced={prefersReducedMotion}
                emphasizedSeriesIndex={
                  chartViewMode === "returnType" ? null : legendHoverIndex
                }
                monthBreakdownByReturnType={monthBreakdownByReturnType}
                monthPriorYearAsLine={monthPriorYearAsLine}
              />
            </div>
          </div>

          {/* Legend — hidden for return-type view (vertical columns, no legend) */}
          {chartViewMode !== "returnType" ? (
          <div
            className={`relative mt-2 mb-4 ml-6 mr-6 flex shrink-0 justify-end ${
              chartViewMode === "monthLine"
                ? "min-w-0 flex-nowrap gap-2 overflow-x-auto"
                : "flex-wrap gap-6"
            }`}
          >
            {chartViewMode === "monthLine" ? (
              <>
                <div
                  className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                  onMouseEnter={() =>
                    setLegendHoverIndex(MONTH_LINE_SERIES_CURRENT)
                  }
                  onMouseLeave={() => setLegendHoverIndex(null)}
                >
                  <span
                    className="inline-block h-0 w-[14px] shrink-0 self-center border-b-2 border-solid"
                    style={{
                      borderColor: colors.dataViz.tonal.fill04,
                    }}
                    aria-hidden
                  />
                  <span className="text-[13px]/[20px] text-[#59606d]">
                    This year
                  </span>
                </div>
                <div
                  className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                  onMouseEnter={() =>
                    setLegendHoverIndex(MONTH_LINE_SERIES_PREVIOUS)
                  }
                  onMouseLeave={() => setLegendHoverIndex(null)}
                >
                  <span
                    className="inline-block h-0 w-[14px] shrink-0 self-center border-b-2 border-dashed"
                    style={{
                      borderColor: colors.dataViz.framework.referenceStroke,
                    }}
                    aria-hidden
                  />
                  <span className="text-[13px]/[20px] text-[#59606d]">
                    Target
                  </span>
                </div>
              </>
            ) : (
              <>
                {chartViewMode === "month" && !monthBreakdownByReturnType ? (
                  <>
                    <div
                      className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                      onMouseEnter={() => setLegendHoverIndex(0)}
                      onMouseLeave={() => setLegendHoverIndex(null)}
                    >
                      <div
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor: MONTH_AGGREGATE_FILED_COLOR,
                        }}
                      />
                      <span className="text-[13px]/[20px] text-[#59606d]">
                        {MONTH_AGGREGATE_FILED_LABEL}
                      </span>
                    </div>
                    <div
                      className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                      onMouseEnter={() =>
                        setLegendHoverIndex(comparisonLegendIndex)
                      }
                      onMouseLeave={() => setLegendHoverIndex(null)}
                    >
                      <span
                        className="inline-block h-[2px] w-[14px] shrink-0 rounded-sm"
                        style={{
                          backgroundColor: colors.dataViz.framework.referenceStroke,
                        }}
                        aria-hidden
                      />
                      <span className="text-[13px]/[20px] text-[#59606d]">
                        {WORKLOAD_EOT_TARGET_LINE_LABEL}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {RETURN_TYPE_LABELS.map((label, i) => (
                      <div
                        key={label}
                        className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                        onMouseEnter={() => setLegendHoverIndex(i)}
                        onMouseLeave={() => setLegendHoverIndex(null)}
                      >
                        <div
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: RETURN_TYPE_COLORS[i] }}
                        />
                        <span className="text-[13px]/[20px] text-[#59606d]">
                          {label}
                        </span>
                      </div>
                    ))}
                    {chartViewMode === "month" ? (
                      <div
                        className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                        onMouseEnter={() =>
                          setLegendHoverIndex(comparisonLegendIndex)
                        }
                        onMouseLeave={() => setLegendHoverIndex(null)}
                      >
                        {monthPriorYearAsLine && monthBreakdownByReturnType ? (
                          <span
                            className="inline-block h-[2px] w-[14px] shrink-0 rounded-sm"
                            style={{
                              backgroundColor: colors.dataViz.framework.referenceStroke,
                            }}
                            aria-hidden
                          />
                        ) : (
                          <div
                            className="h-3 w-3 shrink-0 rounded-sm"
                            style={{
                              backgroundColor: colors.dataViz.framework.keylines,
                            }}
                            aria-hidden
                          />
                        )}
                        <span className="text-[13px]/[20px] text-[#59606d]">
                          {WORKLOAD_EOT_TARGET_LINE_LABEL}
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
              </>
            )}
          </div>
          ) : null}
        </div>

        {/* Action buttons — aligned with Annual tax returns (breathing room above footer like chart→button gap there) */}
        <div className="relative mt-auto mr-auto mb-6 ml-6 flex shrink-0 gap-2 pt-6">
          <Link
            href="/tax/all-returns"
            className="border-border-primary text-brand-primary inline-block w-auto flex-none cursor-pointer rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
          >
            Go to tax
          </Link>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default WorkloadInsights;
