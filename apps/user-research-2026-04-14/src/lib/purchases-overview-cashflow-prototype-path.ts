/** Base path for the cashflow-actions Purchases overview shell mounted under the hub. */
export const PURCHASES_OVERVIEW_CASHFLOW_PROTOTYPE_BASE_PATH =
  "/purchases-overview/prototype/2";

/** Base path for the duplicate of the cashflow-actions Purchases overview shell. */
export const PURCHASES_OVERVIEW_CASHFLOW_PROTOTYPE_V3_BASE_PATH =
  "/purchases-overview/prototype/3";

/** Iteration 4: orange-only Protect + “Available cash” chart title. */
export const PURCHASES_OVERVIEW_CASHFLOW_PROTOTYPE_V4_BASE_PATH =
  "/purchases-overview/prototype/4";

/** Default query for iteration 5 — Apply plan → JAX + Melio (opt out with `?scenario=in-product`). */
export const PURCHASES_OVERVIEW_SCENARIO_DIYA_QUERY = "?scenario=diya-demo";

/** Canonical Purchases overview URL for research / Diya demo. */
export const PURCHASES_OVERVIEW_V4_DIYA_DEFAULT_HREF = `${PURCHASES_OVERVIEW_CASHFLOW_PROTOTYPE_V4_BASE_PATH}${PURCHASES_OVERVIEW_SCENARIO_DIYA_QUERY}`;
