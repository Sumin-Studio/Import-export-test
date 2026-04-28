"use client";

import Link from "next/link";
import { Suspense, use, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MoreVertical,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  type BillStatus,
  getAverageSafetyShieldBillAmount,
  getSafetyShieldBillById,
  getSafetyShieldBillIds,
} from "@/data/safety-shield";
import {
  formatCurrency,
  protectShieldIconClassName,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";
import { useDupeOption } from "../../DupeOptionContext";
import { parseBillsListTab } from "../billsTab";

const BILLS_BASE = "/xero-protect/prototype/9/bills";

function formatDate(d: string): string {
  const date = new Date(d);
  return date.toLocaleDateString("en-NZ", { day: "2-digit", month: "short", year: "numeric" });
}

function getRiskBullets(bill: NonNullable<ReturnType<typeof getSafetyShieldBillById>>): string[] {
  return (bill.aiReason ?? "This bill has been flagged for review.")
    .split(/\.\s+/)
    .filter((s) => s.trim())
    .map((s) => s.replace(/\.$/, ""));
}

/** Top / middle Protect strip — short headline from risk type (not generic “Review recommended”). */
function getProtectBannerHeadline(bill: NonNullable<ReturnType<typeof getSafetyShieldBillById>>): string {
  switch (bill.riskType) {
    case "duplicate":
      return "Possible duplicate";
    case "anomalous_amount":
      return "Unusual amount";
    case "bank_detail_change":
      return "Bank details changed";
    case "first_time_supplier":
      return "First-time supplier";
    default:
      return "Review recommended";
  }
}

type BillDetailBill = NonNullable<ReturnType<typeof getSafetyShieldBillById>>;

function shortBillStatusLabel(status: BillStatus): string {
  switch (status) {
    case "paid":
      return "Paid";
    case "awaiting_approval":
      return "Awaiting approval";
    case "awaiting_payment":
      return "Awaiting payment";
    case "overdue":
      return "Overdue";
    case "draft":
      return "Draft";
    default:
      return status;
  }
}

/** Same primary copy as combined CTA / middle (plain string for collapsed top strip). */
function getProtectPrimaryPlainLine(bill: BillDetailBill): string {
  if (bill.riskType === "duplicate" && bill.duplicateOfBillId) {
    const orig = getSafetyShieldBillById(bill.duplicateOfBillId);
    if (orig) {
      return `Same supplier and amount as ${orig.billNumber} (${formatDate(orig.issueDate)} · ${formatCurrency(orig.total)} · ${shortBillStatusLabel(orig.status)}).`;
    }
  }
  if (bill.protectDetailSummary) return bill.protectDetailSummary;
  const main = getRiskBullets(bill);
  if (main.length === 0) return getProtectBannerHeadline(bill);
  const primary = main.join(". ").replace(/\.\s*\./g, ".");
  return primary.endsWith(".") ? primary : `${primary}.`;
}

/** Extra detail below the primary line (expand) — omit when collapsed already shows the full story. */
function topBannerHasSecondaryDetail(bill: BillDetailBill): boolean {
  if ((bill.additionalRiskLabels?.length ?? 0) > 0) return true;
  if (bill.protectDetailSummary) return false;
  if (bill.riskType === "duplicate" && bill.duplicateOfBillId) return false;
  const bullets = getRiskBullets(bill);
  if (bullets.length > 1) return true;
  if (bill.riskType === "anomalous_amount" && bill.protectUnusualAmount) return true;
  if (bill.riskType === "bank_detail_change" && bill.protectBankLines) return true;
  return false;
}

/** Prototype: fixed actor name for history entries. */
const PROTECT_DISMISS_ACTOR_NAME = "Laura";

/** e.g. "17 Apr 2026 at 12:59 pm" */
function formatProtectDismissTimestamp(at: Date): string {
  const dateStr = at.toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeStr = at.toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateStr} at ${timeStr}`;
}

/** Text after “identified that ” in the JAX dismiss line (sentence case after “that”). */
function jaxCalloutTailFromCallout(callout: string): string {
  const t = callout.trim();
  if (!t) return "a risk on this bill.";
  if (t.startsWith("This ")) {
    return `this ${t.slice(5)}`;
  }
  return `${t.charAt(0).toLowerCase()}${t.slice(1)}`;
}

type ProtectDismissHistoryEntry = {
  id: string;
  at: Date;
  /** What the Protect banner was calling out (primary line at time of dismiss). */
  calloutSummary: string;
  dismissedBy: string;
};

function RiskSeverityDot(_: { level: "high" | "medium" }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full shrink-0 mt-1.5 bg-[#f59e0b]"
      aria-hidden
    />
  );
}

/** Matches banner header: `ShieldAlert` (w-4) + `gap-2` so detail lines up with headline text. */
function ProtectBannerExpandedRow({
  textCls,
  bodyTop,
  children,
}: {
  textCls: string;
  bodyTop: string;
  children: ReactNode;
}) {
  return (
    <div className={bodyTop}>
      <div className="flex items-start gap-2">
        <span className="w-4 h-4 shrink-0" aria-hidden />
        <p className={`m-0 flex-1 min-w-0 leading-relaxed ${textCls}`}>{children}</p>
      </div>
    </div>
  );
}

function WarningBulletList({ bill, variant }: { bill: BillDetailBill; variant: "cta" | "banner" }) {
  const mainLevel = bill.riskLevel === "high" ? "high" : "medium";
  const extras = bill.additionalRiskLabels ?? [];
  const textCls =
    variant === "cta" ? "text-[12px] text-[#92400e]" : "text-[13px] text-[#1e3145] leading-relaxed";
  const bannerOneLine = variant === "banner";
  const bodyTop = "";

  if (bill.riskType === "duplicate" && bill.duplicateOfBillId) {
    const orig = getSafetyShieldBillById(bill.duplicateOfBillId);
    if (orig) {
      const dupLine = (
        <>
          Same supplier and amount as{" "}
          <Link
            href={`${BILLS_BASE}/${orig.id}`}
            className="font-semibold text-[#1c52de] hover:underline"
          >
            {orig.billNumber}
          </Link>
          {" "}
          ({formatDate(orig.issueDate)} · {formatCurrency(orig.total)} · {shortBillStatusLabel(orig.status)}).
        </>
      );
      if (bannerOneLine) {
        return (
          <ProtectBannerExpandedRow textCls={textCls} bodyTop={bodyTop}>
            {dupLine}
          </ProtectBannerExpandedRow>
        );
      }
      if (variant === "cta") {
        return (
          <div className={`${bodyTop} space-y-1.5`}>
            <p className="m-0 text-[15px] font-semibold leading-snug text-[#92400e]">{dupLine}</p>
            {extras.map((label, i) => (
              <p key={`ex-${i}`} className={`flex items-start gap-2 ${textCls}`}>
                <RiskSeverityDot level="medium" />
                <span>{label}</span>
              </p>
            ))}
          </div>
        );
      }
      return (
        <div className={`${bodyTop} space-y-1.5 ${textCls}`}>
          <p className="flex items-start gap-2">
            <RiskSeverityDot level={mainLevel} />
            <span>{dupLine}</span>
          </p>
          {extras.map((label, i) => (
            <p key={`ex-${i}`} className="flex items-start gap-2">
              <RiskSeverityDot level="medium" />
              <span>{label}</span>
            </p>
          ))}
        </div>
      );
    }
  }

  if (bill.protectDetailSummary) {
    if (bannerOneLine) {
      return (
        <ProtectBannerExpandedRow textCls={textCls} bodyTop={bodyTop}>
          {bill.protectDetailSummary}
        </ProtectBannerExpandedRow>
      );
    }
    if (variant === "cta") {
      return (
        <div className={`${bodyTop} space-y-1.5`}>
          <p className="m-0 text-[15px] font-semibold leading-snug text-[#92400e]">{bill.protectDetailSummary}</p>
          {extras.map((label, i) => (
            <p key={`ex-${i}`} className={`flex items-start gap-2 ${textCls}`}>
              <RiskSeverityDot level="medium" />
              <span>{label}</span>
            </p>
          ))}
        </div>
      );
    }
    return (
      <div className={`${bodyTop} space-y-1.5 ${textCls}`}>
        <p className="flex items-start gap-2">
          <RiskSeverityDot level={mainLevel} />
          <span>{bill.protectDetailSummary}</span>
        </p>
        {extras.map((label, i) => (
          <p key={`ex-${i}`} className="flex items-start gap-2">
            <RiskSeverityDot level="medium" />
            <span>{label}</span>
          </p>
        ))}
      </div>
    );
  }

  const main = bannerOneLine ? getRiskBullets(bill).slice(0, 1) : getRiskBullets(bill);
  if (bannerOneLine) {
    const first = main[0];
    if (!first) return null;
    return (
      <ProtectBannerExpandedRow textCls={textCls} bodyTop={bodyTop}>
        {first}
      </ProtectBannerExpandedRow>
    );
  }
  if (variant === "cta" && main.length > 0) {
    const primary = main.join(". ").replace(/\.\s*\./g, ".");
    const primaryLine = primary.endsWith(".") ? primary : `${primary}.`;
    return (
      <div className={`${bodyTop} space-y-1.5`}>
        <p className="m-0 text-[15px] font-semibold leading-snug text-[#92400e]">{primaryLine}</p>
        {extras.map((label, i) => (
          <p key={`ex-${i}`} className={`flex items-start gap-2 ${textCls}`}>
            <RiskSeverityDot level="medium" />
            <span>{label}</span>
          </p>
        ))}
      </div>
    );
  }
  return (
    <ul className={`${bodyTop} space-y-1.5`}>
      {main.map((b, i) => (
        <li key={i} className={`flex items-start gap-2 ${textCls}`}>
          <RiskSeverityDot level={mainLevel} />
          <span>{b}</span>
        </li>
      ))}
      {extras.map((label, i) => (
        <li key={`ex-${i}`} className={`flex items-start gap-2 ${textCls}`}>
          <RiskSeverityDot level="medium" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}


/* ── Status-aware CTA label (Dillon's 4 actions) ── */
function getCtaLabel(status: string): string {
  switch (status) {
    case "draft": return "Submit for approval";
    case "awaiting_approval": return "Approve";
    case "awaiting_payment": return "Record payment";
    case "paid": return "Record payment";
    default: return "Record payment";
  }
}

/* ── CTA-attached warning: wraps the status-appropriate action ── */
function StatusAwareCTAWithWarning({ total, bill, allowDismiss, onDismiss }: {
  total: number;
  bill: NonNullable<ReturnType<typeof getSafetyShieldBillById>>;
  allowDismiss: boolean;
  onDismiss: () => void;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(true);
  const ctaLabel = getCtaLabel(bill.status);
  const isPayment = bill.status === "awaiting_payment" || bill.status === "paid";

  const handleLocalDismiss = () => {
    setDismissed(true);
    onDismiss();
  };

  const alertShellClass = dismissed
    ? "border border-[#e1e2e5] rounded-lg"
    : "border border-[#f5d98a] rounded-lg shadow-sm";

  // For non-payment statuses (draft, awaiting_approval), show a simpler wrapped button
  if (!isPayment) {
    return (
      <div data-xp-highlight className={`mb-4 overflow-hidden ${alertShellClass}`}>
        {!dismissed && (
          <div className="bg-[#fffbeb] px-4 py-3 flex items-start gap-3 rounded-t-lg">
            <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
            <div className="flex-1 min-w-0">
              <WarningBulletList bill={bill} variant="cta" />
            </div>
            {allowDismiss && (
              <button onClick={handleLocalDismiss} className="shrink-0 text-[#8c919a] hover:text-[#333940] p-1">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
        <div className={`bg-white px-4 py-3 ${!dismissed ? "border-t border-[#fde68a]" : ""} ${!dismissed ? "rounded-b-lg" : "rounded-lg"}`}>
          <button
            type="button"
            className="h-9 px-5 rounded-md text-[14px] font-bold text-white bg-[#2e7d32] hover:bg-[#1b5e20] transition-colors"
          >
            {dismissed ? ctaLabel : `${ctaLabel} anyway`}
          </button>
        </div>
      </div>
    );
  }

  // For payment statuses, wrap the full payment form
  return (
    <div data-xp-highlight className={`mb-4 overflow-hidden ${alertShellClass}`}>
      {!dismissed && (
        <div className="bg-[#fffbeb] px-4 py-3 flex items-start gap-3 rounded-t-lg">
          <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
          <div className="flex-1 min-w-0">
            <WarningBulletList bill={bill} variant="cta" />
          </div>
          {allowDismiss && (
            <button onClick={handleLocalDismiss} className="shrink-0 text-[#8c919a] hover:text-[#333940] p-1">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
      <div className={`bg-white ${!dismissed ? "border-t border-[#fde68a] rounded-b-lg" : "rounded-lg"}`}>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-semibold text-[#000a1e]">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Payments
        </button>
        {open && (
          <div className="px-4 pb-4">
            <div className="flex gap-4 text-[13px]">
              <div className="flex-1">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Date paid</label>
                <input type="date" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" />
              </div>
              <div className="flex-1">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Account</label>
                <select className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]"><option>Select account</option></select>
              </div>
              <div className="flex-1">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Amount paid(Required)</label>
                <input type="text" defaultValue={total.toFixed(2)} className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" />
              </div>
              <div className="flex-1">
                <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Reference</label>
                <input type="text" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" />
              </div>
            </div>
            <button
              type="button"
              className={`mt-3 h-8 px-4 rounded-md text-[13px] font-bold text-white transition-colors ${
                dismissed
                  ? "bg-[#0078c8] hover:bg-[#006bb3]"
                  : "bg-[#2e7d32] hover:bg-[#1b5e20]"
              }`}
            >
              {dismissed ? "Record payment" : "Record payment anyway"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Normal payment section ── */
/** Standard workflow primary when Protect alert is middle (detached, not fused to CTA). */
function PlainWorkflowCTA({ bill }: { bill: NonNullable<ReturnType<typeof getSafetyShieldBillById>> }) {
  const label = getCtaLabel(bill.status);
  return (
    <div className="border border-[#e1e2e5] rounded mb-4" data-xp-highlight>
      <div className="px-4 py-3">
        <button
          type="button"
          className="h-9 px-5 rounded text-[14px] font-bold text-white bg-[#2e7d32] hover:bg-[#1b5e20]"
        >
          {label}
        </button>
      </div>
    </div>
  );
}

function PaymentNormal({ total }: { total: number }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#e1e2e5] rounded mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-semibold text-[#000a1e]">
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Payments
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="flex gap-4 text-[13px]">
            <div className="flex-1">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Date paid</label>
              <input type="date" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" />
            </div>
            <div className="flex-1">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Account</label>
              <select className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]"><option>Select account</option></select>
            </div>
            <div className="flex-1">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Amount paid(Required)</label>
              <input type="text" defaultValue={total.toFixed(2)} className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" />
            </div>
            <div className="flex-1">
              <label className="font-medium text-[rgba(0,10,30,0.75)] block mb-1">Reference</label>
              <input type="text" className="w-full h-8 rounded border border-[#ccc] bg-white px-2 text-[13px]" />
            </div>
          </div>
          <button className="mt-3 h-8 px-4 rounded bg-[#0078c8] text-[13px] font-bold text-white hover:bg-[#006bb3]">
            Record payment
          </button>
        </div>
      )}
    </div>
  );
}

/** All-tab quick view (prod): full bill is where the primary workflow runs — label matches that CTA. */
function ProdAllTabQuickViewRow({ bill, fullPageHref }: { bill: BillDetailBill; fullPageHref: string }) {
  const action = getCtaLabel(bill.status);
  return (
    <Link
      href={fullPageHref}
      className="flex w-full items-center justify-center gap-2 rounded border border-[#e1e2e5] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0078c8] hover:bg-[#f7f8fa] transition-colors"
      data-xp-highlight
    >
      <span className="min-w-0 leading-snug">
        Open full screen to <span className="text-[#000a1e]">{action}</span>
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
    </Link>
  );
}

function BillDetailP5PageInner({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const resolvedParams = use(params);
  const billId = resolvedParams.billId;
  const bill = getSafetyShieldBillById(billId);
  const { config } = useDupeOption();
  const searchParams = useSearchParams();
  const isFullPage = searchParams.get("view") === "full";
  const fromTab = parseBillsListTab(searchParams.get("fromTab"));
  /** When detailPlacement is "legacy", mirror prod: All-tab quick view defers the primary action to full screen. */
  const suppressPrimaryWorkflowCta =
    !isFullPage && fromTab === "all" && config.detailPlacement === "legacy";

  /**
   * Closed Beta / Beta = middle detached alert; GA = combined CTA by default.
   * Open Beta does not use combined CTA layout from the default preset.
   * Pin to top: full-width strip under chrome (detailPlacement / optInListBannerTop).
   */
  const rawDetailPlacement: "middle" | "cta" | "top" | "legacy" =
    config.detailPlacement ??
    (config.optInListBannerTop
      ? "top"
      : config.releaseStage === "ga"
        ? "cta"
        : "middle");
  const detailPlacement: "middle" | "cta" | "top" | "legacy" =
    config.releaseStage === "beta" && rawDetailPlacement === "cta" ? "middle" : rawDetailPlacement;

  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [topBannerExpanded, setTopBannerExpanded] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [protectDismissHistory, setProtectDismissHistory] = useState<ProtectDismissHistoryEntry[]>([]);

  useEffect(() => {
    setBannerDismissed(false);
    setTopBannerExpanded(false);
    setProtectDismissHistory([]);
  }, [
    billId,
    config.releaseStage,
    config.optInListBannerTop,
    config.dupeUnification,
    config.detailPlacement,
  ]);

  const buildBillHref = (id: string) => {
    const p = new URLSearchParams();
    if (isFullPage) p.set("view", "full");
    p.set("fromTab", fromTab);
    const qs = p.toString();
    return qs ? `${BILLS_BASE}/${id}?${qs}` : `${BILLS_BASE}/${id}`;
  };
  const billsListHref = `${BILLS_BASE}?tab=${encodeURIComponent(fromTab)}`;
  const fullPageHref = `${BILLS_BASE}/${billId}?view=full&fromTab=${encodeURIComponent(fromTab)}`;
  const averageAmount = getAverageSafetyShieldBillAmount();

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
          <Link href={billsListHref} className="mt-3 inline-flex text-[13px] text-[#1c52de] hover:underline">Back to bills</Link>
        </div>
      </div>
    );
  }

  const isFlagged = bill.aiFlagged;
  const isDuplicate = bill.riskType === "duplicate";
  const isPayment = bill.status === "awaiting_payment" || bill.status === "paid";
  const isOverdue = bill.status === "overdue" || (bill.status === "awaiting_payment" && new Date(bill.dueDate) < new Date());
  const subtotal = bill.lineItems.reduce((sum, item) => sum + item.amount, 0);

  const logProtectDismissToHistory = () => {
    setProtectDismissHistory((prev) => [
      {
        id: `protect-dismiss-${Date.now()}`,
        at: new Date(),
        calloutSummary: getProtectPrimaryPlainLine(bill),
        dismissedBy: PROTECT_DISMISS_ACTOR_NAME,
      },
      ...prev,
    ]);
    setHistoryOpen(true);
  };

  const handleDismiss = () => {
    setBannerDismissed(true);
    logProtectDismissToHistory();
  };

  const showCtaWarning = isFlagged && detailPlacement === "cta";
  const showMiddleBanner = isFlagged && detailPlacement === "middle" && !bannerDismissed;
  /** Prototype 6-style: edge-to-edge strip under chrome, above scrollable body (when pin-to-top). */
  const showTopBanner = isFlagged && detailPlacement === "top" && !bannerDismissed;
  /** Closed Beta only: legacy “possible duplicate” strip — off when dupes unified into Protect. */
  const showOldDupeBanner =
    config.releaseStage === "closedBeta" && isDuplicate && !config.dupeUnification;

  return (
    <div className="flex flex-col h-full bg-white overflow-auto">
      {/* ── Header bar ── */}
      <div className="px-3 pt-3 pb-0 border-b border-[#e1e2e5] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-[17px] font-bold text-[#000a1e] whitespace-nowrap">View bill</h2>
            {statusPill(bill.status)}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button className="h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] flex items-center gap-1.5 hover:bg-[#f7f8fa]">
              Attach files <ChevronDown className="h-2.5 w-2.5" />
            </button>
            <button className="h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] hover:bg-[#f7f8fa]">Copy</button>
            <button className="h-8 px-3 rounded border border-[#0078c8] bg-[#0078c8] text-[13px] font-bold text-white hover:bg-[#006bb3]">Edit</button>
            <div className="flex items-center gap-0.5 ml-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] hover:bg-white hover:shadow-sm">
                <MoreVertical className="h-4 w-4" />
              </button>
              {prevId ? (
                <Link href={buildBillHref(prevId)} className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] hover:bg-white hover:shadow-sm">
                  <ChevronUp className="h-4 w-4" />
                </Link>
              ) : (
                <span className="w-9 h-9 flex items-center justify-center rounded-full text-[#d5d7da]"><ChevronUp className="h-4 w-4" /></span>
              )}
              {nextId ? (
                <Link href={buildBillHref(nextId)} className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] hover:bg-white hover:shadow-sm">
                  <ChevronDown className="h-4 w-4" />
                </Link>
              ) : (
                <span className="w-9 h-9 flex items-center justify-center rounded-full text-[#d5d7da]"><ChevronDown className="h-4 w-4" /></span>
              )}
              <Link href={billsListHref} className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] hover:bg-white hover:shadow-sm">
                <X className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Old duplicate banner (when showOldDupes is on, duplicate bills only) ── */}
      {showOldDupeBanner && (
        <div className="border-b border-[#fcd34d] bg-[#fffbeb] px-4 py-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#f59e0b] shrink-0" />
            <span className="text-[13px] font-medium text-[#92400e]">Possible duplicate</span>
            <span className="text-[12px] text-[#92400e]">— A similar bill from {bill.supplier} was found with the same amount.</span>
          </div>
        </div>
      )}

      {/* ── Top Protect strip (prototype 6 placement=top): same primary copy as middle/CTA ── */}
      {showTopBanner && (
        <div data-xp-highlight className="border-b border-[#f5d98a] bg-[#fff8e5] shrink-0">
          <div className="flex items-start justify-between gap-2 px-4 py-3">
            {topBannerHasSecondaryDetail(bill) ? (
              <button
                type="button"
                onClick={() => setTopBannerExpanded(!topBannerExpanded)}
                className="flex min-w-0 flex-1 items-start gap-2 text-left"
              >
                <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
                <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-[#92400e]">
                  {getProtectPrimaryPlainLine(bill)}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  <span className="text-[12px] font-semibold text-[#0078c8] underline underline-offset-[3px] decoration-[#0078c8] whitespace-nowrap">
                    {topBannerExpanded ? "Hide details" : "Details"}
                  </span>
                  {topBannerExpanded ? (
                    <ChevronUp className={`h-3.5 w-3.5 shrink-0 ${protectShieldIconClassName}`} />
                  ) : (
                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 ${protectShieldIconClassName}`} />
                  )}
                </span>
              </button>
            ) : (
              <div className="flex min-w-0 flex-1 items-start gap-2">
                <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
                <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-[#92400e]">
                  {getProtectPrimaryPlainLine(bill)}
                </span>
              </div>
            )}
            {config.allowDismiss && (
              <button
                type="button"
                onClick={handleDismiss}
                className="shrink-0 w-7 h-7 flex items-center justify-center rounded text-[#8c919a] hover:text-[#333940] hover:bg-white/60"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {topBannerExpanded && topBannerHasSecondaryDetail(bill) && (
            <div className="px-4 pt-0.5 pb-3">
              {(bill.additionalRiskLabels?.length ?? 0) > 0 &&
              (bill.protectDetailSummary ||
                (bill.riskType === "duplicate" && bill.duplicateOfBillId)) ? (
                <ul className="space-y-1.5 text-[13px] leading-relaxed text-[#1e3145]">
                  {(bill.additionalRiskLabels ?? []).map((label, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <RiskSeverityDot level="medium" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <WarningBulletList bill={bill} variant="banner" />
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-auto px-4 pt-4">
        {/* Field row */}
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
            <p className="text-[15px] text-[#0078c8] mt-1">Add date</p>
          </div>
          <div>
            <p className="font-bold text-[rgba(0,10,30,0.75)]">Due date</p>
            <p className={`text-[15px] mt-1 ${isOverdue ? "text-[#dc3246]" : "text-[#000a1e]"}`}>{formatDate(bill.dueDate)}</p>
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

        {/* Line items */}
        <div className="border border-[#ccced2] rounded mb-1 overflow-x-auto">
          <table className="w-full text-[13px] border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white">
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Item</th>
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Description</th>
                <th className="text-right font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Qty.</th>
                <th className="text-right font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Price</th>
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Account</th>
                <th className="text-left font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Tax rate</th>
                <th className="text-right font-normal text-[rgba(0,10,30,0.75)] px-2 py-2.5 border-b border-[#ccced2]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.lineItems.map((item, idx) => (
                <tr key={idx} className="border-t border-[#ccced2] hover:bg-[#f7f8fa]">
                  <td className="px-2 py-2 align-top">
                    <span className="inline-block border border-[rgba(0,10,30,0.5)] rounded text-[11px] text-[rgba(0,10,30,0.75)] px-1.5 py-0.5">{bill.billNumber}</span>
                    <p className="text-[15px] text-[#000a1e] mt-1">{item.description}</p>
                  </td>
                  <td className="px-2 py-2 text-[15px] text-[#000a1e] align-top">{item.description}</td>
                  <td className="px-2 py-2 text-right text-[#000a1e] align-top">{item.quantity}</td>
                  <td className="px-2 py-2 text-right text-[#000a1e] align-top">{item.unitPrice.toFixed(2)}</td>
                  <td className="px-2 py-2 text-[#000a1e] align-top">{item.account}</td>
                  <td className="px-2 py-2 text-[#000a1e] align-top">GST on Expenses</td>
                  <td className="px-2 py-2 text-right text-[#000a1e] align-top">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Columns toggle */}
        <div className="mt-2 mb-1">
          <button className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0078c8] border border-[#ccced2] rounded px-2.5 py-1.5 bg-white hover:bg-[#f7f8fa]">
            Columns (0 hidden) <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6 mt-4">
          <div className="text-right text-[13px] space-y-1">
            <div className="flex justify-between gap-8">
              <span className="text-[rgba(0,10,30,0.75)]">Subtotal</span>
              <span className="text-[#000a1e]">{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-8 text-[12px]">
              <span className="text-[rgba(0,10,30,0.75)]">Includes GST 15%</span>
              <span className="text-[#000a1e]">{bill.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-8 pt-2 border-t border-[#e1e2e5]">
              <span className="text-[17px] font-bold text-[rgba(0,10,30,0.75)]">Total</span>
              <span className="text-[24px] font-bold text-[#000a1e]">{formatCurrency(bill.total)}</span>
            </div>
          </div>
        </div>

        {/* Duplicate comparison when dupes unified into Protect */}
        {config.dupeUnification && isDuplicate && bill.duplicateOfBillId ? (() => {
          const original = getSafetyShieldBillById(bill.duplicateOfBillId);
          if (!original) {
            return (
              <div className="border border-[#e1e2e5] rounded-lg mb-4 px-4 py-3 text-[13px] text-[#6b7280]">
                Original bill could not be loaded for comparison.
              </div>
            );
          }
          return (
            <div className="border border-[#e1e2e5] rounded-lg mb-4 overflow-hidden bg-[#fafbfc]" data-xp-highlight>
              <div className="px-4 py-2 border-b border-[#e1e2e5] bg-[#f7f8fa]">
                <p className="text-[13px] font-semibold text-[#0a0a0a]">Compare with possible original</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 text-[13px]">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#6b7280] mb-2">Original</p>
                  <p className="font-medium text-[#0078c8]">
                    <Link href={buildBillHref(original.id)} className="hover:underline">
                      {original.supplier}
                    </Link>
                  </p>
                  <p className="text-[#424f60] mt-1">{original.billNumber}</p>
                  <p className="mt-1">{formatDate(original.issueDate)}</p>
                  <p className="font-semibold mt-1">{formatCurrency(original.total)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#6b7280] mb-2">This bill</p>
                  <p className="font-medium text-[#0078c8]">{bill.supplier}</p>
                  <p className="text-[#424f60] mt-1">{bill.billNumber}</p>
                  <p className="mt-1">{formatDate(bill.issueDate)}</p>
                  <p className="font-semibold mt-1">{formatCurrency(bill.total)}</p>
                </div>
              </div>
            </div>
          );
        })() : null}


        {/* ── Middle Protect alert (detached above Payments; same body copy as combined CTA — no separate headline) ── */}
        {showMiddleBanner && (
          <div data-xp-highlight className="border border-[#f5d98a] rounded-lg bg-[#fff8e5] mb-4 overflow-hidden">
            <div className="px-4 py-3 flex items-start gap-3">
              <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${protectShieldIconClassName}`} />
              <div className="flex-1 min-w-0">
                <WarningBulletList bill={bill} variant="cta" />
              </div>
              {config.allowDismiss && (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded text-[#8c919a] hover:text-[#333940] hover:bg-white/60"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══ PAYMENT SECTION ═══ */}
        {suppressPrimaryWorkflowCta ? (
          <div className="mb-4">
            <ProdAllTabQuickViewRow bill={bill} fullPageHref={fullPageHref} />
          </div>
        ) : showCtaWarning ? (
          <StatusAwareCTAWithWarning total={bill.total} bill={bill} allowDismiss={config.allowDismiss} onDismiss={handleDismiss} />
        ) : showMiddleBanner ? (
          isPayment ? (
            <PaymentNormal total={bill.total} />
          ) : (
            <PlainWorkflowCTA bill={bill} />
          )
        ) : (
          isPayment ? (
            <PaymentNormal total={bill.total} />
          ) : (
            <PlainWorkflowCTA bill={bill} />
          )
        )}

        {/* History and notes */}
        <div className="border border-[#e1e2e5] rounded mb-4">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="flex items-center gap-2 text-[15px] font-semibold text-[#000a1e]"
            >
              {historyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} History and
              notes
            </button>
            <button className="h-8 px-3 rounded border border-[#a6a9b0] bg-white text-[13px] font-bold text-[#0078c8] hover:bg-[#f7f8fa]">
              Add note
            </button>
          </div>
          {historyOpen && (
            <div className="px-4 pb-4 text-[13px] text-[rgba(0,10,30,0.75)] border-t border-[#e1e2e5] pt-3">
              {protectDismissHistory.length === 0 ? (
                <p className="text-[#6b7280]">No history entries yet.</p>
              ) : (
                <ul className="space-y-4">
                  {protectDismissHistory.map((entry) => (
                    <li key={entry.id} className="space-y-2">
                      <p className="text-[13px] text-[#424f60] leading-relaxed">
                        <strong className="font-bold text-[#0a0a0a]">JAX</strong> identified that{" "}
                        {jaxCalloutTailFromCallout(entry.calloutSummary)}
                      </p>
                      <p className="text-[13px] text-[#424f60] leading-relaxed">
                        <span className="font-medium text-[#0a0a0a]">{entry.dismissedBy}</span>{" "}
                        dismissed this alert at {formatProtectDismissTimestamp(entry.at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Full page link */}
        {!isFullPage && !suppressPrimaryWorkflowCta && (
          <div className="text-center pb-6">
            <Link
              href={fullPageHref}
              className="text-[13px] text-[#1c52de] hover:underline inline-flex items-center gap-1"
            >
              Go to full page view <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}

export default function BillDetailP5Page({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-6 text-[13px] text-[#6b7280]">Loading…</div>}>
      <BillDetailP5PageInner params={params} />
    </Suspense>
  );
}
