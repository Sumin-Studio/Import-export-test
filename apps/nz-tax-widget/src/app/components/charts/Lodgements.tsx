"use client";

import React, { ReactElement, useMemo } from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme from "./Theme";
import type { Region } from "@/app/lib/regions";
import {
  LODGEMENT_FILED_WIDGET_TARGET_PCT,
  type LodgementMetrics,
} from "@/app/lib/mockData/workloadInsights";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

export interface LodgementsChartProps {
  className?: string;
  metrics: LodgementMetrics;
  region?: Region;
}

function normalizeStackedPct(
  onTime: number,
  due: number,
  late: number
): { onTime: number; due: number; late: number } {
  const sum = onTime + due + late;
  if (sum <= 0) return { onTime: 0, due: 0, late: 0 };
  const scale = 100 / sum;
  return {
    onTime: onTime * scale,
    due: due * scale,
    late: late * scale,
  };
}

export default function LodgementsChart({
  className,
  metrics,
  region = "NZ",
}: LodgementsChartProps): ReactElement {
  const { stackedPct, snapshot } = metrics;
  const norm = normalizeStackedPct(
    stackedPct.onTime,
    stackedPct.due,
    stackedPct.late
  );
  const latePercentage = norm.late;
  const duePercentage = norm.due;
  const onTimePercentage = norm.onTime;

  const onTimeData = useMemo(
    () => ({
      lodged: snapshot.filedCum,
      suspended: 0,
      lodgedOutsideXero: 0,
      returnsNotNecessary: 0,
      total: snapshot.filedCum,
      percentage: Math.round(metrics.onTimeQualityYtdPct * 10) / 10,
    }),
    [metrics.onTimeQualityYtdPct, snapshot.filedCum]
  );

  const lateData = useMemo(
    () => ({
      lodged: 0,
      overdue: snapshot.lateCount,
      total: snapshot.lateCount,
      percentage: Math.round(stackedPct.late * 10) / 10,
    }),
    [snapshot.lateCount, stackedPct.late]
  );

  const showLate = snapshot.lateCount > 0;

  const a11yDescription =
    region === "NZ"
      ? "Horizontal stacked bar chart showing tax return filing status for the financial year."
      : "Horizontal stacked bar chart showing tax return filing status for the financial year.";

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 20,
        backgroundColor: "transparent",
        spacingTop: 1,
        spacingBottom: 1,
        spacingLeft: 2,
        spacingRight: 2,
        /** [top, right, bottom, left] — extra horizontal room so stroke + rounded end aren’t clipped */
        margin: [1, 4, 1, 4],
      },
      accessibility: {
        description: a11yDescription,
      },
      title: {
        text: undefined,
      },
      xAxis: {
        visible: false,
        categories: [""],
      },
      yAxis: {
        visible: false,
        min: 0,
        max: 100,
        title: {
          text: undefined,
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          stacking: "normal",
          borderRadius: 4,
          pointPadding: 0,
          groupPadding: 0,
          borderWidth: 0,
          dataLabels: {
            enabled: false,
          },
        },
        series: {
          clip: false,
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1,
            },
          },
          enableMouseTracking: false,
        },
      },
      tooltip: {
        enabled: true,
        shared: false,
        useHTML: true,
        backgroundColor: "transparent",
        borderWidth: 0,
        shadow: false,
        padding: 0,
        followPointer: true,
        positioner: function (labelWidth, labelHeight, point) {
          const chart = this.chart;
          const x = point.plotX + chart.plotLeft - labelWidth / 2;
          const y = point.plotY + chart.plotTop - labelHeight - 10;
          return { x, y };
        },
        formatter: function () {
          const seriesName = this.series.name;

          const lateSeriesActive = showLate;
          if (
            seriesName !== "On time" &&
            seriesName !== "Due" &&
            !(lateSeriesActive && seriesName === "Late")
          ) {
            return false;
          }

          const createArrow = (): string => `
          <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #a6a9b0;"></div>
          <div style="position: absolute; bottom: -6.5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #ffffff;"></div>
        `;

          const createRow = (
            label: string,
            value: string | number,
            isBold = false
          ): string => `
          <div style="display: flex; justify-content: space-between; gap: 8px; font-family: 'Helvetica Neue', sans-serif; font-weight: ${isBold ? 700 : 400}; font-size: 13px; line-height: 20px; color: #000a1e; ${isBold ? "" : "margin-bottom: 4px;"}">
            <span>${label}</span>
            <span>${value}</span>
          </div>
        `;

          const createTitle = (text: string): string => `
          <div style="font-family: 'Helvetica Neue', sans-serif; font-weight: 700; font-size: 13px; line-height: 20px; color: #000a1e; margin-bottom: 4px;">${text}</div>
        `;

          const wrapTooltip = (content: string): string => `
          <div style="background: #ffffff; border: 1px solid #a6a9b0; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 10, 30, 0.12); position: relative; min-width: 200px;">
            ${createArrow()}
            ${content}
          </div>
        `;

          if (seriesName === "Late" && showLate) {
            return wrapTooltip(`
            ${createTitle("Late")}
            ${createRow("Overdue", lateData.overdue)}
            ${createRow("Total", `${lateData.total} (${lateData.percentage}%)`, true)}
          `);
          }

          if (seriesName === "Due") {
            const A = snapshot.filedCum;
            const B = snapshot.lateCount;
            const C = snapshot.dueCount;
            const D = snapshot.totalExpected;
            const eoyCount = A + C;
            const eoyPctRounded = Math.round(metrics.eoyEstimatePct);
            const lateRow =
              B > 0
                ? createRow("Total filed late", B)
                : "";
            return wrapTooltip(`
            ${createTitle("End of year estimate")}
            ${createRow("Total filed on time", A)}
            ${lateRow}
            ${createRow("Returns still to file", C)}
            ${createRow("Total returns due this FY", D)}
            ${createRow("Est. filed on time at year end", `${eoyCount} (${eoyPctRounded}%)`, true)}
          `);
          }

          return wrapTooltip(`
          ${createTitle("Filed on time")}
          ${createRow("Filed", onTimeData.lodged)}
          ${createRow("Expected returns", snapshot.totalExpected)}
          ${createRow("On-time filing YTD", `${onTimeData.percentage}%`, true)}
        `);
        },
      },
      /** Stacking order: Late (if any) → Due → On time (dark blue on the right) */
      series: (() => {
        const lateSeries: Highcharts.SeriesBarOptions = {
          name: "Late",
          type: "bar",
          data: [latePercentage],
          color: "#de0e40",
          borderColor: "#de0e40",
          borderWidth: 1,
          enableMouseTracking: true,
          states: {
            hover: {
              enabled: true,
              brightness: 0.05,
            },
            inactive: {
              opacity: 1,
            },
          },
        };
        const dueSeries: Highcharts.SeriesBarOptions = {
          name: "Due",
          type: "bar",
          data: [duePercentage],
          color: "#b1dffe",
          borderColor: "#0078c8",
          borderWidth: 1,
          borderRadius: 0,
          enableMouseTracking: true,
          states: {
            hover: {
              enabled: true,
              brightness: 0.05,
            },
            inactive: {
              opacity: 1,
            },
          },
        };
        const onTimeSeries: Highcharts.SeriesBarOptions = {
          name: "On time",
          type: "bar",
          data: [onTimePercentage],
          color: "#0078c8",
          borderColor: "#0078c8",
          borderWidth: 1,
          borderRadius: 8,
          enableMouseTracking: true,
          states: {
            hover: {
              enabled: true,
              brightness: 0.05,
            },
            inactive: {
              opacity: 1,
            },
          },
        };
        return showLate
          ? [lateSeries, dueSeries, onTimeSeries]
          : [dueSeries, onTimeSeries];
      })(),
    }),
    [
      latePercentage,
      duePercentage,
      onTimePercentage,
      lateData,
      onTimeData,
      snapshot.filedCum,
      snapshot.lateCount,
      snapshot.dueCount,
      snapshot.totalExpected,
      metrics.eoyEstimatePct,
      showLate,
      a11yDescription,
    ]
  );

  /** Programme target line — not the IRD EOT schedule; value from {@link LODGEMENT_FILED_WIDGET_TARGET_PCT}. */
  const markerPct = LODGEMENT_FILED_WIDGET_TARGET_PCT;
  const markerLabel = `${markerPct}%`;

  return (
    <div className={`${className} flex h-full w-full flex-col gap-1 px-6`}>
      <div className="relative flex w-full shrink-0 items-center justify-center overflow-visible">
        <div
          className="bg-border-primary absolute -top-1.5 z-0 h-8 w-px"
          style={{
            left: `${markerPct}%`,
            transform: "translateX(-50%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full min-w-0 rounded-lg px-0.5 py-px overflow-hidden">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div
          className="text-content-secondary absolute z-20 text-[13px]/[16px] font-normal tabular-nums"
          style={{
            left: `${markerPct}%`,
            top: "calc(-0.375rem + 2rem)",
            transform: "translateX(-50%)",
          }}
        >
          {markerLabel}
        </div>
      </div>

      <div className="relative flex w-full justify-end gap-6 pt-7">
        <div className="relative flex shrink-0 content-stretch items-center gap-1">
          <div className="size-3 rounded-full bg-[#0165a8]" />
          <span className="text-content-secondary text-[13px]/[16px] font-normal">
            On time
          </span>
        </div>
        <div className="relative flex shrink-0 content-stretch items-center gap-1">
          <div className="size-3 rounded-full border border-solid border-[#0165a8] bg-[#b1dffe]" />
          <span className="text-content-secondary text-[13px]/[16px] font-normal">
            Due
          </span>
        </div>
        {showLate ? (
          <div className="relative flex shrink-0 content-stretch items-center gap-1">
            <div className="size-3 rounded-full border-[1px_1px_0px] border-solid border-[#de0e40] bg-[#de0e40]" />
            <span className="text-content-secondary text-[13px]/[16px] font-normal">
              Late
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
