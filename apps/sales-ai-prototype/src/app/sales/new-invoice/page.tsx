import type { Metadata } from "next";
import { NewInvoiceMount } from "@/components/bill-cash-flow/NewInvoiceMount";

export const metadata: Metadata = {
  title: "New invoice",
};

export default function NewInvoicePage() {
  return <NewInvoiceMount />;
}
