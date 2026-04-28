import type { Metadata } from "next";
import { PayByBankRedirectToXeroClient } from "@/components/bill-cash-flow/PayByBankRedirectToXeroClient";

export const metadata: Metadata = {
  title: "Redirect",
};

export default function PayByBankRedirectPage() {
  return <PayByBankRedirectToXeroClient />;
}
