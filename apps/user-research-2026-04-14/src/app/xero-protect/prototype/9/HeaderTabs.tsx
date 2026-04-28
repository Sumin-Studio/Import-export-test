"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type BillsListTabValue,
  BILLS_LIST_TABS,
  billsTabCount,
  parseBillsListTab,
} from "./bills/billsTab";

export function HeaderTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = parseBillsListTab(searchParams.get("tab"));

  const setTab = (value: BillsListTabValue) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("tab", value);
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="flex w-full min-w-0 items-stretch">
      {BILLS_LIST_TABS.map((item, index) => {
        const isActive = item.value === tab;
        const count = billsTabCount(item.value);
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTab(item.value)}
            className={`relative -mb-px flex items-center gap-1.5 border-b-2 pb-3 pt-1 text-[14px] font-normal transition-colors ${
              index === 0 ? "pl-0 pr-3" : "px-3"
            } ${
              isActive
                ? "z-[1] border-[#1c52de] text-[#1c52de]"
                : "border-transparent text-[#333940] hover:text-[#0a0a0a]"
            }`}
          >
            {item.label}
            {count > 0 && item.value !== "all" && (
              <span className="text-[13px] font-normal text-[#333940]">
                {" "}
                ({count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
