"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Search,
  ShieldAlert,
  ChevronDown,
  Calendar,
  SlidersHorizontal,
  Columns3,
  Eye,
} from "lucide-react";
import {
  type BillStatus,
  getFlaggedSafetyShieldBills,
  getSafetyShieldBillsByStatus,
  riskTypeLabels,
  safetyShieldBills,
} from "@/data/safety-shield";
import {
  SafetyShieldChrome,
  formatCurrency,
  riskTypePill,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";

const statusTabs: Array<{ value: BillStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "awaiting_approval", label: "Awaiting approval" },
  { value: "awaiting_payment", label: "Awaiting payment" },
  { value: "paid", label: "Paid" },
];

export default function XeroProtectPrototype2Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState<BillStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [showHighRiskOnly, setShowHighRiskOnly] = useState(false);
  const [summaryDismissed, setSummaryDismissed] = useState(false);

  const prototypeId = useMemo(() => {
    const match = pathname.match(/\/xero-protect\/prototype\/(\d+)/);
    return match?.[1] ?? "2";
  }, [pathname]);

  const prototypeBasePath = `/xero-protect/prototype/${prototypeId}`;

  const flaggedBills = getFlaggedSafetyShieldBills();
  const flaggedCount = flaggedBills.length;

  const baseBills = useMemo(() => {
    return tab === "all" ? safetyShieldBills : getSafetyShieldBillsByStatus(tab);
  }, [tab]);

  const filteredBills = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return baseBills.filter((bill) => {
      if (showHighRiskOnly && !bill.aiFlagged) return false;
      if (!normalized) return true;

      return [
        bill.billNumber,
        bill.supplier,
        bill.status.replace(/_/g, " "),
        bill.dueDate,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [baseBills, query, showHighRiskOnly]);

  const totalAmount = baseBills.reduce((sum, bill) => sum + bill.total, 0);

  const breadcrumb = [
    { label: "Prototypes", href: "/xero-protect/prototype" },
    {
      label: prototypeId === "2" ? "Prototype 2 (Rory)" : `Prototype ${prototypeId}`,
      href: prototypeBasePath,
    },
  ];

  return (
    <SafetyShieldChrome
      breadcrumb={breadcrumb}
      pageTitle="Bills"
      tabs={
        <div className="flex items-stretch">
          {statusTabs.map((item) => {
            const isActive = tab === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setTab(item.value)}
                className={`px-4 pb-0 text-[14px] font-normal transition-colors relative ${
                  isActive
                    ? "text-[#1c52de] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[3px] after:bg-[#1c52de] after:rounded-t"
                    : "text-[#333940] hover:text-[#0a0a0a]"
                }`}
                style={{ height: 36 }}
              >
                {item.label}
                {item.value === "awaiting_payment" && (
                  <span className="ml-0.5 text-[14px]">
                    {getSafetyShieldBillsByStatus("awaiting_payment").length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      }
    >
      {/* Xero Protect summary card */}
      {!summaryDismissed && flaggedCount > 0 && (
        <div className="px-4 py-2">
          <div className="bg-white rounded border border-[#e1e2e5] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 -m-1">
                <svg className="absolute inset-0 w-10 h-10" style={{ animation: 'spin 12s linear infinite' }} viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" opacity="0.4" />
                </svg>
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#fef3c7]">
                  <ShieldAlert className="h-4 w-4 text-[#d97706]" />
                </div>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#0a0a0a]">
                  Xero Protect found {flaggedCount} {flaggedCount === 1 ? "bill that may need" : "bills that may need"} review
                </p>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  {(() => {
                    const levelCounts = flaggedBills.reduce((acc, b) => {
                      if (b.riskLevel) acc[b.riskLevel] = (acc[b.riskLevel] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    const labels: Array<[string, string]> = [["high", "high risk"], ["medium", "medium risk"], ["low", "low risk"]];
                    return labels
                      .filter(([key]) => levelCounts[key])
                      .map(([key, label]) => `${levelCounts[key]} ${label}`)
                      .join(" · ");
                  })()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHighRiskOnly(!showHighRiskOnly)}
                className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[13px] font-medium transition-colors ${
                  showHighRiskOnly
                    ? "border border-[#d97706] bg-[#fef3c7] text-[#92400e] hover:bg-[#fef9c3]"
                    : "border border-[#e1e2e5] bg-[#f7f8fa] text-[#333940] hover:bg-[#eef2ff] hover:border-[#1c52de] hover:text-[#1c52de]"
                }`}
              >
                {showHighRiskOnly ? "Show all bills" : "Review flagged bills"}
              </button>
              <button
                type="button"
                onClick={() => { setSummaryDismissed(true); setShowHighRiskOnly(false); }}
                className="text-[#8c919a] hover:text-[#333940] ml-2"
                aria-label="Dismiss"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter bar + table content */}
      <div className={`px-4 ${summaryDismissed || flaggedCount === 0 ? "pt-3" : ""}`}>
        <div className="bg-white mt-0 rounded border border-[#e1e2e5]">
          {/* Filter bar */}
          <div className="px-4 py-2 flex flex-wrap items-end gap-3 border-b border-[#e1e2e5]">
            {/* Search */}
            <div className="relative flex-1 min-w-[260px] max-w-[560px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a contact, amount, or reference"
                className="w-full h-8 rounded border border-[#ccc] bg-white pl-9 pr-3 text-[13px] text-[#0a0a0a] outline-none transition placeholder:text-[#8c919a] focus:border-[#1c52de] focus:ring-1 focus:ring-[#1c52de]"
              />
            </div>

            {/* Date filters */}
            <div className="flex items-end gap-3">
              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">
                  Start date
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
                  <input
                    type="text"
                    placeholder=""
                    className="h-8 w-[140px] rounded border border-[#ccc] bg-white pl-8 pr-2 text-[13px] text-[#0a0a0a] outline-none focus:border-[#1c52de]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">
                  End date
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
                  <input
                    type="text"
                    placeholder=""
                    className="h-8 w-[140px] rounded border border-[#ccc] bg-white pl-8 pr-2 text-[13px] text-[#0a0a0a] outline-none focus:border-[#1c52de]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">
                  Date type
                </label>
                <button className="h-8 w-[140px] rounded border border-[#ccc] bg-white px-3 text-[13px] text-[#0a0a0a] flex items-center justify-between">
                  <span>Any date</span>
                  <ChevronDown className="h-3 w-3 text-[#8c919a]" />
                </button>
              </div>
            </div>

            {/* Filter & Columns buttons */}
            <button className="h-8 rounded border border-[#ccc] bg-white px-3 text-[13px] text-[#333940] flex items-center gap-1.5 hover:bg-[#f7f7f7]">
              Filter
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
            <button className="h-8 rounded border border-[#ccc] bg-white px-3 text-[13px] text-[#333940] flex items-center gap-1.5 hover:bg-[#f7f7f7]">
              Columns
              <Columns3 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Summary line */}
          <div className="px-4 py-2 flex justify-end text-[13px] text-[#333940] border-b border-[#e1e2e5]">
            <span>
              {filteredBills.length} items | {formatCurrency(totalAmount).replace("$", "")} NZD
            </span>
          </div>

          {/* Separator */}
          <div className="border-b border-[#d5d7da]" />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#d5d7da] text-[13px] text-[#333940]">
                  <th className="w-[50px] px-2 py-2 font-normal">View</th>
                  <th className="px-3 py-2 font-normal">From</th>
                  <th className="px-3 py-2 font-normal">Status</th>
                  <th className="px-3 py-2 font-normal">Reference</th>
                  <th className="px-3 py-2 font-normal">Risk status</th>
                  <th className="px-3 py-2 font-normal">Date</th>
                  <th className="px-3 py-2 font-normal">Due date</th>
                  <th className="px-3 py-2 font-normal text-right">Paid</th>
                  <th className="px-3 py-2 font-normal text-right">Due</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      router.push(`${prototypeBasePath}/${bill.id}`)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`${prototypeBasePath}/${bill.id}`);
                      }
                    }}
                    className={`border-b border-[#eaebec] h-9 cursor-pointer transition-colors hover:bg-[#f7f8fa] ${
                      bill.aiFlagged
                        ? bill.riskLevel === "high"
                          ? "border-l-[3px] border-l-[#c31230]"
                          : "border-l-[3px] border-l-[#d97706]"
                        : "border-l-[3px] border-l-transparent"
                    }`}
                  >
                    {/* View icon */}
                    <td className="w-[50px] px-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`${prototypeBasePath}/${bill.id}`);
                        }}
                        className="w-8 h-8 flex items-center justify-center text-[#1c52de] hover:bg-[#e6f0ff] rounded transition-colors"
                      >
                        <Eye className="h-[18px] w-[18px]" />
                      </button>
                    </td>
                    {/* From (supplier) */}
                    <td className="px-3">
                      <span className="text-[#1c52de] hover:underline font-normal cursor-pointer">
                        {bill.supplier}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-3">{statusPill(bill.status)}</td>
                    {/* Reference (bill number) */}
                    <td className="px-3">
                      <span className="text-[#1c52de] hover:underline font-normal cursor-pointer">
                        {bill.billNumber}
                      </span>
                    </td>
                    {/* Risk status */}
                    <td className="px-3">
                      {bill.aiFlagged && bill.riskLevel
                        ? (() => {
                            const cfg = {
                              high: { label: "High risk", text: "text-[#c31230]", icon: "text-[#c31230]", border: "border-[#c31230]/30", bg: "bg-[#fef2f2]" },
                              medium: { label: "Med risk", text: "text-[#d97706]", icon: "text-[#d97706]", border: "border-[#d97706]/30", bg: "bg-[#fef3c7]/50" },
                              low: { label: "Low risk", text: "text-[#92400e]", icon: "text-[#d4a017]", border: "border-[#d4a017]/30", bg: "bg-[#fef9c3]/50" },
                            }[bill.riskLevel];
                            return (
                              <div className="relative group/risk">
                                <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[12px] font-medium cursor-default ${cfg.text}`}>
                                  <ShieldAlert className={`h-3 w-3 ${cfg.icon}`} />
                                  {cfg.label}
                                </span>
                                {/* Xero Protect hover popover */}
                                <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover/risk:block">
                                  <div className="w-[320px] rounded-lg border border-[#e1e2e5] bg-white shadow-lg overflow-hidden">
                                    {/* Header bar */}
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#f8f9fa] to-white border-b border-[#e1e2e5]">
                                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#f2f3f4]">
                                        <ShieldAlert className="h-3 w-3 text-[#6b7280]" />
                                      </div>
                                      <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Xero Protect</span>
                                    </div>
                                    {/* Content */}
                                    <div className="px-3 py-3 space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1 text-[12px] font-semibold ${cfg.text}`}>
                                          {cfg.label}
                                        </span>
                                        {bill.riskType && (
                                          <span className="text-[11px] text-[#8c919a] font-medium">
                                            · {riskTypeLabels[bill.riskType]}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[12px] text-[#333940] leading-relaxed">
                                        {bill.aiReason}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()
                        : <span className="text-[#8c919a]">—</span>}
                    </td>
                    {/* Date (issue date) */}
                    <td className="px-3 text-[#0a0a0a]">
                      {bill.issueDate}
                    </td>
                    {/* Due date */}
                    <td className="px-3 text-[#0a0a0a]">
                      {bill.dueDate}
                    </td>
                    {/* Paid */}
                    <td className="px-3 text-right text-[#0a0a0a]">
                      {bill.status === "paid"
                        ? formatCurrency(bill.total)
                            .replace("$", "")
                            .trim()
                        : "0.00"}
                    </td>
                    {/* Due */}
                    <td className="px-3 text-right text-[#0a0a0a]">
                      {bill.status !== "paid"
                        ? formatCurrency(bill.total)
                            .replace("$", "")
                            .trim()
                        : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBills.length === 0 ? (
              <div className="px-6 py-12 text-center text-[13px] text-[#8c919a]">
                No bills match the current filters.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SafetyShieldChrome>
  );
}
