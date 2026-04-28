import type { Metadata } from "next";
import { PayByBankClient } from "@/components/bill-cash-flow/PayByBankClient";

export const metadata: Metadata = {
  title: "Pay by bank",
};

export default function PayByBankPage() {
  return <PayByBankClient />;
}
