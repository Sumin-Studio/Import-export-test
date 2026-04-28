import type { ReactNode } from "react";
import { Suspense } from "react";
import { BillsLayoutChrome } from "./BillsLayoutChrome";

function BillsHeaderFallback() {
  return <div className="h-[100px] animate-pulse bg-white" aria-hidden />;
}

export default function BillsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      <Suspense fallback={<BillsHeaderFallback />}>
        <BillsLayoutChrome />
      </Suspense>
      <div className="px-4 py-5 sm:px-5 lg:px-6">{children}</div>
    </div>
  );
}
