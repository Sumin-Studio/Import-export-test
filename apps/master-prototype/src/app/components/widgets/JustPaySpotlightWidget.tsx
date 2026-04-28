"use client";

import { CustomizationOverlay } from "./CustomizationOverlay";
import { useRouter } from "next/navigation";
import { SuggestionCard } from "@/components/suggestion-card";

interface JustPaySpotlightWidgetProps {
  className?: string;
  isCustomising?: boolean;
}

/** Top-left “Suggestions” slot: Katrina’s Just Pay CTA → opens JAX (just-pay thread). */
export default function JustPaySpotlightWidget({
  className = "",
  isCustomising = false,
}: JustPaySpotlightWidgetProps) {
  const router = useRouter();

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`w-full max-w-[440px] ${isCustomising ? "pointer-events-none" : ""} ${className}`}
      >
        <SuggestionCard
          paymentDetailsStep
          onPaySupplier={(details) => {
            if (!details) return;
            const q = new URLSearchParams({
              supplier: details.supplierName,
              amount: details.amountDisplay,
              currency: details.currencyCode,
              returnTo: details.returnHref,
            });
            if (details.payDate) {
              q.set("payDate", details.payDate);
            }
            router.push(`/just-pay/make-payment?${q.toString()}`);
          }}
        />
      </div>
    </CustomizationOverlay>
  );
}
