"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { BillsListClient } from "./BillsListClient";

export default function BillsSplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuickviewOpen = useMemo(
    () => /\/xero-protect\/prototype\/3\/bills\/[^/]+$/.test(pathname),
    [pathname]
  );
  const [quickviewVisible, setQuickviewVisible] = useState(false);

  useEffect(() => {
    if (!isQuickviewOpen) {
      setQuickviewVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setQuickviewVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [isQuickviewOpen]);

  if (!isQuickviewOpen) {
    return <div className="px-4 pb-4">{children}</div>;
  }

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <aside
        className={`shrink-0 flex flex-col bg-[#f2f3f4] border-r border-[#d5d7da] ${
          quickviewVisible ? "w-1/2" : "w-0"
        }`}
      >
        <Suspense><BillsListClient compact /></Suspense>
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
