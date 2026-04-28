import type { ProtectTooltipDetail } from "../charts/cashflowProtectTooltipHtml";
import { XERO_PROTECT_LATEST_BILLS } from "@/lib/xero-protect-latest-prototype";

export type LinkMeta = {
  linkId: string;
  dayIndex: number;
  severity: "normal" | "warning" | "risk";
};

export type ProtectFlag = {
  linkId: string;
  billName: string;
  amount: string;
  reason: "duplicate" | "unusual_amount" | "bank_details";
  reasonLabel: string;
  dayIndex: number;
  /** Drives chart dot + shield: risk = red / high, else orange / medium. */
  severity: "normal" | "warning" | "risk";
  /** `Bill.id` in safety-shield — opens latest Xero Protect prototype bills route. */
  targetBillId: string;
  /** Structured tooltip body — no instructional copy. */
  tooltipDetail: ProtectTooltipDetail;
};

const PLAIN_SHORTFALL: ProtectTooltipDetail = {
  kind: "plain",
  text: "Included in cash flow shortfall plan.",
};

/**
 * Shortfall action-plan table only — links bill names to chart day indices.
 * Not shown in the Protect widget (that uses {@link PROTECT_FLAGS}).
 */
export const SHORTFALL_PLAN_LINK_FLAGS: ProtectFlag[] = [
  { linkId: "sf-1", billName: "City Power Co", amount: "$890", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 1, severity: "warning", targetBillId: "23", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-2", billName: "WebHost Pro", amount: "$199", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 1, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-3", billName: "Kiwi IT Support", amount: "$450", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 1, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-4", billName: "Office Rent", amount: "$3,200", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 2, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-5", billName: "Acme Supplies", amount: "$1,450", reason: "unusual_amount", reasonLabel: "Unusual amount", dayIndex: 2, severity: "warning", targetBillId: "27", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-6", billName: "CleanRight Services", amount: "$650", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 2, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-7", billName: "Paper Plus Ltd", amount: "$946", reason: "unusual_amount", reasonLabel: "Unusual amount", dayIndex: 2, severity: "warning", targetBillId: "19", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-8", billName: "GreenLeaf Plants", amount: "$340", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 2, severity: "warning", targetBillId: "15", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-9", billName: "NZ Post", amount: "$185", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 2, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-10", billName: "TradeMe Advertising", amount: "$550", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 2, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-11", billName: "Fresh Foods NZ", amount: "$1,120", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 3, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-12", billName: "Metro Couriers", amount: "$385", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 3, severity: "warning", targetBillId: "12", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-13", billName: "TechSupply Direct", amount: "$2,450", reason: "unusual_amount", reasonLabel: "Unusual amount", dayIndex: 3, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-14", billName: "DataStream Analytics", amount: "$1,850", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 3, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-15", billName: "Spark Business", amount: "$425", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 3, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-16", billName: "AccountRight Pro", amount: "$149", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 3, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-17", billName: "Apex Security", amount: "$1,200", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 4, severity: "warning", targetBillId: "14", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-18", billName: "SecurePay Solutions", amount: "$780", reason: "bank_details", reasonLabel: "Bank details changed", dayIndex: 4, severity: "warning", targetBillId: "22", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-19", billName: "Pacific Insurance", amount: "$2,100", reason: "duplicate", reasonLabel: "Possible duplicate", dayIndex: 4, severity: "normal", targetBillId: "29", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-20", billName: "BizTech Consulting", amount: "$3,500", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 4, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-21", billName: "AirNZ Corporate", amount: "$1,240", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 4, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-22", billName: "Wellington Water", amount: "$320", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 5, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-23", billName: "Office Warehouse", amount: "$890", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 5, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-24", billName: "Xero Payroll Run", amount: "$8,200", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 5, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
  { linkId: "sf-25", billName: "Waste Management NZ", amount: "$280", reason: "duplicate", reasonLabel: "Needs review", dayIndex: 6, severity: "warning", targetBillId: "13", tooltipDetail: PLAIN_SHORTFALL },
];

/** Exactly four rows for the Protect widget and chart marker definitions (purchases overview). */
export const PROTECT_FLAGS: ProtectFlag[] = [
  {
    billName: "Metro Utilities — Mar invoice",
    amount: "$425.00",
    reason: "duplicate",
    reasonLabel: "Possible duplicate",
    linkId: "metro",
    dayIndex: 4,
    severity: "normal",
    targetBillId: "24",
    tooltipDetail: {
      kind: "duplicate",
      thisBill: {
        date: "11 Mar 2026",
        amount: "$425.00",
        href: `${XERO_PROTECT_LATEST_BILLS}/24`,
      },
      otherPayment: {
        date: "4 Mar 2026",
        amount: "$425.00",
        href: `${XERO_PROTECT_LATEST_BILLS}/26`,
      },
    },
  },
  {
    billName: "Acme Supplies Ltd",
    amount: "$12,400.00",
    reason: "unusual_amount",
    reasonLabel: "Unusual amount",
    linkId: "acme",
    dayIndex: 5,
    severity: "warning",
    targetBillId: "27",
    tooltipDetail: {
      kind: "unusual",
      average: "$3,200",
      comparison: "≈288% above 12-mo average",
    },
  },
  {
    billName: "Tech Partners Ltd",
    amount: "$650.00",
    reason: "bank_details",
    reasonLabel: "Bank details changed",
    linkId: "tech",
    dayIndex: 6,
    severity: "warning",
    targetBillId: "28",
    tooltipDetail: {
      kind: "bank",
      lastLine: "Last payment account: ···4821",
      thisLine: "This bill account: ···5912",
    },
  },
  {
    billName: "Pacific Insurance",
    amount: "$2,100.00",
    reason: "duplicate",
    reasonLabel: "Possible duplicate",
    linkId: "pacific",
    dayIndex: 14,
    severity: "normal",
    targetBillId: "29",
    tooltipDetail: {
      kind: "duplicate",
      thisBill: {
        date: "12 Mar 2026",
        amount: "$2,100.00",
        href: `${XERO_PROTECT_LATEST_BILLS}/29`,
      },
      otherPayment: {
        date: "2 Mar 2026",
        amount: "$2,100.00",
        href: `${XERO_PROTECT_LATEST_BILLS}/30`,
      },
    },
  },
];

const ALL_FLAGS_FOR_NAME_LOOKUP: ProtectFlag[] = [
  ...SHORTFALL_PLAN_LINK_FLAGS,
  ...PROTECT_FLAGS,
];

/** Best matching Protect / shortfall flag for a bill display name (fuzzy on supplier root). */
export function getProtectFlagForBillName(name: string): ProtectFlag | null {
  const lowered = name.toLowerCase().trim();
  let best: ProtectFlag | null = null;
  let bestScore = -1;
  for (const r of ALL_FLAGS_FOR_NAME_LOOKUP) {
    const root = (r.billName.split(" — ")[0] ?? "").toLowerCase();
    if (!root) continue;
    let score = 0;
    if (lowered === root) {
      score = 10000 + root.length;
    } else if (
      lowered.startsWith(root) &&
      (lowered.length === root.length || /[\s/—\-(,]/.test(lowered[root.length] ?? ""))
    ) {
      score = 5000 + root.length;
    } else if (lowered.includes(root) && root.length >= 5) {
      score = root.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = r;
    }
  }
  if (!best || bestScore <= 0) return null;
  return best;
}

export function getLinkMetaForName(name: string): LinkMeta | null {
  const flag = getProtectFlagForBillName(name);
  if (!flag) return null;
  return {
    linkId: flag.linkId,
    dayIndex: flag.dayIndex,
    severity: flag.severity,
  };
}
