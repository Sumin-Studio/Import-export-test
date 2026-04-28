import type { Metadata } from "next";
import { PayByBankPaidClient } from "@/components/bill-cash-flow/PayByBankPaidClient";

export const metadata: Metadata = {
  title: "Payment complete",
};

export default function PayByBankPaidPage() {
  return <PayByBankPaidClient />;
}
