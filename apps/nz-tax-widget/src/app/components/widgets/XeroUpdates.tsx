"use client";
import { Arrow, ExternalLink } from "@/app/components/ui/icons";
import React from "react";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { MoreButton } from "@/components/global";
import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionContent } from "@/app/lib/RegionContent";
import { useFormatRelativeDate } from "@/app/hooks/useFormatRelativeDate";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

interface UpdateItem {
  title: string;
  dateDaysFromToday: number;
  description: string;
  tag?: string;
}

function UpdateItemRow({ update }: { update: UpdateItem }) {
  const { displayText: formattedDate } = useFormatRelativeDate(
    update.dateDaysFromToday
  );

  return (
    <div className="border-background-tertiary hover:bg-background-primary group relative cursor-pointer border-t py-1 pr-2 pl-6 transition-colors">
      <div className="flex items-start justify-between gap-2 py-[6px]">
        <div className="min-w-0 flex-1">
          <div className="text-[13px] leading-5">
            <span className="text-content-primary">{update.title}</span>
            {formattedDate && (
              <span className="text-content-secondary"> • {formattedDate}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-content-secondary max-w-2xs flex-1 text-[13px] leading-[1.45]">
              {update.description}
            </p>
          </div>
        </div>
        <div className="flex size-8 items-center justify-center py-1">
          <Arrow className="text-brand-primary group-hover:text-brand-secondary" />
        </div>
      </div>
      {/* Sentiment line (hidden by default, can be shown with colors) */}
      <div className="absolute top-0 bottom-0 left-0 w-[3px]" />
    </div>
  );
}

export function XeroUpdates({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  const updates = getRegionContent("text", "xeroUpdates", region) as
    | UpdateItem[]
    | null;
  const mockUpdates = updates || [];

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[251px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between pt-[14px] pr-2 pb-2 pl-6">
          <h3 className="cursor-pointer text-[17px]/[24px] font-bold hover:underline">
            Stay up to date with Xero
          </h3>
          <MoreButton
            menu={
              <button className="flex items-center gap-2 bg-white px-5 py-2 text-left text-[15px]/[24px] hover:bg-gray-50">
                <span className="text-[15px] leading-[24px] whitespace-nowrap text-[#000a1e]">
                  Learn how this widget works
                </span>
                <ExternalLink className="shrink-0" />
              </button>
            }
            menuClassName="max-w-[320px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Updates List */}
        <div className="flex-1 overflow-y-auto">
          {mockUpdates.map((update, index) => (
            <UpdateItemRow key={index} update={update} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-background-tertiary border-t px-6 py-3">
          <button className="hover:bg-background-primary border-border-secondary text-brand-primary inline-flex h-[30px] items-center gap-2 rounded-full border bg-white px-4 pr-2 text-[13px] font-bold">
            View all updates
            <ExternalLink />
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}
