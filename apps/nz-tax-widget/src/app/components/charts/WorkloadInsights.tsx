"use client";

import React, {
  ReactElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme, { colors } from "./Theme";
import {
  MONTH_LABELS_FY,
  MONTH_LABELS_FY_FULL,
  RETURN_TYPE_LABELS,
  WORKLOAD_EXPECTED_RETURNS_LABEL,
  WORKLOAD_MONTH_LINE_AS_OF_DATE,
  buildWorkloadMonthLineActualData,
  buildWorkloadMonthLineTargetData,
  getWorkloadDataForSelection,
  getWorkloadEotTargetMonthlyTotals,
  getWorkloadExpectedReturnsByReturnType,
  getWorkloadMonthLineAsOfProgress,
  type WorkloadFilterRole,
  type WorkloadTimePeriod,
} from "@/app/lib/mockData/workloadInsights";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

/** Return type colors — distinct palette for IR3, IR3NR, IR4, IR6, IR7, IR8, IR9 */
const RETURN_TYPE_COLORS = [
  colors.dataViz.tonal.fill04, // IR3
  colors.dataViz.tonal.fill05, // IR3NR
  colors.dataViz.tonal.fill06, // IR4
  colors.dataViz.tonal.fill07, // IR6
  colors.dataViz.tonal.fill08, // IR7
  colors.dataViz.tonal.fill09, // IR8
  colors.xViolet300, // IR9 — distinct from blue ramp + grey
] as const;

export type WorkloadViewMode = "month" | "monthLine" | "returnType";

/** Running total of monthly values (Apr–Mar → monotonic cumulative series). */
function cumulativeFromMonthly(values: readonly number[]): number[] {
  let acc = 0;
  return values.map((v) => {
    acc += v;
    return acc;
  });
}

export type { WorkloadFilterRole, WorkloadTimePeriod };

export { RETURN_TYPE_LABELS, RETURN_TYPE_COLORS };

/** Month view (aggregate): single series label — keep in sync with widget legend */
export const MONTH_AGGREGATE_FILED_LABEL = "Filed";
/** Month view (aggregate): series colour — keep in sync with widget legend */
export const MONTH_AGGREGATE_FILED_COLOR = colors.dataViz.tonal.fill05;

/** Index of return-type stack series to emphasize, or `1` for EOT target (month aggregate), or `null` for none */
export type WorkloadLegendHighlightIndex = number | null;

/** `monthLine` — filed this FY (when two series: index 0; when three: index 2). */
export const MONTH_LINE_SERIES_CURRENT = 0;
/** `monthLine` — EOT target when only two series (index 1). Prefer {@link monthLineSeriesIndex}. */
export const MONTH_LINE_SERIES_PREVIOUS = 1;

/**
 * Highcharts `series` index for month-line hover dimming (order is last-year, EOT, filed when
 * `showLastYearTrend`; otherwise filed, EOT).
 */
export function monthLineSeriesIndex(
  series: "filed" | "lastYearTrend" | "eot",
  showLastYearTrend: boolean
): number {
  if (!showLastYearTrend) {
    return series === "filed" ? 0 : 1;
  }
  if (series === "lastYearTrend") return 0;
  if (series === "eot") return 1;
  return 2;
}

interface ComponentProps {
  className?: string;
  colSpan?: number;
  viewMode: WorkloadViewMode;
  filterRole: WorkloadFilterRole;
  personId: string;
  timePeriod: WorkloadTimePeriod;
  /** Dashed target line label (i2: Interim target; XPAC: IRD interim target). */
  eotTargetLineLabel: string;
  /** When true, skip chart animations (matches prefers-reduced-motion). */
  motionReduced?: boolean;
  /** Legend hover: return-type / comparison (month bars), or current/previous line (`monthLine`); others dim */
  emphasizedSeriesIndex?: WorkloadLegendHighlightIndex;
  /**
   * When true (Returns by month), adds a prior-FY cumulative filed trend line (`monthLine` only).
   */
  showLastYearTrend?: boolean;
  /**
   * NZ GA/Agentic: optional stroke for “Filed returns” (this FY) — aligns with Tax returns current-year bars (`xBlue600`).
   */
  monthLineThisYearColor?: string;
  /**
   * NZ GA/Agentic: optional stroke for “Last year” dotted trend — aligns with Tax returns prior-FY bars (`tonal.fill04`).
   */
  monthLineLastYearTrendColor?: string;
}

const DIM_OPACITY = 0.22;

function WorkloadInsightsChart({
  className,
  colSpan,
  viewMode,
  filterRole,
  personId,
  timePeriod,
  eotTargetLineLabel,
  motionReduced = false,
  emphasizedSeriesIndex = null,
  showLastYearTrend = false,
  monthLineThisYearColor,
  monthLineLastYearTrendColor,
}: ComponentProps): ReactElement {
  const mouseYRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartPixelHeight, setChartPixelHeight] = useState(320);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const h = Math.round(entries[0]?.contentRect.height ?? 0);
      if (h > 0) {
        setChartPixelHeight((prev) => {
          const next = Math.max(120, h);
          return next === prev ? prev : next;
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const options = useMemo((): Highcharts.Options => {
    const data = getWorkloadDataForSelection(
      filterRole,
      personId,
      timePeriod
    );
    const comparisonMonthly = getWorkloadEotTargetMonthlyTotals(
      filterRole,
      personId,
      timePeriod
    );
    /** Cumulative EOT target for month bar view (y-scale + dashed spline). */
    const eotTargetCumulative = cumulativeFromMonthly(comparisonMonthly);
    const comparisonLineLabel = eotTargetLineLabel;
    const isMonthLine = viewMode === "monthLine";
    const isMonth = viewMode === "month";
    const isReturnType = viewMode === "returnType";
    const expectedByReturnType = isReturnType
      ? getWorkloadExpectedReturnsByReturnType(
          filterRole,
          personId,
          timePeriod
        )
      : [];
    /** Month bars: dashed EOT target spline (same curve as month line chart). */
    const showPriorYearSpline = isMonth;
    const categories = isMonth || isMonthLine
      ? [...MONTH_LABELS_FY]
      : [...RETURN_TYPE_LABELS];
    const tooltipCategories = isMonth || isMonthLine
      ? [...MONTH_LABELS_FY_FULL]
      : [...RETURN_TYPE_LABELS];

    if (isMonthLine) {
      const currentMonthlyFull = cumulativeFromMonthly(data.workloadByMonth.filed);
      const previousMonthlyFull = cumulativeFromMonthly(comparisonMonthly);
      const poolD = getWorkloadExpectedReturnsByReturnType(
        filterRole,
        personId,
        timePeriod
      ).reduce((a, b) => a + b, 0);
      const actualNumeric = buildWorkloadMonthLineActualData(
        currentMonthlyFull,
        data.workloadByMonth.filed,
        WORKLOAD_MONTH_LINE_AS_OF_DATE
      );
      const targetNumeric = buildWorkloadMonthLineTargetData(
        previousMonthlyFull,
        poolD,
        WORKLOAD_MONTH_LINE_AS_OF_DATE
      );

      const dataLastYear = showLastYearTrend
        ? getWorkloadDataForSelection(filterRole, personId, "lastYear")
        : null;
      const lastYearActualNumeric =
        showLastYearTrend && dataLastYear
          ? buildWorkloadMonthLineActualData(
              cumulativeFromMonthly(dataLastYear.workloadByMonth.filed),
              dataLastYear.workloadByMonth.filed,
              WORKLOAD_MONTH_LINE_AS_OF_DATE
            )
          : null;

      const highlightIdx = Math.min(
        getWorkloadMonthLineAsOfProgress(WORKLOAD_MONTH_LINE_AS_OF_DATE)
          .monthIndex,
        actualNumeric.length - 1
      );
      const numericMax = Math.max(
        1,
        ...actualNumeric.filter((v): v is number => v != null),
        ...targetNumeric.filter((v): v is number => v != null),
        ...(lastYearActualNumeric ?? []).filter((v): v is number => v != null)
      );
      const dataMax = numericMax;
      const yMax = Math.max(50, Math.ceil(dataMax / 50) * 50);
      const tickStep = yMax / 5;
      const tickPositions = [
        0,
        tickStep,
        tickStep * 2,
        tickStep * 3,
        tickStep * 4,
        yMax,
      ];
      const currentYearLabel = "Filed returns";
      const previousYearLabel = comparisonLineLabel;
      const lastYearSeriesLabel = "Last year";
      const lineColorCurrent =
        monthLineThisYearColor ?? colors.dataViz.tonal.fill04;
      const lineColorEotTarget = colors.dataViz.framework.referenceStroke;
      const lineColorLastYear =
        monthLineLastYearTrendColor ?? colors.dataViz.tonal.fill06;
      const seriesAnim =
        motionReduced === true
          ? false
          : { duration: 580, easing: "easeOutQuart" as const };

      const lineOpacity = (seriesIndex: number): number => {
        if (emphasizedSeriesIndex === null) return 1;
        return emphasizedSeriesIndex === seriesIndex ? 1 : DIM_OPACITY;
      };

      const currentData = actualNumeric.map((y, i) =>
        y === null
          ? null
          : i === highlightIdx
            ? {
                y,
                marker: {
                  enabled: true,
                  symbol: "circle",
                  radius: 4,
                  lineWidth: 1,
                  lineColor: "#ffffff",
                  fillColor: lineColorCurrent,
                },
              }
            : y
      );

      const lastYearData =
        lastYearActualNumeric?.map((y, i) =>
          y === null
            ? null
            : i === highlightIdx
              ? {
                  y,
                  marker: {
                    enabled: true,
                    symbol: "circle",
                    radius: 4,
                    lineWidth: 1,
                    lineColor: "#ffffff",
                    fillColor: lineColorLastYear,
                  },
                }
              : y
        ) ?? null;

      const monthLineSeries: Highcharts.SeriesOptionsType[] = [];
      if (showLastYearTrend && lastYearData) {
        monthLineSeries.push({
          type: "line",
          name: lastYearSeriesLabel,
          data: lastYearData,
          color: lineColorLastYear,
          lineWidth: 2,
          dashStyle: "ShortDot",
          zIndex: 1,
          clip: false,
          opacity: lineOpacity(
            monthLineSeriesIndex("lastYearTrend", showLastYearTrend)
          ),
          animation: seriesAnim,
        });
      }
      monthLineSeries.push(
        {
          type: "line",
          name: previousYearLabel,
          data: targetNumeric,
          color: lineColorEotTarget,
          lineWidth: 2,
          dashStyle: "ShortDash",
          zIndex: 2,
          clip: false,
          opacity: lineOpacity(monthLineSeriesIndex("eot", showLastYearTrend)),
          animation: seriesAnim,
        },
        {
          type: "line",
          name: currentYearLabel,
          data: currentData,
          color: lineColorCurrent,
          lineWidth: 2,
          zIndex: 3,
          clip: false,
          opacity: lineOpacity(
            monthLineSeriesIndex("filed", showLastYearTrend)
          ),
          animation: seriesAnim,
        }
      );

      const a11yMonthLine =
        "Tax returns by month: cumulative filed this financial year versus IRD EOT guideline, both ending mid-March (prototype as-of date) so lines do not extend to month-end. Actual progress is slightly below the guideline for a realistic gap." +
        (showLastYearTrend
          ? " Optional dotted line: prior-year cumulative filed at the same FY month index."
          : "");

      return {
        chart: {
          /** Fills widget body height (ResizeObserver). */
          height: chartPixelHeight,
          type: "line",
          spacingBottom: 0,
          animation: motionReduced ? false : { duration: 420 },
        },
        accessibility: {
          description: a11yMonthLine,
        },
        legend: { enabled: false },
        xAxis: {
          categories,
          labels: {
            style: {
              color: colors.dataViz.framework.labels,
              fontSize: "13px",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            },
          },
          lineColor: colors.dataViz.tonal.border,
        },
        yAxis: {
          min: 0,
          max: yMax,
          tickPositions,
          title: { text: undefined },
          labels: {
            style: {
              color: colors.dataViz.framework.labels,
              fontSize: "13px",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            },
          },
          gridLineColor: colors.dataViz.framework.keylines,
          gridLineWidth: 1,
        },
        plotOptions: {
          line: {
            connectNulls: false,
            marker: {
              enabled: true,
              radius: 0,
              states: { hover: { enabled: false } },
            },
            animation: seriesAnim,
          },
          series: {
            animation: seriesAnim,
            states: { inactive: { opacity: 1 } },
          },
        },
        series: monthLineSeries,
        tooltip: {
          shared: true,
          useHTML: true,
          backgroundColor: "transparent",
          borderWidth: 0,
          shadow: false,
          padding: 0,
          positioner(labelWidth, labelHeight, point) {
            const chartRect = this.chart.container.getBoundingClientRect();
            const y = mouseYRef.current - chartRect.top - labelHeight - 10;
            const x = point.plotX + this.chart.plotLeft - labelWidth / 2;
            return { x, y };
          },
          formatter() {
            const linePts = (this.points ?? []).filter(
              (p) => p.series.type === "line"
            );
            /** Tooltip: EOT, then last year (if any), then filed */
            const pts = [...linePts].sort((a, b) => {
              const rank = (name: string) => {
                if (name === previousYearLabel) return 0;
                if (name === lastYearSeriesLabel) return 1;
                if (name === currentYearLabel) return 2;
                return 3;
              };
              return rank(String(a.series.name)) - rank(String(b.series.name));
            });
            const idx = pts[0]?.index;
            const tooltipTitle =
              typeof idx === "number" && tooltipCategories[idx] !== undefined
                ? String(tooltipCategories[idx])
                : String(this.x ?? "");
            const rows = pts
              .map(
                (p) => `
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
              <span style="width:8px;height:8px;background:${p.color};border-radius:100%;flex-shrink:0;"></span>
              <span style="flex:1;font-size:13px;color:${colors.textDark};">${p.series.name}</span>
              <span style="font-size:13px;color:${colors.textDark};white-space:nowrap;">${Number(p.y).toLocaleString()}</span>
            </div>`
              )
              .join("");
            return `
            <div style="position:relative;background:${colors.backgroundDefault};border:1px solid ${colors.tooltipBorder};border-radius:8px;padding:12px 14px;box-shadow:${colors.tooltipShadow};min-width:200px;">
              <div style="font-weight:700;font-size:13px;color:${colors.textDark};margin-bottom:8px;">${tooltipTitle}</div>
              ${rows}
              <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid ${colors.tooltipBorder};" aria-hidden="true"></div>
              <div style="position:absolute;bottom:-6.5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid ${colors.backgroundDefault};" aria-hidden="true"></div>
            </div>`;
          },
        },
      };
    }

    /** Build series by return type (IR3, IR4 Companies, IR4 Company, IR6, Other) */
    const returnTypeData: number[][] = !isMonth
      ? RETURN_TYPE_LABELS.map((_, j) =>
          categories.map((_, i) =>
            i === j ? data.workloadByReturnType.filed[j]! : 0
          )
        )
      : [];

    const maxStack = categories.map((_, i) => {
      if (isMonth) {
        return data.workloadByMonth.filed[i]!;
      }
      const filedStack = returnTypeData.reduce(
        (sum, row) => sum + (row[i] ?? 0),
        0
      );
      if (isReturnType && expectedByReturnType.length > 0) {
        return Math.max(filedStack, expectedByReturnType[i] ?? 0);
      }
      return filedStack;
    });
    const dataMax = Math.max(
      ...maxStack,
      ...(isMonth ? eotTargetCumulative : [0])
    );
    const yMax = Math.max(50, Math.ceil(dataMax / 50) * 50);
    const tickStep = yMax / 5;
    const tickPositions = [
      0,
      tickStep,
      tickStep * 2,
      tickStep * 3,
      tickStep * 4,
      yMax,
    ];

    /** Return-type view uses vertical columns (same as month), not horizontal bars. */
    const stackType: "column" | "bar" =
      isMonth || isReturnType ? "column" : "bar";

    const seriesAnim =
      motionReduced === true
        ? false
        : { duration: 580, easing: "easeOutQuart" as const };

    const nReturnTypes = RETURN_TYPE_LABELS.length;
    /** Month aggregate: legend 0 = filed, 1 = EOT; return-type view: n = Expected backdrop */
    const targetHighlightIndex = isMonth ? 1 : nReturnTypes;

    const stackOpacity = (seriesIndex: number): number => {
      if (emphasizedSeriesIndex === null) return 1;
      if (emphasizedSeriesIndex === targetHighlightIndex) return DIM_OPACITY;
      return emphasizedSeriesIndex === seriesIndex ? 1 : DIM_OPACITY;
    };

    /** Same grey as Time summary “Capacity” bars and legend swatch. */
    const timeSummaryCapacityGrey = "#e6e7e9";

    const stackSeries = (
      name: string,
      data: number[],
      color: string,
      seriesIndex: number
    ): Highcharts.SeriesBarOptions | Highcharts.SeriesColumnOptions => ({
      type: stackType,
      name,
      data,
      stack: "workload",
      color,
      opacity: stackOpacity(seriesIndex),
      animation: seriesAnim,
      ...(isMonth
        ? {
            zIndex: 3,
            /** Narrower than grey backdrop so keylines column shows at sides (plotOptions default 0.02 is too wide). */
            pointPadding: 0.14,
          }
        : isReturnType
          ? {
              /** Above Expected backdrop (zIndex 1), same stacking order as Time summary Billable on Capacity */
              zIndex: 3,
              pointPadding: 0.14,
            }
          : {}),
    });

    const series: Highcharts.SeriesOptionsType[] = isMonth
      ? [
          stackSeries(
            MONTH_AGGREGATE_FILED_LABEL,
            [...data.workloadByMonth.filed],
            MONTH_AGGREGATE_FILED_COLOR,
            0
          ),
        ]
      : RETURN_TYPE_LABELS.map((label, j) =>
          stackSeries(label, returnTypeData[j]!, RETURN_TYPE_COLORS[j]!, j)
        );

    if (isReturnType && expectedByReturnType.length > 0) {
      const expectedBackdropOpacity =
        emphasizedSeriesIndex === null ? 1 : DIM_OPACITY;
      /** Returns-by-type Expected backdrop — same pattern as Time summary “Capacity” (grouping off, wider pointPadding). */
      series.unshift({
        type: "column",
        name: WORKLOAD_EXPECTED_RETURNS_LABEL,
        data: expectedByReturnType.map((y, j) => ({
          y,
          x: j,
          color: timeSummaryCapacityGrey,
        })),
        zIndex: 1,
        grouping: false,
        stacking: null as unknown as Highcharts.SeriesColumnOptions["stacking"],
        /** Same as stacked workload columns so grey backdrop aligns and centres with stacks */
        pointPadding: 0.14,
        pointPlacement: 0,
        borderWidth: 0,
        enableMouseTracking: true,
        opacity: expectedBackdropOpacity,
        animation: seriesAnim,
      } as Highcharts.SeriesColumnOptions);
    }

    if (showPriorYearSpline) {
      const lineOpacity =
        emphasizedSeriesIndex === null
          ? 1
          : emphasizedSeriesIndex === targetHighlightIndex
            ? 1
            : DIM_OPACITY;
      series.push({
        type: "spline",
        name: comparisonLineLabel,
        data: [...eotTargetCumulative],
        color: colors.dataViz.framework.referenceStroke,
        dashStyle: "ShortDash",
        lineWidth: 2,
        marker: { enabled: false },
        zIndex: 5,
        enableMouseTracking: true,
        opacity: lineOpacity,
        animation: seriesAnim,
      } as Highcharts.SeriesSplineOptions);
    }

    return {
      chart: {
        /** Fills widget body height (ResizeObserver). */
        height: chartPixelHeight,
        type: isMonth || isReturnType ? "column" : "bar",
        spacingBottom: 0,
        animation: motionReduced ? false : { duration: 420 },
      },
      accessibility: {
        description: isMonth
          ? "Workload insights: month view shows total filed returns per month with EOT filing targets as a comparison line."
          : "Workload insights: return-type view shows vertical stacked columns per return type with expected counts as a grey column backdrop.",
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories,
        labels: {
          style: {
            color: colors.dataViz.framework.labels,
            fontSize: "13px",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          },
        },
        lineColor: colors.dataViz.tonal.border,
      },
      yAxis: {
        min: 0,
        max: yMax,
        tickPositions,
        title: { text: undefined },
        labels: {
          style: {
            color: colors.dataViz.framework.labels,
            fontSize: "13px",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          },
        },
        gridLineColor: colors.dataViz.framework.keylines,
        gridLineWidth: 1,
      },
      plotOptions: {
        column: {
          stacking: "normal",
          groupPadding: colSpan === 2 ? 0.08 : 0.1,
          pointPadding: 0.02,
          borderWidth: 0,
          borderRadius: 2,
          animation: seriesAnim,
        },
        bar: {
          stacking: "normal",
          groupPadding: 0.12,
          pointPadding: 0.02,
          borderWidth: 0,
          borderRadius: 2,
          animation: seriesAnim,
        },
        series: {
          animation: seriesAnim,
          states: {
            inactive: { opacity: 1 },
          },
        },
      },
      series,
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: "transparent",
        borderWidth: 0,
        shadow: false,
        padding: 0,
        positioner(labelWidth, labelHeight, point) {
          const chartRect = this.chart.container.getBoundingClientRect();
          const y = mouseYRef.current - chartRect.top - labelHeight - 10;
          const x = point.plotX + this.chart.plotLeft - labelWidth / 2;
          return { x, y };
        },
        formatter() {
          const pts = this.points ?? [];
          const stackPt =
            pts.find(
              (p) =>
                (p.series.type === "column" || p.series.type === "bar") &&
                (p.series.options as { stack?: string }).stack === "workload"
            ) ??
            pts.find(
              (p) =>
                p.series.type === "column" || p.series.type === "bar"
            ) ??
            pts[0];
          const idx = stackPt?.index;
          const barPts = pts.filter(
            (p) => p.series.type === "column" || p.series.type === "bar"
          );
          const stackBarPts = barPts.filter(
            (p) =>
              (p.series.options as { stack?: string }).stack === "workload"
          );
          const returnTypeIdx =
            typeof idx === "number" &&
            idx >= 0 &&
            idx < RETURN_TYPE_LABELS.length
              ? idx
              : null;

          /** Return-type view — Expected + Filed rows with return-type colours */
          if (!isMonth && returnTypeIdx !== null) {
            const expectedPt = pts.find(
              (p) => p.series.name === WORKLOAD_EXPECTED_RETURNS_LABEL
            );
            const expectedVal = expectedPt
              ? Number(expectedPt.y)
              : (expectedByReturnType[returnTypeIdx] ?? 0);
            const typeName = String(RETURN_TYPE_LABELS[returnTypeIdx] ?? "");
            let filedRowsHtml = stackBarPts
              .filter((p) => Number(p.y) > 0)
              .map((p) => {
                const name = String(p.series.name);
                const j = RETURN_TYPE_LABELS.indexOf(
                  name as (typeof RETURN_TYPE_LABELS)[number]
                );
                const swatch =
                  j >= 0 ? RETURN_TYPE_COLORS[j] : String(p.color ?? "");
                const yVal = Number(p.y).toLocaleString();
                return `<div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
              <span style="display:inline-block;width:8px;height:8px;background:${swatch};border-radius:100%;flex-shrink:0;"></span>
              <span style="flex:1;font-size:13px;color:${colors.textDark};">Filed</span>
              <span style="font-size:13px;color:${colors.textDark};white-space:nowrap;">${yVal}</span>
            </div>`;
              })
              .join("");
            if (!filedRowsHtml) {
              const j = returnTypeIdx;
              const swatch = RETURN_TYPE_COLORS[j]!;
              const yVal = Number(
                data.workloadByReturnType.filed[j] ?? 0
              ).toLocaleString();
              filedRowsHtml = `<div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
              <span style="display:inline-block;width:8px;height:8px;background:${swatch};border-radius:100%;flex-shrink:0;"></span>
              <span style="flex:1;font-size:13px;color:${colors.textDark};">Filed</span>
              <span style="font-size:13px;color:${colors.textDark};white-space:nowrap;">${yVal}</span>
            </div>`;
            }
            return `
          <div style="
            background: #ffffff;
            border: 1px solid #a6a9b0;
            border-radius: 8px;
            padding: 10px 14px;
            box-shadow: 0 2px 8px rgba(0, 10, 30, 0.12);
            position: relative;
            min-width: 200px;
          ">
            <div style="
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #a6a9b0;
            "></div>
            <div style="
              position: absolute;
              bottom: -6.5px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #ffffff;
            "></div>
            <div style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 700;
              font-size: 13px;
              line-height: 20px;
              color: #000a1e;
              margin-bottom: 8px;
            ">${typeName}</div>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
              <span style="display:inline-block;width:8px;height:8px;background:#e6e7e9;border-radius:100%;flex-shrink:0;"></span>
              <span style="flex:1;font-size:13px;color:${colors.textDark};">${WORKLOAD_EXPECTED_RETURNS_LABEL}</span>
              <span style="font-size:13px;color:${colors.textDark};white-space:nowrap;">${expectedVal.toLocaleString()}</span>
            </div>
            ${filedRowsHtml}
          </div>`;
          }

          const tooltipTitle =
            typeof idx === "number" && tooltipCategories[idx] !== undefined
              ? String(tooltipCategories[idx])
              : stackPt?.key != null
                ? String(
                    typeof stackPt.key === "number" &&
                      tooltipCategories[stackPt.key] !== undefined
                      ? tooltipCategories[stackPt.key]
                      : stackPt.key
                  )
                : typeof this.x === "number" &&
                    tooltipCategories[this.x] !== undefined
                  ? String(tooltipCategories[this.x])
                  : String(this.x ?? "");
          let rows: string;
          let total: number;
          const tooltipStackPts = isMonth ? stackBarPts : barPts;
          rows = tooltipStackPts
            .map(
              (p) => `
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
              <span style="width:8px;height:8px;background:${p.color};border-radius:100%;flex-shrink:0;"></span>
              <span style="flex:1;font-size:13px;color:${colors.textDark};">${p.series.name}</span>
              <span style="font-size:13px;color:${colors.textDark};white-space:nowrap;">${Number(p.y).toLocaleString()}</span>
            </div>`
            )
            .join("");
          total = tooltipStackPts.reduce(
            (sum, p) => sum + (Number(p.y) || 0),
            0
          );
          const totalRow = `<div style="margin-top:8px;padding-top:8px;border-top:1px solid ${colors.borderLight};display:flex;gap:8px;align-items:center;font-size:13px;font-weight:700;color:${colors.textDark};">
            <span style="flex:1;">Total</span>
            <span style="white-space:nowrap;">${total.toLocaleString()}</span>
          </div>`;
          const targetPt = pts.find(
            (p) => p.series.name === comparisonLineLabel
          );
          /** Month hover: Target (EOT) above filed stack + total */
          const targetRow = targetPt
            ? `<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid ${colors.borderLight};font-size:13px;color:${colors.textLight};display:flex;align-items:center;gap:6px;">
                ${
                  targetPt.series.type === "spline"
                    ? `<span style="display:inline-block;width:14px;height:0;border-bottom:2px solid ${colors.dataViz.framework.referenceStroke};flex-shrink:0;" aria-hidden="true"></span>`
                    : `<span style="display:inline-block;width:8px;height:8px;background:${colors.dataViz.framework.keylines};border-radius:2px;flex-shrink:0;" aria-hidden="true"></span>`
                }
                <span>${targetPt.series.name}: <strong>${Number(targetPt.y).toLocaleString()}</strong></span>
               </div>`
            : "";
          return `
            <div style="position:relative;background:${colors.backgroundDefault};border:1px solid ${colors.tooltipBorder};border-radius:8px;padding:12px 14px;box-shadow:${colors.tooltipShadow};min-width:200px;">
              <div style="font-weight:700;font-size:13px;color:${colors.textDark};margin-bottom:8px;">${tooltipTitle}</div>
              ${targetRow}
              ${rows}
              ${totalRow}
              <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid ${colors.tooltipBorder};" aria-hidden="true"></div>
              <div style="position:absolute;bottom:-6.5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid ${colors.backgroundDefault};" aria-hidden="true"></div>
            </div>`;
        },
      },
    };
  }, [
    chartPixelHeight,
    colSpan,
    viewMode,
    filterRole,
    personId,
    timePeriod,
    eotTargetLineLabel,
    motionReduced,
    emphasizedSeriesIndex,
    showLastYearTrend,
    monthLineThisYearColor,
    monthLineLastYearTrendColor,
  ]);

  return (
    <div
      ref={containerRef}
      className={`h-full min-h-0 w-full min-w-0 ${className ?? ""}`}
      onMouseMove={(e) => {
        mouseYRef.current = e.clientY;
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        theme={theme}
      />
    </div>
  );
}

export default WorkloadInsightsChart;
