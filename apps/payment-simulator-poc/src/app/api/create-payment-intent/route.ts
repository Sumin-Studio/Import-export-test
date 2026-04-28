import { NextResponse } from "next/server";
import Stripe from "stripe";

import { paymentMethodTypesForPaymentIntent } from "@/lib/stripeNoCardPaymentMethodTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripeConnectAccountId(): string | undefined {
  const a = process.env.STRIPE_CONNECTED_ACCOUNT_ID?.trim();
  const b = process.env.NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID?.trim();
  return a || b || undefined;
}

/**
 * Creates a PaymentIntent for the POC (mirrors mybills BFF creating an intent before Elements).
 * Use test keys from the Stripe dashboard.
 *
 * If `STRIPE_CONNECTED_ACCOUNT_ID` (or `NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID`) is set,
 * the intent is created **on that connected account** (Stripe Connect), matching
 * `loadStripe(pk, { stripeAccount })` in `MybillsStripeElementsWrapper`.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not configured" },
      { status: 500 },
    );
  }

  let body: {
    amount?: number;
    currency?: string;
    enableCard?: boolean;
    payByBank?: boolean;
    directDebit?: boolean;
    klarna?: boolean;
  } = {};
  try {
    body = await request.json();
  } catch {
    /* empty body ok */
  }

  const amount = typeof body.amount === "number" ? body.amount : 100000;
  const currency = (body.currency ?? "gbp").toLowerCase();
  /** When false, omit `card` from the PaymentIntent so Payment Element does not offer card. */
  const enableCard = body.enableCard !== false;
  const toggles = {
    enableCard,
    payByBank: typeof body.payByBank === "boolean" ? body.payByBank : true,
    directDebit: typeof body.directDebit === "boolean" ? body.directDebit : true,
    klarna: typeof body.klarna === "boolean" ? body.klarna : true,
  };
  const stripeAccount = getStripeConnectAccountId();

  try {
    const stripe = new Stripe(secret);
    const baseMetadata = {
      source: "payment-simulator-poc",
      ...(stripeAccount && { connect_account: stripeAccount }),
    };

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency,
        automatic_payment_methods: { enabled: false },
        payment_method_types: paymentMethodTypesForPaymentIntent(currency, toggles),
        metadata: baseMetadata,
      },
      stripeAccount ? { stripeAccount } : undefined,
    );

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: "Missing client_secret on PaymentIntent" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
