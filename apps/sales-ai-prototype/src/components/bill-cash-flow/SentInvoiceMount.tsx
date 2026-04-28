"use client";

import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { RobbShell } from "@/components/prototype-shell/RobbShell";
import { OnlinePaymentsHistoryNotes } from "@/components/bill-cash-flow/OnlinePaymentsHistoryNotes";
import { useInvoiceSent } from "@/components/bill-cash-flow/InvoiceSentContext";
import { onlinePaymentsLabel, type InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";

const SALES_BASE = "/sales";

const breadcrumbs = [
  { label: "Sales overview", href: SALES_BASE },
  { label: "Invoices", href: `${SALES_BASE}/invoices` },
];

const btnSmall =
  "inline-flex h-8 items-center gap-1.5 rounded-[3px] px-3 text-[13px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]";

const splitSegNudge = "-translate-y-px";

const secondaryOutlineBorder = "border border-solid border-[#A6A9B0]";
const linkOutlineBtn = `${btnSmall} ${secondaryOutlineBorder} bg-white text-[#0078C8] hover:bg-[#f5f5f5] active:bg-[#eee]`;

/** Inline caret: `/Caret.svg` is fill white and disappears on white buttons. */
function BlueCaret({ className = "text-[#0078C8]" }: { className?: string }) {
  return (
    <svg className={`size-3 shrink-0 ${className}`} viewBox="0 0 10 6" fill="none" aria-hidden>
      <path
        d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z"
        fill="currentColor"
      />
    </svg>
  );
}

function taxModeBannerLabel(taxMode: string): string {
  if (taxMode === "Tax inclusive") return "Amounts are tax inclusive";
  if (taxMode === "No tax") return "No tax on this invoice";
  return "Amounts are tax exclusive";
}

function SentInvoiceReadOnlyTable({ s }: { s: InvoiceSentSnapshot }) {
  const v = s.columnVisibility;
  const amountHeader = `Amount ${s.currencyCode}`;

  return (
    <div className="overflow-x-auto rounded-[3px] shadow-[inset_0_0_0_1px_rgba(0,10,30,0.2)]">
      <table className="w-full min-w-[900px] border-separate border-spacing-0 text-[13px]">
        <thead>
          <tr className="bg-white">
            {v.item ? (
              <th className="border-b border-[#ccced2] px-2 py-2.5 text-left text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
                Item
              </th>
            ) : null}
            <th className="border-b border-[#ccced2] px-2 py-2.5 text-left text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
              Description
            </th>
            {v.quantity ? (
              <th className="border-b border-[#ccced2] px-2 py-2.5 text-right text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
                Qty.
              </th>
            ) : null}
            {v.price ? (
              <th className="border-b border-[#ccced2] px-2 py-2.5 text-right text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
                Price
              </th>
            ) : null}
            {v.discount ? (
              <th className="border-b border-[#ccced2] px-2 py-2.5 text-right text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
                Disc.
              </th>
            ) : null}
            <th className="border-b border-[#ccced2] px-2 py-2.5 text-left text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
              Account
            </th>
            <th className="border-b border-[#ccced2] px-2 py-2.5 text-left text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
              Tax rate
            </th>
            <th className="border-b border-[#ccced2] px-2 py-2.5 text-right text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
              Tax amount
            </th>
            {v.project ? (
              <th className="border-b border-[#ccced2] px-2 py-2.5 text-left text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
                Project
              </th>
            ) : null}
            {v.taxAmount ? (
              <th className="border-b border-[#ccced2] px-2 py-2.5 text-right text-[13px] font-normal text-[rgba(0,10,30,0.75)]">
                {amountHeader}
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {s.lines.map((row, i) => (
            <tr key={i} className="align-top bg-white">
              {v.item ? (
                <td className="border-b border-[#ccced2] px-2 py-2 align-top">
                  <div className="flex flex-col gap-1">
                    {row.itemCode ? (
                      <span className="inline-flex w-fit rounded-[3px] border border-[rgba(0,10,30,0.5)] px-1.5 py-0.5 text-[11px] leading-4 text-[rgba(0,10,30,0.75)]">
                        {row.itemCode}
                      </span>
                    ) : null}
                    <span className="text-[13px] leading-5 text-[#000a1e]">{row.itemTitle || "—"}</span>
                  </div>
                </td>
              ) : null}
              <td className="border-b border-[#ccced2] px-2 py-2 align-top">
                <p className="whitespace-pre-wrap text-[13px] leading-5 text-[#000a1e]">{row.description || "—"}</p>
              </td>
              {v.quantity ? (
                <td className="border-b border-[#ccced2] px-2 py-2 text-right tabular-nums text-[#000a1e]">{row.qty}</td>
              ) : null}
              {v.price ? (
                <td className="border-b border-[#ccced2] px-2 py-2 text-right tabular-nums text-[#000a1e]">{row.price}</td>
              ) : null}
              {v.discount ? (
                <td className="border-b border-[#ccced2] px-2 py-2 text-right text-[#000a1e]">{row.discount || "—"}</td>
              ) : null}
              <td className="border-b border-[#ccced2] px-2 py-2 text-left text-[#000a1e]">{row.accountLabel}</td>
              <td className="border-b border-[#ccced2] px-2 py-2 text-left text-[#000a1e]">{row.taxRateLabel}</td>
              <td className="border-b border-[#ccced2] px-2 py-2 text-right tabular-nums text-[#000a1e]">
                {row.taxAmountFormatted}
              </td>
              {v.project ? (
                <td className="border-b border-[#ccced2] px-2 py-2 text-left text-[#59606d]">—</td>
              ) : null}
              {v.taxAmount ? (
                <td className="border-b border-[#ccced2] px-2 py-2 text-right tabular-nums font-medium text-[#000a1e]">
                  {row.amountFormatted}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SentInvoiceContent({ s }: { s: InvoiceSentSnapshot }) {
  const [invoiceSentBannerVisible, setInvoiceSentBannerVisible] = useState(true);

  const onlineLabel = onlinePaymentsLabel(s.onlinePaymentMethod);

  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      {/* Title bar — matches New Invoice chrome */}
      <div className="flex h-[78px] items-end justify-between gap-4 border-b border-[#e1e2e5] bg-white pb-3 pl-5 pr-6">
        <div className="min-w-0 flex-1 max-w-7xl pb-0">
          <nav className="mb-1.5 flex items-center gap-1 text-[13px]">
            {breadcrumbs.map((seg, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {i > 0 && (
                  <svg width={5} height={8} viewBox="0 0 8 12" fill="none" className="shrink-0 text-[#8c919a]" aria-hidden>
                    <path d="M1.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <a href={seg.href} className="text-[#0078C8] hover:underline">
                  {seg.label}
                </a>
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="mt-0 text-[24px] font-bold leading-[115%] text-[#000a1e]">Invoice {s.invoiceNumber}</h1>
            <span className="text-[13px]/[20px] text-content-secondary border border-content-secondary rounded-[3px] px-1">
              Prototype
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-end gap-2 pb-0">
          <button
            type="button"
            className={`${btnSmall} border-0 bg-transparent text-[#0078C8] hover:bg-[#f5f5f5]`}
          >
            <svg
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
              className="size-8 shrink-0 text-[#0078C8]"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 22C22.3137 22 25 16 25 16C25 16 22.3137 10 16 10C9.68629 10 7 16 7 16C7 16 9.68629 22 16 22ZM16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16Z"
                fill="currentColor"
              />
            </svg>
            Preview
          </button>
          <Popover className="relative">
            {({ close }) => (
              <>
                <div className="inline-flex h-8 overflow-hidden rounded-[3px] bg-white shadow-[inset_0_0_0_1px_#A6A9B0]">
                  <div className="flex h-full min-h-0">
                    <button
                      type="button"
                      className={`${btnSmall} ${splitSegNudge} rounded-none rounded-l-[3px] border-0 bg-transparent text-[#0078C8] hover:bg-[#f5f5f5]`}
                    >
                      Print PDF
                    </button>
                    <span className="w-px shrink-0 self-stretch bg-[#CFD1D5]" aria-hidden />
                    <PopoverButton
                      type="button"
                      className={`${btnSmall} ${splitSegNudge} w-8 shrink-0 justify-center rounded-none rounded-r-[3px] border-0 px-0 text-[#0078C8] hover:bg-[#f5f5f5]`}
                      aria-label="Print PDF options"
                    >
                      <BlueCaret />
                    </PopoverButton>
                  </div>
                </div>
                <PopoverPanel
                  anchor={{ to: "bottom end" }}
                  transition
                  className="z-[100] mt-1 flex min-w-[200px] flex-col rounded-[3px] border border-[#A6A9B0] bg-white py-1 shadow-[0px_3px_6px_rgba(0,0,0,0.2)] [--anchor-gap:4px] data-[closed]:opacity-0"
                >
                  <button
                    type="button"
                    className="px-4 py-2.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]"
                    onClick={() => close()}
                  >
                    Invoice
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2.5 text-left text-[15px] text-[#000a1e] hover:bg-[#f5f5f5]"
                    onClick={() => close()}
                  >
                    Packing slip
                  </button>
                </PopoverPanel>
              </>
            )}
          </Popover>
          <button
            type="button"
            className={`${btnSmall} rounded-[3px] border-0 bg-[#0078C8] px-4 text-white hover:bg-[#005fa3]`}
          >
            Add payment
          </button>
        </div>
      </div>

      {/* Positive sentiment banner (same language as post-setup banner on New Invoice) */}
      {invoiceSentBannerVisible ? (
        <div className="px-5 pt-5">
          <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 rounded-[3px] border border-[#e1e2e5] border-l-[3px] border-l-[#0d7d3d] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,10,30,0.06)]">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <p className="shrink-0 text-[15px] leading-6 text-[#000a1e]">Invoice sent</p>
              <Link href="/gmail-invoice" className="shrink-0 text-[15px] font-bold text-[#0078C8] hover:underline">
                Create another invoice
              </Link>
            </div>
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-[3px] text-[#59606d] hover:bg-[#f4f5f7]"
              onClick={() => setInvoiceSentBannerVisible(false)}
              aria-label="Dismiss"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      <div className="px-5 pb-10 pt-5">
        <div className="mx-auto max-w-[1560px]">
          {/* Figma: Sent status row with checkmark */}
          <div className="mb-5 flex items-center gap-2">
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-[3px] border border-[#0078C8] bg-[#0078C8]">
              <svg className="size-3.5 text-white" viewBox="0 0 12 10" fill="none" aria-hidden>
                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[15px] leading-6 text-[#000a1e]">Sent</span>
          </div>

          <div className="rounded-[3px] bg-white p-8 shadow-[0px_0px_0px_1px_rgba(0,10,30,0.2)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:gap-8">
              <div className="min-w-[200px] max-w-[280px] shrink-0">
                <p className="text-[13px] font-bold leading-6 text-[rgba(0,10,30,0.75)]">Contact</p>
                {s.selectedContact ? (
                  <a href="#" className="mt-2 block text-[15px] font-bold leading-4 text-[#0078C8] hover:underline" onClick={(e) => e.preventDefault()}>
                    {s.selectedContact}
                  </a>
                ) : (
                  <p className="mt-2 text-[15px] text-[#59606d]">—</p>
                )}
                <div className="mt-3 text-[15px] leading-6 text-[#000a1e]">
                  {s.contactAddressLines.map((line, i) => (
                    <p key={i} className="mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-[13px] font-bold leading-6 text-[#000a1e]">Issue date</p>
                  <p className="mt-5 text-[15px] leading-6 text-[#000a1e]">{s.issueDateDisplay}</p>
                </div>
                <div>
                  <p className="text-[13px] font-bold leading-6 text-[#000a1e]">Due date</p>
                  <p className="mt-5 text-[15px] leading-6 text-[#000a1e]">{s.dueDateDisplay}</p>
                </div>
                <div>
                  <p className="text-[13px] font-bold leading-6 text-[#000a1e]">Invoice number</p>
                  <p className="mt-5 text-[15px] leading-6 text-[#000a1e]">{s.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-[13px] font-bold leading-6 text-[#000a1e]">Online payments</p>
                  <p className="mt-5 text-[15px] leading-6 text-[#000a1e]">{onlineLabel}</p>
                  <button type="button" className="mt-2 text-[15px] text-[#0078C8] hover:underline">
                    Manage
                  </button>
                </div>
                <div>
                  <p className="text-[13px] font-bold leading-6 text-[#000a1e]">Branding theme</p>
                  <p className="mt-5 text-[15px] leading-6 text-[#000a1e]">{s.brandingTheme}</p>
                </div>
              </div>
            </div>

            <p className="mb-4 mt-8 text-right text-[15px] leading-6 text-[#000a1e]">{taxModeBannerLabel(s.taxMode)}</p>

            <SentInvoiceReadOnlyTable s={s} />

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`${linkOutlineBtn} gap-1 opacity-80`}
                  disabled
                  aria-disabled
                >
                  Columns ({s.hiddenColumnCount} hidden) <BlueCaret />
                </button>
                <button
                  type="button"
                  className={`${linkOutlineBtn} h-8 max-h-8 gap-1.5 opacity-80`}
                  disabled
                  aria-disabled
                >
                  <svg className="h-6 w-6 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 8C10.5 8 10 8.54545 10.01 9.09091L10 21.9091C10 22.4545 10.5 23 11 23H21C21.5 23 22 22.4545 22 21.9091V12L18 8H11ZM11 22V9H17V13H21V22H11Z"
                      fill="#0078C8"
                    />
                  </svg>
                  Attach files <BlueCaret />
                </button>
              </div>
              <div className="w-full max-w-[500px] lg:w-[500px]">
                <div className="flex justify-between border-t-[3px] border-[#A6A9B0] pt-4 text-[14px] text-[#333]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{s.subtotalFormatted}</span>
                </div>
                {s.taxMode !== "No tax" ? (
                  <div className="mt-2 flex justify-between text-[14px] text-[#333]">
                    <span>Total GST</span>
                    <span className="tabular-nums">{s.totalGstFormatted}</span>
                  </div>
                ) : null}
                <div className="mt-2 flex justify-between border-b border-[#A6A9B0] pb-4 text-[21px] font-bold leading-7 text-[#000A1E]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    <span className="font-normal text-[#59606D]">{s.currencyCode}</span> {s.totalFormatted}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-[22px] w-10 rounded-full bg-[#ccc] p-[2px]">
                  <div className="size-[18px] rounded-full bg-white shadow" />
                </div>
                <span className="text-[14px] text-[#333]">Send via Xero Network</span>
              </div>
              <p className="mt-1 text-[13px] leading-4 text-[#333]">
                This <a href="#" className="text-[#0078C8] hover:underline">contact</a> is not set up to<br />
                receive invoices via Xero<br />
                Network
              </p>
            </div>
          </div>

          <OnlinePaymentsHistoryNotes />
        </div>
      </div>
    </div>
  );
}

function EmptySentInvoice() {
  return (
    <div className="min-h-screen bg-[#f2f3f4] px-5 py-16">
      <div className="mx-auto max-w-lg rounded-[3px] border border-[#e1e2e5] bg-white p-8 text-center shadow-sm">
        <p className="text-[16px] font-bold text-[#000a1e]">No sent invoice data</p>
        <p className="mt-2 text-[15px] text-[#59606d]">
          Open New Invoice, fill in the details, then use <span className="font-medium text-[#000a1e]">Approve &amp; email</span> and{" "}
          <span className="font-medium text-[#000a1e]">Send email</span> to land here with your data.
        </p>
        <Link
          href={`${SALES_BASE}/new-invoice`}
          className="mt-6 inline-flex h-10 items-center rounded-[3px] bg-[#0078C8] px-5 text-[15px] font-bold text-white hover:bg-[#005fa3]"
        >
          Go to New Invoice
        </Link>
      </div>
    </div>
  );
}

export function SentInvoicePage() {
  const { snapshot } = useInvoiceSent();
  if (!snapshot) return <EmptySentInvoice />;
  return <SentInvoiceContent s={snapshot} />;
}

export function SentInvoiceMount() {
  return (
    <RobbShell>
      <SentInvoicePage />
    </RobbShell>
  );
}
