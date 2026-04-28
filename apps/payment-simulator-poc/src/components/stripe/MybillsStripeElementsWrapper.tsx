"use client";

/**
 * Ported from mybills `StripeElementsWrapper.tsx`, adapted for Next.js:
 * - publishable key from `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
 * - `clientSecret` from our `/api/create-payment-intent` route (mybills uses
 *   deferred `mode` + `amount` against their BFF instead).
 *
 * @see https://github.com/xero-internal/mybills/blob/main/project/spa/src/components/StripeCheckout/StripeElementsWrapper.tsx
 */

import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementLocale } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import * as React from "react";

/**
 * Without this, Stripe.js may POST to `https://r.stripe.com/b` (fraud telemetry). That fetch
 * can throw in dev (blocked network, headless, strict CSP) and surfaces as an uncaught runtime
 * error in the page / Next overlay — checkout still works, but the tab looks broken.
 * @see https://github.com/stripe/react-stripe-js/issues/587
 */
try {
  loadStripe.setLoadParameters({ advancedFraudSignals: false });
} catch {
  /* Hot reload / duplicate init: Stripe may already have loaded with these params. */
}

/** Avoid passing an unknown locale string into Elements (can throw IntegrationError). */
function normalizeStripeElementsLocale(
  locale: string | undefined,
): StripeElementLocale {
  const allowed: readonly StripeElementLocale[] = [
    "en",
    "en-GB",
    "en-AU",
    "en-NZ",
    "en-CA",
  ];
  const l = locale?.trim();
  if (l && (allowed as readonly string[]).includes(l)) {
    return l as StripeElementLocale;
  }
  return "auto";
}

export function MybillsStripeElementsWrapper({
  publishableKey,
  clientSecret,
  stripeConnectedAccountId,
  hideValidationErrors = false,
  locale = "en-GB",
  children,
}: {
  publishableKey: string;
  clientSecret: string;
  stripeConnectedAccountId?: string;
  /** When true: hide all validation errors (variables + rules). */
  hideValidationErrors?: boolean;
  /** Stripe locale - "Postal code" (en-GB) vs "Zip code" (en) */
  locale?: string;
  children: React.ReactNode;
}) {
  const stripePromise = React.useMemo(
    () =>
      loadStripe(
        publishableKey,
        stripeConnectedAccountId
          ? { stripeAccount: stripeConnectedAccountId }
          : undefined,
      ),
    [publishableKey, stripeConnectedAccountId],
  );

  /** Stable reference — new objects each render make Stripe Elements re-init (feels like a reload loop). */
  const stripeLocale = React.useMemo(
    () => normalizeStripeElementsLocale(locale),
    [locale],
  );

  const elementsOptions = React.useMemo(
    () => ({
      clientSecret,
      locale: stripeLocale,
      loader: "always" as const,
      appearance: {
        variables: {
          borderRadius: "4px",
          ...(hideValidationErrors && {
            colorDanger: "#ffffff",
            colorDangerText: "#ffffff",
            iconCardErrorColor: "#ffffff",
            iconCardCvcErrorColor: "#ffffff",
          }),
        },
        ...(hideValidationErrors && {
          rules: {
            ".Error": {
              fontSize: "0",
              color: "transparent",
              marginTop: "0",
              marginBottom: "0",
              paddingTop: "0",
              paddingBottom: "0",
              minHeight: "0",
              lineHeight: "0",
            },
            ".Input--invalid": {
              boxShadow: "none",
              borderColor: "var(--colorText)",
            },
            ".Label--invalid": {
              color: "var(--colorText)",
            },
          },
        }),
      },
    }),
    [clientSecret, stripeLocale, hideValidationErrors],
  );

  return (
    <Elements
      key={`${clientSecret}-${stripeLocale}`}
      options={elementsOptions}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}
