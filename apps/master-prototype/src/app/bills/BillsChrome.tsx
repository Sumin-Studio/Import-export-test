"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Bill } from "@/data/safety-shield";
import { safetyShieldBills } from "@/data/safety-shield";
import {
  joinPrototypePath,
  usePrototypeBasePath,
  usePrototypeHref,
} from "@/app/contexts/PrototypeBasePathContext";

function pathnameWithoutBase(pathname: string, base: string): string {
  if (!base || !pathname.startsWith(base)) return pathname;
  const rest = pathname.slice(base.length) || "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

function isRepeatingBill(b: Bill) {
  const n = parseInt(b.id, 10);
  return !Number.isNaN(n) && n % 5 === 0;
}

export function BillsChrome() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const basePath = usePrototypeBasePath();
  const relPath = pathnameWithoutBase(pathname, basePath);
  const isInsights = relPath === "/bills/insights";
  const insightsHref = usePrototypeHref("/bills/insights") ?? "/bills/insights";
  const purchasesOverviewHref =
    usePrototypeHref("/purchases-overview") ?? "/purchases-overview";

  const counts = useMemo(() => {
    const all = safetyShieldBills;
    return {
      all: all.length,
      draft: all.filter((b) => b.status === "draft").length,
      awaiting_approval: all.filter((b) => b.status === "awaiting_approval").length,
      awaiting_payment: all.filter((b) => b.status === "awaiting_payment").length,
      paid: all.filter((b) => b.status === "paid").length,
      repeating: all.filter(isRepeatingBill).length,
    };
  }, []);

  const activeTab = isInsights ? "insights" : (searchParams.get("tab") ?? "all");

  const goTab = (id: string) => {
    if (id === "insights") {
      router.push(joinPrototypePath(basePath, "/bills/insights"));
      return;
    }
    router.push(
      joinPrototypePath(basePath, id === "all" ? "/bills" : `/bills?tab=${id}`)
    );
  };

  return (
    <div className="bg-white">
      <div className="px-4 pt-4 pb-0 sm:px-5 sm:pb-0 lg:px-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13px]/[20px]">
          <Link href={purchasesOverviewHref} className="text-[#0071c2] hover:underline">
            Purchases overview
          </Link>
          <span className="text-[#8c919a]" aria-hidden>
            ›
          </span>
        </div>

        {/* Title + tabs + actions — padding below tabs separates header from list */}
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-8">
          <h1 className="shrink-0 text-[18px]/[26px] font-bold text-[#000a1e] sm:text-[19px]/[28px] lg:pb-2">
            Bills
          </h1>

          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <nav className="flex min-w-0 flex-1 gap-0 overflow-x-auto" aria-label="Bill views">
              <TabButton
                active={activeTab === "all"}
                onClick={() => goTab("all")}
                label="All"
              />
              <TabButton
                active={activeTab === "draft"}
                onClick={() => goTab("draft")}
                label="Draft"
                count={counts.draft}
              />
              <TabButton
                active={activeTab === "awaiting_approval"}
                onClick={() => goTab("awaiting_approval")}
                label="Awaiting approval"
                count={counts.awaiting_approval}
              />
              <TabButton
                active={activeTab === "awaiting_payment"}
                onClick={() => goTab("awaiting_payment")}
                label="Awaiting payment"
                count={counts.awaiting_payment}
              />
              <TabButton
                active={activeTab === "paid"}
                onClick={() => goTab("paid")}
                label="Paid"
                count={counts.paid}
              />
              <TabButton
                active={activeTab === "repeating"}
                onClick={() => goTab("repeating")}
                label="Repeating"
                count={counts.repeating}
              />
              <Link
                href={insightsHref}
                className={`relative inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 pb-2 pt-2.5 text-[13px]/[20px] font-medium transition-colors ${
                  isInsights
                    ? "border-[#0078c8] text-[#0078c8]"
                    : "border-transparent text-[#404756] hover:text-[#000a1e]"
                }`}
              >
                Insights
                <span className={isInsights ? "text-[#0078c8]" : "text-[#5a606c]"}>
                  {" "}
                  3
                </span>
                <span className="inline-flex h-4 items-center whitespace-nowrap rounded-sm border border-[#b8dcc8] bg-[#e0f2e9] px-1.5 text-[12px] font-medium leading-none text-[#1a5632]">
                  New
                </span>
              </Link>
            </nav>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <button
                type="button"
                className="text-[13px]/[20px] font-medium text-[#0071c2] hover:underline"
              >
                Set up einvoicing
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded bg-[#13a10e] px-3 text-[13px]/[20px] font-bold text-white hover:bg-[#107c0d]"
              >
                New bill
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded border border-[#e1e2e5] text-[#404756] hover:bg-[#f7f8f9]"
                aria-label="More actions"
              >
                <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor" aria-hidden>
                  <circle cx="2" cy="3" r="1.5" />
                  <circle cx="2" cy="8" r="1.5" />
                  <circle cx="2" cy="13" r="1.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 border-b-2 px-3 pb-2 pt-2.5 text-[13px]/[20px] font-medium transition-colors ${
        active
          ? "border-[#0078c8] text-[#0078c8]"
          : "border-transparent text-[#404756] hover:text-[#000a1e]"
      }`}
    >
      {label}
      {count != null ? (
        <span className={active ? "text-[#0078c8]" : "text-[#5a606c]"}> {count}</span>
      ) : null}
    </button>
  );
}

export default BillsChrome;
