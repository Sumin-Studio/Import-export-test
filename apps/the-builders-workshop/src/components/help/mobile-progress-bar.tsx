"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileProgressBarProps {
  milestoneKeys: readonly string[];
  completions: Record<string, string>;
  activeStepKey: string;
}

export function MobileProgressBar({
  milestoneKeys,
  completions,
  activeStepKey,
}: MobileProgressBarProps) {
  return (
    <div className="lg:hidden flex items-center justify-center gap-2 py-3">
      {milestoneKeys.map((key) => {
        const isCompleted = !!completions[key];
        const isActive = key === activeStepKey;

        return (
          <div
            key={key}
            className="flex items-center justify-center"
          >
            {isCompleted ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </div>
            ) : (
              <div
                className={cn(
                  "h-5 w-5 rounded-full border-2",
                  isActive
                    ? "border-neutral-500 bg-neutral-100"
                    : "border-neutral-300"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
