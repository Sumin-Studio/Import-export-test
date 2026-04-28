"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type StepExpandAffordanceProps = {
  /** When true while saving, show a spinner instead of the dots hint */
  isLoading?: boolean;
  className?: string;
};

/**
 * Compact hint that the row expands (replaces a raw chevron). Subtle circle with “···”, or spinner when saving.
 */
export function StepExpandAffordance({ isLoading, className }: StepExpandAffordanceProps) {
  if (isLoading) {
    return (
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100",
          className
        )}
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-400" aria-hidden />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full border border-neutral-200/90 bg-neutral-50 text-[10px] font-semibold leading-none tracking-widest text-neutral-500",
        className
      )}
      aria-hidden
    >
      ···
    </span>
  );
}

type StepDismissChipProps = {
  onClick: () => void;
  className?: string;
};

/** Collapse an expanded completed step — subtle rounded chip (stadium) so it reads as a soft “circle” control. */
export function StepDismissChip({ onClick, className }: StepDismissChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-neutral-200/90 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium leading-none text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer",
        className
      )}
      aria-label="Dismiss"
    >
      Dismiss
    </button>
  );
}
