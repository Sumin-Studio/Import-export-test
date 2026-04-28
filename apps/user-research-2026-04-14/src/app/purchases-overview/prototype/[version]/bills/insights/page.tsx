import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BillsInsightsClient } from "../../../../../../../prototypes/cashflow-actions/src/app/bills/insights/BillsInsightsClient";

type Props = { params: Promise<{ version: string }> };

export const metadata: Metadata = {
  title: "Insights · Bills",
};

export default async function PurchasesOverviewPrototypeBillsInsightsPage({
  params,
}: Props) {
  const { version } = await params;
  if (version !== "2") notFound();

  return <BillsInsightsClient />;
}
