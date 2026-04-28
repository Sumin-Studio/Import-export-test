import type Highcharts from "highcharts";

/** Pixels above the hovered point — tight enough to read as anchored to Protect markers / line. */
const MARGIN_ABOVE = 28;
const EDGE_PAD = 6;

/**
 * Anchors the tooltip just above the hovered point (centred on x), with edge clamping.
 * Use for cashflow charts so Protect popovers sit near the shield marker instead of floating away.
 */
export function cashflowTooltipPositionNearPoint(
  this: Highcharts.Tooltip,
  labelWidth: number,
  labelHeight: number,
  point: Highcharts.Point
): { x: number; y: number } {
  const chart = this.chart;
  const px = point.plotX ?? 0;
  const py = point.plotY ?? 0;
  let x = chart.plotLeft + px - labelWidth / 2;
  let y = chart.plotTop + py - labelHeight - MARGIN_ABOVE;
  const maxX = chart.plotLeft + chart.plotWidth - labelWidth - EDGE_PAD;
  const maxY = chart.plotTop + chart.plotHeight - labelHeight - EDGE_PAD;
  x = Math.max(chart.plotLeft + EDGE_PAD, Math.min(x, maxX));
  y = Math.max(chart.plotTop + EDGE_PAD, Math.min(y, maxY));
  return { x: Math.round(x), y: Math.round(y) };
}
