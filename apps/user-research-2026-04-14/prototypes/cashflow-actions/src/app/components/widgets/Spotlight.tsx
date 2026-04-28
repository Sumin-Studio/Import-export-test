"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { useJaxChat } from "@/app/contexts/JaxChatContext";
import {
  getMelioHandoffForPlanKey,
  isApplyPlanMelioHandoffEnabled,
  seedJaxThreadForMelioHandoff,
} from "@/app/lib/cashflowMelioIteration5";
import { MoreButton } from "@/app/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import SpotlightOverflow from "./overflow/SpotlightOverflow";
import { ActionPlanModal } from "./ActionPlanModal";
import { ACTION_PLAN_CONFIGS } from "./actionPlanModalConfigs";
import { CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW } from "./cashflowActionPlanSpotlightPreview";
import { Arrow } from "@/app/components/ui/icons";
import JaxSparkleIcon from "@/app/assets/images/icon-sparkle-colour-small.svg";
import { XERO_PROTECT_LATEST_BILLS } from "@/lib/xero-protect-latest-prototype";

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
    ...CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW["cashflow-low"],
    primaryLabel: "Make a plan",
    primaryHref: "/cashflow",
    actionPlanConfigKey: "cashflow-low",
  },
  {
    id: "cashflow-shortfall",
    ...CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW["cashflow-shortfall"],
    primaryLabel: "Make a plan",
    primaryHref: "/cashflow",
    actionPlanConfigKey: "cashflow-shortfall",
  },
  {
    id: "cashflow-critical",
    ...CASHFLOW_ACTION_PLAN_SPOTLIGHT_PREVIEW["cashflow-critical"],
    primaryLabel: "Make a plan",
    primaryHref: "/cashflow",
    actionPlanConfigKey: "cashflow-critical",
  },
];

export const XERO_PROTECT_SUGGESTIONS: SuggestionItem[] = [
  {
    id: "xero-protect-review",
    title: "8 bills may need review",
    body: "8 bills have been flagged with elevated risk signals, including possible duplicates, first-time suppliers, and unusual amounts. Review them before approving payment.",
    primaryLabel: "Review bills",
    primaryHref: `${XERO_PROTECT_LATEST_BILLS}?tab=all&from=spotlight`,
  },
];

interface SpotlightProps {
  className?: string;
  isCustomising?: boolean;
  initialSuggestions?: SuggestionItem[];
}

export function Spotlight({
  className = "",
  isCustomising = false,
  initialSuggestions,
}: SpotlightProps) {
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

  const searchParams = useSearchParams();
  const isDiyaDemo = isApplyPlanMelioHandoffEnabled(searchParams);
  const { openPanel } = useNavigation();
  const { appendMessage, clearThread } = useJaxChat();

  const handleSpotlightApplyPlanMelio = useCallback(() => {
    if (!actionPlanModalConfigKey) return;
    const payload = getMelioHandoffForPlanKey(actionPlanModalConfigKey);
    if (!payload) return;
    seedJaxThreadForMelioHandoff(payload, { clearThread, appendMessage });
    openPanel("jax", payload.jaxSubPanel, true);
  }, [actionPlanModalConfigKey, appendMessage, clearThread, openPanel]);

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
        className={`relative flex h-[251px] w-[440px] lg:min-w-[440px] flex-col overflow-hidden rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        {/* Header: JAX icon, title, counter, carousel buttons */}
        <div className="pb-3 pt-4">
          <div className="flex w-full items-center justify-between gap-3 overflow-hidden px-6">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Image
                src={JaxSparkleIcon}
                alt=""
                width={32}
                height={32}
                className="flex-shrink-0"
                aria-hidden
              />
              <h3 className="text-[17px]/[28px] font-bold">Suggestions</h3>
              {total > 1 && (
                <span className="text-[13px]/[20px] text-content-secondary">
                  {displayIndex} of {total}
                </span>
              )}
            </div>
            {total > 1 && (
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
          <div className="mx-6 mt-3 border-b border-[#E6E7E9]" aria-hidden />
        </div>

        {/* Content: suggestion title and body; action buttons fixed at bottom left */}
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
        onApplyPlan={
          isDiyaDemo &&
          actionPlanModalConfigKey &&
          getMelioHandoffForPlanKey(actionPlanModalConfigKey)
            ? handleSpotlightApplyPlanMelio
            : undefined
        }
      />
    </CustomizationOverlay>
  );
}

export default Spotlight;
