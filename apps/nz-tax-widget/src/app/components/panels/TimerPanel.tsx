"use client";

import { useState } from "react";
import { Close, Calendar, Plus } from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";

export default function TimerPanel() {
  const { openPanel } = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
      .replace(",", "");
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <>
      {/* Header */}
      <div className="border-border-primary relative flex items-center justify-between gap-2 border-b py-3 pr-3 pl-5">
        <h2 className="text-[17px]/[28px] font-bold capitalize">Time</h2>
        <button
          className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => openPanel(null)}
          type="button"
        >
          <span className="sr-only">Close</span>
          <Close fill="fill-[#59606D]" />
        </button>
      </div>

      {/* Date Navigation */}
      <div className="border-border-primary border-b bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateDate("prev")}
            className="border-border-secondary hover:bg-background-hover flex size-8 items-center justify-center rounded-md border bg-white transition-colors duration-200"
            aria-label="Previous day"
          >
            <Calendar fill="fill-content-secondary" />
          </button>

          <div className="flex-1 px-8 text-center">
            <span className="text-md-tall text-content-primary font-semibold">
              {formatDate(currentDate)}
            </span>
          </div>

          <button
            onClick={() => navigateDate("next")}
            className="border-border-secondary hover:bg-background-hover flex size-8 items-center justify-center rounded-md border bg-white transition-colors duration-200"
            aria-label="Next day"
          >
            <Plus fill="fill-content-secondary" className="size-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background-primary flex h-[calc(100vh-148px)] flex-col items-center justify-start px-4 py-5">
        <div className="flex flex-col items-center gap-5 py-5 text-center">
          <div className="flex flex-col gap-2">
            <p className="text-content-secondary text-lg font-semibold">
              No time logged today
            </p>
          </div>

          <button
            className="hover:bg-action-secondary focus:ring-action-primary bg-action-primary text-sm-alt rounded-md px-4 py-3 font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            onClick={() => {
              // Handle add time action
              console.log("Add time clicked");
            }}
          >
            Add time
          </button>
        </div>
      </div>
    </>
  );
}
