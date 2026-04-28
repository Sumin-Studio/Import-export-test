"use client";

/**
 * Demo-only mock Apple Pay–style button for POC when real ExpressCheckoutElement
 * does not render (e.g. unsupported device, domain not registered).
 *
 * ⚠️ NOT FOR PUBLIC USE: Apple Pay branding/button may only be used to initiate
 * real Apple Pay transactions per Apple's Acceptable Use Guidelines. Document
 * that this must be removed or replaced before any public/production deployment.
 *
 * @see https://developers.apple.com/apple-pay/acceptable-use-guidelines-for-websites
 */

import * as React from "react";

export interface MockApplePayButtonProps {
  onClick?: () => void;
  /** Demo message shown on click (e.g. "Demo only — no payment was sent.") */
  demoMessage?: string;
  /** Periodic light sweep (ExpressCheckoutCycle); not hover-driven */
  lightSweep?: boolean;
  /** No click/hover feedback — used when sweep is automated */
  disableInteraction?: boolean;
}

/** Apple logo SVG (minimal path for demo mock only) */
const AppleLogo = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="currentColor"
    style={{ flexShrink: 0 }}
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

export function MockApplePayButton({
  onClick,
  demoMessage = "Demo only — Apple Pay is not processed on this screen.",
  lightSweep = false,
  disableInteraction = false,
}: MockApplePayButtonProps) {
  const handleClick = () => {
    if (disableInteraction) {
      return;
    }
    onClick?.();
    window.alert(demoMessage);
  };

  return (
    <button
      type="button"
      className={`pspoc-MockApplePayButton xui-margin-bottom-small${lightSweep ? " pspoc-MockApplePayButton--lightSweep" : ""}${disableInteraction ? " pspoc-MockApplePayButton--noInteraction" : ""}`}
      onClick={handleClick}
      tabIndex={disableInteraction ? -1 : undefined}
      aria-label="Pay with Apple Pay (demo)"
      title="Demo only — not for public use"
    >
      <span className="pspoc-MockApplePayButton__prefix">Pay with</span>
      <AppleLogo />
      <span className="pspoc-MockApplePayButton__pay">Pay</span>
    </button>
  );
}
