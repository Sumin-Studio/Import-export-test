"use client";

import { CustomizationOverlay } from "./CustomizationOverlay";
import {
  nzGstTrackerMock,
  formatCurrencyNzd,
  type GstFilingStatus,
} from "@/app/lib/mockData/nzTax";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

function statusStyles(status: GstFilingStatus): { label: string; className: string } {
  switch (status) {
    case "overdue":
      return {
        label: "Overdue",
        className:
          "border-[#ee99a3] bg-[#f3b7be] text-[#4d1219]",
      };
    case "due_soon":
      return {
        label: "Due soon",
        className:
          "border-[#fdc180] bg-[#fdd3a6] text-[#582e00]",
      };
    default:
      return {
        label: "On track",
        className:
          "border-[rgba(0,10,30,0.2)] bg-[rgba(0,10,30,0.04)] text-[rgba(0,10,30,0.75)]",
      };
  }
}

export function NzGstTracker({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 2,
  canToggleSize = false,
}: ComponentProps) {
  const data = nzGstTrackerMock;
  const headerStatus = statusStyles(data.status);

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[522px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-start justify-between pt-3.5 pr-2 pb-2 pl-6">
          <div>
            <h3 className="text-[17px]/[24px] font-bold">GST tracker</h3>
            <p className="text-content-secondary mt-0.5 text-[13px]/[20px]">
              {data.periodLabel}
            </p>
          </div>
          <span
            className={`mt-1 rounded-sm border px-2 py-0.5 text-[13px]/[20px] font-bold ${headerStatus.className}`}
          >
            {headerStatus.label}
          </span>
        </div>

        <div className="border-background-tertiary mx-6 border-t pt-4">
          <p className="text-content-secondary text-[13px]/[20px]">Due date</p>
          <p className="text-content-primary text-[21px]/[32px] font-bold">
            {data.dueDate}
          </p>
          <p className="text-brand-primary mt-1 text-[15px]/[24px] font-bold">
            {data.daysUntilDue} days remaining
          </p>
        </div>

        <div className="mt-4 flex flex-1 flex-col overflow-hidden px-2 pb-4">
          <p className="text-content-secondary mb-2 px-4 text-[13px]/[20px] font-bold uppercase tracking-wide">
            Clients (sample)
          </p>
          <div className="min-h-0 flex-1 overflow-auto">
            {data.clients.map((row) => {
              const st = statusStyles(row.filingStatus);
              return (
                <div
                  key={row.name}
                  className="border-background-tertiary hover:bg-background-secondary border-t py-2 pr-4 pl-6 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-content-primary text-[15px]/[24px] font-bold">
                        {row.name}
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-sm border px-1.5 py-0 text-[12px]/[18px] font-bold ${st.className}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="text-content-primary shrink-0 text-[15px]/[24px] tabular-nums">
                      {formatCurrencyNzd(row.gstToPay)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default NzGstTracker;
