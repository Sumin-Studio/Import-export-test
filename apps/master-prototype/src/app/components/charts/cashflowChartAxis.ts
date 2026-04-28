import { DATE_LABELS } from "@/app/components/widgets/actionPlanModalConfigs";

/** Calendar year shown in cash flow chart tooltips (prototype timeline). */
const CASHFLOW_TOOLTIP_YEAR = 2026;

/**
 * Day index on the chart (0 = first point) → tooltip title like `8 Mar 2026`.
 * Clamped to {@link DATE_LABELS} length.
 */
export function formatCashflowTooltipDateFromIndex(dayIndex: number): string {
  const labels = DATE_LABELS as readonly string[];
  if (labels.length === 0) return "";
  const raw = Number.isFinite(dayIndex) ? Math.floor(dayIndex) : 0;
  const i = Math.max(0, Math.min(raw, labels.length - 1));
  const monthDay = labels[i];
  const m = monthDay.trim().match(/^(\w+)\s+(\d+)$/);
  if (!m) return `${monthDay} ${CASHFLOW_TOOLTIP_YEAR}`;
  return `${Number(m[2])} ${m[1]} ${CASHFLOW_TOOLTIP_YEAR}`;
}

/**
 * Resolves the category index for Highcharts tooltips (`shared` or single-point).
 * Falls back to matching `category` against `categoryStrings` when `x` is not numeric.
 */
export function cashflowTooltipDayIndexFromContext(
  ctx: unknown,
  categoryStrings: readonly string[]
): number {
  const c = ctx as {
    x?: string | number;
    points?: Array<{ x?: string | number; category?: string | number }>;
    point?: { x?: string | number; category?: string | number };
  };

  const numericIndex = (v: unknown): number | undefined => {
    if (typeof v === "number" && Number.isFinite(v)) return Math.floor(v);
    return undefined;
  };

  const indexFromCategory = (cat: unknown): number | undefined => {
    if (typeof cat !== "string") return undefined;
    const j = categoryStrings.indexOf(cat);
    return j >= 0 ? j : undefined;
  };

  const fromPoint = (p?: {
    x?: string | number;
    category?: string | number;
  }): number | undefined => {
    if (!p) return undefined;
    return numericIndex(p.x) ?? indexFromCategory(p.category);
  };

  const pts = c.points;
  if (pts?.length) {
    for (const p of pts) {
      const idx = fromPoint(p);
      if (idx !== undefined) return idx;
    }
  }
  const single = fromPoint(c.point);
  if (single !== undefined) return single;
  const fromX = numericIndex(c.x);
  if (fromX !== undefined) return fromX;
  return 0;
}

/**
 * `Mar 8` (from {@link DATE_LABELS}) → `8 Mar` for a single-line x-axis / tooltip label.
 */
export function formatCashflowDayLabel(monthDay: string): string {
  const m = monthDay.trim().match(/^(\w+)\s+(\d+)$/);
  if (!m) return monthDay;
  return `${m[2]} ${m[1]}`;
}

/**
 * Four x-axis tick indices, ~8 days apart on a full 30-day projection; proportional for shorter ranges.
 */
export function cashflowChartXAxisTickPositions(count: number): number[] {
  const last = Math.max(0, count - 1);
  if (count <= 1) return [0];
  if (count <= 4) return Array.from({ length: count }, (_, i) => i);
  if (count >= 25) {
    return [0, 8, 16, 24].map((i) => Math.min(i, last));
  }
  const i1 = Math.round(last / 3);
  const i2 = Math.round((2 * last) / 3);
  return [0, i1, i2, last];
}

/**
 * X-axis category strings for cash flow charts: `8 Mar`, `9 Mar`, … (matches `DATE_LABELS` order).
 */
export function cashflowChartCategoriesFromDays(count: number): string[] {
  const labels = (DATE_LABELS as readonly string[]).slice(0, count);
  return labels.map((d) => formatCashflowDayLabel(d));
}

/** Full chart category list for the current `DATE_LABELS` length (e.g. 30 days). */
export const CASHFLOW_CHART_CATEGORIES = cashflowChartCategoriesFromDays(
  DATE_LABELS.length
);

/**
 * Category index for the actuals / projected divider (~5 days from series start).
 * Clamped when the series has fewer points.
 */
export function cashflowActualsProjectedSplitIndex(dayCount: number): number {
  if (dayCount <= 1) return 0;
  return Math.min(5, dayCount - 1);
}

/** Y-axis style like Money going out: `10k`, `20k`, `0` — no currency symbol. */
export function formatCashflowYAxisThousands(value: number): string {
  if (value === 0 || Object.is(value, -0)) return "0";
  return `${value / 1000}k`;
}
