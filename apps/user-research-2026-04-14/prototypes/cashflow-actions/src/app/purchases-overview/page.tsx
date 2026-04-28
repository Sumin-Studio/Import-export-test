"use client";

import dynamic from "next/dynamic";
import { PurchasesOverviewDynamicLoading } from "./PurchasesOverviewDynamicLoading";

const PurchasesOverview = dynamic(() => import("./PurchasesOverview"), {
  ssr: false,
  loading: () => <PurchasesOverviewDynamicLoading />,
});

export default function PurchasesOverviewPage() {
  return <PurchasesOverview />;
}
