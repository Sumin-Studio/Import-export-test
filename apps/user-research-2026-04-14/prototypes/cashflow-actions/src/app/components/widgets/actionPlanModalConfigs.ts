"use client";

export type StrategicLens = "standard" | "conservative";

/** 30-day window starting Mar 8 (aligned with projected bank balance chart). */
export const DATE_LABELS = [
  "Mar 8",
  "Mar 9",
  "Mar 10",
  "Mar 11",
  "Mar 12",
  "Mar 13",
  "Mar 14",
  "Mar 15",
  "Mar 16",
  "Mar 17",
  "Mar 18",
  "Mar 19",
  "Mar 20",
  "Mar 21",
  "Mar 22",
  "Mar 23",
  "Mar 24",
  "Mar 25",
  "Mar 26",
  "Mar 27",
  "Mar 28",
  "Mar 29",
  "Mar 30",
  "Mar 31",
  "Apr 1",
  "Apr 2",
  "Apr 3",
  "Apr 4",
  "Apr 5",
  "Apr 6",
] as const;

export interface RecommendedAction {
  billName: string;
  amount: string;
  payDate: string;
  action: string;
}

export interface BillRow {
  id: string;
  billName: string;
  amount: string;
  amountNumeric: number;
  originalPayDate: string;
  originalDayIndex: number;
  plannedPayDate: string;
  plannedDayIndex: number;
  action: string;
  /** Excluded from the bills table; still drives current vs proposed chart math (e.g. critical “after plan” lift). */
  chartOnly?: boolean;
}

export interface BillsTableConfig {
  bills: BillRow[];
  baseCash: number[];
  /**
   * Rows for the bank widget “Bills awaiting payment” accordion when `bills` has no displayable
   * rows (e.g. chart-only). Omitted from {@link computeProjectedCash} — not in `bills`.
   */
  awaitingPaymentDisplayRows?: BillRow[];
}

export type ActionPlanChartKey = "CashflowPlanChart" | "CashflowShortfallChart";

export type ActionPlanVariant = "strategic" | "emergency";

export interface LineOfCreditPlanCta {
  title: string;
  description: string;
  /** Defaults to “Apply now”. */
  applyLabel?: string;
  /** When omitted, the control is a non-navigating prototype button. */
  applyHref?: string;
}

export interface ActionPlanModalConfig {
  title: string;
  subtitle: string;
  chartKey: ActionPlanChartKey;
  variant?: ActionPlanVariant;
  emergencyActions?: RecommendedAction[];
  /** Critical shortage: show this instead of bill rows + emergency action cards after “Make a plan”. */
  lineOfCreditPlanCta?: LineOfCreditPlanCta;
  billsTable?: BillsTableConfig;
}

export function dateIndexFromLabel(label: string): number {
  const idx = (DATE_LABELS as readonly string[]).indexOf(label.trim());
  return idx >= 0 ? idx : -1;
}

/**
 * Cumulative projection: paying a bill on day X reduces the closing balance
 * for day X and every subsequent day.
 */
export function computeProjectedCash(
  baseCash: number[],
  bills: { plannedDayIndex: number; amountNumeric: number }[]
): number[] {
  const len = baseCash.length;
  const result = [...baseCash];
  for (const b of bills) {
    if (b.plannedDayIndex >= 0 && b.plannedDayIndex < len) {
      for (let day = b.plannedDayIndex; day < len; day++) {
        result[day] -= b.amountNumeric;
      }
    }
  }
  return result;
}

