"use client";

import { usePurchasesPrototypeScenario } from "@/app/contexts/PurchasesPrototypeScenarioContext";
import {
  PURCHASES_OVERVIEW_LEFT_COLUMN,
  PURCHASES_OVERVIEW_RIGHT_COLUMN,
  PURCHASES_OVERVIEW_WIDGETS_ROW,
  getPurchasesOverviewBankShellClassName,
  getPurchasesOverviewSecondaryWidgetsGridClassName,
} from "@/app/purchases-overview/widgetGridClassNames";

/** Matches `PurchasesOverview` widget layout (left rail + bank + secondary grid). */
export function PurchasesOverviewDynamicLoading() {
  const { bankBalanceWidgetColumnSpan, hidePurchasesSupportingWidgets } =
    usePurchasesPrototypeScenario();
  const bankShellClass = getPurchasesOverviewBankShellClassName(
    bankBalanceWidgetColumnSpan
  );
  const secondaryGridClass = getPurchasesOverviewSecondaryWidgetsGridClassName();

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="mb-6 overflow-hidden bg-white py-4 sm:py-5">
        <div className="container mx-auto flex max-w-full flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between md:px-5 2xl:w-[1424px] 3xl:w-[1900px]">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
          <div className="flex gap-2">
            <div className="size-9 animate-pulse rounded-full bg-gray-200" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-gray-200" />
            <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="size-9 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full px-4 sm:!w-[480px] lg:!w-[964px] 2xl:!w-[1424px] 3xl:!w-[1900px]">
        <div className={`animate-pulse ${PURCHASES_OVERVIEW_WIDGETS_ROW}`}>
          <aside className={PURCHASES_OVERVIEW_LEFT_COLUMN}>
            <div className="h-52 rounded-xl bg-gray-200" />
            <div className="h-56 rounded-xl bg-gray-200" />
          </aside>
          <div className={PURCHASES_OVERVIEW_RIGHT_COLUMN}>
            <div className={bankShellClass}>
              <div className="h-80 rounded-xl bg-gray-200" />
            </div>
            {!hidePurchasesSupportingWidgets && (
              <div className={secondaryGridClass}>
                <div className="h-64 rounded-xl bg-gray-200" />
                <div className="h-72 rounded-xl bg-gray-200" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
