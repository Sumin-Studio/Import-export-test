"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  CalendarClock,
  ChevronDown,
  FileText,
  ShieldAlert,
  SlidersHorizontal,
  Columns3,
  Search,
  X,
} from "lucide-react";
import {
  type Bill,
  type BillStatus,
  type RiskType,
  getSafetyShieldBillById,
  getSafetyShieldBillsByStatus,
  safetyShieldBills,
  riskTypeLabels,
} from "@/data/safety-shield";
import {
  formatCurrency,
  JumpToPurchasesNav,
  protectPurchasesTooltipBodyClassName,
  protectPurchasesTooltipBodyStyle,
  protectPurchasesTooltipHeaderBarClassName,
  protectPurchasesTooltipHeaderBarStyle,
  protectPurchasesTooltipHeaderShieldClassName,
  protectPurchasesTooltipHeaderShieldStyle,
  protectPurchasesTooltipMetaClassName,
  protectPurchasesTooltipShellClassName,
  protectPurchasesTooltipShellStyle,
  protectPurchasesTooltipTextPrimaryClassName,
  protectShieldIconClassName,
  protectShieldIconStyle,
  statusPill,
} from "@/components/xero-protect/SafetyShieldChrome";
import { useDupeOption } from "../DupeOptionContext";
import {
  type BillsListTabValue,
  billFullViewQuery,
  billQuickViewQuery,
  parseBillsListTab,
} from "./billsTab";

const BILLS_BASE = "/xero-protect/prototype/9/bills";

/** Demo attachment count — prod shows a Files column with icon + count */
function demoFileCount(bill: Bill): number {
  const n = parseInt(bill.id, 10);
  if (Number.isNaN(n)) return 1;
  return n % 5 === 0 ? 0 : 1;
}

function bannerRowPrimaryLabel(status: BillStatus): string {
  switch (status) {
    case "draft":
      return "Submit";
    case "awaiting_approval":
      return "Approve";
    case "awaiting_payment":
    case "overdue":
      return "Pay";
    case "paid":
      return "Record";
    default:
      return "Open";
  }
}

