import { MoreButton } from "@/components/global";
import { TimeSummaryChart } from "@/components/charts";
import { TimeSummaryOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { getRegionContent } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

export function TimeSummary({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  getRegionContent("text", "timeSummary", region);

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
        <div className="relative flex items-center justify-between pt-3.5 pr-2 pl-6">
          <div className="flex items-center">
            <h3 className="text-[17px]/[28px]">
              <span className="cursor-pointer font-bold hover:underline">
                Time summary
              </span>
            </h3>
          </div>
          <MoreButton
            menu={<TimeSummaryOverflow />}
            menuClassName="w-[200px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Chart section */}
        <TimeSummaryChart className="mt-4 mb-2 px-[14px]" colSpan={colSpan} />

        {/* Legend */}
        <div className="relative mr-6 mb-5 ml-6 flex justify-end gap-6">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#0078c8]"></div>
            <span className="text-[13px]/[20px] text-[#59606d]">Billable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#de0e40]"></div>
            <span className="text-[13px]/[20px] text-[#59606d]">
              Non-billable
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#e6e7e9]"></div>
            <span className="text-[13px]/[20px] text-[#59606d]">Capacity</span>
          </div>
        </div>

        {/* Action buttons — keep bottom margin in sync with other dashboard widgets */}
        <div className="relative mt-auto mr-auto mb-6 ml-6 flex gap-2">
          <button
            className="border-border-primary text-brand-primary inline-block w-auto flex-none rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View timesheet
          </button>
          <button
            className="border-border-primary text-brand-primary inline-block w-auto flex-none rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            Enter time
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default TimeSummary;
