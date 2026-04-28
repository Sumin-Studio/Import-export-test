"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { XERO_PROTECT_LATEST_ROOT } from "@/lib/xero-protect-latest-prototype";
import { useCallback, useState } from "react";
import { CustomizationOverlay } from "./CustomizationOverlay";
import JaxSparkleIcon from "@/app/assets/images/icon-sparkle-colour-small.svg";

interface BillsHomeAgentTrioProps {
  isCustomising?: boolean;
  className?: string;
}

/**
 * Full-width strip replacing the top-left Spotlight tile: three columns that match
 * dashboard widget typography — one surface, dividers, no nested “marketing” cards.
 */
export default function BillsHomeAgentTrio({
  isCustomising = false,
  className = "",
}: BillsHomeAgentTrioProps) {
  const router = useRouter();
  const [justPayQuery, setJustPayQuery] = useState("");

  const goJustPay = useCallback(() => {
    const q = justPayQuery.trim();
    const url = q ? `/just-pay/prototype/2?q=${encodeURIComponent(q)}` : "/just-pay/prototype/2";
    router.push(url);
  }, [justPayQuery, router]);

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative w-full max-w-none overflow-hidden rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="grid grid-cols-1 divide-y divide-[#E6E7E9] md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* Cash Flow Actions — same Spotlight content as default dashboard */}
          <Link
            href="/just-pay/prototype/2?spotlight=default"
            className="group flex min-h-[232px] flex-col px-5 py-5 transition-colors hover:bg-[rgba(0,10,30,0.03)] md:min-h-[248px] md:px-6 md:py-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <Image
                  src={JaxSparkleIcon}
                  alt=""
                  width={24}
                  height={24}
                  className="shrink-0"
                  aria-hidden
                />
                <h3 className="text-[17px]/[28px] font-bold text-content-primary">Suggestions</h3>
              </div>
              <span className="shrink-0 text-[13px]/[20px] text-content-secondary">1 of 3</span>
            </div>
            <div className="mx-0 mt-3 border-b border-[#E6E7E9]" aria-hidden />
            <h4 className="mt-4 text-[17px]/[28px] font-bold text-content-primary">
              Cash flow running low next week
            </h4>
            <p className="mt-2 line-clamp-3 flex-1 text-[13px]/[20px] text-content-secondary">
              Based on cash flow projections, you will only have 8 days of cash on hand starting next
              week. Let&apos;s make a plan that smooths out your cash flow.
            </p>
            <span className="mt-4 inline-flex w-fit rounded-[48px] bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition group-hover:bg-brand-secondary">
              Open dashboard
            </span>
          </Link>

          {/* Xero Protect */}
          <Link
            href={XERO_PROTECT_LATEST_ROOT}
            className="group flex min-h-[232px] flex-col px-5 py-5 transition-colors hover:bg-[rgba(0,10,30,0.03)] md:min-h-[248px] md:px-6 md:py-6"
          >
            <h3 className="text-[17px]/[28px] font-bold text-content-primary">Xero Protect</h3>
            <div className="mx-0 mt-3 border-b border-[#E6E7E9]" aria-hidden />
            <h4 className="mt-4 text-[17px]/[28px] font-bold text-content-primary">
              8 bills may need review
            </h4>
            <p className="mt-2 line-clamp-4 flex-1 text-[13px]/[20px] text-content-secondary">
              Elevated risk signals — possible duplicates, first-time suppliers, unusual amounts.
              Review before you approve payment.
            </p>
            <span className="mt-4 text-[13px] font-bold text-brand-primary group-hover:underline">
              Review bills
            </span>
          </Link>

          {/* Just Pay */}
          <div className="flex min-h-[232px] flex-col px-5 py-5 md:min-h-[248px] md:px-6 md:py-6">
            <h3 className="text-[17px]/[28px] font-[700] text-content-primary">Pay a supplier</h3>
            <div className="mx-0 mt-3 border-b border-[#E6E7E9]" aria-hidden />
            <p className="mt-4 text-[13px]/[20px] text-content-secondary">
              Skip manual entry — describe who to pay and continue in Just Pay.
            </p>
            <label className="mt-4 flex flex-col gap-2">
              <span className="sr-only">Payment request</span>
              <input
                type="text"
                value={justPayQuery}
                onChange={(e) => setJustPayQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goJustPay();
                }}
                placeholder="Who, how much, when…"
                className="w-full rounded-[3px] border border-border-primary bg-white px-3 py-2 text-[13px]/[20px] text-content-primary placeholder:text-content-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                disabled={isCustomising}
              />
            </label>
            <button
              type="button"
              onClick={goJustPay}
              disabled={isCustomising}
              className="mt-3 h-[30px] w-full rounded-full bg-brand-primary text-[13px] font-bold leading-5 text-white transition-colors hover:bg-brand-secondary disabled:opacity-50"
            >
              Make a payment
            </button>
          </div>
        </div>
      </div>
    </CustomizationOverlay>
  );
}
