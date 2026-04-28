import type { Metadata } from "next";
import { SentInvoiceMount } from "@/components/bill-cash-flow/SentInvoiceMount";

export const metadata: Metadata = {
  title: "Sent invoice",
};

export default function SentInvoicePageRoute() {
  return <SentInvoiceMount />;
}
