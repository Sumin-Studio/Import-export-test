"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreButton } from "@/app/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import SpotlightOverflow from "./overflow/SpotlightOverflow";
import { ActionPlanModal } from "./ActionPlanModal";
import { ACTION_PLAN_CONFIGS } from "./actionPlanModalConfigs";
import { useNavigation } from "../../contexts/NavigationContext";
import { Arrow } from "@/app/components/ui/icons";
import JaxSparkleIcon from "@/app/assets/images/icon-sparkle-colour-small.svg";

export interface SuggestionItem {
  id: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  /** If set, "Make a plan" opens the shared ActionPlanModal with this config key */
  actionPlanConfigKey?: keyof typeof ACTION_PLAN_CONFIGS;
}

const CASHFLOW_SUGGESTIONS: SuggestionItem[] = [
  {
    id: "cashflow-low",
    title: "Cashflow running low next week",
    body: "Based on cashflow projections, you will only have 8 days of cash on hand starting next week. Let's make a plan that smooths out your cashflow.",
    primaryLabel: "Make a plan",
    primaryHref: "/cashflow",
    actionPlanConfigKey: "cashflow-low",
  },
  {
    id: "cashflow-shortfall",
    title: "Cashflow shortfall projected next week",
    body: "Your cash balance is projected to fall below $0 by the end of next week. Let's make a plan to avoid an overdraft.",
    primaryLabel: "Make a plan",
    primaryHref: "/cashflow",
    actionPlanConfigKey: "cashflow-shortfall",
  },
  {
    id: "cashflow-critical",
    title: "Critical cashflow shortage next week",
    body: "You have a mandatory tax payment due next week but insufficient funds to cover. Let's make a plan to avoid immediate penalties.",
    primaryLabel: "Make a plan",
    primaryHref: "/cashflow",
    actionPlanConfigKey: "cashflow-critical",
  },
];

export const XERO_PROTECT_SUGGESTIONS: SuggestionItem[] = [
  {
    id: "xero-protect-review",
    title: "8 bills may need review",
    body: "Xero Protect has flagged 8 bills with elevated risk signals, including possible duplicates, first-time suppliers, and unusual amounts. Review them before approving payment.",
    primaryLabel: "Review bills",
    primaryHref: "/xero-protect/prototype/3/bills?from=spotlight",
  },
  {
    id: "xero-protect-high-risk",
    title: "3 high-risk bills need a decision",
    body: "Three bills are marked high risk due to bank-detail changes or very unusual amounts. Confirm details or dismiss the flag with a clear audit note.",
    primaryLabel: "Review high risk",
    primaryHref: "/xero-protect/prototype/3/bills?from=spotlight",
  },
  {
    id: "xero-protect-quickview",
    title: "Use quickview to resolve flagged bills",
    body: "Open bills in quickview to compare risk context and take action faster without leaving the list. Approve, dismiss, or drill in for more detail.",
    primaryLabel: "Open quickview",
    primaryHref: "/xero-protect/prototype/3/bills?from=spotlight",
  },
];

interface SpotlightProps {
  className?: string;
  isCustomising?: boolean;
  initialSuggestions?: SuggestionItem[];
  hideSparkle?: boolean;
  hideCarousel?: boolean;
  title?: string;
  hideContent?: boolean;
  customContent?: React.ReactNode;
  hideDivider?: boolean;
  /** Allow custom content to extend above the card (e.g. negative top); default clips with overflow-hidden. */
  contentOverflowVisible?: boolean;
}

