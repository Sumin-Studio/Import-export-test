"use client";

/**
 * Visual / interaction mock of the mybills payment tile + Stripe Payment Element
 * layout — uses XUI only. No Stripe.js, no API calls, no money movement.
 * Real Stripe Elements load when NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set (see README).
 */

import * as React from "react";

import XUIButton from "@xero/xui/react/button";
import XUIIcon from "@xero/xui/react/icon";
import XUITextInput from "@xero/xui/react/textinput";
import lock from "@xero/xui-icon/icons/lock";

import { ExpressCheckoutCycle } from "./stripe/ExpressCheckoutCycle";

import styles from "./OneTimeInvoiceCheckout.module.scss";

import "./stripe/PocPaymentTile.scss";

export interface PocMockMybillsPaymentTileProps {
  payButtonLabel: string;
  defaultEmail?: string;
  /** Whether to show Apple Pay / Google Pay express checkout (default: true) */
  showExpressCheckout?: boolean;
  /** When false, hide the Card tab and card fields (matches customise panel). */
  showCardPayment?: boolean;
  /** Mock bank rails when Card is off (aligns with Stripe PaymentIntent). */
  payByBankEnabled?: boolean;
  directDebitEnabled?: boolean;
  klarnaEnabled?: boolean;
}

export function PocMockMybillsPaymentTile({
  payButtonLabel,
  defaultEmail = "joe.bloggs@xero.test.com",
  showExpressCheckout = true,
  showCardPayment = true,
  payByBankEnabled = true,
  directDebitEnabled = true,
  klarnaEnabled = true,
}: PocMockMybillsPaymentTileProps) {
  const [email, setEmail] = React.useState(defaultEmail);
  const [cardNumber, setCardNumber] = React.useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = React.useState("12 / 34");
  const [cvc, setCvc] = React.useState("123");
  const [country, setCountry] = React.useState("United Kingdom");
  const [postal, setPostal] = React.useState("ME5 9LL");

  const handleDemoPay = () => {
    window.alert(
      "Demo only — this screen does not connect to Stripe and no payment is taken.",
    );
  };

  const showExpressRow = showExpressCheckout && showCardPayment;

  return (
    <div className="pspoc-NewPaymentTile">
      <p
        className="xui-text-minor xui-margin-bottom-small xui-padding-bottom-xsmall"
        style={{ borderBottom: "1px solid rgba(0, 10, 30, 0.12)" }}
      >
        Preview UI only — fields are editable for demos; nothing is charged or sent
        to Stripe.
      </p>

      {showExpressRow && (
        <>
          <ExpressCheckoutCycle
            demoMessage="Demo — Apple Pay / Google Pay would open here (not wired in mock mode)."
          />
          <div className={styles.orDivider}>
            <hr className={styles.orLine} />
            <span className={styles.orText}>Or</span>
            <hr className={styles.orLine} />
          </div>
        </>
      )}

      {/* Card on: same slot/weight as Stripe Link email; Card off: required XUI email */}
      {showCardPayment ? (
        <XUITextInput
          label="Email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <XUITextInput
          isRequired
          label="Email address"
          size="small"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {/* Payment Element–style tabs (visual only) */}
      <div
        className="xui-margin-top-small xui-margin-bottom-2xsmall"
        role="tablist"
        aria-label="Payment method"
      >
        <div className="xui-u-flex xui-u-flex-gap-small">
          {showCardPayment ? (
            <>
              <span
                className="xui-text-emphasis xui-padding-bottom-2xsmall"
                style={{ borderBottom: "2px solid #1f68dd" }}
                role="tab"
                aria-selected
              >
                Card
              </span>
              <span className="xui-text-deemphasis" role="tab">
                Bank
              </span>
              {klarnaEnabled ? (
                <span className="xui-text-deemphasis" role="tab">
                  Klarna
                </span>
              ) : null}
            </>
          ) : (
            <>
              {payByBankEnabled ? (
                <span
                  className="xui-text-emphasis xui-padding-bottom-2xsmall"
                  style={{ borderBottom: "2px solid #1f68dd" }}
                  role="tab"
                  aria-selected
                >
                  Pay by Bank
                </span>
              ) : null}
              {payByBankEnabled && directDebitEnabled ? (
                <span className="xui-text-deemphasis" role="presentation">
                  {" "}
                  ·{" "}
                </span>
              ) : null}
              {directDebitEnabled ? (
                <span
                  className={
                    payByBankEnabled
                      ? "xui-text-deemphasis"
                      : "xui-text-emphasis xui-padding-bottom-2xsmall"
                  }
                  style={
                    !payByBankEnabled
                      ? { borderBottom: "2px solid #1f68dd" }
                      : undefined
                  }
                  role="tab"
                  aria-selected={!payByBankEnabled}
                >
                  Direct Debit
                </span>
              ) : null}
              {!payByBankEnabled && !directDebitEnabled ? (
                <span
                  className="xui-text-emphasis xui-padding-bottom-2xsmall"
                  style={{ borderBottom: "2px solid #1f68dd" }}
                  role="tab"
                  aria-selected
                >
                  Bank
                </span>
              ) : null}
            </>
          )}
        </div>
      </div>

      {showCardPayment ? (
        <>
          <XUITextInput
            label="Card number"
            placeholder="1234 1234 1234 1234"
            size="small"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <div
            className="xui-text-minor xui-margin-top-2xsmall"
            style={{ textAlign: "right" }}
            aria-hidden
          >
            <span
              style={{
                display: "inline-block",
                width: 36,
                height: 22,
                background: "#1a1f71",
                borderRadius: 3,
                marginLeft: 4,
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                display: "inline-block",
                width: 36,
                height: 22,
                background: "#eb001b",
                borderRadius: 3,
                marginLeft: 4,
                verticalAlign: "middle",
              }}
            />
          </div>

          <div className={styles.cardRow}>
            <XUITextInput
              label="Expiration"
              placeholder="MM / YY"
              size="small"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <XUITextInput
              label="CVC"
              placeholder="CVC"
              size="small"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>

          <XUITextInput
            label="Country"
            size="small"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <XUITextInput
            label="Postal code"
            placeholder="ME5 9LL"
            size="small"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
        </>
      ) : (
        <p className="xui-text-minor xui-margin-top-small">
          {[
            payByBankEnabled && "Pay by Bank",
            directDebitEnabled && "Direct Debit",
            klarnaEnabled && "Klarna",
          ]
            .filter(Boolean)
            .join(", ") || "Bank payment"}
          {" — card is turned off in your preview settings, so the card form is hidden here."}
        </p>
      )}

      <div className="xui-margin-top-large">
        <XUIButton
          fullWidth="always"
          variant="main"
          onClick={handleDemoPay}
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
    </div>
  );
}
