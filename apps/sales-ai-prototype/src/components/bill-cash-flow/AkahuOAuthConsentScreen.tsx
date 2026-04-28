"use client";

import type { CSSProperties, ReactNode } from "react";
import { INVOICE_EMAIL_ORG_NAME } from "@/components/bill-cash-flow/invoiceEmailCopy";

const OAUTH_XERO_LOGO = "/icons/OAuth-Xero-Logo.svg";
const OAUTH_ORG_INFO = "/icons/OAuth-Org-Info.svg";
const OAUTH_LANYARD = "/icons/OAuth-Lanyard.svg";

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

/** Matches Pay-to-Bank playground OAuth consent (Figma node 236:8025). */
const OAUTH_USER_DISPLAY_NAME = "Alex Driver";

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 text-[13px] leading-5 text-[#000a1e]">
      <span className="shrink-0" aria-hidden>
        •
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  );
}

export type AkahuOAuthConsentScreenProps = {
  processing: boolean;
  onAllow: () => void;
  onCancel: () => void;
};

/** Full-viewport OAuth consent (`/sales/new-invoice/oauth`). White background, centered column. */
export function AkahuOAuthConsentScreen({ processing, onAllow, onCancel }: AkahuOAuthConsentScreenProps) {
  return (
    <main
      className="min-h-screen w-full bg-white"
      style={FONT}
      aria-busy={processing}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col items-center px-[37px] pb-12 pt-[43px]">
        <div className="flex w-full max-w-[300px] flex-col items-center gap-0">
          <img src={OAUTH_XERO_LOGO} alt="Xero" width={60} height={60} className="size-[60px] shrink-0 object-contain" />
          <h1 className="mt-10 max-w-[300px] text-center text-[17px] leading-[30px] text-[#000a1e]">
            <span className="font-bold">Akahu Pay by Bank </span>
            <span className="font-normal">wants access to:</span>
          </h1>
        </div>

        <div className="mt-6 h-0.5 w-full max-w-[299px] shrink-0 bg-[#ccced2]" aria-hidden />

        <section className="mt-6 flex w-full max-w-[300px] flex-col gap-3">
          <h2 className="text-[15px] font-bold leading-6 text-[#000a1e]">Organisation data</h2>
          <div className="flex gap-3">
            <img
              src={OAUTH_ORG_INFO}
              alt=""
              width={36}
              height={45}
              className="mt-0.5 h-[45px] w-9 shrink-0 object-contain object-left-top"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-[13px] font-bold leading-5 text-[#000a1e]">{INVOICE_EMAIL_ORG_NAME}</p>
              <p className="text-[13px] leading-5 text-[#000a1e]">View your:</p>
              <div className="space-y-1 pl-0">
                <Bullet>Organisation details</Bullet>
                <Bullet>Bank accounts</Bullet>
                <Bullet>Contacts</Bullet>
                <Bullet>Invoices</Bullet>
              </div>
              <p className="pt-1 text-[13px] leading-5 text-[#000a1e]">View and manage your:</p>
              <div className="space-y-1">
                <Bullet>Reconciliation</Bullet>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 flex w-full max-w-[300px] flex-col gap-3">
          <h2 className="text-[15px] font-bold leading-6 text-[#000a1e]">User account information</h2>
          <div className="flex gap-3">
            <img
              src={OAUTH_LANYARD}
              alt=""
              width={36}
              height={45}
              className="mt-0.5 h-[45px] w-9 shrink-0 object-contain object-left-top"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-[13px] font-bold leading-5 text-[#000a1e]">{OAUTH_USER_DISPLAY_NAME}</p>
              <p className="text-[13px] leading-5 text-[#000a1e]">View your name, email, and user profile</p>
            </div>
          </div>
        </section>

        <div className="mt-6 flex w-full max-w-[300px] flex-col gap-5">
          <div className="h-px w-full bg-[#ccced2]" />
          <div className="text-[11px] leading-4 text-[#000a1e]">
            <p>
              By allowing access, you agree to the transfer of your data between Xero and this application in accordance with
              Xero&apos;s{" "}
              <a href="#" className="text-[#0078c8] no-underline hover:underline" onClick={(e) => e.preventDefault()}>
                Terms of use
              </a>{" "}
              and the application provider&apos;s terms of use and{" "}
              <a href="#" className="text-[#0078c8] no-underline hover:underline" onClick={(e) => e.preventDefault()}>
                privacy policy
              </a>
              .
            </p>
            <p className="mt-3">
              You can disconnect at any time by going to{" "}
              <a href="#" className="text-[#0078c8] no-underline hover:underline" onClick={(e) => e.preventDefault()}>
                Connected apps
              </a>{" "}
              in your Xero settings.
            </p>
          </div>

          <div className="flex w-full flex-col gap-0">
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center rounded-[3px] bg-[#0078c8] text-[15px] font-bold leading-4 text-white hover:bg-[#005fa3] disabled:cursor-wait disabled:opacity-90"
              onClick={onAllow}
              disabled={processing}
              aria-busy={processing}
            >
              {processing ? (
                <span className="sales-processing-circles flex items-center justify-center gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
              ) : (
                "Allow access"
              )}
            </button>
            <button
              type="button"
              className="mt-3 flex h-10 w-full items-center justify-center rounded-[3px] text-[15px] font-bold leading-4 text-[#0078c8] hover:bg-[#f5f9fc] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onCancel}
              disabled={processing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
