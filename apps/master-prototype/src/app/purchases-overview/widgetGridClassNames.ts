import type { BankBalanceWidgetColumnSpan } from "@/app/contexts/PurchasesPrototypeScenarioContext";

/** Outer row: Create + Protect (left) beside bank + secondary widgets (right). */
export const PURCHASES_OVERVIEW_WIDGETS_ROW =
  "flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-5";

/**
 * Left rail — not part of the bank grid. Create new on top, Protect stacked directly under.
 */
export const PURCHASES_OVERVIEW_LEFT_COLUMN =
  "flex w-full flex-col gap-5 lg:w-[440px] lg:max-w-[440px] lg:shrink-0";

/**
 * Right column: projected bank balance on top, then Money going out + Customers in a sub-grid.
 */
export const PURCHASES_OVERVIEW_RIGHT_COLUMN =
  "flex min-w-0 flex-1 flex-col gap-5";

/**
 * Bank tile width matches prototype setting (2 columns = full width of right column).
 */
export function getPurchasesOverviewBankShellClassName(
  bankBalanceWidgetColumnSpan: BankBalanceWidgetColumnSpan
): string {
  return bankBalanceWidgetColumnSpan === 2
    ? "relative w-full min-w-0"
    : "relative w-full min-w-0 max-w-[440px]";
}

/**
 * Grid for Money going out + Customers only, directly under the bank widget.
 */
export function getPurchasesOverviewSecondaryWidgetsGridClassName(): string {
  return "grid grid-cols-1 items-start gap-5 lg:grid-cols-2";
}
