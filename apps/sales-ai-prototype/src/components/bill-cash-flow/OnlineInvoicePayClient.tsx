"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState, type CSSProperties } from "react";
import { INVOICE_EMAIL_ORG_NAME } from "@/components/bill-cash-flow/invoiceEmailCopy";
import { INVOICE_SENT_STORAGE_KEY, type InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";

/** Pay-to-Bank online invoice — [Figma](https://www.figma.com/design/kIpuIoYVB9alCwv50O5dpF/Pay-to-Bank---Palyground?node-id=235-6858). */
const ICONS = "/icons";
const GMAIL = "/icons/gmail";
const EMAIL = "/icons/email";

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

function invoiceDetailsColumnCount(s: InvoiceSentSnapshot): number {
  const v = s.columnVisibility;
  return (
    (v.item ? 1 : 0) +
    1 + // description
    (v.quantity ? 1 : 0) +
    (v.price ? 1 : 0) +
    (v.discount ? 1 : 0) +
    1 + // tax amount (matches sent-invoice table)
    1 // line amount (always shown on pay screen)
  );
}

function OnlineInvoiceDetailsTable({ s }: { s: InvoiceSentSnapshot }) {
  const v = s.columnVisibility;
  const cols = invoiceDetailsColumnCount(s);
  const labelColSpan = Math.max(1, cols - 1);
  const amountHeader = `Amount ${s.currencyCode}`;

  return (
    <table className="w-full min-w-[520px] border-collapse text-left text-[12px] text-[#000a1e]">
      <thead>
        <tr className="border-b border-[#e1e2e5]">
          {v.item ? (
            <th className="pb-2 pr-2 font-bold">Item</th>
          ) : null}
          <th className="pb-2 pr-2 font-bold">Description</th>
          {v.quantity ? (
            <th className="pb-2 pr-2 text-right font-bold">Qty.</th>
          ) : null}
          {v.price ? (
            <th className="pb-2 pr-2 text-right font-bold">Price</th>
          ) : null}
          {v.discount ? (
            <th className="pb-2 pr-2 text-right font-bold">Disc.</th>
          ) : null}
          <th className="pb-2 pr-2 text-right font-bold">Tax amount</th>
          <th className="pb-2 text-right font-bold">{amountHeader}</th>
        </tr>
      </thead>
      <tbody>
        {s.lines.map((row, i) => (
          <tr key={i} className="border-b border-[#f2f3f4]">
            {v.item ? (
              <td className="py-2 pr-2 align-top">
                <div className="flex flex-col gap-1">
                  {row.itemCode ? (
                    <span className="inline-flex w-fit rounded-[3px] border border-[rgba(0,10,30,0.5)] px-1.5 py-0.5 text-[11px] leading-4 text-[rgba(0,10,30,0.75)]">
                      {row.itemCode}
                    </span>
                  ) : null}
                  <span className="leading-5">{row.itemTitle || "—"}</span>
                </div>
              </td>
            ) : null}
            <td className="py-2 pr-2 align-top">
              <p className="whitespace-pre-wrap leading-5">{row.description || row.itemTitle || "—"}</p>
            </td>
            {v.quantity ? (
              <td className="py-2 pr-2 text-right tabular-nums">{row.qty || "—"}</td>
            ) : null}
            {v.price ? (
              <td className="py-2 pr-2 text-right tabular-nums">{row.price || "—"}</td>
            ) : null}
            {v.discount ? (
              <td className="py-2 pr-2 text-right">{row.discount || "—"}</td>
            ) : null}
            <td className="py-2 pr-2 text-right tabular-nums">{row.taxAmountFormatted}</td>
            <td className="py-2 text-right tabular-nums font-medium">{row.amountFormatted}</td>
          </tr>
        ))}
        <tr className="border-b border-[#e1e2e5]">
          <td colSpan={labelColSpan} className="py-2.5 font-bold">
            Subtotal
          </td>
          <td className="py-2.5 text-right font-bold tabular-nums">{s.subtotalFormatted}</td>
        </tr>
        {s.taxMode !== "No tax" ? (
          <tr className="border-b border-[#e1e2e5]">
            <td colSpan={labelColSpan} className="py-2.5">
              Total GST
            </td>
            <td className="py-2.5 text-right tabular-nums">{s.totalGstFormatted}</td>
          </tr>
        ) : null}
        <tr>
          <td colSpan={labelColSpan} className="pt-3 text-[13px] font-bold">
            Amount Due
          </td>
          <td className="pt-3 text-right text-[13px] font-bold tabular-nums">
            {s.currencyCode} {s.totalFormatted}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function parseDueDate(display: string): Date | null {
  const t = Date.parse(display);
  if (!Number.isNaN(t)) return new Date(t);
  const m = display.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (m) {
    const t2 = Date.parse(`${m[2]} ${m[1]}, ${m[3]}`);
    if (!Number.isNaN(t2)) return new Date(t2);
  }
  return null;
}

function dueStatusLabel(dueDisplay: string): string {
  const due = parseDueDate(dueDisplay);
  if (!due) return `Due ${dueDisplay}`;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(due);
  end.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  if (diff < 0) return "Overdue";
  if (diff === 0) return "Due today";
  return `Due in ${diff} days`;
}

export function OnlineInvoicePayClient() {
  const [snapshot, setSnapshot] = useState<InvoiceSentSnapshot | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useLayoutEffect(() => {
    try {
      const raw = sessionStorage.getItem(INVOICE_SENT_STORAGE_KEY);
      if (!raw) return;
      setSnapshot(JSON.parse(raw) as InvoiceSentSnapshot);
    } catch {
      /* ignore */
    }
  }, []);

  const contactName = snapshot?.selectedContact?.trim() || "—";

  const outstandingLabel = useMemo(() => {
    if (!snapshot) return "";
    return `Outstanding bills ${snapshot.totalFormatted} ${snapshot.currencyCode}`;
  }, [snapshot]);

  if (!snapshot) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f2f3f4] px-6 text-center" style={FONT}>
        <p className="max-w-md text-[16px] text-[#000a1e]">No invoice data.</p>
        <Link href="/sales/new-invoice" className="rounded-[3px] bg-[#0078C8] px-5 py-2.5 text-[15px] font-bold text-white hover:bg-[#005fa3]">
          Create an invoice
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f3f4] pb-24" style={FONT}>
      <div className="mx-auto max-w-[1440px] px-4 pt-3 md:px-6">
        {/* Top bar */}
        <header className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <Link
            href="/gmail-invoice"
            className="inline-flex items-center gap-2 rounded-[3px] px-2 py-2 text-[13px] font-bold text-[#0078C8] hover:bg-[rgba(0,10,30,0.04)]"
          >
            <img src={`${GMAIL}/Arrow-Left.svg`} alt="" className="size-4 shrink-0 object-contain" width={16} height={16} />
            {outstandingLabel}
          </Link>
          <button
            type="button"
            className="rounded-[3px] px-3 py-1.5 text-[13px] font-bold text-[#0078C8] hover:bg-[rgba(0,10,30,0.04)]"
          >
            Log in to save as a bill
          </button>
        </header>

        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-start lg:justify-center">
          {/* Left column */}
          <div className="flex w-full max-w-[391px] flex-col gap-4">
            <div className="overflow-hidden rounded-[3px] border border-[#ccced2] bg-white shadow-[0px_0px_0px_1px_rgba(0,10,30,0.2)]">
              <div className="flex flex-col gap-3 px-1 pt-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex w-[120px] flex-col items-center">
                    <img
                      src={`${EMAIL}/FoxgloveStudios-Logo.svg`}
                      alt=""
                      className="h-auto w-full max-w-[120px] object-contain"
                    />
                  </div>
                  <p className="text-[15px] font-bold leading-6 text-[#000a1e]">{INVOICE_EMAIL_ORG_NAME}</p>
                </div>
                <div className="flex flex-col items-center pb-3">
                  <p className="text-[13px] leading-5 text-[#000a1e]">{snapshot.invoiceNumber}</p>
                  <p className="text-center text-[0] text-[#000a1e]">
                    <span className="text-[30px] font-bold leading-[44px]">{snapshot.totalFormatted} </span>
                    <span className="text-[17px] font-normal leading-7 text-[#404756]">{snapshot.currencyCode}</span>
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-[#000a1e]">{dueStatusLabel(snapshot.dueDateDisplay)}</p>
                </div>
              </div>

              <div className="h-px w-full bg-[#ccced2]" aria-hidden />
              <div className="flex justify-between gap-4 px-5 py-5 text-[13px]">
                <div className="flex flex-col gap-0 text-[#000a1e]">
                  <span className="font-bold leading-5">Due date</span>
                  <span className="leading-5">To</span>
                  <span className="leading-5">Issue date</span>
                  <span className="leading-5">Reference</span>
                </div>
                <div className="flex flex-col items-end gap-0 text-right text-[#000a1e]">
                  <span className="font-bold leading-5">{snapshot.dueDateDisplay}</span>
                  <span className="leading-5">{contactName}</span>
                  <span className="leading-5">{snapshot.issueDateDisplay}</span>
                  <span className="leading-5">{snapshot.invoiceNumber}</span>
                </div>
              </div>

              <div className="h-px w-full bg-[#ccced2]" aria-hidden />

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 py-2 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
                onClick={() => setDetailsOpen((o) => !o)}
                aria-expanded={detailsOpen}
              >
                View invoice details
                <img
                  src={`${GMAIL}/Dropdown-arrow.svg`}
                  alt=""
                  className={`size-3 shrink-0 object-contain transition-transform ${detailsOpen ? "rotate-180" : ""}`}
                  width={12}
                  height={12}
                />
              </button>

              {detailsOpen ? (
                <div className="overflow-x-auto border-t border-[#ccced2] px-4 py-3">
                  <OnlineInvoiceDetailsTable s={snapshot} />
                </div>
              ) : null}
            </div>

            {/* Contact / Download split */}
            <div className="relative flex h-10 w-full max-w-[391px] items-stretch overflow-hidden rounded-[3px] border border-[rgba(0,10,30,0.2)] bg-white">
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
          </div>

          {/* Right column — pay panel (top-aligned with invoice card) */}
          <div className="sticky top-4 w-full max-w-[390px]">
            <div className="rounded-[3px] border border-[rgba(0,10,30,0.2)] bg-white px-5 py-8 shadow-[0px_0px_0px_1px_rgba(0,10,30,0.2)]">
              <p className="text-center text-[15px] leading-6 text-[#000a1e]">
                You will be redirected to Pay by Bank via Akahu to complete payment.
              </p>
              <Link
                href="/online-invoice/pay-by-bank"
                className="mt-6 flex w-full items-center justify-center rounded-[4px] bg-[#0078C8] px-6 py-3 text-center text-[16px] font-bold leading-6 text-white no-underline hover:bg-[#005fa3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
              >
                Pay by Bank via Akahu
              </Link>
              <div className="mt-6 flex items-center justify-center gap-2">
                <img src={`${ICONS}/Lock.svg`} alt="" className="size-8 shrink-0 object-contain" width={32} height={32} />
                <span className="text-[13px] font-bold leading-5 text-[#59606d]">Secure checkout</span>
              </div>
            </div>
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
