import type { ReactNode } from "react";

export type StatusPillVisual = "default" | "xui7438";

/**
 * Status pill — `default`: compact capsule for bills list.
 * `xui7438`: Xero Protect Figma-style table pill.
 */
export function statusPill(status: string, visual: StatusPillVisual = "default"): ReactNode {
  const normalized = status.replace(/_/g, " ");
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  if (visual === "xui7438") {
    const xui: Record<string, string> = {
      awaiting_payment:
        "bg-[#a6d3bb] text-[#002e15] shadow-[inset_0_0_0_1px_#80c19e]",
      paid: "bg-white text-[rgba(0,10,30,0.75)] shadow-[inset_0_0_0_1px_rgba(0,10,30,0.5)]",
      overdue: "bg-[#fde8e8] text-[#c31230] shadow-[inset_0_0_0_1px_#f5bcbc]",
      awaiting_approval: "bg-[#e6f0ff] text-[#0078c8] shadow-[inset_0_0_0_1px_#b4d4f0]",
      draft: "bg-[#f3f4f5] text-[rgba(0,10,30,0.75)] shadow-[inset_0_0_0_1px_#d5d7da]",
    };
    const tone =
      xui[status] ?? "bg-[#f3f4f5] text-[rgba(0,10,30,0.75)] shadow-[inset_0_0_0_1px_#d5d7da]";
    return (
      <span
        className={`inline-flex min-h-5 items-center justify-center whitespace-nowrap rounded-[3px] px-2 text-[13px] font-normal leading-5 ${tone}`}
      >
        {label}
      </span>
    );
  }

  const styles: Record<string, string> = {
    paid: "bg-[#f3f4f5] text-[#495058] border border-[#d5d7da]",
    overdue: "bg-[#fde8e8] text-[#c31230] border border-transparent",
    awaiting_approval: "bg-[#e6f0ff] text-[#1c52de] border border-transparent",
    awaiting_payment: "bg-[#e0f2e9] text-[#1a5632] border border-[#b8dcc8]",
    draft: "bg-[#f3f4f5] text-[#495058] border border-[#d5d7da]",
  };

  const tone = styles[status] ?? "bg-[#f3f4f5] text-[#495058] border border-[#d5d7da]";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-sm h-4 px-1.5 text-[12px] font-medium leading-none ${tone}`}
    >
      {label}
    </span>
  );
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 2,
  }).format(value);
}
