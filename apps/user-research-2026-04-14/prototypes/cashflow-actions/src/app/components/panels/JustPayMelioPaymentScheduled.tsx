"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatJustPayMelioMoney } from "@/app/lib/just-pay-melio-format";

type JustPayMelioPaymentScheduledProps = {
  supplierName: string;
  amountDisplay: string;
  currencyCode: string;
  returnHref: string;
  paymentId: string;
  /** When the route supplies breadcrumbs + “Make payment” header (full-page flow). */
  hideEmbeddedHeader?: boolean;
  align?: "center" | "left";
  onReturn?: () => void;
  onMakeAnotherPayment?: () => void;
};

/**
 * Payment success after Confirm and pay.
 * @see https://www.figma.com/design/kb0eqW7roOcxynLDhTRFS3/JustPay?node-id=96-41236
 */
export function JustPayMelioPaymentScheduled({
  supplierName,
  amountDisplay,
  currencyCode,
  returnHref,
  paymentId,
  hideEmbeddedHeader = false,
  align = "center",
  onReturn,
  onMakeAnotherPayment,
}: JustPayMelioPaymentScheduledProps) {
  const router = useRouter();
  const [vendorNotified, setVendorNotified] = useState(false);

  const paymentAmount = useMemo(() => {
    const n = Number.parseFloat(amountDisplay.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [amountDisplay]);

  const heroAmount = formatJustPayMelioMoney(paymentAmount, currencyCode);

  const handleDownload = () => {
    const text = `Payment scheduled\nPayment ID ${paymentId}\nAmount ${heroAmount}\nSupplier ${supplierName}`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-${paymentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const returnAction = () => {
    if (onReturn) {
      onReturn();
      return;
    }
    router.push(returnHref);
  };

  /** Purchases overview / inline host: compact Melio chrome + review / make another. */
  if (!hideEmbeddedHeader && onReturn != null) {
    return (
      <div className="w-full">
        <div className="border-b border-[#e6e7e9] bg-white px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className="flex size-6 items-center justify-center rounded-full bg-[#7047eb]"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h1 className="text-[19px] font-bold leading-7 text-[#000a1e]">
                Payment scheduled
              </h1>
            </div>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#59606d]">
              Powered by <span className="text-[#7047eb]">Melio</span>
            </span>
          </div>
        </div>

        <div
          className={`flex flex-col px-4 py-4 pb-5 ${
            align === "left" ? "items-start" : "items-center"
          }`}
        >
          <div
            className={`w-full rounded-[12px] border border-[#ccced2] bg-white p-4 shadow-sm print:shadow-none ${
              align === "left" ? "max-w-none" : "max-w-md"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[17px] font-bold text-[#000a1e]">Payment summary</p>
                <p className="mt-1 text-[13px] text-[#59606d]">Payment ID {paymentId}</p>
              </div>
              <div className="flex shrink-0 gap-1 print:hidden">
                <button
                  type="button"
                  onClick={handleDownload}
                  aria-label="Download"
                  className="flex size-9 items-center justify-center rounded border border-[#cdd5e0] bg-white text-[#59606d] hover:bg-[#f2f3f4]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 3v12m0 0l4-4m-4 4L8 11M5 21h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  aria-label="Print"
                  className="flex size-9 items-center justify-center rounded border border-[#cdd5e0] bg-white text-[#59606d] hover:bg-[#f2f3f4]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M7 18h10v4H7v-4ZM6 9V3h12v6M7 9h10v5H7V9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-3 text-[36px] font-bold leading-none tracking-tight text-[#000a1e]">
              {heroAmount}
            </p>

            <dl className="mt-3 space-y-2 border-t border-[#e6e7e9] pt-3 text-[13px] leading-5">
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#424f60]">Supplier name</dt>
                <dd className="text-right text-[#000a1e]">{supplierName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#424f60]">Payment method</dt>
                <dd className="text-right text-[#000a1e]">Bank account •••7134</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#424f60]">Debit date</dt>
                <dd className="text-right text-[#000a1e]">Apr 8, 2026</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#424f60]">Delivery method</dt>
                <dd className="text-right text-[#000a1e]">ACH transfer to •••2742</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold text-[#424f60]">Delivery date</dt>
                <dd className="text-right text-[#000a1e]">Apr 11, 2026</dd>
              </div>
            </dl>
          </div>

          <div
            className={`mt-4 flex flex-wrap items-center gap-3 print:hidden ${
              align === "left" ? "justify-start" : "justify-center"
            }`}
          >
            <button
              type="button"
              onClick={returnAction}
              className="h-[36px] rounded-full border border-[#cdd5e0] bg-white px-4 text-[13px] font-bold text-[#000a1e] hover:bg-[#eff1f2]"
            >
              Review payment
            </button>
            <button
              type="button"
              onClick={onMakeAnotherPayment ?? returnAction}
              className="h-[36px] rounded-full bg-[#7047eb] px-4 text-[13px] font-bold text-white hover:bg-[#5f3ad4]"
            >
              Make another payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!hideEmbeddedHeader ? (
        <div className="border-b border-[#e6e7e9] bg-white px-4 py-3">
          <p className="text-[12px] leading-4 text-[#59606d]">
            <span className="text-brand-primary">Purchase overview</span>
            <span className="mx-1.5 text-[#cdd5e0]">›</span>
            <span>Bills to pay</span>
          </p>
          <div className="mt-2 flex items-start justify-between gap-2">
            <h1 className="text-[19px] font-bold leading-7 text-[#000a1e]">
              Make payment
            </h1>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#59606d]">
              Powered by <span className="text-[#7047eb]">Melio</span>
            </span>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center pb-16 pt-2 print:pt-0">
        <div
          className="flex h-[144px] w-full items-center justify-center"
          aria-hidden
        >
          <div className="flex size-[88px] items-center justify-center rounded-full bg-[#e6f7ef]">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#0f7c54]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="mt-2 text-center text-[32px] font-semibold leading-10 tracking-[-0.32px] text-[#18191b]">
          Payment scheduled
        </h2>

        <div className="mt-8 w-full rounded-lg border border-[#e4e7ec] bg-white p-8 shadow-sm print:shadow-none">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[17px] font-semibold text-[#18191b]">Payment summary</p>
              <p className="mt-1 text-[14px] leading-5 text-[#59606d]">
                Payment ID {paymentId}
              </p>
            </div>
            <div className="flex shrink-0 gap-2 print:hidden">
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Download"
                className="flex size-10 items-center justify-center rounded-lg border border-[#8b95a9] bg-white text-[#424f60] hover:bg-[#f2f3f4]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 3v12m0 0l4-4m-4 4L8 11M5 21h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                aria-label="Print"
                className="flex size-10 items-center justify-center rounded-lg border border-[#8b95a9] bg-white text-[#424f60] hover:bg-[#f2f3f4]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M7 18h10v4H7v-4ZM6 9V3h12v6M7 9h10v5H7V9Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-8 text-[40px] font-semibold leading-[48px] tracking-[-0.4px] text-[#18191b]">
            {heroAmount}
          </p>

          <dl className="mt-8 flex flex-col gap-2 text-[14px] leading-5 text-[#18191b]">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="w-[191px] shrink-0 font-semibold">Supplier name</dt>
              <dd className="min-w-[100px] flex-1">{supplierName}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="w-[191px] shrink-0 font-semibold">Payment method</dt>
              <dd className="min-w-[100px] flex-1">Bank account •••7134</dd>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="w-[191px] shrink-0 font-semibold">Debit date</dt>
              <dd className="min-w-[100px] flex-1">Apr 8, 2026</dd>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="w-[191px] shrink-0 font-semibold">Delivery method</dt>
              <dd className="min-w-[100px] flex-1">ACH transfer to •••2742</dd>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="w-[191px] shrink-0 font-semibold">Delivery date</dt>
              <dd className="min-w-[100px] flex-1">Apr 11, 2026</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 flex w-full max-w-[600px] flex-col gap-3 print:hidden sm:flex-row sm:justify-center">
          <button
            type="button"
            disabled={vendorNotified}
            onClick={() => setVendorNotified(true)}
            className="h-12 rounded-lg border border-[#8b95a9] bg-white px-6 text-[16px] font-semibold text-[#18191b] hover:bg-[#f2f3f4] disabled:cursor-default disabled:opacity-70"
          >
            {vendorNotified ? "Notification sent" : "Notify vendor"}
          </button>
          <button
            type="button"
            onClick={() => router.push(returnHref)}
            className="h-12 rounded-lg bg-[#7849ff] px-6 text-[16px] font-semibold text-white hover:bg-[#6838e8]"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
