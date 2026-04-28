"use client";

import type { SortKey } from "@/lib/data-store";
import type { DashboardMode } from "@/lib/dashboard-modes";
import type { ReadinessScope } from "@/lib/custom-views";

export type ColumnId =
  | "client_name"
  | "close_risk"
  | "main_signal"
  | "collection_status"
  | "lock_status"
  | "tax_return_status"
  | "management_report"
  | "internal_due_date"
  | "sales_tax_due_date"
  | "staff"
  | "filing_deadline"
  | "last_contact"
  | "recon_status"
  | "last_sync"
  | "extension_filed"
  | "organizer_received"
  | "filing_frequency"
  | "next_review"
  | "w9_status"
  | "payroll_frequency"
  | "next_payroll_run"
  | "last_payroll_run"
  | "payroll_tax_due"
  | "last_review"
  | "engagement_type"
  | "key_metrics_due";

export interface ColumnConfig {
  id: ColumnId;
  label?: string;
  sortKey?: SortKey;
  helpTooltip?: string;
}

/**
 * Client column must stay the first data column (after the row checkbox) so `<colgroup>` widths line up
 * and the client column does not shift when switching tabs, modes, or column visibility.
 */
export function pinClientNameFirst(columns: ColumnConfig[]): ColumnConfig[] {
  const client = columns.find((c) => c.id === "client_name");
  const rest = columns.filter((c) => c.id !== "client_name");
  return client != null ? [client, ...rest] : rest;
}

export function pinClientNameFirstIds(order: ColumnId[]): ColumnId[] {
  if (!order.includes("client_name")) return [...order];
  return ["client_name", ...order.filter((id) => id !== "client_name")];
}

/** Default column labels; Books Incomplete uses Figma "Columns - Incomplete", Ready uses "Columns - Ready". */
const COLUMN_LABELS: Record<ColumnId, string> = {
  client_name: "Client",
  close_risk: "Risk",
  main_signal: "Main signal",
  collection_status: "Collection",
  lock_status: "Lock",
  tax_return_status: "Return status",
  management_report: "Mgmt report",
  internal_due_date: "Start date",
  sales_tax_due_date: "Sales tax due",
  staff: "Staff",
  filing_deadline: "Filing due",
  last_contact: "Last contact",
  recon_status: "Recon",
  last_sync: "Last sync",
  extension_filed: "Extension",
  organizer_received: "Organizer",
  filing_frequency: "Filing freq.",
  next_review: "Next review",
  w9_status: "W-9",
  payroll_frequency: "Pay frequency",
  next_payroll_run: "Next payroll",
  last_payroll_run: "Last payroll",
  payroll_tax_due: "941 / tax",
  last_review: "Last review",
  engagement_type: "Engagement",
  key_metrics_due: "KPI due",
};

const CLOSE_RISK_TOOLTIP =
  "Close risk (completion risk) for this client: High (blocked), Medium (action required), or Low (ready).";

/**
 * Checkbox column — `pl-8` + input + `pr-4` (XDL dense rhythm next to client column).
 */
export const CHECKBOX_COLUMN_PX = 40;

/**
 * Client column width — single baseline for every mode (Advisory / Books / CRM / …).
 * Business avatar + XDL spacing + label + row actions. Keep Tailwind class below in sync.
 */
export const CLIENT_NAME_COLUMN_PX = 300;

/** XDL padding inside checkbox cells (`--size-spacing-8` inset from card, `--size-spacing-4` before client). */
export const CHECKBOX_CELL_PAD = "pl-[var(--size-spacing-8)] pr-[var(--size-spacing-4)]";

/**
 * Client column horizontal padding: tight `--size-spacing-4` after checkbox column, `--size-spacing-12` before Risk.
 */
export const CLIENT_NAME_CELL_PAD_X =
  "pl-[var(--size-spacing-4)] pr-[var(--size-spacing-12)]";

/** XDL `--size-spacing-8` gap between avatar and entity name. */
export const CLIENT_NAME_CELL_GAP = "gap-[var(--size-spacing-8)]";

/** Pixel widths for `<colgroup>`; must match COLUMN_WIDTH_CLASSES. Last data column stays `auto` in the table. */
export const COLUMN_WIDTH_PX: Record<ColumnId, number> = {
  client_name: CLIENT_NAME_COLUMN_PX,
  close_risk: 140,
  main_signal: 240,
  staff: 140,
  last_contact: 120,
  next_review: 120,
  collection_status: 110,
  internal_due_date: 130,
  sales_tax_due_date: 130,
  filing_deadline: 120,
  filing_frequency: 110,
  payroll_frequency: 110,
  next_payroll_run: 120,
  last_payroll_run: 120,
  payroll_tax_due: 100,
  recon_status: 120,
  last_sync: 100,
  extension_filed: 120,
  organizer_received: 110,
  engagement_type: 130,
  last_review: 120,
  key_metrics_due: 120,
  lock_status: 100,
  tax_return_status: 120,
  management_report: 140,
  w9_status: 100,
};

