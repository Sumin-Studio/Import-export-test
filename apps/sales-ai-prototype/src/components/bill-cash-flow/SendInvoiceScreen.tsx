"use client";

import { useEffect, useLayoutEffect, useState, type CSSProperties } from "react";
import {
  INVOICE_EMAIL_ORG_NAME,
  buildInvoiceEmailMessage,
  buildInvoiceEmailSubject,
} from "@/components/bill-cash-flow/invoiceEmailCopy";

export type SendInvoiceScreenProps = {
  variant: "page" | "modal";
  /** Modal: pass from `useId()` for `aria-labelledby`. */
  titleId?: string;
  defaultToEmail?: string;
  contactName?: string | null;
  invoiceNumber?: string;
  totalFormatted?: string;
  dueDateFormatted?: string;
  previewLineDescription?: string;
  previewLineAmountFormatted?: string;
  subtotalFormatted?: string;
  gstFormatted?: string;
  gstRowLabel?: string;
  currencyCode?: string;
  onClose: () => void;
  onSendComplete?: () => void;
};

const inputBase =
  "h-10 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-2 text-[13px] text-[#333] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]";
const labelClass = "mb-1 block text-[12px] font-bold text-[#404756]";

const PAY_LOGO_H = 22;
const PAY_LOGO_W = 35;

/** Sales-UI: same stack as New Invoice / other bill-cash-flow mounts (avoid relying on Tailwind `font-body` alone). */
const SALES_UI_FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

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

function ReviewAndPayButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`w-full rounded-[4px] bg-[#0B6E38] px-4 py-3 text-[15px] font-bold text-white shadow-sm hover:bg-[#095c2f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD] ${className}`}
    >
      Pay invoice online
    </button>
  );
}

