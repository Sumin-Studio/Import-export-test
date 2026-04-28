"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { StoryboardBeat } from "@/walkthrough/data/storyboard-beats";

interface StoryboardFullScreenProps {
  beat: StoryboardBeat;
  prevBeat: StoryboardBeat | null;
  nextBeat: StoryboardBeat | null;
  total: number;
}

const arrowButtonClass =
  "flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg ring-1 ring-slate-200/50 hover:bg-white hover:text-slate-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#1F68DD] focus:ring-offset-2 transition-all cursor-pointer touch-manipulation select-none";

function ArrowLeft({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  if (disabled) {
    return (
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-300 cursor-not-allowed select-none"
        aria-hidden
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={arrowButtonClass}
      aria-label="Previous screen"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function ArrowRight({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  if (disabled) {
    return (
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-300 cursor-not-allowed select-none"
        aria-hidden
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={arrowButtonClass}
      aria-label="Next screen"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export function StoryboardFullScreen({
  beat,
  prevBeat,
  nextBeat,
  total,
}: StoryboardFullScreenProps) {
  const router = useRouter();

  const goNext = useCallback(() => {
    if (nextBeat) router.push(`/app/storyboard/${nextBeat.id}`);
  }, [nextBeat, router]);

  const goPrev = useCallback(() => {
    if (prevBeat) router.push(`/app/storyboard/${prevBeat.id}`);
  }, [prevBeat, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        router.push("/app/storyboard");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, router]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 text-slate-900">
      {/* Top bar: back to grid + counter */}
      <header className="flex shrink-0 items-center justify-between px-4 py-3 md:px-8">
        <Link
          href="/app/storyboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F68DD] focus:ring-offset-2 rounded"
        >
          ← Back to grid
        </Link>
        <span className="text-sm text-slate-400">
          {beat.order} of {total}
        </span>
      </header>

      {/* Main content area - no horizontal line */}
      <main className="flex flex-1 min-h-0 relative">
        {/* Content first in DOM so arrows can sit on top and receive clicks */}
        <div className="flex flex-1 min-w-0 flex-col items-center justify-center px-20 py-6 md:px-28 md:py-8 pointer-events-none">
          <div className="pointer-events-auto max-w-3xl">
            <h1 className="text-2xl font-bold text-slate-900 text-center sm:text-3xl md:text-4xl">
              {beat.title}
            </h1>
            {beat.subtitle && (
              <p className="mt-2 text-base text-slate-500 text-center md:text-lg">
                {beat.subtitle}
              </p>
            )}
            <div className="mt-6 md:mt-8 w-full">
              <p className="text-slate-600 leading-relaxed text-center text-base md:text-lg">
                {beat.body}
              </p>
            </div>
          </div>
        </div>

        {/* Arrows on top so they receive clicks (higher z-index, after content) */}
        <div
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 md:left-6 pointer-events-auto"
          style={{ touchAction: "manipulation" }}
        >
          <ArrowLeft onClick={goPrev} disabled={!prevBeat} />
        </div>
        <div
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 md:right-6 pointer-events-auto"
          style={{ touchAction: "manipulation" }}
        >
          <ArrowRight onClick={goNext} disabled={!nextBeat} />
        </div>
      </main>

      {/* Optional hint */}
      <footer className="shrink-0 py-2 text-center text-xs text-slate-400">
        Use arrow keys or click the arrows to move · Esc to return to grid
      </footer>
    </div>
  );
}
