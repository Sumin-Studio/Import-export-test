"use client";

import React, { ReactElement, useMemo } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { colors } from "./Theme";

const THRESHOLD = 2000;
const CATEGORIES = [
  "Mar 8",
  "Mar 9",
  "Mar 10",
  "Mar 11",
  "Mar 12",
  "Mar 13",
  "Mar 14",
  "Mar 15",
];

const standardData = [
  3400, 3050, 2800, 2600, 2300, 2100, 1950, 1800,
];

const conservativeData = [
  3400, 3050, 2900, 2750, 2650, 2550, 2500, 2450,
];

export type StrategicLens = "standard" | "conservative";

export interface PaymentEventForChart {
  payDayIndex: number;
  billName: string;
  amount: string;
}

interface CashflowPlanChartProps {
  lens?: StrategicLens;
  className?: string;
  projectedData?: number[];
  paymentEvents?: PaymentEventForChart[];
}

function CashflowPlanChart({
  lens = "standard",
  className = "",
  projectedData,
  paymentEvents,
}: CashflowPlanChartProps): ReactElement {
  const data = projectedData ?? (lens === "conservative" ? conservativeData : standardData);

  const scatterPoints = useMemo(() => {
    if (!paymentEvents?.length || data.length === 0) return [];
    return paymentEvents
      .filter((e) => e.payDayIndex >= 0 && e.payDayIndex < data.length)
      .map((e) => ({
        x: e.payDayIndex,
        y: data[e.payDayIndex],
        billName: e.billName,
        amount: e.amount,
      }));
  }, [paymentEvents, data]);

  const options: Highcharts.Options = useMemo(() => ({
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 220,
      style: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
    title: { text: undefined },
    accessibility: { enabled: false },
    xAxis: {
      categories: CATEGORIES,
      lineColor: colors.borderMedium,
      tickLength: 0,
      labels: {
        style: { color: colors.textLight, fontSize: "11px" },
      },
    },
    yAxis: {
      title: { text: undefined },
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
      min: 0,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      // Highcharts calls formatter with point as `this`; React Compiler does not support `this`
      // eslint-disable-next-line react-hooks/unsupported-syntax -- Highcharts callback API
      formatter: function (this: Highcharts.Point) {
        const point = this as Highcharts.Point & { billName?: string; amount?: string };
        if (point.billName != null && point.amount != null) {
          return `<span style="font-weight:600">Payment</span><br/>${point.billName}: <strong>${point.amount}</strong>`;
        }
        if (this.y == null) return "";
        const x = this.x ?? (this as Highcharts.Point).category ?? "";
        return `<span style="font-weight:600">${x}</span><br/>Projected cash: <strong>$${Number(this.y).toLocaleString()}</strong>`;
      },
    },
    legend: { enabled: false },
    series: [
      {
        type: "line",
        name: "Projected cash",
        data,
        color: colors.xBlue600,
        lineWidth: 2,
        marker: { radius: 3, symbol: "circle" },
      },
      ...(scatterPoints.length > 0
        ? [
            {
              type: "scatter" as const,
              name: "Payments",
              data: scatterPoints,
              color: colors.xBlue600,
              marker: { radius: 6, symbol: "circle", lineWidth: 2, lineColor: "#fff" },
              tooltip: { pointFormat: "" },
              enableMouseTracking: true,
            },
          ]
        : []),
    ],
    credits: { enabled: false },
  }), [data, scatterPoints]);

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} updateArgs={[true, true, true]} />
    </div>
  );
}

export default CashflowPlanChart;
