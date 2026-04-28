import { useState } from "react";
import { MoreButton } from "@/components/global";
import { BillableHoursChart } from "@/components/charts";
import { BillableHoursOverflow } from "./overflow";
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

type Timeframe = "today" | "week";

export function BillableHours({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  const [timeframe, setTimeframe] = useState<Timeframe>("week");

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = new Date().getDay();

  // Map day of week to day index (Monday = 0, Friday = 4)
  const dayIndex = dayOfWeek === 0 ? 4 : dayOfWeek - 1; // Sunday maps to Friday (4)

  // Define expected and entered hours for each day of the week
  // Monday to Friday (indices 0-4)
  const expectedHoursByDay = [7, 14, 21, 28, 35]; // Mon to Fri
  const enteredHoursByDay = expectedHoursByDay.map((hours) =>
    Math.round(hours - hours / 3)
  ); // Each value minus 1/3

  const regionData = getRegionContent("text", "billableHours", region);
  const timeframeData = regionData?.[timeframe];

  const expectedHours =
    timeframe === "today"
      ? timeframeData?.expectedHours
      : expectedHoursByDay[Math.min(dayIndex, 4)];
  const enteredHours = enteredHoursByDay[Math.min(dayIndex, 4)];
  const enteredMinutes = timeframeData?.enteredMinutes;
  const expectedPerWeek = timeframeData?.expectedPerWeek || 30;

  const toggleTimeframe = () => {
    setTimeframe((prev) => (prev === "today" ? "week" : "today"));
  };

  // Format the entered time display
  const formatEnteredTime = () => {
    if (timeframe === "today" && enteredMinutes !== undefined) {
      const hours = Math.floor(enteredMinutes / 60);
      const mins = enteredMinutes % 60;
      return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    }
    return `${enteredHours || 0}h`;
  };

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
            <h3 className="text-[17px]/[28px]">
              <span className="cursor-pointer font-bold hover:underline">
                Billable hours
              </span>{" "}
              <span
                className="cursor-pointer font-normal hover:underline"
                onClick={toggleTimeframe}
              >
                • {timeframe === "today" ? "Today" : "This week"}
              </span>
            </h3>
          </div>
          <MoreButton
            menu={
              <BillableHoursOverflow
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
              />
            }
            menuClassName="max-w-[247px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Chart section */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-4">
          <BillableHoursChart
            className="w-ful overflow-visible"
            timeframe={timeframe}
            enteredMinutes={enteredMinutes}
            enteredHours={enteredHours}
            expectedHours={expectedHours}
            expectedPerWeek={expectedPerWeek}
          />
        </div>

        {/* Stats section */}
        <div className="px-6 pb-3">
          <div className="border-t border-[#e6e7e9] px-6 pt-3" />
          <div className="flex items-start justify-between text-[13px]/[20px]">
            <div className="flex flex-col gap-1">
              <span className="text-[#000a1e]">Expected billable hours</span>
              <span className="text-[#000a1e]">Entered billable hours</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="text-[#000a1e]">{expectedHours}h</span>
              <span className="text-[#000a1e]">{formatEnteredTime()}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="relative mt-auto mr-auto mb-6 ml-6 flex gap-2">
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

export default BillableHours;
