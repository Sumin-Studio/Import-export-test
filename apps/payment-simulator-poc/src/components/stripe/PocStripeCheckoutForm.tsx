"use client";

/**
 * Checkout layout patterned on mybills `CheckoutForm.tsx` (Express → divider →
 * Link email when Card is on, XUI email when Card is off → Payment Element → Pay).
 *
 * @see https://github.com/xero-internal/mybills/blob/main/project/spa/src/components/StripeCheckout/CheckoutForm.tsx
 */

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type * as stripeJs from "@stripe/stripe-js";
import * as React from "react";

import XUIButton from "@xero/xui/react/button";
import XUIIcon from "@xero/xui/react/icon";
import XUITextInput from "@xero/xui/react/textinput";
import lock from "@xero/xui-icon/icons/lock";

import { ExpressCheckoutCycle } from "./ExpressCheckoutCycle";
import { PocStripeExpressCheckout } from "./PocStripeExpressCheckout";

import "./PocPaymentTile.scss";

export interface PocStripeCheckoutFormProps {
  orgName: string;
  contactEmail?: string;
  payButtonLabel: string;
  /** If true: run Elements validation only; never confirm payment (no charge). */
  payDemoOnly?: boolean;
  /** ISO 3166-1 alpha-2 country for billing address (Postal code vs Zip code) */
  defaultCountry?: string;
  /** When false: hide wallet express UI and the divider above card/Link (matches customise panel). */
  showExpressCheckout?: boolean;
  /** When false: hide card in Payment Element; XUI email is used instead of Link (matches customise panel). */
  showCardPayment?: boolean;
}

