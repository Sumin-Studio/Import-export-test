/**
 * Iteration 5 / Diya demo: after **Apply plan**, open JAX with a Melio US bill-pay prep embed.
 *
 * **Default:** Melio handoff is **on** (matches research default). Opt out with `?scenario=in-product`
 * for sessions that should keep Apply plan in-product only (toast, no JAX/Melio).
 *
 * Real Melio deep-linking and multi-bill orchestration are out of scope for this prototype; see weekly-update doc.
 */

import type { PurchasesActionPlanConfigKey } from "@/app/contexts/PurchasesPrototypeScenarioContext";
import type { JaxChatMessage } from "@/app/contexts/JaxChatContext";

/** Query param for scenario switcher. */
export const SCENARIO_QUERY_PARAM = "scenario";
/** Explicit Diya / iteration 5 label (included on default PO links). */
export const SCENARIO_VALUE_DIYA_DEMO = "diya-demo";
/** Disables JAX + Melio after Apply plan (legacy in-product behaviour only). */
export const SCENARIO_VALUE_IN_PRODUCT_ONLY = "in-product";

/** @deprecated Use {@link isApplyPlanMelioHandoffEnabled} — same behaviour. */
export const DIYA_DEMO_SCENARIO_PARAM = SCENARIO_QUERY_PARAM;
/** @deprecated Use {@link SCENARIO_VALUE_DIYA_DEMO} */
export const DIYA_DEMO_SCENARIO_VALUE = SCENARIO_VALUE_DIYA_DEMO;

/**
 * Whether **Apply plan** should open JAX + Melio prep. True unless `scenario=in-product`.
 */
export function isApplyPlanMelioHandoffEnabled(
  searchParams: Pick<URLSearchParams, "get"> | null
): boolean {
  if (!searchParams) return true;
  return searchParams.get(SCENARIO_QUERY_PARAM) !== SCENARIO_VALUE_IN_PRODUCT_ONLY;
}

/** Alias for older call sites. */
export function isDiyaDemoScenario(
  searchParams: Pick<URLSearchParams, "get"> | null
): boolean {
  return isApplyPlanMelioHandoffEnabled(searchParams);
}

/** JAX {@link JaxPanel} sub-panel ids for cashflow threads. */
export type CashflowJaxSubPanel =
  | "cashflow"
  | "cashflow-shortfall"
  | "cashflow-critical";

export type CashflowMelioHandoffPayload = {
  jaxEntry: string;
  jaxSubPanel: CashflowJaxSubPanel;
  assistantText: string;
  embed: Extract<
    NonNullable<JaxChatMessage["embed"]>,
    { type: "make_payment_checkout" }
  >;
};

const US_MELIO_INTRO =
  "Opening **Melio** to prepare this US bill payment from your plan. Review amount and delivery, then confirm when ready — this step is powered by our bill pay partner (prototype).";

/**
 * Map purchases bank-balance config to the JAX thread used for cashflow chat + Melio embed.
 */
export function jaxSubPanelForPlanConfig(
  key: PurchasesActionPlanConfigKey
): CashflowJaxSubPanel | null {
  switch (key) {
    case "cashflow-chart-only":
      return null;
    case "cashflow-low":
      return "cashflow";
    case "cashflow-shortfall":
      return "cashflow-shortfall";
    case "cashflow-critical":
      return "cashflow-critical";
    default:
      return null;
  }
}

function melioPayloadForPlanKey(
  key: PurchasesActionPlanConfigKey
): Omit<CashflowMelioHandoffPayload, "jaxEntry" | "jaxSubPanel"> | null {
  const sub = jaxSubPanelForPlanConfig(key);
  if (!sub) return null;

  switch (key) {
    case "cashflow-low":
      return {
        assistantText: US_MELIO_INTRO,
        embed: {
          type: "make_payment_checkout",
          supplierName: "Acme Supplies",
          amountDisplay: "800.00",
          currencyCode: "USD",
        },
      };
    case "cashflow-shortfall":
      return {
        assistantText: US_MELIO_INTRO,
        embed: {
          type: "make_payment_checkout",
          supplierName: "Acme Supplies",
          amountDisplay: "1,450.00",
          currencyCode: "USD",
        },
      };
    case "cashflow-critical":
      return {
        assistantText:
          "To cover the gap, here’s **Melio** prep for a priority payment on your plan (US bill pay prototype). Full line-of-credit options remain separate.",
        embed: {
          type: "make_payment_checkout",
          supplierName: "Inland Revenue — GST",
          amountDisplay: "18,400.00",
          currencyCode: "USD",
        },
      };
    default:
      return null;
  }
}

/**
 * Build handoff payload for purchases overview, Spotlight, or Action plan modal (same config keys).
 */
export function getMelioHandoffForPlanKey(
  key: PurchasesActionPlanConfigKey
): CashflowMelioHandoffPayload | null {
  const sub = jaxSubPanelForPlanConfig(key);
  const rest = melioPayloadForPlanKey(key);
  if (!sub || !rest) return null;
  return {
    jaxEntry: sub,
    jaxSubPanel: sub,
    ...rest,
  };
}

/**
 * Seed JAX thread and open panel: clear thread, append Apply plan + assistant Melio message, then caller opens JAX.
 */
export function seedJaxThreadForMelioHandoff(
  payload: CashflowMelioHandoffPayload,
  deps: {
    clearThread: (entry: string) => void;
    appendMessage: (entry: string, message: JaxChatMessage) => void;
  }
): void {
  deps.clearThread(payload.jaxEntry);
  deps.appendMessage(payload.jaxEntry, {
    role: "user",
    content: "Apply plan",
  });
  deps.appendMessage(payload.jaxEntry, {
    role: "assistant",
    content: payload.assistantText,
    embed: payload.embed,
  });
}
