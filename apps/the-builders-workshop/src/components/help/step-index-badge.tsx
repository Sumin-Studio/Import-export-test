"use client";

import { cn } from "@/lib/utils";

type StepIndexBadgeProps = {
  stepNumber: number;
  completed: boolean;
  title?: string;
  className?: string;
};

/**
 * Step number in a circle. Incomplete: neutral; complete: brand fill (no checkmark — completion is shown in the toggle).
 */
export function StepIndexBadge({ stepNumber, completed, title, className }: StepIndexBadgeProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
        completed ? "bg-brand text-white" : "bg-neutral-100 text-neutral-900",
        className
      )}
      title={title}
    >
      {stepNumber}
    </div>
  );
}
