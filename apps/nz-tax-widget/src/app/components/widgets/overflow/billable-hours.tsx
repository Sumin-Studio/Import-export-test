"use client";
import { useClose } from "@headlessui/react";
import { ExternalLink } from "@/components/ui/icons";

type Timeframe = "today" | "week";

interface ComponentProps {
  className?: string;
  timeframe: Timeframe;
  onTimeframeChange: (timeframe: Timeframe) => void;
}

export default function BillableHoursOverflow({
  className = "",
  timeframe,
  onTimeframeChange,
}: ComponentProps) {
  const close = useClose();
  const isToday = timeframe === "today";
  const isWeek = timeframe === "week";

  const handleTimeframeChange = (newTimeframe: Timeframe) => {
    onTimeframeChange(newTimeframe);
    close();
  };

  return (
    <div className={className}>
      <div className="bg-white">
        <div className="px-5 py-2">
          <p className="text-[13px] leading-[20px] text-[#59606d]">Timeframe</p>
        </div>
        <button
          className="relative flex w-full items-center gap-2 bg-white px-5 py-2 text-left hover:bg-gray-50"
          type="button"
          onClick={() => handleTimeframeChange("today")}
        >
          <div className="grow">
            <p
              className={`text-[15px] leading-[24px] ${isToday ? "text-[#0078c8]" : "text-[#000a1e]"}`}
            >
              Today
            </p>
          </div>
          {isToday && (
            <div className="pointer-events-none absolute inset-0 shadow-[3px_0px_0px_0px_inset_#0078c8]" />
          )}
        </button>
        <button
          className="relative flex w-full items-center gap-2 bg-white px-5 py-2 text-left hover:bg-gray-50"
          type="button"
          onClick={() => handleTimeframeChange("week")}
        >
          <div className="grow">
            <p
              className={`text-[15px] leading-[24px] ${isWeek ? "text-[#0078c8]" : "text-[#000a1e]"}`}
            >
              This week
            </p>
          </div>
          {isWeek && (
            <div className="pointer-events-none absolute inset-0 shadow-[3px_0px_0px_0px_inset_#0078c8]" />
          )}
        </button>
        <hr className="border-background-tertiary my-2" />
      </div>
      <a
        href="#"
        className="flex w-full items-center gap-2 bg-white px-5 py-2 text-left hover:bg-gray-50"
      >
        <span className="text-[15px] leading-[24px] text-[#000a1e]">
          Learn about billable hours
        </span>
        <ExternalLink className="shrink-0" />
      </a>
    </div>
  );
}
