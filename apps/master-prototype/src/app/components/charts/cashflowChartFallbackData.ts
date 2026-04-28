/**
 * Shared prototype bank-balance shapes (30 days, matches the action-plan date window).
 * Early indices stay above the $2k plan threshold and above $0; dips play out in the dashed
 * “Projected” segment after the actuals/projected split (~day 6).
 */

/** Standard lens: crosses below $2k then below $0 mid-projection, then recovers. */
export const CASHFLOW_FALLBACK_BANK_BALANCE_STANDARD: readonly number[] = [
  3600, 3300, 3050, 2800, 2550, 2200,
  2050, 1750, 1200, 450, -120, -380, -520, -480, -320, -80,
  250, 750, 1250, 1750, 2150, 2480, 2750, 2980, 3120, 3220,
  3300, 3360, 3400, 3430,
];

/** Conservative lens: stays weak after the dip — no full recovery in the window. */
export const CASHFLOW_FALLBACK_BANK_BALANCE_CONSERVATIVE: readonly number[] = [
  3800, 3450, 3100, 2750, 2400, 2150,
  1800, 1200, 450, -80, -420, -620, -780, -880, -940, -980,
  -1000, -1020, -1040, -1060, -1080, -1100, -1120, -1140, -1160, -1180,
  -1200, -1220, -1240, -1260,
];
