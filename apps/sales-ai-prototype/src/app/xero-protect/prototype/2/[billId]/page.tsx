"use client";

import Link from "next/link";
import { use, useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Globe,
  Search,
  Check,
  X,
  Eye,
  Trash2,
  BarChart3,
  DollarSign,
  Loader2,
  ChevronDown,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  type SuggestedAction,
  getAverageSafetyShieldBillAmount,
  getSafetyShieldBillById,
  riskTypeLabels,
} from "@/data/safety-shield";
import {
  SafetyShieldChrome,
  formatCurrency,
  riskTypePill,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";

const actionIcons: Record<SuggestedAction["icon"], React.ElementType> = {
  network: Globe,
  search: Search,
  check: Check,
  x: X,
  eye: Eye,
  trash: Trash2,
  chart: BarChart3,
  dollar: DollarSign,
  mail: Globe,
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  awaiting_approval: "Awaiting Approval",
  awaiting_payment: "Awaiting Payment",
  overdue: "Overdue",
  paid: "Paid",
};

export default function XeroProtectBillDetailPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const pathname = usePathname();
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<
    Record<string, { result?: string; confirmation?: string }>
  >({});
  const [resolved, setResolved] = useState<{
    label: string;
    message: string;
  } | null>(null);

  // New action states
  const [actionTaken, setActionTaken] = useState<"approved" | "dismissed" | null>(null);
  const [actionBannerVisible, setActionBannerVisible] = useState(false);
  const [jaxOpen, setJaxOpen] = useState(false);
  const [jaxSteps, setJaxSteps] = useState<Array<{ label: string; status: "pending" | "running" | "done"; detail?: string }>>([]);
  const jaxTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const resolvedParams = use(params);
  const bill = getSafetyShieldBillById(resolvedParams.billId);

  const prototypeId = (() => {
    const match = pathname.match(/\/xero-protect\/prototype\/(\d+)/);
    return match?.[1] ?? "2";
  })();
  const prototypeBasePath = `/xero-protect/prototype/${prototypeId}`;

  const handleAction = useCallback(
    (action: SuggestedAction) => {
      if (action.agentResult) {
        setLoadingActionId(action.id);
        setTimeout(() => {
          setLoadingActionId(null);
          setCompletedActions((prev) => ({
            ...prev,
            [action.id]: { result: action.agentResult },
          }));
        }, 1800);
      } else if (action.confirmation) {
        setResolved({ label: action.label, message: action.confirmation });
      }
    },
    []
  );

  const handleResolve = useCallback(
    (label: string, message: string) => {
      setResolved({ label, message });
    },
    []
  );

  const handleApprove = useCallback(() => {
    setActionTaken("approved");
    setActionBannerVisible(true);
    setResolved(null);
  }, []);

  const handleDismiss = useCallback(() => {
    setActionTaken("dismissed");
    setActionBannerVisible(true);
    setResolved(null);
  }, []);

  const handleJaxInvestigate = useCallback(() => {
    setJaxOpen(true);
    // Clear any previous timers
    jaxTimersRef.current.forEach(clearTimeout);
    jaxTimersRef.current = [];

    const steps = [
      { label: "Searching Xero network for supplier", detail: `Checking "${bill?.supplier}" across the Xero partner network for verification and payment history...` },
      { label: "Running Confirmation of Payee check", detail: `Verifying bank account details match the registered account name for "${bill?.supplier}". Account name matches registered business name.` },
      { label: "Analysing bill against historical patterns", detail: `No previous bills from this supplier. Amount of ${bill ? formatCurrency(bill.amount) : ""} is within normal range for the "${bill?.lineItems?.[0]?.account}" category.` },
      { label: "Drafting verification email", detail: `Prepared an email to ${bill?.supplier} requesting confirmation of bank account details and contact information before first payment is processed.` },
    ];

    setJaxSteps(steps.map((s) => ({ ...s, status: "pending" })));

    steps.forEach((_, i) => {
      // Start running
      const t1 = setTimeout(() => {
        setJaxSteps((prev) =>
          prev.map((s, j) => (j === i ? { ...s, status: "running" } : s))
        );
      }, i * 2200 + 300);
      // Mark done
      const t2 = setTimeout(() => {
        setJaxSteps((prev) =>
          prev.map((s, j) => (j === i ? { ...s, status: "done" } : s))
        );
      }, (i + 1) * 2200);
      jaxTimersRef.current.push(t1, t2);
    });
  }, [bill]);

  const breadcrumb = [
    { label: "Prototypes", href: "/xero-protect/prototype" },
    {
      label: prototypeId === "2" ? "Prototype 2 (Rory)" : `Prototype ${prototypeId}`,
      href: prototypeBasePath,
    },
  ];

  if (!bill) {
    return (
      <SafetyShieldChrome breadcrumb={breadcrumb} pageTitle="Bills">
        <div className="px-4 py-8">
          <div className="bg-white rounded border border-[#e1e2e5] p-8">
            <p className="text-[15px] font-semibold text-[#0a0a0a]">
              Bill not found.
            </p>
            <Link
              href={prototypeBasePath}
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#1c52de]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to bills
            </Link>
          </div>
        </div>
      </SafetyShieldChrome>
    );
  }

  const averageAmount = getAverageSafetyShieldBillAmount();
  const percentHigher = Math.round(
    ((bill.amount - averageAmount) / averageAmount) * 100
  );
  const hasActions = bill.suggestedActions && bill.suggestedActions.length > 0;

  return (
    <SafetyShieldChrome breadcrumb={breadcrumb} pageTitle="Bills">
      <div className={jaxOpen ? "flex flex-1" : ""}>
      {/* Main content */}
      <div className={`px-8 py-6 space-y-4 transition-all duration-300 ${jaxOpen ? "flex-1 min-w-0" : "mx-auto"}`} style={{ maxWidth: jaxOpen ? undefined : 1200 }}>

        {/* Action taken confirmation (approve / dismiss) */}
        {actionTaken && actionBannerVisible ? (
          <section className={`rounded border px-4 py-3 ${actionTaken === "approved" ? "border-[#b7e4c7] bg-[#f0faf5]" : "border-[#f5d98a] bg-[#fef9e7]"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${actionTaken === "approved" ? "bg-[#d4f5e6]" : "bg-[#fef3c7]"}`}>
                  {actionTaken === "approved" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0b6e38]" />
                  ) : (
                    <MessageSquare className="h-3.5 w-3.5 text-[#92400e]" />
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#0a0a0a]">
                    {actionTaken === "approved"
                      ? `Bill ${bill.status === "draft" ? "submitted for approval" : "approved"} — a record has been added to bill history`
                      : "Flag dismissed — a note has been added to bill history"}
                  </p>
                  <p className="text-[12px] text-[#6b7280] mt-0.5">
                    {actionTaken === "approved"
                      ? "Xero Protect flag has been cleared for this bill."
                      : "Xero Protect flag has been dismissed. You can review this decision in Settings."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActionBannerVisible(false)}
                className="text-[#8c919a] hover:text-[#333940] p-1 rounded hover:bg-[#e1e2e5]/50 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </section>
        ) : null}

        {/* Resolved confirmation (legacy) */}
        {resolved && !actionTaken ? (
          <section className="rounded border border-[#b7e4c7] bg-[#d4f5e6] p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#0b6e38]" />
              <div>
                <p className="text-[14px] font-semibold text-[#0a0a0a]">
                  {resolved.label}
                </p>
                <p className="mt-1 text-[13px] text-[#6b7280]">
                  {resolved.message}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Bill form card (matches Xero Edit Bill layout) ── */}
        <div className="bg-white rounded border border-[#e1e2e5]">

          {/* Status + top-right actions */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <span className="text-[14px] text-[#6b7280] font-medium">
              {statusLabels[bill.status] ?? bill.status}
            </span>
            <div className="flex items-center gap-2">
              <button className="h-8 px-4 rounded border border-[#0078c8] text-[13px] font-medium text-[#0078c8] hover:bg-[#f0f8ff] transition-colors">
                Print PDF
              </button>
              <button className="h-8 px-4 rounded border border-[#0078c8] text-[13px] font-medium text-[#0078c8] hover:bg-[#f0f8ff] transition-colors flex items-center gap-1">
                Bill Options
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Form fields row */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_1fr_0.8fr] gap-4 items-end">
              {/* From */}
              <div>
                <label className="block text-[12px] font-semibold text-[#333940] mb-1">From</label>
                <div className="h-9 rounded border border-[#ccc] bg-white px-3 flex items-center text-[13px] text-[#0a0a0a]">
                  {bill.supplier}
                </div>
              </div>
              {/* Date */}
              <div>
                <label className="block text-[12px] font-semibold text-[#333940] mb-1">Date</label>
                <div className="h-9 rounded border border-[#ccc] bg-white px-3 flex items-center justify-between text-[13px] text-[#0a0a0a]">
                  <span>{bill.issueDate}</span>
                  <ChevronDown className="h-3 w-3 text-[#8c919a]" />
                </div>
              </div>
              {/* Due Date */}
              <div>
                <label className="block text-[12px] font-semibold text-[#333940] mb-1">Due Date</label>
                <div className="h-9 rounded border border-[#ccc] bg-white px-3 flex items-center justify-between text-[13px] text-[#0a0a0a]">
                  <span>{bill.dueDate}</span>
                  <ChevronDown className="h-3 w-3 text-[#8c919a]" />
                </div>
              </div>
              {/* Reference */}
              <div>
                <label className="block text-[12px] font-semibold text-[#333940] mb-1">Reference</label>
                <div className="h-9 rounded border border-[#ccc] bg-white px-3 flex items-center text-[13px] text-[#0a0a0a]">
                  {bill.billNumber}
                </div>
              </div>
              {/* Total */}
              <div>
                <label className="block text-[12px] font-semibold text-[#333940] mb-1 text-right">Total</label>
                <div className="h-9 rounded border border-[#ccc] bg-white px-3 flex items-center justify-end text-[13px] font-semibold text-[#0a0a0a]">
                  {formatCurrency(bill.total).replace("$", "")}
                </div>
              </div>
            </div>
          </div>

          {/* Currency & tax row */}
          <div className="px-6 pb-4 flex items-center justify-between">
            <div className="h-8 rounded border border-[#ccc] bg-white px-3 flex items-center gap-2 text-[13px] text-[#0a0a0a]">
              <span>NZD New Zealand Dollar</span>
              <ChevronDown className="h-3 w-3 text-[#8c919a]" />
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#333940]">
              <span>Amounts are</span>
              <div className="h-8 rounded border border-[#ccc] bg-white px-3 flex items-center gap-2 text-[13px] text-[#0a0a0a]">
                <span>Tax Exclusive</span>
                <ChevronDown className="h-3 w-3 text-[#8c919a]" />
              </div>
            </div>
          </div>

          {/* Line items table */}
          <div className="px-6 pb-4">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-y border-[#d5d7da] text-[12px] font-semibold text-[#333940]">
                  <th className="py-2 pr-3 font-semibold">Item</th>
                  <th className="py-2 px-3 font-semibold">Description</th>
                  <th className="py-2 px-3 font-semibold text-right w-[70px]">Qty</th>
                  <th className="py-2 px-3 font-semibold text-right w-[100px]">Unit Price</th>
                  <th className="py-2 px-3 font-semibold w-[140px]">Account</th>
                  <th className="py-2 px-3 font-semibold w-[100px]">Tax Rate</th>
                  <th className="py-2 pl-3 font-semibold text-right w-[110px]">Amount NZD</th>
                </tr>
              </thead>
              <tbody>
                {bill.lineItems.map((item, index) => (
                  <tr key={`${bill.id}-${index}`} className="border-b border-[#eaebec]">
                    <td className="py-2 pr-3 text-[#8c919a]" />
                    <td className="py-2 px-3 text-[#0a0a0a]">{item.description}</td>
                    <td className="py-2 px-3 text-right text-[#0a0a0a]">{item.quantity.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right text-[#0a0a0a]">{item.unitPrice.toFixed(2)}</td>
                    <td className="py-2 px-3 text-[#6b7280]">{item.account}</td>
                    <td className="py-2 px-3 text-[#6b7280]">{item.taxRate}%</td>
                    <td className="py-2 pl-3 text-right text-[#0a0a0a]">{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add new line link */}
            <div className="flex items-center gap-4 py-3">
              <button className="text-[13px] font-medium text-[#0078c8] hover:underline flex items-center gap-1">
                Add a new line
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="text-[13px] font-medium text-[#0078c8] hover:underline">
                Assign expenses to a customer or project
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="px-6 pb-6">
            <div className="flex justify-end">
              <div className="w-[260px] space-y-1">
                <div className="flex justify-between text-[13px] text-[#333940]">
                  <span>Subtotal</span>
                  <span>{bill.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#333940]">
                  <span>GST</span>
                  <span>{bill.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[18px] font-bold text-[#0a0a0a] pt-2 border-t border-[#0a0a0a]">
                  <span>TOTAL</span>
                  <span>{bill.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#f2f3f4] border-t border-[#e1e2e5] rounded-b">
            <button className="h-9 px-5 rounded bg-[#0078c8] hover:bg-[#006bb3] text-white text-[13px] font-medium flex items-center gap-1 transition-colors">
              Save
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-2">
              <button className="h-9 px-5 rounded bg-[#13B57B] hover:bg-[#0fa06c] text-white text-[13px] font-medium flex items-center gap-1 transition-colors">
                Approve
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="h-9 px-5 rounded bg-[#8c919a] hover:bg-[#6b7280] text-white text-[13px] font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Xero Protect: bottom card — flag context + actions (nothing on top) */}
        {bill.aiFlagged && !resolved && !actionTaken ? (
          <section className="rounded border border-[#e1e2e5] bg-white p-5 space-y-4 mt-6">
            {/* Header: icon + title + risk badges + dismiss X */}
            <div className="flex items-start gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 -m-1 shrink-0">
                <svg className="absolute inset-0 w-10 h-10" style={{ animation: 'spin 12s linear infinite' }} viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" opacity="0.4" />
                </svg>
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#fef3c7]">
                  <ShieldAlert className="h-4 w-4 text-[#d97706]" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-medium text-[#0a0a0a]">
                    Xero Protect flagged this bill for review
                  </p>
                  {bill.riskType && bill.riskLevel && (() => {
                    const cfg = {
                      high: { label: "High risk", text: "text-[#c31230]" },
                      medium: { label: "Med risk", text: "text-[#d97706]" },
                      low: { label: "Low risk", text: "text-[#92400e]" },
                    }[bill.riskLevel];
                    return (
                      <span className={`inline-flex items-center gap-1 text-[12px] font-medium ${cfg.text}`}>
                        <ShieldAlert className="h-3 w-3" />
                        {cfg.label} &middot; {riskTypeLabels[bill.riskType]}
                      </span>
                    );
                  })()}
                </div>
                <ul className="mt-1.5 space-y-0.5 text-[12px] text-[#333940] list-disc list-inside">
                  <li>{bill.aiReason}</li>
                  {bill.riskType !== "duplicate" && (
                    <li>Average for this supplier is {formatCurrency(averageAmount)} — this bill is {formatCurrency(bill.amount)} (<span className="font-medium text-[#c31230]">+{percentHigher}%</span>)</li>
                  )}
                </ul>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="shrink-0 p-1.5 rounded text-[#6b7280] hover:bg-[#f7f8fa] hover:text-[#0a0a0a] transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Actions: primary (Xero blue, outcome-focused) + secondary */}
            {(() => {
              const primaryLabel =
                bill.status === "draft"
                  ? "Clear flag and submit for approval"
                  : bill.status === "awaiting_approval"
                  ? "Clear flag and approve bill"
                  : bill.status === "awaiting_payment" || bill.status === "overdue"
                  ? "Clear flag and mark as paid"
                  : "Clear flag";
              return (
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#e1e2e5]">
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-[#1c52de] text-[13px] font-medium text-white hover:bg-[#1542b8] transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {primaryLabel}
                  </button>
                  <button
                    type="button"
                    onClick={handleJaxInvestigate}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#e1e2e5] text-[12px] font-medium text-[#333940] bg-white hover:bg-[#f7f8fa] transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    Investigate with JAX
                  </button>
                </div>
              );
            })()}
          </section>
        ) : null}
      </div>

      {/* JAX side panel */}
      {jaxOpen && (
        <div className="w-[380px] shrink-0 border-l border-[#e1e2e5] bg-white flex flex-col" style={{ minHeight: "calc(100vh - 120px)" }}>
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e1e2e5]">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f0f4ff]">
                <Sparkles className="h-3.5 w-3.5 text-[#1c52de]" />
              </div>
              <span className="text-[14px] font-semibold text-[#0a0a0a]">JAX</span>
            </div>
            <button
              type="button"
              onClick={() => setJaxOpen(false)}
              className="text-[#8c919a] hover:text-[#333940] p-1 rounded hover:bg-[#f2f3f4] transition-colors"
              aria-label="Close JAX"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Context banner */}
          <div className="px-4 py-3 bg-[#f7f8fa] border-b border-[#e1e2e5]">
            <p className="text-[12px] text-[#6b7280]">Investigating bill</p>
            <p className="text-[13px] font-medium text-[#0a0a0a] mt-0.5">{bill.billNumber} — {bill.supplier}</p>
            <p className="text-[12px] text-[#6b7280] mt-0.5">{formatCurrency(bill.total)} · {bill.riskType ? riskTypeLabels[bill.riskType] : "Flagged"}</p>
          </div>

          {/* Steps */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {jaxSteps.map((step, i) => (
              <div key={i} className={`transition-opacity duration-300 ${step.status === "pending" ? "opacity-40" : "opacity-100"}`}>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {step.status === "running" ? (
                      <Loader2 className="h-4 w-4 text-[#1c52de] animate-spin" />
                    ) : step.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-[#0b6e38]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-[#d5d7da]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[13px] font-medium ${step.status === "done" ? "text-[#0a0a0a]" : step.status === "running" ? "text-[#1c52de]" : "text-[#8c919a]"}`}>
                      {step.label}
                    </p>
                    {step.status === "done" && step.detail && (
                      <p className="text-[12px] text-[#6b7280] mt-1 leading-relaxed">{step.detail}</p>
                    )}
                    {step.status === "running" && (
                      <p className="text-[12px] text-[#8c919a] mt-1 italic">Thinking...</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Summary + actions after all steps complete */}
            {jaxSteps.length > 0 && jaxSteps.every((s) => s.status === "done") && (
              <div className="mt-4 pt-4 border-t border-[#e1e2e5] space-y-3">
                <p className="text-[13px] font-medium text-[#0a0a0a]">Recommended next steps</p>
                <div className="space-y-2">
                  <button className="w-full text-left rounded border border-[#1c52de] bg-white hover:bg-[#f0f4ff] px-3 py-2.5 transition-colors cursor-pointer">
                    <p className="text-[12px] font-medium text-[#1c52de]">Send verification email</p>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">Request bank details confirmation from {bill.supplier}</p>
                  </button>
                  <button className="w-full text-left rounded border border-[#e1e2e5] bg-white hover:bg-[#f7f8fa] px-3 py-2.5 transition-colors cursor-pointer">
                    <p className="text-[12px] font-medium text-[#333940]">Add hold note to bill</p>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">Flag this bill to pause payment until verified</p>
                  </button>
                  <button className="w-full text-left rounded border border-[#e1e2e5] bg-white hover:bg-[#f7f8fa] px-3 py-2.5 transition-colors cursor-pointer">
                    <p className="text-[12px] font-medium text-[#333940]">Approve anyway</p>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">Proceed with payment — investigation logged</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </SafetyShieldChrome>
  );
}
