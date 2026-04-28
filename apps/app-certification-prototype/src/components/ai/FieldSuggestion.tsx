"use client";

import { useState, type ReactNode } from "react";
import type { Suggestion } from "@/lib/mock/analysis";
import SourceBadge from "./SourceBadge";
import ConfidencePill from "./ConfidencePill";
import JaxSparklesIcon from "./JaxSparklesIcon";

export type SuggestionState = "suggested" | "accepted" | "edited" | "dismissed";

function EllipsisMenuButton({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={expanded ? "Hide explanation" : "Why this appeared"}
      title="Why this appeared"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-content-primary hover:bg-white/90"
    >
      <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <circle cx="3" cy="8" r="1.35" />
        <circle cx="8" cy="8" r="1.35" />
        <circle cx="13" cy="8" r="1.35" />
      </svg>
    </button>
  );
}

function DismissXButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss suggestion"
      title="Dismiss suggestion"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-content-secondary hover:bg-background-tertiary hover:text-content-primary"
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

export default function FieldSuggestion<T>({
  label,
  suggestion,
  state,
  onStateChange,
  children,
  optional,
  variant = "card",
}: {
  label: string;
  suggestion: Suggestion<T>;
  state: SuggestionState;
  onStateChange: (state: SuggestionState) => void;
  children: ReactNode;
  optional?: boolean;
  /** `flush`: no outer card chrome — use inside a parent panel (e.g. scope list) to avoid double borders. */
  variant?: "card" | "flush";
}) {
  const [showRationale, setShowRationale] = useState(false);

  const canExplain = state === "suggested" || state === "edited";

  const outerBorder =
    state === "suggested"
      ? "border-border-secondary shadow-[0_1px_2px_rgba(0,10,30,0.04)]"
      : state === "accepted"
        ? "border-positive/30"
        : state === "edited"
          ? "border-border-primary"
          : "border-border-secondary";

  const pillShell =
    state === "suggested"
      ? "border-ai-border/60 bg-ai-surface"
      : state === "accepted"
        ? "border-positive/25 bg-positive/10"
        : state === "edited"
          ? "border-border-primary/50 bg-action-tertiary"
          : "border-transparent bg-background-tertiary";

  const isFlush = variant === "flush";
  const rootClass = isFlush
    ? "relative px-4 py-3"
    : `relative rounded-xl border bg-white ${outerBorder}`;
  const innerClass = isFlush ? "px-0 py-0" : "px-4 py-3";
  const childrenSectionClass = isFlush
    ? "border-t border-border-secondary px-0 py-3"
    : "border-t border-border-secondary px-4 py-3";

  return (
    <div className={rootClass}>
      <div className={innerClass}>
        <div className="flex flex-col gap-2">
          <div className="min-w-0">
            {state !== "dismissed" ? (
              state === "accepted" ? (
                <div
                  className={`flex w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-1.5 ${pillShell}`}
                >
                  <span className="inline-flex shrink-0 text-positive" aria-hidden>
                    <svg width={16} height={16} viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-6"
                        stroke="rgb(0 138 62)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[13px] font-semibold leading-[1.35] text-content-primary">
                    {label}
                    {optional && (
                      <span className="ml-1 font-normal text-content-secondary">
                        (optional)
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <div
                  className={`flex w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-1.5 ${pillShell}`}
                >
                  {state === "suggested" && (
                    <JaxSparklesIcon className="shrink-0 text-brand-primary" />
                  )}
                  {state === "edited" && (
                    <JaxSparklesIcon className="shrink-0 text-brand-primary opacity-80" />
                  )}
                  <span className="min-w-0 flex-1 break-words text-[13px] font-semibold leading-[1.35] text-content-primary">
                    {label}
                    {optional && (
                      <span className="ml-1 font-normal text-content-secondary">
                        (optional)
                      </span>
                    )}
                  </span>
                  {canExplain && (
                    <EllipsisMenuButton
                      expanded={showRationale}
                      onClick={() => setShowRationale((v) => !v)}
                    />
                  )}
                </div>
              )
            ) : (
              <div className="text-[13px] font-semibold leading-snug text-content-secondary">
                {label}
                {optional && (
                  <span className="ml-1 font-normal text-content-secondary/80">
                    (optional)
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1">
            {state === "suggested" && (
              <button
                type="button"
                onClick={() => onStateChange("accepted")}
                className="h-9 rounded-full bg-brand-primary px-3.5 text-[12px] font-bold text-white hover:opacity-90"
              >
                Accept
              </button>
            )}
            {state === "accepted" && (
              <span className="inline-flex items-center gap-1 px-1 text-[12px] font-bold text-positive">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="rgb(0 138 62)"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    d="M2 6l3 3 5-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Accepted
              </span>
            )}
            {state === "edited" && (
              <span className="px-1 text-[12px] font-bold text-action-primary">Edited</span>
            )}
            {state !== "dismissed" && (
              <DismissXButton onClick={() => onStateChange("dismissed")} />
            )}
            {state === "dismissed" && (
              <button
                type="button"
                onClick={() => onStateChange("suggested")}
                className="h-9 rounded-full border border-ai-border bg-ai-surface px-3 text-[12px] font-bold text-brand-primary hover:bg-white"
              >
                Restore suggestion
              </button>
            )}
          </div>
        </div>

        {(state === "suggested" || state === "edited" || state === "accepted") && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SourceBadge
              label={suggestion.sourceLabel}
              source={suggestion.source}
              url={suggestion.sourceUrl}
            />
            <ConfidencePill confidence={suggestion.confidence} />
          </div>
        )}

        {showRationale && canExplain && (
          <div className="mt-3 rounded-xl border border-border-secondary bg-white p-3 shadow-[0_4px_14px_rgba(0,10,30,0.08)]">
            <div className="rounded-lg bg-ai-rationale px-3.5 py-3">
              <div className="mb-1.5 text-[13px] font-bold text-content-primary">
                Why this appeared?
              </div>
              <p className="text-[13px] leading-snug text-content-primary">
                {suggestion.rationale}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={childrenSectionClass}>{children}</div>
    </div>
  );
}
