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
  variant?: "default" | "sales";
}

const defaultData = [
  {
    category: "Overdue",
    tipCategory: `Due prior to 17 Jun`,
    quantityOverdue: 1,
    ammountOverdue: 1000,
  },
  {
    category: "Due this<br />week",
    tipCategory: `Due this week, <span style="font-weight: 400;">17 Jun - 23 Jun</span>`,
    quantityDue: 2,
    quantityOverdue: 1,
    ammountDue: 1250,
    ammountOverdue: 500,
  },
  {
    category: `24 Jun—<br />30 Jun`,
    tipCategory: `Due next week, <span style="font-weight: 400;">24 Jun - 30 Jun</span>`,
    quantityDue: 10,
    ammountDue: 3500,
  },
  {
    category: `1 Jul—<br />7 Jul`,
    tipCategory: `Due 1 Jul - 7 Jul`,
    quantityDue: 9,
    ammountDue: 1000,
  },
  {
    category: `From <br />8 Jul`,
    tipCategory: `Due from 8 Jul`,
    quantityDue: 11,
    ammountDue: 750,
  },
];

const salesData = [
  {
    category: "Older",
    tipCategory: `Due prior to Dec`,
    quantityOverdue: 1,
    ammountOverdue: 1000,
  },
  {
    category: "Dec",
    tipCategory: `Due in December`,
    quantityDue: 2,
    quantityOverdue: 1,
    ammountDue: 1250,
    ammountOverdue: 500,
  },
  {
    category: "Jan",
    tipCategory: `Due in January`,
    quantityDue: 10,
    quantityOverdue: 3,
    ammountDue: 2300,
    ammountOverdue: 1200,
  },
  {
    category: "Feb",
    tipCategory: `Due in February`,
    quantityDue: 9,
    ammountDue: 1000,
  },
  {
    category: "Mar",
    tipCategory: `Due in March`,
    quantityDue: 8,
    ammountDue: 750,
  },
  {
    category: "Future",
    tipCategory: `Due from April`,
    quantityDue: 11,
    ammountDue: 500,
  },
];

function buildOptions(data: typeof defaultData, isSales: boolean): Highcharts.Options {
  const overdueColor = isSales ? "#556070" : colors.xRed500;

  const primarySeries: Highcharts.PointOptionsObject[] = data.map((d, i) => ({
    y: i === 0 ? (d.ammountOverdue || 0) : (d.ammountDue || 0),
    color: i === 0 ? overdueColor : colors.xBlue100,
    borderColor: i === 0 ? overdueColor : colors.xBlue600,
    name: i === 0 ? "Overdue" : (i === 1 ? (isSales ? "Due" : "Due this week") : "Awaiting payment"),
    custom: {
      tooltipContent: () => customTooltipContent({ x: d.category }, data),
    },
  }));

  const stackedSeries: Highcharts.PointOptionsObject[] = data.map((d, i) => {
    if (i > 0 && d.ammountOverdue) {
      return {
        y: d.ammountOverdue,
        color: overdueColor,
        borderColor: overdueColor,
        name: "Overdue",
        custom: {
          tooltipContent: () => customTooltipContent({ x: d.category }, data),
        },
      };
    }
    return { y: 0, color: colors.xBlue100 };
  });

  return {
    chart: {
      height: isSales ? 380 : 280,
    },
    accessibility: {
      description: "Chart showing current bills to pay.",
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
      tickPositions: isSales ? [0, 1000, 2000, 3000, 4000] : [0, 2000, 4000],
    },
    plotOptions: {
      column: {
        groupPadding: 0.133,
        stacking: "normal",
      },
    },
    series: [
      { type: "column", data: primarySeries },
      { type: "column", data: stackedSeries },
    ],
  };
}

function BillsToPayChart({ className, variant = "default" }: ComponentProps): ReactElement {
  const isSales = variant === "sales";
  const data = isSales ? salesData : defaultData;
  const options = buildOptions(data, isSales);

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} theme={theme} />
    </div>
  );
}

export default BillsToPayChart;
