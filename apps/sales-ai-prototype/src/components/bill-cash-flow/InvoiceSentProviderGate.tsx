"use client";

import { InvoiceSentProvider } from "@/components/bill-cash-flow/InvoiceSentContext";

/** Wraps the app so New Invoice and /sent-invoice share the last sent-invoice snapshot. */
export function InvoiceSentProviderGate({ children }: { children: React.ReactNode }) {
  return <InvoiceSentProvider>{children}</InvoiceSentProvider>;
}
