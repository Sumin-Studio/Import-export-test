"use client";

import type { CSSProperties } from "react";

const FONT: CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export const PAY_BANK_IDS = ["anz", "asb", "bnz", "kiwibank", "westpac"] as const;
export type PayBankId = (typeof PAY_BANK_IDS)[number];

export type PayBankMeta = {
  id: PayBankId;
  /** Short name, e.g. ASB */
  label: string;
  /** Name of the mobile app in copy, e.g. ASB Mobile */
  mobileAppName: string;
};

export const PAY_BANK_OPTIONS: { value: PayBankId; label: string }[] = [
  { value: "anz", label: "ANZ" },
  { value: "asb", label: "ASB" },
  { value: "bnz", label: "BNZ" },
  { value: "kiwibank", label: "Kiwibank" },
  { value: "westpac", label: "Westpac" },
];

const META: Record<PayBankId, PayBankMeta> = {
  anz: { id: "anz", label: "ANZ", mobileAppName: "ANZ goMoney" },
  asb: { id: "asb", label: "ASB", mobileAppName: "ASB Mobile" },
  bnz: { id: "bnz", label: "BNZ", mobileAppName: "BNZ Mobile" },
  kiwibank: { id: "kiwibank", label: "Kiwibank", mobileAppName: "Kiwibank Mobile" },
  westpac: { id: "westpac", label: "Westpac", mobileAppName: "Westpac One" },
};

export function parsePayBankId(raw: string | null): PayBankId | null {
  if (!raw) return null;
  return (PAY_BANK_IDS as readonly string[]).includes(raw) ? (raw as PayBankId) : null;
}

export function getPayBankMeta(id: PayBankId): PayBankMeta {
  return META[id];
}

/** Public URL for bank mark on connect UI (replace SVGs under public/icons/banks/ as official assets arrive). */
export const PAY_BANK_LOGO_SRC: Record<PayBankId, string> = {
  anz: "/logos/ANZ-logo.svg",
  asb: "/logos/ASB-Logo.svg",
  bnz: "/logos/BNZ-logo-on-white.svg",
  kiwibank: "/logos/Kiwibank-Logo-on-white.svg",
  westpac: "/logos/Westpac-logo.svg",
};

/** Large circular mark for the bank-connect screen (prototype marks, not official bank assets). */
export function PayBankLogoMark({ bankId, className = "" }: { bankId: PayBankId; className?: string }) {
  const base = `flex size-[88px] shrink-0 items-center justify-center rounded-full text-[22px] font-bold leading-none tracking-tight ${className}`;

  switch (bankId) {
    case "asb":
      return (
        <div className={`${base} bg-[#FFCC00] text-[#1a1a1a]`} style={FONT} aria-hidden>
          ASB
        </div>
      );
    case "anz":
      return (
        <div className={`${base} bg-[#007DBA] text-white`} style={FONT} aria-hidden>
          ANZ
        </div>
      );
    case "bnz":
      return (
        <div className={`${base} bg-[#FF6600] text-white`} style={FONT} aria-hidden>
          BNZ
        </div>
      );
    case "kiwibank":
      return (
        <div className={`${base} bg-[#00A651] px-2 text-[12px] text-white`} style={FONT} aria-hidden>
          Kiwibank
        </div>
      );
    case "westpac":
      return (
        <div className={`${base} bg-[#D5002B] px-2 text-[11px] text-white`} style={FONT} aria-hidden>
          Westpac
        </div>
      );
  }
}