/** `figma` = Xero Protect bills table (Figma 7438:419) — e.g. Feb 17, 2026 */
function formatDateProd(d: string, style: "nz" | "figma" = "nz"): string {
  const date = new Date(d);
  if (style === "figma") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-NZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Duplicate risk is always orange (never red) in the action centre. */
function isDuplicateRisk(bill: Bill): boolean {
  return bill.riskType === "duplicate";
}

/** Risk column text — same accent as Purchases chart (`PROTECT_MEDIUM`). */
function riskLevelTextClass(bill: Bill): string {
  if (isDuplicateRisk(bill) || bill.riskLevel === "high" || bill.riskLevel === "medium") {
    return "text-[#FF8F33]";
  }
  return "text-[#6b7280]";
}

/** Only the first two action-centre rows show a shield (research cap). */
function actionCenterShieldCell(rowIndex: number) {
  const show = rowIndex < 2;
  return (
    <td className="px-2 py-0 text-center align-middle">
      <div className="w-7 h-7 flex items-center justify-center mx-auto" aria-hidden={!show}>
        {show ? (
          <ShieldAlert
            className={`h-4 w-4 ${protectShieldIconClassName}`}
            style={protectShieldIconStyle}
          />
        ) : null}
      </div>
    </td>
  );
}

/** Preview order: pick non-duplicate risks in this order (anomalous first so bill 19 leads in research). */
const ACTION_CENTER_NON_DUPE_HEAD_ORDER: RiskType[] = [
  "anomalous_amount",
  "first_time_supplier",
  "bank_detail_change",
];

/** Preferred ordering when multiple duplicate risks appear in the action centre. */
const DUPLICATE_DEMO_ORDER = ["24", "21", "29"];

/** Matches {@link ACTION_CENTER_NON_DUPE_HEAD_ORDER}: unusual amount surfaces before other Protect types in the main list. */
const FLAGGED_RISK_LIST_ORDER: Partial<Record<RiskType, number>> = {
  anomalous_amount: 0,
  first_time_supplier: 1,
  bank_detail_change: 2,
  duplicate: 3,
};

function sortFlaggedBillsForActionCenter(flagged: Bill[]): Bill[] {
  const dupes = flagged.filter((b) => b.riskType === "duplicate");
  const nonDupes = flagged.filter((b) => b.riskType !== "duplicate");

  const dupesSorted = [...dupes].sort((a, b) => {
    const ia = DUPLICATE_DEMO_ORDER.indexOf(a.id);
    const ib = DUPLICATE_DEMO_ORDER.indexOf(b.id);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });
  const headDupes = dupesSorted.slice(0, 2);

  const pickedNonDupes: Bill[] = [];
  for (const rt of ACTION_CENTER_NON_DUPE_HEAD_ORDER) {
    if (pickedNonDupes.length >= 2) break;
    const candidates = nonDupes.filter((b) => b.riskType === rt);
    if (candidates.length === 0) continue;
    const first = [...candidates].sort((a, b) =>
      a.id.localeCompare(b.id, undefined, { numeric: true })
    )[0];
    pickedNonDupes.push(first);
  }
  if (pickedNonDupes.length < 2) {
    const used = new Set(pickedNonDupes.map((b) => b.id));
    const rest = nonDupes
      .filter((b) => !used.has(b.id))
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    for (const b of rest) {
      if (pickedNonDupes.length >= 2) break;
      pickedNonDupes.push(b);
    }
  }

  const head = [...headDupes, ...pickedNonDupes.slice(0, 2)];
  const headIds = new Set(head.map((b) => b.id));

  const tail = flagged
    .filter((b) => !headIds.has(b.id))
    .sort((a, b) => {
      const aDup = a.riskType === "duplicate";
      const bDup = b.riskType === "duplicate";
      if (aDup !== bDup) return aDup ? -1 : 1;
      return (
        (a.riskLevel === "high" ? 0 : 1) - (b.riskLevel === "high" ? 0 : 1) ||
        b.total - a.total
      );
    });

  return [...head, ...tail];
}

/** One-line body + header; keep readable on small viewports. */
const RISK_POPOVER_WIDTH = 300;
/** Title-only chip (first-time supplier) — no body column. */
const MINIMAL_POPOVER_WIDTH = 232;

/**
 * Purchases-overview / chart tooltip title (`protectBadgeTitle` in cashflowProtectTooltipHtml).
 */
function riskListPopoverTitle(bill: Bill): string {
  if (isDuplicateRisk(bill)) return "Possible Duplicate";
  if (bill.riskType === "anomalous_amount") return "Unusual Amount";
  if (bill.riskType === "bank_detail_change") return "Bank Details Changed";
  if (bill.riskType === "first_time_supplier") return "First-time Supplier";
  if (bill.riskType) return riskTypeLabels[bill.riskType];
  return "Review recommended";
}

type PopoverBody = { kind: "minimal" } | { kind: "text"; main: string };

function popoverWidthForBody(body: PopoverBody): number {
  return body.kind === "minimal" ? MINIMAL_POPOVER_WIDTH : RISK_POPOVER_WIDTH;
}

function buildPopoverBody(bill: Bill): PopoverBody {
  /** Title + shield only — no body copy. */
  if (bill.riskType === "first_time_supplier") {
    return { kind: "minimal" };
  }

  if (isDuplicateRisk(bill) && bill.duplicateOfBillId) {
    const original = getSafetyShieldBillById(bill.duplicateOfBillId);
    if (original) {
      return { kind: "minimal" };
    }
  }

  /** Title + shield only — detail lives on the bill (same pattern as first-time supplier). */
  if (bill.riskType === "anomalous_amount") {
    return { kind: "minimal" };
  }

  if (bill.riskType === "bank_detail_change" && bill.protectBankLines) {
    return {
      kind: "text",
      main: `${formatCurrency(bill.total)} · ${bill.protectBankLines.thisLine}`,
    };
  }

  if (bill.protectListSummary) {
    const extras = (bill.additionalRiskLabels ?? []).filter(Boolean);
    const main = extras.length
      ? `${bill.protectListSummary} · ${extras.join(" · ")}`
      : bill.protectListSummary;
    return { kind: "text", main };
  }

  const raw = bill.aiReason ?? "This bill has been flagged for review.";
  const first = raw.split(/\.\s+/)[0]?.replace(/\.$/, "")?.trim() ?? raw;
  return { kind: "text", main: first };
}

/* ── Risk chip with hover popover (portal — not clipped by table overflow) ── */
/** `popoverSide`: when shield sits to the right of the reference, open panel to the left so it stays on-screen. */
function RiskChipPopover({ bill, popoverSide = "right" }: { bill: Bill; popoverSide?: "left" | "right" }) {
  const body = buildPopoverBody(bill);
  const popoverWidth = popoverWidthForBody(body);
  /** Optional close only when the one-line body is long (fallback copy). */
  const showCloseButton =
    body.kind === "text" && body.main.length > 110;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fixedPos, setFixedPos] = useState<{ left: number; top: number } | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const panelToLeft = popoverSide === "left";

  const recalcPosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    const margin = 8;
    let left = panelToLeft ? r.left - popoverWidth - margin : r.right + margin;
    const top = r.top + r.height / 2;
    if (left < margin) left = margin;
    if (left + popoverWidth > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - margin - popoverWidth);
    }
    setFixedPos({ left, top });
  }, [panelToLeft, popoverWidth]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setFixedPos(null);
      return;
    }
    recalcPosition();
    const onMove = () => recalcPosition();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, recalcPosition]);

  const show = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const hide = () => {
    timeout.current = setTimeout(() => {
      setOpen(false);
      setFixedPos(null);
    }, 200);
  };

  const cancelHide = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };

  const title = riskListPopoverTitle(bill);

  const popoverContent =
    open &&
    mounted &&
    fixedPos != null &&
    createPortal(
      <div
        className="fixed z-[100200] pointer-events-auto"
        style={{
          left: fixedPos.left,
          top: fixedPos.top,
          width: popoverWidth,
          maxWidth: body.kind === "minimal" ? undefined : "min(420px, calc(100vw - 24px))",
          transform: "translateY(-50%)",
        }}
        onMouseEnter={cancelHide}
        onMouseLeave={hide}
      >
        {body.kind === "minimal" ? (
          <div
            className={`${protectPurchasesTooltipShellClassName} w-full`}
            style={protectPurchasesTooltipShellStyle}
          >
            <div
              className={`flex min-h-[40px] items-center justify-between gap-3 px-[14px] py-2.5 ${protectPurchasesTooltipHeaderBarClassName}`}
              style={protectPurchasesTooltipHeaderBarStyle}
            >
              <span className="min-w-0 flex-1 pr-2 text-[14px] font-semibold leading-[1.3] tracking-[-0.02em]">
                {title}
              </span>
              <ShieldAlert
                className={`h-[18px] w-[18px] shrink-0 ${protectPurchasesTooltipHeaderShieldClassName}`}
                strokeWidth={1.5}
                style={protectPurchasesTooltipHeaderShieldStyle}
              />
            </div>
          </div>
        ) : (
          <div
            className={`${protectPurchasesTooltipShellClassName} w-full text-[13px] leading-[1.3]`}
            style={protectPurchasesTooltipShellStyle}
          >
            <div
              className={`flex min-h-[40px] items-center justify-between gap-3 px-[14px] py-2.5 ${protectPurchasesTooltipHeaderBarClassName}`}
              style={protectPurchasesTooltipHeaderBarStyle}
            >
              <span className="min-w-0 flex-1 pr-2 text-[14px] font-semibold leading-[1.3] tracking-[-0.02em]">
                {title}
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                {showCloseButton ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(false);
                      setFixedPos(null);
                    }}
                    className="rounded p-0.5 text-[#8c919a] hover:bg-[#f3f4f5] hover:text-[#333940]"
                    aria-label="Close"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 1l10 10M11 1L1 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                ) : null}
                <ShieldAlert
                  className={`h-[18px] w-[18px] shrink-0 ${protectPurchasesTooltipHeaderShieldClassName}`}
                  strokeWidth={1.5}
                  style={protectPurchasesTooltipHeaderShieldStyle}
                />
              </div>
            </div>
            <div
              className={`${protectPurchasesTooltipBodyClassName} ${protectPurchasesTooltipTextPrimaryClassName}`}
              style={protectPurchasesTooltipBodyStyle}
            >
              <p
                className={`text-[13px] leading-[1.45] ${protectPurchasesTooltipMetaClassName} whitespace-normal [overflow-wrap:anywhere]`}
                title={body.main}
              >
                {body.main}
              </p>
            </div>
          </div>
        )}
      </div>,
      document.body
    );

  return (
    <div
      ref={anchorRef}
      className="relative inline-flex"
      data-xp-highlight
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <span className="inline-flex items-center gap-0.5">
        <ShieldAlert
          className={`h-3.5 w-3.5 ${protectShieldIconClassName}`}
          style={protectShieldIconStyle}
        />
        {(bill.additionalRiskLabels?.length ?? 0) > 0 && (
          <span
            className={`text-[10px] font-bold leading-none ${protectShieldIconClassName}`}
            style={protectShieldIconStyle}
          >
            +{bill.additionalRiskLabels!.length}
          </span>
        )}
      </span>
      {popoverContent}
    </div>
  );
}

