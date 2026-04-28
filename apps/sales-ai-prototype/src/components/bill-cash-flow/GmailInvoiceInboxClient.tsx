"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState, type CSSProperties } from "react";
import { InvoiceEmailPreviewCard } from "@/components/bill-cash-flow/InvoiceEmailPreviewCard";
import {
  buildInvoiceEmailMessageFromSnapshot,
  buildInvoiceEmailSubjectFromSnapshot,
} from "@/components/bill-cash-flow/invoiceEmailCopy";
import { INVOICE_SENT_STORAGE_KEY, type InvoiceSentSnapshot } from "@/components/bill-cash-flow/invoiceSentSnapshot";
import { useInvoiceSent } from "@/components/bill-cash-flow/InvoiceSentContext";

/** All chrome icons come from Figma exports in `public/icons/gmail/` (see repo layout). */
const I = "/icons/gmail";

const SALES_FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const PROTOTYPE_SENDER = {
  name: "Liam Parker",
  email: "foxglovestudios@post.xero.com",
  initials: "LP",
};

function GmailIconButton({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <button type="button" className={`flex size-10 items-center justify-center rounded-full hover:bg-[rgba(0,10,30,0.04)] ${className}`} aria-label={label}>
      <img src={src} alt="" className="size-5 object-contain" />
    </button>
  );
}

function NavRow({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <div
      className={`flex cursor-default items-center gap-3 rounded-r-full py-1.5 pl-3 pr-4 text-[13px] ${
        active ? "bg-[#d3e3fd] font-bold text-[#333]" : "text-[#414244]"
      }`}
    >
      <img src={icon} alt="" className="size-5 shrink-0 object-contain opacity-80" />
      <span>{label}</span>
    </div>
  );
}

