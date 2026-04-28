"use client";

import { useId, useMemo, useState } from "react";
import type { JustPayMessageEmbed } from "@/app/contexts/JaxChatContext";

type JustPayContactAmountCardProps = {
  embed: JustPayMessageEmbed;
  supplierName: string;
  /** User tapped Confirm payment — chat asks them to pick a funding source; embed → funding. */
  onConfirmPayment: () => void;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function isoDateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Figma JustPay node 8:10757 — payment context after supplier name (amount & context).
 * Phase is stored on the message embed so it survives chat list remounts.
 * Funding source is a separate card (`JustPayFundingSourceCard`).
 */
export function JustPayContactAmountCard({
  embed,
  supplierName,
  onConfirmPayment,
}: JustPayContactAmountCardProps) {
  const fieldId = useId();
  const [amount, setAmount] = useState("");
  const [paymentSendDate, setPaymentSendDate] = useState(() => isoDateLocal(new Date()));
  const [reference, setReference] = useState("");

  const phase = embed.cardPhase ?? "details";
  const minSendDate = useMemo(() => isoDateLocal(new Date()), []);

  const displayName = useMemo(
    () => supplierName.trim() || "Supplier",
    [supplierName]
  );

  const inputsDisabled = phase !== "details";

  return (
    <div className="w-full min-w-0 rounded-[12px] border border-[#ccced2] bg-white p-4 shadow-sm">
      <p className="text-[13px] font-bold uppercase tracking-wide text-[#59606d]">
        Payment details
      </p>
      <div className="mt-3 flex gap-3">
        <div
          className="flex size-11 flex-none items-center justify-center rounded-full bg-[#e8f4fb] text-[15px] font-bold text-[#0078c8]"
          aria-hidden
        >
          {initials(displayName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-bold leading-6 text-[#000a1e]">{displayName}</p>
          <p className="mt-0.5 text-[13px] leading-5 text-[#404756]">
            Matched in your contacts
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-[#e6e7e9] pt-4 text-[13px] leading-5 text-[#404756]">
        <div className="flex justify-between gap-2">
          <span>Last paid</span>
          <span className="text-right font-medium text-[#000a1e]">$1,240 · 28 days ago</span>
        </div>
        <div className="flex justify-between gap-2">
          <span>Usual range</span>
          <span className="text-right text-[#000a1e]">$800 – $1,500 / month</span>
        </div>
        <div className="flex justify-between gap-2">
          <span>Frequency</span>
          <span className="text-right text-[#000a1e]">Monthly</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-[13px] font-bold text-[#424f60]" htmlFor={`${fieldId}-amt`}>
          Amount
        </label>
        <div className="mt-1 flex rounded-[8px] border border-[#ccced2] bg-[#f6f6f8] px-3 py-2 opacity-100 disabled:opacity-60">
          <span className="mr-1 text-[15px] text-[#59606d]">$</span>
          <input
            id={`${fieldId}-amt`}
            className="w-full bg-transparent text-[15px] text-[#000a1e] outline-none placeholder:text-[#59606d] disabled:cursor-not-allowed"
            disabled={inputsDisabled}
            inputMode="decimal"
            placeholder="0.00"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-[13px] font-bold text-[#424f60]" htmlFor={`${fieldId}-date`}>
          Payment send date
        </label>
        <p className="mt-0.5 text-[12px] leading-4 text-[#59606d]">
          When this payment should leave your account
        </p>
        <input
          id={`${fieldId}-date`}
          className="mt-1 w-full min-h-[44px] cursor-pointer rounded-[8px] border border-[#ccced2] bg-white px-3 py-2 text-[15px] text-[#000a1e] outline-none [color-scheme:light] focus-visible:ring-2 focus-visible:ring-[#0078c8]/30 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={inputsDisabled}
          type="date"
          min={minSendDate}
          value={paymentSendDate}
          onChange={(e) => setPaymentSendDate(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label
          className="text-[13px] font-bold text-[#424f60]"
          htmlFor={`${fieldId}-ref`}
        >
          Reference{" "}
          <span className="font-normal text-[#59606d]">(optional)</span>
        </label>
        <input
          id={`${fieldId}-ref`}
          className="mt-1 w-full rounded-[8px] border border-[#ccced2] bg-white px-3 py-2 text-[15px] text-[#000a1e] outline-none placeholder:text-[#59606d] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={inputsDisabled}
          placeholder="e.g. Invoice #1042"
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </div>

      {phase === "details" && (
        <button
          type="button"
          className="mt-4 w-full rounded-[48px] bg-[#0078c8] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#006cb4]"
          onClick={() => {
            onConfirmPayment();
          }}
        >
          Confirm payment
        </button>
      )}
    </div>
  );
}
