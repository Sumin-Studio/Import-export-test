/**
 * When true with Stripe Elements enabled: Pay / wallets validate via Stripe.js but
 * never call `confirmPayment` — no charge (POC / design review).
 * Default: true (Pay never charges). Set NEXT_PUBLIC_STRIPE_PAY_DEMO_ONLY=false to enable real test payments.
 */
export function isStripePayDemoOnly(): boolean {
  return process.env.NEXT_PUBLIC_STRIPE_PAY_DEMO_ONLY !== "false";
}