export function GmailInvoiceInboxClient() {
  const { snapshot: ctxSnapshot } = useInvoiceSent();
  const [snapshot, setSnapshot] = useState<InvoiceSentSnapshot | null>(null);

  useLayoutEffect(() => {
    if (ctxSnapshot) {
      setSnapshot(ctxSnapshot);
      return;
    }
    try {
      const raw = sessionStorage.getItem(INVOICE_SENT_STORAGE_KEY);
      if (!raw) return;
      setSnapshot(JSON.parse(raw) as InvoiceSentSnapshot);
    } catch {
      /* ignore */
    }
  }, [ctxSnapshot]);

  const subject = useMemo(() => (snapshot ? buildInvoiceEmailSubjectFromSnapshot(snapshot) : ""), [snapshot]);
  const message = useMemo(() => (snapshot ? buildInvoiceEmailMessageFromSnapshot(snapshot) : ""), [snapshot]);

  if (!snapshot) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f2f3f4] px-6 text-center" style={SALES_FONT}>
        <p className="max-w-md text-[16px] text-[#000a1e]">No invoice email data yet.</p>
        <p className="max-w-md text-[15px] text-[#59606d]">
          Send an invoice from New Invoice first, then open this page from the sent invoice banner.
        </p>
        <Link
          href="/sales/new-invoice"
          className="rounded-[3px] bg-[#0078C8] px-5 py-2.5 text-[15px] font-bold text-white hover:bg-[#005fa3]"
        >
          Create another invoice
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fc] text-[#333]" style={SALES_FONT}>
      {/* Top bar — aligned to Pay-to-Bank Gmail frame */}
      <header className="flex h-[69px] shrink-0 items-center justify-between border-b border-[#e8eaed] bg-white px-5">
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-14">
          <div className="flex items-center gap-3">
            <GmailIconButton src={`${I}/Hamburger.svg`} label="Main menu" />
            <div className="flex items-center gap-2">
              <img src={`${I}/Gmail.svg`} alt="" className="h-5 w-auto" />
              <span className="hidden text-[19px] font-semibold tracking-tight text-[#64686c] sm:inline">Gmail</span>
            </div>
          </div>
          <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-lg bg-[#eaf1fb] px-4 py-2.5 md:flex md:max-w-[640px]">
            <img src={`${I}/Search-Icon.svg`} alt="" className="size-4 shrink-0 object-contain opacity-70" />
            <span className="truncate text-[14px] font-semibold text-[#757575]">Search mail</span>
            <img src={`${I}/Settings.svg`} alt="" className="ml-auto size-4 shrink-0 object-contain opacity-70" aria-hidden />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <GmailIconButton src={`${I}/Help-Icon.svg`} label="Help" className="hidden sm:flex" />
          <GmailIconButton src={`${I}/Settings-Icon.svg`} label="Settings" />
          <GmailIconButton src={`${I}/Menu-Apps-Icon.svg`} label="Google apps" />
          <button type="button" className="ml-1 flex size-9 items-center justify-center overflow-hidden rounded-full" aria-label="Account">
            <img src={`${I}/Profile-Pic.svg`} alt="" className="size-9 object-cover" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Left rail */}
        <aside className="hidden w-[225px] shrink-0 flex-col border-r border-[#e8eaed] bg-white pt-2 md:flex">
          <button
            type="button"
            className="mx-2 mb-4 flex h-[50px] w-[124px] items-center justify-center gap-2 rounded-[10px] bg-[#c3e7ff] text-[13px] font-semibold text-[#4f4f4f]"
          >
            <img src={`${I}/Write.svg`} alt="" className="size-4 object-contain" />
            Compose
          </button>
          <nav className="flex flex-col gap-0.5 pr-2 text-[13px]">
            <NavRow icon={`${I}/baseline-inbox-24px.svg`} label="Inbox" active />
            <NavRow icon={`${I}/ic_star_24px.svg`} label="Starred" />
            <NavRow icon={`${I}/Send-Email.svg`} label="Sent" />
            <NavRow icon={`${I}/ic_keyboard_arrow_down_48px.svg`} label="More" />
          </nav>
          <p className="mt-6 px-3 text-[15px] font-semibold text-[#313234]">Labels</p>
          <div className="mt-2 flex flex-col gap-1 px-2">
            <NavRow icon={`${I}/Shape.svg`} label="Team" />
            <NavRow icon={`${I}/Shape.svg`} label="Categories" />
          </div>
        </aside>

        {/* Main reading pane */}
        <main className="min-w-0 flex-1 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8eaed] px-4 py-3 pl-5">
            <div className="flex items-center gap-3">
              <img src={`${I}/Reply.svg`} alt="" className="h-4 w-auto object-contain opacity-80" aria-hidden />
              <img src={`${I}/Print.svg`} alt="" className="hidden h-4 w-auto object-contain opacity-80 sm:block" aria-hidden />
              <img src={`${I}/Favorite.svg`} alt="" className="h-4 w-auto object-contain opacity-80" aria-hidden />
              <img src={`${I}/More_Vertical.svg`} alt="" className="h-4 w-auto object-contain opacity-80" aria-hidden />
            </div>
            <div className="flex items-center gap-4 text-[10px] font-medium text-[#818488]">
              <span>1 of 264</span>
              <div className="flex items-center gap-3">
                <img src={`${I}/Arrow-Left.svg`} alt="" className="h-2.5 w-auto object-contain" aria-hidden />
                <img src={`${I}/Arrow-Right.svg`} alt="" className="h-2.5 w-auto object-contain" aria-hidden />
              </div>
            </div>
          </div>

          <div className="border-b border-[#e8eaed] px-5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="min-w-0 max-w-[85%] text-[18px] font-normal leading-snug tracking-tight text-[#313234]">{subject}</h1>
              <span className="inline-flex shrink-0 items-center rounded bg-[#e0e0e0] px-2 py-0.5 text-[11px] font-medium text-[#666]">
                Inbox
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ee99a3] text-[15px] font-bold uppercase text-[#4d1219]">
                  {PROTOTYPE_SENDER.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-[#353638]">
                    {PROTOTYPE_SENDER.name}{" "}
                    <span className="text-[12px] font-normal text-[#757575]">&lt;{PROTOTYPE_SENDER.email}&gt;</span>
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[12px] font-medium text-[#818488]">
                    <span>to me</span>
                    <img src={`${I}/Dropdown-arrow.svg`} alt="" className="size-2 object-contain opacity-70" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-medium text-[#818488]">
                <time dateTime={snapshot.issueDateDisplay}>{snapshot.issueDateDisplay}</time>
                <img src={`${I}/Favorite.svg`} alt="" className="h-3.5 w-auto object-contain opacity-70" aria-hidden />
                <img src={`${I}/More_Vertical.svg`} alt="" className="h-3.5 w-auto object-contain opacity-70" aria-hidden />
              </div>
            </div>
          </div>

          {/* Email body — grey canvas + white card (Figma Email-Layout); card matches Send Email right panel */}
          <div className="bg-[#f4f4f5] px-4 py-10 pb-16">
            <InvoiceEmailPreviewCard
              snapshot={snapshot}
              message={message}
              className="rounded-[3px]"
              payOnlineHref="/online-invoice"
            />
            <p className="mx-auto mt-8 max-w-[580px] text-center text-[13px] font-medium text-[#0078C8]">Powered by Xero</p>
            <div className="mx-auto mt-6 max-w-[580px] text-center">
              <Link href="/sales/new-invoice" className="text-[15px] font-bold text-[#0078C8] hover:underline">
                Create another invoice
              </Link>
            </div>
          </div>
        </main>

        {/* Right app rail (icons only — uses gmail folder exports) */}
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-4 border-l border-[#e8eaed] bg-white py-4 lg:flex">
          <img src={`${I}/Calendar-Icon.svg`} alt="" className="size-6 object-contain opacity-70" />
          <img src={`${I}/${encodeURIComponent("Note Taker Iocn.svg")}`} alt="" className="size-6 object-contain opacity-70" />
          <img src={`${I}/Contact-Icon.svg`} alt="" className="size-6 object-contain opacity-70" />
          <img src={`${I}/Plus-Icon.svg`} alt="" className="size-6 object-contain opacity-70" />
        </aside>
      </div>
    </div>
  );
}
