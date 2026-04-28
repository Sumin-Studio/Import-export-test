/** Must match DraggableGrid ResponsiveReactGridLayout rowHeight + margin[1]. */
export const GRID_ROW_HEIGHT = 251;
export const GRID_MARGIN_Y = 20;

/**
 * Convert a target content height (px) to react-grid-layout row count `h`.
 * Formula: h * rowHeight + (h - 1) * marginY >= heightPx
 */
export function pixelsToGridUnits(heightPx: number): number {
  if (heightPx <= 0) return 1;
  return Math.ceil(
    (heightPx + GRID_MARGIN_Y) / (GRID_ROW_HEIGHT + GRID_MARGIN_Y)
  );
}
