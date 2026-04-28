"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState, type CSSProperties } from "react";
import { INVOICE_EMAIL_ORG_NAME } from "@/components/bill-cash-flow/invoiceEmailCopy";
import { INVOICE_SENT_STORAGE_KEY, type InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";
import { PAY_BANK_OPTIONS } from "@/components/bill-cash-flow/payBankConfig";

const ICONS = "/icons";
const GMAIL = "/icons/gmail";
const EMAIL = "/icons/email";
/** Xero product blue (matches online-invoice CTAs). */
const XERO_BLUE = "#0078C8";

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export function PayByBankClient() {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<InvoiceSentSnapshot | null>(null);
  const [bank, setBank] = useState("");

  useLayoutEffect(() => {
    try {
      const raw = sessionStorage.getItem(INVOICE_SENT_STORAGE_KEY);
      if (!raw) return;
      setSnapshot(JSON.parse(raw) as InvoiceSentSnapshot);
    } catch {
      /* ignore */
    }
  }, []);

  if (!snapshot) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center" style={FONT}>
        <p className="max-w-md text-[16px] text-[#000a1e]">No invoice data.</p>
        <Link href="/online-invoice" className="text-[15px] font-bold text-[#0078C8] hover:underline">
          Back to invoice
        </Link>
      </div>
    );
  }

  const canContinue = bank.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-white" style={FONT}>
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e1e2e5] bg-white px-4">
        <Link
          href="/online-invoice"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#000a1e] hover:text-[#0078C8]"
        >
          <img src={`${GMAIL}/Arrow-Left.svg`} alt="" className="size-5 object-contain" width={20} height={20} />
          Pay by bank
        </Link>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-[22px] leading-none text-[#59606d] hover:bg-[rgba(0,10,30,0.06)]"
          onClick={() => router.push("/online-invoice")}
          aria-label="Close"
        >
          ×
        </button>
      </header>

      {/* Hero */}
      <div className="px-4 pb-10 pt-8" style={{ backgroundColor: XERO_BLUE }}>
        <div className="mx-auto flex max-w-md items-center justify-center gap-0">
          <div className="flex size-[64px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <img src={`${EMAIL}/Xero-logo-new.svg`} alt="Xero" className="h-[15px] w-auto object-contain" height={15} width={50} />
          </div>
          <div className="mx-1 h-0 min-w-[32px] flex-1 max-w-[72px] border-t-2 border-dashed border-white/80" aria-hidden />
          <div className="flex size-[56px] shrink-0 items-center justify-center rounded-full bg-[#1a1d21] shadow-sm">
            <img
              src={`${ICONS}/Bank.svg`}
              alt=""
              className="size-11 object-contain brightness-0 invert"
              width={44}
              height={44}
            />
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-md text-center text-[15px] font-medium leading-snug text-white">
          {INVOICE_EMAIL_ORG_NAME} is requesting payment
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-28 pt-8">
        <div className="mx-auto w-full max-w-md">
          <p className="text-center text-[0] text-[#000a1e]">
            <span className="text-[32px] font-bold leading-none tabular-nums">{snapshot.totalFormatted}</span>
            <span className="text-[20px] font-semibold text-[#404756]"> {snapshot.currencyCode}</span>
          </p>

          <div className="relative mt-8">
            <select
              id="pay-bank-select"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="h-12 w-full appearance-none rounded-[3px] border border-[#ccced2] bg-white pl-3 pr-10 text-[15px] text-[#000a1e] outline-none focus:border-[#0078C8] focus:ring-2 focus:ring-[#0078C8]/25"
            >
              <option value="">Select your bank</option>
              {PAY_BANK_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            <img
              src={`${GMAIL}/Dropdown-arrow.svg`}
              alt=""
              className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2 object-contain opacity-70"
              width={12}
              height={12}
            />
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-[#59606d]">
            By clicking <span className="font-bold text-[#000a1e]">Continue</span>, you agree to Xero initiating the payment described above, and
            agree to Akahu&apos;s{" "}
            <a href="#" className="font-bold text-[#0078C8] underline" onClick={(e) => e.preventDefault()}>
              Privacy Notice
            </a>{" "}
            and{" "}
            <a href="#" className="font-bold text-[#0078C8] underline" onClick={(e) => e.preventDefault()}>
              End User Terms
            </a>
            .
          </p>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!canContinue}
              className={`inline-flex items-center gap-1 rounded-[4px] px-5 py-2.5 text-[15px] font-bold transition-colors ${
                canContinue
                  ? "bg-[#0078C8] text-white hover:bg-[#005fa3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
                  : "cursor-not-allowed bg-[#e6e7e9] text-[#8c919a]"
              }`}
              onClick={() => {
                if (!canContinue) return;
                router.push(`/online-invoice/pay-by-bank/connect?bank=${encodeURIComponent(bank)}`);
              }}
            >
              Continue
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#e1e2e5] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-md items-center justify-center gap-2 text-center text-[12px] text-[#59606d]">
          <img src={`${ICONS}/Info.svg`} alt="" className="size-4 shrink-0 object-contain opacity-80" width={16} height={16} />
          <span>
            This payment is enabled by Akahu.{" "}
            <a href="#" className="text-[#0078C8] underline" onClick={(e) => e.preventDefault()}>
              Learn more
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
