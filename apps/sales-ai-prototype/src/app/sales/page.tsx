import type { Metadata } from "next";
import { SalesOverviewMount } from "@/components/bill-cash-flow/SalesOverviewMount";

export const metadata: Metadata = {
  title: "Sales overview",
};

export default function SalesOverviewPage() {
  return <SalesOverviewMount />;
}
