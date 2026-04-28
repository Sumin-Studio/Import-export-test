"use client";

import { X, ChevronRight, ThumbsUp, ThumbsDown, ExternalLink, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
  SheetClose,
} from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { getSidePanelData } from "@/lib/data-store";
import type { Client } from "@/lib/data-store";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Render description with **bold** segments as <strong> */
function renderDescription(description: string) {
  const parts = description.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

interface QuickViewSheetProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewSheet({
  client,
  open,
  onOpenChange,
}: QuickViewSheetProps) {
  if (!client) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Figma "Side panel (with no Search)": 400×972 — frame node 5-11737 */}
      <SheetContent side="right" className="flex min-h-0 w-full max-w-[420px] flex-col p-0">
        {/* Side panel Header: Books (smaller/lighter), Acme Corp (large bold), menu + close flush top-right */}
        <SheetHeader className="flex shrink-0 flex-col gap-0 border-b border-border-subtle pl-5 pr-3 pt-3 pb-3">
          <div className="flex w-full items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-[13px] font-medium leading-[1.45] text-text-muted" aria-hidden>
              Books
            </p>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-small text-text-muted hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer"
                aria-label="Menu"
              >
                <Icon name="Menu" size="small" />
              </button>
              <SheetClose
                className="flex size-8 items-center justify-center rounded-small text-text-muted hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden />
              </SheetClose>
            </div>
          </div>
          <div className="pr-8 pt-2">
            <SheetTitle className="text-[length:var(--typography-font-size-22)] font-bold leading-[1.15] text-text-default">
              {client.entityName}
            </SheetTitle>
          </div>
        </SheetHeader>
        {/* Scroll container: Figma layout — padding aligned to header (pl-20px pr-8px), tighter vertical */}
        <SheetBody className="min-h-0 flex-1 overflow-x-auto overflow-y-auto p-0">
          {(() => {
            const panel = getSidePanelData(client);
            return (
              <div className="flex flex-col min-w-0 pl-5 pr-5 py-5">
                {/* Account details: full-width bottom divider */}
                <div className="-ml-5 -mr-5 w-[calc(100%+2.5rem)] border-b border-border-subtle shrink-0">
                  <div className="flex flex-col gap-3 pl-5 pr-5 pb-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-text-muted">Reporting period</span>
                      <span className="text-body-standard-regular text-text-default">{panel.reportingPeriodLabel}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-text-muted">Internal due date</span>
                      <span className="text-body-standard-regular text-text-default">{formatDate(panel.internalDueDate)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-text-muted">Staff</span>
                      <div className="flex items-center gap-2">
                        <Avatar name={panel.staffName} size="xsmall" />
                        <span className="text-body-standard-regular text-text-default">{panel.staffName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main signal: blue bar flush left, full-width section */}
                <section className="mt-0 -ml-5 -mr-5 w-[calc(100%+2.5rem)] flex flex-col relative shrink-0">
                  <div className="absolute inset-y-0 left-0 w-[5px] shrink-0 bg-[var(--color-action-default)]" aria-hidden />
                  <div className="pl-5 pr-5 py-4 min-w-0">
                    <h4 className="text-[17px] font-semibold leading-[1.3] text-text-default">Main signal</h4>
                    <p className="mt-2 text-body-standard-semibold text-text-default break-words">
                      {panel.mainSignal.title}
                    </p>
                    <p className="mt-2 text-body-small-regular text-text-default leading-relaxed break-words">
                      {renderDescription(panel.mainSignal.description)}
                    </p>
                    {panel.mainSignal.viewAnalysisLabel && (
                      <button
                        type="button"
                        className="mt-2 flex items-center gap-1.5 text-body-small-semibold text-[var(--color-action-default)] hover:underline cursor-pointer"
                      >
                        <Plus className="size-3.5 shrink-0" aria-hidden />
                        {panel.mainSignal.viewAnalysisLabel}
                      </button>
                    )}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          className="rounded-small p-1.5 text-text-faint hover:bg-background-secondary hover:text-text-default cursor-pointer"
                          aria-label="Helpful"
                        >
                          <ThumbsUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-small p-1.5 text-text-faint hover:bg-background-secondary hover:text-text-default cursor-pointer"
                          aria-label="Not helpful"
                        >
                          <ThumbsDown className="size-4" />
                        </button>
                      </div>
                      {panel.mainSignal.ctaLabel && (
                        <button
                          type="button"
                          className="flex shrink-0 items-center gap-1.5 rounded-medium bg-[var(--color-action-default)] px-4 py-2 text-button-small-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-action-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer whitespace-nowrap"
                        >
                          {panel.mainSignal.ctaLabel}
                          <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                {/* Contributing signals: full-width top divider and row dividers; section title large bold */}
                <div className="mt-0 -ml-5 -mr-5 w-[calc(100%+2.5rem)] border-t border-border-subtle shrink-0">
                  <h4 className="text-[17px] font-semibold leading-[1.3] text-text-default pl-5 pr-5 pt-4 pb-2 break-words">Contributing signals</h4>
                  <ul className="flex flex-col">
                    {panel.contributingSignals.map((sig, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 border-b border-border-subtle py-3 pl-5 pr-5 text-left hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-action-focus)] cursor-pointer min-w-0"
                        >
                          <div className="min-w-0 flex-1 flex flex-col gap-0.5 overflow-hidden">
                            <span className="text-body-small-semibold text-text-default break-words">{sig.title}</span>
                            <span className="text-body-small-regular text-text-muted break-words">{sig.description}</span>
                          </div>
                          <ChevronRight className="size-4 shrink-0 text-text-faint" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
