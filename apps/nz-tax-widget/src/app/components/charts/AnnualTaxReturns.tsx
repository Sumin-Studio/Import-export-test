"use client";
import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useRouter } from "next/navigation";
import {
  returnsPageTabForChartCategory,
  type ReturnsPageTabId,
} from "@/app/lib/mockData/annualTaxReturns";
import theme, { colors } from "./Theme";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

export type AnnualTaxChartPoint = {
  category: string;
  value: number;
  /** Red bar for error count (matches summary “Filing errors” tile; NZ XPAC uses “Errors”) */
  tone?: "error";
};

interface ComponentProps {
  className?: string;
  colSpan?: number;
  /** When set, other bars are dimmed to show the link from summary stats → workflow stage */
  emphasizedBarIndex?: number | null;
  seriesData: AnnualTaxChartPoint[];
  /** Highcharts accessibility description (matches i2 vs XPAC pipeline labels). */
  accessibilityPipelineDescription: string;
  /**
   * When the largest bar is small (AU income tax layout), use fractional/integer ticks
   * instead of hundreds-scale (still falls back to default scale if max &gt; 25).
   */
  smallCountYAxis?: boolean;
  /** Override chart category → `/tax/all-returns?tab=` (e.g. AU six-stage pipeline). */
  categoryToTab?: (category: string) => ReturnsPageTabId | null;
  /** Same categories/order as `seriesData`; enables grouped FY vs prior FY columns. */
  comparisonSeriesData?: AnnualTaxChartPoint[] | null;
  comparisonThisYearLegend?: string;
  comparisonPriorYearLegend?: string;
}

function yAxisScale(maxValue: number): { max: number; tickPositions: number[] } {
  if (maxValue <= 0) {
    return { max: 100, tickPositions: [0, 25, 50, 75, 100] };
  }
  const max = Math.ceil(maxValue / 100) * 100;
  const step = max / 4;
  return {
    max,
    tickPositions: [0, step, step * 2, step * 3, max],
  };
}

/** Ticks for low-volume charts (e.g. AU Income tax returns when counts stay small). */
function yAxisScaleSmallCounts(maxValue: number): { max: number; tickPositions: number[] } {
  if (maxValue <= 0) {
    return { max: 1.25, tickPositions: [0, 0.25, 0.5, 0.75, 1, 1.25] };
  }
  if (maxValue <= 2) {
    const maxTick = Math.max(1.25, Math.ceil(maxValue / 0.25) * 0.25);
    const ticks: number[] = [];
    for (let v = 0; v <= maxTick + 1e-9; v += 0.25) {
      ticks.push(Number(v.toFixed(2)));
    }
    return { max: maxTick, tickPositions: ticks };
  }
  if (maxValue <= 12) {
    const maxTick = Math.ceil(maxValue);
    return {
      max: maxTick,
      tickPositions: Array.from({ length: maxTick + 1 }, (_, i) => i),
    };
  }
  const maxTick = Math.ceil(maxValue / 5) * 5;
  const ticks: number[] = [];
  for (let v = 0; v <= maxTick; v += 5) {
    ticks.push(v);
  }
  return { max: maxTick, tickPositions: ticks };
}

function pickYAxisScale(
  maxValue: number,
  smallCountYAxis: boolean | undefined
): { max: number; tickPositions: number[] } {
  if (smallCountYAxis && maxValue <= 25) {
    return yAxisScaleSmallCounts(maxValue);
  }
  return yAxisScale(maxValue);
}

