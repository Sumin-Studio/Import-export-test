import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BillsListView } from "../../../../../../prototypes/cashflow-actions/src/app/bills/BillsListView";

type Props = { params: Promise<{ version: string }> };

export const metadata: Metadata = {
  title: "Bills",
};

function ListFallback() {
  return (
    <div
      className="min-h-[320px] rounded-xl border border-[#e1e2e5] bg-white animate-pulse"
      aria-hidden
    />
  );
}

export default async function PurchasesOverviewPrototypeBillsPage({ params }: Props) {
  const { version } = await params;
  if (version !== "4") notFound();

  return (
    <Suspense fallback={<ListFallback />}>
      <BillsListView />
    </Suspense>
  );
}
