"use client";

import type { GoalValue, PeriodValue, SortKey } from "@/lib/data-store";
import {
  getThisMonthPeriod,
  getThisQuarterPeriod,
  getThisYearPeriod,
} from "@/lib/data-store";

export type DashboardMode = "crm" | "bookkeeping" | "tax" | "sales_tax" | "payroll" | "advisory";

/** Modes in display order; CRM first as default */
export const DASHBOARD_MODES: DashboardMode[] = ["crm", "bookkeeping", "tax", "sales_tax", "payroll", "advisory"];

export const DASHBOARD_MODE_LABELS: Record<DashboardMode, string> = {
  crm: "CRM",
  bookkeeping: "Books",
  tax: "1099",
  sales_tax: "Sales tax",
  payroll: "Payroll",
  advisory: "Advisory",
};

export function defaultGoal(mode: DashboardMode): GoalValue {
  switch (mode) {
    case "crm":
      return null;
    case "bookkeeping":
      return "Month-end";
    case "tax":
      return "Year-end";
    case "sales_tax":
      return "Month-end";
    case "payroll":
      return "Month-end";
    case "advisory":
      return null;
    default:
      return null;
  }
}

export function defaultPeriod(mode: DashboardMode): PeriodValue | null {
  switch (mode) {
    case "crm":
      return null;
    case "bookkeeping":
      return getThisMonthPeriod();
    case "tax":
      return getThisYearPeriod();
    case "sales_tax":
      return getThisQuarterPeriod();
    case "payroll":
      return getThisMonthPeriod();
    case "advisory":
      return null;
    default:
      return null;
  }
}

export function defaultSortKey(mode: DashboardMode): SortKey {
  switch (mode) {
    case "crm":
      return "lastActivity";
    case "sales_tax":
      return "salesTaxDueDate";
    case "payroll":
      return "nextPayrollRun";
    case "advisory":
      return "lastReview";
    case "bookkeeping":
    case "tax":
    default:
      return "deadline";
  }
}
