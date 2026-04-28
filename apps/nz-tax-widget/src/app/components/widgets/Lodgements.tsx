"use client";

import { useId, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { ExternalLink, Info } from "@/app/components/ui/icons";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { LodgementsChart } from "@/components/charts";
import { MoreButton } from "@/app/components/global";
import { useRegion } from "@/app/contexts/RegionContext";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import {
  getLodgementMetrics,
  lodgementEoyMeetsExpectation,
  lodgementYtdMeetsWidgetTarget,
  LODGEMENTS_REFERENCE_DATE,
} from "@/app/lib/mockData/workloadInsights";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

export function Lodgements({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  const { stage } = usePrototypeSettings();
  const headingTitle =
    region === "AU" && (stage === "ga" || stage === "ai")
      ? "Lodgements"
      : "Filed tax returns";
  const metrics = useMemo(
    () => getLodgementMetrics(LODGEMENTS_REFERENCE_DATE, region),
    [region]
  );
  const ytdPct = `${Math.round(metrics.onTimeYtdPct)}%`;
  const eoyPct = `${Math.round(metrics.eoyEstimatePct)}%`;
  const ytdMetricLabel = "On-time filing YTD";
  const schedule = metrics.scheduleTargetPct;
  const ytdHeadlineClass = lodgementYtdMeetsWidgetTarget(
    metrics.onTimeYtdPct
  )
    ? "text-[#008561]"
    : "text-[#DE0E40]";
  const eoyHeadlineClass = lodgementEoyMeetsExpectation(
    metrics.eoyEstimatePct,
    schedule,
    region
  )
    ? "text-[#008561]"
    : "text-[#DE0E40]";
  const infoTooltipId = `lodgements-info-${useId().replace(/:/g, "")}`;

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
        <div className="flex items-center justify-between pt-4.5 pr-2 pb-3 pl-6">
          <div className="flex min-w-0 items-center gap-1">
            <h2 className="text-content-primary flex flex-wrap items-baseline gap-x-1.5 text-[17px]/[24px]">
              <span className="font-bold">{headingTitle}</span>
              <span className="font-normal">•</span>
              <span className="font-normal">FY26</span>
            </h2>
            <button
              type="button"
              className="text-content-secondary hover:text-content-primary focus-visible:ring-content-secondary/75 relative shrink-0 flex size-7 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2"
              data-tooltip-content="Based on returns in Xero Tax"
              data-tooltip-id={infoTooltipId}
              data-tooltip-offset={8}
              data-tooltip-place="top"
              aria-label={`Information about ${headingTitle} data source`}
            >
              <Info className="shrink-0" />
              <Tooltip className="tooltip" id={infoTooltipId} />
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-2">
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
        </div>

        {/* Stats Summary */}
        <div className="flex w-full flex-wrap">
          <div className="flex min-w-[160px] flex-grow basis-0 flex-col border-r border-[#ccced2] px-6">
            <p
              className={`text-[24px]/[28px] font-light ${ytdHeadlineClass}`}
            >
              {ytdPct}
            </p>
            <p className="text-content-secondary text-[13px]/[16px]">
              {ytdMetricLabel}
            </p>
          </div>
          <div className="flex min-w-[160px] flex-grow basis-0 flex-col px-6">
            <p
              className={`text-[24px]/[28px] font-light ${eoyHeadlineClass}`}
            >
              {eoyPct}
            </p>
            <p className="text-content-secondary text-[13px]/[16px]">
              End of year estimate
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full pt-4">
          <LodgementsChart
            className="w-full overflow-visible"
            metrics={metrics}
            region={region}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center px-6 pt-1 pb-4">
          <button
            type="button"
            className="border-border-primary text-brand-primary inline-flex items-center justify-center gap-1 rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
          >
            {region === "NZ" ? "Go to tax" : "Go to tax manager"}
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}
