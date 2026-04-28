import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CashflowActionsPurchasesOverviewMount } from "@/components/cashflow-actions/CashflowActionsPurchasesOverviewMount";

type Props = {
  params: Promise<{ version: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { version } = await params;
  if (version !== "4") {
    return { title: "Purchases Overview" };
  }
  return {
    title: "Purchases Overview · Prototype 4",
    description:
      "Cashflow-actions purchases overview: orange Protect markers, Available cash chart, unified flow.",
  };
}

export default async function PurchasesOverviewPrototypePage({ params }: Props) {
  const { version } = await params;
  if (version !== "4") {
    notFound();
  }
  return <CashflowActionsPurchasesOverviewMount />;
}