/** Strict fixed widths per column so table and client column stay consistent across modes. */
export const COLUMN_WIDTH_CLASSES: Partial<Record<ColumnId, string>> = {
  /* Keep 300 in sync with CLIENT_NAME_COLUMN_PX (Tailwind needs a static class string). */
  client_name: "w-[300px] min-w-[300px] max-w-[300px]",
  close_risk: "w-[140px] min-w-[140px] max-w-[140px]",
  main_signal: "w-[240px] min-w-[240px] max-w-[240px]",
  staff: "w-[140px] min-w-[140px] max-w-[140px]",
  last_contact: "w-[120px] min-w-[120px] max-w-[120px]",
  next_review: "w-[120px] min-w-[120px] max-w-[120px]",
  collection_status: "w-[110px] min-w-[110px] max-w-[110px]",
  internal_due_date: "w-[130px] min-w-[130px] max-w-[130px]",
  sales_tax_due_date: "w-[130px] min-w-[130px] max-w-[130px]",
  filing_deadline: "w-[120px] min-w-[120px] max-w-[120px]",
  filing_frequency: "w-[110px] min-w-[110px] max-w-[110px]",
  payroll_frequency: "w-[110px] min-w-[110px] max-w-[110px]",
  next_payroll_run: "w-[120px] min-w-[120px] max-w-[120px]",
  last_payroll_run: "w-[120px] min-w-[120px] max-w-[120px]",
  payroll_tax_due: "w-[100px] min-w-[100px] max-w-[100px]",
  recon_status: "w-[120px] min-w-[120px] max-w-[120px]",
  last_sync: "w-[100px] min-w-[100px] max-w-[100px]",
  extension_filed: "w-[120px] min-w-[120px] max-w-[120px]",
  organizer_received: "w-[110px] min-w-[110px] max-w-[110px]",
  engagement_type: "w-[130px] min-w-[130px] max-w-[130px]",
  last_review: "w-[120px] min-w-[120px] max-w-[120px]",
  key_metrics_due: "w-[120px] min-w-[120px] max-w-[120px]",
  lock_status: "w-[100px] min-w-[100px] max-w-[100px]",
  tax_return_status: "w-[120px] min-w-[120px] max-w-[120px]",
  management_report: "w-[140px] min-w-[140px] max-w-[140px]",
  w9_status: "w-[100px] min-w-[100px] max-w-[100px]",
};

const MODE_COLUMNS: Record<DashboardMode, ColumnConfig[]> = {
  crm: [
    { id: "client_name" },
    { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
    { id: "main_signal" },
    { id: "last_contact", sortKey: "lastActivity" },
    { id: "next_review", sortKey: "nextReview" },
    { id: "staff" },
  ],
  bookkeeping: [
    { id: "client_name" },
    { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
    { id: "main_signal" },
    { id: "collection_status" },
    { id: "internal_due_date", sortKey: "deadline" },
    { id: "sales_tax_due_date", sortKey: "salesTaxDueDate" },
    { id: "staff" },
  ],
  /** 1099 mode – columns relevant for CPA / 1099 filing workflow */
  tax: [
    { id: "client_name" },
    { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
    { id: "main_signal" },
    { id: "w9_status" },
    { id: "filing_deadline", label: "1099 due", sortKey: "deadline" },
    { id: "extension_filed", label: "Extension" },
    { id: "staff" },
  ],
  sales_tax: [
    { id: "client_name" },
    { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
    { id: "main_signal" },
    { id: "filing_frequency" },
    { id: "sales_tax_due_date", sortKey: "salesTaxDueDate" },
    { id: "staff" },
  ],
  payroll: [
    { id: "client_name" },
    { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
    { id: "main_signal" },
    { id: "payroll_frequency" },
    { id: "next_payroll_run", sortKey: "nextPayrollRun" },
    { id: "last_payroll_run" },
    { id: "payroll_tax_due" },
    { id: "staff" },
  ],
  /** Advisory / Financial health – columns for CPA advisory workflow (reviews, KPIs, board packs). */
  advisory: [
    { id: "client_name" },
    { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
    { id: "main_signal" },
    { id: "engagement_type" },
    { id: "key_metrics_due", label: "KPI due", sortKey: "keyMetricsDue" },
    { id: "last_review", sortKey: "lastReview" },
    { id: "next_review", sortKey: "nextReview" },
    { id: "last_contact", sortKey: "lastActivity" },
    { id: "management_report" },
    { id: "staff" },
  ],
};

/** Books tab "Ready" view – Figma "Columns - Ready" (node 65-1213136). */
const BOOKKEEPING_READY_COLUMNS: ColumnConfig[] = [
  { id: "client_name" },
  { id: "close_risk", helpTooltip: CLOSE_RISK_TOOLTIP },
  { id: "lock_status" },
  { id: "tax_return_status" },
  { id: "management_report" },
  { id: "internal_due_date", sortKey: "deadline" },
  { id: "sales_tax_due_date", sortKey: "salesTaxDueDate" },
  { id: "staff" },
];

function withLabels(cols: ColumnConfig[]): ColumnConfig[] {
  return cols.map((col) => ({
    ...col,
    label: col.label ?? COLUMN_LABELS[col.id],
  }));
}

export function getColumnsForMode(mode: DashboardMode, viewTab?: ReadinessScope): ColumnConfig[] {
  if (mode === "bookkeeping" && viewTab === "ready") {
    return withLabels(BOOKKEEPING_READY_COLUMNS);
  }
  return withLabels(MODE_COLUMNS[mode]);
}
