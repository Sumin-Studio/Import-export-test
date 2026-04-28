import type { ReactNode } from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BillsLayoutChrome } from "../../../../../../prototypes/cashflow-actions/src/app/bills/BillsLayoutChrome";

type Props = {
  children: ReactNode;
  params: Promise<{ version: string }>;
};

function BillsHeaderFallback() {
  return <div className="h-[100px] animate-pulse bg-white" aria-hidden />;
}

export default async function PurchasesOverviewPrototypeBillsLayout({
  children,
  params,
}: Props) {
  const { version } = await params;
  if (version !== "4") notFound();

  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      <Suspense fallback={<BillsHeaderFallback />}>
        <BillsLayoutChrome />
      </Suspense>
      <div className="px-4 py-5 sm:px-5 lg:px-6">{children}</div>
    </div>
  );
}
