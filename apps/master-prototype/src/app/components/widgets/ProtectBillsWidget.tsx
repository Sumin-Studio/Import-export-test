"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { usePurchasesInteractiveLinking } from "@/app/contexts/PurchasesInteractiveLinkingContext";
import { getLinkMetaForName, PROTECT_FLAGS } from "./purchasesInteractiveLinking";
import { XERO_PROTECT_LATEST_BILLS } from "@/lib/xero-protect-latest-prototype";
import { isPurchasesPrototypeV4OrLater } from "@/app/lib/purchases-prototype-flags";

const PROTECT_ORANGE = "#FF8F33";

export function ProtectBillsWidget({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const singleOrangeProtect = isPurchasesPrototypeV4OrLater(pathname);
  const linking = usePurchasesInteractiveLinking();
  const linksByRowId = useMemo(() => {
    const out = new Map<string, ReturnType<typeof getLinkMetaForName>>();
    PROTECT_FLAGS.forEach((row) =>
      out.set(row.linkId, getLinkMetaForName(row.billName))
    );
    return out;
  }, []);
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
              className={`relative border-b border-background-tertiary transition-opacity duration-150 last:border-b-0 ${
                !linking.enabled || linking.activeLinkId == null
                  ? "opacity-100"
                  : linksByRowId.get(row.linkId)?.linkId === linking.activeLinkId
                    ? "opacity-100"
                    : "opacity-45"
              }`}
              onMouseEnter={() => {
                const linked = linksByRowId.get(row.linkId);
                linking.setActiveLink(linked?.linkId ?? null, {
                  severity: linked?.severity ?? "normal",
                  dayIndex: linked?.dayIndex ?? null,
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
                className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 py-3 hover:bg-background-secondary/60 -mx-6 px-6 last:[&]:pb-0"
              >
                <div className="inline-flex min-w-0 max-w-full items-center gap-2 text-left text-[13px]/[20px] font-medium text-[#2b7ab9]">
                  <ShieldAlert
                    className="h-4 w-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                    style={{
                      color: singleOrangeProtect
                        ? PROTECT_ORANGE
                        : row.severity === "risk"
                          ? "#FF5630"
                          : PROTECT_ORANGE,
                    }}
                  />
                  <span className="truncate hover:underline">{row.billName}</span>
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
