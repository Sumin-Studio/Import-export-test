"use client";

import { BarChart3, TrendingUp, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewType = "stats" | "growth" | "grid";

interface ViewToggleProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const views: { key: ViewType; label: string; icon: typeof BarChart3 }[] = [
  { key: "stats", label: "Stats", icon: BarChart3 },
  { key: "growth", label: "Growth", icon: TrendingUp },
  { key: "grid", label: "Grid", icon: Grid3x3 },
];

export function ViewToggle({ activeView, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
      {views.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            activeView === key
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
