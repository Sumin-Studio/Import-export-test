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
  {
    category: "Jan",
    tipCategory: "Jan 2025",
    cashIn: 110000,
    cashOut: 110000,
    difference: 0,
  },
  {
    category: "Feb",
    tipCategory: "Feb 2025",
    cashIn: 250000,
    cashOut: 175000,
    difference: 75000,
  },
  {
    category: "Mar",
    tipCategory: "Mar 2025",
    cashIn: 150000,
    cashOut: 42500,
    difference: 107500,
  },
  {
    category: "Apr",
    tipCategory: "Apr 2025",
    cashIn: 200000,
    cashOut: 110000,
    difference: 90000,
  },
  {
    category: "May",
    tipCategory: "May 2025",
    cashIn: 80000,
    cashOut: 42500,
    difference: 37500,
  },
  {
    category: "Jun",
    tipCategory: "Jun 2025",
    cashIn: 210000,
    cashOut: 170000,
    difference: 40000,
  },
];

const customTooltipContent = (context: { x: string }): string => {
  const dataItem = data.find((d) => d.category === context.x);
  if (!dataItem) return "";
  return `
      <span style="font-weight: 600; margin-bottom: 4px; display: block;">${
        dataItem.tipCategory
      }</span>
      <ul>
        <li style="display: flex; flex-direction: row; justify-content: space-between;">
          <span style="display: flex; gap: 8px; flex-direction: row; align-items: center;">
            <span style="width: 10px; height: 10px; background-color: ${
              colors.xBlue600
            }; border-radius: 50%;"></span>
            <span>Cash in</span>
          </span>
          <span>${dataItem.cashIn.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</span>
        </li>
        <li style="display: flex; flex-direction: row; justify-content: space-between;">
          <span style="display: flex; gap: 8px; flex-direction: row; align-items: center;">
            <span style="width: 10px; height: 10px; background-color: ${
              colors.xBlue100
            }; border: 1px solid ${
    colors.xBlue100
  }; border-radius: 50%;"></span>
            <span>Cash out</span>
          </span>
          <span>-${dataItem.cashOut.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</span>
        </li>
        <li style="border-top: 1px solid #cdd5e0; margin-top: 8px; padding: 8px 0 0; display: flex; flex-direction: row; justify-content: space-between;">
          <span>Difference</span>
          <span>${dataItem.difference.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</span>
        </li>
      </ul>
    `;
};

const options: Highcharts.Options = {
  chart: {
    height: 288,
  },
  accessibility: {
    description: "Chart showing cash flow (money in and out) over six months.",
  },
  xAxis: {
    categories: data.map((item) => item.category),
  },
  yAxis: {
    max: 200000,
    tickPositions: [0, 150000, 300000],
  },
  plotOptions: {
    column: {
      groupPadding: 0.1,
      pointPadding: 0.09,
    },
  },
  series: [
    {
      type: "column",
      name: "Cash in",
      data: data.map((item) => ({
        y: item.cashIn,
        borderColor: colors.xBlue600,
        custom: {
          tooltipContent: () => customTooltipContent({ x: item.category }),
        },
      })),
    },
    {
      type: "column",
      name: "Cash out",
      data: data.map((item) => ({
        y: item.cashOut,
        borderColor: colors.xBlue600,
        custom: {
          tooltipContent: () => customTooltipContent({ x: item.category }),
        },
      })),
    },
  ],
  tooltip: {
    positioner(w, h, point) {
      const chart = this.chart;
      const pointWidth = chart.plotWidth / chart.series[0].points.length;
      const xOffset = (pointWidth - w) / 1.68; // Center the tooltip over the column
      return {
        x: point.plotX + chart.plotLeft + xOffset,
        y: point.plotY + chart.plotTop - h - 50, // Adjust the y position as needed
      };
    },
  },
  legend: {
    enabled: true,
  },
};

function CashInAndOutChart({ className }: ComponentProps): ReactElement {
  return (
    <div className={className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        theme={theme}
      />
    </div>
  );
}

export default CashInAndOutChart;
