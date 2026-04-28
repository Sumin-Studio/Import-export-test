/**
 * Stable `data-testid` for the New Invoice **A2A banner** (Pay by Bank gradient promo).
 * Import this in e2e/tests and docs instead of hard-coding the string.
 *
 * The live region also uses {@link A2A_BANNER_ARIA_LABEL} as `aria-label`.
 */
export const A2A_BANNER_TEST_ID = "a2a-banner" as const;

/** When false, the New Invoice A2A gradient promo is not shown (initial `bannerVisible` state). */
export const SHOW_A2A_BANNER = false;

/** Accessible name for the A2A banner region (matches visible promo headline). */
export const A2A_BANNER_ARIA_LABEL =
  "Pay by Bank promotion: get paid faster with secure bank transfers, free during beta" as const;
