"use client";

import { TrendingUp } from "lucide-react";
import { MoreButton } from "@/app/components/global";

const MAIN_ACCOUNTS = [
  { name: "Chase Business Checking", amount: "27,102.50" },
  { name: "Bank of America Savings", amount: "10,670.35" },
];
const PAYPAL_ROW = { name: "PayPal", amount: "4,227.15" } as const;

function Menu() {
  return (
    <div className="py-1 text-[13px]/[20px] text-content-primary">
      <button
        type="button"
        className="w-full px-5 py-2 text-left hover:bg-background-primary"
      >
        View account details
      </button>
      <button
        type="button"
        className="w-full px-5 py-2 text-left hover:bg-background-primary"
      >
        Export balances
      </button>
    </div>
  );
}

interface AvailableTodayCardProps {
  className?: string;
}

/** “Available today” balance card — matches Just Pay dashboard (Figma). */
export function AvailableTodayCard({ className = "" }: AvailableTodayCardProps) {
  return (
    <div
      className={`relative flex w-full max-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out xl:max-w-none ${className}`}
    >
      <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
        <h3 className="text-[17px]/[28px] font-bold text-content-primary">
          Available today
        </h3>
        <MoreButton
          menu={<Menu />}
          position={{ to: "bottom end", gap: "4px" }}
        />
      </div>
      <div className="px-6 pb-1 pt-1">
        <p className="text-[32px]/[40px] font-light tracking-tight text-content-primary subpixel-antialiased">
          42,757
        </p>
        <div className="mt-2 flex items-center gap-1 text-[13px]/[16px] font-medium text-[#0f7b3d]">
          <span>Up 5% from this time last month</span>
          <TrendingUp className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        </div>
      </div>
      <ul className="mx-6 mt-3 space-y-0 border-t border-background-tertiary pt-3">
        {MAIN_ACCOUNTS.map((row) => (
          <li
            key={row.name}
            className="flex items-center justify-between gap-3 py-2.5 text-[13px]/[20px] first:pt-0"
          >
            <span className="min-w-0 text-content-primary">{row.name}</span>
            <span className="shrink-0 tabular-nums text-content-primary">{row.amount}</span>
          </li>
        ))}
      </ul>
      <div className="mx-6 mb-5 mt-0 flex items-center justify-between gap-3 border-t border-background-tertiary py-2.5 text-[13px]/[20px]">
        <span className="min-w-0 text-content-primary">{PAYPAL_ROW.name}</span>
        <span className="shrink-0 tabular-nums text-content-primary">{PAYPAL_ROW.amount}</span>
      </div>
    </div>
  );
}

export default AvailableTodayCard;
