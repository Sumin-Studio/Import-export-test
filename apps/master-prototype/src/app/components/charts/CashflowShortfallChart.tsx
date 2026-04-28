"use client";

import React, { ReactElement, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { NATIONAL_FONT_STACK } from "@/lib/national-font-stack";
import { isPurchasesPrototypeV4OrLater } from "@/app/lib/purchases-prototype-flags";
import chartTheme, { colors } from "./Theme";
import {
  bringCashflowActualsProjectedLabelsToFront,
  syncCashflowActualsProjectedLabels,
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
import type { ProtectTooltipDetail } from "./cashflowProtectTooltipHtml";
import {
  buildProtectTooltipHtml,
  protectBadgeTitle,
  resolveProtectDetailBlurb,
  shieldTierFromSeverity,
} from "./cashflowProtectTooltipHtml";

type AxisWithPlotBands = Highcharts.Axis & {
  plotLinesAndBands?: Array<{
    svgElem?: Highcharts.SVGElement;
    label?: { toFront?(): void };
  }>;
};

const BANK_LINE = "#13A972";
const BANK_FILL = "#D6F5E9";
/** Line and fill when projected balance is below zero. */
const BANK_LINE_BELOW_ZERO = "#DE0E40";
const BANK_FILL_BELOW_ZERO = "#FDE8ED";

export type StrategicLens = "standard" | "conservative";

export type PaymentEventVariant = "payment" | "protect";

export interface PaymentEventForChart {
  payDayIndex: number;
  billName: string;
  amount: string;
  /** Default `payment` — `protect` renders as a second scatter series (diamond). */
  variant?: PaymentEventVariant;
  linkId?: string;
  /** Shown in tooltip for Protect markers (e.g. “Possible duplicate”). */
  protectLabel?: string;
  protectSeverity?: "warning" | "risk";
  /** @deprecated Chart dots use red/orange from severity only */
  protectColor?: string;
  attentionNote?: string;
  /** Structured tooltip body; falls back to plain `attentionNote` when absent. */
  protectTooltipDetail?: ProtectTooltipDetail;
}

interface CashflowShortfallChartProps {
  lens?: StrategicLens;
  className?: string;
  projectedData?: number[];
  paymentEvents?: PaymentEventForChart[];
  /** Default 220 — use a larger value for dashboard tiles. */
  chartHeight?: number;
  highlightDayIndex?: number | null;
  highlightBandStart?: number | null;
  highlightBandEnd?: number | null;
  highlightSeverity?: "normal" | "warning" | "risk";
  /**
   * When false, a table hover shows the generic linked marker even if that day has a Protect dot.
   */
  mergeHighlightWithProtectDot?: boolean;
}

function CashflowShortfallChart({
  lens = "standard",
  className = "",
  projectedData,
  paymentEvents = [],
  chartHeight = 220,
  highlightDayIndex = null,
  highlightBandStart = null,
  highlightBandEnd = null,
  highlightSeverity = "normal",
  mergeHighlightWithProtectDot = true,
}: CashflowShortfallChartProps): ReactElement {
  const pathname = usePathname();
  const purchasesV4SingleOrange = isPurchasesPrototypeV4OrLater(pathname);

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

  const tickPositions = useMemo(
    () => cashflowChartXAxisTickPositions(data.length),
    [data.length]
  );

  const actualsProjectedSplit = useMemo(
    () => cashflowActualsProjectedSplitIndex(data.length),
    [data.length]
  );

  /**
   * X-axis `zones` break Highcharts area `negativeColor` / `negativeFillColor` (purple below 0).
   * Split into two area segments at the actuals/projected divider: solid then dashed, both keep threshold styling.
   */
  const areaSeries = useMemo((): Highcharts.SeriesOptionsType[] => {
    const split = actualsProjectedSplit;
    const splitOk = split >= 1 && data.length >= 2;

    const common = {
      type: "area" as const,
      name: "Projected cash",
      color: BANK_LINE,
      fillColor: BANK_FILL,
      lineColor: BANK_LINE,
      threshold: 0,
      negativeColor: BANK_LINE_BELOW_ZERO,
      negativeFillColor: BANK_FILL_BELOW_ZERO,
      connectNulls: false,
      marker: { enabled: false },
      states: {
        hover: { lineWidthPlus: 0, marker: { enabled: false } },
      },
    };

    if (!splitOk) {
      return [{ ...common, data, dashStyle: "Solid" as const }];
    }

    return [
      {
        ...common,
        data: data.map((y, i) => (i <= split ? y : null)),
        dashStyle: "Solid" as const,
        zIndex: 1,
      },
      {
        ...common,
        data: data.map((y, i) => (i >= split ? y : null)),
        dashStyle: "Dash" as const,
        zIndex: 2,
        linkedTo: ":previous",
      },
    ];
  }, [actualsProjectedSplit, data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<React.ComponentRef<typeof HighchartsReact>>(null);

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
      marginBottom: 48,
      style: {
        fontFamily: NATIONAL_FONT_STACK,
      },
      events: {
        render: function (this: Highcharts.Chart) {
          const chart = this;
          syncCashflowActualsProjectedLabels(chart);
          (chart.xAxis[0] as AxisWithPlotBands).plotLinesAndBands?.forEach((pb) => {
            pb.svgElem?.toFront();
          });
          bringCashflowActualsProjectedLabelsToFront(chart);
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
      tickPositions,
      tickInterval: undefined,
      labels: {
        allowOverlap: true,
        useHTML: true,
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
      labels: {
        enabled: true,
        allowOverlap: true,
        useHTML: true,
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
      min: Math.min(0, ...data) < 0 ? Math.floor(Math.min(...data) / 100) * 100 - 100 : 0,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      /** Protect tooltips ship a full-bleed card from `buildProtectTooltipHtml`; default path adds its own padding. */
      padding: 0,
      borderWidth: 0,
      backgroundColor: "#ffffff",
      borderRadius: 12,
      shadow: false,
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
          x?: string | number;
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
        const pts = ctx.points ?? [];
        const pt =
          pts.find(
            (p: Highcharts.Point) =>
              p.y != null && !Number.isNaN(Number(p.y))
          ) ?? ctx.point;
        const y = pt?.y;
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
        lineColor: BANK_LINE,
        dashStyle: "Solid",
        fillColor: BANK_FILL,
        fillOpacity: 1,
        threshold: 0,
        negativeColor: BANK_LINE_BELOW_ZERO,
        negativeFillColor: BANK_FILL_BELOW_ZERO,
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
      ...areaSeries,
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
    areaSeries,
    categories,
    data,
    chartHeight,
    tickPositions,
    highlightBandStart,
    highlightBandEnd,
    highlightDayIndex,
    highlightSeverity,
    mergeHighlightWithProtectDot,
    paymentEvents,
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

export default CashflowShortfallChart;