/** Illustrative upcoming bills for chart-only (not applied to projection math). */
const CHART_ONLY_AWAITING_PAYMENT_ROWS: BillRow[] = [
  {
    id: "aw-co-1",
    billName: "Harbour Power Ltd",
    amount: "$312",
    amountNumeric: 312,
    originalPayDate: "Mar 11",
    originalDayIndex: 3,
    plannedPayDate: "Mar 11",
    plannedDayIndex: 3,
    action: "",
  },
  {
    id: "aw-co-2",
    billName: "Metro Couriers",
    amount: "$189",
    amountNumeric: 189,
    originalPayDate: "Mar 14",
    originalDayIndex: 6,
    plannedPayDate: "Mar 14",
    plannedDayIndex: 6,
    action: "",
  },
  {
    id: "aw-co-3",
    billName: "Office Warehouse",
    amount: "$640",
    amountNumeric: 640,
    originalPayDate: "Mar 18",
    originalDayIndex: 10,
    plannedPayDate: "Mar 18",
    plannedDayIndex: 10,
    action: "",
  },
  {
    id: "aw-co-4",
    billName: "Spark Business",
    amount: "$425",
    amountNumeric: 425,
    originalPayDate: "Mar 22",
    originalDayIndex: 14,
    plannedPayDate: "Mar 22",
    plannedDayIndex: 14,
    action: "",
  },
  {
    id: "aw-co-5",
    billName: "CleanRight Services",
    amount: "$780",
    amountNumeric: 780,
    originalPayDate: "Mar 25",
    originalDayIndex: 17,
    plannedPayDate: "Mar 25",
    plannedDayIndex: 17,
    action: "",
  },
  {
    id: "aw-co-6",
    billName: "Pacific Insurance",
    amount: "$2,100",
    amountNumeric: 2100,
    originalPayDate: "Mar 29",
    originalDayIndex: 21,
    plannedPayDate: "Mar 29",
    plannedDayIndex: 21,
    action: "",
  },
];

/** Critical scenario: obligations behind the shortage (display only; not in `bills`). */
const CRITICAL_AWAITING_PAYMENT_ROWS: BillRow[] = [
  {
    id: "aw-cr-1",
    billName: "Inland Revenue — GST",
    amount: "$18,400",
    amountNumeric: 18400,
    originalPayDate: "Mar 15",
    originalDayIndex: 7,
    plannedPayDate: "Mar 15",
    plannedDayIndex: 7,
    action: "",
  },
  {
    id: "aw-cr-2",
    billName: "Inland Revenue — PAYE",
    amount: "$6,200",
    amountNumeric: 6200,
    originalPayDate: "Mar 18",
    originalDayIndex: 10,
    plannedPayDate: "Mar 18",
    plannedDayIndex: 10,
    action: "",
  },
  {
    id: "aw-cr-3",
    billName: "Office Rent",
    amount: "$3,200",
    amountNumeric: 3200,
    originalPayDate: "Mar 20",
    originalDayIndex: 12,
    plannedPayDate: "Mar 20",
    plannedDayIndex: 12,
    action: "",
  },
  {
    id: "aw-cr-4",
    billName: "BizTech Consulting",
    amount: "$3,500",
    amountNumeric: 3500,
    originalPayDate: "Mar 22",
    originalDayIndex: 14,
    plannedPayDate: "Mar 22",
    plannedDayIndex: 14,
    action: "",
  },
];

