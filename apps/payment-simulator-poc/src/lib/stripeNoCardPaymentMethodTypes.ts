/**
 * PaymentIntent `payment_method_types` for the POC — driven by customise-panel toggles.
 * When Card is on, `card` + `link` are included (Stripe Payment Element / Link rules).
 *
 * @see https://stripe.com/docs/api/payment_intents/create#create_payment_intent-payment_method_types
 */

export interface PaymentIntentMethodToggles {
  enableCard: boolean;
  payByBank: boolean;
  directDebit: boolean;
  klarna: boolean;
}

const defaultToggles: PaymentIntentMethodToggles = {
  enableCard: true,
  payByBank: true,
  directDebit: true,
  klarna: true,
};

function mergeToggles(
  partial: Partial<PaymentIntentMethodToggles>,
): PaymentIntentMethodToggles {
  return {
    enableCard: partial.enableCard !== false,
    payByBank:
      typeof partial.payByBank === "boolean"
        ? partial.payByBank
        : defaultToggles.payByBank,
    directDebit:
      typeof partial.directDebit === "boolean"
        ? partial.directDebit
        : defaultToggles.directDebit,
    klarna:
      typeof partial.klarna === "boolean" ? partial.klarna : defaultToggles.klarna,
  };
}

/**
 * Build `payment_method_types` for a PaymentIntent from currency + panel toggles.
 * Always returns an explicit list (no `automatic_payment_methods`) so toggles match checkout.
 */
export function paymentMethodTypesForPaymentIntent(
  currencyLower: string,
  partial: Partial<PaymentIntentMethodToggles> = {},
): string[] {
  const t = mergeToggles(partial);
  const c = currencyLower.toLowerCase();
  const types: string[] = [];

  if (t.enableCard) {
    types.push("card", "link");
  }

  switch (c) {
    case "gbp":
      if (t.payByBank) types.push("pay_by_bank");
      if (t.directDebit) types.push("bacs_debit");
      if (t.klarna) types.push("klarna");
      break;
    case "usd":
      if (t.payByBank || t.directDebit) types.push("us_bank_account");
      if (t.klarna) types.push("klarna");
      break;
    case "eur":
      if (t.payByBank) types.push("pay_by_bank");
      if (t.directDebit) types.push("sepa_debit");
      if (t.klarna) types.push("klarna");
      break;
    case "aud":
      if (t.payByBank || t.directDebit) types.push("au_becs_debit");
      if (t.klarna) types.push("klarna");
      break;
    case "cad":
      if (t.payByBank || t.directDebit) types.push("acss_debit");
      if (t.klarna) types.push("klarna");
      break;
    case "nzd":
      if (t.klarna || t.payByBank || t.directDebit) types.push("klarna");
      break;
    case "zar":
      if (t.payByBank || t.directDebit) types.push("paypal");
      if (t.klarna) types.push("klarna");
      break;
    default:
      if (t.payByBank) types.push("pay_by_bank");
      if (t.directDebit) types.push("bacs_debit");
      if (t.klarna) types.push("klarna");
  }

  const unique = [...new Set(types)];
  if (unique.length > 0) {
    return unique;
  }

  if (t.enableCard) {
    return ["card", "link"];
  }

  /** Card off with everything off — still need valid types for the PI. */
  switch (c) {
    case "usd":
      return ["us_bank_account"];
    case "eur":
      return ["sepa_debit"];
    case "aud":
      return ["au_becs_debit"];
    case "cad":
      return ["acss_debit"];
    case "nzd":
      return ["klarna"];
    case "zar":
      return ["paypal"];
    default:
      return ["pay_by_bank", "bacs_debit"];
  }
}

/** @deprecated Use {@link paymentMethodTypesForPaymentIntent} with `enableCard: false`. */
export interface NonCardBankRailOptions {
  payByBank: boolean;
  directDebit: boolean;
}

/** @deprecated Use {@link paymentMethodTypesForPaymentIntent} with `enableCard: false` + `klarna`. */
export function paymentMethodTypesWithoutCardOrLink(
  currencyLower: string,
  rails: NonCardBankRailOptions,
  klarna = true,
): string[] {
  return paymentMethodTypesForPaymentIntent(currencyLower, {
    enableCard: false,
    payByBank: rails.payByBank,
    directDebit: rails.directDebit,
    klarna,
  });
}
