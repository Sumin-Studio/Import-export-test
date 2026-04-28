"use client";

import { cn } from "@/lib/utils";
import type { ReadinessTier } from "@/lib/data-store";

/** Risk column (completion risk): High (red), Medium (amber), Low (light blue) */
const TIER_STYLES: Record<
  ReadinessTier,
  { bg: string; text: string; label: string }
> = {
  blocked: {
    bg: "bg-[var(--color-sentiment-negative-background)]",
    text: "text-[var(--color-sentiment-negative-foreground)]",
    label: "High",
  },
  action_required: {
    bg: "bg-[var(--color-sentiment-warning-background)]",
    text: "text-[var(--color-sentiment-warning-foreground)]",
    label: "Medium",
  },
  ready: {
    bg: "bg-[var(--color-sentiment-inform-background)]",
    text: "text-[var(--color-sentiment-inform-foreground)]",
    label: "Low",
  },
};

interface ReadinessCellProps {
  tier: ReadinessTier;
  score: number;
  blockerReason?: string;
  blockers: string[];
  className?: string;
}

export function ReadinessCell({
  tier,
  score,
  blockerReason: _blockerReason,
  blockers: _blockers,
  className,
}: ReadinessCellProps) {
  const style = TIER_STYLES[tier];

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="cell"
    >
      <span
        className={cn(
          "inline-flex items-center justify-center h-5 min-w-[40px] px-2 rounded-xlarge font-medium leading-none text-[12px]",
          style.bg,
          style.text
        )}
      >
        {style.label}
      </span>
    </div>
  );
}
