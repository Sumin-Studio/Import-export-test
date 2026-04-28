"use client";

import { CustomizationOverlay } from "./CustomizationOverlay";
import { MoreButton } from "../global";
import CardWidgetOverflow from "./overflow/card-widget";

interface CardWidgetProps {
  cardName: string;
  cardholders: string[];
  balance: string;
  isCustomising?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CardWidget({
  cardName,
  cardholders,
  balance,
  isCustomising = false,
  className = "",
  onClick,
}: CardWidgetProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        onClick={onClick}
        className={`relative flex w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out cursor-pointer hover:shadow-md ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative pl-6 pr-2 pt-[9px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px]/[28px] font-bold">{cardName}</h3>
            <div onClick={(e) => e.stopPropagation()}>
              <MoreButton
                menu={<CardWidgetOverflow />}
                position={{ to: "bottom end", gap: "4px" }}
              />
            </div>
          </div>
        </div>
        
        {/* Credit Card Image */}
        <div className="relative mx-6 mt-2 h-[120px] rounded-lg bg-gradient-to-br from-[#0078C8] to-[#005A9E] shadow-md overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <div className="text-[11px]/[14px] font-medium opacity-80">CARD NUMBER</div>
              <div className="text-[11px]/[14px] font-medium opacity-80">VALID THRU</div>
            </div>
            <div className="text-[18px]/[22px] font-mono tracking-wider">•••• •••• •••• 1234</div>
            <div className="flex items-center justify-between">
              <div className="text-[14px]/[18px] font-medium">{cardName.toUpperCase()}</div>
              <div className="text-[11px]/[14px] font-medium">12/25</div>
            </div>
          </div>
        </div>

        {/* Cardholders */}
        <div className="relative mx-6 mt-4 flex-shrink-0">
          <div className="text-[11px]/[16px] text-content-secondary mb-0.5">Cardholders</div>
          <div className="text-[13px]/[18px] font-medium">
            {cardholders.join(", ")}
          </div>
        </div>

        {/* Balance */}
        <div className="relative mx-6 mt-4 mb-2 flex flex-col pb-2 flex-shrink-0">
          <span className="text-[11px]/[16px] text-content-secondary mb-1">Current balance</span>
          <span className="text-[21px]/[23px] font-medium">{balance}</span>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default CardWidget;

