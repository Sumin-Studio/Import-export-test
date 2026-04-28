import type { Metadata } from "next";
import { Suspense } from "react";
import { PayByBankConnectClient } from "@/components/bill-cash-flow/PayByBankConnectClient";

export const metadata: Metadata = {
  title: "Connect bank",
};

export default function PayByBankConnectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-hidden />}>
      <PayByBankConnectClient />
    </Suspense>
  );
}
