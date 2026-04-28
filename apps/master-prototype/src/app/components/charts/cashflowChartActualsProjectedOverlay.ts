import type Highcharts from "highcharts";
import { NATIONAL_FONT_STACK } from "@/lib/national-font-stack";
import { colors } from "./Theme";
import { cashflowActualsProjectedSplitIndex } from "./cashflowChartAxis";

export type ChartWithActualsProjectedGroup = Highcharts.Chart & {
  _cfActualsProjG?: Highcharts.SVGElement;
  _cfThresholdPillG?: Highcharts.SVGElement;
};

/** Rounded pill background — very light grey, matches prototype neutrals. */
const PILL_BG = "#eff1f2";
const PILL_PAD_X = 6;
const PILL_PAD_Y = 2;
const GAP_FROM_SPLIT_PX = 6;
/** Top of plot area + offset so pills sit above the series, below the chart top margin. */
const TOP_OFFSET = 8;

/**
 * Draws "Actuals" / "Projected" pills at the top of the plot (over the chart), straddling the split.
 */
export function syncCashflowActualsProjectedLabels(chart: Highcharts.Chart): void {
  const c = chart as ChartWithActualsProjectedGroup;
  c._cfActualsProjG?.destroy();
  c._cfActualsProjG = undefined;

  const xAxis = chart.xAxis[0];
  const n = xAxis.categories?.length ?? 0;
  const split = cashflowActualsProjectedSplitIndex(n);
  if (split < 1 || n < 2) return;

  const splitX = xAxis.toPixels(split, false);
  const topY = chart.plotTop + TOP_OFFSET;

  const g = chart.renderer.g().add();

  const addPill = (label: string, side: "leftOfLine" | "rightOfLine") => {
    const text = chart.renderer
      .text(label, 0, 0)
      .css({
        color: colors.textLight,
        fontSize: "11px",
        fontFamily: NATIONAL_FONT_STACK,
      })
      .add(g);

    const bbox = text.getBBox();
    const w = bbox.width + PILL_PAD_X * 2;
    const h = Math.max(bbox.height + PILL_PAD_Y * 2, 16);
    /** Capsule ends: full pill shape (clamped so narrow labels stay valid). */
    const pillR = Math.min(h / 2, w / 2);
    const left =
      side === "leftOfLine"
        ? splitX - GAP_FROM_SPLIT_PX - w
        : splitX + GAP_FROM_SPLIT_PX;

    chart.renderer
      .rect(left, topY, w, h, pillR, pillR)
      .attr({ fill: PILL_BG })
      .add(g);

    text.attr({
      x: left + PILL_PAD_X,
      y: topY + h / 2 + (bbox.height || 11) * 0.32,
    });
    text.toFront();
  };

  addPill("Actuals", "leftOfLine");
  addPill("Projected", "rightOfLine");

  c._cfActualsProjG = g;
}

/** Call after raising plot lines so pills stay above the vertical split line. */
export function bringCashflowActualsProjectedLabelsToFront(
  chart: Highcharts.Chart
): void {
  (chart as ChartWithActualsProjectedGroup)._cfActualsProjG?.toFront();
}

const THRESHOLD_PILL_PLOT_INSET = 8;

/**
 * Plan chart: horizontal threshold label using the same pill treatment as Actuals / Projected.
 */
export function syncCashflowThresholdPillLabel(
  chart: Highcharts.Chart,
  options: { value: number; text: string }
): void {
  const c = chart as ChartWithActualsProjectedGroup;
  c._cfThresholdPillG?.destroy();
  c._cfThresholdPillG = undefined;

  const yAxis = chart.yAxis[0];
  const yPx = yAxis.toPixels(options.value, false);
  if (!Number.isFinite(yPx)) return;

  const g = chart.renderer.g().add();

  const text = chart.renderer
    .text(options.text, 0, 0)
    .css({
      color: colors.textLight,
      fontSize: "11px",
      fontFamily: NATIONAL_FONT_STACK,
    })
    .add(g);

  const bbox = text.getBBox();
  const w = bbox.width + PILL_PAD_X * 2;
  const h = Math.max(bbox.height + PILL_PAD_Y * 2, 16);
  const pillR = Math.min(h / 2, w / 2);

  const left =
    chart.plotLeft +
    chart.plotWidth -
    w -
    THRESHOLD_PILL_PLOT_INSET;
  const topY = yPx - h / 2;

  chart.renderer
    .rect(left, topY, w, h, pillR, pillR)
    .attr({ fill: PILL_BG })
    .add(g);

  text.attr({
    x: left + PILL_PAD_X,
    y: topY + h / 2 + (bbox.height || 11) * 0.32,
  });
  text.toFront();

  c._cfThresholdPillG = g;
}

export function bringCashflowThresholdPillLabelToFront(
  chart: Highcharts.Chart
): void {
  (chart as ChartWithActualsProjectedGroup)._cfThresholdPillG?.toFront();
}
