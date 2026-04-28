"use client";

import { useRouter } from "next/navigation";
import { SuggestionCard } from "@/components/suggestion-card";

function SparklesIcon() {
  return (
    <svg
      className="text-brand-primary"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2l1.2 4.2L17 7l-3.8 1.8L12 13l-1.2-4.2L7 7l3.8-1.8L12 2zm7 7l.8 2.8L22 12l-2.2 1.2L19 16l-1.2-2.2L16 12l2.2-1.2L19 9zm-14 0l.8 2.8L8 12l-2.2 1.2L5 16l-1.2-2.2L2 12l2.2-1.2L5 9z"
        fill="currentColor"
      />
    </svg>
  );
}

interface JustPaySuggestionsWidgetProps {
  className?: string;
}

/**
 * Suggestions strip + Pay a supplier card (Figma “Suggestions 1 of 2” pattern).
 */
export function JustPaySuggestionsWidget({
  className = "",
}: JustPaySuggestionsWidgetProps) {
  const router = useRouter();

  return (
    <div className={`w-full max-w-[440px] xl:max-w-none ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SparklesIcon />
          <h2 className="text-[17px] font-bold leading-6 text-content-primary">
            Suggestions{" "}
            <span className="font-normal text-content-secondary">1 of 2</span>
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
      <SuggestionCard
        showTitle={false}
        paymentDetailsStep
        onPaySupplier={(details) => {
          if (!details) return;
          const q = new URLSearchParams({
            supplier: details.supplierName,
            amount: details.amountDisplay,
            currency: details.currencyCode,
            returnTo: details.returnHref,
          });
          router.push(`/just-pay/make-payment?${q.toString()}`);
        }}
      />
    </div>
  );
}

export default JustPaySuggestionsWidget;
