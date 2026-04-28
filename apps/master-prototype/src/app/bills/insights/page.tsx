import type { Metadata } from "next";
import { BillsInsightsClient } from "./BillsInsightsClient";

export const metadata: Metadata = {
  title: "Insights · Bills",
};

export default function BillsInsightsPage() {
  return <BillsInsightsClient />;
}
