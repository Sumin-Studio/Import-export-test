import type { Metadata } from "next";
import { Suspense } from "react";
import { OnlinePaymentsMount } from "@/components/bill-cash-flow/OnlinePaymentsMount";

export const metadata: Metadata = {
  title: "Online payments",
};

export default function OnlinePaymentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f2f3f4]" aria-hidden />}>
      <OnlinePaymentsMount />
    </Suspense>
  );
}
