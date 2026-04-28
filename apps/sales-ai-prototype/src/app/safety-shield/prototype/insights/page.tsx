import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Insights",
};

export default function SafetyShieldInsightsPage() {
  redirect("/xero-protect/prototype/1");
}