export function PocStripeCheckoutForm({
  orgName,
  contactEmail,
  payButtonLabel,
  payDemoOnly = false,
  defaultCountry = "GB",
  showExpressCheckout = true,
  showCardPayment = true,
}: PocStripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState(contactEmail ?? "");
  const [hasExpressMethods, setHasExpressMethods] = React.useState(false);

  React.useEffect(() => {
    if (contactEmail) setEmail(contactEmail);
  }, [contactEmail]);
  const [isPaymentElementLoaded, setIsPaymentElementLoaded] =
    React.useState(false);
  const [paymentElementError, setPaymentElementError] = React.useState<
    string | null
  >(null);
  const [, setIsExpressLoaded] = React.useState(false);
  const [, setHasDigitalWallets] = React.useState(false);

  const [isPaying, setIsPaying] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const returnUrl = React.useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}?payment=complete`;
  }, []);

  const confirmWithElements = React.useCallback(
    async (
      paymentFailed: stripeJs.StripeExpressCheckoutElementConfirmEvent["paymentFailed"],
      receiptEmail?: string,
    ) => {
      if (payDemoOnly) {
        paymentFailed({
          message:
            "Demo mode — Apple Pay / Google Pay is not processed on this screen.",
        });
        return;
      }

      if (!stripe || !elements) {
        paymentFailed({ message: "Payment form is still loading." });
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        paymentFailed({ message: submitError.message });
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
          ...(receiptEmail ? { receipt_email: receiptEmail } : {}),
        },
        redirect: "if_required",
      });

      if (error) {
        paymentFailed({ message: error.message });
      }
    },
    [elements, payDemoOnly, returnUrl, stripe],
  );

  const handleExpressConfirm = React.useCallback(
    async ({
      paymentFailed,
      billingDetails,
    }: stripeJs.StripeExpressCheckoutElementConfirmEvent) => {
      const addrEmail = billingDetails?.email;
      if (addrEmail) setEmail(addrEmail);
      await confirmWithElements(paymentFailed, addrEmail);
    },
    [confirmWithElements],
  );

  const handlePayClick = async () => {
    setFormError(null);
    if (!stripe || !elements) {
      setFormError("Payment form is still loading.");
      return;
    }

    if (!showCardPayment && !email.trim()) {
      setFormError("Enter your email address.");
      return;
    }

    setIsPaying(true);

    if (payDemoOnly) {
      // Skip elements.submit() so Stripe never validates or shows errors
      window.alert(
        "Demo only — no payment was sent.",
      );
      setIsPaying(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setFormError(submitError.message ?? "Could not validate payment details.");
      setIsPaying(false);
      return;
    }

    const trimmed = email.trim();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        ...(trimmed ? { receipt_email: trimmed } : {}),
      },
      redirect: "if_required",
    });
    if (error) {
      setFormError(error.message ?? "Payment failed.");
    }
    setIsPaying(false);
  };

  const renderDivider = () => (
    <div className="xui-row-flex xui-margin-top-large xui-margin-bottom-small express-checkout-divider-container">
      <div className="xui-u-flex-1">
        <hr className="divider" />
      </div>
      <div className="xui-text-align-center divider-text">
        <span>Or</span>
      </div>
      <div className="xui-u-flex-1">
        <hr className="divider" />
      </div>
    </div>
  );

  const handleLinkOnChange = ({
    value,
  }: stripeJs.StripeLinkAuthenticationElementChangeEvent) => {
    if (value?.email) setEmail(value.email);
  };

  const paymentElementOptions = React.useMemo(
    () => ({
      business: { name: orgName },
      defaultValues: {
        billingDetails: {
          email: contactEmail,
          name: "",
          phone: "",
          address: { country: defaultCountry },
        },
      },
      fields: {
        billingDetails: {
          email: "never" as const,
          name: "auto" as const,
        },
      },
      layout: "tabs" as const,
    }),
    [orgName, contactEmail, defaultCountry],
  );

  /** Wallets need a card-capable PaymentIntent; non-card-only intents throw if Express mounts. */
  const showExpressRow = showExpressCheckout && showCardPayment;

  return (
    <div className="pspoc-NewPaymentTile">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handlePayClick();
        }}
        tabIndex={-1}
      >
          {showExpressRow &&
            (payDemoOnly ? (
              <ExpressCheckoutCycle
                demoMessage="Demo only — Apple Pay / Google Pay is not processed on this screen."
              />
            ) : (
              <PocStripeExpressCheckout
                orgName={orgName}
                setHasDigitalWallets={setHasDigitalWallets}
                setHasExpressCheckoutPaymentMethods={setHasExpressMethods}
                setIsExpressCheckoutLoaded={setIsExpressLoaded}
                onConfirm={handleExpressConfirm}
              />
            ))}
          {showExpressRow && (payDemoOnly || hasExpressMethods)
            ? renderDivider()
            : null}

          {showCardPayment ? (
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={handleLinkOnChange}
            />
          ) : (
            <XUITextInput
              id="pspoc-checkout-email"
              isRequired
              label="Email address"
              size="small"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormError(null);
              }}
            />
          )}

          <div className="xui-margin-top" />

          <div
            className="payment-element-container"
            style={{ minHeight: 220 }}
          >
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
              onReady={() => {
                setIsPaymentElementLoaded(true);
                setPaymentElementError(null);
              }}
              onLoadError={(e) => {
                setPaymentElementError(
                  (e as { error?: { message?: string } })?.error?.message ??
                    "Payment form failed to load.",
                );
              }}
            />
          </div>

          {paymentElementError ? (
            <p className="xui-textcolor-negative xui-margin-top-small xui-text-minor">
              {paymentElementError}
            </p>
          ) : null}
          {formError ? (
            <p className="xui-textcolor-negative xui-margin-top-small xui-text-minor">
              {formError}
            </p>
          ) : null}

          <div className="xui-margin-top-large">
            <XUIButton
              fullWidth="always"
              isDisabled={!isPaymentElementLoaded || isPaying}
              isLoading={isPaying}
              loadingAriaLabel="Processing payment"
              type="submit"
              variant="main"
            >
              {payButtonLabel}
            </XUIButton>
          </div>

          <div className="xui-padding-top-large xui-padding-bottom-xsmall xui-u-flex xui-u-flex-justify-center xui-text-emphasis trust-badge-microcopy">
            <span className="xui-padding-horizontal-xsmall">
              <XUIIcon icon={lock} title="" />
            </span>
            <span>Secure checkout</span>
          </div>
      </form>
    </div>
  );
}
