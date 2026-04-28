"use client";

import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { NATIONAL_FONT_STACK } from "@/lib/national-font-stack";
import chartTheme, { colors } from "./Theme";
import {
  bringCashflowActualsProjectedLabelsToFront,
  bringCashflowThresholdPillLabelToFront,
  syncCashflowActualsProjectedLabels,
  syncCashflowThresholdPillLabel,
  type ChartWithActualsProjectedGroup,
} from "./cashflowChartActualsProjectedOverlay";
import {
  cashflowActualsProjectedSplitIndex,
  cashflowChartCategoriesFromDays,
  cashflowChartXAxisTickPositions,
  cashflowTooltipDayIndexFromContext,
  formatCashflowTooltipDateFromIndex,
  formatCashflowYAxisThousands,
} from "./cashflowChartAxis";
import {
  CASHFLOW_FALLBACK_BANK_BALANCE_CONSERVATIVE,
  CASHFLOW_FALLBACK_BANK_BALANCE_STANDARD,
} from "./cashflowChartFallbackData";
import type { PaymentEventForChart } from "./CashflowShortfallChart";
import type { ProtectTooltipDetail } from "./cashflowProtectTooltipHtml";
import {
  buildProtectTooltipHtml,
  protectBadgeTitle,
  resolveProtectDetailBlurb,
  shieldTierFromSeverity,
} from "./cashflowProtectTooltipHtml";
import { cashflowTooltipPositionNearPoint } from "./cashflowChartTooltipPositioner";

const THRESHOLD_DEFAULT = 2000;

type ChartWithDragHandle = ChartWithActualsProjectedGroup & {
  _cfDragHandleG?: Highcharts.SVGElement;
  _cfDragMouseDown?: ((e: Event) => void) | null;
  _cfDragSVGEl?: Element | null;
};

