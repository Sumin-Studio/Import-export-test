"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/app/contexts/NavigationContext";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
  MoreVertical,
  Paperclip,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import {
  getAverageSafetyShieldBillAmount,
  getSafetyShieldBillById,
  getSafetyShieldBillIds,
  type LineItem,
} from "@/data/safety-shield";
import { formatCurrency, statusPill } from "@/components/xero-protect/SafetyShieldChrome";

const BILLS_BASE = "/xero-protect/prototype/3/bills";

/**
 * Risk banner buttons — minimal, automation-first:
 *
 * Principle: Automate as much as possible. The banner already explains why we flagged
 * (aiReason). Don't make the user click to "get" insight; surface it in the copy or
 * run it in the background. Buttons are only for decisions the human must make.
 *
 * Standard set (all flagged bills):
 * - Approve — "I've verified, clear the flag" (primary)
 * - Dismiss flag — "I've seen it, remove the flag" (secondary)
 *
 * Duplicate only (add one):
 * - Void and reconcile — destructive; "Remove this bill and reconcile"
 *
 * "View original" for duplicates is a link in the banner text, not a button.
 * We do not show: Check network, Cross-reference, Explain spike, Show cash impact
 * as buttons — those are automated and reflected in aiReason or future inline detail.
 */

function LineItemPopover({
  item,
  rect,
  onClose,
}: {
  item: LineItem;
  rect: DOMRect;
  onClose: () => void;
}) {
  const popoverWidth = 280;
  const left = rect.left + rect.width / 2 - popoverWidth / 2;
  const top = rect.bottom + 6;
  const style: React.CSSProperties = {
    position: "fixed",
    left: Math.max(8, Math.min(left, (typeof window !== "undefined" ? window.innerWidth : 400) - popoverWidth - 8)),
    top,
    zIndex: 9999,
    width: popoverWidth,
  };
  return (
    <div
      className="bg-white border border-[#cfd1d5] rounded-md shadow-lg p-4"
      style={{ ...style, boxShadow: "0 3px 12px rgba(0,0,0,0.15)" }}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      <p className="text-[13px] font-semibold text-[#1e3145] mb-2">{item.description}</p>
      <dl className="text-[12px] space-y-1 text-[#424f60]">
        <div className="flex justify-between">
          <dt>Qty</dt>
          <dd className="text-[#0a0a0a] font-medium">{item.quantity}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Unit price</dt>
          <dd className="text-[#0a0a0a] font-medium">{item.unitPrice.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Account</dt>
          <dd className="text-[#0a0a0a] font-medium">{item.account}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax rate</dt>
          <dd className="text-[#0a0a0a] font-medium">{item.taxRate}%</dd>
        </div>
        <div className="flex justify-between pt-1 border-t border-[#e1e2e5]">
          <dt className="font-medium text-[#1e3145]">Amount</dt>
          <dd className="font-semibold text-[#0a0a0a]">{item.amount.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function BillDetailPanePage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const { openPanel } = useNavigation();
  const billId = resolvedParams.billId;
  const bill = getSafetyShieldBillById(billId);
  const persistentQuery = searchParams.toString();
  const billsListHref = persistentQuery ? `${BILLS_BASE}?${persistentQuery}` : BILLS_BASE;
  const buildBillHref = (id: string) =>
    persistentQuery ? `${BILLS_BASE}/${id}?${persistentQuery}` : `${BILLS_BASE}/${id}`;
  const [actionTaken, setActionTaken] = useState<"approved" | "dismissed" | null>(null);
  const [paymentsOpen, setPaymentsOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  // Auto-expand history when flag is dismissed so user sees the note
  useEffect(() => {
    if (actionTaken === "dismissed") setHistoryOpen(true);
  }, [actionTaken]);
  const [jaxOpen, setJaxOpen] = useState(false);
  const [jaxPrompt, setJaxPrompt] = useState<string | null>(null);
  const [jaxSteps, setJaxSteps] = useState<
    Array<{ label: string; detail: string; status: "pending" | "running" | "done" }>
  >([]);
  const jaxTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [hoveredLineIndex, setHoveredLineIndex] = useState<number | null>(null);
  const [hoveredLineRect, setHoveredLineRect] = useState<DOMRect | null>(null);
  const lineLeaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { prevId, nextId } = useMemo(() => {
    const ids = getSafetyShieldBillIds();
    const i = ids.indexOf(billId);
    return {
      prevId: i > 0 ? ids[i - 1] : null,
      nextId: i >= 0 && i < ids.length - 1 ? ids[i + 1] : null,
    };
  }, [billId]);

  if (!bill) {
    return (
      <div className="p-6">
        <div className="bg-white rounded border border-[#e1e2e5] p-6">
          <p className="text-[15px] font-semibold text-[#0a0a0a]">Bill not found.</p>
          <Link
            href={billsListHref}
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-[#1c52de] hover:underline"
          >
            Back to bills
          </Link>
        </div>
      </div>
    );
  }

  const averageAmount = getAverageSafetyShieldBillAmount();
  const percentHigher = Math.round(
    ((bill.amount - averageAmount) / averageAmount) * 100
  );
  const riskIssueSummary =
    bill.riskType === "duplicate"
      ? `Possible duplicate invoice for ${bill.supplier}.`
      : bill.riskType === "anomalous_amount"
        ? `Amount is unusual for ${bill.supplier}.`
        : bill.riskType === "bank_detail_change"
          ? `Supplier bank details changed recently for ${bill.supplier}.`
          : `First bill from ${bill.supplier} with a high amount.`;

  const isOverdue = bill.status === "overdue" || (
    bill.status === "awaiting_payment" &&
    new Date(bill.dueDate) < new Date()
  );

  const subtotal = bill.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxTotal = bill.tax;
  const jaxPrompts = [
    "What should I verify before approving this bill?",
    "Summarise the risk in plain English",
    "Draft a message to the supplier to confirm details",
  ] as const;

  const jaxReplies: Record<(typeof jaxPrompts)[number], string> = {
    "What should I verify before approving this bill?":
      "Before approval: confirm supplier bank details match a known account, validate invoice number and amount against source docs, and check this bill is not a duplicate of an existing payable.",
    "Summarise the risk in plain English":
      `${bill.aiReason} In short: this bill is unusual enough to pause and verify before payment.`,
    "Draft a message to the supplier to confirm details":
      `Hi ${bill.supplier}, before we process payment for ${bill.billNumber}, can you please confirm the invoice details and the intended bank account? Thanks.`,
  };

  const handleJaxInvestigate = () => {
    setJaxOpen(true);
    setJaxPrompt(null);
    jaxTimersRef.current.forEach(clearTimeout);
    jaxTimersRef.current = [];

    const steps = [
      {
        label: "Checking supplier and historical bill patterns",
        detail: `Reviewing previous payments and amount ranges for ${bill.supplier}.`,
      },
      {
        label: "Validating bank and identity risk signals",
        detail: "Comparing payment and contact details against known trusted records.",
      },
      {
        label: "Compiling recommendation for this bill",
        detail: `Prepared a review summary for ${bill.billNumber} with suggested next actions.`,
      },
    ];

    setJaxSteps(steps.map((step) => ({ ...step, status: "pending" })));

    steps.forEach((_, i) => {
      const startTimer = setTimeout(() => {
        setJaxSteps((prev) =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: "running" } : step
          )
        );
      }, i * 1800 + 200);

      const doneTimer = setTimeout(() => {
        setJaxSteps((prev) =>
          prev.map((step, idx) => (idx === i ? { ...step, status: "done" } : step))
        );
      }, (i + 1) * 1800);

      jaxTimersRef.current.push(startTimer, doneTimer);
    });
  };

  useEffect(() => {
    return () => {
      jaxTimersRef.current.forEach(clearTimeout);
      jaxTimersRef.current = [];
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white overflow-auto">
      {/* ── Header bar ── */}
      <div className="px-3 pt-3 pb-0 border-b border-[#e1e2e5] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <h2
              className="text-[17px] font-bold text-[#000a1e] whitespace-nowrap"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              View bill
            </h2>
            {statusPill(bill.status)}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button className="h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] flex items-center gap-1.5 hover:bg-[#f7f8fa]">
              Attach files
              <ChevronDown className="h-2.5 w-2.5" />
            </button>
            <button className="h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] hover:bg-[#f7f8fa]">
              Copy
            </button>
            <button className="h-8 px-3 rounded border border-[#0078c8] bg-[#0078c8] text-[13px] font-bold text-white hover:bg-[#006bb3]">
              Edit
            </button>
            <div className="flex items-center gap-0.5 ml-1">
            <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] hover:bg-white hover:shadow-sm" aria-label="More options">
              <MoreVertical className="h-4 w-4" />
            </button>
            {prevId ? (
              <Link
                href={buildBillHref(prevId)}
                aria-label="Previous bill"
                className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 text-[#6b7280] hover:bg-white hover:shadow-sm"
              >
                <ChevronUp className="h-4 w-4" />
              </Link>
            ) : (
              <span
                aria-hidden
                className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 text-[#d5d7da] cursor-default"
              >
                <ChevronUp className="h-4 w-4" />
              </span>
            )}
            {nextId ? (
              <Link
                href={buildBillHref(nextId)}
                aria-label="Next bill"
                className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 text-[#6b7280] hover:bg-white hover:shadow-sm"
              >
                <ChevronDown className="h-4 w-4" />
              </Link>
            ) : (
              <span
                aria-hidden
                className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 text-[#d5d7da] cursor-default"
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            )}
            <Link
              href={billsListHref}
              aria-label="Close"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] hover:bg-white hover:shadow-sm shrink-0"
            >
              <X className="h-4 w-4" />
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-auto px-4 pt-4">
        {jaxOpen && (
          <section className="rounded border border-[#e1e2e5] bg-white p-4 mb-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1e2e5]">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f0f4ff]">
                  <Sparkles className="h-3.5 w-3.5 text-[#1c52de]" />
                </div>
                <p className="text-[14px] font-semibold text-[#0a0a0a]">JAX</p>
              </div>
              <button
                type="button"
                onClick={() => setJaxOpen(false)}
                className="text-[#8c919a] hover:text-[#333940] p-1 rounded hover:bg-[#f2f3f4]"
                aria-label="Close JAX panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="pt-3 space-y-3">
              {jaxSteps.map((step, index) => (
                <div
                  key={`${step.label}-${index}`}
                  className={step.status === "pending" ? "opacity-50" : "opacity-100"}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      {step.status === "running" ? (
                        <Loader2 className="h-4 w-4 text-[#1c52de] animate-spin" />
                      ) : step.status === "done" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#0b6e38]" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-[#d5d7da]" />
                      )}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#0a0a0a]">{step.label}</p>
                      {step.status === "running" ? (
                        <p className="text-[12px] text-[#8c919a] mt-1 italic">Thinking...</p>
                      ) : step.status === "done" ? (
                        <p className="text-[12px] text-[#6b7280] mt-1">{step.detail}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}

              {jaxSteps.length > 0 && jaxSteps.every((step) => step.status === "done") && (
                <div className="pt-3 border-t border-[#e1e2e5]">
                  <p className="text-[12px] text-[#6b7280] mb-2">Try asking JAX:</p>
                  <div className="flex flex-wrap gap-2">
                    {jaxPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => setJaxPrompt(prompt)}
                        className="rounded-full border border-[#d5d7da] bg-white px-3 py-1.5 text-[12px] text-[#333940] hover:bg-[#f7f8fa]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  {jaxPrompt && (
                    <div className="mt-3 rounded border border-[#e1e2e5] bg-[#f7f8fa] px-3 py-2">
                      <p className="text-[12px] font-medium text-[#333940]">JAX</p>
                      <p className="text-[12px] text-[#333940] mt-1 leading-relaxed">
                        {jaxReplies[jaxPrompt]}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Field row (Contact, Issue date, Planned date, Due date, Reference, Tax) ── */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] mb-4">
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Contact</p>
            <p className="text-[15px] font-bold text-[#0078c8] mt-1">{bill.supplier}</p>
          </div>
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Issue date</p>
            <p className="text-[15px] text-[#000a1e] mt-1">{formatDate(bill.issueDate)}</p>
          </div>
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Planned date</p>
            <p className="text-[15px] text-[#0078c8] mt-1 flex items-center gap-1">
              <Paperclip className="h-3 w-3 hidden" />
              Add date
            </p>
          </div>
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Due date</p>
            <p className={`text-[15px] mt-1 ${isOverdue ? "text-[#dc3246]" : "text-[#000a1e]"}`}>
              {formatDate(bill.dueDate)}
            </p>
          </div>
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Reference</p>
            <p className="text-[15px] text-[#000a1e] mt-1">{bill.billNumber}</p>
          </div>
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Tax</p>
            <p className="text-[15px] text-[#000a1e] mt-1">Tax inclusive</p>
          </div>
        </div>

        {/* ── Line items table (XUI editable-table style) ── */}
        <div className="border border-[#ccced2] rounded mb-1 overflow-x-auto">
          <table className="w-full text-[13px] border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white">
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Item
                </th>
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Description
                </th>
                <th className="text-right font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Qty.
                </th>
                <th className="text-right font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Price
                </th>
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Account
                </th>
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Tax rate
                </th>
                <th className="text-right font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {bill.lineItems.map((item, idx) => (
                <tr
                  key={`${bill.id}-${idx}`}
                  className="border-t border-[#ccced2] cursor-default transition-colors [transition-duration:0.15s] hover:bg-[#f7f8fa]"
                  onMouseEnter={(e) => {
                    if (lineLeaveTimeout.current) {
                      clearTimeout(lineLeaveTimeout.current);
                      lineLeaveTimeout.current = null;
                    }
                    setHoveredLineIndex(idx);
                    setHoveredLineRect(e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseLeave={() => {
                    lineLeaveTimeout.current = setTimeout(() => {
                      setHoveredLineIndex(null);
                      setHoveredLineRect(null);
                      lineLeaveTimeout.current = null;
                    }, 150);
                  }}
                >
                  <td className="px-2 py-2 text-[#000a1e] align-top">
                    <span className="inline-block border border-[rgba(0,10,30,0.5)] rounded text-[11px] text-[rgba(0,10,30,0.75)] px-1.5 py-0.5 leading-tight">
                      {bill.billNumber}
                    </span>
                    <p className="text-[15px] text-[#000a1e] mt-1 leading-snug">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-2 py-2 text-[15px] text-[#000a1e] align-top">
                    {item.description}
                  </td>
                  <td className="px-2 py-2 text-right text-[15px] text-[#000a1e] align-top">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-2 text-right text-[15px] text-[#000a1e] align-top">
                    {item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-2 py-2 text-[15px] text-[#000a1e] align-top leading-snug">
                    {item.account}
                  </td>
                  <td className="px-2 py-2 text-[15px] text-[#000a1e] align-top leading-snug">
                    GST on Expenses
                  </td>
                  <td className="px-2 py-2 text-right text-[15px] text-[#000a1e] align-top">
                    {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Line item hover popover */}
        {hoveredLineIndex !== null &&
          hoveredLineRect &&
          bill.lineItems[hoveredLineIndex] &&
          typeof document !== "undefined" &&
          createPortal(
            <LineItemPopover
              item={bill.lineItems[hoveredLineIndex]}
              rect={hoveredLineRect}
              onClose={() => {
                if (lineLeaveTimeout.current) clearTimeout(lineLeaveTimeout.current);
                setHoveredLineIndex(null);
                setHoveredLineRect(null);
              }}
            />,
            document.body
          )}

        {/* ── Columns button + Totals ── */}
        <div className="flex items-start justify-between gap-4 mt-3 mb-4">
          <button className="h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] flex items-center gap-1.5 hover:bg-[#f7f8fa]">
            Columns (0 hidden)
            <ChevronDown className="h-2.5 w-2.5" />
          </button>

          <div className="text-[15px] w-[280px]">
            <div className="flex justify-between py-2">
              <span className="text-[#000a1e]">Subtotal</span>
              <span className="text-[#000a1e]">{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 pl-6 text-[13px] text-[rgba(0,10,30,0.75)]">
              <span>Includes GST 15%</span>
              <span>{taxTotal.toFixed(2)}</span>
            </div>
            <div className="border-t-[3px] border-[#a6a9b0] mt-2 pt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[21px] font-bold text-[rgba(0,10,30,0.75)]">Total</span>
                <span className="text-[21px] font-bold text-[#000a1e]">
                  {bill.total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="border-t border-[#a6a9b0] mt-2" />
          </div>
        </div>

        {/* ── Payments section (collapsible) ──
            Standard buttons by status:
            - Header: "Edit" is always shown (and Attach files, Copy).
            - Paid: Payments section shows "Paid in full on {date}" only; no Record payment button.
            - Awaiting payment / overdue / draft / awaiting_approval: Payments section shows
              date paid, account, amount, reference + "Record payment" button.
        */}
        <div className="bg-white rounded border border-[#e1e2e5] shadow-sm mb-4">
          <button
            type="button"
            onClick={() => setPaymentsOpen(!paymentsOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left"
          >
            <ChevronDown
              className={`h-3 w-3 text-[#0078c8] transition-transform ${
                paymentsOpen ? "" : "-rotate-90"
              }`}
            />
            <span className="text-[15px] font-bold text-[#000a1e]">Payments</span>
          </button>
          {paymentsOpen && (
            <div className="border-t border-[#e6e7e9] px-5 py-5">
              {bill.status === "paid" ? (
                <p className="text-[13px] text-[rgba(0,10,30,0.75)]">
                  Paid in full on {formatDate(bill.dueDate)}
                </p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-[13px] font-bold text-[rgba(0,10,30,0.75)] block mb-1">
                      Date paid
                    </label>
                    <div className="h-8 rounded border border-[#a6a9b0] bg-white px-3 flex items-center text-[13px] text-[rgba(0,10,30,0.65)]">
                      Select date
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-[13px] font-bold text-[rgba(0,10,30,0.75)] block mb-1">
                      Account
                    </label>
                    <div className="h-8 rounded border border-[#a6a9b0] bg-white px-3 flex items-center text-[13px] text-[rgba(0,10,30,0.65)]">
                      Select account
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-[13px] font-bold text-[rgba(0,10,30,0.75)] block mb-1">
                      Amount paid
                      <span className="font-normal">(Required)</span>
                    </label>
                    <div className="h-8 rounded border border-[#a6a9b0] bg-white px-3 flex items-center text-[13px] text-[#000a1e]">
                      {bill.total.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-[13px] font-bold text-[rgba(0,10,30,0.75)] block mb-1">
                      Reference
                    </label>
                    <div className="h-8 rounded border border-[#a6a9b0] bg-white px-3 flex items-center text-[13px]" />
                  </div>
                </div>
              )}
              {bill.status !== "paid" && (
                <button className="mt-5 h-8 px-4 rounded bg-[#0078c8] border border-[#0078c8] text-[13px] font-bold text-white hover:bg-[#006bb3]">
                  Record payment
                </button>
              )}
            </div>
          )}
        </div>

        {/* Compact risk callout between Payments and History */}
        {bill.aiFlagged && !actionTaken && (
          <div className="rounded border border-[#f5d98a] bg-[#fff8e5] px-4 py-2.5 mb-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex-1 min-w-[280px]">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-[#c31230]">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  High risk
                </p>
                <p className="mt-1 text-[13px] text-[#1e3145]">
                  {riskIssueSummary}
                  {percentHigher > 0 && bill.riskType !== "duplicate"
                    ? ` ${percentHigher}% above average bill value.`
                    : ""}
                  {bill.riskType === "duplicate" && bill.duplicateOfBillId && (
                    <>
                      {" "}
                      <Link
                        href={buildBillHref(bill.duplicateOfBillId)}
                        className="text-[#1c52de] hover:underline"
                      >
                        View original
                      </Link>
                      .
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openPanel("jax", `xero-protect-bill-${billId}`, true)}
                className="h-7 px-3 rounded border border-[#a6a9b0] bg-white text-[12px] font-semibold text-[#333940] hover:bg-[#f7f8fa] shrink-0"
              >
                Analyse with JAX
              </button>
            </div>
          </div>
        )}

        {/* ── History and notes (collapsible) ── */}
        <div className="mt-5 bg-white rounded border border-[#e1e2e5] shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setHistoryOpen(!historyOpen)}
              className="flex items-center gap-3 px-4 py-3 text-left"
            >
              <ChevronDown
                className={`h-3 w-3 text-[#0078c8] transition-transform ${
                  historyOpen ? "" : "-rotate-90"
                }`}
              />
              <span className="text-[15px] font-bold text-[#000a1e]">History and notes</span>
            </button>
            <button className="mr-3 h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] hover:bg-[#f7f8fa]">
              Add note
            </button>
          </div>
          {historyOpen && (
            <div className="border-t border-[#e6e7e9] px-5 py-4 text-[13px] text-[rgba(0,10,30,0.75)]">
              {actionTaken === "dismissed" ? (
                <div className="space-y-1">
                  <p className="font-medium text-[#0a0a0a]">
                    Flag dismissed — note added to bill history
                  </p>
                  <p className="text-[12px] text-[#6b7280]">
                    You can review this decision in Settings.
                  </p>
                </div>
              ) : (
                <p>No history or notes yet.</p>
              )}
            </div>
          )}
        </div>

        {/* ── Feedback bar ── */}
        <div className="bg-[#f2f3f4] rounded px-4 py-3 text-center mb-4">
          <p className="text-[13px] text-[rgba(0,10,30,0.75)]">
            {"We'd love your feedback on the new look and feel of the bills details view"}
          </p>
          <button className="mt-2 h-6 px-3 rounded border border-[#a6a9b0] bg-white text-[11px] font-bold text-[#0078c8] hover:bg-[#f7f8fa]">
            Share feedback
          </button>
        </div>

        {/* ── Go to full page view ── */}
        <div className="text-center pb-6">
          <button className="text-[15px] font-bold text-[#0078c8] inline-flex items-center gap-1.5 hover:underline">
            Go to full page view
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Format ISO date string to "Mon DD, YYYY" */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
