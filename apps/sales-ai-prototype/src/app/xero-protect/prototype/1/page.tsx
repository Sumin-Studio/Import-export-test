"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  Calendar,
  SlidersHorizontal,
  Columns3,
} from "lucide-react";
import {
  type BillStatus,
  getSafetyShieldBillsByStatus,
  safetyShieldBills,
} from "@/data/safety-shield";
import {
  SafetyShieldChrome,
  formatCurrency,
  riskFlag,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";

const BILLS_BASE = "/xero-protect/prototype/1";

/** Figma-accurate outlined eye icon (18×12) */
function EyeIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z"
        stroke="#1c52de"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="6" r="2.5" stroke="#1c52de" strokeWidth="1.5" />
    </svg>
  );
}

/** Overdue clock icon (red, 14px) */
function OverdueIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6" stroke="#c31230" strokeWidth="1.5" />
      <path d="M7 4V7.5L9.5 9" stroke="#c31230" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* 3 bills with distinct risk flags + popover content, matching Figma */
const RISK_FLAGS: Record<string, { label: string; popoverBody: React.ReactNode }> = {
  "2": {
    label: "Possible dupe",
    popoverBody: (
      <>
        <p className="mb-3">
          This invoice from <strong>City Power Co</strong> closely matches{" "}
          <strong>BILL-008</strong> (same supplier, similar amount) dated 10 Feb 2026.
        </p>
        <p>Review both invoices before authorising to avoid duplicate payment.</p>
      </>
    ),
  },
  "6": {
    label: "Unusual amount",
    popoverBody: (
      <>
        <p className="mb-3">
          This payment is <strong>120% higher</strong> than your average ($3,800) for{" "}
          <strong>Paper Plus Ltd</strong> over the past 12 months.
        </p>
        <p>Verify the invoice amount before authorising.</p>
      </>
    ),
  },
  "10": {
    label: "Bank # changed",
    popoverBody: (
      <>
        <p className="mb-3">
          The bank account for <strong>TechSupply Direct</strong> was changed{" "}
          <strong>2 days ago</strong>. Previous payments used a different account.
        </p>
        <p>Confirm the new bank details directly with the supplier before paying.</p>
      </>
    ),
  },
};

const statusTabs: Array<{ value: BillStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "awaiting_approval", label: "Awaiting approval" },
  { value: "awaiting_payment", label: "Awaiting payment" },
  { value: "paid", label: "Paid" },
];

/* Figma column widths (total ≈ 1568px) */
const COL = {
  view: "w-[50px] min-w-[50px]",
  from: "w-[280px] min-w-[180px]",
  status: "w-[229px] min-w-[120px]",
  ref: "w-[280px] min-w-[160px]",
  date: "w-[205px] min-w-[100px]",
  due: "w-[239px] min-w-[110px]",
  paid: "w-[142px] min-w-[80px]",
  amt: "w-[142px] min-w-[80px]",
};

