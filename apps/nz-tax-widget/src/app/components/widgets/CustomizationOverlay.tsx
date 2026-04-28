"use client";

import { type ReactNode, useContext } from "react";
import { ExpandIcon, ShrinkIcon } from "@/icons/SizeIcons";
import {
  CustomizationContext,
  WidgetIdContext,
} from "@/app/contexts/DashboardWidgetCustomizationContext";

interface CustomizationOverlayProps {
  isCustomising: boolean;
  onRemove?: () => void;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
  children: ReactNode;
  className?: string;
}

export function CustomizationOverlay({
  isCustomising,
  onRemove,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
  children,
  className = "",
}: CustomizationOverlayProps) {
  const widgetId = useContext(WidgetIdContext);
  const { onRemoveWidget } = useContext(CustomizationContext);

  const handleRemove = () => {
    if (widgetId != null && onRemoveWidget) {
      onRemoveWidget(widgetId);
    }
    onRemove?.();
  };

  return (
    <div className={`relative max-[599px]:w-[440px] ${className}`}>
      {isCustomising ? (
        <div className="border-pulse border-border-primary border-opacity-100 absolute top-0 left-0 z-10 h-full w-full rounded-xl border-[3px] !transition-all !duration-200 !ease-in-out hover:!border-[#a6a9b0] hover:!bg-white/60">
          <button
            className="absolute -top-3 -left-3 z-20 flex size-6 items-center justify-center rounded-full bg-[#414755]"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            type="button"
          >
            <svg
              fill="none"
              height="12"
              viewBox="0 0 12 12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4.5L10.5 0L12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5Z"
                fill="white"
              />
            </svg>
            <span className="sr-only">Hide widget</span>
          </button>

          {/* Size toggle button - positioned at bottom right */}
          {onToggleColSpan && canToggleSize && (
            <button
              className="absolute right-3 -bottom-3 z-20 flex items-center gap-1 rounded-full bg-[#59606d] py-1 pr-3 pl-2 text-[13px] font-bold text-white transition-colors hover:bg-[#404756]"
              onClick={(e) => {
                e.stopPropagation();
                onToggleColSpan();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              type="button"
            >
              <div className="flex size-5 items-center justify-center">
                {colSpan === 1 ? (
                  <ExpandIcon className="size-[15px]" />
                ) : (
                  <ShrinkIcon className="size-[15px]" />
                )}
              </div>
              <span className="whitespace-nowrap">
                {colSpan === 1 ? "Make larger" : "Make smaller"}
              </span>
            </button>
          )}
        </div>
      ) : null}
      {children}
    </div>
  );
}
