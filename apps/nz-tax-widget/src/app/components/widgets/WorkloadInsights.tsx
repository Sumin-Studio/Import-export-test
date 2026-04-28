"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { WorkloadInsightsChart } from "@/components/charts";
import {
  MONTH_AGGREGATE_FILED_COLOR,
  MONTH_AGGREGATE_FILED_LABEL,
  monthLineSeriesIndex,
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
} from "./overflow/workload-insights";
import {
  workloadEotTargetLineLabel,
  type WorkloadFilterRole,
  type WorkloadTimePeriod,
} from "@/app/lib/mockData/workloadInsights";
import { TAX_YEAR_OPTIONS } from "@/app/lib/mockData/annualTaxReturns";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import { useRegion } from "@/app/contexts/RegionContext";
import { effectivePipelineStage } from "@/app/lib/prototypeSettings";

const DEFAULT_FY_SHORT_LABEL =
  TAX_YEAR_OPTIONS.find((y) => y.id === "fy26")?.shortLabel ?? "FY26";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
  /**
   * Initial chart mode. Use `"monthLine"` for the trend chart (current vs target).
   * Use `"month"` for monthly filed totals with EOT spline; `"returnType"` for by-type columns.
   */
  initialViewMode?: WorkloadViewMode;
  /** Main heading before the subtitle bullet. */
  title?: string;
  /** Financial year label in the title row (e.g. FY26), aligned with other tax widgets. */
  fyShortLabel?: string;
}

