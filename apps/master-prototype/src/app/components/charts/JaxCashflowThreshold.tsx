"use client";

import React, { ReactElement, useMemo } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { NATIONAL_FONT_STACK } from "@/lib/national-font-stack";
import { colors } from "./Theme";
import {
  cashflowChartCategoriesFromDays,
  cashflowChartXAxisTickPositions,
} from "./cashflowChartAxis";
import { CASHFLOW_FALLBACK_BANK_BALANCE_STANDARD } from "./cashflowChartFallbackData";

const THRESHOLD = 2000;

/** Enough days to show actuals + deep projected dip (same curve as bank balance widgets). */
const JAX_CHART_DAY_COUNT = 22;

interface JaxCashflowThresholdChartProps {
  className?: string;
}

function JaxCashflowThresholdChart({
  className = "",
}: JaxCashflowThresholdChartProps): ReactElement {
  const seriesData = useMemo(
    () => CASHFLOW_FALLBACK_BANK_BALANCE_STANDARD.slice(0, JAX_CHART_DAY_COUNT),
    []
  );

  const categories = useMemo(
    () => cashflowChartCategoriesFromDays(seriesData.length),
    [seriesData.length]
  );

  const tickPositions = useMemo(
    () => cashflowChartXAxisTickPositions(seriesData.length),
    [seriesData.length]
  );

  const yMin = useMemo(() => {
    const minY = Math.min(...seriesData);
    return minY < 0 ? Math.floor(minY / 100) * 100 - 100 : 0;
  }, [seriesData]);

  const yMax = useMemo(() => {
    const maxY = Math.max(...seriesData);
    return Math.ceil(maxY / 500) * 500 + 500;
  }, [seriesData]);

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "line",
        backgroundColor: "transparent",
        height: 220,
        style: {
          fontFamily: NATIONAL_FONT_STACK,
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
          style: { color: colors.textLight, fontSize: "11px" },
        },
      },
      yAxis: {
        title: { text: undefined },
        min: yMin,
        max: yMax,
        plotLines: [
          {
            value: THRESHOLD,
            color: colors.xRed500,
            width: 1.5,
            dashStyle: "Dash",
            zIndex: 2,
            label: {
              text: `$${THRESHOLD.toLocaleString()} threshold`,
              align: "right",
              x: -8,
              style: { color: colors.xRed500, fontSize: "11px" },
            },
          },
        ],
        labels: {
          format: "${value:,.0f}",
          style: { color: colors.textLight, fontSize: "11px" },
        },
        gridLineColor: colors.gridLine,
      },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function (this: unknown) {
          const ctx = this as {
            points?: Highcharts.Point[];
            point?: Highcharts.Point;
            x?: string | number;
          };
          const pt =
            ctx.points?.find((p) => p.y != null) ?? ctx.point;
          const y = pt?.y;
          if (y == null) return "";
          const x = pt?.category ?? ctx.x ?? "";
          return `<span style="font-weight:600">${String(x)}</span><br/>Projected cash: <strong>$${Number(y).toLocaleString()}</strong>`;
        },
      },
      legend: { enabled: false },
      series: [
        {
          type: "line",
          name: "Projected cash",
          data: [...seriesData],
          color: colors.xBlue600,
          lineWidth: 2,
          marker: { radius: 3, symbol: "circle" },
        },
      ],
      credits: { enabled: false },
    }),
    [categories, seriesData, tickPositions, yMax, yMin]
  );

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default JaxCashflowThresholdChart;
