"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatCurrency,
  JumpToPurchasesNav,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";

const BILLS_BASE = "/xero-protect/prototype/9/bills";

const DUPLICATE_PAIRS = [
  { supplier: "Metro Couriers", billNumbers: ["BILL-024", "BILL-026"], amount: 185.0 },
  { supplier: "City Power Co", billNumbers: ["BILL-002", "BILL-023"], amount: 2953.5 },
];

export function DupeReviewPanel() {
  const router = useRouter();
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const allResolved = resolved.size === DUPLICATE_PAIRS.length;

  if (allResolved) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-2">
            All duplicate bills have been reviewed
          </h2>
          <p className="text-[14px] text-[#6b7280] mb-6">
            Any new duplicates will appear here for your review.
          </p>
          <button
            onClick={() => router.replace(BILLS_BASE)}
            className="px-5 py-2.5 rounded bg-[#00b4d8] text-white text-[14px] font-semibold hover:bg-[#0096b4]"
          >
            Return to bills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-6">
        <JumpToPurchasesNav
          billsListHref={BILLS_BASE}
          purchasesOverviewHref="/purchases-overview/prototype/4?scenario=diya-demo"
        />
        <h2 className="text-[17px] font-bold text-[#0a0a0a]">Duplicate bill review</h2>
      </div>
      <div className="space-y-4">
        {DUPLICATE_PAIRS.map((pair, idx) => (
          <div key={idx} className="border border-[#e1e2e5] rounded-lg overflow-hidden bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-[#f7f8fa] border-b border-[#e1e2e5]">
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-semibold text-[#0a0a0a]">{pair.supplier}</span>
                <span className="text-[13px] text-[#6b7280]">{pair.billNumbers.length} Bills</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-medium text-[#0a0a0a]">{formatCurrency(pair.amount)}</span>
                {!resolved.has(idx) ? (
                  <button
                    onClick={() => setResolved((s) => new Set([...s, idx]))}
                    className="px-3 py-1.5 rounded border border-[#1c52de] text-[13px] font-medium text-[#1c52de] hover:bg-[#f0f3ff]"
                  >
                    Keep all
                  </button>
                ) : (
                  <span className="text-[13px] font-medium text-[#059669]">Resolved</span>
                )}
              </div>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[#6b7280] border-b border-[#e1e2e5]">
                  <th className="text-left px-4 py-2 font-normal">From</th>
                  <th className="text-left px-4 py-2 font-normal">Reference</th>
                  <th className="text-left px-4 py-2 font-normal">Issue date</th>
                  <th className="text-left px-4 py-2 font-normal">Due date</th>
                  <th className="text-left px-4 py-2 font-normal">Status</th>
                  <th className="text-right px-4 py-2 font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {pair.billNumbers.map((bn, i) => (
                  <tr key={bn} className="border-b border-[#eaebec] hover:bg-[#f7f8fa]">
                    <td className="px-4 py-2">{pair.supplier}</td>
                    <td className="px-4 py-2">{bn}</td>
                    <td className="px-4 py-2">{i === 0 ? "Jan 18, 2025" : "Nov 18, 2024"}</td>
                    <td className="px-4 py-2">{i === 0 ? "Feb 18, 2025" : "Dec 19, 2024"}</td>
                    <td className="px-4 py-2">{statusPill("paid")}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(pair.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
