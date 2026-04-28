"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type StepCompletionSwitchProps = {
  displayCompleted: boolean;
  isMarking: boolean;
  onToggle: () => void;
  className?: string;
};

/**
 * Completion switch with instant local optimistic state so the thumb flips
 * before the server round-trip completes.
 */
export function StepCompletionSwitch({
  displayCompleted,
  isMarking,
  onToggle,
  className,
}: StepCompletionSwitchProps) {
  const [override, setOverride] = useState<boolean | null>(null);

  const synced = !!displayCompleted;
  const checked = override !== null ? override : synced;

  useEffect(() => {
    setOverride(null);
  }, [displayCompleted]);

  return (
    <div className={cn("flex shrink-0 items-center", className)}>
      <Switch
        checked={checked}
        onCheckedChange={(next) => {
          if (next === checked) return;
          setOverride(next);
          onToggle();
        }}
        aria-label={checked ? "Mark step as incomplete" : "Mark step as complete"}
        className={cn(isMarking && "opacity-90")}
      />
    </div>
  );
}
