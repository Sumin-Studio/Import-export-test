import { MoreButton } from "@/components/global";
import { BankReconciliationOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { getRegionContent } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";
import { useState } from "react";
import { ExternalLink } from "@/app/components/ui/icons";
import { useFormatRelativeDate } from "@/app/hooks/useFormatRelativeDate";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

interface ReconciliationItem {
  client: string;
  unreconciledItems: number;
  oldestItemDaysFromToday: number;
}

function OldestItemCell({ daysFromToday }: { daysFromToday: number }) {
  const { displayText } = useFormatRelativeDate(daysFromToday, true); // Show year
  return (
    <p className="text-right text-[13px]/[20px] font-normal text-[#000a1e]">
      {displayText}
    </p>
  );
}

export function BankReconciliation({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  const regionData = getRegionContent("text", "bankReconciliation", region);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "selected">(
    "all"
  );

  const reconciliationData: ReconciliationItem[] = regionData?.items || [
    {
      client: "Erin Predovic",
      unreconciledItems: 86,
      oldestItemDaysFromToday: 238,
    },
    {
      client: "Borer - Smitham",
      unreconciledItems: 71,
      oldestItemDaysFromToday: 181,
    },
    {
      client: "Walsh - Conroy",
      unreconciledItems: 50,
      oldestItemDaysFromToday: 154,
    },
    {
      client: "Funk Group",
      unreconciledItems: 34,
      oldestItemDaysFromToday: 138,
    },
    {
      client: "Harriet Mayert",
      unreconciledItems: 27,
      oldestItemDaysFromToday: 73,
    },
    {
      client: "Graham and Sons",
      unreconciledItems: 12,
      oldestItemDaysFromToday: 52,
    },
    {
      client: "Brendan Zulauf",
      unreconciledItems: 4,
      oldestItemDaysFromToday: 232,
    },
    {
      client: "Roberts, Langworth...",
      unreconciledItems: 2,
      oldestItemDaysFromToday: 245,
    },
    {
      client: "Hector Hamill",
      unreconciledItems: 0,
      oldestItemDaysFromToday: 242,
    },
  ];

  // Filter data based on selected filter
  const filteredData =
    selectedFilter === "all"
      ? reconciliationData
      : reconciliationData.slice(0, 3); // Show only first 4 clients for "selected"

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-auto min-h-[521px] lg:h-[521px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } flex-col rounded-xl bg-white transition-all duration-100 ease-in-out lg:min-w-[440px] ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between pt-3.5 pr-2 pb-1 pl-6">
          <div className="flex items-center">
            <h3 className="text-[17px]/[24px] font-bold">
              <span className="cursor-pointer hover:underline">
                Bank reconciliation
              </span>
            </h3>
          </div>
          <MoreButton
            menu={
              <BankReconciliationOverflow
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            }
            menuClassName="w-[300px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-clip px-6 py-0">
          <div className="flex justify-between overflow-clip">
            {/* Client Column */}
            <div className="flex grow flex-col">
              <div className="flex h-[29px] items-center py-2">
                <p className="text-[11px] font-normal text-[#59606d]">Client</p>
              </div>
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex h-10 items-center border-t border-[#e6e7e9] py-[9px]"
                >
                  <p className="text-[13px]/[20px] font-normal">
                    {item.client}
                  </p>
                </div>
              ))}
            </div>

            {/* Unreconciled Items Column */}
            <div className="flex grow flex-col items-end">
              <div className="flex h-[29px] items-center py-2">
                <p className="text-[11px] font-normal text-[#59606d]">
                  Unreconciled items
                </p>
              </div>
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex h-10 w-full items-center border-t border-[#e6e7e9] py-[9px]"
                >
                  <p className="flex w-full items-baseline justify-end gap-1 text-right text-[13px]/[20px] font-normal text-[#0078c8]">
                    {item.unreconciledItems} <ExternalLink className="size-3" />
                  </p>
                </div>
              ))}
            </div>

            {/* Oldest Item Column */}
            <div className="flex grow flex-col">
              <div className="flex h-[29px] items-center justify-end py-2">
                <p className="text-right text-[11px] font-normal text-[#59606d]">
                  Oldest item
                </p>
              </div>
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex h-10 items-center justify-end border-t border-[#e6e7e9] py-[9px]"
                >
                  <OldestItemCell
                    daysFromToday={item.oldestItemDaysFromToday}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-auto mr-auto mb-6 ml-6 flex gap-2 pt-[5px]">
          <button
            className="border-border-primary text-brand-primary inline-block w-auto flex-none rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View all
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default BankReconciliation;
