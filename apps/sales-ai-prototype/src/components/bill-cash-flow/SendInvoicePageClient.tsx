"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SendInvoiceScreen } from "@/components/bill-cash-flow/SendInvoiceScreen";
import { useInvoiceSent } from "@/components/bill-cash-flow/InvoiceSentContext";
import {
  clearPendingSendInvoice,
  getDefaultDemoPendingSendPayload,
  persistInvoiceSentSnapshot,
  readPendingSendInvoice,
  type PendingSendInvoicePayload,
} from "@/components/bill-cash-flow/invoiceSentSnapshot";

const SALES_NEW_INVOICE = "/sales/new-invoice";

export function SendInvoicePageClient() {
  const router = useRouter();
  const { setSnapshot } = useInvoiceSent();
  const [ready, setReady] = useState(false);
  const [payload, setPayload] = useState<PendingSendInvoicePayload | null>(null);

  useLayoutEffect(() => {
    const stored = readPendingSendInvoice();
    setPayload(stored ?? getDefaultDemoPendingSendPayload());
    setReady(true);
  }, []);

  const backToNewInvoice = useCallback(() => {
    clearPendingSendInvoice();
    router.push(SALES_NEW_INVOICE);
  }, [router]);

  const completeSend = useCallback(() => {
    if (!payload) return;
    persistInvoiceSentSnapshot(payload.snapshot);
    setSnapshot(payload.snapshot);
    clearPendingSendInvoice();
    router.push("/sent-invoice");
  }, [payload, router, setSnapshot]);

  if (!ready || !payload) {
    return (
      <div
        className="flex min-h-[100dvh] min-h-screen flex-col items-center justify-center gap-3 bg-white antialiased"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div
          className="size-8 animate-spin rounded-full border-2 border-[#e1e2e5] border-t-[#0078C8]"
          aria-hidden
        />
        <p className="text-[15px] text-[#59606d]">Loading…</p>
      </div>
    );
  }

  const { snapshot, defaultToEmail, dueDateFormattedShort, ...emailRest } = payload;

  return (
    <SendInvoiceScreen
      variant="page"
      defaultToEmail={defaultToEmail}
      contactName={snapshot.selectedContact}
      invoiceNumber={snapshot.invoiceNumber}
      totalFormatted={snapshot.totalFormatted}
      dueDateFormatted={dueDateFormattedShort}
      currencyCode={snapshot.currencyCode}
      onClose={backToNewInvoice}
      onSendComplete={completeSend}
      {...emailRest}
    />
  );
}
