"use client";

import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getHelpDataForStep } from "./getting-started-help-data";
import { BUILDERS_WORKSHOP_SLACK } from "@/lib/builders-workshop-slack";

interface ResourceLink {
  label: string;
  url: string;
}

interface StepHelpSidebarProps {
  milestoneKeys: readonly string[];
  stepTitles: Record<string, string>;
  completions: Record<string, string>;
  activeStepKey: string;
  resources?: ResourceLink[];
}

const DEFAULT_RESOURCES: ResourceLink[] = [BUILDERS_WORKSHOP_SLACK];

export function StepHelpSidebar({
  milestoneKeys,
  stepTitles,
  completions,
  activeStepKey,
  resources = DEFAULT_RESOURCES,
}: StepHelpSidebarProps) {
  const completedCount = milestoneKeys.filter(
    (key) => completions[key]
  ).length;
  const totalCount = milestoneKeys.length;
  const activeHelp = getHelpDataForStep(activeStepKey);

  const scrollToStep = (milestoneKey: string) => {
    const el = document.getElementById(`step-${milestoneKey}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden lg:block w-[220px] shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Progress */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Progress
            </span>
            <span className="text-xs font-medium text-neutral-500">
              {completedCount}/{totalCount}
            </span>
          </div>

          {/* Step nav */}
          <nav className="space-y-1">
            {milestoneKeys.map((key) => {
              const isCompleted = !!completions[key];
              const isActive = key === activeStepKey;

              return (
                <button
                  key={key}
                  onClick={() => scrollToStep(key)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer",
                    isActive
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  {isCompleted ? (
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand">
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "h-4 w-4 shrink-0 rounded-full border-2",
                        isActive
                          ? "border-neutral-400"
                          : "border-neutral-300"
                      )}
                    />
                  )}
                  <span className="text-xs font-medium truncate">
                    {stepTitles[key]}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick tip */}
        {activeHelp && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Quick tip
            </span>
            <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
              {activeHelp.quickTip}
            </p>
            <p className="mt-1 text-[11px] text-neutral-400">
              {activeHelp.estimatedTime}
            </p>
          </div>
        )}

        {/* Resources */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Resources
          </span>
          <div className="mt-1.5 space-y-1">
            {resources.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
