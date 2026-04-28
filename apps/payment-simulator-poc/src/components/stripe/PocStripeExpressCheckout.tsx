"use client";

/**
 * Copied from mybills `StripeExpressCheckout.tsx` (ExpressCheckoutElement options).
 * @see https://github.com/xero-internal/mybills/blob/main/project/spa/src/components/StripeCheckout/StripeExpressCheckout.tsx
 */

import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import type * as stripeJs from "@stripe/stripe-js";
import * as React from "react";

export interface PocStripeExpressCheckoutProps {
  orgName: string;
  setHasExpressCheckoutPaymentMethods: (has: boolean) => void;
  setHasDigitalWallets: (has: boolean) => void;
  setIsExpressCheckoutLoaded: (loaded: boolean) => void;
  onConfirm: (event: stripeJs.StripeExpressCheckoutElementConfirmEvent) => void;
}

export function PocStripeExpressCheckout({
  orgName,
  setHasExpressCheckoutPaymentMethods,
  setHasDigitalWallets,
  setIsExpressCheckoutLoaded,
  onConfirm,
}: PocStripeExpressCheckoutProps) {
  const handleExpressCheckoutClick = ({
    resolve,
  }: stripeJs.StripeExpressCheckoutElementClickEvent) => {
    resolve({
      billingAddressRequired: true,
      business: {
        name: orgName,
      },
      emailRequired: true,
    });
  };

  const handleExpressElementReady = ({
    availablePaymentMethods,
  }: stripeJs.StripeExpressCheckoutElementReadyEvent) => {
    if (availablePaymentMethods) {
      setHasExpressCheckoutPaymentMethods(true);
    }
    setHasDigitalWallets(true);
    setIsExpressCheckoutLoaded(true);
  };

  const expressOptions = React.useMemo(
    () => ({
      buttonHeight: 40,
      buttonTheme: {
        applePay: "black" as const,
      },
      layout: {
        maxColumns: 1,
        maxRows: 0,
        overflow: "never" as const,
      },
      paymentMethods: {
        applePay: "always" as const,
        googlePay: "always" as const,
        klarna: "never" as const,
      },
    }),
    [],
  );

  return (
    <ExpressCheckoutElement
      className="xui-margin-bottom-small"
      id="express-checkout-element"
      options={expressOptions}
      onClick={(event) => handleExpressCheckoutClick(event)}
      onConfirm={onConfirm}
      onReady={handleExpressElementReady}
    />
  );
}
