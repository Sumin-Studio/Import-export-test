// highchartsTheme.ts

import Highcharts, { setOptions } from "highcharts";

// Color variables
export const colors = {
  xBlue100: "#B1DFFE",
  xBlue500: "#018DEB",
  xBlue600: "#0078C8",
  xRed500: "#DE0E40",
  textDark: "#000A1E",
  textLight: "#59606D",
  borderLight: "#E6E7E9",
  borderMedium: "#6683A5",
  borderDark: "#7D96B3",
  gridLine: "#D2DFE7",
  crosshair: "rgba(0, 10, 30, 0.05",
};

// Highcharts theme
const theme: Highcharts.Options = {
  chart: {
    type: "column",
    style: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    },
  },
  accessibility: {
    enabled: false,
    // keyboardNavigation: {
    //   enabled: true,
    //   seriesNavigation: {
    //     mode: "serialize",
    //   },
    // },
    // announceNewData: {
    //   enabled: true,
    // },
  },
  title: {
    text: undefined,
  },
  xAxis: {
    lineColor: colors.borderMedium,
    tickLength: 0,
    angle: 0,
    crosshair: {
      color: colors.crosshair,
    },
    labels: {
      autoRotation: [-0],
      useHTML: true,
      style: {
        color: colors.textLight,
        fontSize: "13px",
        lineHeight: "16px",
        textAlign: "center",
      },
      y: 18,
    },
  },
  yAxis: {
    title: {
      text: undefined,
    },
    labels: {
      useHTML: true,
      style: {
        color: colors.textLight,
        fontSize: "13px",
        lineHeight: "16px",
        textAlign: "center",
      },
    },
    gridLineColor: colors.gridLine,
  },
  colors: [colors.xBlue600, colors.xBlue100],
  plotOptions: {
    column: {
      borderRadius: 5,
      pointPadding: 0,
      groupPadding: 0.1,
      borderWidth: 1,
      borderColor: colors.xBlue500,
    },
    series: {
      states: {
        hover: {
          enabled: false,
        },
        inactive: {
          opacity: 1,
        },
      },
      stickyTracking: false,
    },
  },
  tooltip: {
    padding: 0,
    shared: true,
    useHTML: true,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 10, 30, 0.35)",
    headerFormat: "",
    outside: true,
    shape: undefined,
    shadow: {
      color: "rgba(0, 0, 0, 0.25)",
      offsetX: 0,
      offsetY: 2,
      opacity: 1,
      width: 4,
    },
    style: {
      fontSize: "13px",
      fontFamily: "Arial, sans-serif",
      color: colors.textDark,
    },
    formatter() {
      const point = this.points?.[0] as Highcharts.Point & {
        custom?: {
          tooltipContent?: (context: unknown) => string;
        };
      };
      const content =
        typeof point.custom?.tooltipContent === "function"
          ? point.custom.tooltipContent(this)
          : "";

      let tooltipContent = `<div style="line-height: 20px; padding: 16px; position: relative; width: 240px;">`;
      tooltipContent += content;
      tooltipContent += `<div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #ffffff; filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.25));">`;
      tooltipContent += `<div style="position: absolute; right: -4px; top: -9px; width: 1px; height: 11px; background-color: rgba(0, 10, 30, 0.35); transform: rotate(45deg);"></div>`;
      tooltipContent += `<div style="position: absolute; left:-4px; top: -9px; width: 1px; height: 11px; background-color: rgba(0, 10, 30, 0.35); transform: rotate(-45deg);"></div>`;
      tooltipContent += `</div>`;
      return tooltipContent;
    },
    positioner(w, h, point) {
      const chart = this.chart;
      const pointWidth = chart.plotWidth / chart.series[0].points.length;
      const xOffset = (pointWidth - w) / 1.4; // Center the tooltip over the column
      return {
        x: point.plotX + chart.plotLeft + xOffset,
        y: point.plotY + chart.plotTop - h - 18, // Adjust the y position as needed
      };
    },
  },
  legend: {
    enabled: false,
    align: "right",
    verticalAlign: "bottom",
    symbolRadius: 6,
    symbolHeight: 12,
    symbolWidth: 12,
    itemMarginTop: 0,
    itemStyle: {
      color: colors.textLight,
      fontSize: "11px",
    },
    itemHoverStyle: {
      color: colors.textLight,
    },
    events: {
      itemClick(event) {
        event.preventDefault();
        return false;
      },
    },
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
};

if (typeof Highcharts === "object") {
  setOptions(theme);
}

export default theme;
