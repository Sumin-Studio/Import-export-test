"use client";

import { usePathname } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { usePurchasesInteractiveLinking } from "@/app/contexts/PurchasesInteractiveLinkingContext";
import type { ProtectFlag } from "./purchasesInteractiveLinking";
import { getProtectFlagForBillName } from "./purchasesInteractiveLinking";

const PROTECT_ORANGE = "#FF8F33";

export type ProtectBillNameCellProps = {
  billName: string;
  /** When set, skips lookup (e.g. Protect list row already has the flag). */
  flag?: ProtectFlag | null;
  /** Blue link styling — use inside `<Link>` for Protect widget rows. */
  linkToBill?: boolean;
};

/**
 * Shield + bill name with the same spacing and icon treatment as {@link ProtectBillsWidget}.
 */
export function ProtectBillNameCell({
  billName,
  flag: flagProp,
  linkToBill = false,
}: ProtectBillNameCellProps) {
  const pathname = usePathname();
  const singleOrangeProtect =
    pathname?.includes("/purchases-overview/prototype/4") ?? false;
  const flag = flagProp ?? getProtectFlagForBillName(billName);
  const linking = usePurchasesInteractiveLinking();

  const severity = flag?.severity ?? "warning";
  const color = singleOrangeProtect
    ? PROTECT_ORANGE
    : severity === "risk"
      ? "#FF5630"
      : PROTECT_ORANGE;

  const nameClass = linkToBill
    ? "min-w-0 truncate text-[13px]/[20px] font-medium text-[#2b7ab9] group-hover:underline"
    : "min-w-0 truncate text-[13px]/[20px] font-medium text-content-primary";

  const rowHandlers =
    linking.enabled && flag
      ? {
          onMouseEnter: () => {
            linking.setActiveLink(flag.linkId, {
              severity: flag.severity,
              dayIndex: flag.dayIndex,
              bandStart: null,
              bandEnd: null,
            });
          },
          onMouseLeave: () => {
            linking.setActiveLink(null);
          },
        }
      : {};

  return (
    <div
      className="inline-flex min-w-0 max-w-full items-center gap-2 text-left"
      {...rowHandlers}
    >
      {flag ? (
        <ShieldAlert
          className="h-4 w-4 shrink-0"
          strokeWidth={2}
          aria-hidden
          style={{ color }}
        />
      ) : null}
      <span className={nameClass}>{billName}</span>
    </div>
  );
}
