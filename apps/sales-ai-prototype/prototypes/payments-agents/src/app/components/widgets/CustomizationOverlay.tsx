import { type ReactNode } from "react";

interface CustomizationOverlayProps {
  isCustomising: boolean;
  onRemove?: () => void;
  children: ReactNode;
  className?: string;
}

export function CustomizationOverlay({
  isCustomising,
  onRemove,
  children,
  className = "",
}: CustomizationOverlayProps) {
  return (
    <div className={`relative max-[599px]:w-[440px] ${className}`}>
      {isCustomising ? (
        <div className="absolute left-0 top-0 z-10 h-full w-full border-pulse rounded-xl border-[3px] border-border-primary border-opacity-100 hover:!bg-white/60 hover:!border-[#a6a9b0] !transition-all !duration-200 !ease-in-out">
          <button
            className="absolute -left-3 -top-3 flex size-6 items-center justify-center rounded-full bg-[#414755]"
            onClick={onRemove}
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
            <span className="sr-only">Remove</span>
          </button>
        </div>
      ) : null}
      {children}
    </div>
  );
}
