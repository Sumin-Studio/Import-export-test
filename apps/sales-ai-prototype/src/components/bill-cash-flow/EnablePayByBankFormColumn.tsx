"use client";

import { createPortal } from "react-dom";
import type { RefObject } from "react";
import { AKAHU_NZ_ACCOUNTS, demoBankAccountNumber, type AkahuNzAccount } from "@/components/bill-cash-flow/akahuNzAccounts";

/** Single source of truth for modal + fullscreen Enable Pay by Bank main column — keep edits here only. */
export const PAY_BY_BANK_BENEFIT_BULLETS = [
  "Instant bank-to-bank transfers from major NZ banks",
  "Lower fees than traditional card payments",
  "Automatic reconciliation in Xero",
] as const;

export type DropdownFlip = {
  contentRef: RefObject<HTMLDivElement | null>;
  positionClass: string;
};

export type EnablePayByBankFormColumnProps = {
  layout: "modal" | "fullscreen";
  bankAccountFieldId: string;
  selected: AkahuNzAccount;
  akahuSelectedAccount: number;
  akahuAccountDropdownOpen: boolean;
  setAkahuAccountDropdownOpen: (open: boolean | ((o: boolean) => boolean)) => void;
  pickSettlementAccount: (i: number) => void;
  akahuAccountRef: RefObject<HTMLDivElement | null>;
  akahuAccountDropdownAnchorRef: RefObject<HTMLDivElement | null>;
  akahuDropdownMenuRef: RefObject<HTMLDivElement | null>;
  akahuAccountFlip: DropdownFlip;
  fullscreenDropdownRect: { top: number; left: number; width: number } | null;
  akahuEnableProcessing: boolean;
  runAkahuEnablePayByBank: () => void;
  onClose: () => void;
};