/** Risk popover — appears on hover over a flagged row, matching Figma 7005:1497 */
function RiskPopover({
  label,
  children,
  billId,
}: {
  label: string;
  children: React.ReactNode;
  billId: string;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);
  const router = useRouter();

  const show = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const hide = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {riskFlag(label)}

      {open && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50"
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#cfd1d5]" />
          <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-white" />

          <div
            className="bg-white border border-[#cfd1d5] rounded-md w-[300px] p-5 pb-5"
            style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[17px] font-semibold text-[#1e3145] leading-[1.45]">
                  Possible Risk Flagged
                </p>
                <p className="text-[15px] text-[#c31230] leading-[1.45]">
                  ⚑ {label}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                className="text-[#424f60] hover:text-[#1e3145] ml-2 mt-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="bg-[#fde7e9] border border-[#dc3246] rounded-lg p-3 text-[15px] text-[#1e3145] leading-[1.45]">
              {children}
            </div>

            <div className="pt-5 flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`${BILLS_BASE}/${billId}`);
                }}
                className="bg-[#1f68dd] hover:bg-[#1a5bc4] text-white text-[13px] font-medium px-2 py-1 rounded-md min-h-[32px] transition-colors"
              >
                View bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function isOverdue(dueDate: string, status: string): boolean {
  if (status === "paid") return false;
  const due = new Date(dueDate);
  const now = new Date();
  return due < now;
}

export default function XeroProtectPrototype1Page() {
  const router = useRouter();
  const [tab, setTab] = useState<BillStatus | "all">("all");
  const [query, setQuery] = useState("");

  const baseBills = useMemo(() => {
    return tab === "all" ? safetyShieldBills : getSafetyShieldBillsByStatus(tab);
  }, [tab]);

  const filteredBills = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return baseBills;

    return baseBills.filter((bill) => {
      return [
        bill.billNumber,
        bill.supplier,
        bill.status.replace(/_/g, " "),
        bill.dueDate,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [baseBills, query]);

  const totalAmount = baseBills.reduce((sum, bill) => sum + bill.total, 0);

  const fmtDate = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-NZ", { month: "short", day: "2-digit", year: "numeric" });
  };

  const breadcrumb = [
    { label: "Prototypes", href: "/xero-protect/prototype" },
    { label: "Prototype 1", href: BILLS_BASE },
  ];

  return (
    <SafetyShieldChrome breadcrumb={breadcrumb} pageTitle="Bills">
      {/* ─── Tabs row ─── */}
      <div className="bg-white border-b border-[#e1e2e5]">
        <div className="px-4 flex items-end">
          <div className="flex items-stretch">
            {statusTabs.map((item) => {
              const isActive = tab === item.value;
              const count =
                item.value !== "all"
                  ? getSafetyShieldBillsByStatus(item.value).length
                  : null;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTab(item.value)}
                  className={`px-5 pb-0 pt-4 text-[14px] font-normal transition-colors relative ${
                    isActive
                      ? "text-[#1c52de] after:absolute after:bottom-0 after:left-5 after:right-5 after:h-[3px] after:bg-[#1c52de] after:rounded-t"
                      : "text-[#333940] hover:text-[#0a0a0a]"
                  }`}
                  style={{ height: 60 }}
                >
                  {item.label}
                  {count !== null && count > 0 && (
                    <span className="ml-1.5 text-[14px] text-[#8c919a]">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Filter bar + table ─── */}
      <div className="px-4 pt-0">
        <div className="bg-white mt-0">
          <div className="px-2 py-2 flex flex-wrap items-end gap-3 border-b border-[#e1e2e5]">
            <div className="relative flex-1 min-w-[260px] max-w-[560px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a contact, amount, or reference"
                className="w-full h-8 rounded border border-[#ccc] bg-white pl-9 pr-3 text-[13px] text-[#0a0a0a] outline-none transition placeholder:text-[#8c919a] focus:border-[#1c52de] focus:ring-1 focus:ring-[#1c52de]"
              />
            </div>

            <div className="flex items-end gap-3">
              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">Start date</label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
                  <input
                    type="text"
                    className="h-8 w-[140px] rounded border border-[#ccc] bg-white pl-8 pr-2 text-[13px] text-[#0a0a0a] outline-none focus:border-[#1c52de]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">End date</label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c919a]" />
                  <input
                    type="text"
                    className="h-8 w-[140px] rounded border border-[#ccc] bg-white pl-8 pr-2 text-[13px] text-[#0a0a0a] outline-none focus:border-[#1c52de]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7280] mb-1">Date type</label>
                <button className="h-8 w-[140px] rounded border border-[#ccc] bg-white px-3 text-[13px] text-[#0a0a0a] flex items-center justify-between">
                  <span>Any date</span>
                  <ChevronDown className="h-3 w-3 text-[#8c919a]" />
                </button>
              </div>
            </div>

            <button className="h-8 rounded border border-[#ccc] bg-white px-3 text-[13px] text-[#333940] flex items-center gap-1.5 hover:bg-[#f7f7f7]">
              Filter
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
            <button className="h-8 rounded border border-[#ccc] bg-white px-3 text-[13px] text-[#333940] flex items-center gap-1.5 hover:bg-[#f7f7f7]">
              Columns
              <Columns3 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="px-2 h-6 flex items-center justify-end text-[13px] text-[#333940]">
            {filteredBills.length} items | {formatCurrency(totalAmount).replace("$", "")} NZD
          </div>

          <div className="overflow-visible">
            <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
              <colgroup>
                <col className={COL.view} />
                <col className={COL.from} />
                <col className={COL.status} />
                <col className={COL.ref} />
                <col className={COL.date} />
                <col className={COL.due} />
                <col className={COL.paid} />
                <col className={COL.amt} />
              </colgroup>

              <thead>
                <tr className="h-10 border-b border-[#d5d7da] text-left text-[13px] text-[#333940]">
                  <th className="px-2 font-normal">View</th>
                  <th className="pl-3 font-normal">From</th>
                  <th className="pl-2 font-normal">Status</th>
                  <th className="pl-2 font-normal">Reference</th>
                  <th className="pl-2 font-normal">Date</th>
                  <th className="pl-2 font-normal">
                    <span className="inline-flex items-center gap-0.5">
                      Due date
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1l3 3 3-3" stroke="#333940" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </th>
                  <th className="pr-3 font-normal text-right">Paid</th>
                  <th className="pr-3 font-normal text-right">Due</th>
                </tr>
              </thead>

              <tbody>
                {filteredBills.map((bill) => {
                  const overdue = isOverdue(bill.dueDate, bill.status);
                  const risk = RISK_FLAGS[bill.id];

                  return (
                    <tr
                      key={bill.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => router.push(`${BILLS_BASE}/${bill.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          router.push(`${BILLS_BASE}/${bill.id}`);
                        }
                      }}
                      className={`h-9 border-b border-[#eaebec] cursor-pointer transition-colors ${
                        risk
                          ? "bg-[#FDE7E9] hover:bg-[#fcdcdf]"
                          : "hover:bg-[#f7f8fa]"
                      }`}
                    >
                      <td className="px-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`${BILLS_BASE}/${bill.id}`);
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-[#e6f0ff]"
                        >
                          <EyeIcon />
                        </button>
                      </td>

                      <td className="pl-3 pr-2">
                        <span className="text-[#0a0a0a] font-semibold text-[13px]">
                          {bill.supplier}
                        </span>
                      </td>

                      <td className="pl-2 pr-2">{statusPill(bill.status)}</td>

                      <td className="pl-2 pr-2">
                        <span className="inline-flex items-center">
                          <Link
                            href={`${BILLS_BASE}/${bill.id}`}
                            className="text-[#0a0a0a] text-[13px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {bill.billNumber}
                          </Link>
                          {risk && (
                            <RiskPopover label={risk.label} billId={bill.id}>
                              {risk.popoverBody}
                            </RiskPopover>
                          )}
                        </span>
                      </td>

                      <td className="pl-2 pr-2 text-[#0a0a0a]">
                        {fmtDate(bill.issueDate)}
                      </td>

                      <td className="pl-2 pr-2">
                        {overdue ? (
                          <span className="inline-flex items-center gap-1 text-[#c31230]">
                            <OverdueIcon />
                            {fmtDate(bill.dueDate)}
                          </span>
                        ) : (
                          <span className="text-[#0a0a0a]">{fmtDate(bill.dueDate)}</span>
                        )}
                      </td>

                      <td className="pr-3 text-right text-[#0a0a0a]">
                        {bill.status === "paid"
                          ? formatCurrency(bill.total).replace("$", "").trim()
                          : "0.00"}
                      </td>

                      <td className="pr-3 text-right text-[#0a0a0a]">
                        {bill.status !== "paid"
                          ? formatCurrency(bill.total).replace("$", "").trim()
                          : "0.00"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredBills.length === 0 && (
              <div className="px-6 py-12 text-center text-[13px] text-[#8c919a]">
                No bills match the current filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </SafetyShieldChrome>
  );
}
