/**
 * Regional configuration for the checkout preview.
 * Maps region selection to currency, date format, Stripe settings, and payment method availability.
 */

/** Payment options shape - must match PreviewSettingsContext.PaymentOptions */
export interface RegionPaymentOptions {
  card: boolean;
  applePay: boolean;
  googlePay: boolean;
  payByBank: boolean;
  klarna: boolean;
  directDebit: boolean;
}

export type RegionKey =
  | "United Kingdom"
  | "United States"
  | "Australia"
  | "New Zealand"
  | "Canada"
  | "South Africa";

export interface RegionConfig {
  /** Display currency code (e.g. GBP, USD) */
  currency: string;
  /** Stripe currency code (lowercase, e.g. gbp, usd) */
  currencyStripe: string;
  /** Locale for date formatting - DD/MM/YYYY (en-GB) vs MM/DD/YYYY (en-US) */
  dateLocale: string;
  /** Stripe Elements locale - controls "Postal code" vs "Zip code" */
  stripeLocale: string;
  /** ISO 3166-1 alpha-2 country code for Stripe billing defaults */
  stripeCountry: string;
  /** Default payment options when this region is selected */
  defaultPaymentOptions: RegionPaymentOptions;
  /** Payment methods available in this region (others are hidden/disabled) */
  availablePaymentMethods: Set<keyof RegionPaymentOptions>;
}

export const REGION_CONFIGS: Record<RegionKey, RegionConfig> = {
  "United Kingdom": {
    currency: "GBP",
    currencyStripe: "gbp",
    dateLocale: "en-GB",
    stripeLocale: "en-GB",
    stripeCountry: "GB",
    defaultPaymentOptions: {
      card: true,
      applePay: true,
      googlePay: true,
      payByBank: true,
      klarna: true,
      directDebit: true,
    },
    availablePaymentMethods: new Set([
      "card",
      "applePay",
      "googlePay",
      "payByBank",
      "klarna",
      "directDebit",
    ]),
  },
  "United States": {
    currency: "USD",
    currencyStripe: "usd",
    dateLocale: "en-US",
    stripeLocale: "en",
    stripeCountry: "US",
    defaultPaymentOptions: {
      card: true,
      applePay: true,
      googlePay: true,
      payByBank: false,
      klarna: true,
      directDebit: false,
    },
    availablePaymentMethods: new Set([
      "card",
      "applePay",
      "googlePay",
      "klarna",
    ]),
  },
  Australia: {
    currency: "AUD",
    currencyStripe: "aud",
    dateLocale: "en-AU",
    stripeLocale: "en-AU",
    stripeCountry: "AU",
    defaultPaymentOptions: {
      card: true,
      applePay: true,
      googlePay: true,
      payByBank: true,
      klarna: true,
      directDebit: true,
    },
    availablePaymentMethods: new Set([
      "card",
      "applePay",
      "googlePay",
      "payByBank",
      "klarna",
      "directDebit",
    ]),
  },
  "New Zealand": {
    currency: "NZD",
    currencyStripe: "nzd",
    dateLocale: "en-NZ",
    stripeLocale: "en-NZ",
    stripeCountry: "NZ",
    defaultPaymentOptions: {
      card: true,
      applePay: true,
      googlePay: true,
      payByBank: false,
      klarna: true,
      directDebit: true,
    },
    availablePaymentMethods: new Set([
      "card",
      "applePay",
      "googlePay",
      "klarna",
      "directDebit",
    ]),
  },
  Canada: {
    currency: "CAD",
    currencyStripe: "cad",
    dateLocale: "en-CA",
    stripeLocale: "en-CA",
    stripeCountry: "CA",
    defaultPaymentOptions: {
      card: true,
      applePay: true,
      googlePay: true,
      payByBank: true,
      klarna: true,
      directDebit: true,
    },
    availablePaymentMethods: new Set([
      "card",
      "applePay",
      "googlePay",
      "payByBank",
      "klarna",
      "directDebit",
    ]),
  },
  "South Africa": {
    currency: "ZAR",
    currencyStripe: "zar",
    dateLocale: "en-ZA",
    stripeLocale: "en-ZA",
    stripeCountry: "ZA",
    defaultPaymentOptions: {
      card: true,
      applePay: true,
      googlePay: true,
      payByBank: false,
      klarna: true,
      directDebit: false,
    },
    availablePaymentMethods: new Set([
      "card",
      "applePay",
      "googlePay",
      "klarna",
    ]),
  },
};

export function getRegionConfig(region: string | undefined | null): RegionConfig {
  if (!region || typeof region !== "string") {
    return REGION_CONFIGS["United Kingdom"];
  }
  const key = region as RegionKey;
  return REGION_CONFIGS[key] ?? REGION_CONFIGS["United Kingdom"];
}

/** Whether a payment method is available in the given region */
export function isPaymentMethodAvailableInRegion(
  method: keyof RegionPaymentOptions,
  region: string
): boolean {
  const config = getRegionConfig(region);
  return config.availablePaymentMethods.has(method);
}
