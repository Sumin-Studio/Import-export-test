"use client";

import { MoreButton } from "@/app/components/global";
import { ChartLoader } from "@/app/components/widgets/ChartLoader";

function Menu() {
  return (
    <div className="py-1 text-[13px]/[20px] text-content-primary">
      <button
        type="button"
        className="w-full px-5 py-2 text-left hover:bg-background-primary"
      >
        Cashflow settings
      </button>
      <button
        type="button"
        className="w-full px-5 py-2 text-left hover:bg-background-primary"
      >
        Learn about projections
      </button>
    </div>
  );
}

interface CashflowProjectionCardProps {
  className?: string;
}

/** Large “Available over the next 30 days” card with projection chart. */
export function CashflowProjectionCard({
  className = "",
}: CashflowProjectionCardProps) {
  return (
    <div
      className={`relative flex min-h-[560px] w-full min-w-0 flex-col rounded-xl bg-white transition-all duration-100 ease-in-out lg:min-h-[600px] ${className}`}
    >
      <div className="relative flex flex-col gap-1 pb-1 pl-6 pr-2 pt-[10px]">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[17px]/[26px] font-bold text-content-primary">
            <span className="cursor-pointer hover:underline">
              Available over the next 30 days
            </span>
            <span className="font-normal text-content-secondary">
              {" "}
              • Projected for 30 days ending March 24, 2026
            </span>
          </h3>
          <MoreButton
            menu={<Menu />}
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
      </div>
      <div className="relative mb-2 mt-2 flex flex-wrap gap-x-6 gap-y-3 pl-[23px] pr-6">
        <div className="flex min-w-[7rem] flex-col">
          <span className="text-[24px]/[32px] font-light subpixel-antialiased text-content-primary">
            2,300
          </span>
          <span className="text-[13px]/[20px] text-content-secondary">
            Today&apos;s cash movement
          </span>
        </div>
        <div className="flex w-px flex-none self-stretch bg-background-tertiary" />
        <div className="flex min-w-[7rem] flex-col">
          <span className="text-[24px]/[32px] font-light subpixel-antialiased text-[#D34246]">
            -11,560
          </span>
          <span className="text-[13px]/[20px] text-content-secondary">
            Next 1–7 days cash movement
          </span>
        </div>
        <div className="flex w-px flex-none self-stretch bg-background-tertiary" />
        <div className="flex min-w-[7rem] flex-col">
          <span className="text-[24px]/[32px] font-light subpixel-antialiased text-content-primary">
            10,200
          </span>
          <span className="text-[13px]/[20px] text-content-secondary">
            Next 8–30 days cash movement
          </span>
        </div>
      </div>
      <ChartLoader
        importChart={() => import("../../charts/CashflowProjection")}
        className="min-h-[300px] flex-1 px-3 pb-2 pt-0"
      />
      <div className="mb-5 ml-6 mr-6 mt-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-[12px]/[16px] text-content-secondary">
          <span className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: "#13A972" }}
              aria-hidden
            />
            Positive balance
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: "#D34246" }}
              aria-hidden
            />
            Negative balance
          </span>
        </div>
        <button
          type="button"
          className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
        >
          Go to Cashflow manager
        </button>
      </div>
    </div>
  );
}

export default CashflowProjectionCard;
