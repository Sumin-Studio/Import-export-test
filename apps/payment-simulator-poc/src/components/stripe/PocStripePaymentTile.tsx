"use client";

/**
 * Shell around mybills-style Elements + checkout form: loads a PaymentIntent
 * from this app’s API (stand-in for mybills BFF) then renders Stripe Elements.
 */

import * as React from "react";

import XUIBanner, { XUIBannerMessage } from "@xero/xui/react/banner";

import { isStripePayDemoOnly } from "@/lib/stripePayDemoOnly";

import { MybillsStripeElementsWrapper } from "./MybillsStripeElementsWrapper";
import { PocStripeCheckoutForm } from "./PocStripeCheckoutForm";

export interface PocStripePaymentTileProps {
  /** Minor units, e.g. 10000 = 100.00 GBP */
  amountMinor: number;
  currency: string;
  orgName: string;
  contactEmail?: string;
  payButtonLabel: string;
  /** Stripe Elements locale - "Postal code" (en-GB) vs "Zip code" (en) */
  locale?: string;
  /** ISO 3166-1 alpha-2 country for billing address default */
  defaultCountry?: string;
  /** When false: hide wallet express UI and the Or divider (matches customise panel). */
  showExpressCheckout?: boolean;
  /** When false: PaymentIntent omits `card` so the card option does not appear in Payment Element. */
  showCardPayment?: boolean;
  /** Stripe bank rails when Card is off (must match customise panel). */
  payByBankEnabled?: boolean;
  directDebitEnabled?: boolean;
  klarnaEnabled?: boolean;
}

export function PocStripePaymentTile({
  amountMinor,
  currency,
  orgName,
  contactEmail,
  payButtonLabel,
  locale = "en-GB",
  defaultCountry = "GB",
  showExpressCheckout = true,
  showCardPayment = true,
  payByBankEnabled = true,
  directDebitEnabled = true,
  klarnaEnabled = true,
}: PocStripePaymentTileProps) {
  const payDemoOnly = isStripePayDemoOnly();
  // Always hide Stripe validation errors (user requested no errors on entry)
  const hideValidationErrors = true;
  const publishableKey =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";
  /** Must match the connected account used in `POST /api/create-payment-intent`. */
  const connectedAccountId =
    process.env.NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID?.trim() || undefined;

  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!publishableKey) {
      setLoading(false);
      setLoadError("Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local.");
      return;
    }

    setLoadError(null);
    setClientSecret(null);
    setLoading(true);

    let cancelled = false;
    (async () => {
      try {
        // Same-origin relative URL so dev works on any port (NEXT_PUBLIC_APP_URL often
        // points at :3000 while `next dev -p 3002` is used, which would break absolute fetches).
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountMinor,
            currency,
            enableCard: showCardPayment,
            payByBank: payByBankEnabled,
            directDebit: directDebitEnabled,
            klarna: klarnaEnabled,
          }),
        });
        const data = (await res.json()) as {
          clientSecret?: string;
          error?: string;
        };
        if (!res.ok) {
          throw new Error(data.error ?? `HTTP ${res.status}`);
        }
        if (!data.clientSecret) {
          throw new Error("No client secret returned");
        }
        if (!cancelled) {
          setClientSecret(data.clientSecret);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "Could not start checkout.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    amountMinor,
    currency,
    publishableKey,
    showCardPayment,
    payByBankEnabled,
    directDebitEnabled,
    klarnaEnabled,
  ]);

  if (!publishableKey || loadError) {
    return (
      <XUIBanner sentiment="neutral">
        <XUIBannerMessage>
          {loadError ??
            "Stripe is not configured. Copy `.env.example` to `.env.local` and add your test keys."}
        </XUIBannerMessage>
      </XUIBanner>
    );
  }

  if (loading || !clientSecret) {
    return (
      <p className="xui-text-deemphasis xui-padding-vertical-large">
        {loading ? "Preparing secure checkout…" : "Could not initialize checkout."}
      </p>
    );
  }

  return (
    <MybillsStripeElementsWrapper
      clientSecret={clientSecret}
      publishableKey={publishableKey}
      stripeConnectedAccountId={connectedAccountId}
      hideValidationErrors={hideValidationErrors}
      locale={locale}
    >
      <PocStripeCheckoutForm
        contactEmail={contactEmail}
        orgName={orgName}
        payButtonLabel={payButtonLabel}
        payDemoOnly={payDemoOnly}
        defaultCountry={defaultCountry}
        showExpressCheckout={showExpressCheckout}
        showCardPayment={showCardPayment}
      />
    </MybillsStripeElementsWrapper>
  );
}
