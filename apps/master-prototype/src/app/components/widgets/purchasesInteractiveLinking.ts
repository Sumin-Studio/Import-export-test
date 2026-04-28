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

export function getLinkMetaForName(name: string): LinkMeta | null {
  const lowered = name.toLowerCase();
  const item = PROTECT_FLAGS.find((r) => {
    const rootName = r.billName.split(" — ")[0]?.toLowerCase() ?? "";
    return lowered.includes(rootName) || rootName.includes(lowered);
  });
  if (!item) return null;
  return {
    linkId: item.linkId,
    dayIndex: item.dayIndex,
    severity: item.severity,
  };
}
