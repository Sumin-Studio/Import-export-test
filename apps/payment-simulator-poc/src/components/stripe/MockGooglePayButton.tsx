"use client";

/**
 * Demo-only mock Google Pay–style button for POC when real ExpressCheckoutElement
 * does not render. Matches Apple Pay button dimensions for smooth cycling transitions.
 *
 * ⚠️ NOT FOR PUBLIC USE: Google Pay branding/button may only be used to initiate
 * real Google Pay transactions per Google's brand guidelines. Document that this
 * must be removed or replaced before any public/production deployment.
 *
 * @see https://developers.google.com/pay/api/web/guides/brand-guidelines
 */

import * as React from "react";

export interface MockGooglePayButtonProps {
  onClick?: () => void;
  /** Demo message shown on click */
  demoMessage?: string;
  lightSweep?: boolean;
  disableInteraction?: boolean;
}

/** Google "G" logo SVG (minimal for demo mock only — official assets required for production) */
const GoogleLogo = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    width={18}
    height={18}
    style={{ flexShrink: 0 }}
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export function MockGooglePayButton({
  onClick,
  demoMessage = "Demo only — Google Pay is not processed on this screen.",
  lightSweep = false,
  disableInteraction = false,
}: MockGooglePayButtonProps) {
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
      className={`pspoc-MockGooglePayButton xui-margin-bottom-small${lightSweep ? " pspoc-MockGooglePayButton--lightSweep" : ""}${disableInteraction ? " pspoc-MockGooglePayButton--noInteraction" : ""}`}
      onClick={handleClick}
      tabIndex={disableInteraction ? -1 : undefined}
      aria-label="Pay with Google Pay (demo)"
      title="Demo only — not for public use"
    >
      <span className="pspoc-MockGooglePayButton__prefix">Pay with</span>
      <GoogleLogo />
      <span className="pspoc-MockGooglePayButton__pay">Pay</span>
    </button>
  );
}