function getOptions(
  accessibilityPipelineDescription: string,
  colSpan: number | undefined,
  emphasizedBarIndex: number | null | undefined,
  mouseYRef: React.MutableRefObject<number>,
  seriesData: AnnualTaxChartPoint[],
  chartPixelHeight: number,
  navigateToTab: (tab: ReturnsPageTabId) => void,
  smallCountYAxis: boolean | undefined,
  categoryToTab: (category: string) => ReturnsPageTabId | null
): Highcharts.Options {
  const emphasis =
    emphasizedBarIndex === null || emphasizedBarIndex === undefined;

  const maxValue = Math.max(...seriesData.map((d) => d.value), 0);
  const { max: yMax, tickPositions } = pickYAxisScale(maxValue, smallCountYAxis);

  const barColor = (index: number): string => {
    const point = seriesData[index];
    const base =
      point?.tone === "error" ? colors.xRed500 : colors.xBlue600;
    if (emphasis || emphasizedBarIndex === index) {
      return base;
    }
    return Highcharts.color(base).setOpacity(0.22).get() as string;
  };

  return {
    chart: {
      /** Fills widget body when parent is flex-1 + min-h-0 (ResizeObserver); min height floored in component */
      height: chartPixelHeight,
      type: "column",
    },
    accessibility: {
      description: accessibilityPipelineDescription,
    },
    xAxis: {
      categories: seriesData.map((item) => item.category),
      labels: {
        style: {
          fontSize: "11px",
          color: colors.textLight,
        },
      },
    },
    yAxis: {
      min: 0,
      max: yMax,
      tickPositions,
      labels: {
        style: {
          fontSize: "11px",
          color: colors.textLight,
        },
      },
      gridLineColor: colors.gridLine,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        groupPadding: colSpan === 2 ? -0.05 : 0.04,
        pointPadding: 0.1,
        borderWidth: 0,
        borderRadius: 4,
        cursor: "pointer",
        states: {
          hover: {
            brightness: 0.08,
          },
        },
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click() {
              const pt = this as Highcharts.Point;
              const idx = typeof pt.index === "number" ? pt.index : 0;
              const cat = seriesData[idx]?.category;
              if (!cat) return;
              const tab = categoryToTab(cat);
              if (tab) navigateToTab(tab);
            },
          },
        },
        states: {
          hover: {
            enabled: true,
          },
          inactive: {
            enabled: false,
          },
        },
      },
    },
    series: [
      {
        type: "column",
        name: "Tax returns",
        showInLegend: false,
        data: seriesData.map((item, index) => ({
          y: item.value,
          color: barColor(index),
          name: item.category,
        })),
      },
    ],
    tooltip: {
      enabled: true,
      shared: false,
      useHTML: true,
      backgroundColor: "transparent",
      borderWidth: 0,
      shadow: false,
      padding: 0,
      positioner(labelWidth, labelHeight, point) {
        const chartRect = this.chart.container.getBoundingClientRect();
        const mouseY = mouseYRef.current;
        const y = mouseY - chartRect.top - labelHeight - 10;
        const x = point.plotX + this.chart.plotLeft - labelWidth / 2;
        return { x, y };
      },
      formatter(this: {
        point?: Highcharts.Point;
        points?: Highcharts.Point[];
      }) {
        const tooltipShell = (bodyHtml: string) => `
          <div style="
            background: #ffffff;
            border: 1px solid #a6a9b0;
            border-radius: 8px;
            padding: 10px 14px;
            box-shadow: 0 2px 8px rgba(0, 10, 30, 0.12);
            position: relative;
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
            ${bodyHtml}
          </div>
        `;

        const pt = this.point as Highcharts.Point | undefined;
        const yVal = pt?.y ?? 0;
        const idx =
          typeof pt?.index === "number"
            ? pt.index
            : typeof pt?.x === "number"
              ? pt.x
              : 0;
        const statusLabel =
          typeof pt?.category === "string"
            ? pt.category
            : (seriesData[idx]?.category ?? "");
        const countLine = `${yVal.toLocaleString()} returns`;
        const title = statusLabel
          ? `<div style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 12px;
              line-height: 16px;
              color: #59606d;
              margin-bottom: 6px;
            ">${statusLabel}</div>`
          : "";
        const body = `${title}<span style="
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 13px;
              line-height: 20px;
              color: #000a1e;
              white-space: nowrap;
            ">${countLine}</span>`;
        return tooltipShell(body);
      },
    },
  };
}

function barColorForComparisonPoint(
  point: AnnualTaxChartPoint,
  isPriorYear: boolean
): string {
  if (point.tone === "error") {
    return colors.xRed500;
  }
  return isPriorYear ? colors.dataViz.tonal.fill04 : colors.xBlue600;
}

