"use client";
import React, { ReactElement } from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme, { colors } from "./Theme";
import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionContent } from "@/app/lib/RegionContent";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

interface ComponentProps {
  className?: string;
}

function NetProfitLossChart({ className }: ComponentProps): ReactElement {
  const { region } = useRegion();

  // Get region-specific financial data
  const regionData = getRegionContent("text", "netProfitLoss", region);
  const incomeValue = regionData?.income
    ? parseFloat(regionData.income.replace(/,/g, ""))
    : 140000;
  const expenseValue = regionData?.expense
    ? parseFloat(regionData.expense.replace(/,/g, ""))
    : 90000;

  const data = [
    { category: "Income", value: regionData?.income || "140,000.00" },
    { category: "Expenses", value: regionData?.expense || "90,000.00" },
  ];

  // Calculate appropriate max value for y-axis based on the larger value
  const maxValue = Math.max(incomeValue, expenseValue);
  const yAxisMax = Math.ceil(maxValue / 50000) * 50000; // Round up to nearest 50k

  // Calculate clean tick positions
  const getCleanTickPositions = (max: number) => {
    if (max <= 200000) {
      return [0, 100000, 200000];
    } else if (max <= 500000) {
      return [0, 250000, 500000];
    } else if (max <= 1000000) {
      return [0, 500000, 1000000];
    } else if (max <= 2000000) {
      return [0, 1000000, 2000000];
    } else if (max <= 3000000) {
      return [0, 1500000, 3000000];
    } else if (max <= 5000000) {
      return [0, 2500000, 5000000];
    } else {
      return [0, 5000000, 10000000];
    }
  };

  const tickPositions = getCleanTickPositions(yAxisMax);
  const finalYAxisMax = tickPositions[tickPositions.length - 1];

  const options: Highcharts.Options = {
    chart: {
      height: 317,
    },
    accessibility: {
      description: "Chart showing net profit and loss.",
    },
    xAxis: {
      categories: data.map((item) => item.category),
      labels: {
        formatter() {
          const point = data[this.pos];
          return `<span style="color: ${colors.xBlue600};">${point.category}</span> ${point.value}`;
        },
      },
    },
    yAxis: {
      labels: {
        formatter() {
          const value = this.value as number;
          if (value >= 1000000) {
            return `${value / 1000000}M`;
          } else if (value >= 1000) {
            return `${value / 1000}k`;
          } else {
            return value.toString();
          }
        },
      },
      tickPositions: tickPositions,
      max: finalYAxisMax,
    },
    plotOptions: {
      column: {
        groupPadding: 0.06,
      },
    },
    series: [
      {
        type: "column",
        data: [
          {
            name: "Income",
            y: incomeValue,
            borderColor: colors.xBlue600,
          },
          {
            name: "Expenses",
            y: expenseValue,
            color: colors.xBlue100,
            borderColor: colors.xBlue600,
          },
        ],
      },
    ],
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default NetProfitLossChart;
