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
  colSpan?: 1 | 2;
}

interface WeeklyTimeData {
  day: string;
  billable: number;
  nonBillable: number;
  capacity: number;
}

function TimeSummaryChart({
  className = "",
  colSpan,
}: ComponentProps): ReactElement {
  const [mouseY, setMouseY] = React.useState(0);
  const chartRef = React.useRef<HighchartsReact.RefObject>(null);

  // Memoize weekly data to prevent random regeneration on every render
  const weeklyData = React.useMemo(() => {
    const generateWeeklyData = (): WeeklyTimeData[] => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
      const todayIndex = today === 0 ? 4 : today - 1; // Convert to 0-4 index (Mon-Fri)

      return days.map((day, index) => {
        const capacity = 8;
        let billable = 0;
        let nonBillable = 0;

        // Only populate data for days up to and including today
        if (index <= todayIndex) {
          // Billable between 6.5 and 8.5
          billable = Math.round((6.5 + Math.random() * 2) * 10) / 10;
          // Non-billable between 0 and 2
          nonBillable = Math.round(Math.random() * 2 * 10) / 10;
        }

        return { day, billable, nonBillable, capacity };
      });
    };

    return generateWeeklyData();
  }, []);

  const categories = weeklyData.map((item: WeeklyTimeData) => item.day);
  const billableData = weeklyData.map((item: WeeklyTimeData) => item.billable);
  const nonBillableData = weeklyData.map(
    (item: WeeklyTimeData) => item.nonBillable
  );
  const capacityData = weeklyData.map((item: WeeklyTimeData) => item.capacity);

  const options: Highcharts.Options = {
    chart: {
      height: 360,
      type: "column",
      spacingBottom: 0,
    },
    accessibility: {
      description:
        "Chart showing time summary with billable, non-billable, and capacity hours.",
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          color: "#59606d",
          fontSize: "13px",
          fontFamily: "Helvetica Neue, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      max: 10,
      tickPositions: [0, 2, 4, 6, 8, 10],
      labels: {
        formatter() {
          return `${this.value}h`;
        },
        style: {
          color: "#59606d",
          fontSize: "13px",
          fontFamily: "Helvetica Neue, sans-serif",
        },
      },
      title: {
        text: undefined,
      },
      gridLineColor: "#e6e7e9",
      gridLineWidth: 1,
    },
    plotOptions: {
      column: {
        groupPadding: colSpan === 2 ? -0.06 : 0.04,
        pointPadding: colSpan === 2 ? 0.2 : 0.3,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Capacity",
        type: "column",
        data: capacityData.map((capacity: number, index: number) => ({
          y: capacity,
          x: index,
          color: "#e6e7e9",
        })),
        zIndex: 1,
        grouping: false, // Don't group with other series
        pointPadding: 0.1,
        pointPlacement: 0,
      },
      {
        name: "Non-billable",
        type: "column",
        data: nonBillableData,
        color: "#de0e40",
        stacking: "normal",
        zIndex: 4,
      },
      {
        name: "Billable",
        type: "column",
        data: billableData,
        color: "#0078c8",
        stacking: "normal",
        zIndex: 3,
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true,
      backgroundColor: "transparent",
      borderWidth: 0,
      shadow: false,
      padding: 0,
      positioner: function (labelWidth, labelHeight, point) {
        // Position tooltip above the mouse cursor
        // Calculate the chart container's position on the page
        const chartRect = this.chart.container.getBoundingClientRect();
        // Position above the cursor with 10px offset
        const y = mouseY - chartRect.top - labelHeight - 10;

        const x = point.plotX + this.chart.plotLeft - labelWidth / 2;

        return { x, y };
      },
      formatter: function () {
        const pointIndex = this.points?.[0]?.x ?? 0;
        const dayData = weeklyData[pointIndex];

        if (!dayData) return "";

        // Convert decimal hours to hours and minutes
        const formatTime = (hours: number): string => {
          const h = Math.floor(hours);
          const m = Math.round((hours - h) * 60);
          if (m === 0) return `${h}h`;
          return `${h}h ${m}m`;
        };

        // Build array of visible rows
        const rows: Array<{ label: string; value: number; color: string }> = [];

        if (dayData.capacity > 0) {
          rows.push({
            label: "Capacity",
            value: dayData.capacity,
            color: "#e6e7e9",
          });
        }
        if (dayData.billable > 0) {
          rows.push({
            label: "Billable hours",
            value: dayData.billable,
            color: "#0078c8",
          });
        }
        if (dayData.nonBillable > 0) {
          rows.push({
            label: "Non-billable hours",
            value: dayData.nonBillable,
            color: "#de0e40",
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
                border-radius: 100%;
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
              ">${formatTime(row.value)}</div>
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
            ">${dayData.day}</div>
            ${rowsHtml}
          </div>
        `;
      },
    },
  };

  return (
    <div
      className={className}
      onMouseMove={(e) => {
        setMouseY(e.clientY);
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
}

export default TimeSummaryChart;
