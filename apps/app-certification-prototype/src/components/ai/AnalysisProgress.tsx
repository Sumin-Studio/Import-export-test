"use client";

import { useEffect, useRef, useState } from "react";
import { ANALYSIS_STEPS } from "@/lib/mock/analysis";

const STEP_MS = 650;

export default function AnalysisProgress({
  onDone,
}: {
  onDone: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (activeIndex >= ANALYSIS_STEPS.length) {
      const t = setTimeout(() => onDoneRef.current(), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIndex((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <div className="mx-auto max-w-[560px] rounded-lg border border-ai-border bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-ai-surface text-ai-accent">
          <span className="absolute inset-0 ai-shimmer" aria-hidden />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-[15px] font-bold text-content-primary">
            Analysing your app
          </div>
          <div className="text-[12px] text-content-secondary">
            This usually takes about 5 seconds.
          </div>
        </div>
      </div>

      <ol className="flex flex-col gap-3">
        {ANALYSIS_STEPS.map((step, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <li key={step.id} className="flex items-start gap-3">
              <StepIcon done={done} active={active} />
              <div className="min-w-0">
                <div
                  className={`text-[13px] font-bold ${
                    done || active
                      ? "text-content-primary"
                      : "text-content-secondary/60"
                  } ${active ? "step-pulse" : ""}`}
                >
                  {step.label}
                </div>
                <div
                  className={`text-[12px] ${
                    done || active
                      ? "text-content-secondary"
                      : "text-content-secondary/40"
                  }`}
                >
                  {step.detail}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepIcon({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-positive/15">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="rgb(0 138 62)"
          strokeWidth="2"
        >
          <path
            d="M2 6l3 3 5-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (active) {
    return (
      <div className="mt-0.5 h-5 w-5 flex-shrink-0 animate-spin rounded-full border-2 border-ai-accent border-t-transparent" />
    );
  }
  return (
    <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 border-border-secondary" />
  );
}
