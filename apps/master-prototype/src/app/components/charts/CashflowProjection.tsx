"use client";

import React, { type ReactElement } from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme, { colors } from "./Theme";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

const GREEN = "#13A972";
const GREEN_FILL = "rgba(19, 169, 114, 0.12)";

interface ComponentProps {
  className?: string;
}

/** Simplified actual vs projected cash — line + area for Just Pay dashboard. */
function CashflowProjectionChart({ className }: ComponentProps): ReactElement {
  const categories = [
    "1 Feb",
    "8 Feb",
    "15 Feb",
    "22 Feb",
    "1 Mar",
    "8 Mar",
    "15 Mar",
    "22 Mar",
    "29 Mar",
    "5 Apr",
    "12 Apr",
    "19 Apr",
  ];

  const actual = [
    42000, 43500, 42800, 44100, 43800, 44500, 44200, 44800, null, null, null,
    null,
  ];
  const projected = [
    null, null, null, null, null, null, null, 44800, 45200, 44900, 45500,
    46200,
  ];

  const options: Highcharts.Options = {
    chart: {
      type: "areaspline",
      height: 300,
      backgroundColor: "transparent",
    },
    accessibility: {
      description:
        "Projected available cash showing actual history and projected trend.",
    },
    xAxis: {
      categories,
      lineColor: colors.borderMedium,
      tickLength: 0,
      labels: {
        style: {
          color: colors.textLight,
          fontSize: "11px",
        },
      },
      plotLines: [
        {
          value: 7.5,
          width: 1,
          dashStyle: "Dash",
          color: colors.borderMedium,
          zIndex: 5,
        },
      ],
    },
    yAxis: {
      title: { text: undefined },
      gridLineColor: colors.gridLine,
      labels: {
        format: "{value:,.0f}",
        style: {
          color: colors.textLight,
          fontSize: "11px",
        },
      },
    },
    plotOptions: {
      areaspline: {
        lineWidth: 2,
        marker: { enabled: false },
        states: { hover: { lineWidth: 2 } },
      },
      series: {
        animation: false,
      },
    },
    series: [
      {
        type: "areaspline",
        name: "Actual",
        data: actual,
        color: GREEN,
        fillColor: GREEN_FILL,
        lineWidth: 2,
        connectNulls: false,
      },
      {
        type: "spline",
        name: "Projected",
        data: projected,
        color: GREEN,
        dashStyle: "Dash",
        lineWidth: 2,
        connectNulls: true,
        enableMouseTracking: true,
      },
    ],
    tooltip: {
      shared: true,
      backgroundColor: "#fff",
      borderColor: colors.borderLight,
    },
    legend: {
      align: "right",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemStyle: {
        color: colors.textDark,
        fontSize: "12px",
        fontWeight: "400",
      },
      symbolWidth: 8,
      symbolHeight: 8,
      symbolRadius: 4,
    },
  };

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default CashflowProjectionChart;
