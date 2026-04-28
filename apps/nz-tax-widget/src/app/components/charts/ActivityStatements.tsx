"use client";
import React, { ReactElement } from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme, { colors } from "./Theme";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

interface ComponentProps {
  className?: string;
  colSpan?: number;
}

const data = [
  { category: "Draft", value: 160, color: colors.xBlue600 },
  { category: "Completed", value: 120, color: colors.xBlue600 },
  { category: "Approved", value: 70, color: colors.xBlue600 },
  { category: "To sign", value: 40, color: colors.xBlue600 },
  { category: "To file", value: 80, color: colors.xBlue600 },
  { category: "Submitted", value: 120, color: colors.xBlue600 },
];

const getOptions = (colSpan?: number): Highcharts.Options => ({
  chart: {
    height: colSpan === 2 ? 340 : 295,
    type: "column",
  },
  accessibility: {
    description: "Chart showing activity statements by status.",
  },
  xAxis: {
    categories: data.map((item) => item.category),
    labels: {
      style: {
        fontSize: "11px",
        color: colors.textLight,
      },
    },
  },
  yAxis: {
    min: 0,
    max: 200,
    tickPositions: [0, 50, 100, 150, 200],
    labels: {
      style: {
        fontSize: "11px",
        color: colors.textLight,
      },
    },
    gridLineColor: colors.gridLine,
  },
  plotOptions: {
    column: {
      /** Match {@link AnnualTaxReturnsChart} pipeline columns (gaps + rounded tops). */
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
      name: "Activity Statements",
      showInLegend: false,
      data: data.map((item) => ({
        y: item.value,
        color: item.color,
        name: item.category,
      })),
    },
  ],
  tooltip: {
    enabled: false,
  },
});

function ActivityStatementsChart({
  className,
  colSpan,
}: ComponentProps): ReactElement {
  return (
    <div className={`w-full min-w-0 ${className ?? ""}`}>
      <HighchartsReact
        highcharts={Highcharts}
        options={getOptions(colSpan)}
        theme={theme}
      />
    </div>
  );
}

export default ActivityStatementsChart;
