"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardMode } from "@/lib/dashboard-modes";
import { DASHBOARD_MODE_LABELS, DASHBOARD_MODES } from "@/lib/dashboard-modes";

interface DashboardHeaderProps {
  mode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
  onCreateCustomView?: () => void;
  className?: string;
}

export function DashboardHeader({ mode, onModeChange, onCreateCustomView, className }: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col justify-between min-h-[88px] bg-background-primary px-5 pt-5 pb-0",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h1
          className="text-text-default font-bold leading-[1.15] [font-family:var(--font-primary)]"
          style={{ fontSize: "var(--typography-font-size-24)" }}
        >
          Clients
        </h1>
        {onCreateCustomView && (
          <span className="inline-flex rounded-medium p-px bg-gradient-to-r from-violet-500 via-violet-400 to-blue-500 shadow-sm">
            <button
              type="button"
              onClick={onCreateCustomView}
              className="h-8 pl-2 pr-3 rounded-[5px] text-[12px] font-medium flex items-center gap-1.5 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] focus:ring-offset-1 bg-background-primary hover:bg-gradient-to-r hover:from-violet-50/80 hover:to-blue-50/80 transition-colors"
              aria-label="Create custom view"
            >
              <Sparkles className="size-4 shrink-0 text-violet-500" aria-hidden />
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent font-medium">
                Create custom view
              </span>
            </button>
          </span>
        )}
      </div>
      <div className="mt-auto border-b border-border-soft -mx-5 px-5 overflow-x-auto overflow-y-hidden min-w-0">
        <div className="flex items-center gap-6 pb-px w-max">
          {DASHBOARD_MODES.map((m) => {
            const isActive = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onModeChange(m)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "shrink-0 whitespace-nowrap text-[13px] font-medium pb-1.5 -mb-px cursor-pointer border-b-2",
                  isActive
                    ? "text-[var(--color-action-default)] border-[var(--color-action-default)]"
                    : "border-transparent text-text-muted hover:text-text-default"
                )}
              >
                {DASHBOARD_MODE_LABELS[m]}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
