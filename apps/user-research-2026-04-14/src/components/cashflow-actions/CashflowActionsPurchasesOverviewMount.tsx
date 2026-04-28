"use client";

import dynamic from "next/dynamic";

const PurchasesOverview = dynamic(
  () =>
    import(
      "../../../prototypes/cashflow-actions/src/app/purchases-overview/PurchasesOverview"
    ),
  {
    ssr: false,
    loading: () => (
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
          <div className="grid animate-pulse grid-cols-1 gap-5 lg:grid-cols-2 min-[1440px]:grid-cols-3 3xl:grid-cols-4">
            <div className="h-64 rounded-xl bg-gray-200" />
            <div className="h-64 rounded-xl bg-gray-200 min-[1440px]:col-span-2" />
            <div className="h-64 rounded-xl bg-gray-200" />
            <div className="h-64 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    ),
  }
);

export function CashflowActionsPurchasesOverviewMount() {
  return <PurchasesOverview />;
}
