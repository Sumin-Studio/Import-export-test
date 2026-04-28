"use client";

import dynamic from "next/dynamic";

const OneTimeInvoiceCheckout = dynamic(
  () =>
    import("@/components/OneTimeInvoiceCheckout").then((m) => ({
      default: m.OneTimeInvoiceCheckout,
    })),
  { ssr: false, loading: () => <p style={{ padding: 24 }}>Loading…</p> },
);

export function OneTimeInvoiceCheckoutGate() {
  return <OneTimeInvoiceCheckout />;
}
