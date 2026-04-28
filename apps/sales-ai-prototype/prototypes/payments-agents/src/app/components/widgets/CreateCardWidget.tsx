"use client";

import { CustomizationOverlay } from "./CustomizationOverlay";
import { Plus } from "@/app/components/ui/icons";

interface CreateCardWidgetProps {
  isCustomising?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CreateCardWidget({
  isCustomising = false,
  className = "",
  onClick,
}: CreateCardWidgetProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative pl-6 pr-2 pt-[9px]">
          <h3 className="text-[17px]/[28px] font-bold opacity-0">Placeholder</h3>
        </div>
        
        {/* Plus Icon and Label */}
        <div 
          className="relative mx-6 mt-2 h-[120px] rounded-lg border-2 border-dashed border-border-primary flex items-center justify-center flex-col gap-2 flex-shrink-0 hover:border-brand-primary hover:bg-background-primary transition-colors duration-200 cursor-pointer"
          onClick={onClick}
        >
          <div className="w-6 h-6">
            <Plus className="fill-[#A6A9B0] w-full h-full" />
          </div>
          <span className="text-[13px]/[18px] font-medium text-content-secondary">Create new card</span>
        </div>

        {/* Empty space to match other cards */}
        <div className="relative mx-6 mt-4 flex-shrink-0">
          <div className="text-[11px]/[16px] text-content-secondary mb-0.5 opacity-0">Cardholders</div>
          <div className="text-[13px]/[18px] font-medium opacity-0">
            Placeholder
          </div>
        </div>

        {/* Empty space to match other cards */}
        <div className="relative mx-6 mt-4 flex flex-col pb-2 flex-shrink-0">
          <span className="text-[11px]/[16px] text-content-secondary mb-1 opacity-0">Current balance</span>
          <span className="text-[21px]/[23px] font-medium opacity-0">$0.00</span>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default CreateCardWidget;