function formatThresholdLabel(value: number): string {
  if (value === 0) return "$0 threshold";
  if (value % 1000 === 0) return `${value / 1000}k threshold`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k threshold`;
  return `$${value} threshold`;
}

const PLAN_LINE = "#13A972";
const PLAN_FILL = "#D6F5E9";
const PLAN_LINE_BELOW_ZERO = "#DE0E40";
const PLAN_FILL_BELOW_ZERO = "#FDE8ED";

/** Plot line / series stacking: threshold line draws above the area fill. */
const THRESHOLD_PLOT_LINE_Z = 99;
const AREA_SERIES_Z = 1;

export type StrategicLens = "standard" | "conservative";

export type { PaymentEventForChart };

interface CashflowPlanChartProps {
  lens?: StrategicLens;
  className?: string;
  projectedData?: number[];
  paymentEvents?: PaymentEventForChart[];
  /** Default 220 — matches Cash Flow Actions action-plan modal; increase for dashboard tiles. */
  chartHeight?: number;
  highlightDayIndex?: number | null;
  highlightBandStart?: number | null;
  highlightBandEnd?: number | null;
  highlightSeverity?: "normal" | "warning" | "risk";
  /** When true, renders a drag handle on the threshold line so the user can adjust it in $100 steps. */
  draggableThreshold?: boolean;
  /**
   * When false, a table hover shows the generic linked marker even if that day has a Protect dot
   * (avoids hiding the highlight for non‑Protect bills on the same day).
   */
  mergeHighlightWithProtectDot?: boolean;
}

function CashflowPlanChart({
  lens = "standard",
  className = "",
  projectedData,
  paymentEvents = [],
  chartHeight = 220,
  highlightDayIndex = null,
  highlightBandStart = null,
  highlightBandEnd = null,
  highlightSeverity = "normal",
  draggableThreshold = false,
  mergeHighlightWithProtectDot = true,
}: CashflowPlanChartProps): ReactElement {
  const pathname = usePathname();
  const purchasesV4SingleOrange =
    pathname?.includes("/purchases-overview/prototype/4") ?? false;

  const data = useMemo(() => {
    if (projectedData) return projectedData;
    return lens === "conservative"
      ? [...CASHFLOW_FALLBACK_BANK_BALANCE_CONSERVATIVE]
      : [...CASHFLOW_FALLBACK_BANK_BALANCE_STANDARD];
  }, [projectedData, lens]);

  const categories = useMemo(
    () => cashflowChartCategoriesFromDays(data.length),
    [data.length]
  );

  const xTickPositions = useMemo(
    () => cashflowChartXAxisTickPositions(data.length),
    [data.length]
  );

  const actualsProjectedSplit = useMemo(
    () => cashflowActualsProjectedSplitIndex(data.length),
    [data.length]
  );

  const yMin =
    Math.min(0, ...data) < 0
      ? Math.floor(Math.min(...data) / 100) * 100 - 100
      : 0;
  const yMax = Math.max(...data);
  /** Pad top so the line isn’t flush with the plot edge; keeps y-axis ticks readable. */
  const yAxisMax = Math.ceil(yMax / 500) * 500 + 500;

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<React.ComponentRef<typeof HighchartsReact>>(null);

  const [thresholdState, setThresholdState] = useState(THRESHOLD_DEFAULT);
  const thresholdStateRef = useRef(THRESHOLD_DEFAULT);
  const thresholdLabelRef = useRef(formatThresholdLabel(THRESHOLD_DEFAULT));
  const dragRef = useRef<{
    active: boolean;
    startClientY: number;
    startValue: number;
    pxPer100: number;
  } | null>(null);

  // Keep refs in sync with state so the chart render event (stale closure) always reads fresh values.
  useEffect(() => {
    thresholdStateRef.current = thresholdState;
    thresholdLabelRef.current = formatThresholdLabel(thresholdState);
  }, [thresholdState]);

  // Imperatively update the Highcharts plotLine when the threshold changes (avoids full chart.update).
  useEffect(() => {
    const chart = chartRef.current?.chart;
    if (!chart || !draggableThreshold) return;
    chart.yAxis[0].update(
      {
        plotLines: [
          {
            value: thresholdState,
            color: colors.borderMedium,
            width: 1,
            dashStyle: "Dash" as Highcharts.DashStyleValue,
            zIndex: THRESHOLD_PLOT_LINE_Z,
            label: { text: "" },
          },
        ],
      },
      false,
    );
    chart.redraw(false);
  }, [thresholdState, draggableThreshold]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      chartRef.current?.chart?.reflow();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const options: Highcharts.Options = useMemo(() => {
    const protectListHighlight =
      mergeHighlightWithProtectDot &&
      highlightDayIndex != null &&
      paymentEvents.some(
        (ev) =>
          ev.variant === "protect" &&
          ev.payDayIndex === highlightDayIndex &&
          ev.payDayIndex >= 0 &&
          ev.payDayIndex < data.length
      );

    return {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: chartHeight,
      width: null,
      /**
       * Side margins default from Highcharts + {@link chartTheme} like Money going out
       * so the plot uses the full widget width and y labels sit in the theme strip.
       * Extra right margin when draggable to give the drag handle room after the threshold pill.
       */
      marginBottom: 48,
      marginRight: draggableThreshold ? 34 : undefined,
      style: {
        fontFamily: NATIONAL_FONT_STACK,
      },
      events: {
        render: function (this: Highcharts.Chart) {
          const chart = this as ChartWithDragHandle;
          syncCashflowActualsProjectedLabels(chart);
          syncCashflowThresholdPillLabel(chart, {
            value: thresholdStateRef.current,
            text: thresholdLabelRef.current,
          });
          chart.yAxis[0].plotLinesAndBands?.forEach((plot) => {
            plot.svgElem?.toFront();
            plot.label?.toFront?.();
          });
          chart.xAxis[0].plotLinesAndBands?.forEach((pb) => {
            pb.svgElem?.toFront();
          });
          bringCashflowThresholdPillLabelToFront(chart);
          bringCashflowActualsProjectedLabelsToFront(chart);

          // Drag handle on the threshold line
          if (draggableThreshold) {
            // Remove mousedown from old SVG element before destroying it
            if (chart._cfDragSVGEl && chart._cfDragMouseDown) {
              chart._cfDragSVGEl.removeEventListener("mousedown", chart._cfDragMouseDown);
            }
            chart._cfDragHandleG?.destroy();
            chart._cfDragHandleG = undefined;

            const yAxis = chart.yAxis[0];
            const tPx = yAxis.toPixels(thresholdStateRef.current, false);

            if (Number.isFinite(tPx)) {
              const HANDLE_W = 22;
              const HANDLE_H = 18;
              // Position just after the threshold pill label (pill right edge = plotLeft + plotWidth - 8)
              const hX = chart.plotLeft + chart.plotWidth - 2;
              const hY = tPx - HANDLE_H / 2;

              const g = chart.renderer.g().add();

              chart.renderer
                .rect(hX, hY, HANDLE_W, HANDLE_H, 4, 0)
                .attr({ fill: "#f3f4f6", stroke: "#d1d5db", "stroke-width": 1 })
                .add(g);

              const lineX1 = hX + 5;
              const lineX2 = hX + HANDLE_W - 5;
              for (let i = 0; i < 3; i++) {
                chart.renderer
                  .path([
                    "M", lineX1, tPx - 4 + i * 4,
                    "L", lineX2, tPx - 4 + i * 4,
                  ] as unknown as Highcharts.SVGPathArray)
                  .attr({ stroke: "#9ca3af", "stroke-width": 1.5, "stroke-linecap": "round" })
                  .add(g);
              }

              (g.element as HTMLElement).style.cursor = "ns-resize";
              chart._cfDragHandleG = g;
              g.toFront();

              const onMouseDown = (e: Event) => {
                if (dragRef.current?.active) return;
                const me = e as MouseEvent;
                me.preventDefault();

                const pxPer100 = Math.abs(yAxis.toPixels(0) - yAxis.toPixels(100));

                const onMouseMove = (me2: MouseEvent) => {
                  const dr = dragRef.current;
                  if (!dr?.active) return;
                  const dy = me2.clientY - dr.startClientY;
                  const steps = -Math.round(dy / (dr.pxPer100 || 1));
                  const newVal = Math.max(
                    0,
                    Math.min(yAxis.max ?? 99999, dr.startValue + steps * 100),
                  );
                  setThresholdState(newVal);
                };

                const onMouseUp = () => {
                  if (dragRef.current) dragRef.current.active = false;
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
                };

                dragRef.current = {
                  active: true,
                  startClientY: me.clientY,
                  startValue: thresholdStateRef.current,
                  pxPer100: pxPer100 || 1,
                };
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
              };

              const handleEl = g.element;
              handleEl.addEventListener("mousedown", onMouseDown);
              chart._cfDragMouseDown = onMouseDown;
              chart._cfDragSVGEl = handleEl;
            }
          }

          if (highlightDayIndex != null && mergeHighlightWithProtectDot) {
            const protectPoint = chart.series
              .flatMap((s) => s.points)
              .find((p) => {
                const c = (p.options as { custom?: { variant?: string } }).custom;
                return c?.variant === "protect" && p.x === highlightDayIndex;
              });
            if (protectPoint) {
              protectPoint.setState("hover");
              chart.tooltip?.refresh(protectPoint);
            }
          }
        },
      },
    },
    title: { text: undefined },
    accessibility: { enabled: false },
    xAxis: {
      categories,
      lineColor: colors.borderMedium,
      tickLength: 0,
      tickPositions: xTickPositions,
      tickInterval: undefined,
      labels: {
        allowOverlap: true,
        useHTML: true,
        /** Match `Theme.tsx` xAxis.labels (Money going out). */
        style: {
          color: colors.textLight,
          fontSize: "13px",
          lineHeight: "16px",
          textAlign: "center",
        },
        autoRotation: [-45],
        padding: 2,
        y: 18,
      },
      plotLines:
        actualsProjectedSplit >= 1
          ? [
              {
                value: actualsProjectedSplit,
                color: colors.borderMedium,
                width: 1,
                dashStyle: "Dash",
                zIndex: 8,
              },
            ]
          : [],
      plotBands: [],
    },
    yAxis: {
      title: { text: undefined },
      plotLines: [
        {
          value: THRESHOLD_DEFAULT,
          /** Match actuals / projected vertical divider (`xAxis.plotLines`). */
          color: colors.borderMedium,
          width: 1,
          dashStyle: "Dash",
          zIndex: THRESHOLD_PLOT_LINE_Z,
          /** Label is drawn on `chart.events.render` (same pill style as Actuals / Projected). */
          label: { text: "" },
        },
      ],
      labels: {
        enabled: true,
        allowOverlap: true,
        useHTML: true,
        /** Match `Theme.tsx` yAxis.labels (Money going out). */
        style: {
          color: colors.textLight,
          fontSize: "13px",
          lineHeight: "16px",
          textAlign: "center",
        },
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return formatCashflowYAxisThousands(Number(this.value));
        },
      },
      gridLineColor: colors.gridLine,
      min: yMin,
      max: yAxisMax,
      tickAmount: 5,
      endOnTick: true,
      maxPadding: 0.02,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      padding: 0,
      borderWidth: 0,
      backgroundColor: "#ffffff",
      borderRadius: 12,
      shadow: false,
      positioner: cashflowTooltipPositionNearPoint,
      // Highcharts: `shared` tooltips use a context with `points`; single series may use `point`.
      formatter: function (this: unknown) {
        const box =
          "min-width:168px;max-width:280px;line-height:1.45;font-size:13px;color:" +
          colors.textDark +
          ";background:#fff;border:1px solid rgba(0,10,30,0.12);border-radius:10px;box-shadow:0 8px 24px rgba(0,15,40,0.08)";
        const title = "display:block;font-weight:600;margin:0 0 8px 0;font-size:12px;letter-spacing:0.01em";
        const body = "margin:0;color:" + colors.textLight;
        const ctx = this as {
          points?: Highcharts.Point[];
          point?: Highcharts.Point;
          y?: number;
        };
        const protectPoint =
          ctx.points?.find(
            (p) =>
              (p.options as { custom?: { variant?: string } })?.custom?.variant ===
              "protect"
          ) ??
          ((ctx.point &&
          (ctx.point.options as { custom?: { variant?: string } })?.custom?.variant ===
            "protect"
            ? ctx.point
            : null) as Highcharts.Point | null);
        if (protectPoint) {
          const custom = (protectPoint.options as {
            custom?: {
              billName?: string;
              amount?: string;
              protectLabel?: string;
              attentionNote?: string;
              protectSeverity?: "warning" | "risk";
              protectTooltipDetail?: ProtectTooltipDetail;
            };
          }).custom;
          const detail: ProtectTooltipDetail =
            custom?.protectTooltipDetail ??
            ({
              kind: "plain",
              text: resolveProtectDetailBlurb(
                custom?.attentionNote,
                custom?.protectLabel
              ),
            } as ProtectTooltipDetail);
          return buildProtectTooltipHtml(
            {
              billName: custom?.billName ?? "Protect item",
              amountDisplay: custom?.amount ?? "—",
              badgeTitle: protectBadgeTitle(custom?.protectLabel),
              shieldTier: shieldTierFromSeverity(custom?.protectSeverity),
              detail,
            },
            colors.textDark
          );
        }
        const pt =
          ctx.points?.find((p) => p.y != null && !Number.isNaN(Number(p.y))) ?? ctx.point;
        const y = pt?.y ?? ctx.y;
        if (y == null || Number.isNaN(Number(y))) return "";
        const dayIndex = cashflowTooltipDayIndexFromContext(this, categories);
        const dateTitle = formatCashflowTooltipDateFromIndex(dayIndex);
        return (
          `<div style="${box};padding:12px">` +
          `<span style="${title}">${dateTitle}</span>` +
          `<span style="${body}">Projected cash: <strong style="color:${colors.textDark}">$${Number(y).toLocaleString()}</strong></span>` +
          `</div>`
        );
      },
    },
    legend: { enabled: false },
    plotOptions: {
      area: {
        lineWidth: 1,
        lineColor: PLAN_LINE,
        dashStyle: "Solid",
        fillColor: PLAN_FILL,
        fillOpacity: 1,
        threshold: 0,
        negativeColor: PLAN_LINE_BELOW_ZERO,
        negativeFillColor: PLAN_FILL_BELOW_ZERO,
        marker: { enabled: false },
        states: {
          hover: {
            lineWidthPlus: 0,
            marker: { enabled: false },
          },
        },
      },
    },
    series: [
      {
        type: "area",
        name: "Projected cash",
        data,
        zIndex: AREA_SERIES_Z,
        color: PLAN_LINE,
        threshold: 0,
        negativeColor: PLAN_LINE_BELOW_ZERO,
        negativeFillColor: PLAN_FILL_BELOW_ZERO,
        zoneAxis: "x",
        zones:
          actualsProjectedSplit >= 1
            ? [
                { value: actualsProjectedSplit, dashStyle: "Solid" },
                { dashStyle: "Dash" },
              ]
            : [{ dashStyle: "Solid" }],
      },
      ...(highlightDayIndex != null &&
      highlightDayIndex >= 0 &&
      highlightDayIndex < data.length &&
      !protectListHighlight
        ? [
            {
              type: "scatter" as const,
              name: "Linked point",
              data: [[highlightDayIndex, data[highlightDayIndex]]],
              color: purchasesV4SingleOrange
                ? "#FF8F33"
                : highlightSeverity === "risk"
                  ? "#FF5630"
                  : highlightSeverity === "warning"
                    ? "#FF8F33"
                    : "#13B5EA",
              marker: {
                enabled: true,
                radius: 3,
                symbol: "diamond",
                lineColor: "#FFFFFF",
                lineWidth: 1,
              },
              zIndex: 7,
              enableMouseTracking: false,
              states: { inactive: { opacity: 1 } },
            },
          ]
        : []),
      ...paymentEvents
        .filter(
          (e) =>
            e.variant === "protect" &&
            e.payDayIndex >= 0 &&
            e.payDayIndex < data.length
        )
        .map((e, idx) => {
          const markerColor = purchasesV4SingleOrange
            ? "#FF8F33"
            : e.protectSeverity === "risk"
              ? "#FF5630"
              : "#FF8F33";
          const linkedFromProtectList =
            highlightDayIndex != null && e.payDayIndex === highlightDayIndex;
          return {
          type: "scatter" as const,
          name: e.protectLabel ?? "Protect flag",
          data: [
            {
              x: e.payDayIndex,
              y: data[e.payDayIndex],
              custom: {
                variant: "protect",
                billName: e.billName,
                amount: e.amount,
                protectLabel: e.protectLabel,
                attentionNote: e.attentionNote,
                protectSeverity: e.protectSeverity,
                protectTooltipDetail: e.protectTooltipDetail,
              },
            },
          ],
          color: markerColor,
          animation: { duration: purchasesV4SingleOrange ? 300 : 220 },
          marker: {
            enabled: true,
            radius: linkedFromProtectList ? 3.5 : 2,
            symbol: "circle",
            lineColor: "#FFFFFF",
            lineWidth: linkedFromProtectList ? 1 : 0.75,
          },
          zIndex: linkedFromProtectList ? 9 : 6,
          enableMouseTracking: true,
          states: {
            hover: {
              animation: { duration: 180 },
              marker: {
                radiusPlus: linkedFromProtectList ? 0 : 1,
                lineWidthPlus: linkedFromProtectList ? 0 : 0.25,
              },
            },
            inactive: { opacity: 1 },
          },
          id: `protect-${idx}-${e.billName}`,
        };
        }),
    ],
    credits: { enabled: false },
  };
  }, [
    actualsProjectedSplit,
    categories,
    data,
    chartHeight,
    xTickPositions,
    yMin,
    yAxisMax,
    highlightBandStart,
    highlightBandEnd,
    highlightDayIndex,
    highlightSeverity,
    mergeHighlightWithProtectDot,
    paymentEvents,
    draggableThreshold,
    purchasesV4SingleOrange,
  ]);

  return (
    <div
      ref={containerRef}
      className={`min-w-0 w-full ${className}`.trim()}
    >
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options}
        theme={chartTheme}
        updateArgs={[true, true, true]}
      />
    </div>
  );
}

export default CashflowPlanChart;
