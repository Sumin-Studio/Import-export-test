import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Safety Shield",
};

export default function SafetyShieldPage() {
  redirect("/xero-protect/prototype");
}