export function Spotlight({
  className = "",
  isCustomising = false,
  initialSuggestions,
  hideSparkle = false,
  hideCarousel = false,
  title = "Suggestions",
  hideContent = false,
  customContent,
  hideDivider = false,
  contentOverflowVisible = false,
}: SpotlightProps) {
  const { openPanel } = useNavigation();
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>(() => {
    if (initialSuggestions) return initialSuggestions;
    if (typeof window !== "undefined" && window.location.pathname.includes("/xero-protect/")) {
      return XERO_PROTECT_SUGGESTIONS;
    }
    return CASHFLOW_SUGGESTIONS;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actionPlanModalOpen, setActionPlanModalOpen] = useState(false);
  const [actionPlanModalConfigKey, setActionPlanModalConfigKey] = useState<
    keyof typeof ACTION_PLAN_CONFIGS | null
  >(null);

  const handleDismissCurrent = useCallback(() => {
    setSuggestions((prev) => {
      const next = prev.filter((_, i) => i !== currentIndex);
      setCurrentIndex(Math.min(currentIndex, Math.max(0, next.length - 1)));
      return next;
    });
  }, [currentIndex]);

  const goPrev = () =>
    setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCurrentIndex((i) => Math.min(suggestions.length - 1, i + 1));

  const current = suggestions[currentIndex];
  const total = suggestions.length;
  const displayIndex = total > 0 ? currentIndex + 1 : 0;

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-[251px] w-[440px] lg:min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          contentOverflowVisible ? "overflow-visible" : "overflow-hidden"
        } ${isCustomising ? "pointer-events-none" : ""} ${className}`}
      >
        {/* Header: JAX icon, title, counter, carousel buttons */}
        <div className={`${customContent ? "pb-0 pt-[15px]" : "pb-3 pt-4"}`}>
          <div className="flex w-full items-center justify-between gap-3 overflow-hidden px-6">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {!hideSparkle && (
                <Image
                  src={JaxSparkleIcon}
                  alt=""
                  width={32}
                  height={32}
                  className="flex-shrink-0"
                  aria-hidden
                />
              )}
              <h3 className="text-[17px]/[28px] font-bold">{title}</h3>
              {!hideCarousel && (
                <span className="text-[13px]/[20px] text-content-secondary">
                  {displayIndex} of {total}
                </span>
              )}
            </div>
            {total > 1 && !hideCarousel && (
              <div className="flex flex-shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous suggestion"
                  className="flex size-8 items-center justify-center rounded-[3px] border border-border-primary bg-white text-content-secondary transition-colors hover:bg-background-secondary disabled:opacity-50"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                >
                  <span className="scale-[-1]">
                    <Arrow />
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Next suggestion"
                  className="flex size-8 items-center justify-center rounded-[3px] border border-border-primary bg-white text-content-secondary transition-colors hover:bg-background-secondary disabled:opacity-50"
                  onClick={goNext}
                  disabled={currentIndex === total - 1}
                >
                  <Arrow />
                </button>
              </div>
            )}
          </div>
          {!hideDivider && <div className={`${hideContent ? "mx-0" : "mx-6"} ${customContent ? "mt-3" : "mt-3"} border-b border-[#E6E7E9]`} aria-hidden />}
        </div>

        {!hideContent && (
          <div className="flex min-h-0 flex-1 flex-col pl-6 pr-6 pt-1">
            {current ? (
              <>
                <h4 className="text-[17px]/[28px] font-bold text-content-primary">
                  {current.title}
                </h4>
                <p className="mt-2 text-[13px]/[20px] text-content-secondary">
                  {current.body}
                </p>
                <div className="mt-auto mb-5 flex flex-wrap items-center gap-2">
                  {current.actionPlanConfigKey ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActionPlanModalConfigKey(current.actionPlanConfigKey!);
                        setActionPlanModalOpen(true);
                      }}
                      className="inline-flex items-center rounded-[48px] bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
                    >
                      {current.primaryLabel}
                    </button>
                  ) : (
                    <Link
                      href={current.primaryHref}
                      className="inline-flex items-center rounded-[48px] bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
                    >
                      {current.primaryLabel}
                    </Link>
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (current?.id === "cashflow-critical") {
                        openPanel("jax", "cashflow-critical", true);
                      } else if (current?.id === "cashflow-shortfall") {
                        openPanel("jax", "cashflow-shortfall", true);
                      } else if (current?.id === "cashflow-low") {
                        openPanel("jax", "cashflow", true);
                      } else if (
                        current?.id === "xero-protect-review" ||
                        current?.id === "xero-protect-high-risk" ||
                        current?.id === "xero-protect-quickview"
                      ) {
                        openPanel("jax", current.id, true);
                      } else {
                        openPanel("jax");
                      }
                    }}
                  >
                    Analyse with JAX
                  </button>
                  <MoreButton
                    menu={
                      <SpotlightOverflow onDismiss={handleDismissCurrent} />
                    }
                    position={{ to: "bottom end", gap: "4px" }}
                  />
                </div>
              </>
            ) : (
              <p className="text-[13px]/[20px] text-content-secondary">
                No suggestions right now
              </p>
            )}
          </div>
        )}
        {customContent}
      </div>
      <ActionPlanModal
        key={actionPlanModalConfigKey ?? "closed"}
        isOpen={actionPlanModalOpen}
        onClose={() => {
          setActionPlanModalOpen(false);
          setActionPlanModalConfigKey(null);
        }}
        config={
          actionPlanModalConfigKey
            ? ACTION_PLAN_CONFIGS[actionPlanModalConfigKey]
            : null
        }
      />
    </CustomizationOverlay>
  );
}

export default Spotlight;