export const ACTION_PLAN_CONFIGS: Record<string, ActionPlanModalConfig> = {
  "cashflow-chart-only": {
    title: "Bank balance",
    subtitle: "No proposed payment changes in this view.",
    chartKey: "CashflowShortfallChart",
    billsTable: {
      /** Actuals stay above $10k; dashed projection rises through the window (no bills applied). */
      baseCash: [
        10400, 10550, 10700, 10850, 11000, 11150,
        11350, 11600, 11850, 12100, 12350, 12600, 12850, 13100, 13350, 13600, 13850, 14100,
        14350, 14600, 14850, 15100, 15350, 15600, 15850, 16100, 16350, 16600, 16850, 17100,
      ],
      bills: [],
      awaitingPaymentDisplayRows: CHART_ONLY_AWAITING_PAYMENT_ROWS,
    },
  },
  "cashflow-low": {
    title: "Cash flow action plan",
    subtitle: "Review and adjust planned payment dates to manage your upcoming cash flow.",
    chartKey: "CashflowPlanChart",
    billsTable: {
      /**
       * Pre–bill balances. After {@link computeProjectedCash}, net cash stays **≥ $0** for both
       * Current and Proposed; **Current** dips **below the $2k chart threshold** around **Mar 16**;
       * **Proposed** deferrals keep the line **≥ $2k** through the window.
       */
      baseCash: [
        6200, 6150, 6100, 4500, 5900, 5800, 5850, 5850, 5500, 5300, 5200, 5300, 5450, 6000,
        6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450, 6500, 6550, 6600, 6650, 6700, 6750,
        6800,
      ],
      bills: [
        {
          id: "city-power",
          billName: "City Power Co",
          amount: "$95",
          amountNumeric: 95,
          originalPayDate: "Mar 8",
          originalDayIndex: 0,
          plannedPayDate: "Mar 8",
          plannedDayIndex: 0,
          action: "Pay on due date.",
        },
        {
          id: "metro-util",
          billName: "Metro Utilities",
          amount: "$425",
          amountNumeric: 425,
          originalPayDate: "Mar 10",
          originalDayIndex: 2,
          plannedPayDate: "Mar 13",
          plannedDayIndex: 5,
          action: "Defer until after payroll deposit on Mar 12.",
        },
        {
          id: "acme-due",
          billName: "Acme Supplies",
          amount: "$800",
          amountNumeric: 800,
          originalPayDate: "Mar 11",
          originalDayIndex: 3,
          plannedPayDate: "Mar 19",
          plannedDayIndex: 11,
          action: "Defer payment until after the Mar 16 dip so the balance stays above the $2k threshold.",
        },
        {
          id: "tech-partners",
          billName: "Tech Partners Ltd",
          amount: "$650",
          amountNumeric: 650,
          originalPayDate: "Mar 11",
          originalDayIndex: 3,
          plannedPayDate: "Mar 23",
          plannedDayIndex: 15,
          action: "Move past the low point so projected cash stays above the $2k threshold.",
        },
        {
          id: "rent-due",
          billName: "Office Rent",
          amount: "$1,800",
          amountNumeric: 1800,
          originalPayDate: "Mar 12",
          originalDayIndex: 4,
          plannedPayDate: "Mar 12",
          plannedDayIndex: 4,
          action: "Pay on due date. Confirm deposit aligns with outflow.",
        },
      ],
    },
  },
  "cashflow-shortfall": {
    title: "Cash flow shortfall action plan",
    subtitle: "Review and adjust planned payment dates to avoid an overdraft.",
    chartKey: "CashflowShortfallChart",
    billsTable: {
      /**
       * Pre–bill-pay balances. **Current** (original due dates) crosses below $0 around Mar 16–17.
       * **Proposed** deferrals keep net cash **≥ $0** for the full window.
       */
      baseCash: [
        35000, 34500, 33800, 32800, 31800, 36500,
        36000, 35500, 32500, 31800, 32100, 32700,
        32980, 34200, 34800, 35200, 35500, 35800,
        36000, 36200, 36400, 36600, 36800, 37000,
        37200, 37400, 37500, 37600, 37700, 37800,
      ],
      bills: [
        // ── Mar 9 (idx 1) ──
        { id: "sf-1", billName: "City Power Co", amount: "$890", amountNumeric: 890, originalPayDate: "Mar 9", originalDayIndex: 1, plannedPayDate: "Mar 9", plannedDayIndex: 1, action: "Pay on schedule — essential service." },
        { id: "sf-2", billName: "WebHost Pro", amount: "$199", amountNumeric: 199, originalPayDate: "Mar 9", originalDayIndex: 1, plannedPayDate: "Mar 9", plannedDayIndex: 1, action: "Pay on due date." },
        { id: "sf-3", billName: "Kiwi IT Support", amount: "$450", amountNumeric: 450, originalPayDate: "Mar 9", originalDayIndex: 1, plannedPayDate: "Mar 9", plannedDayIndex: 1, action: "Pay on due date." },
        // ── Mar 10 (idx 2) ──
        { id: "sf-4", billName: "Office Rent", amount: "$3,200", amountNumeric: 3200, originalPayDate: "Mar 10", originalDayIndex: 2, plannedPayDate: "Mar 10", plannedDayIndex: 2, action: "Pay on due date — lease obligation." },
        {
          id: "sf-5",
          billName: "Acme Supplies",
          amount: "$1,450",
          amountNumeric: 1450,
          originalPayDate: "Mar 10",
          originalDayIndex: 2,
          plannedPayDate: "Mar 14",
          plannedDayIndex: 6,
          action: "Defer past expected deposit on Mar 13.",
        },
        { id: "sf-6", billName: "CleanRight Services", amount: "$650", amountNumeric: 650, originalPayDate: "Mar 10", originalDayIndex: 2, plannedPayDate: "Mar 10", plannedDayIndex: 2, action: "Pay on due date." },
        {
          id: "sf-7",
          billName: "Paper Plus Ltd",
          amount: "$946",
          amountNumeric: 946,
          originalPayDate: "Mar 10",
          originalDayIndex: 2,
          plannedPayDate: "Mar 10",
          plannedDayIndex: 2,
          action: "Confirm unusual amount against PO before paying.",
        },
        { id: "sf-8", billName: "GreenLeaf Plants", amount: "$340", amountNumeric: 340, originalPayDate: "Mar 10", originalDayIndex: 2, plannedPayDate: "Mar 10", plannedDayIndex: 2, action: "Pay on due date." },
        { id: "sf-9", billName: "NZ Post", amount: "$185", amountNumeric: 185, originalPayDate: "Mar 10", originalDayIndex: 2, plannedPayDate: "Mar 10", plannedDayIndex: 2, action: "Pay on due date." },
        { id: "sf-10", billName: "TradeMe Advertising", amount: "$550", amountNumeric: 550, originalPayDate: "Mar 10", originalDayIndex: 2, plannedPayDate: "Mar 14", plannedDayIndex: 6, action: "Defer to reduce stack on Mar 10–11." },
        // ── Mar 11 (idx 3) ──
        { id: "sf-11", billName: "Fresh Foods NZ", amount: "$1,120", amountNumeric: 1120, originalPayDate: "Mar 11", originalDayIndex: 3, plannedPayDate: "Mar 11", plannedDayIndex: 3, action: "Pay on due date — perishable supplier." },
        { id: "sf-12", billName: "Metro Couriers", amount: "$385", amountNumeric: 385, originalPayDate: "Mar 11", originalDayIndex: 3, plannedPayDate: "Mar 14", plannedDayIndex: 6, action: "Defer to smooth outflow across the week." },
        { id: "sf-13", billName: "TechSupply Direct", amount: "$2,450", amountNumeric: 2450, originalPayDate: "Mar 11", originalDayIndex: 3, plannedPayDate: "Mar 22", plannedDayIndex: 14, action: "Defer past the tight week so projected cash stays above $0." },
        { id: "sf-14", billName: "DataStream Analytics", amount: "$1,850", amountNumeric: 1850, originalPayDate: "Mar 11", originalDayIndex: 3, plannedPayDate: "Mar 14", plannedDayIndex: 6, action: "Reschedule to align with incoming receivable." },
        { id: "sf-15", billName: "Spark Business", amount: "$425", amountNumeric: 425, originalPayDate: "Mar 11", originalDayIndex: 3, plannedPayDate: "Mar 11", plannedDayIndex: 3, action: "Pay on schedule — telecommunications." },
        { id: "sf-16", billName: "AccountRight Pro", amount: "$149", amountNumeric: 149, originalPayDate: "Mar 11", originalDayIndex: 3, plannedPayDate: "Mar 11", plannedDayIndex: 3, action: "Pay on due date." },
        // ── Mar 12 (idx 4) ──
        { id: "sf-17", billName: "Apex Security", amount: "$1,200", amountNumeric: 1200, originalPayDate: "Mar 12", originalDayIndex: 4, plannedPayDate: "Mar 12", plannedDayIndex: 4, action: "Pay on due date." },
        {
          id: "sf-18",
          billName: "SecurePay Solutions",
          amount: "$780",
          amountNumeric: 780,
          originalPayDate: "Mar 12",
          originalDayIndex: 4,
          plannedPayDate: "Mar 12",
          plannedDayIndex: 4,
          action: "Pay on due date.",
        },
        {
          id: "sf-19",
          billName: "Pacific Insurance",
          amount: "$2,100",
          amountNumeric: 2100,
          originalPayDate: "Mar 12",
          originalDayIndex: 4,
          plannedPayDate: "Mar 12",
          plannedDayIndex: 4,
          action: "Pay on due date — insurance premium.",
        },
        { id: "sf-20", billName: "BizTech Consulting", amount: "$3,500", amountNumeric: 3500, originalPayDate: "Mar 12", originalDayIndex: 4, plannedPayDate: "Mar 22", plannedDayIndex: 14, action: "Defer past the tight week so projected cash stays above $0." },
        { id: "sf-21", billName: "AirNZ Corporate", amount: "$1,240", amountNumeric: 1240, originalPayDate: "Mar 12", originalDayIndex: 4, plannedPayDate: "Mar 22", plannedDayIndex: 14, action: "Reschedule — non-urgent travel expense; pay after liquidity recovers." },
        // ── Mar 13 (idx 5) ──
        { id: "sf-22", billName: "Wellington Water", amount: "$320", amountNumeric: 320, originalPayDate: "Mar 13", originalDayIndex: 5, plannedPayDate: "Mar 13", plannedDayIndex: 5, action: "Pay on schedule — utility." },
        { id: "sf-23", billName: "Office Warehouse", amount: "$890", amountNumeric: 890, originalPayDate: "Mar 13", originalDayIndex: 5, plannedPayDate: "Mar 13", plannedDayIndex: 5, action: "Pay on due date." },
        { id: "sf-24", billName: "Xero Payroll Run", amount: "$8,200", amountNumeric: 8200, originalPayDate: "Mar 13", originalDayIndex: 5, plannedPayDate: "Mar 13", plannedDayIndex: 5, action: "Pay on schedule — payroll obligation." },
        // ── Mar 14 (idx 6) ──
        { id: "sf-25", billName: "Waste Management NZ", amount: "$280", amountNumeric: 280, originalPayDate: "Mar 14", originalDayIndex: 6, plannedPayDate: "Mar 14", plannedDayIndex: 6, action: "Pay on due date." },
      ],
    },
  },
  "cashflow-critical": {
    title: "Critical cash flow action plan",
    subtitle: "You have a mandatory tax payment due next week but insufficient funds. Act now to avoid immediate penalties.",
    chartKey: "CashflowShortfallChart",
    variant: "emergency",
    lineOfCreditPlanCta: {
      title: "Xero line of credit",
      description:
        "Apply for a Xero line of credit to bridge this shortage and avoid penalties while you get cash flow back on track.",
      applyLabel: "Apply now",
    },
  },
};

