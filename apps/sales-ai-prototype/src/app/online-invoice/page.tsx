import type { Metadata } from "next";
import { OnlineInvoicePayClient } from "@/components/bill-cash-flow/OnlineInvoicePayClient";

export const metadata: Metadata = {
  title: "Online invoice",
};

export default function OnlineInvoicePage() {
  return <OnlineInvoicePayClient />;
}
