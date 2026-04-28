import type { Metadata } from "next";
import { GmailInvoiceInboxClient } from "@/components/bill-cash-flow/GmailInvoiceInboxClient";

export const metadata: Metadata = {
  title: "Gmail invoice",
};

export default function GmailInvoicePage() {
  return <GmailInvoiceInboxClient />;
}