export function SendInvoiceScreen({
  variant,
  titleId,
  defaultToEmail = "accounts@baysidewholesale.co.nz",
  contactName = null,
  invoiceNumber = "INV-0031",
  totalFormatted = "0.00",
  dueDateFormatted = "—",
  previewLineDescription = "Items",
  previewLineAmountFormatted = "0.00",
  subtotalFormatted = "0.00",
  gstFormatted = "0.00",
  gstRowLabel = "Total GST",
  currencyCode = "NZD",
  onClose,
  onSendComplete,
}: SendInvoiceScreenProps) {
  const [rightTab, setRightTab] = useState<"email" | "pdf">("email");
  const [mobilePane, setMobilePane] = useState<"editor" | "preview">("editor");
  const [attachPdf, setAttachPdf] = useState(true);
  const [sendCopy, setSendCopy] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    const trimmed = contactName?.trim() ?? "";
    const subjectContact = trimmed || "your contact";
    const greetingName = trimmed || "there";
    setSubject(buildInvoiceEmailSubject(invoiceNumber, subjectContact));
    setMessage(
      buildInvoiceEmailMessage({
        greetingName,
        invoiceNumber,
        totalFormatted,
        dueDateFormatted,
        currencyCode,
      })
    );
  }, [contactName, invoiceNumber, totalFormatted, dueDateFormatted, currencyCode]);

  useEffect(() => {
    if (variant !== "page") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, onClose]);

  const handleSend = () => {
    if (onSendComplete) {
      onSendComplete();
      return;
    }
    onClose();
  };

  const contactInitials =
    defaultToEmail
      .split("@")[0]
      .split(/[.\-_]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "DT";

  const rootClass =
    variant === "modal"
      ? "fixed inset-0 z-[200] flex flex-col overflow-hidden bg-white"
      : "flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-white";

  return (
    <div
      className={`${rootClass} antialiased`}
      style={SALES_UI_FONT}
      role={variant === "modal" ? "dialog" : undefined}
      aria-modal={variant === "modal" ? true : undefined}
      aria-labelledby={variant === "modal" ? titleId : undefined}
    >
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e1e2e5] px-4 md:px-6">
        <h2 id={titleId} className="text-[18px] font-bold leading-tight text-[#000a1e] md:text-[20px]">
          Send email
        </h2>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-[3px] text-[#404756] hover:bg-[#f2f3f4]"
          aria-label="Close"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col divide-y-2 divide-[#e1e2e5] overflow-hidden lg:flex-row lg:divide-y-0 lg:divide-x-2">
        <section
          className={`flex min-h-0 w-full flex-1 flex-col overflow-y-auto p-6 lg:max-w-sm lg:shrink-0 xl:max-w-[696px] xl:px-12 ${
            mobilePane === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="md:w-2/3">
              <label className={labelClass} htmlFor="send-inv-to">
                To
              </label>
              <div
                id="send-inv-to"
                className="flex h-10 items-center justify-between rounded-[3px] border border-[#A6A9B0] bg-white px-2"
                role="group"
                aria-label="To"
              >
                <div className="inline-flex min-w-0 items-center rounded-full bg-[#E6E7E9] pr-2">
                  <span className="mr-2 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#C8CAFF] text-[16px]/[20px] font-bold text-[#1f2359]">
                    {contactInitials}
                  </span>
                  <span className="truncate text-[15px]/[20px] text-[#000A1E]">{defaultToEmail}</span>
                  <button
                    type="button"
                    aria-label="Remove contact"
                    className="ml-2 inline-flex size-6 items-center justify-center rounded-full text-[#59606D] hover:bg-[#d8dadd]"
                  >
                    <svg className="size-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="ml-2 inline-flex items-center gap-3">
                  <button type="button" className="text-[13px] font-bold text-[#000A1E] hover:underline">
                    Cc
                  </button>
                  <button type="button" className="text-[13px] font-bold text-[#000A1E] hover:underline">
                    Bcc
                  </button>
                </div>
              </div>
            </div>
            <div className="md:mt-0 md:w-1/3">
              <label className={labelClass} htmlFor="send-inv-template">
                Email template
              </label>
              <div className="relative">
                <select
                  id="send-inv-template"
                  className={`${inputBase} appearance-none pr-8 text-[15px]/[20px] font-bold text-[#0078C8]`}
                >
                  <option>Basic</option>
                  <option>Standard branding</option>
                  <option>30 day invoice</option>
                </select>
                <img
                  src="/Caret.svg"
                  alt=""
                  className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-[12px] bg-[#F1F8FE] p-[10px]">
            <div className="inline-flex min-w-0 flex-1 items-center gap-2">
              <img src="/GAI-Sparkle.svg" alt="" className="size-8 shrink-0" aria-hidden />
              <span className="text-[15px]/[24px] text-[#000A1E]">Help me write a personalised email</span>
            </div>
            <button
              type="button"
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[6px] bg-[#0078C8] px-3 text-[13px] font-medium text-white hover:bg-[#005fa3]"
            >
              Generate
              <img src="/Caret.svg" alt="" className="size-3 shrink-0" aria-hidden />
            </button>
          </div>

          <div className="mt-5">
            <label className={labelClass} htmlFor="send-inv-subject">
              Subject
            </label>
            <input
              id="send-inv-subject"
              type="text"
              className={inputBase}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <label className={labelClass} htmlFor="send-inv-message">
              Message
            </label>
            <textarea
              id="send-inv-message"
              className="min-h-[200px] w-full resize-y rounded-[3px] border border-[#A6A9B0] bg-white px-2 py-2 text-[13px] text-[#333] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#333]">
              <input
                type="checkbox"
                className="size-4 rounded border-[#A6A9B0] text-[#0078C8] focus:ring-[#1F68DD]"
                checked={attachPdf}
                onChange={(e) => setAttachPdf(e.target.checked)}
              />
              Attach PDF to email
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#333]">
              <input
                type="checkbox"
                className="size-4 rounded border-[#A6A9B0] text-[#0078C8] focus:ring-[#1F68DD]"
                checked={sendCopy}
                onChange={(e) => setSendCopy(e.target.checked)}
              />
              Send myself a copy
            </label>
          </div>
        </section>

        <section
          className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white ${
            mobilePane === "editor" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div
            className="flex h-[60px] max-h-[60px] shrink-0 items-end border-b border-[#e1e2e5] px-4"
            role="tablist"
            aria-label="Preview medium"
          >
            <button
              type="button"
              role="tab"
              aria-selected={rightTab === "email"}
              className={`mr-6 border-b-2 pb-3 text-[15px] font-medium ${
                rightTab === "email"
                  ? "border-[#0078C8] text-[#0078C8]"
                  : "border-transparent text-[#59606d] hover:text-[#333]"
              }`}
              onClick={() => setRightTab("email")}
            >
              Invoice email
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={rightTab === "pdf"}
              className={`border-b-2 pb-3 text-[15px] font-medium ${
                rightTab === "pdf"
                  ? "border-[#0078C8] text-[#0078C8]"
                  : "border-transparent text-[#59606d] hover:text-[#333]"
              }`}
              onClick={() => setRightTab("pdf")}
            >
              Invoice PDF
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-[#e8e9eb] p-4 md:p-6">
            {rightTab === "email" ? (
              <div className="mx-auto w-full max-w-[580px] bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,10,30,0.08)]">
                <p className="text-center text-[22px] font-bold lowercase leading-none tracking-tight text-[#000a1e]">
                  foxglove
                </p>
                <p className="mt-3 text-center text-[15px] font-medium text-[#000a1e]">{INVOICE_EMAIL_ORG_NAME}</p>
                <p className="mt-5 text-center text-[0] leading-none">
                  <span className="text-[32px] font-bold leading-none text-[#000a1e]">${totalFormatted}</span>
                  <span className="text-[22px] font-semibold text-[#000a1e]"> {currencyCode}</span>
                </p>
                <p className="mt-3 text-center text-[14px] text-[#333]">Due {dueDateFormatted}</p>
                <p className="mt-1 text-center text-[12px] text-[#59606d]">Invoice #: {invoiceNumber}</p>
                <div className="mt-6">
                  <ReviewAndPayButton />
                </div>
                <div className="mt-8 border-t border-[#e1e2e5] pt-8">
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
                      <tr className="border-b border-[#e1e2e5]">
                        <td className="py-3 pr-2">{previewLineDescription}</td>
                        <td className="py-3 text-right tabular-nums">{previewLineAmountFormatted}</td>
                      </tr>
                      <tr className="border-b border-[#e1e2e5]">
                        <td className="py-2.5 font-bold text-[#000a1e]">Subtotal</td>
                        <td className="py-2.5 text-right font-bold tabular-nums text-[#000a1e]">
                          {subtotalFormatted}
                        </td>
                      </tr>
                      <tr className="border-b border-[#e1e2e5]">
                        <td className="py-2.5">{gstRowLabel}</td>
                        <td className="py-2.5 text-right tabular-nums">{gstFormatted}</td>
                      </tr>
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
                  <ReviewAndPayButton />
                </div>
                <div className="mt-8 pt-6">
                  <PaymentLogoRow />
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center rounded border border-[#ccced2] bg-[#fafafa] text-[15px] text-[#59606d]">
                Invoice PDF preview (production renders pdfUrl in BrandingPreview)
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="sticky bottom-0 z-10 flex shrink-0 flex-col gap-3 border-t border-[#e1e2e5] bg-white px-4 py-4 md:flex-row md:items-center md:px-6">
        <div className="flex w-full flex-wrap items-center gap-2 lg:ml-auto lg:w-auto">
          <button
            type="button"
            className="inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-medium text-[#0078C8] hover:bg-[#f5f5f5] lg:hidden"
            onClick={() => setMobilePane((p) => (p === "editor" ? "preview" : "editor"))}
          >
            {mobilePane === "editor" ? "Show preview" : "Hide preview"}
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 items-center rounded-[3px] border border-[#A6A9B0] bg-white px-4 text-[13px] font-medium text-[#000a1e] hover:bg-[#f5f5f5]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center rounded-[3px] bg-[#0078C8] px-4 text-[13px] font-medium text-white hover:bg-[#005fa3]"
              onClick={handleSend}
            >
              Send email
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
