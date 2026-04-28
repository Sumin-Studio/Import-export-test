function hasStripePublishableKey(): boolean {
  const k = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return typeof k === "string" && k.trim().length > 0;
}

/**
 * Use real Stripe Elements only when a publishable key is configured and the mock is not forced.
 * Without keys, the XUI mock runs so the app works out of the box (no runtime Stripe/API errors).
 */
export function isStripeElementsEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_USE_MOCK_TILE === "true") {
    return false;
  }
  return hasStripePublishableKey();
}
