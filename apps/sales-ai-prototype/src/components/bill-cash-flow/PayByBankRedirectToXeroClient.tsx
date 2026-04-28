"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type CSSProperties } from "react";

const AKAHU_LOGO = "/Akahu-logo-pill.svg";
const PAID_PATH = "/online-invoice/pay-by-bank/paid";
const REDIRECT_MS = 5_000;

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

/** Bridge after bank approval: brief “back to Xero” message, then auto-open Paid confirmation. */
export function PayByBankRedirectToXeroClient() {
  const router = useRouter();

  useEffect(() => {
    const id = window.setTimeout(() => {
      router.replace(PAID_PATH);
    }, REDIRECT_MS);
    return () => window.clearTimeout(id);
  }, [router]);

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

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 pb-24 pt-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={AKAHU_LOGO}
            alt="Akahu"
            width={160}
            height={48}
            className="h-12 w-auto max-w-[200px] object-contain object-center"
          />
          <h1 className="mt-10 text-[22px] font-bold leading-tight text-black">Redirecting back to Xero</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-black">
            If you have not been redirected,{" "}
            <Link href={PAID_PATH} className="underline">
              click here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
