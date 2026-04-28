"use client";

import Link from "next/link";
import { usePurchasesInteractiveLinking } from "@/app/contexts/PurchasesInteractiveLinkingContext";
import { PROTECT_FLAGS } from "./purchasesInteractiveLinking";
import { ProtectBillNameCell } from "./ProtectBillNameCell";
import { XERO_PROTECT_LATEST_BILLS } from "@/lib/xero-protect-latest-prototype";

export function ProtectBillsWidget({ className = "" }: { className?: string }) {
  const linking = usePurchasesInteractiveLinking();
  return (
    <div
      className={`relative flex w-full min-w-0 flex-col rounded-xl bg-white ${className}`}
    >
      <div className="relative px-6 pb-1 pt-[10px]">
        <h3 className="text-[17px]/[28px] font-bold text-content-primary">
          Protect
        </h3>
        <p className="mt-0.5 text-[13px]/[20px] text-content-secondary">
          Review these bills before you pay — they may need attention first.
        </p>
      </div>
      <ul className="mt-2 border-t border-background-tertiary px-6 pb-5 pt-3">
        {PROTECT_FLAGS.map((row) => {
          return (
            <li
              key={row.linkId}
              className="relative border-b border-background-tertiary transition-opacity duration-150 last:border-b-0 opacity-100"
              onMouseEnter={() => {
                linking.setActiveLink(row.linkId, {
                  severity: row.severity,
                  dayIndex: row.dayIndex,
                  bandStart: null,
                  bandEnd: null,
                });
              }}
              onMouseLeave={() => {
                linking.setActiveLink(null);
              }}
            >
              <Link
                href={`${XERO_PROTECT_LATEST_BILLS}/${row.targetBillId}?view=full&protectLink=${encodeURIComponent(row.linkId)}`}
                className="group flex flex-wrap items-start justify-between gap-x-3 gap-y-1 py-3 hover:bg-background-secondary/60 -mx-6 px-6 last:[&]:pb-0"
              >
                <div className="min-w-0 max-w-full text-left">
                  <ProtectBillNameCell billName={row.billName} flag={row} linkToBill />
                </div>
                <span className="shrink-0 tabular-nums text-[13px]/[20px] text-content-primary">
                  {row.amount}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProtectBillsWidget;