function getGroupedComparisonOptions(
  accessibilityPipelineDescription: string,
  colSpan: number | undefined,
  mouseYRef: React.MutableRefObject<number>,
  thisYear: AnnualTaxChartPoint[],
  priorYear: AnnualTaxChartPoint[],
  thisYearLegend: string,
  priorYearLegend: string,
  chartPixelHeight: number,
  navigateToTab: (tab: ReturnsPageTabId) => void,
  smallCountYAxis: boolean | undefined,
  categoryToTab: (category: string) => ReturnsPageTabId | null
): Highcharts.Options {
  const categories = thisYear.map((item) => item.category);
  const maxValue = Math.max(
    ...thisYear.map((d) => d.value),
    ...priorYear.map((d) => d.value),
    0
  );
  const { max: yMax, tickPositions } = pickYAxisScale(maxValue, smallCountYAxis);

  const columnPadding =
    colSpan === 2
      ? { groupPadding: 0.12, pointPadding: 0.04 }
      : { groupPadding: 0.18, pointPadding: 0.06 };

  return {
    chart: {
      height: chartPixelHeight,
      type: "column",
      spacingBottom: 0,
    },
    accessibility: {
      description: accessibilityPipelineDescription,
    },
    xAxis: {
      categories,
      labels: {
        style: {
          fontSize: "11px",
          color: colors.textLight,
        },
      },
    },
    yAxis: {
      min: 0,
      max: yMax,
      tickPositions,
      labels: {
        style: {
          fontSize: "11px",
          color: colors.textLight,
        },
      },
      gridLineColor: colors.gridLine,
    },
    legend: {
      /** Same as WorkloadInsights / Returns by month: custom HTML legend below plot. */
      enabled: false,
    },
    plotOptions: {
      column: {
        grouping: true,
        ...columnPadding,
        borderWidth: 0,
        borderRadius: 4,
        cursor: "pointer",
        states: {
          hover: {
            brightness: 0.06,
          },
        },
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click() {
              const pt = this as Highcharts.Point;
              const idx =
                typeof pt.index === "number" ? pt.index : Number(pt.x ?? 0);
              const cat = categories[idx];
              if (!cat) return;
              const tab = categoryToTab(cat);
              if (tab) navigateToTab(tab);
            },
          },
        },
      },
    },
    series: [
      {
        type: "column",
        name: thisYearLegend,
        data: thisYear.map((item) => ({
          y: item.value,
          color: barColorForComparisonPoint(item, false),
        })),
      },
      {
        type: "column",
        name: priorYearLegend,
        data: priorYear.map((item) => ({
          y: item.value,
          color: barColorForComparisonPoint(item, true),
        })),
      },
    ],
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true,
      backgroundColor: "transparent",
      borderWidth: 0,
      shadow: false,
      padding: 0,
      positioner(labelWidth, labelHeight, point) {
        const chartRect = this.chart.container.getBoundingClientRect();
        const mouseY = mouseYRef.current;
        const y = mouseY - chartRect.top - labelHeight - 10;
        const x = point.plotX + this.chart.plotLeft - labelWidth / 2;
        return { x, y };
      },
      formatter(this: {
        x?: number | string;
        points?: Highcharts.Point[];
      }) {
        const tooltipShell = (bodyHtml: string) => `
          <div style="
            background: #ffffff;
            border: 1px solid #a6a9b0;
            border-radius: 8px;
            padding: 10px 14px;
            box-shadow: 0 2px 8px rgba(0, 10, 30, 0.12);
            position: relative;
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
            ${bodyHtml}
          </div>
        `;

        const pts = (this.points ?? []) as Highcharts.Point[];
        const cat =
          typeof this.x === "number"
            ? categories[this.x]
            : String(this.x ?? "");
        const lines = pts
          .map((p) => {
            const yVal = p.y ?? 0;
            const name = String(p.series.name ?? "");
            return `<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#000a1e;"><span style="color:#59606d">${name}:</span> ${yVal.toLocaleString()} returns</div>`;
          })
          .join("");
        const title = cat
          ? `<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;color:#59606d;margin-bottom:6px;">${cat}</div>`
          : "";
        return tooltipShell(`${title}${lines}`);
      },
    },
  };
}