/**
 * 30 daily balances (aligned with {@link DATE_LABELS}): actuals stay above $2k, then the
 * projection falls through zero and stays negative — critical scenario (no bill adjustments).
 */
const CRITICAL_SCENARIO_BASE_CASH: number[] = [
  3600, 3400, 3150, 2850, 2550, 2250,
  2100, 1200, 200, -200, -450, -620, -720, -780,
  ...Array.from({ length: 16 }, (_, i) => -820 - 35 * (i + 1)),
];

ACTION_PLAN_CONFIGS["cashflow-critical"] = {
  ...ACTION_PLAN_CONFIGS["cashflow-critical"],
  billsTable: {
    baseCash: CRITICAL_SCENARIO_BASE_CASH,
    awaitingPaymentDisplayRows: CRITICAL_AWAITING_PAYMENT_ROWS,
    bills: [
      /**
       * Negative `amountNumeric` adds cash in {@link computeProjectedCash}. `originalDayIndex` is
       * out of range so **Current** is unchanged; **Proposed** lifts the line above $0 after “Make a plan”.
       */
      {
        id: "_proposed-plan-balance-lift",
        billName: "",
        amount: "",
        amountNumeric: -2600,
        originalPayDate: "",
        originalDayIndex: 999,
        plannedPayDate: "Mar 8",
        plannedDayIndex: 0,
        action: "",
        chartOnly: true,
      },
    ],
  },
};
