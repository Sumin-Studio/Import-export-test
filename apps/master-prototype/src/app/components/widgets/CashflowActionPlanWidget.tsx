"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePurchasesPrototypeScenario } from "@/app/contexts/PurchasesPrototypeScenarioContext";
import { ActionPlanPanel } from "./ActionPlanPanel";
import { ACTION_PLAN_CONFIGS } from "./actionPlanModalConfigs";
import {
  getCashflowAccordionInsightBody,
  getCashflowActionPlanSpotlightPreview,
} from "./cashflowActionPlanSpotlightPreview";
import { isPurchasesPrototypeV4OrLater } from "@/app/lib/purchases-prototype-flags";

const CHART_SECTION_ID = "purchases-cashflow-action-plan-chart";

/** Running low, shortfall, critical: chart opens on **Current** (below-threshold / below-$0 story); chart-only stays **Proposed**. */
function defaultShowPlannedForScenario(configKey: string): boolean {
  return configKey === "cashflow-chart-only";
}

/**
 * Bank balance: scenario is chosen via Prototype settings in the global header on purchases overview.
 * Running low / shortfall / critical: chart first on **Current**; insight + Make a plan live in the bills accordion until “Make a plan” opens the full plan UI.
 */
export function CashflowActionPlanWidget({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const chartTitleBold = isPurchasesPrototypeV4OrLater(pathname)
    ? "Available cash"
    : "Bank balance";
  const { bankBalanceConfigKey, bankBalanceWidgetColumnSpan } =
    usePurchasesPrototypeScenario();
  const config = ACTION_PLAN_CONFIGS[bankBalanceConfigKey];
  const [showPlanned, setShowPlanned] = useState(() =>
    defaultShowPlannedForScenario(bankBalanceConfigKey)
  );
  const [planActionsOpen, setPlanActionsOpen] = useState(false);

  const spotlightPreview = getCashflowActionPlanSpotlightPreview(bankBalanceConfigKey);
  const useStackedSpotlightLayout = spotlightPreview != null;
  const showPlanActions = !useStackedSpotlightLayout || planActionsOpen;

  const isCritical = bankBalanceConfigKey === "cashflow-critical";
  const isShortfall = bankBalanceConfigKey === "cashflow-shortfall";
  const isShortfallOrCritical = isShortfall || isCritical;

  const cashflowInsightForAccordion =
    spotlightPreview != null
      ? {
          title: spotlightPreview.title,
          body:
            getCashflowAccordionInsightBody(bankBalanceConfigKey) ??
            spotlightPreview.body,
          showMakePlan: !planActionsOpen,
          onMakePlan: () => {
            setPlanActionsOpen(true);
            setShowPlanned(true);
          },
        }
      : null;

  useEffect(() => {
    setPlanActionsOpen(false);
    setShowPlanned(defaultShowPlannedForScenario(bankBalanceConfigKey));
  }, [bankBalanceConfigKey]);

  const panelProps = {
    config,
    hideChartHeaderRow: true,
    /** Show red/orange Protect markers on the bank chart (rich tooltip on hover). */
    hideChartProtectMarkers: false,
    awaitingBillsBelowChart: true,
    cashflowInsight: cashflowInsightForAccordion,
    toggleBelowChart: !useStackedSpotlightLayout,
    toggleInlineWithRecommendedTitle: useStackedSpotlightLayout,
    plannedView: showPlanned,
    onPlannedViewChange: setShowPlanned,
    chartTargetWidthPx: "full" as const,
    chartRemountKey: String(bankBalanceWidgetColumnSpan),
    showBillTableActionColumn: bankBalanceWidgetColumnSpan === 2,
    billTableScrollable: true,
    billTableMaxHeightClass: "max-h-[min(320px,50vh)]",
    recommendedActionsRowFilter: (isShortfallOrCritical
      ? "changed-only"
      : "all") as "all" | "changed-only",
    showPlanActions,
    planActionsOpen,
    chartDraggableThreshold: bankBalanceConfigKey === "cashflow-low",
    ...(useStackedSpotlightLayout
      ? {
          rootContents: true,
          className: "",
          chartSectionClassName: "order-1 px-[14px] pb-5 pt-4",
          actionsSectionClassName: "order-3 mt-3 px-[14px] pb-5 pt-0",
        }
      : {
          className: "",
        }),
  };

  return (
    <div className={`relative w-full min-w-0 rounded-xl bg-white ${className}`}>
      <div className="flex items-start justify-between gap-4 px-6 pb-3 pt-[10px]">
        <h2
          id={CHART_SECTION_ID}
          className="text-[17px]/[28px] text-content-primary"
        >
          <span className="font-bold">{chartTitleBold}</span>
          <span className="font-normal">{" "}•{" "}Projected for 30 days ending on 6 Apr 2026</span>
        </h2>
        <div className="flex shrink-0 items-center gap-3 pt-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: "#13A972" }}
              aria-hidden
            />
            <span className="text-[11px]/[16px] text-content-tertiary">
              Positive
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: "#DE0E40" }}
              aria-hidden
            />
            <span className="text-[11px]/[16px] text-content-tertiary">
              Negative
            </span>
          </div>
        </div>
      </div>

      {useStackedSpotlightLayout ? (
        <ActionPlanPanel key={bankBalanceConfigKey} {...panelProps} />
      ) : (
        <div className="px-[14px] pb-5 pt-4">
          <ActionPlanPanel key={bankBalanceConfigKey} {...panelProps} />
        </div>
      )}
    </div>
  );
}

export default CashflowActionPlanWidget;
