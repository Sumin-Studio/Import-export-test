"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { TOTAL_SLIDES, slides } from "@/walkthrough/data/slides";
import { useWalkthroughPath } from "@/walkthrough/context/walkthrough-path-context";

interface SlideLayoutProps {
  slideNumber: number;
  children: React.ReactNode;
  dark?: boolean;
}

export default function SlideLayout({
  slideNumber,
  children,
  dark = false,
}: SlideLayoutProps) {
  const router = useRouter();
  const { basePath, label } = useWalkthroughPath();
  const progress = (slideNumber / TOTAL_SLIDES) * 100;
  const hasPrev = slideNumber > 1;
  const hasNext = slideNumber < TOTAL_SLIDES;
  const currentSlide = slides[slideNumber - 1];

  const goNext = useCallback(() => {
    if (hasNext) router.push(`${basePath}/${slideNumber + 1}`);
  }, [hasNext, slideNumber, router, basePath]);

  const goPrev = useCallback(() => {
    if (hasPrev) router.push(`${basePath}/${slideNumber - 1}`);
  }, [hasPrev, slideNumber, router, basePath]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        dark ? "bg-[#334155] text-white" : "bg-white text-[#0f172a]"
      }`}
    >
      <div className={`shrink-0 h-1 w-full ${dark ? "bg-white/20" : "bg-slate-100"}`}>
        <div
          className="h-full bg-[#1F68DD] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col">{children}</main>

      <nav
        className={`sticky bottom-0 z-40 border-t ${
          dark
            ? "bg-[#334155]/95 border-white/20 backdrop-blur-sm"
            : "bg-white/95 border-slate-200 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="w-32">
            {hasPrev ? (
              <Link
                href={`${basePath}/${slideNumber - 1}`}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                  dark ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {slides.map((s) => (
              <Link
                key={s.number}
                href={`${basePath}/${s.number}`}
                title={s.title}
                className={`block rounded-full transition-all duration-300 ${
                  s.number === slideNumber
                    ? "w-6 h-2 bg-[#1F68DD]"
                    : `w-2 h-2 ${dark ? "bg-white/30 hover:bg-white/50" : "bg-slate-200 hover:bg-slate-400"}`
                }`}
              />
            ))}
          </div>

          <div className="w-32 text-right">
            {hasNext ? (
              <Link
                href={`${basePath}/${slideNumber + 1}`}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                  dark ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-x-3 pb-2 text-xs ${dark ? "text-white/40" : "text-slate-400"}`}>
          {label && <span>{label} &middot; </span>}
          <span>Step {slideNumber} of {TOTAL_SLIDES}</span>
          {currentSlide && <span>&middot; {currentSlide.title}</span>}
          <span>&middot;</span>
          <Link
            href="/app/process"
            className={dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"}
          >
            The process
          </Link>
          <span>&middot;</span>
          <Link
            href="/app/storyboard"
            className={dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"}
          >
            Storyboard
          </Link>
          {basePath === "/app/walkthrough" && (
            <>
              <span>&middot;</span>
              <Link
                href="/app/story/1"
                className={dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"}
              >
                Diya Review
              </Link>
            </>
          )}
          {basePath === "/app/story" && (
            <>
              <span>&middot;</span>
              <Link
                href="/app/walkthrough/1"
                className={dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"}
              >
                Full walkthrough
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
