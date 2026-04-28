import type { Metadata } from "next";
import { SendInvoicePageClient } from "@/components/bill-cash-flow/SendInvoicePageClient";

export const metadata: Metadata = {
  title: "Send invoice",
};

export default function SendInvoiceRoutePage() {
  return <SendInvoicePageClient />;
}
