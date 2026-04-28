"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useNavigation } from "@/app/contexts/NavigationContext";

/**
 * Figma “Suggestions” tile on cash flow home (node 30:19924) — bills insight, not Pay a supplier.
 */
export function JustPayBillsSuggestionWidget({ className = "" }: { className?: string }) {
  const { openPanel } = useNavigation();

  return (
    <div className={`w-full max-w-[440px] xl:max-w-none ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 shrink-0 text-[#0078c8]" strokeWidth={2} aria-hidden />
          <h2 className="text-[17px] font-bold leading-6 text-content-primary">
            Suggestions <span className="font-normal text-content-secondary">1 of 2</span>
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous suggestion"
            className="flex size-8 items-center justify-center rounded-full text-brand-primary hover:bg-[rgba(0,10,30,.05)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next suggestion"
            className="flex size-8 items-center justify-center rounded-full text-brand-primary hover:bg-[rgba(0,10,30,.05)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 pt-[22px] shadow-sm ring-1 ring-[#e6e7e9]">
        <h3 className="text-[17px] font-bold leading-6 text-[#000a1e]">
          Higher than usual bills due next week
        </h3>
        <p className="mt-2 text-[15px] leading-6 text-[#404756]">
          You have more bills scheduled over the next seven days than is typical for your business.
          Review them to stay on top of cash flow.
        </p>
        <div className="my-[18px] h-px w-full bg-[#e6e7e9]" />
        <div className="flex flex-wrap gap-2">
          <Link
            href="/experience/bills-home"
            className="inline-flex h-[30px] items-center justify-center rounded-full bg-[#0078c8] px-4 text-[13px] font-bold leading-5 text-white hover:bg-[#006cb4]"
          >
            Open bills
          </Link>
          <button
            type="button"
            onClick={() => openPanel("jax", "just-pay", true)}
            className="inline-flex h-[30px] items-center justify-center rounded-full border border-[#cdd5e0] bg-white px-4 text-[13px] font-bold leading-5 text-[#000a1e] hover:bg-[#eff1f2]"
          >
            Discuss with JAX
          </button>
        </div>
      </div>
    </div>
  );
}
