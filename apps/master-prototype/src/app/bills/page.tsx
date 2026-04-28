import type { Metadata } from "next";
import { Suspense } from "react";
import { BillsListView } from "./BillsListView";

export const metadata: Metadata = {
  title: "Bills",
};

function ListFallback() {
  return (
    <div
      className="min-h-[320px] rounded-xl border border-[#e1e2e5] bg-white animate-pulse"
      aria-hidden
    />
  );
}

export default function BillsPage() {
  return (
    <Suspense fallback={<ListFallback />}>
      <BillsListView />
    </Suspense>
  );
}
