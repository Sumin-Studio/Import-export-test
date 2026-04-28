import { CASHFLOW_SHORTFALL_SPOTLIGHT_CONTENT } from "./cashflowShortfallSpotlightCopy";

/** Config keys that show the Spotlight-style summary before “Make a plan”. */
export type CashflowActionPlanSpotlightKey =
  | "cashflow-low"
  | "cashflow-shortfall"
  | "cashflow-critical";

export const CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW: Record<
  CashflowActionPlanSpotlightKey,
  { title: string; body: string }
> = {
  "cashflow-low": {
    title: "Cash flow running low next week",
    body: "Based on cash flow projections, you will only have 8 days of cash on hand starting next week. Let's make a plan that smooths out your cash flow.",
  },
  "cashflow-shortfall": { ...CASHFLOW_SHORTFALL_SPOTLIGHT_CONTENT },
  "cashflow-critical": {
    title: "Critical cash flow shortage next week",
    body: "You have a mandatory tax payment due next week but insufficient funds to cover. Let's make a plan to avoid immediate penalties.",
  },
};

export function getCashflowActionPlanSpotlightPreview(
  key: string
): { title: string; body: string } | null {
  if (key in CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW) {
    return CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW[key as CashflowActionPlanSpotlightKey];
  }
  return null;
}

/** Shorter copy for the bank widget “Bills awaiting payment” accordion (sparkle + Make a plan). */
const CASHFLOW_ACCORDION_INSIGHT_BODY: Record<CashflowActionPlanSpotlightKey, string> = {
  "cashflow-low":
    "About 8 days of cash on hand next week — a quick plan can smooth the dip.",
  "cashflow-shortfall":
    "Projected below $0 around mid-month — shifting payment dates can avoid overdraft.",
  "cashflow-critical":
    "Tax due next week without enough cash — plan now to reduce penalty risk.",
};

export function getCashflowAccordionInsightBody(key: string): string | null {
  if (key in CASHFLOW_ACCORDION_INSIGHT_BODY) {
    return CASHFLOW_ACCORDION_INSIGHT_BODY[key as CashflowActionPlanSpotlightKey];
  }
  return null;
}