function defaultChartHeight(colSpan: number | undefined): number {
  return colSpan === 2 ? 340 : 268;
}

function AnnualTaxReturnsChart({
  className,
  colSpan,
  emphasizedBarIndex = null,
  seriesData,
  accessibilityPipelineDescription,
  smallCountYAxis,
  categoryToTab = returnsPageTabForChartCategory,
  comparisonSeriesData = null,
  comparisonThisYearLegend,
  comparisonPriorYearLegend,
}: ComponentProps): ReactElement {
  const router = useRouter();
  const mouseYRef = useRef(0);
  /** Observe plot area only so chart height excludes the custom legend (no overlap). */
  const plotAreaRef = useRef<HTMLDivElement>(null);
  const [chartPixelHeight, setChartPixelHeight] = useState(() =>
    defaultChartHeight(colSpan)
  );

  const navigateToTab = useCallback(
    (tab: ReturnsPageTabId) => {
      router.push(`/tax/all-returns?tab=${tab}`);
    },
    [router]
  );

  useLayoutEffect(() => {
    const el = plotAreaRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const h = Math.round(entries[0]?.contentRect.height ?? 0);
      if (h > 0) {
        setChartPixelHeight((prev) => {
          const next = Math.max(160, h);
          return next === prev ? prev : next;
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hasGroupedComparison =
    comparisonSeriesData != null &&
    comparisonSeriesData.length > 0 &&
    comparisonSeriesData.length === seriesData.length &&
    (comparisonThisYearLegend?.trim() ?? "") !== "" &&
    (comparisonPriorYearLegend?.trim() ?? "") !== "";

  const options = useMemo(() => {
    if (
      hasGroupedComparison &&
      comparisonSeriesData != null &&
      comparisonThisYearLegend != null &&
      comparisonPriorYearLegend != null
    ) {
      return getGroupedComparisonOptions(
        accessibilityPipelineDescription,
        colSpan,
        mouseYRef,
        seriesData,
        comparisonSeriesData,
        comparisonThisYearLegend,
        comparisonPriorYearLegend,
        chartPixelHeight,
        navigateToTab,
        smallCountYAxis,
        categoryToTab
      );
    }
    return getOptions(
      accessibilityPipelineDescription,
      colSpan,
      emphasizedBarIndex,
      mouseYRef,
      seriesData,
      chartPixelHeight,
      navigateToTab,
      smallCountYAxis,
      categoryToTab
    );
  }, [
    accessibilityPipelineDescription,
    colSpan,
    emphasizedBarIndex,
    seriesData,
    comparisonSeriesData,
    comparisonThisYearLegend,
    comparisonPriorYearLegend,
    chartPixelHeight,
    navigateToTab,
    smallCountYAxis,
    categoryToTab,
    hasGroupedComparison,
  ]);

  const chartTightLegend = colSpan !== 2;

  return (
    <div
      className={`flex h-full min-h-0 w-full min-w-0 flex-col ${className ?? ""}`}
      onMouseMove={(e) => {
        mouseYRef.current = e.clientY;
      }}
    >
      <div
        ref={plotAreaRef}
        className={`min-h-0 min-w-0 flex-1 ${
          hasGroupedComparison ? "" : "pb-6"
        }`}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      {hasGroupedComparison &&
      comparisonThisYearLegend != null &&
      comparisonPriorYearLegend != null ? (
        <div
          className={`relative ml-6 mr-6 flex shrink-0 justify-end flex-wrap gap-6 ${
            chartTightLegend ? "mt-3 mb-3" : "mt-4 mb-4"
          }`}
          aria-label="Chart legend"
        >
          <div className="flex cursor-default items-center gap-2 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: colors.xBlue600 }}
              aria-hidden
            />
            <span className="text-[13px]/[20px] text-[#59606d]">
              {comparisonThisYearLegend}
            </span>
          </div>
          <div className="flex cursor-default items-center gap-2 rounded px-0.5 py-0.5 transition-colors hover:bg-[#f2f7fc]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: colors.dataViz.tonal.fill04 }}
              aria-hidden
            />
            <span className="text-[13px]/[20px] text-[#59606d]">
              {comparisonPriorYearLegend}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AnnualTaxReturnsChart;
