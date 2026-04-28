import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Insights",
};

export default function XeroProtectInsightsPage() {
  redirect("/xero-protect/prototype/1");
}