const VIEW_MODE_EXIT_MS = 200;
const VIEW_MODE_ENTER_MS = 320;

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
  initialViewMode = "monthLine",
  title = "Returns by month",
  fyShortLabel = DEFAULT_FY_SHORT_LABEL,
}: ComponentProps) {
  const { region } = useRegion();
  const { stage } = usePrototypeSettings();
  const pipelineStage = useMemo(
    () => effectivePipelineStage(stage),
    [stage]
  );
  const eotTargetLineLabel = useMemo(
    () => workloadEotTargetLineLabel(pipelineStage),
    [pipelineStage]
  );
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
  const [timePeriod, setTimePeriod] = useState<WorkloadTimePeriod>("thisYear");
  const isReturnsByMonthWidget = initialViewMode === "monthLine";
  /**
   * **Returns by month** only (`initialViewMode === "monthLine"`): NZ XPAC uses This year / Last year
   * radios. NZ GA and Agentic (`ai`) use Compare → **This time last year**; Tailor uses **Last year**
   * for the same checkbox + dotted comparison line (not used on Returns by type).
   */
  const nzReturnsByMonthUseYearRadios =
    region === "NZ" && isReturnsByMonthWidget && stage === "xpac";
  /** NZ GA + Agentic: Practice row, Tax bar–aligned chart colours, etc. */
  const nzReturnsByMonthFirmRowPractice =
    region === "NZ" &&
    isReturnsByMonthWidget &&
    (stage === "ga" || stage === "ai");
  const [showLastYearTrend, setShowLastYearTrend] = useState(false);

  const [legendHoverIndex, setLegendHoverIndex] = useState<number | null>(null);

  const chartPersonId =
    filterRole === "firm"
      ? ""
      : filterRole === "accountManager"
        ? accountManagerId
        : managerId;

  /** Returns by month always titles the selected FY; Returns by type still follows overflow year. */
  const headlineFyShortLabel = useMemo(
    () =>
      isReturnsByMonthWidget
        ? nzReturnsByMonthUseYearRadios && timePeriod === "lastYear"
          ? TAX_YEAR_OPTIONS.find((y) => y.id === "fy25")?.shortLabel ?? "FY25"
          : fyShortLabel
        : timePeriod === "lastYear"
          ? TAX_YEAR_OPTIONS.find((y) => y.id === "fy25")?.shortLabel ?? "FY25"
          : fyShortLabel,
    [
      isReturnsByMonthWidget,
      nzReturnsByMonthUseYearRadios,
      timePeriod,
      fyShortLabel,
    ]
  );

  const chartTimePeriod: WorkloadTimePeriod = isReturnsByMonthWidget
    ? nzReturnsByMonthUseYearRadios
      ? timePeriod
      : "thisYear"
    : timePeriod;

  /** Person or firm scope only — FY in headline except NZ GA/Agentic Returns by month. */
  const subtitleLine = useMemo(() => {
    if (filterRole === "firm") {
      if (nzReturnsByMonthFirmRowPractice) {
        return "";
      }
      return "All returns";
    }
    return personDisplayName(
      filterRole,
      accountManagerId,
      managerId
    );
  }, [filterRole, accountManagerId, managerId, nzReturnsByMonthFirmRowPractice]);

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

  const comparisonLegendIndex =
    chartViewMode === "month" ? 1 : RETURN_TYPE_LABELS.length;

  /** Month + month-line views fill the grid cell so the plot can use ResizeObserver height. */
  const fillVerticalSpace =
    chartViewMode === "month" || chartViewMode === "monthLine";
  /** Slightly tighter chart/legend/footer spacing so the plot gains vertical room. */
  const monthChartTightLayout =
    chartViewMode === "month" || chartViewMode === "monthLine";

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
      className={fillVerticalSpace ? "h-full min-h-0" : ""}
    >
      <div
        className={`relative flex min-h-0 flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          fillVerticalSpace
            ? "h-full min-h-[522px]"
            : "h-[522px]"
        } ${colSpan === 2 ? "w-full" : "w-[440px]"} min-w-[440px] ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex h-[54px] shrink-0 items-center justify-between gap-2 pt-3.5 pr-2 pb-2 pl-6">
          <div className="text-content-primary flex min-w-0 flex-1 flex-wrap items-baseline gap-0 text-[17px]/[24px]">
            <h3 className="min-w-0 text-left">
              <span className="font-bold">{title}</span>
              {nzReturnsByMonthFirmRowPractice ? null : (
                <span className="font-normal"> • {headlineFyShortLabel}</span>
              )}
              {subtitleLine ? (
                <span className="font-normal"> • {subtitleLine}</span>
              ) : null}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <MoreButton
              menu={
                <WorkloadInsightsOverflow
                  hideDisplayFilter
                  radioGroupPrefix={`workload-insights-${initialViewMode}`}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  timePeriod={timePeriod}
                  onTimePeriodChange={setTimePeriod}
                  timePeriodLayout={
                    isReturnsByMonthWidget
                      ? nzReturnsByMonthUseYearRadios
                        ? "yearRadios"
                        : "lastYearCheckbox"
                      : "yearRadios"
                  }
                  showLastYearTrend={showLastYearTrend}
                  onShowLastYearTrendChange={setShowLastYearTrend}
                  lastYearTrendCheckboxLabel={
                    nzReturnsByMonthFirmRowPractice
                      ? "This time last year"
                      : undefined
                  }
                  filterRole={filterRole}
                  onFilterRoleChange={setFilterRole}
                  selectedAccountManagerId={accountManagerId}
                  onAccountManagerChange={setAccountManagerId}
                  selectedManagerId={managerId}
                  onManagerChange={setManagerId}
                  firmFilterRowLabel={
                    nzReturnsByMonthFirmRowPractice ? "Practice" : undefined
                  }
                />
              }
              menuClassName="min-w-[300px] max-w-[360px]"
              position={{ to: "bottom end", gap: "4px" }}
            />
          </div>
        </div>

        {/* Chart + legend: chart flex-1 fills body; legend shrink-0; footer mt-auto */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div
            className={`flex min-h-0 min-w-0 flex-1 flex-col px-4 ${
              monthChartTightLayout ? "mt-3 pt-1" : "mt-4 pt-2"
            }`}
          >
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
                key={`${chartViewMode}-${filterRole}-${chartPersonId}-${chartTimePeriod}-${pipelineStage}-${showLastYearTrend}`}
                className="min-h-0 w-full flex-1"
                colSpan={colSpan}
                viewMode={chartViewMode}
                filterRole={filterRole}
                personId={chartPersonId}
                timePeriod={chartTimePeriod}
                eotTargetLineLabel={eotTargetLineLabel}
                motionReduced={prefersReducedMotion}
                emphasizedSeriesIndex={
                  chartViewMode === "returnType" ? null : legendHoverIndex
                }
                showLastYearTrend={
                  isReturnsByMonthWidget
                    ? nzReturnsByMonthUseYearRadios
                      ? false
                      : showLastYearTrend
                    : false
                }
                monthLineThisYearColor={
                  chartViewMode === "monthLine" &&
                  nzReturnsByMonthFirmRowPractice
                    ? colors.xBlue600
                    : undefined
                }
                monthLineLastYearTrendColor={
                  chartViewMode === "monthLine" &&
                  nzReturnsByMonthFirmRowPractice
                    ? colors.dataViz.tonal.fill04
                    : undefined
                }
              />
            </div>
          </div>

          {/* Legend — hidden for return-type view (vertical columns, no legend) */}
          {chartViewMode !== "returnType" ? (
          <div
            className={`relative ml-6 mr-6 flex shrink-0 justify-end ${
              monthChartTightLayout ? "mt-1.5 mb-3" : "mt-2 mb-4"
            } ${
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
                    setLegendHoverIndex(
                      monthLineSeriesIndex("filed", showLastYearTrend)
                    )
                  }
                  onMouseLeave={() => setLegendHoverIndex(null)}
                >
                  <span
                    className="inline-block h-0 w-[14px] shrink-0 self-center border-b-2 border-solid"
                    style={{
                      borderColor: nzReturnsByMonthFirmRowPractice
                        ? colors.xBlue600
                        : colors.dataViz.tonal.fill04,
                    }}
                    aria-hidden
                  />
                  <span className="text-[13px]/[20px] text-[#59606d]">
                    Filed returns
                  </span>
                </div>
                {showLastYearTrend ? (
                  <div
                    className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                    onMouseEnter={() =>
                      setLegendHoverIndex(
                        monthLineSeriesIndex("lastYearTrend", true)
                      )
                    }
                    onMouseLeave={() => setLegendHoverIndex(null)}
                  >
                    <span
                      className="inline-block h-0 w-[14px] shrink-0 self-center border-b-2 border-dotted"
                      style={{
                        borderColor: nzReturnsByMonthFirmRowPractice
                          ? colors.dataViz.tonal.fill04
                          : colors.dataViz.tonal.fill06,
                      }}
                      aria-hidden
                    />
                    <span className="text-[13px]/[20px] text-[#59606d]">
                      Last year
                    </span>
                  </div>
                ) : null}
                <div
                  className="flex cursor-default items-center gap-1 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]"
                  onMouseEnter={() =>
                    setLegendHoverIndex(
                      monthLineSeriesIndex("eot", showLastYearTrend)
                    )
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
                    {eotTargetLineLabel}
                  </span>
                </div>
              </>
            ) : (
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
                    className="inline-block h-0 w-[14px] shrink-0 self-center border-b-2 border-dashed"
                    style={{
                      borderColor: colors.dataViz.framework.referenceStroke,
                    }}
                    aria-hidden
                  />
                  <span className="text-[13px]/[20px] text-[#59606d]">
                    {eotTargetLineLabel}
                  </span>
                </div>
              </>
            )}
          </div>
          ) : null}
        </div>

        {/* Action buttons — aligned with Annual tax returns (breathing room above footer like chart→button gap there) */}
        <div
          className={`relative mt-auto mr-auto mb-6 ml-6 flex shrink-0 gap-2 ${
            monthChartTightLayout ? "pt-4" : "pt-6"
          }`}
        >
          <Link
            href="/tax/all-returns"
            className="border-border-primary text-brand-primary inline-block w-auto flex-none cursor-pointer rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
          >
            {region === "NZ" ? "Go to tax" : "Go to tax manager"}
          </Link>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default WorkloadInsights;
