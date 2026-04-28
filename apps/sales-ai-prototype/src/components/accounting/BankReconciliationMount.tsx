"use client";

import Link from "next/link";
import { useRegion } from "../../../prototypes/payments-agents/src/app/contexts/RegionContext";
import { getBankAccountData } from "../../../prototypes/payments-agents/src/app/lib/RegionContent";

/** Aligns with main white table: 1200px content width inside max-w + horizontal padding */
const PAGE_CONTENT = "mx-auto w-full max-w-[1248px] px-6";

/** Downward chevron (XUI-style caret) for buttons — use currentColor for fill */
function XuiCaretDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Bank reconciliation — title bar matches New Invoice / Sales shell (h-[78px], breadcrumbs, 24px title).
 * Account summary + tabs + rows follow Figma node 219:4001 (Pay-to-Bank playground).
 * @see https://www.figma.com/design/kIpuIoYVB9alCwv50O5dpF/Pay-to-Bank---Palyground?node-id=219-4001
 */
export function BankReconciliationMount() {
  const { region } = useRegion();
  const bank = getBankAccountData("everydaySavings", region);

  const statement = bank?.statementBalance ?? "5,000.00";
  const xeroBal = bank?.balanceInXero ?? "4,000.00";
  const accountTitle = bank?.accountName ?? "Business Bank Account";
  const accountNumber = bank?.accountNumber ?? "06-0199-0176756-00";

  return (
    <div className="min-h-screen bg-white">
      {/* Title bar — full-bleed background; breadcrumbs + title aligned to PAGE_CONTENT */}
      <div className="w-full border-b border-[#e1e2e5] bg-white">
        <div className={`flex h-[78px] items-end justify-between gap-4 pb-3 ${PAGE_CONTENT}`}>
          <div className="min-w-0 flex-1 pb-0">
            <nav className="mb-1.5 flex items-center gap-1 text-[13px]" aria-label="Breadcrumb">
              <Link href="/" className="text-[#0078C8] hover:underline">
                Bank Accounts
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="mt-0 text-[24px] font-bold leading-[115%] text-[#000a1e]">{accountTitle}</h1>
              <span className="text-[24px] font-normal leading-[115%] text-[#000a1e] tabular-nums">{accountNumber}</span>
              <button
                type="button"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[#59606d] hover:bg-[#f4f5f7]"
                aria-label="Switch account"
              >
                <img src="/Caret.svg" alt="" className="size-3" width={12} height={12} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account overview strip — white; no bottom border; equal vertical padding */}
      <div className="w-full bg-white">
        <div className={`flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6 ${PAGE_CONTENT}`}>
          <div className="flex flex-wrap items-start gap-8">
            <img
              src="/ANZ-logo.svg"
              alt="ANZ"
              width={108}
              height={36}
              className="h-9 w-[108px] shrink-0 object-contain object-left"
            />
            <div className="flex flex-wrap gap-10">
              <div className="text-center sm:text-left">
                <p className="text-[21px] font-bold leading-[35px] text-[#000a1e] tabular-nums">{statement}</p>
                <p className="text-[13px] leading-5 text-[#59606d]">Statement balance</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[21px] font-bold leading-[35px] text-[#000a1e] tabular-nums">{xeroBal}</p>
                <p className="text-[13px] leading-5 text-[#657483]">
                  Xero balance –{" "}
                  <button type="button" className="text-[#0078C8] underline decoration-solid hover:no-underline">
                    Different?
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-col items-end gap-1 text-right">
              <p className="text-[13px] leading-5 text-[#404756]">11 Oct 2020</p>
              <button type="button" className="text-[13px] leading-5 text-[#0078C8] underline decoration-solid hover:no-underline">
                Reconciliation Report
              </button>
            </div>
            <button
              type="button"
              className="inline-flex h-8 min-w-[140px] shrink-0 items-center gap-1 rounded-[3px] border border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
            >
              <span>Manage Account</span>
              <XuiCaretDown className="h-[6px] w-[10px] shrink-0 text-[#0078C8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content — white table (same column as title + account strip) */}
      <div className={`pb-12 pt-0 ${PAGE_CONTENT}`}>
        {/* Bank Rec / Tabs — Figma: 60px row, Reconcile (selected) + Cash coding + Bank statements + Account transactions */}
        <div className="overflow-hidden rounded-tl-[3px] rounded-tr-[3px] border border-[#ccced2] border-b-0 bg-white">
          <div className="relative flex h-[60px] items-center border-b border-[#ccced2]">
            <div className="flex min-h-0 flex-1 items-stretch overflow-x-auto">
              {[
                { id: "reconcile", label: "Reconcile (136)", selected: true },
                { id: "cash", label: "Cash coding", selected: false },
                { id: "statements", label: "Bank statements", selected: false },
                { id: "tx", label: "Account transactions", selected: false },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`relative flex shrink-0 flex-col items-center justify-center px-5 py-[18px] text-[15px] leading-6 ${
                    tab.selected ? "text-[#0078C8] shadow-[inset_0_-3px_0_0_#0078c8]" : "text-[#000a1e] hover:bg-[#fafafa]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10 border border-t-0 border-[#ccced2] bg-[#ecf2f6] p-6">
          <ReconciliationRowFigma
            statementLines={[
              "8 Apr 2026",
              "Bayside Wholesale",
              "Safer A2A - 123456",
              "Payment for Invoice INV-01234",
            ]}
            spent=""
            received="4,000.00"
            matchLines={["10 Sep 2020", "Hamilton Smith Ltd", "Ref: INV-0029"]}
            matchSpent="15.75"
            matchReceived=""
            widgetPanel="match"
          />
          <ReconciliationRowFigma
            statementLines={["8 Apr 2026", "Bayside Wholesale", "Eft"]}
            spent="15.75"
            received=""
            matchLines={["10 Sep 2020", "Hamilton Smith Ltd", "Ref: INV-0029"]}
            matchSpent="15.75"
            matchReceived=""
            widgetPanel="discuss"
          />
        </div>

        <div className="mt-0 border border-[#ccced2] border-t-0 bg-[#dbe2e8] p-5">
          <div className="flex min-h-[40px] flex-col overflow-hidden rounded-[2px] border border-[#b8bcc2] bg-[#edf0f2] sm:flex-row sm:items-stretch">
            <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-[13px] leading-5 text-[#59606d]">
              <p className="mb-0">Page 1 of 3 (24 items to be reconciled)</p>
              <button type="button" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#404756]">
                <span>Jump to page</span>
                <span className="text-[#0078C8]">10</span>
                <XuiCaretDown className="h-[6px] w-[10px] shrink-0 text-[#0078C8]" />
              </button>
            </div>
            <div className="flex items-center gap-2 border-t border-[#b8bcc2] px-4 py-2 text-[13px] leading-5 text-[#59606d] sm:border-l sm:border-t-0">
              <input
                type="checkbox"
                checked
                readOnly
                aria-label="Suggest previous entries"
                className="size-4 accent-[#0078C8]"
              />
              <span>Suggest previous entries</span>
            </div>
            <button
              type="button"
              className="h-full border-t border-[#b8bcc2] px-5 py-2 text-[13px] font-bold text-[#0078C8] hover:bg-[#e4e8eb] sm:border-l sm:border-t-0"
            >
              Next &rsaquo;
            </button>
            <button
              type="button"
              className="h-full border-t border-[#b8bcc2] px-5 py-2 text-[13px] font-bold text-[#0078C8] hover:bg-[#e4e8eb] sm:border-l sm:border-t-0"
            >
              End &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReconciliationRowFigma({
  statementLines,
  spent,
  received,
  matchLines,
  matchSpent,
  matchReceived,
  widgetPanel,
}: {
  statementLines: string[];
  spent: string;
  received: string;
  matchLines: string[];
  matchSpent: string;
  matchReceived: string;
  widgetPanel: "match" | "discuss";
}) {
  const optionsRow = (
    <div className="flex h-10 min-h-10 shrink-0 items-center justify-end">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0078C8] hover:underline"
      >
        Options
        <XuiCaretDown className="h-[6px] w-[10px] shrink-0 text-[#0078C8]" />
      </button>
    </div>
  );

  const widgetTabRow = (
    <div className="relative min-h-10 bg-[#ecf2f6] border-b border-[#e1e2e5]">
      <div className="flex min-h-0 flex-wrap items-center pr-[120px]">
        {(["Match", "Create", "Transfer", "Discuss"] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`relative shrink-0 px-5 py-2 text-[15px] leading-6 ${
              (widgetPanel === "match" && t === "Match") || (widgetPanel === "discuss" && t === "Discuss")
                ? "text-[#0078C8] shadow-[inset_0_-3px_0_0_#0078c8]"
                : "text-[#000a1e] hover:bg-[#dfe9f0]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="absolute right-1 top-1">
        <button type="button" className="px-3 py-1.5 text-[13px] font-bold text-[#0078C8] hover:bg-[#dfe9f0]">
          Find &amp; Match
        </button>
      </div>
    </div>
  );

  const widgetBody =
    widgetPanel === "discuss" ? (
      <div className="space-y-3 rounded-b-[2px] border border-t-0 border-[#ccced2] bg-white p-4">
        <div>
          <label className="mb-1 block text-[13px] font-bold text-[#404756]">Note</label>
          <div className="h-8 rounded-[3px] border border-[#A6A9B0] bg-white px-3 py-1.5 text-[13px] text-[rgba(0,10,30,0.65)]" />
        </div>
        <button
          type="button"
          className="inline-flex rounded-[3px] border border-[#A6A9B0] bg-white px-3 py-1.5 text-[13px] font-bold text-[#0078C8] hover:bg-[#f5f5f5]"
        >
          Save
        </button>
      </div>
    ) : (
      <div className="rounded-b-[2px] border border-t-0 border-[#ccced2] bg-[#c2f3e1]">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <img src="/icons/Invoice-Arrow.svg" alt="" className="h-[26px] w-4 shrink-0" width={16} height={26} aria-hidden />
              <span className="text-[13px] font-bold text-[#000a1e]">Match</span>
            </div>
            <div className="mt-3 text-[15px] leading-6 text-[#404756]">
              {matchLines.map((line) => (
                <p key={line} className="mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-full shrink-0 sm:w-[240px]">
            <div className="relative w-1/2 border-l border-[#A6A9B0] px-4 py-2 text-right">
              <p className="text-[11px] leading-4 text-[#404756]">Spent</p>
              <p className="mt-2 text-[15px] font-bold leading-6 text-[#000a1e] tabular-nums">{matchSpent}</p>
            </div>
            <div className="relative w-1/2 border-l border-[#A6A9B0] px-4 py-2 text-right">
              <p className="text-[11px] leading-4 text-[#404756]">Received</p>
              <p className="mt-2 text-[15px] font-bold leading-6 text-[#000a1e] tabular-nums">{matchReceived || "\u00a0"}</p>
            </div>
          </div>
        </div>
      </div>
    );

  const statementCard = (
    <div className="overflow-hidden rounded-[3px] border border-[#ccced2] bg-white">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1 px-4 py-3">
          <div className="text-[15px] leading-6 text-[#000a1e]">
            {statementLines.map((line, i) => (
              <p key={`${i}-${line}`} className={`mb-0 last:mb-0 ${i === 1 ? "font-bold" : ""}`}>
                {line}
              </p>
            ))}
          </div>
          <button
            type="button"
            className="mt-2 block w-fit px-0 text-left text-[13px] font-bold text-[#0078C8] hover:underline"
          >
            More details
          </button>
        </div>
        <div className="flex w-full shrink-0 border-t border-[#ccced2] sm:w-[240px] sm:border-l sm:border-t-0 sm:border-[#ccced2]">
          <div className="relative z-0 w-1/2 border-r border-[#ccced2] px-4 py-2 text-right">
            <p className="text-[11px] leading-4 text-[#404756]">Spent</p>
            <p className="mt-2 text-[15px] font-normal leading-6 text-[#000a1e] tabular-nums">{spent || "\u00a0"}</p>
          </div>
          <div className="relative z-0 w-1/2 px-4 py-2 text-right">
            <p className="text-[11px] leading-4 text-[#404756]">Received</p>
            <p className="mt-2 text-[15px] font-normal leading-6 text-[#000a1e] tabular-nums">{received || "\u00a0"}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 pt-3 lg:flex-row lg:items-stretch lg:gap-4 lg:pt-10">
      {/* Left: Options + statement card — content from top */}
      <div className="flex min-w-0 flex-1 flex-col gap-0">
        {optionsRow}
        {statementCard}
      </div>

      {/* OK — only this column centers the button on the row height; siblings stay top-aligned */}
      <div className="flex shrink-0 items-center justify-center self-stretch lg:w-10">
        <button
          type="button"
          className="inline-flex min-h-[32px] min-w-[40px] items-center justify-center rounded-[3px] bg-[#0078C8] px-3 py-1.5 text-[13px] font-bold text-white hover:bg-[#006bb3]"
        >
          OK
        </button>
      </div>

      {/* Widget: tab row aligns with Options row; body below */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {widgetTabRow}
        {widgetBody}
      </div>
    </div>
  );
}
