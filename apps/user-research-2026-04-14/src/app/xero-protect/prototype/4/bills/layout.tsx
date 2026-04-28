"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BillsListClient } from "./BillsListClient";

function BillsLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBillDetailRoute = useMemo(
    () => /\/xero-protect\/prototype\/4\/bills\/[^/]+$/.test(pathname),
    [pathname]
  );
  const isFullPage = searchParams.get("view") === "full";
  const showSplit = isBillDetailRoute && !isFullPage;
  const [quickviewVisible, setQuickviewVisible] = useState(false);

  useEffect(() => {
    if (!showSplit) {
      setQuickviewVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setQuickviewVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [showSplit]);

  if (!showSplit) {
    return <div className="px-4 pb-4">{children}</div>;
  }

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <aside
        className={`shrink-0 flex flex-col bg-[#f2f3f4] border-r border-[#d5d7da] ${
          quickviewVisible ? "w-1/2" : "w-0"
        }`}
      >
        <Suspense fallback={<div className="p-4 text-[13px] text-[#6b7280]">Loading…</div>}>
          <BillsListClient compact />
        </Suspense>
      </aside>
      <section
        className={`min-w-0 flex flex-col bg-[#f2f3f4] overflow-auto ${
          quickviewVisible ? "w-1/2" : "w-full"
        }`}
      >
        {children}
      </section>
    </div>
  );
}

export default function BillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="px-4 pb-4">{children}</div>}>
      <BillsLayoutInner>{children}</BillsLayoutInner>
    </Suspense>
  );
}
