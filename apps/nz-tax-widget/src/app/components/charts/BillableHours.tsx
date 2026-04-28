"use client";
import React, { ReactElement } from "react";
import Highcharts, { setOptions } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import theme from "./Theme";

if (typeof Highcharts === "object") {
  setOptions(theme);
}

interface ComponentProps {
  className?: string;
  timeframe?: "today" | "week";
  enteredMinutes?: number;
  enteredHours?: number;
  expectedHours?: number;
  expectedPerWeek?: number;
}

interface TooltipData {
  expectedPerWeek: number;
  expectedToDate: number;
  enteredToDate: number;
}

function BillableHoursChart({
  className,
  timeframe = "week",
  enteredMinutes,
  enteredHours,
  expectedHours = 6,
  expectedPerWeek = 30,
}: ComponentProps): ReactElement {
  // Calculate the time values based on timeframe
  const totalMinutes =
    timeframe === "today" && enteredMinutes !== undefined
      ? enteredMinutes
      : (enteredHours || 0) * 60;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const totalHours = totalMinutes / 60;

  // Calculate shortfall (under expected) or overtime (over expected)
  const difference = totalHours - expectedHours;
  const shortfallHours = Math.max(0, -difference); // Positive when under target
  const overtimeHours = Math.max(0, difference); // Positive when over target

  // Format center label
  const centerLabel =
    timeframe === "today" && enteredMinutes !== undefined
      ? minutes === 0
        ? `${hours}h`
        : `${hours}h ${minutes}m`
      : `${hours}h`;

  // Tooltip data
  const tooltipData: TooltipData = {
    expectedPerWeek: expectedPerWeek,
    expectedToDate: expectedHours,
    enteredToDate: totalHours,
  };

  // Format time for tooltip (only show whole hours)
  const formatTooltipTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 310,
      backgroundColor: "transparent",
      margin: [-10, -10, -10, -10],
    },
    accessibility: {
      description: "Donut chart showing billable hours progress.",
    },
    title: {
      text: undefined,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: true,
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            enabled: false,
            opacity: 1,
          },
        },
        borderWidth: 0,
      },
      pie: {
        shadow: false,
        center: ["50%", "50%"],
      },
    },
    series: [
      {
        name: "Base Ring",
        type: "pie",
        size: "100%",
        innerSize: "60%",
        borderRadius: 0,
        data: [
          {
            name: "Base",
            y: 100,
            color: "#E6E7E9",
          },
        ],
        zIndex: 1,
      },
      {
        name: "Billable Hours",
        type: "pie",
        size: "100%",
        innerSize: "60%",
        borderRadius: 0,
        data: [
          {
            name: "Completed Hours (within expected)",
            y: Math.min(totalHours, expectedHours),
            color: "#0078c8",
            borderColor: "#0078c8",
            borderWidth: 1, // Thicker border for better internal appearance
          },
          {
            name: "Overtime Hours",
            y: overtimeHours > 0 ? overtimeHours : 0,
            color: "#97cee8", // Slightly darker than original to accommodate border overlay
            borderColor: "#0078c8",
            borderWidth: 1, // Thicker border for better internal appearance
          },
          {
            name: "Remaining to Expected",
            y: shortfallHours > 0 ? shortfallHours : 0,
            color: "#E6E7E9",
          },
          {
            name: "Remaining Capacity",
            y: Math.max(0, 7 - Math.max(totalHours, expectedHours)),
            color: "transparent",
          },
        ],
        zIndex: 2,
      },
    ],
    tooltip: {
      enabled: true,
      shared: false,
      useHTML: true,
      backgroundColor: "transparent",
      borderWidth: 0,
      shadow: false,
      padding: 0,
      positioner: function (labelWidth, labelHeight, point) {
        // Position tooltip above the mouse cursor
        const x = point.plotX + this.chart.plotLeft - labelWidth / 2;
        const y = point.plotY + this.chart.plotTop - labelHeight - 20;

        return { x, y };
      },
      formatter: function () {
        // Calculate if user is ahead
        const aheadBy = tooltipData.enteredToDate - tooltipData.expectedToDate;
        const isAhead = aheadBy > 0;

        // Build array of visible rows
        const rows: Array<{ label: string; value: number; color: string }> = [];

        if (timeframe === "week") {
          rows.push({
            label: "Expected this week",
            value: tooltipData.expectedPerWeek,
            color: "#E6E7E9",
          });
        }

        rows.push(
          {
            label: "Expected to date",
            value: tooltipData.expectedToDate,
            color: "#E6E7E9",
          },
          {
            label: "Entered to date",
            value: tooltipData.enteredToDate,
            color: "#0078c8",
          }
        );

        // Add "You're ahead by" row if applicable
        if (isAhead) {
          rows.push({
            label: "You're ahead by",
            value: aheadBy,
            color: "#a3d4f0", // Lighter blue
          });
        }

        // Generate HTML for rows
        const rowsHtml = rows
          .map(
            (row, index) => `
            <div style="
              display: flex;
              gap: 8px;
              align-items: center;
              ${index < rows.length - 1 ? "margin-bottom: 4px;" : ""}
            ">
              <div style="
                width: 8px;
                height: 8px;
                background: ${row.color};
                border-radius: 2px;
                flex-shrink: 0;
              "></div>
              <div style="
                flex-grow: 1;
                font-family: 'Helvetica Neue', sans-serif;
                font-size: 13px;
                line-height: 20px;
                color: #000a1e;
              ">${row.label}</div>
              <div style="
                font-family: 'Helvetica Neue', sans-serif;
                font-size: 13px;
                line-height: 20px;
                color: #000a1e;
                white-space: nowrap;
              ">${formatTooltipTime(row.value)}</div>
            </div>`
          )
          .join("");

        return `
          <div style="
            background: #ffffff;
            border: 1px solid #a6a9b0;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 10, 30, 0.12);
            position: relative;
            min-width: 240px;
          ">
            <div style="
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #a6a9b0;
            "></div>
            <div style="
              position: absolute;
              bottom: -6.5px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid #ffffff;
            "></div>
            <div style="
              font-family: 'Helvetica Neue', sans-serif;
              font-weight: 700;
              font-size: 13px;
              line-height: 20px;
              color: #000a1e;
              margin-bottom: 4px;
            ">Billable hours</div>
            ${rowsHtml}
          </div>
        `;
      },
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <>
      {/* <div>total hours: {totalHours}</div>
      <div>expected hours: {expectedHours}</div> */}
      <div className={`${className} relative flex items-center justify-center`}>
        <div className="relative aspect-square w-full max-w-[320px]">
          <HighchartsReact highcharts={Highcharts} options={options} />
          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="text-[22px] leading-[normal] font-light text-[#000a1e]"
              style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
            >
              {centerLabel}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillableHoursChart;
