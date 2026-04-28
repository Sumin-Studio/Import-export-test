"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, X } from "lucide-react";
import type { Bill } from "@/data/safety-shield";
import { protectShieldIconClassName } from "@/components/xero-protect/SafetyShieldChrome";

const STORAGE_KEY = "prototype-4-trust-banner-collapsed";

function getStoredCollapsed(billId: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${billId}`);
    return raw !== "false";
  } catch {
    return true;
  }
}

function setStoredCollapsed(billId: string, collapsed: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY}-${billId}`, String(collapsed));
  } catch {
    /* ignore */
  }
}

export interface TrustStatusBannerProps {
  bill: Bill;
  averageAmount: number;
  buildBillHref: (id: string) => string;
  onDismiss?: () => void;
  /** When true, banner starts expanded (e.g. deep-linked from Purchases overview Protect widget). */
  startExpanded?: boolean;
}

function getRiskBullets(
  bill: Bill,
  percentHigher: number,
  buildBillHref: (id: string) => string
): React.ReactNode[] {
  const bullets: React.ReactNode[] = [];
  if (bill.riskType === "duplicate") {
    bullets.push(`Possible duplicate invoice for ${bill.supplier}.`);
    if (bill.duplicateOfBillId) {
      bullets.push(
        <Link
          key="original"
          href={buildBillHref(bill.duplicateOfBillId)}
          className="text-[#1c52de] hover:underline"
        >
          View original
        </Link>
      );
    }
  } else if (bill.riskType === "anomalous_amount") {
    bullets.push(`Amount is unusual for ${bill.supplier}.`);
    if (percentHigher > 0) {
      bullets.push(`${percentHigher}% above average bill value.`);
    }
  } else if (bill.riskType === "bank_detail_change") {
    bullets.push(`Supplier bank details changed recently for ${bill.supplier}.`);
  } else {
    bullets.push(`First bill from ${bill.supplier} with a high amount.`);
    if (percentHigher > 0) {
      bullets.push(`${percentHigher}% above average bill value.`);
    }
  }
  return bullets;
}

export function TrustStatusBanner({
  bill,
  averageAmount,
  buildBillHref,
  onDismiss,
  startExpanded = false,
}: TrustStatusBannerProps) {
  const percentHigher = Math.round(
    ((bill.amount - averageAmount) / averageAmount) * 100
  );
  const riskBullets = getRiskBullets(bill, percentHigher, buildBillHref);
  const [collapsed, setCollapsed] = useState(() =>
    startExpanded ? false : getStoredCollapsed(bill.id)
  );

  useEffect(() => {
    setStoredCollapsed(bill.id, collapsed);
  }, [bill.id, collapsed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.();
  };

  if (!bill.aiFlagged) {
    return null;
  }

  if (collapsed) {
    return (
      <div className="border-b border-[#f5d98a] bg-[#fff8e5] py-2 px-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="flex-1 flex items-center gap-2 text-left min-w-0"
          >
            <ShieldAlert className={`h-4 w-4 shrink-0 ${protectShieldIconClassName}`} />
            <span className="text-[13px] font-medium text-[#92400e] truncate">
              Review recommended
            </span>
          </button>
          {onDismiss && (
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded text-[#8c919a] hover:text-[#333940] hover:bg-white/60"
              aria-label="Dismiss flag"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-[#f5d98a] bg-[#fff8e5]">
      <div className="flex items-start justify-between gap-2 px-4 pt-3 pb-2">
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="flex-1 flex items-center gap-2 text-left min-w-0"
        >
          <ShieldAlert className={`h-4 w-4 shrink-0 ${protectShieldIconClassName}`} />
          <span className="text-[13px] font-medium text-[#92400e]">
            Review recommended
          </span>
        </button>
        {onDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded text-[#8c919a] hover:text-[#333940] hover:bg-white/60"
            aria-label="Dismiss flag"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="px-4 pt-4 pb-4">
        <ul className="list-disc list-inside text-[13px] text-[#1e3145] leading-relaxed space-y-1">
          {riskBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
