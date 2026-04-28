"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import {
  getPayBankMeta,
  parsePayBankId,
  PAY_BANK_LOGO_SRC,
} from "@/components/bill-cash-flow/payBankConfig";

const ICONS = "/icons";
const WAITING_MS = 10_000;

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

/** Vibrant cyan primary on this step (per design reference). */
const SUBMIT_CYAN = "#13B5EA";
const SPINNER_CYAN = "#13B5EA";

function PayBankArcSpinner({ className = "" }: { className?: string }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const arcLen = (270 / 360) * c;
  const gap = c - arcLen;
  return (
    <div
      className={`pay-bank-arc-spinner flex justify-center ${className}`}
      role="status"
      aria-label="Waiting for approval"
    >
      <svg width={88} height={88} viewBox="0 0 64 64" fill="none" aria-hidden>
        <circle
          cx={32}
          cy={32}
          r={r}
          stroke={SPINNER_CYAN}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${gap}`}
          transform="rotate(-90 32 32)"
        />
      </svg>
    </div>
  );
}

export function PayByBankConnectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawBank = searchParams.get("bank");
  const bankId = parsePayBankId(rawBank);

  const [mobile, setMobile] = useState("");
  const [phase, setPhase] = useState<"form" | "waiting">("form");

  useEffect(() => {
    if (rawBank && !bankId) {
      router.replace("/online-invoice/pay-by-bank");
    }
  }, [rawBank, bankId, router]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const id = window.setTimeout(() => {
      router.replace("/online-invoice/pay-by-bank/redirect");
    }, WAITING_MS);
    return () => window.clearTimeout(id);
  }, [phase, router]);

  if (!bankId) {
    return <div className="min-h-screen bg-white" style={FONT} />;
  }

  const meta = getPayBankMeta(bankId);
  const { label, mobileAppName } = meta;
  const appPhrase = `${mobileAppName} app`;
  const canSubmit = mobile.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-white" style={FONT}>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e1e2e5] bg-white px-4">
        <span className="text-[16px] font-bold text-[#000a1e]">Pay by bank</span>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-[22px] leading-none text-[#59606d] hover:bg-[rgba(0,10,30,0.06)]"
          onClick={() => router.push("/online-invoice")}
          aria-label="Close"
        >
          ×
        </button>
      </header>

      {phase === "form" ? (
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-16 pt-10">
          <div className="flex h-[60px] w-full items-center justify-center">
            <img
              src={PAY_BANK_LOGO_SRC[bankId]}
              alt={label}
              className="h-[60px] w-auto max-w-[min(100%,240px)] object-contain"
              height={60}
            />
          </div>

          <h1 className="mt-8 text-center text-[22px] font-bold leading-tight text-[#000a1e]">Connecting with {label}</h1>

          <p className="mt-4 text-center text-[15px] leading-relaxed text-[#59606d]">
            Please enter the mobile number you have registered with {mobileAppName}
          </p>

          <label htmlFor="pay-bank-mobile" className="sr-only">
            Mobile number
          </label>
          <input
            id="pay-bank-mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-6 h-12 w-full rounded-[6px] border border-[#ccced2] px-3 text-[15px] text-[#000a1e] outline-none placeholder:text-[#8c919a] focus:border-[#0078C8] focus:ring-2 focus:ring-[#0078C8]/20"
          />

          <button
            type="button"
            disabled={!canSubmit}
            className={`relative mt-6 w-full rounded-[6px] py-3.5 text-[16px] font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              canSubmit ? "text-white" : "cursor-not-allowed bg-[#e6e7e9] text-[#8c919a]"
            }`}
            style={canSubmit ? { backgroundColor: SUBMIT_CYAN } : undefined}
            onClick={() => {
              if (!canSubmit) return;
              setPhase("waiting");
            }}
          >
            <span className="block text-center">Submit</span>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl leading-none" aria-hidden>
              ›
            </span>
          </button>

          <p className="mt-6 text-center text-[13px] leading-relaxed text-[#59606d]">
            After submitting, you should receive a notification from the {mobileAppName} app to confirm this request.
          </p>

          <p className="mt-8 text-center text-[13px] leading-relaxed text-[#59606d]">
            Alternatively, complete the connection flow on this device,{" "}
            <a href="#" className="font-medium text-[#0078C8] underline" onClick={(e) => e.preventDefault()}>
              Redirect to {label}
            </a>
          </p>
        </main>
      ) : (
        <main
          className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 pb-16 pt-6"
          aria-live="polite"
        >
          <div className="flex w-full flex-col items-center text-center">
            <div className="flex h-[60px] w-full items-center justify-center">
              <img
                src={PAY_BANK_LOGO_SRC[bankId]}
                alt={label}
                className="h-[60px] w-auto max-w-[min(100%,240px)] object-contain"
                height={60}
              />
            </div>

            <h1 className="mt-8 max-w-[320px] text-[22px] font-bold leading-tight text-[#000a1e]">
              Approve your request in the {appPhrase}
            </h1>

            <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-[#59606d]">
              You should receive a notification from the {appPhrase}. If you don&apos;t receive a notification, you may need to
              open the app manually.
            </p>

            <PayBankArcSpinner className="mt-8" />

            <p className="mt-8 text-[15px] text-[#59606d]">
              Didn&apos;t receive anything?{" "}
              <button
                type="button"
                className="font-medium text-[#0078C8] underline"
                onClick={() => {
                  /* prototype */
                }}
              >
                Resend
              </button>
            </p>

            <button
              type="button"
              className="mt-10 flex items-center gap-2 text-[13px] text-[#8c919a] hover:text-[#59606d]"
              onClick={() => {
                /* prototype */
              }}
            >
              <img src={`${ICONS}/Info.svg`} alt="" className="size-4 shrink-0 opacity-80" width={16} height={16} />
              Technical info
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
