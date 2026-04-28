"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Columns3,
} from "lucide-react";
import {
  type Bill,
  type BillStatus,
  getSafetyShieldBillsByStatus,
  safetyShieldBills,
} from "@/data/safety-shield";
import {
  formatCurrency,
  protectShieldIconClassName,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";

const BILLS_BASE = "/xero-protect/prototype/4/bills";

function RiskChipPopover({ bill }: { bill: Bill }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const hide = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      <span className={`inline-flex items-center ${protectShieldIconClassName}`}>
        <ShieldAlert className="h-3.5 w-3.5" />
      </span>

      {open && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50"
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#cfd1d5]" />
          <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-white" />

          <div
            className="bg-white border border-[#cfd1d5] rounded-md w-[300px] p-4"
            style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`h-4 w-4 shrink-0 ${protectShieldIconClassName}`} />
                <p
                  className={`text-[15px] font-semibold leading-[1.45] ${protectShieldIconClassName}`}
                >
                  {bill.riskLevel === "high" ? "High risk" : "Med risk"}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="text-[#424f60] hover:text-[#1e3145] ml-2 mt-0.5"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="bg-[#f7f8fa] border border-[#e1e2e5] rounded-lg p-3 text-[13px] text-[#424f60] leading-[1.45]">
              <ul className="list-disc list-outside pl-5 space-y-1">
                {(bill.aiReason ?? "This bill has been flagged for review.")
                  .split(/\.\s+/)
                  .filter((s) => s.trim())
                  .map((sentence, i) => (
                    <li key={i}>{sentence.replace(/\.$/, "")}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type TabValue = BillStatus | "all";

const statusTabs: Array<{ value: TabValue; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "awaiting_approval", label: "Awaiting approval" },
  { value: "awaiting_payment", label: "Awaiting payment" },
  { value: "paid", label: "Paid" },
];

function getTabCount(value: TabValue): number {
  if (value === "all") return safetyShieldBills.length;
  return getSafetyShieldBillsByStatus(value).length;
}

export function BillsListClient({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabFromUrlRaw = searchParams.get("tab");
  /** Legacy URLs used tab=flagged; that tab was removed — treat as All. */
  const tabFromUrl =
    tabFromUrlRaw === "flagged" ? "all" : (tabFromUrlRaw as TabValue | null);
  const initialTab: TabValue =
    tabFromUrl && statusTabs.some((t) => t.value === tabFromUrl) ? tabFromUrl : "all";
  const [tab, setTab] = useState<TabValue>(initialTab);
  const [query, setQuery] = useState("");
  const persistentQuery = useMemo(() => {
    const p = new URLSearchParams(searchParams);
    p.set("tab", tab);
    return p.toString();
  }, [searchParams, tab]);

  const selectedBillId = useMemo(() => {
    const m = pathname.match(/\/bills\/([^/]+)$/);
    return m?.[1] ?? null;
  }, [pathname]);

  const baseBills = useMemo(() => {
    if (tab === "all") return safetyShieldBills;
    return getSafetyShieldBillsByStatus(tab);
  }, [tab]);

  const handleTabClick = (value: TabValue) => {
    setTab(value);
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.replace(`${BILLS_BASE}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (tabFromUrlRaw === "flagged") {
      const params = new URLSearchParams(searchParams);
      params.set("tab", "all");
      router.replace(`${BILLS_BASE}?${params.toString()}`, { scroll: false });
    }
  }, [tabFromUrlRaw, searchParams, router]);

  useEffect(() => {
    if (tabFromUrl && statusTabs.some((t) => t.value === tabFromUrl)) {
      setTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const filteredBills = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return baseBills;
    return baseBills.filter((bill) =>
      [bill.billNumber, bill.supplier, bill.status.replace(/_/g, " "), bill.dueDate].some((v) =>
        v.toLowerCase().includes(normalized)
      )
    );
  }, [baseBills, query]);

  const totalAmount = baseBills.reduce((sum, bill) => sum + bill.total, 0);

  return (
    <div
      className={`flex flex-col h-full bg-white min-w-0 w-full ${
        compact ? "border-r border-[#e1e2e5]" : "border border-[#e1e2e5] rounded"
      }`}
    >
      <div className="flex items-stretch border-b border-[#e1e2e5] shrink-0">
        {statusTabs.map((item) => {
          const isActive = tab === item.value;
          const count = getTabCount(item.value);
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleTabClick(item.value)}
              className={`flex items-center px-3 py-2 ${compact ? "text-[13px]" : "text-[14px]"} font-normal transition-colors relative ${
                isActive
                  ? "text-[#1c52de] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#1c52de]"
                  : "text-[#333940] hover:text-[#0a0a0a]"
              }`}
            >
              {item.label}
              {count > 0 && (
                <span className="ml-2 text-[13px] text-[#666]">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className={`px-2 py-2 flex flex-wrap items-end gap-2 border-b border-[#e1e2e5] ${compact ? "" : "md:px-4"}`}>
        <div className="relative flex-1 min-w-[160px]">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8c919a]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Contact, amount, or reference"
            className={`w-full h-8 rounded border border-[#ccc] bg-white pl-8 pr-2 text-[#0a0a0a] outline-none focus:border-[#1c52de] ${
              compact ? "text-[12px]" : "text-[13px]"
            }`}
          />
        </div>
        <button className={`h-8 rounded border border-[#ccc] bg-white px-2 text-[#333940] flex items-center gap-1 ${compact ? "text-[12px]" : "text-[13px]"}`}>
          Filter <SlidersHorizontal className="h-3 w-3" />
        </button>
        <button className={`h-8 rounded border border-[#ccc] bg-white px-2 text-[#333940] flex items-center gap-1 ${compact ? "text-[12px]" : "text-[13px]"}`}>
          Columns <Columns3 className="h-3 w-3" />
        </button>
      </div>

      <div className={`px-2 py-1 text-[#333940] border-b border-[#e1e2e5] ${compact ? "text-[12px]" : "text-[13px] md:px-4"}`}>
        {filteredBills.length} items | {formatCurrency(totalAmount).replace("$", "").trim()} NZD
      </div>

      <div className="flex-1 overflow-auto">
        <table className={`w-full text-left ${compact ? "text-[12px]" : "text-[13px]"}`}>
          <thead className="sticky top-0 bg-white border-b border-[#d5d7da] z-10">
            <tr className="text-[#333940]">
              <th className="px-2 py-1.5 font-normal">From</th>
              <th className="px-2 py-1.5 font-normal">Status</th>
              <th className="px-2 py-1.5 font-normal">Reference</th>
              <th className="px-2 py-1.5 font-normal">Due</th>
              <th className="px-2 py-1.5 font-normal text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => {
              const isSelected = selectedBillId === bill.id;
              return (
                <tr
                  key={bill.id}
                  className={`border-b border-[#eaebec] cursor-pointer transition-colors [transition-duration:0.15s] ${
                    isSelected ? "bg-[#e6f0ff]" : "hover:bg-[#eef1f3]"
                  } ${
                    bill.aiFlagged
                      ? "border-l-[3px] border-l-[#f59e0b]"
                      : "border-l-[3px] border-l-transparent"
                  }`}
                  onClick={() =>
                    router.push(
                      persistentQuery
                        ? `${BILLS_BASE}/${bill.id}?${persistentQuery}`
                        : `${BILLS_BASE}/${bill.id}`
                    )
                  }
                >
                  <td className="px-2 py-1.5">
                    <Link
                      href={
                        persistentQuery
                          ? `${BILLS_BASE}/${bill.id}?${persistentQuery}`
                          : `${BILLS_BASE}/${bill.id}`
                      }
                      className="text-[#1c52de] hover:underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {bill.supplier}
                    </Link>
                  </td>
                  <td className="px-2 py-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      {statusPill(bill.status)}
                      {bill.aiFlagged && bill.riskLevel ? <RiskChipPopover bill={bill} /> : null}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-[#0a0a0a]">{bill.billNumber}</td>
                  <td className="px-2 py-1.5 text-[#0a0a0a]">{bill.dueDate}</td>
                  <td className="px-2 py-1.5 text-right text-[#0a0a0a]">
                    {bill.status !== "paid" ? formatCurrency(bill.total).replace("$", "").trim() : "0.00"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredBills.length === 0 && (
          <div className="px-4 py-8 text-center text-[12px] text-[#8c919a]">
            No bills match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
