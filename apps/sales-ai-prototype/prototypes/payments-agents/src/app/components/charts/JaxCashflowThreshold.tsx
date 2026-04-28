"use client";

import React, { ReactElement } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { colors } from "./Theme";

const THRESHOLD = 2000;

// Projected cash balance over next 8 days – dips below $2,000 in second week
const projectedCashData: [string, number][] = [
  ["Mar 8", 3400],
  ["Mar 9", 3050],
  ["Mar 10", 2800],
  ["Mar 11", 2600],
  ["Mar 12", 2300],
  ["Mar 13", 2100],
  ["Mar 14", 1950],
  ["Mar 15", 1800],
];

interface JaxCashflowThresholdChartProps {
  className?: string;
}

function JaxCashflowThresholdChart({
  className = "",
}: JaxCashflowThresholdChartProps): ReactElement {
  const options: Highcharts.Options = {
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
      categories: projectedCashData.map(([label]) => label),
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
        if (this.y == null) return "";
        const x = this.x ?? this.category ?? "";
        return `<span style="font-weight:600">${x}</span><br/>Projected cash: <strong>$${Number(this.y).toLocaleString()}</strong>`;
      },
    },
    legend: { enabled: false },
    series: [
      {
        type: "line",
        name: "Projected cash",
        data: projectedCashData.map(([, y]) => y),
        color: colors.xBlue600,
        lineWidth: 2,
        marker: { radius: 3, symbol: "circle" },
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default JaxCashflowThresholdChart;
