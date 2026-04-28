"use client";

import { useEffect } from "react";

export type OnboardingStep = {
  id: string;
  title: string;
};

/** Left sidebar step list — matches `dev-onboarding-prototype` (`.setup-sidebar` + `.task-card`). */
export default function OnboardingModal({
  open,
  onClose,
  title,
  steps,
  activeIndex,
  children,
  footer,
  exitLabel = "Save and exit",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  steps: OnboardingStep[];
  activeIndex: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  exitLabel?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex flex-col bg-white"
    >
      <header className="flex h-[60px] items-center justify-between border-b border-border-secondary px-6">
        <div className="truncate text-[14px] font-bold text-content-primary">
          {title}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[14px] font-bold text-action-primary hover:underline"
        >
          {exitLabel}
        </button>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-[384px] flex-shrink-0 overflow-y-auto border-r border-[#ccced2] bg-[#f2f3f4] p-5 md:block">
          <StepList steps={steps} activeIndex={activeIndex} />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[640px] px-6 py-10">
              {children}
            </div>
          </div>

          {footer && (
            <div className="border-t border-border-secondary bg-white px-6 py-4">
              <div className="mx-auto flex w-full max-w-[640px] items-center justify-between gap-3">
                {footer}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function StepList({
  steps,
  activeIndex,
}: {
  steps: OnboardingStep[];
  activeIndex: number;
}) {
  const cappedIndex = Math.max(
    0,
    Math.min(activeIndex, Math.max(0, steps.length - 1)),
  );

  return (
    <nav className="w-full" aria-label="Steps">
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {steps.map((step, i) => {
          const isActive = i === cappedIndex;
          const isDone = i < cappedIndex;
          return (
            <li key={step.id}>
              <div
                className={[
                  "flex cursor-default items-center gap-4 rounded-[3px] border-2 bg-white px-5 py-5",
                  isActive
                    ? "border-[#0078c8]"
                    : "border-[#ccced2] hover:bg-[#f7f8f9]",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                <TaskTick completed={isDone} />
                <span className="text-[15px] font-bold leading-6 text-[#000a1e]">
                  {step.title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function TaskTick({ completed }: { completed: boolean }) {
  return (
    <div
      className={[
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        completed
          ? "border-[#00823c] bg-[#00823c]"
          : "border-[#a6a9b0] bg-white",
      ].join(" ")}
      aria-hidden
    >
      <svg
        viewBox="0 0 12 9"
        className="h-3 w-3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4L4.5 7.5L11 1"
          stroke={completed ? "#ffffff" : "#a6a9b0"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
