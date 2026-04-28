"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HelpItem } from "./getting-started-help-data";

interface StepTroubleshootingProps {
  items: HelpItem[];
}

export function StepTroubleshooting({ items }: StepTroubleshootingProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50/50">
      <div className="px-4 py-2.5 border-b border-neutral-200">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Common issues
        </span>
      </div>
      <div className="divide-y divide-neutral-200">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleItem(index)}
              className={cn(
                "w-full flex items-start gap-2 px-4 py-3 text-left transition-colors cursor-pointer",
                "hover:bg-neutral-100/50",
                expandedIndex === index && "bg-neutral-100/30"
              )}
            >
              {expandedIndex === index ? (
                <ChevronDown className="h-4 w-4 mt-0.5 shrink-0 text-neutral-500" />
              ) : (
                <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-neutral-400" />
              )}
              <span className="text-sm font-medium text-neutral-800 flex-1">
                {item.question}
              </span>
            </button>
            {expandedIndex === index && (
              <div className="px-4 pb-3 pl-10">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.answer}
                </p>
                {item.relatedLinks && item.relatedLinks.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-3">
                    {item.relatedLinks.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 underline"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
