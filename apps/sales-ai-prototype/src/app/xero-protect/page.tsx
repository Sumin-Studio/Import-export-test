import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Xero Protect",
};

export default function XeroProtectPage() {
  redirect("/xero-protect/prototype");
}
