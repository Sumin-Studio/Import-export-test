"use client";
import React, { ReactElement } from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme, { colors } from "./Theme";
import { customTooltipContent } from "./Tooltip";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

interface ComponentProps {
  className?: string;
}

const data = [
  {
    category: "Overdue",
    tipCategory: `Due prior to 17 Jun`,
    quantityOverdue: 4,
    ammountOverdue: 3500,
  },
  {
    category: "Due this<br />week",
    tipCategory: `Due this week, <span style="font-weight: 400;">17 Jun - 23 Jun</span>`,
    quantityDue: 3,
    quantityOverdue: 2,
    ammountDue: 15000,
    ammountOverdue: 1500,
  },
  {
    category: `24 Jun—<br />30 Jun`,
    tipCategory: `Due next week, <span style="font-weight: 400;">24 Jun - 30 Jun</span>`,
    quantityDue: 10,
    ammountDue: 30000,
  },
  {
    category: `1 Jul—<br />7 Jul`,
    tipCategory: `Due 1 Jul - 7 Jul`,
    quantityDue: 8,
    ammountDue: 12500,
  },
  {
    category: `From <br />8 Jul`,
    tipCategory: `Due from 8 Jul`,
    quantityDue: 5,
    ammountDue: 7500,
  },
];

const options: Highcharts.Options = {
  chart: {
    height: 280,
  },
  accessibility: {
    description: "Chart showing current invoices owed.",
  },
  xAxis: {
    categories: data.map((item) => item.category),
  },
  yAxis: {
    labels: {
      formatter() {
        return `${Number(this.value) / 1000}k`;
      },
    },
    tickPositions: [0, 20000, 40000],
  },
  plotOptions: {
    column: {
      groupPadding: 0.133,
      stacking: "normal",
    },
  },
  series: [
    {
      type: "column",
      data: [
        {
          y: data[0].ammountOverdue,
          color: colors.xRed500,
          borderColor: colors.xRed500,
          name: "Overdue",
          custom: {
            tooltipContent: () =>
              customTooltipContent({ x: data[0].category }, data),
          },
        },
        {
          y: data[1].ammountDue,
          color: colors.xBlue100,
          borderColor: colors.xBlue600,
          name: "Due this week",
          custom: {
            tooltipContent: () =>
              customTooltipContent({ x: data[1].category }, data),
          },
        },
        {
          y: data[2].ammountDue,
          color: colors.xBlue100,
          borderColor: colors.xBlue600,
          name: "Awaiting payment",
          custom: {
            tooltipContent: () =>
              customTooltipContent({ x: data[2].category }, data),
          },
        },
        {
          y: data[3].ammountDue,
          color: colors.xBlue100,
          borderColor: colors.xBlue600,
          name: "Awaiting payment",
          custom: {
            tooltipContent: () =>
              customTooltipContent({ x: data[3].category }, data),
          },
        },
        {
          y: data[4].ammountDue,
          color: colors.xBlue100,
          borderColor: colors.xBlue600,
          name: "Awaiting payment",
          custom: {
            tooltipContent: () =>
              customTooltipContent({ x: data[4].category }, data),
          },
        },
      ],
    },
    {
      type: "column",
      data: [
        { y: 0, color: colors.xBlue100 },
        {
          y: data[1].ammountOverdue,
          color: colors.xRed500,
          borderColor: colors.xRed500,
          name: "Overdue",
          custom: {
            tooltipContent: () =>
              customTooltipContent({ x: data[1].category }, data),
          },
        },
        { y: 0, color: colors.xBlue100 },
        { y: 0, color: colors.xBlue100 },
        { y: 0, color: colors.xBlue100 },
      ],
    },
  ],
};

function InvoicesOwedChart({ className }: ComponentProps): ReactElement {
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

export default InvoicesOwedChart;
