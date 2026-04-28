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
}

const data = [
  { category: "Older", amount: 12500 },
  { category: "Jan", amount: 8200 },
  { category: "Feb", amount: 24100 },
  { category: "Mar", amount: 15800 },
  { category: "Apr", amount: 19200 },
  { category: "Future", amount: 6800 },
];

const options: Highcharts.Options = {
  chart: {
    height: 280,
  },
  accessibility: {
    description: "Chart showing money going out over time.",
  },
  xAxis: {
    categories: data.map((d) => d.category),
  },
  yAxis: {
    max: 30000,
    tickPositions: [0, 15000, 30000],
    labels: {
      formatter() {
        return `${Number(this.value) / 1000}k`;
      },
    },
  },
  plotOptions: {
    column: {
      groupPadding: 0.12,
      pointPadding: 0.08,
      borderWidth: 1,
    },
  },
  series: [
    {
      type: "column",
      name: "Money out",
      data: data.map((item) => ({
        y: item.amount,
        borderColor: colors.xBlue600,
        color: colors.xBlue100,
      })),
    },
  ],
  tooltip: {
    headerFormat: "<span style='font-weight:600'>{point.key}</span><br/>",
    pointFormat:
      "<span style='color:{point.color}'>●</span> {series.name}: <b>{point.y:,.2f}</b>",
  },
  legend: {
    enabled: false,
  },
};

function MoneyGoingOutChart({ className }: ComponentProps): ReactElement {
  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} theme={theme} />
    </div>
  );
}

export default MoneyGoingOutChart;
