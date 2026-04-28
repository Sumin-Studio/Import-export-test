"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Collapsible History and notes module used under Online payments (Default settings, Connected services, etc.).
 */
export function OnlinePaymentsHistoryNotes() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="mt-5">
      <div className="overflow-hidden rounded-[4px] border border-[#C2C4CB] bg-white">
        <div className="flex h-[60px] w-full items-center gap-3 px-[18px]">
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-3 text-left -mr-1 rounded-sm py-2 pr-1"
            onClick={() => setHistoryOpen(!historyOpen)}
            aria-expanded={historyOpen}
          >
            <ChevronDown
              className={`size-[18px] shrink-0 text-content-secondary transition-transform duration-200 ${
                historyOpen ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden
            />
            <span className="min-w-0 flex-1 text-[15px] font-bold text-content-primary">
              History and notes
            </span>
          </button>
          <button
            type="button"
            className="shrink-0 inline-flex h-8 items-center rounded-[3px] border border-solid border-[#A6A9B0] bg-white px-3 text-[13px] font-bold text-brand-primary hover:bg-[#f5f5f5] active:bg-[#eee] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F68DD]"
          >
            Add note
          </button>
        </div>
        {historyOpen ? (
          <div
            className="border-t border-[#e1e2e5] bg-white px-[60px] py-4 text-[15px] leading-relaxed text-[#000A1E]"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            No notes yet. Use Add note to record changes to your payment configuration.
          </div>
        ) : null}
      </div>
    </div>
  );
}
