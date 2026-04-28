import type { BillStatus } from "@/data/safety-shield";
import { getSafetyShieldBillsByStatus, safetyShieldBills } from "@/data/safety-shield";

/** Bills list / chrome tab — synced via `?tab=` on prototype 8 bills routes. */
export type BillsListTabValue = BillStatus | "all" | "repeating";

export const BILLS_LIST_TABS: Array<{ value: BillsListTabValue; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "awaiting_approval", label: "Awaiting approval" },
  { value: "awaiting_payment", label: "Awaiting payment" },
  { value: "paid", label: "Paid" },
  { value: "repeating", label: "Repeating" },
];

const VALID_TAB = new Set<string>(BILLS_LIST_TABS.map((t) => t.value));

export function parseBillsListTab(raw: string | null | undefined): BillsListTabValue {
  if (raw && VALID_TAB.has(raw)) return raw as BillsListTabValue;
  return "all";
}

export function billsTabCount(value: BillsListTabValue): number {
  if (value === "all") return safetyShieldBills.length;
  if (value === "repeating") return 0;
  return getSafetyShieldBillsByStatus(value).length;
}

/** Query string for opening quick view from the list (preserves tab for CTA rules on detail). */
export function billQuickViewQuery(tab: BillsListTabValue): string {
  const p = new URLSearchParams();
  p.set("fromTab", tab);
  return p.toString();
}

/** Query string for full-page bill view from the list. */
export function billFullViewQuery(tab: BillsListTabValue): string {
  const p = new URLSearchParams();
  p.set("view", "full");
  p.set("fromTab", tab);
  return p.toString();
}
