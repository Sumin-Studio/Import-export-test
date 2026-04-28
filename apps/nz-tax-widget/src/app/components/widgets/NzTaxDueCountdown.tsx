"use client";

import { CustomizationOverlay } from "./CustomizationOverlay";
import { nzTaxDueCountdownMock } from "@/app/lib/mockData/nzTax";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

export function NzTaxDueCountdown({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const data = nzTaxDueCountdownMock;

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
        <div className="relative flex items-center justify-between pt-3.5 pr-2 pb-2 pl-6">
          <h3 className="text-[17px]/[24px] font-bold">Tax due countdown</h3>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-6 text-center">
          <p className="text-content-secondary text-[13px]/[20px]">
            {data.taxType} · {data.label}
          </p>
          <p
            className="text-brand-primary mt-1 text-[56px]/[64px] font-bold tabular-nums"
            aria-live="polite"
          >
            {data.daysRemaining}
          </p>
          <p className="text-content-primary text-[15px]/[24px] font-bold">
            days until {data.dueDate}
          </p>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default NzTaxDueCountdown;
