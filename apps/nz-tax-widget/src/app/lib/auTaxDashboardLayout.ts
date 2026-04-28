import type { Layouts } from "react-grid-layout";

/** Default AU tax-only tiles (see {@link AU_TAX_ONLY_BETA_ORDER}). */
export const AU_TAX_ONLY_LAYOUT_WIDGET_IDS = [
  "tax-alerts-compact",
  "returns-by-status",
  "activity-statements",
  "lodgements",
] as const;

const AU_TAX_ONLY_ID_SET = new Set<string>(AU_TAX_ONLY_LAYOUT_WIDGET_IDS);

/**
 * True when the visible tax-only set is exactly the four default AU tiles, so we can apply
 * the canonical dashboard layout (left stack, income tax centre, activity statements right).
 */
export function isAuTaxOnlyDefaultFourTileSet(visibleIds: Set<string>): boolean {
  if (visibleIds.size !== AU_TAX_ONLY_ID_SET.size) return false;
  for (const id of AU_TAX_ONLY_ID_SET) {
    if (!visibleIds.has(id)) return false;
  }
  return true;
}

/**
 * react-grid-layout presets: rowHeight 251; h=2 ⇒ 522px tall tiles.
 * md (4 cols): left stack | income tax (1×2) | activity (2×2)
 * sm (3 cols): same topology; activity 1×2 in column 3
 * xs (2 cols): C/R top row; filed under alerts; activity full width below
 * xxs: single column stack
 */
export const AU_TAX_ONLY_PRESET_LAYOUTS: Layouts = {
  md: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 1 },
    { i: "returns-by-status", x: 1, y: 0, w: 1, h: 2 },
    { i: "activity-statements", x: 2, y: 0, w: 2, h: 2 },
    { i: "lodgements", x: 0, y: 1, w: 1, h: 1 },
  ],
  sm: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 1 },
    { i: "returns-by-status", x: 1, y: 0, w: 1, h: 2 },
    { i: "activity-statements", x: 2, y: 0, w: 1, h: 2 },
    { i: "lodgements", x: 0, y: 1, w: 1, h: 1 },
  ],
  xs: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 1 },
    { i: "returns-by-status", x: 1, y: 0, w: 1, h: 2 },
    { i: "lodgements", x: 0, y: 1, w: 1, h: 1 },
    { i: "activity-statements", x: 0, y: 2, w: 2, h: 2 },
  ],
  xxs: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 1 },
    { i: "returns-by-status", x: 0, y: 1, w: 1, h: 2 },
    { i: "lodgements", x: 0, y: 3, w: 1, h: 1 },
    { i: "activity-statements", x: 0, y: 4, w: 1, h: 2 },
  ],
};

/**
 * Same topology as {@link AU_TAX_ONLY_PRESET_LAYOUTS} but `tax-alerts-compact` is h=2 (522px)
 * in Agentic so the Actions tile matches other full-height widgets without grid overlap.
 */
export const AU_TAX_ONLY_PRESET_LAYOUTS_AGENTIC: Layouts = {
  md: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 2 },
    { i: "returns-by-status", x: 1, y: 0, w: 1, h: 2 },
    { i: "activity-statements", x: 2, y: 0, w: 2, h: 2 },
    { i: "lodgements", x: 0, y: 2, w: 1, h: 1 },
  ],
  sm: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 2 },
    { i: "returns-by-status", x: 1, y: 0, w: 1, h: 2 },
    { i: "activity-statements", x: 2, y: 0, w: 1, h: 2 },
    { i: "lodgements", x: 0, y: 2, w: 1, h: 1 },
  ],
  xs: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 2 },
    { i: "returns-by-status", x: 1, y: 0, w: 1, h: 2 },
    { i: "lodgements", x: 0, y: 2, w: 1, h: 1 },
    { i: "activity-statements", x: 0, y: 3, w: 2, h: 2 },
  ],
  xxs: [
    { i: "tax-alerts-compact", x: 0, y: 0, w: 1, h: 2 },
    { i: "returns-by-status", x: 0, y: 2, w: 1, h: 2 },
    { i: "lodgements", x: 0, y: 4, w: 1, h: 1 },
    { i: "activity-statements", x: 0, y: 5, w: 1, h: 2 },
  ],
};
