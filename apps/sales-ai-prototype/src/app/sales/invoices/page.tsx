import type { Metadata } from "next";
import { InvoicesMount } from "@/components/bill-cash-flow/InvoicesMount";

export const metadata: Metadata = {
  title: "Invoices",
};

export default function InvoicesPage() {
  return <InvoicesMount />;
}
