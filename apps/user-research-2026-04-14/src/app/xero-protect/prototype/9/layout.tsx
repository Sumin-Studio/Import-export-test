"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  PURCHASES_OVERVIEW_HREF_DEFAULT,
  SafetyShieldChrome,
} from "@/components/xero-protect/SafetyShieldChrome";
import { DupeOptionProvider, useDupeOption } from "./DupeOptionContext";
import { DupeGearButton } from "./DupeGearButton";
import { HeaderTabs } from "./HeaderTabs";

/** Bill detail quickview (split list + detail): full-bleed below header — no max-width / side padding (avoids grey shell gutters). */
function Prototype9ContentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBillDetailRoute = /\/xero-protect\/prototype\/9\/bills\/[^/]+$/.test(pathname);
  const isFullPageBill = searchParams.get("view") === "full";
  const isQuickview = isBillDetailRoute && !isFullPageBill;

  const shellClass = isQuickview
    ? "w-full max-w-none mx-0 px-0 flex flex-1 min-h-0 min-w-0 flex-col box-border bg-white"
    : "w-full max-w-[1728px] mx-auto px-5 md:px-8 lg:px-10 xl:px-12 flex flex-1 min-h-0 min-w-0 flex-col box-border";

  return <div className={shellClass}>{children}</div>;
}

function Prototype9Inner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBills = pathname.includes("/bills");
  const { config } = useDupeOption();

  const isGrayscale = config.displayMode === "grayscale";
  const isHighlight = config.displayMode === "highlight";

  return (
    <>
      {/* Grayscale: everything gray */}
      {isGrayscale && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "grayscale(100%)",
            WebkitBackdropFilter: "grayscale(100%)",
            pointerEvents: "none",
            zIndex: 9998,
          }}
        />
      )}

      {/* Highlight: everything gray except data-xp-highlight elements */}
      {isHighlight && (
        <>
          <style>{`
            [data-xp-highlight] {
              position: relative;
              z-index: 9999;
              isolation: isolate;
            }
          `}</style>
          <div
            style={{
              position: "fixed",
              inset: 0,
              backdropFilter: "grayscale(100%)",
              WebkitBackdropFilter: "grayscale(100%)",
              pointerEvents: "none",
              zIndex: 9998,
            }}
          />
        </>
      )}

      <SafetyShieldChrome
        breadcrumb={[
          { label: "Purchases overview", href: PURCHASES_OVERVIEW_HREF_DEFAULT },
        ]}
        breadcrumbTrailingChevron
        pageTitle="Bills"
        navAddButtonOverride={<DupeGearButton />}
        tabs={
          isBills ? (
            <Suspense fallback={<div className="h-9 min-w-[200px]" aria-hidden />}>
              <HeaderTabs />
            </Suspense>
          ) : undefined
        }
      >
        <Suspense
          fallback={
            <div className="w-full max-w-[1728px] mx-auto px-5 md:px-8 lg:px-10 xl:px-12 flex flex-1 min-h-0 min-w-0 flex-col box-border">
              {children}
            </div>
          }
        >
          <Prototype9ContentShell>{children}</Prototype9ContentShell>
        </Suspense>
      </SafetyShieldChrome>
    </>
  );
}

export default function Prototype9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DupeOptionProvider>
      <Prototype9Inner>{children}</Prototype9Inner>
    </DupeOptionProvider>
  );
}