export function EnablePayByBankFormColumn({
  layout,
  bankAccountFieldId,
  selected,
  akahuSelectedAccount,
  akahuAccountDropdownOpen,
  setAkahuAccountDropdownOpen,
  pickSettlementAccount,
  akahuAccountRef,
  akahuAccountDropdownAnchorRef,
  akahuDropdownMenuRef,
  akahuAccountFlip,
  fullscreenDropdownRect,
  akahuEnableProcessing,
  runAkahuEnablePayByBank,
  onClose,
}: EnablePayByBankFormColumnProps) {
  const bankAccountHintId = `${bankAccountFieldId}-hint`;

  const settlementDropdownMenu =
    layout === "modal" && akahuAccountDropdownOpen ? (
      <div
        ref={akahuAccountFlip.contentRef}
        className={`absolute left-0 z-50 w-full overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)] ${akahuAccountFlip.positionClass}`}
      >
        {AKAHU_NZ_ACCOUNTS.map((acc, i) => (
          <button
            key={acc.label}
            type="button"
            role="option"
            aria-selected={akahuSelectedAccount === i}
            className={`flex h-10 w-full items-center px-4 text-[15px] hover:bg-[#f5f5f5] ${akahuSelectedAccount === i ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`}
            onClick={() => pickSettlementAccount(i)}
          >
            {acc.dropdownDisplay}
          </button>
        ))}
      </div>
    ) : null;

  const settlementDropdownPortal =
    layout === "fullscreen" &&
    akahuAccountDropdownOpen &&
    fullscreenDropdownRect != null &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            ref={akahuDropdownMenuRef}
            role="listbox"
            className="fixed z-[200] overflow-hidden rounded-[3px] border border-[#A6A9B0] bg-white shadow-[0px_3px_6px_rgba(0,0,0,0.2)]"
            style={{
              top: fullscreenDropdownRect.top,
              left: fullscreenDropdownRect.left,
              width: fullscreenDropdownRect.width,
            }}
          >
            {AKAHU_NZ_ACCOUNTS.map((acc, i) => (
              <button
                key={acc.label}
                type="button"
                role="option"
                aria-selected={akahuSelectedAccount === i}
                className={`flex h-10 w-full items-center px-4 text-left text-[15px] hover:bg-[#f5f5f5] ${akahuSelectedAccount === i ? "border-l-[3px] border-l-[#0078C8] text-[#0078C8]" : "border-l-[3px] border-l-transparent text-[#000a1e]"}`}
                onClick={() => pickSettlementAccount(i)}
              >
                {acc.dropdownDisplay}
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {layout === "fullscreen" ? (
        <h2 id="akahu-modal-title" className="text-[30px] font-bold leading-[44px] text-[#1e3145]">
          Enable Pay by Bank
        </h2>
      ) : null}
      <p className={`text-[17px] leading-7 text-[#000a1e] ${layout === "modal" ? "mt-0" : "mt-4"}`}>
        Get paid faster with instant, <strong>fraud-proof</strong> bank-to-bank transfers. Minimise payment errors while enjoying lower fees and seamless reconciliation. It&apos;s a smarter, safer way to manage your cash flow. <strong>Free during beta.</strong>{" "}
        Powered by{" "}
        <img
          src="/Akahu-logo-pill.svg"
          alt="Akahu"
          className="inline-block align-middle"
          style={{ height: "1.2em", width: "auto", verticalAlign: "middle", marginTop: "-0.1em" }}
        />
      </p>

      <div className="mt-5 rounded-[3px] bg-[#f2f8fc] p-3">
        <div className="flex gap-2">
          <img src="/icons/shield.svg" alt="" className="mt-0.5 size-6 shrink-0 object-contain" width={24} height={24} />
          <p className="text-[13px] leading-5 text-[#404756]">
            Akahu helps to initiate the payment directly from the customer&apos;s bank account to your bank account.{" "}
            <a href="#" className="text-[#0078C8] hover:underline" onClick={(e) => e.preventDefault()}>
              Learn more
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-[13px] font-bold leading-5 text-[rgba(0,10,30,0.75)]">Settlement account</label>
        <div className="relative mt-1" ref={akahuAccountRef}>
          <div className="relative w-full" ref={akahuAccountDropdownAnchorRef}>
            <button
              type="button"
              className="flex h-10 w-full items-center justify-between rounded-[3px] border border-[#A6A9B0] bg-white px-[15px] text-[15px] text-[#000a1e] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => setAkahuAccountDropdownOpen((o) => !o)}
              aria-expanded={akahuAccountDropdownOpen}
              aria-haspopup="listbox"
              disabled={akahuEnableProcessing}
            >
              <span className="min-w-0 truncate">{selected.dropdownDisplay}</span>
              <span className="flex size-10 shrink-0 items-center justify-center" aria-hidden>
                <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                  <path
                    d="M5.36029 5.62558C5.16359 5.82999 4.83641 5.82999 4.63971 5.62558L1.4846 2.34669C1.17894 2.02904 1.40406 1.5 1.84489 1.5H8.15511C8.59594 1.5 8.82106 2.02904 8.5154 2.34669L5.36029 5.62558Z"
                    fill="#000A1E"
                  />
                </svg>
              </span>
            </button>
            {settlementDropdownMenu}
            {settlementDropdownPortal}
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-[rgba(0,10,30,0.75)]">
          Customer payments will be transferred directly to this account
        </p>
      </div>

      <div className="mt-6">
        <label className="block text-[13px] font-bold leading-5 text-[#404756]">Account name</label>
        <input
          type="text"
          placeholder=""
          className="mt-1 h-10 w-full rounded-[3px] border border-[#A6A9B0] bg-white px-[15px] text-[15px] text-[#000a1e] focus:outline-none focus:shadow-[0_0_0_1px_white,0_0_0_3px_#7E848F]"
          disabled={akahuEnableProcessing}
        />
        <p className="mt-2 text-[11px] leading-4 text-[rgba(0,10,30,0.75)]">
          Enter the name exactly as it appears on the bank statement
        </p>
      </div>

      <div className="mt-6">
        <label className="block text-[13px] font-bold leading-5 text-[#404756]" htmlFor={bankAccountFieldId}>
          Bank account number
        </label>
        <input
          id={bankAccountFieldId}
          type="text"
          disabled
          value={demoBankAccountNumber(selected)}
          aria-describedby={bankAccountHintId}
          className="mt-1 h-10 w-full cursor-not-allowed rounded-[3px] border border-[#A6A9B0] bg-[#f2f3f4] px-[15px] text-[15px] text-[#000a1e] focus:outline-none disabled:text-[#000a1e] disabled:opacity-100"
        />
        <p id={bankAccountHintId} className="mt-2 text-[11px] leading-4 text-[rgba(0,10,30,0.75)]">
          Read-only. To change, reconfigure via bank feed connection
        </p>
      </div>

      <div className="mt-6 border-t border-[#ccced2]" />

      <p className="mt-4 text-[15px] leading-6 text-[#000a1e]">
        By clicking Enable Pay by Bank, you confirm these details are correct. Xero uses this information for payments and cannot recover funds sent to an incorrect account. You also agree to the{" "}
        <a href="#" className="text-[#0078C8] hover:underline" onClick={(e) => e.preventDefault()}>
          Beta Terms
        </a>
        .
      </p>

      <button
        type="button"
        className="mt-8 flex h-10 w-full items-center justify-center rounded-[3px] bg-[#0078C8] px-4 text-[15px] font-bold text-white hover:bg-[#005fa3] disabled:cursor-wait disabled:hover:bg-[#0078C8]"
        onClick={runAkahuEnablePayByBank}
        disabled={akahuEnableProcessing}
        aria-busy={akahuEnableProcessing}
      >
        {akahuEnableProcessing ? (
          <span className="sales-processing-circles flex items-center justify-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        ) : (
          "Enable Pay by Bank"
        )}
      </button>

      <button
        type="button"
        className="mt-3 flex h-10 w-full items-center justify-center rounded-[3px] border border-[#A6A9B0] bg-white px-4 text-[15px] font-bold text-[#0078C8] hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onClose}
        disabled={akahuEnableProcessing}
      >
        Cancel
      </button>
    </>
  );
}
