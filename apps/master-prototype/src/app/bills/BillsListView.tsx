"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Columns3, Search, SlidersHorizontal } from "lucide-react";
import type { Bill, BillStatus } from "@/data/safety-shield";
import { safetyShieldBills } from "@/data/safety-shield";
import { formatCurrency, statusPill } from "@/components/xero-protect/SafetyShieldChrome";

type TabId = "all" | BillStatus | "repeating";

function isRepeatingBill(b: Bill) {
  const n = parseInt(b.id, 10);
  return !Number.isNaN(n) && n % 5 === 0;
}

function formatDateProd(d: string): string {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("en-NZ", { day: "2-digit", month: "short", year: "numeric" });
}

const VALID_TABS: TabId[] = [
  "all",
  "draft",
  "awaiting_approval",
  "awaiting_payment",
  "paid",
  "repeating",
];

function currencyCell(value: number): string {
  return formatCurrency(value).replace("$", "").trim();
}

export function BillsListView() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("tab") ?? "all";
  const tab = (VALID_TABS.includes(raw as TabId) ? raw : "all") as TabId;
  const showStatusColumn = tab === "all";

  const [query, setQuery] = useState("");

  const baseRows = useMemo(() => {
    const list = [...safetyShieldBills].sort(
      (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    );
    if (tab === "all") return list;
    if (tab === "repeating") return list.filter(isRepeatingBill);
    return list.filter((b) => b.status === tab);
  }, [tab]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return baseRows;
    return baseRows.filter((bill) =>
      [bill.billNumber, bill.supplier, bill.status.replace(/_/g, " "), bill.dueDate].some((v) =>
        v.toLowerCase().includes(normalized)
      )
    );
  }, [baseRows, query]);

  const totalAmount = useMemo(
    () => filteredRows.reduce((sum, bill) => sum + bill.total, 0),
    [filteredRows]
  );

  return (
    <div className="bg-white border border-[#ccced2] rounded-sm overflow-hidden">
      {/* Search + date filters — match xero-protect/prototype/7/bills */}
      <div className="px-4 py-3 border-b border-[#e1e2e5]">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a contact, amount, or reference"
              aria-label="Search bills"
              className="w-full h-9 rounded border-0 bg-[#f2f3f4] pl-10 pr-3 text-[14px] leading-[1.25] text-[#0a0a0a] shadow-none outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-[#1c52de]/35 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <span className="text-[12px] leading-tight text-[#333940]">Start date</span>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              readOnly
              className="h-9 w-[120px] rounded border border-[#ccc] bg-white px-3 text-[13px] leading-[1.25]"
            />
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <span className="text-[12px] leading-tight text-[#333940]">End date</span>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              readOnly
              className="h-9 w-[120px] rounded border border-[#ccc] bg-white px-3 text-[13px] leading-[1.25]"
            />
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <span className="text-[12px] leading-tight text-[#333940]">Date type</span>
            <select className="h-9 min-w-[8.75rem] rounded border border-[#ccc] bg-white px-3 text-[13px] leading-[1.25]">
              <option>Any date</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0 sm:ml-auto">
            <button
              type="button"
              className="h-9 rounded border border-[#ccc] bg-white px-3 text-[#1c52de] flex items-center gap-1.5 text-[13px] font-medium leading-none"
            >
              Filter <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="h-9 rounded border border-[#ccc] bg-white px-3 text-[#1c52de] flex items-center gap-1.5 text-[13px] font-medium leading-none"
            >
              Columns <Columns3 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Count row */}
      <div className="px-4 py-1.5 text-[13px] text-[#333940] text-right border-b border-[#e1e2e5]">
        {filteredRows.length} items | {currencyCell(totalAmount)} NZD
      </div>

      {/* Table — P7 list surface (no quick-view / Eye column) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[14px] leading-[1.35]">
          <thead className="bg-[#fafbfc]">
            <tr className="border-b border-[#ccced2] text-[#6b7280] text-[13px]">
              <th className="text-left font-normal px-3 py-2">From</th>
              {showStatusColumn && (
                <th className="text-left font-normal px-2 py-2">Status</th>
              )}
              <th className="text-left font-normal px-2 py-2">Reference</th>
              <th className="text-left font-normal px-2 py-2">Date</th>
              <th className="text-left font-normal px-2 py-2">Due date ↓</th>
              <th className="text-right font-normal px-2 py-2">Paid</th>
              <th className="text-right font-normal px-2 py-2">Due</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((bill: Bill) => {
              const isOverdue =
                bill.status === "overdue" ||
                (bill.status === "awaiting_payment" && new Date(bill.dueDate) < new Date());
              const paidDisplay =
                bill.status === "paid" ? currencyCell(bill.total) : "0.00";
              const dueDisplay =
                bill.status !== "paid" ? currencyCell(bill.total) : "0.00";

              return (
                <tr
                  key={bill.id}
                  className="border-b border-[#e1e2e5] hover:bg-[#f7f8fa] transition-colors"
                >
                  <td className="px-3 py-1.5 align-middle">
                    <span className="text-[#0a0a0a] font-semibold leading-snug">{bill.supplier}</span>
                  </td>
                  {showStatusColumn && (
                    <td className="px-2 py-1.5 align-middle">{statusPill(bill.status)}</td>
                  )}
                  <td className="px-2 py-1.5 align-middle">
                    <span className="tabular-nums text-[#0a0a0a]">{bill.billNumber}</span>
                  </td>
                  <td className="px-2 py-1.5 text-[#0a0a0a] align-middle whitespace-nowrap">
                    {formatDateProd(bill.issueDate)}
                  </td>
                  <td
                    className={`px-2 py-1.5 align-middle whitespace-nowrap ${
                      isOverdue ? "text-[#c31230]" : "text-[#0a0a0a]"
                    }`}
                  >
                    {isOverdue && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="inline mr-1 -mt-0.5 text-[#c31230]"
                        aria-hidden
                      >
                        <rect
                          x="1"
                          y="2"
                          width="14"
                          height="13"
                          rx="1.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                        <path d="M1 6h14" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    )}
                    {formatDateProd(bill.dueDate)}
                  </td>
                  <td className="px-2 py-1.5 text-right text-[#0a0a0a] align-middle tabular-nums">
                    {paidDisplay}
                  </td>
                  <td className="px-2 py-1.5 text-right text-[#0a0a0a] align-middle tabular-nums">
                    {dueDisplay}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredRows.length === 0 && (
        <div className="px-4 py-8 text-center text-[13px] text-[#8c919a] border-t border-[#e1e2e5]">
          No bills match the current filters.
        </div>
      )}
    </div>
  );
}