/* ── Simulated old-style duplicate pairs ── */
const DUPLICATE_PAIRS = [
  { supplier: "Metro Couriers", billNumbers: ["BILL-024", "BILL-026"], amount: 185.0 },
  { supplier: "City Power Co", billNumbers: ["BILL-002", "BILL-023"], amount: 2953.5 },
];

/* ── Duplicate Review sub-view (old-style) ── */
function DuplicateReviewView({ onBack }: { onBack: () => void }) {
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const allResolved = resolved.size === DUPLICATE_PAIRS.length;

  if (allResolved) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-2">
            All duplicate bills have been reviewed
          </h2>
          <p className="text-[14px] text-[#6b7280] mb-6">
            Any new duplicates will appear here for your review.
          </p>
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded bg-[#00b4d8] text-white text-[14px] font-semibold hover:bg-[#0096b4]"
          >
            Return to bills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
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
                  <th className="text-right px-4 py-2 font-normal">Paid</th>
                  <th className="text-right px-4 py-2 font-normal">Due</th>
                  <th className="text-right px-4 py-2 font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {pair.billNumbers.map((bn, i) => (
                  <tr key={bn} className="border-b border-[#eaebec]">
                    <td className="px-4 py-2 font-[700]">{pair.supplier}</td>
                    <td className="px-4 py-2">{bn}</td>
                    <td className="px-4 py-2">{i === 0 ? "Jan 18, 2025" : "Nov 18, 2024"}</td>
                    <td className="px-4 py-2">{i === 0 ? "Feb 18, 2025" : "Dec 19, 2024"}</td>
                    <td className="px-4 py-2">{statusPill("paid")}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(pair.amount)}</td>
                    <td className="px-4 py-2 text-right">0.00</td>
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

/* ── Main component ── */
/* Bill IDs that are part of duplicate pairs */
/** Row highlight when `highlightDupes`: Metro duplicate pair (BILL-024 ↔ paid BILL-026). */
const DUPLICATE_BILL_IDS = new Set(["24", "26"]);

export function BillsListP5({ compact = false, highlightDupes = false }: { compact?: boolean; highlightDupes?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { config } = useDupeOption();

  const tab = parseBillsListTab(searchParams.get("tab"));
  const showStatusColumn = tab === "all";
  const [query, setQuery] = useState("");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  /** Closed Beta / Open Beta: “duplicate bills” bar above the list (prototype 5 pattern) — separate from Protect dismiss. */
  const [legacyDupeBannerDismissed, setLegacyDupeBannerDismissed] = useState(false);
  /** Open Beta / GA: collapsed bar by default; expand to see flagged table. */
  const [actionCenterOpen, setActionCenterOpen] = useState(false);
  const [actionCenterShowAll, setActionCenterShowAll] = useState(false);

  useEffect(() => {
    setActionCenterOpen(false);
    setBannerDismissed(false);
    setActionCenterShowAll(false);
    setLegacyDupeBannerDismissed(false);
  }, [config.releaseStage, config.dupeUnification, config.showSummaryBanner]);

  const viewParam = searchParams.get("view");
  const isDuplicateReview = viewParam === "duplicate-review";

  // Flagged bills data for action center
  const flaggedBills = useMemo(() => safetyShieldBills.filter(b => b.aiFlagged), []);
  const highRisk = useMemo(() => flaggedBills.filter(b => b.riskLevel === "high"), [flaggedBills]);
  const mediumRisk = useMemo(() => flaggedBills.filter(b => b.riskLevel === "medium"), [flaggedBills]);

  const selectedBillId = useMemo(() => {
    const m = pathname.match(/\/bills\/([^/]+)$/);
    return m?.[1] ?? null;
  }, [pathname]);

  const baseBills = useMemo(() => {
    const bills: Bill[] =
      tab === "all"
        ? safetyShieldBills
        : tab === "repeating"
          ? []
          : getSafetyShieldBillsByStatus(tab as Exclude<BillsListTabValue, "all" | "repeating">);
    // Custom sort: 1 flagged (unusual amount before other types), 2 clean, then scattered
    const flagged = [...bills.filter((b) => b.aiFlagged)].sort((a, b) => {
      const ra = (a.riskType ? FLAGGED_RISK_LIST_ORDER[a.riskType] : undefined) ?? 9;
      const rb = (b.riskType ? FLAGGED_RISK_LIST_ORDER[b.riskType] : undefined) ?? 9;
      if (ra !== rb) return ra - rb;
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    });
    const clean = bills.filter(b => !b.aiFlagged);
    const result: typeof bills = [];
    if (flagged.length > 0) result.push(flagged[0]); // 1 flagged
    result.push(...clean.slice(0, 2)); // 2 clean
    // scatter the rest: alternating flagged/clean
    let fi = 1, ci = 2;
    while (fi < flagged.length || ci < clean.length) {
      if (ci < clean.length) result.push(clean[ci++]);
      if (fi < flagged.length) result.push(flagged[fi++]);
      if (ci < clean.length) result.push(clean[ci++]);
    }
    return result;
  }, [tab]);

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

  /** GA: list Protect action centre; Closed Beta / Open Beta use legacy duplicate prompt when not unified. */
  const showActionCenterUI =
    config.releaseStage === "ga" &&
    flaggedBills.length > 0 &&
    !bannerDismissed;
  const showListProtect =
    !compact && showActionCenterUI && config.showSummaryBanner;

  /** Closed Beta / Open Beta: legacy duplicate prompt when dupes are not unified into Protect. */
  const showLegacyDupeTopBar =
    config.releaseStage !== "ga" && !legacyDupeBannerDismissed && !config.dupeUnification;

  // Duplicate review sub-view (legacy mode)
  if (isDuplicateReview && !compact) {
    return (
      <DuplicateReviewView
        onBack={() => {
          const p = new URLSearchParams();
          p.set("tab", tab);
          router.replace(`${BILLS_BASE}?${p.toString()}`);
        }}
      />
    );
  }

  const buildListBanner = () => {
    return (
      <div
        className="bg-white border border-[#e1e2e5] rounded mt-8 mb-4 overflow-hidden"
        data-xp-highlight
      >
        {/* Collapsed bar */}
        <div
          className="flex items-center gap-4 px-4 py-2 cursor-pointer select-none hover:bg-[#fafbfc] transition-colors"
          onClick={() => setActionCenterOpen(!actionCenterOpen)}
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#fffbeb] shrink-0">
            <ShieldAlert
              className={`h-4 w-4 ${protectShieldIconClassName}`}
              style={protectShieldIconStyle}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold leading-tight text-[#0a0a0a]">
              Since you last logged in 2 days ago, Xero Protect found {flaggedBills.length} bill
              {flaggedBills.length !== 1 ? "s" : ""} that may need review{" "}
              <a
                href="#"
                className="text-[#0078c8] underline underline-offset-2 decoration-[#0078c8] font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                Learn more
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setBannerDismissed(true);
            }}
            className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[#8c919a] hover:text-[#333940] hover:bg-[#f2f3f4] transition-colors"
            aria-label="Dismiss summary"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Expanded: table — paired rows (2 bills) then singles; “Show more” lives in footer button */}
        {actionCenterOpen && (() => {
            const ACTION_PREVIEW_BILLS = 4;
            const sorted = sortFlaggedBillsForActionCenter([...flaggedBills]);
            const visible = actionCenterShowAll ? sorted : sorted.slice(0, ACTION_PREVIEW_BILLS);
            const remainder = sorted.length - ACTION_PREVIEW_BILLS;
            let shieldSlot = 0;

            const billHref = (id: string) => `${BILLS_BASE}/${id}?${billFullViewQuery(tab)}`;

            const actionCell = (bill: Bill) => (
              <td
                className="px-2 py-0 align-middle w-[32%] min-w-[12rem] text-[13px] leading-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-nowrap items-center justify-between gap-x-2 w-full min-w-0 h-10">
                  <div className="flex flex-wrap gap-2 items-center min-w-0">
                    <Link
                      href={billHref(bill.id)}
                      className="text-[13px] font-semibold text-[#1c52de] hover:underline whitespace-nowrap leading-5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View bill
                    </Link>
                    {bill.duplicateOfBillId ? (
                      <Link
                        href={billHref(bill.duplicateOfBillId)}
                        className="text-[13px] font-semibold text-[#1c52de] hover:underline whitespace-nowrap leading-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View original
                      </Link>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-[13px] font-medium leading-5 text-[#1c52de] border border-[#cfd1d5] rounded px-2 py-1 bg-white hover:bg-[#f7f8fa]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {bannerRowPrimaryLabel(bill.status)}
                  </button>
                </div>
              </td>
            );

            const billRow = (bill: Bill, key: string) => {
              return (
                <tr
                  key={key}
                  className="border-b border-[#eaebec] hover:bg-[#f7f8fa] cursor-pointer transition-colors"
                  onClick={() => router.push(billHref(bill.id))}
                >
                  {actionCenterShieldCell(shieldSlot++)}
                  <td className="px-4 py-0 align-middle text-[13px] leading-5 font-medium text-[#0a0a0a] max-w-[12rem]">
                    <span className="block truncate">{bill.supplier}</span>
                  </td>
                  <td className={`px-2 py-0 align-middle text-[13px] leading-5 font-medium ${riskLevelTextClass(bill)}`}>
                    {riskTypeLabels[bill.riskType as RiskType]}
                  </td>
                  <td className="px-2 py-0 align-middle">{statusPill(bill.status, "xui7438")}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 tabular-nums text-[#0a0a0a]">{formatDateProd(bill.dueDate)}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 text-right tabular-nums text-[#0a0a0a]">{formatCurrency(bill.total)}</td>
                  {actionCell(bill)}
                </tr>
              );
            };

            const rows: ReactNode[] = [];
            let idx = 0;

            if (visible.length >= 2) {
              const a = visible[0];
              const b = visible[1];
              rows.push(
                <tr
                  key={`g1-${a.id}`}
                  className="border-b border-[#eaebec] hover:bg-[#f7f8fa] cursor-pointer transition-colors"
                  onClick={() => router.push(billHref(a.id))}
                >
                  {actionCenterShieldCell(shieldSlot++)}
                  <td className="px-4 py-0 align-middle text-[13px] leading-5 font-medium text-[#0a0a0a] max-w-[12rem]">
                    <span className="block truncate">{a.supplier}</span>
                  </td>
                  <td className={`px-2 py-0 align-middle text-[13px] leading-5 font-medium ${riskLevelTextClass(a)}`}>
                    {riskTypeLabels[a.riskType as RiskType]}
                  </td>
                  <td className="px-2 py-0 align-middle">{statusPill(a.status, "xui7438")}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 tabular-nums text-[#0a0a0a]">{formatDateProd(a.dueDate)}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 text-right tabular-nums text-[#0a0a0a]">{formatCurrency(a.total)}</td>
                  {actionCell(a)}
                </tr>,
                <tr
                  key={`g1-${b.id}`}
                  className="border-b border-[#eaebec] hover:bg-[#f7f8fa] cursor-pointer transition-colors"
                  onClick={() => router.push(billHref(b.id))}
                >
                  {actionCenterShieldCell(shieldSlot++)}
                  <td className="px-4 py-0 align-middle text-[13px] leading-5 font-medium text-[#0a0a0a] max-w-[12rem]">
                    <span className="block truncate">{b.supplier}</span>
                  </td>
                  <td className={`px-2 py-0 align-middle text-[13px] leading-5 font-medium ${riskLevelTextClass(b)}`}>
                    {riskTypeLabels[b.riskType as RiskType]}
                  </td>
                  <td className="px-2 py-0 align-middle">{statusPill(b.status, "xui7438")}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 tabular-nums text-[#0a0a0a]">{formatDateProd(b.dueDate)}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 text-right tabular-nums text-[#0a0a0a]">{formatCurrency(b.total)}</td>
                  {actionCell(b)}
                </tr>
              );
              idx = 2;
            }

            if (visible.length >= 4) {
              const a = visible[2];
              const b = visible[3];
              rows.push(
                <tr
                  key={`g2-${a.id}`}
                  className="border-b border-[#eaebec] hover:bg-[#f7f8fa] cursor-pointer transition-colors"
                  onClick={() => router.push(billHref(a.id))}
                >
                  {actionCenterShieldCell(shieldSlot++)}
                  <td className="px-4 py-0 align-middle text-[13px] leading-5 font-medium text-[#0a0a0a] max-w-[12rem]">
                    <span className="block truncate">{a.supplier}</span>
                  </td>
                  <td className={`px-2 py-0 align-middle text-[13px] leading-5 font-medium ${riskLevelTextClass(a)}`}>
                    {riskTypeLabels[a.riskType as RiskType]}
                  </td>
                  <td className="px-2 py-0 align-middle">{statusPill(a.status, "xui7438")}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 tabular-nums text-[#0a0a0a]">{formatDateProd(a.dueDate)}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 text-right tabular-nums text-[#0a0a0a]">{formatCurrency(a.total)}</td>
                  {actionCell(a)}
                </tr>,
                <tr
                  key={`g2-${b.id}`}
                  className="border-b border-[#eaebec] hover:bg-[#f7f8fa] cursor-pointer transition-colors"
                  onClick={() => router.push(billHref(b.id))}
                >
                  {actionCenterShieldCell(shieldSlot++)}
                  <td className="px-4 py-0 align-middle text-[13px] leading-5 font-medium text-[#0a0a0a] max-w-[12rem]">
                    <span className="block truncate">{b.supplier}</span>
                  </td>
                  <td className={`px-2 py-0 align-middle text-[13px] leading-5 font-medium ${riskLevelTextClass(b)}`}>
                    {riskTypeLabels[b.riskType as RiskType]}
                  </td>
                  <td className="px-2 py-0 align-middle">{statusPill(b.status, "xui7438")}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 tabular-nums text-[#0a0a0a]">{formatDateProd(b.dueDate)}</td>
                  <td className="px-3 py-0 align-middle text-[13px] leading-5 text-right tabular-nums text-[#0a0a0a]">{formatCurrency(b.total)}</td>
                  {actionCell(b)}
                </tr>
              );
              idx = 4;
            }

            for (; idx < visible.length; idx++) {
              rows.push(billRow(visible[idx], `s-${visible[idx].id}`));
            }

            return (
              <div className="border-t border-[#e1e2e5]">
                <table className="w-full table-fixed text-left text-[13px] leading-5 [&_thead_tr]:h-10 [&_tbody_tr]:h-10 [&_thead_th]:align-middle [&_thead_th]:py-0 [&_tbody_td]:align-middle [&_tbody_td]:py-0">
                  <colgroup>
                    <col className="w-10" />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="w-[32%] min-w-[12rem]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b border-[#e1e2e5] text-[13px] leading-5 font-normal text-[#6b7280]">
                      <th className="px-2 font-normal w-10" />
                      <th className="text-left font-normal px-4">From</th>
                      <th className="text-left font-normal px-2">Risk</th>
                      <th className="text-left font-normal px-2">Status</th>
                      <th className="text-left font-normal px-3">Due date</th>
                      <th className="text-right font-normal px-3">Amount</th>
                      <th className="text-right font-normal px-2 w-[32%] min-w-[12rem]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
                {!actionCenterShowAll && remainder > 0 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActionCenterShowAll(true); }}
                    className="w-full px-4 py-2.5 text-[13px] font-medium text-[#1c52de] hover:bg-[#f7f8fa] transition-colors text-left"
                  >
                    Show {remainder} more flagged bill{remainder !== 1 ? "s" : ""}
                  </button>
                )}
              </div>
            );
          })()}
        </div>
    );
  };

  /** Full-width bills list matches Figma Xero Protect — All (7438:199). */
  const listFigmaUi = !compact;
  /** Flatter borders / no inset grid — closer to live Bills (prototype 8). */
  const prodMatchTable = listFigmaUi;
  const cellGridLine = prodMatchTable ? "" : "shadow-[inset_0_1px_0_0_#ccced2]";
  /** Live Bills uses en-NZ dates (e.g. 01 Apr 2026), not US-style Figma strings */
  const listDateStyle: "nz" | "figma" = prodMatchTable ? "nz" : "figma";

  return (
    <div
      className={`flex-1 overflow-auto min-h-0 ${compact ? "bg-white" : "bg-[#f2f3f4]"}`}
    >
      {showListProtect && buildListBanner()}

      {/* Legacy duplicate review prompt (non-unified; non-GA stages). */}
      {!compact && showLegacyDupeTopBar && (
        <div className="bg-white border border-[#e1e2e5] rounded px-6 py-4 mt-8 mb-3">
          <div className="flex items-start justify-between">
            <p className="text-[14px] text-[#333940]">
              We noticed you have a set of duplicate bills. Would you like to review it?
            </p>
            <button
              type="button"
              onClick={() => setLegacyDupeBannerDismissed(true)}
              className="shrink-0 text-[#8c919a] hover:text-[#333940] p-1 ml-4"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="text-right mt-2">
            <Link
              href={`${BILLS_BASE}?view=duplicate-review&tab=${encodeURIComponent(tab)}`}
              className="text-[14px] font-semibold text-[#1c52de] hover:underline"
            >
              Review
            </Link>
          </div>
        </div>
      )}

      {/* Bills table — Figma 7438:355 (full list); compact keeps split quickview chrome */}
      <div
        className={
          compact
            ? "bg-white overflow-hidden"
            : [
                !showListProtect && !showLegacyDupeTopBar ? "mt-8" : "",
                prodMatchTable
                  ? "bg-white overflow-hidden border border-[#e1e2e5]"
                  : "bg-white overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,10,30,0.2)]",
              ]
                .filter(Boolean)
                .join(" ")
        }
      >
        {listFigmaUi ? (
          <div className="px-2 pt-2">
            <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
              <div className="relative min-w-0 flex-[1_1_520px]">
                <div className="flex h-8 items-center gap-1 rounded-[3px] bg-[rgba(0,10,30,0.05)] pl-0.5 pr-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <Search className="size-[15px] text-[rgba(0,10,30,0.65)]" aria-hidden />
                  </div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a contact, amount, or reference"
                    aria-label="Search bills"
                    className="h-[30px] min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#000a1e] outline-none placeholder:text-[rgba(0,10,30,0.65)] focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex w-[160px] shrink-0 flex-col">
                  <span className="pb-0.5 text-[13px] font-bold leading-5 text-[#404756]">
                    Start date
                  </span>
                  <div className="flex h-8 items-center rounded-[3px] border border-[#a6a9b0] bg-white pr-px">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                      <Calendar className="size-3 text-[rgba(0,10,30,0.65)]" aria-hidden />
                    </div>
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      readOnly
                      className="h-[30px] flex-1 cursor-default border-0 bg-transparent px-1 text-[13px] text-[#000a1e] outline-none"
                    />
                  </div>
                </div>
                <div className="flex w-[160px] shrink-0 flex-col">
                  <span className="pb-0.5 text-[13px] font-bold leading-5 text-[#404756]">
                    End date
                  </span>
                  <div className="flex h-8 items-center rounded-[3px] border border-[#a6a9b0] bg-white pr-px">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                      <Calendar className="size-3 text-[rgba(0,10,30,0.65)]" aria-hidden />
                    </div>
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      readOnly
                      className="h-[30px] flex-1 cursor-default border-0 bg-transparent px-1 text-[13px] text-[#000a1e] outline-none"
                    />
                  </div>
                </div>
                <div className="flex w-[160px] shrink-0 flex-col">
                  <span className="pb-0.5 text-[13px] font-bold leading-5 text-[rgba(0,10,30,0.75)]">
                    Date type
                  </span>
                  <select className="h-8 w-full rounded-[3px] border border-[#a6a9b0] bg-white px-3 text-[13px] leading-5 text-[#000a1e] outline-none">
                    <option>Any date</option>
                  </select>
                </div>
              </div>
              <div className="mb-0.5 flex shrink-0 flex-wrap items-center gap-2 sm:ml-auto">
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-[3px] px-2 text-[13px] font-bold leading-5 text-[#0078c8]"
                >
                  Filter <SlidersHorizontal className="size-[11px]" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-[3px] px-2 text-[13px] font-bold leading-5 text-[#0078c8]"
                >
                  Columns <Columns3 className="size-[13px]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`px-4 py-3 ${compact ? "border-b border-[#e1e2e5]" : ""}`}>
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
                  className="h-9 w-[120px] rounded border border-[#ccc] bg-white px-3 text-[13px] leading-[1.25]"
                />
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <span className="text-[12px] leading-tight text-[#333940]">End date</span>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
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
        )}

        <div
          className={
            listFigmaUi
              ? "flex h-6 items-center justify-end border-b border-[#ccced2] px-2 text-[13px] leading-6 text-[#404756]"
              : "px-4 py-1.5 text-right text-[13px] text-[#333940] " +
                (compact ? "" : "border-b border-[#e1e2e5]")
          }
        >
          {filteredBills.length} items | {formatCurrency(totalAmount).replace("$", "").trim()} NZD
        </div>

        <div
          className={
            listFigmaUi
              ? prodMatchTable
                ? "overflow-x-auto"
                : "overflow-x-auto rounded-b-[3px]"
              : "overflow-x-auto"
          }
        >
          <table
            className={
              listFigmaUi && showStatusColumn
                ? "table-fixed w-full min-w-0 border-collapse text-left [&_thead_tr]:h-10 [&_tbody_tr]:h-10 [&_thead_th]:h-10 [&_thead_th]:align-middle [&_thead_th]:py-0 [&_tbody_td]:align-middle [&_tbody_td]:py-0"
                : "w-full border-collapse text-left text-[14px] leading-tight [&_thead_tr]:h-10 [&_tbody_tr]:h-10 [&_thead_th]:align-middle [&_thead_th]:py-0 [&_tbody_td]:align-middle [&_tbody_td]:py-0"
            }
          >
            {listFigmaUi && showStatusColumn ? (
              <colgroup>
                <col style={{ width: "3.15%" }} />
                <col style={{ width: "17.1%" }} />
                <col style={{ width: "15.1%" }} />
                <col style={{ width: "17.1%" }} />
                <col style={{ width: "12.1%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "8.65%" }} />
                <col style={{ width: "8.65%" }} />
                <col style={{ width: "4.15%" }} />
              </colgroup>
            ) : null}
            <thead className={listFigmaUi ? "bg-white" : "bg-[#fafbfc]"}>
              <tr
                className={
                  listFigmaUi
                    ? prodMatchTable
                      ? "border-b border-[#e1e2e5] text-[13px] text-[rgba(0,10,30,0.75)]"
                      : "border-0 text-[13px] text-[rgba(0,10,30,0.75)]"
                    : `${compact ? "border-b border-[#e1e2e5]" : "border-b border-[#ccced2]"} ${compact ? "text-[#6b7280]" : "text-[#6b7280] text-[13px]"}`
                }
              >
                <th
                  className={
                    listFigmaUi
                      ? "bg-white pl-3 text-left text-[13px] font-normal leading-5 text-[rgba(0,10,30,0.75)]"
                      : "w-10 px-2 font-normal"
                  }
                >
                  {listFigmaUi ? "View" : ""}
                </th>
                <th
                  className={
                    listFigmaUi
                      ? "bg-white pl-3 text-left text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                      : `${compact ? "px-2" : "px-3"} font-normal`
                  }
                >
                  From
                </th>
                {showStatusColumn && (
                  <th
                    className={
                      listFigmaUi
                        ? "bg-white pl-3 text-left text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                        : "px-2 font-normal"
                    }
                  >
                    Status
                  </th>
                )}
                {!showStatusColumn && compact && (
                  <th className="px-2 font-normal">Reference</th>
                )}
                {!compact && (
                  <th
                    className={
                      listFigmaUi
                        ? "bg-white pl-3 text-left text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                        : "px-2 font-normal"
                    }
                  >
                    Reference
                  </th>
                )}
                {!compact && (
                  <th
                    className={
                      listFigmaUi
                        ? "bg-white pl-3 text-left text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                        : "px-2 font-normal"
                    }
                  >
                    Date
                  </th>
                )}
                <th
                  className={
                    listFigmaUi
                      ? "bg-white pl-3 text-left text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                      : "px-2 font-normal"
                  }
                >
                  {listFigmaUi ? (
                    <span className="inline-flex items-center gap-1">
                      Due date
                      <ChevronDown className="size-2 shrink-0 opacity-80" strokeWidth={2.5} aria-hidden />
                    </span>
                  ) : (
                    <>Due{!compact ? " date ↓" : null}</>
                  )}
                </th>
                {!compact && (
                  <th
                    className={
                      listFigmaUi
                        ? "bg-white pr-3 text-right text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                        : "px-2 text-right font-normal"
                    }
                  >
                    Paid
                  </th>
                )}
                <th
                  className={
                    listFigmaUi
                      ? "bg-white pr-3 text-right text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]"
                      : `${compact ? "px-2" : "px-2"} text-right font-normal`
                  }
                >
                  {compact ? "Amt" : "Due"}
                </th>
                {listFigmaUi && showStatusColumn && (
                  <th className="bg-white px-2 text-center text-[13px] font-normal leading-6 text-[rgba(0,10,30,0.75)]">
                    Files
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
            {filteredBills.map((bill) => {
              const isSelected = selectedBillId === bill.id;
              const isFlagged = bill.aiFlagged && bill.riskLevel;
              const isDupe = highlightDupes && DUPLICATE_BILL_IDS.has(bill.id);
              const isOverdue =
                bill.status === "overdue" ||
                (bill.status === "awaiting_payment" && new Date(bill.dueDate) < new Date());
              const dueUrgencyFigma =
                listFigmaUi &&
                (bill.status === "awaiting_payment" || bill.status === "overdue");
              const riskBorder = "";
              const rowNav = compact
                ? `${BILLS_BASE}/${bill.id}?${billQuickViewQuery(tab)}`
                : `${BILLS_BASE}/${bill.id}?${billFullViewQuery(tab)}`;
              const referenceCell = (
                <span
                  className={`inline-flex items-center gap-1.5 ${listFigmaUi ? "text-[15px] font-normal text-[#000a1e]" : "text-[#0a0a0a]"}`}
                >
                  <span className="tabular-nums">{bill.billNumber}</span>
                  {bill.aiFlagged && bill.riskLevel ? (
                    <RiskChipPopover bill={bill} popoverSide="left" />
                  ) : null}
                </span>
              );
              return (
                <tr
                  key={bill.id}
                  className={`cursor-pointer transition-colors ${
                    listFigmaUi ? "h-10 min-h-[40px]" : ""
                  } ${
                    listFigmaUi
                      ? prodMatchTable
                        ? "border-b border-[#eaebec]"
                        : ""
                      : `border-b ${compact ? "border-[#eef0f2]" : "border-[#e1e2e5]"}`
                  } ${
                    isSelected
                      ? "bg-[#e6f0ff]"
                      : isDupe
                        ? "bg-[#fffbeb] hover:bg-[#fef3c7]"
                        : `hover:bg-[#f7f8fa] ${riskBorder}`
                  }`}
                  onClick={() => router.push(rowNav)}
                >
                  <td
                    className={`py-0 text-center align-middle ${
                      listFigmaUi ? ["pl-1", cellGridLine].filter(Boolean).join(" ") : "px-2"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (compact) {
                          router.push(`${BILLS_BASE}/${bill.id}?${billFullViewQuery(tab)}`);
                        } else {
                          router.push(`${BILLS_BASE}/${bill.id}?${billQuickViewQuery(tab)}`);
                        }
                      }}
                      className={
                        listFigmaUi
                          ? "ml-1 flex size-10 items-center justify-center rounded-full text-[#0078c8] transition-colors hover:bg-[rgba(0,120,200,0.08)]"
                          : "flex h-6 w-6 items-center justify-center rounded text-[#1c52de] transition-colors hover:bg-[#e6f0ff]"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="xui-icon xui-icon-color-blue shrink-0"
                        focusable="false"
                        height={12}
                        viewBox="0 0 18 12"
                        width={18}
                      >
                        <path
                          fill="currentColor"
                          d="M9 12c-6.314 0-9-6-9-6s2.686-6 9-6 9 6 9 6-2.686 6-9 6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td
                    className={`align-middle max-w-[14rem] py-0 ${
                      listFigmaUi
                        ? ["pl-3", cellGridLine].filter(Boolean).join(" ")
                        : compact
                          ? "px-2"
                          : "px-3"
                    }`}
                  >
                    <Link
                      href={rowNav}
                      className={
                        listFigmaUi
                          ? "block truncate text-[15px] font-[700] leading-6 text-[#000a1e] hover:underline"
                          : "block truncate font-[700] leading-tight text-[#0a0a0a] hover:underline"
                      }
                      onClick={(e) => e.stopPropagation()}
                    >
                      {bill.supplier}
                    </Link>
                  </td>
                  {showStatusColumn && (
                    <td
                      className={`align-middle py-0 ${
                        listFigmaUi ? ["pl-3", cellGridLine].filter(Boolean).join(" ") : "px-2"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {statusPill(bill.status, listFigmaUi ? "xui7438" : "default")}
                        {bill.aiFlagged && bill.riskLevel && compact ? (
                          <RiskChipPopover bill={bill} />
                        ) : null}
                      </span>
                    </td>
                  )}
                  {!showStatusColumn && compact && (
                    <td className="px-2 py-0 align-middle">{referenceCell}</td>
                  )}
                  {!compact && (
                    <td
                      className={`align-middle py-0 ${
                        listFigmaUi
                          ? ["pl-3", "text-[15px]", "leading-6", "text-[#000a1e]", cellGridLine]
                              .filter(Boolean)
                              .join(" ")
                          : "px-2"
                      }`}
                    >
                      {referenceCell}
                    </td>
                  )}
                  {!compact && (
                    <td
                      className={`align-middle py-0 ${
                        listFigmaUi
                          ? ["pl-3", "text-[15px]", "leading-6", "text-[#000a1e]", cellGridLine]
                              .filter(Boolean)
                              .join(" ")
                          : "px-2 text-[#0a0a0a]"
                      }`}
                    >
                      {formatDateProd(bill.issueDate, listFigmaUi ? listDateStyle : "nz")}
                    </td>
                  )}
                  <td
                    className={`align-middle py-0 ${
                      listFigmaUi
                        ? [
                            "pl-3",
                            "text-[15px]",
                            "leading-6",
                            cellGridLine,
                            dueUrgencyFigma ? "text-[#dc3246]" : "text-[#000a1e]",
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : `${compact ? "px-2" : "px-2"} ${isOverdue ? "text-[#c31230]" : "text-[#0a0a0a]"}`
                    }`}
                  >
                    {listFigmaUi ? (
                      dueUrgencyFigma ? (
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="size-4 shrink-0 text-[#dc3246]" aria-hidden />
                          {formatDateProd(bill.dueDate, listDateStyle)}
                        </span>
                      ) : (
                        formatDateProd(bill.dueDate, listDateStyle)
                      )
                    ) : (
                      <>
                        {isOverdue && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="-mt-0.5 mr-1 inline text-[#c31230]"
                          >
                            <rect x="1" y="2" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M1 6h14" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        )}
                        {formatDateProd(bill.dueDate, "nz")}
                      </>
                    )}
                  </td>
                  {!compact && (
                    <td
                      className={`text-right align-middle tabular-nums py-0 ${
                        listFigmaUi
                          ? ["pr-3", "text-[15px]", "leading-6", "text-[#000a1e]", cellGridLine]
                              .filter(Boolean)
                              .join(" ")
                          : "px-2 text-[#0a0a0a]"
                      }`}
                    >
                      {bill.status === "paid" ? formatCurrency(bill.total).replace("$", "") : "0.00"}
                    </td>
                  )}
                  <td
                    className={`text-right align-middle tabular-nums py-0 ${
                      listFigmaUi
                        ? ["pr-3", "text-[15px]", "leading-6", "text-[#000a1e]", cellGridLine]
                            .filter(Boolean)
                            .join(" ")
                        : `${compact ? "px-2" : "px-2"} text-[#0a0a0a]`
                    }`}
                  >
                    {bill.status !== "paid" ? formatCurrency(bill.total).replace("$", "") : "0.00"}
                  </td>
                  {listFigmaUi && showStatusColumn && (
                    <td
                      className={`text-center align-middle py-0 ${
                        [cellGridLine, "px-2"].filter(Boolean).join(" ") || "px-2"
                      }`}
                    >
                      {(() => {
                        const n = demoFileCount(bill);
                        return n > 0 ? (
                          <span className="inline-flex items-center justify-center gap-1 text-[15px] text-[#000a1e]">
                            <FileText
                              className="size-[15px] shrink-0 text-[rgba(0,10,30,0.65)]"
                              aria-hidden
                            />
                            <span className="tabular-nums">{n}</span>
                          </span>
                        ) : (
                          <span className="text-[15px] text-[rgba(0,10,30,0.35)]">—</span>
                        );
                      })()}
                    </td>
                  )}
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        {filteredBills.length === 0 && (
          <div
            className={`px-4 py-8 text-center text-[13px] text-[#8c919a] ${compact ? "" : "border-t border-[#e1e2e5]"}`}
          >
            No bills match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
