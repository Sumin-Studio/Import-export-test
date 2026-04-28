"use client";

import Link from "next/link";
import type { InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";
import { INVOICE_EMAIL_ORG_NAME } from "@/components/bill-cash-flow/invoiceEmailCopy";

const PAY_LOGO_H = 22;
const PAY_LOGO_W = 35;

function MessagePreviewBody({ text }: { text: string }) {
  const token = "[Online Invoice Link]";
  const parts = text.split(token);
  return (
    <div className="text-left text-[13px] leading-relaxed text-[#333]">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 ? (
            <a href="#" className="text-[#0078C8] underline" onClick={(e) => e.preventDefault()}>
              https://online.invoicing.xero.com/view/invoice
            </a>
          ) : null}
          <span className="whitespace-pre-wrap">{part}</span>
        </span>
      ))}
    </div>
  );
}

function PaymentLogoRow() {
  const logos: { src: string; alt: string }[] = [
    { src: "/icons/Visa.svg", alt: "Visa" },
    { src: "/icons/MC.svg", alt: "Mastercard" },
    { src: "/icons/ApplePay.svg", alt: "Apple Pay" },
    { src: "/icons/GooglePay.svg", alt: "Google Pay" },
    { src: "/icons/Amex.svg", alt: "American Express" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-2 py-2">
      {logos.map(({ src, alt }) => (
        <img
          key={src}
          src={src}
          alt={alt}
          width={PAY_LOGO_W}
          height={PAY_LOGO_H}
          className="h-[22px] w-[35px] shrink-0 object-contain"
        />
      ))}
    </div>
  );
}

function ReviewAndPayButton({ className = "", href }: { className?: string; href?: string }) {
  const cls = `w-full rounded-[4px] bg-[#0B6E38] px-4 py-3 text-center text-[15px] font-bold text-white shadow-sm hover:bg-[#095c2f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD] ${className}`;
  if (href) {
    return (
      <Link href={href} className={`${cls} flex items-center justify-center no-underline`}>
        Pay invoice online
      </Link>
    );
  }
  return (
    <button type="button" className={cls}>
      Pay invoice online
    </button>
  );
}

export type InvoiceEmailPreviewCardProps = {
  snapshot: InvoiceSentSnapshot;
  message: string;
  /** Short due line in header, e.g. from send payload */
  dueDateFormattedShort?: string;
  className?: string;
  /** When set (e.g. on /gmail-invoice), green CTAs navigate to online invoice pay. */
  payOnlineHref?: string;
};

/**
 * White invoice email card — matches the “Invoice email” tab on the Send Email screen,
 * with one table row per line item from the snapshot.
 */
export function InvoiceEmailPreviewCard({
  snapshot,
  message,
  dueDateFormattedShort,
  className = "",
  payOnlineHref,
}: InvoiceEmailPreviewCardProps) {
  const dueLine = dueDateFormattedShort ?? snapshot.dueDateDisplay;
  const { invoiceNumber, totalFormatted, currencyCode, subtotalFormatted, totalGstFormatted, taxMode, lines } =
    snapshot;
  return (
    <div
      className={`mx-auto w-full max-w-[580px] bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,10,30,0.08)] ${className}`}
    >
      <p className="text-center text-[22px] font-bold lowercase leading-none tracking-tight text-[#000a1e]">
        foxglove
      </p>
      <p className="mt-3 text-center text-[15px] font-medium text-[#000a1e]">{INVOICE_EMAIL_ORG_NAME}</p>
      <p className="mt-5 text-center text-[0] leading-none">
        <span className="text-[32px] font-bold leading-none text-[#000a1e]">${totalFormatted}</span>
        <span className="text-[22px] font-semibold text-[#000a1e]"> {currencyCode}</span>
      </p>
      <p className="mt-3 text-center text-[14px] text-[#333]">Due {dueLine}</p>
      <p className="mt-1 text-center text-[12px] text-[#59606d]">Invoice #: {invoiceNumber}</p>
      <div className="mt-6">
        <ReviewAndPayButton href={payOnlineHref} />
      </div>
      <div className="mt-8 pt-8">
        <MessagePreviewBody text={message} />
      </div>
      <div className="mt-8">
        <table className="w-full border-collapse text-[13px] text-[#333]">
          <thead>
            <tr className="border-b border-[#e1e2e5]">
              <th className="pb-3 text-left font-bold text-[#000a1e]">Description</th>
              <th className="pb-3 text-right font-bold text-[#000a1e]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((row, i) => (
              <tr key={i} className="border-b border-[#e1e2e5]">
                <td className="py-3 pr-2">{row.description || row.itemTitle || "—"}</td>
                <td className="py-3 text-right tabular-nums">{row.amountFormatted}</td>
              </tr>
            ))}
            <tr className="border-b border-[#e1e2e5]">
              <td className="py-2.5 font-bold text-[#000a1e]">Subtotal</td>
              <td className="py-2.5 text-right font-bold tabular-nums text-[#000a1e]">{subtotalFormatted}</td>
            </tr>
            {taxMode !== "No tax" ? (
              <tr className="border-b border-[#e1e2e5]">
                <td className="py-2.5">Total GST</td>
                <td className="py-2.5 text-right tabular-nums">{totalGstFormatted}</td>
              </tr>
            ) : null}
            <tr>
              <td className="pt-4 text-[15px] font-bold text-[#000a1e]">Amount Due</td>
              <td className="pt-4 text-right text-[15px] font-bold tabular-nums text-[#000a1e]">
                {currencyCode} {totalFormatted}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <ReviewAndPayButton href={payOnlineHref} />
      </div>
      <div className="mt-8 pt-6">
        <PaymentLogoRow />
      </div>
    </div>
  );
}
