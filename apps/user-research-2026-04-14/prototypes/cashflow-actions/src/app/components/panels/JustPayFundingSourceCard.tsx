"use client";

import { useState } from "react";
import type { JustPayMessageEmbed } from "@/app/contexts/JaxChatContext";

type JustPayFundingSourceCardProps = {
  embed: Extract<JustPayMessageEmbed, { type: "contact_amount_review" }>;
  onFundingSourceSelected: (bankAccountLabel: string) => void;
};

/** US-style business bank accounts (Melio / US pay-out context). */
const MOCK_BANK_ACCOUNTS: {
  id: string;
  label: string;
  nickname: string;
  institution: string;
  last4: string;
  type: string;
}[] = [
  {
    id: "1",
    label: "Chase Business Checking ····4821",
    nickname: "Operating",
    institution: "Chase",
    last4: "4821",
    type: "Checking",
  },
  {
    id: "2",
    label: "Bank of America Business Advantage ····9033",
    nickname: "Payroll",
    institution: "Bank of America",
    last4: "9033",
    type: "Checking",
  },
  {
    id: "3",
    label: "Wells Fargo Business Market Rate Savings ····7712",
    nickname: "Reserve",
    institution: "Wells Fargo",
    last4: "7712",
    type: "Savings",
  },
  {
    id: "4",
    label: "Capital One Spark Business ····1144",
    nickname: "Tax hold",
    institution: "Capital One",
    last4: "1144",
    type: "Checking",
  },
];

/**
 * Shown only after the user confirms payment on the Payment details card.
 */
export function JustPayFundingSourceCard({
  embed,
  onFundingSourceSelected,
}: JustPayFundingSourceCardProps) {
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);

  const phase = embed.cardPhase ?? "details";
  const doneLabel = embed.selectedFundingLabel;
  const isFunding = phase === "funding";
  const isDone = phase === "done";

  return (
    <div className="w-full min-w-0 rounded-[12px] border border-[#ccced2] bg-white p-4 shadow-sm">
      <p className="text-[13px] font-bold uppercase tracking-wide text-[#59606d]">
        Funding source
      </p>
      <p className="mt-2 text-[12px] leading-4 text-[#59606d]">
        Choose the U.S. bank account this payment should debit (ACH).
      </p>

      <ul
        className="mt-3 space-y-2"
        role={isFunding ? "radiogroup" : undefined}
        aria-label="Bank accounts"
      >
        {MOCK_BANK_ACCOUNTS.map((acct) => {
          const selected =
            isFunding ? selectedBankId === acct.id : doneLabel === acct.label;
          const inactive = isDone;
          return (
            <li key={acct.id}>
              <button
                type="button"
                disabled={inactive}
                role="radio"
                aria-checked={selected}
                onClick={() => !inactive && setSelectedBankId(acct.id)}
                className={`flex w-full items-center gap-3 rounded-[10px] border px-3 py-3 text-left transition-colors ${
                  selected
                    ? "border-[#0078c8] bg-[#e8f4fb]"
                    : "border-[#ccced2] bg-[#f6f6f8] hover:bg-[#eef0f2]"
                } ${inactive ? "cursor-default opacity-90" : "cursor-pointer"}`}
              >
                <span
                  className={`flex size-5 flex-none items-center justify-center rounded-full border-2 ${
                    selected ? "border-[#0078c8] bg-[#0078c8]" : "border-[#59606d] bg-white"
                  }`}
                  aria-hidden
                >
                  {selected ? (
                    <span className="size-2 rounded-full bg-white" />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold text-[#000a1e]">
                    {acct.nickname}{" "}
                    <span className="font-normal text-[#59606d]">· {acct.type}</span>
                  </span>
                  <span className="text-[13px] text-[#404756]">
                    {acct.institution} ····{acct.last4}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {isFunding && (
        <button
          type="button"
          disabled={!selectedBankId}
          className="mt-4 w-full rounded-[48px] bg-[#0078c8] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#006cb4] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (!selectedBankId) return;
            const acct = MOCK_BANK_ACCOUNTS.find((a) => a.id === selectedBankId);
            const label = acct?.label ?? "Bank account";
            onFundingSourceSelected(label);
          }}
        >
          Use this account
        </button>
      )}

      {isDone && doneLabel && (
        <p className="mt-3 text-[13px] font-bold text-[#002e15]">
          ✓ Funding source saved
        </p>
      )}
    </div>
  );
}
