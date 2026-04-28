"use client";

import Link from "next/link";
import { useLayoutEffect, useState, type CSSProperties } from "react";
import { INVOICE_EMAIL_ORG_NAME } from "@/components/bill-cash-flow/invoiceEmailCopy";
import { INVOICE_SENT_STORAGE_KEY, type InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";

const GMAIL = "/icons/gmail";
const EMAIL = "/icons/email";
const AKAHU_LOGO = "/Akahu-logo-pill.svg";

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

function PaidInvoiceConfirmation({ snapshot }: { snapshot: InvoiceSentSnapshot }) {
  const contactName = snapshot.selectedContact?.trim() || "—";
  const outstandingLabel = `Outstanding bills ${snapshot.totalFormatted} ${snapshot.currencyCode}`;

  return (
    <div className="min-h-screen bg-[#f2f3f4] pb-28" style={FONT}>
      <div className="mx-auto max-w-[1440px] px-4 pt-3 md:px-6">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <Link
            href="/online-invoice"
            className="inline-flex items-center gap-2 rounded-[3px] px-2 py-2 text-[13px] font-bold text-[#0078C8] hover:bg-[rgba(0,10,30,0.04)]"
          >
            <img src={`${GMAIL}/Arrow-Left.svg`} alt="" className="size-4 shrink-0 object-contain" width={16} height={16} />
            {outstandingLabel}
          </Link>
          <button
            type="button"
            className="rounded-[3px] px-3 py-1.5 text-left text-[13px] font-bold text-[#0078C8] hover:bg-[rgba(0,10,30,0.04)]"
          >
            Log in to save invoice as a bill
          </button>
        </header>

        <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
          <div className="w-full overflow-hidden rounded-[3px] border border-[#ccced2] bg-white shadow-[0px_0px_0px_1px_rgba(0,10,30,0.2)]">
            <div className="flex items-center justify-center gap-2 bg-[#0d7d3d] py-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
                <svg className="size-5 text-white" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="M16.25 5.625L8.125 13.75L3.75 9.375"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[15px] font-bold uppercase tracking-wide text-white">Paid</span>
            </div>

            <div className="px-5 pb-4 pt-5">
              <p className="text-right text-[11px] font-medium uppercase tracking-wide text-[#59606d]">Tax invoice</p>
              <p className="text-right text-[0] text-[#000a1e]">
                <span className="text-[28px] font-bold leading-tight">{snapshot.totalFormatted} </span>
                <span className="text-[17px] font-normal text-[#404756]">{snapshot.currencyCode}</span>
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-[#000a1e]">
                <span className="font-bold">To</span>
                <span className="text-right">{contactName}</span>
                <span className="font-bold">From</span>
                <span className="text-right">{INVOICE_EMAIL_ORG_NAME}</span>
                <span className="font-bold">Invoice number</span>
                <span className="text-right">{snapshot.invoiceNumber}</span>
                <span className="font-bold">Issue date</span>
                <span className="text-right">{snapshot.issueDateDisplay}</span>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[400px] border-collapse text-left text-[12px] text-[#000a1e]">
                  <thead>
                    <tr className="border-b border-[#e1e2e5]">
                      <th className="pb-2 pr-2 font-bold">Description</th>
                      <th className="pb-2 pr-2 text-right font-bold">Quantity</th>
                      <th className="pb-2 pr-2 text-right font-bold">Unit price</th>
                      <th className="pb-2 text-right font-bold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshot.lines.map((row, i) => (
                      <tr key={i} className="border-b border-[#f2f3f4]">
                        <td className="py-2 pr-2 align-top leading-5">{row.description || row.itemTitle || "—"}</td>
                        <td className="py-2 pr-2 text-right tabular-nums">{row.qty || "—"}</td>
                        <td className="py-2 pr-2 text-right tabular-nums">{row.price || "—"}</td>
                        <td className="py-2 text-right tabular-nums">{row.amountFormatted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto mt-4 max-w-[240px] space-y-1.5 text-[13px] text-[#000a1e]">
                <div className="flex justify-between gap-8">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{snapshot.subtotalFormatted}</span>
                </div>
                <div className="flex justify-between gap-8 text-[15px] font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {snapshot.currencyCode} {snapshot.totalFormatted}
                  </span>
                </div>
                <div className="flex justify-between gap-8">
                  <span>Less amount paid</span>
                  <span className="tabular-nums">{snapshot.totalFormatted}</span>
                </div>
                <div className="flex justify-between gap-8 border-t border-[#e1e2e5] pt-2 text-[15px] font-bold">
                  <span>Amount due</span>
                  <span className="tabular-nums">
                    {snapshot.currencyCode}{" "}
                    <span className="text-[18px]">0.00</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 flex h-10 w-full max-w-[520px] items-stretch overflow-hidden rounded-[3px] border border-[rgba(0,10,30,0.2)] bg-white">
            <button
              type="button"
              className="flex flex-1 items-center justify-center px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
            >
              Contact merchant
            </button>
            <div className="w-px shrink-0 self-stretch bg-[#ccced2]" aria-hidden />
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
            >
              Download
              <img src={`${GMAIL}/Dropdown-arrow.svg`} alt="" className="size-2.5 object-contain" width={10} height={10} />
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <img
              src={AKAHU_LOGO}
              alt="Akahu"
              width={160}
              height={48}
              className="h-12 w-auto max-w-[200px] object-contain object-center"
            />
            <p className="max-w-[340px] text-center text-[15px] font-medium leading-relaxed text-[#000a1e]" role="status">
              Payment completed with Akahu. This invoice stays here as your paid confirmation.
            </p>
            <p className="mt-1 text-center text-[13px] text-[#59606d]">
              <Link href="/online-invoice" className="font-medium text-[#0078C8] underline">
                Back to online invoice
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#f2f3f4] py-3">
        <div className="flex items-center gap-2 text-[13px] text-[#424f60]">
          <span>Powered by</span>
          <img src={`${EMAIL}/Xero-logo-new.svg`} alt="Xero" className="h-[14px] w-auto object-contain" height={14} />
        </div>
      </footer>
    </div>
  );
}

/** PAID confirmation after pay-by-bank; same chrome as online invoice. Stays on this route (no auto-redirect). */
export function PayByBankPaidClient() {
  const [snapshot, setSnapshot] = useState<InvoiceSentSnapshot | null>(null);

  useLayoutEffect(() => {
    try {
      const raw = sessionStorage.getItem(INVOICE_SENT_STORAGE_KEY);
      if (raw) setSnapshot(JSON.parse(raw) as InvoiceSentSnapshot);
    } catch {
      setSnapshot(null);
    }
  }, []);

  if (snapshot) {
    return <PaidInvoiceConfirmation snapshot={snapshot} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f3f4] px-5 pb-24" style={FONT}>
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <img
          src={AKAHU_LOGO}
          alt="Akahu"
          width={160}
          height={48}
          className="h-12 w-auto max-w-[200px] object-contain object-center"
        />
        <p className="text-[15px] font-medium text-[#000a1e]">No invoice data found for this confirmation.</p>
        <p className="text-[15px] text-[#59606d]">
          <Link href="/online-invoice" className="font-medium text-[#0078C8] underline">
            Back to online invoice
          </Link>
        </p>
      </div>
    </div>
  );
}
