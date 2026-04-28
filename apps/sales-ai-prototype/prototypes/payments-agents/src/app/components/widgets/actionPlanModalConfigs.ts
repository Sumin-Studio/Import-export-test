"use client";

export type StrategicLens = "standard" | "conservative";

export const DATE_LABELS = [
  "Mar 8",
  "Mar 9",
  "Mar 10",
  "Mar 11",
  "Mar 12",
  "Mar 13",
  "Mar 14",
  "Mar 15",
];

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
}

export interface BillsTableConfig {
  bills: BillRow[];
  baseCash: number[];
}

export type ActionPlanChartKey = "CashflowPlanChart" | "CashflowShortfallChart";

export type ActionPlanVariant = "strategic" | "emergency";

export interface ActionPlanModalConfig {
  title: string;
  subtitle: string;
  chartKey: ActionPlanChartKey;
  variant?: ActionPlanVariant;
  emergencyActions?: RecommendedAction[];
  billsTable?: BillsTableConfig;
}

const CATEGORIES_LEN = 8;

export function dateIndexFromLabel(label: string): number {
  const idx = DATE_LABELS.indexOf(label.trim());
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
  const result = [...baseCash];
  for (const b of bills) {
    if (b.plannedDayIndex >= 0 && b.plannedDayIndex < CATEGORIES_LEN) {
      for (let day = b.plannedDayIndex; day < CATEGORIES_LEN; day++) {
        result[day] -= b.amountNumeric;
      }
    }
  }
  return result;
}

export const ACTION_PLAN_CONFIGS: Record<string, ActionPlanModalConfig> = {
  "cashflow-low": {
    title: "Cashflow action plan",
    subtitle: "Review and adjust planned payment dates to manage your upcoming cashflow.",
    chartKey: "CashflowPlanChart",
    billsTable: {
      // Projected daily balance BEFORE these specific bills are paid
      baseCash: [5200, 5100, 5000, 4800, 4600, 4400, 5000, 5200],
      bills: [
        {
          id: "acme-due",
          billName: "Acme Supplies",
          amount: "$800",
          amountNumeric: 800,
          originalPayDate: "Mar 11",
          originalDayIndex: 3,
          plannedPayDate: "Mar 14",
          plannedDayIndex: 6,
          action: "Defer payment to after expected deposit on Mar 13.",
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
    title: "Cashflow shortfall action plan",
    subtitle: "Review and adjust planned payment dates to avoid an overdraft.",
    chartKey: "CashflowShortfallChart",
    billsTable: {
      // Projected daily balance BEFORE these specific bills are paid
      baseCash: [3200, 3000, 2600, 2200, 1800, 1200, 2000, 2400],
      bills: [
        {
          id: "acme-thu",
          billName: "Acme Supplies",
          amount: "$1,000",
          amountNumeric: 1000,
          originalPayDate: "Mar 10",
          originalDayIndex: 2,
          plannedPayDate: "Mar 14",
          plannedDayIndex: 6,
          action: "Defer until after expected deposit to avoid going below $0.",
        },
        {
          id: "beta-receivable",
          billName: "Beta Co",
          amount: "$800",
          amountNumeric: 800,
          originalPayDate: "Mar 11",
          originalDayIndex: 3,
          plannedPayDate: "Mar 11",
          plannedDayIndex: 3,
          action: "Pay on due date to maintain supplier relationship.",
        },
      ],
    },
  },
  "cashflow-critical": {
    title: "Critical cashflow action plan",
    subtitle: "You have a mandatory tax payment due next week but insufficient funds. Act now to avoid immediate penalties.",
    chartKey: "CashflowShortfallChart",
    variant: "emergency",
    emergencyActions: [
      {
        billName: "Xero Capital (line of credit)",
        amount: "$5,000",
        payDate: "As needed",
        action: "Draw a line of credit of $5,000 to cover going below $0 in cashflow by $4,000 and avoid penalties.",
      },
    ],
  },
};
