"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode, ComponentType } from "react";
import type {
  ActionPlanModalConfig,
  BillRow,
} from "./actionPlanModalConfigs";
import {
  computeProjectedCash,
  dateIndexFromLabel,
} from "./actionPlanModalConfigs";
import type { PaymentEventForChart } from "@/app/components/charts/CashflowShortfallChart";
import {
  usePurchasesInteractiveLinking,
  type LinkSeverity,
} from "@/app/contexts/PurchasesInteractiveLinkingContext";
import {
  BankBalanceAwaitingBillsAccordion,
  type BankBalanceCashflowInsight,
} from "./BankBalanceAwaitingBillsAccordion";
import { ActionPlanBillTable } from "./ActionPlanBillTable";
import { ActionPlanViewToggle } from "./ActionPlanViewToggle";
import { PROTECT_FLAGS } from "./purchasesInteractiveLinking";
import { isPurchasesPrototypeV4OrLater } from "@/app/lib/purchases-prototype-flags";

type ActionPlanHighchartsProps = {
  className?: string;
  projectedData?: number[];
  paymentEvents?: PaymentEventForChart[];
  highlightDayIndex?: number | null;
  highlightBandStart?: number | null;
  highlightBandEnd?: number | null;
  highlightSeverity?: "normal" | "warning" | "risk";
  draggableThreshold?: boolean;
  mergeHighlightWithProtectDot?: boolean;
};

export function ActionPlanPanel({
  config,
  className = "",
  /** Overrides the default “Cash flow projection” label beside the view toggle */
  chartHeaderTitle,
  /** Optional `id` for the chart header (e.g. `aria-labelledby` on a parent section) */
  chartHeaderId,
  /** `false` = Current view first (embedded Insights default); `true` = Proposed (modal default) */
  initialShowPlanned = true,
  /** When true, toggle order is Proposed | Current so Current sits on the right */
  proposedToggleOnLeft = false,
  /** When set with `onPlannedViewChange`, view state is controlled by the parent (e.g. toggle in widget chrome). */
  plannedView,
  onPlannedViewChange,
  /** Hide the chart row that shows the projection title + toggle (use an external toggle). */
  hideChartHeaderRow = false,
  /** When true, Current / Proposed toggle renders under the chart instead of beside the title. */
  toggleBelowChart = false,
  /**
   * When true (and {@link toggleBelowChart} is false), the toggle sits on the right of the
   * “Recommended actions” / “Proposed payment changes” heading above the table.
   */
  toggleInlineWithRecommendedTitle = false,
  billTableScrollable = false,
  billTableMaxHeightClass = "max-h-[280px]",
  recommendedActionsRowFilter = "all",
  /** When false, the “Action” column is omitted (e.g. 1-column bank balance widget). */
  showBillTableActionColumn = true,
  /** Cap chart width (px) for narrow tiles, `"full"` to use the widget width (e.g. 2-column span), or omit for modal layout. */
  chartTargetWidthPx,
  /** Bump when layout width changes so Highcharts remounts at the correct size (e.g. purchases overview column span). */
  chartRemountKey,
  /**
   * When true, Protect-agent scatter points are omitted on the bank balance chart (purchases overview).
   */
  hideChartProtectMarkers = false,
  /** Bank widget: expandable “Bills awaiting payment” block directly under the chart. */
  awaitingBillsBelowChart = false,
  /** Shortfall scenarios: JAX insight + Make a plan inside the accordion panel. */
  cashflowInsight = null,
  /** When false, only the chart is shown (toggle, table, emergency hidden). */
  showPlanActions = true,
  /**
   * When integrated with {@link awaitingBillsBelowChart} + {@link cashflowInsight}, “Make a plan”
   * reveals the proposed plan block inside the accordion; keep in sync with parent state.
   */
  planActionsOpen = false,
  /** When true, the cash-flow plan chart shows a drag handle on the threshold line. */
  chartDraggableThreshold = false,
  /** Root uses `display: contents` for flex `order` layouts with a sibling (e.g. JAX block). */
  rootContents = false,
  chartSectionClassName = "",
  actionsSectionClassName = "",
}: {
  config: ActionPlanModalConfig;
  className?: string;
  chartHeaderTitle?: string;
  chartHeaderId?: string;
  initialShowPlanned?: boolean;
  proposedToggleOnLeft?: boolean;
  plannedView?: boolean;
  onPlannedViewChange?: (planned: boolean) => void;
  hideChartHeaderRow?: boolean;
  toggleBelowChart?: boolean;
  toggleInlineWithRecommendedTitle?: boolean;
  billTableScrollable?: boolean;
  billTableMaxHeightClass?: string;
  recommendedActionsRowFilter?: "all" | "changed-only";
  showBillTableActionColumn?: boolean;
  chartTargetWidthPx?: number | "full";
  chartRemountKey?: string;
  hideChartProtectMarkers?: boolean;
  awaitingBillsBelowChart?: boolean;
  cashflowInsight?: BankBalanceCashflowInsight | null;
  showPlanActions?: boolean;
  planActionsOpen?: boolean;
  chartDraggableThreshold?: boolean;
  rootContents?: boolean;
  chartSectionClassName?: string;
  actionsSectionClassName?: string;
}) {
  const isControlled =
    plannedView !== undefined && onPlannedViewChange !== undefined;
  const [uncontrolledPlanned, setUncontrolledPlanned] =
    useState(initialShowPlanned);
  const showPlanned = isControlled ? plannedView : uncontrolledPlanned;
  const setShowPlanned = useCallback(
    (next: boolean) => {
      if (isControlled) onPlannedViewChange?.(next);
      else setUncontrolledPlanned(next);
    },
    [isControlled, onPlannedViewChange]
  );
  const billsTable = config.billsTable;
  const tableBills = useMemo(
    () => (billsTable?.bills ?? []).filter((b) => !b.chartOnly),
    [billsTable?.bills]
  );
  const hasViewToggle = (billsTable?.bills.length ?? 0) > 0;
  const hasBillTable = tableBills.length > 0;
  const [editableBills, setEditableBills] = useState<BillRow[]>(
    () => billsTable?.bills ?? []
  );
  const pathname = usePathname();
  const [chartImpl, setChartImpl] = useState<
    ComponentType<ActionPlanHighchartsProps> | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    setChartImpl(null);
    const p =
      config.chartKey === "CashflowPlanChart"
        ? import(
            /* webpackMode: "eager" */ "@/app/components/charts/CashflowPlanChart"
          )
        : import(
            /* webpackMode: "eager" */ "@/app/components/charts/CashflowShortfallChart"
          );
    void p.then((m) => {
      if (!cancelled) setChartImpl(() => m.default);
    });
    return () => {
      cancelled = true;
    };
  }, [config.chartKey]);

  const purchasesOverviewV4ProtectDotsOnHover =
    isPurchasesPrototypeV4OrLater(pathname);
  const linking = usePurchasesInteractiveLinking();
  const isEmergency = config.variant === "emergency";
  const integratePlanInAccordion =
    awaitingBillsBelowChart && cashflowInsight != null;
  const actionsPlanChrome = showPlanActions && !integratePlanInAccordion;

  /** Table → chart highlight works even when global linking is off (e.g. Bills insights). */
  const [planRowHover, setPlanRowHover] = useState<{
    billId: string;
    dayIndex: number;
    severity: LinkSeverity;
    /** True when this row is tied to a Protect flag — enlarge that dot instead of a second marker. */
    snapToProtectDot: boolean;
  } | null>(null);

  useEffect(() => {
    setPlanRowHover(null);
  }, [showPlanned]);

  const updatePlannedDate = useCallback((id: string, label: string) => {
    const dayIdx = dateIndexFromLabel(label);
    if (dayIdx < 0) return;
    setEditableBills((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, plannedPayDate: label, plannedDayIndex: dayIdx }
          : b
      )
    );
  }, []);

  const { projectedData, currentData, projectedEvents, currentEvents } =
    useMemo(() => {
      if (!billsTable) {
        return {
          projectedData: undefined as number[] | undefined,
          currentData: undefined as number[] | undefined,
          projectedEvents: undefined as PaymentEventForChart[] | undefined,
          currentEvents: undefined as PaymentEventForChart[] | undefined,
        };
      }

      const base = billsTable.baseCash;
      const currentBillsAtOriginal = editableBills.map((b) => ({
        plannedDayIndex: b.originalDayIndex,
        amountNumeric: b.amountNumeric,
      }));
      const current = computeProjectedCash(base, currentBillsAtOriginal);
      const proposed = computeProjectedCash(base, editableBills);

      const dayLen = billsTable.baseCash.length;
      /* Protect scatter markers — disabled on purchases overview bank widget via hideChartProtectMarkers. */
      const protectEvents: PaymentEventForChart[] = hideChartProtectMarkers
        ? []
        : PROTECT_FLAGS.filter(
            (flag) => flag.dayIndex >= 0 && flag.dayIndex < dayLen
          ).map((flag) => ({
            payDayIndex: flag.dayIndex,
            billName: flag.billName,
            amount: flag.amount,
            variant: "protect" as const,
            linkId: flag.linkId,
            protectLabel: flag.reasonLabel,
            protectSeverity:
              flag.severity === "risk" ? ("risk" as const) : ("warning" as const),
            protectTooltipDetail: flag.tooltipDetail,
          }));

      let curEvents: PaymentEventForChart[] = protectEvents;
      let propEvents: PaymentEventForChart[] = protectEvents;
      if (purchasesOverviewV4ProtectDotsOnHover && linking.enabled) {
        if (linking.activeLinkId == null) {
          curEvents = [];
          propEvents = [];
        } else {
          const keep = (e: PaymentEventForChart) =>
            e.linkId === linking.activeLinkId;
          curEvents = curEvents.filter(keep);
          propEvents = propEvents.filter(keep);
        }
      }

      return {
        projectedData: proposed,
        currentData: current,
        projectedEvents: propEvents,
        currentEvents: curEvents,
      };
    }, [
      billsTable,
      editableBills,
      hideChartProtectMarkers,
      purchasesOverviewV4ProtectDotsOnHover,
      linking.enabled,
      linking.activeLinkId,
    ]);

  const chartData = useMemo(() => {
    const base = showPlanned ? projectedData : currentData;
    if (!base || !linking.enabled || !linking.draftPayment) return base;
    const next = [...base];
    for (let i = linking.draftPayment.plannedDayIndex; i < next.length; i++) {
      next[i] -= linking.draftPayment.amountNumeric;
    }
    return next;
  }, [showPlanned, projectedData, currentData, linking.enabled, linking.draftPayment]);
  const chartEvents = showPlanned ? projectedEvents : currentEvents;

  const chartHighlightDayIndex =
    planRowHover?.dayIndex ??
    (linking.enabled ? linking.activeDayIndex : null);
  const chartHighlightSeverity: LinkSeverity =
    planRowHover?.severity ??
    (linking.enabled ? linking.activeSeverity : "normal");
  /** When hovering a Protect-linked row or the Protect widget, merge with orange/red dots. */
  const chartMergeHighlightWithProtectDot =
    planRowHover != null
      ? planRowHover.snapToProtectDot
      : linking.enabled && linking.activeLinkId != null;

  const tableRows = useMemo(() => {
    const visible = editableBills.filter((b) => !b.chartOnly);
    if (recommendedActionsRowFilter === "changed-only") {
      return visible.filter(
        (b) => b.plannedDayIndex !== b.originalDayIndex
      );
    }
    return visible;
  }, [editableBills, recommendedActionsRowFilter]);

  /** All upcoming rows for the bank-balance accordion (full bill set; not the “changed only” table filter). */
  const awaitingAccordionRows = useMemo((): BillRow[] => {
    if (!billsTable) return [];
    const fromTable = editableBills.filter(
      (b) => !b.chartOnly && b.billName.trim() !== ""
    );
    if (fromTable.length > 0) return fromTable;
    return billsTable.awaitingPaymentDisplayRows ?? [];
  }, [billsTable, editableBills]);

  const headerLabel = chartHeaderTitle ?? "Cash flow projection";
  const recommendedTitle =
    recommendedActionsRowFilter === "changed-only"
      ? "Proposed payment changes"
      : "Recommended actions";

  const locCta = config.lineOfCreditPlanCta;
  const applyLabel = locCta?.applyLabel ?? "Apply now";

  const emergencyInnerContent = useMemo((): ReactNode => {
    if (!isEmergency) return null;
    if (locCta) {
      return (
        <>
          <h3 className="text-[13px]/[20px] font-bold text-content-primary">
            {locCta.title}
          </h3>
          <p className="mt-2 text-[13px]/[20px] text-content-secondary">
            {locCta.description}
          </p>
          <div className="mt-4">
            {locCta.applyHref ? (
              <a
                href={locCta.applyHref}
                className="inline-flex items-center rounded-[48px] bg-brand-primary px-4 py-[10px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
              >
                {applyLabel}
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex items-center rounded-[48px] bg-brand-primary px-4 py-[10px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
              >
                {applyLabel}
              </button>
            )}
          </div>
        </>
      );
    }
    if (config.emergencyActions) {
      return (
        <>
          <h3 className="text-[13px]/[20px] font-bold text-content-primary">
            Recommended actions
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            {config.emergencyActions.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#E6E7E9] bg-background-primary px-3 py-2.5 text-[13px]/[20px]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                  {item.billName !== "—" && (
                    <span className="font-medium text-content-primary">
                      {item.billName}
                    </span>
                  )}
                  {item.amount !== "—" && (
                    <span className="text-content-secondary">{item.amount}</span>
                  )}
                </div>
                {item.payDate !== "—" && (
                  <p className="mt-0.5 text-[12px]/[18px] text-content-secondary">
                    Pay: {item.payDate}
                  </p>
                )}
                <p className="mt-1 text-content-secondary">{item.action}</p>
              </div>
            ))}
          </div>
        </>
      );
    }
    return null;
  }, [isEmergency, locCta, applyLabel, config.emergencyActions]);

  const chartIsModal = chartTargetWidthPx === undefined;
  const chartIsFullWidth = chartTargetWidthPx === "full";
  const chartIsCapped =
    typeof chartTargetWidthPx === "number" && chartTargetWidthPx > 0;
  const chartUsesTileLayout = chartIsCapped || chartIsFullWidth;

  const chartHeaderEl =
    billsTable &&
    !hideChartHeaderRow &&
    hasViewToggle &&
    showPlanActions && (
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {chartHeaderTitle ? (
          <h3
            id={chartHeaderId}
            className="min-w-0 text-[17px]/[28px] font-bold text-content-primary"
          >
            {headerLabel}
          </h3>
        ) : (
          <p className="min-w-0 text-[13px]/[20px] font-bold text-content-primary">
            {headerLabel}
          </p>
        )}
        {!toggleBelowChart && (
          <ActionPlanViewToggle
            showPlanned={showPlanned}
            onPlannedViewChange={setShowPlanned}
            proposedToggleOnLeft={proposedToggleOnLeft}
          />
        )}
      </div>
    );

  const ChartImpl = chartImpl;

  const chartBodyEl = (
    <div
      className={`w-full min-w-0 ${chartUsesTileLayout ? "overflow-x-hidden" : "overflow-x-auto"} ${hideChartHeaderRow ? "mt-0" : "mt-3"}`}
    >
      <div
        className={`min-h-[220px] w-full ${chartIsModal ? "min-w-[640px]" : "min-w-0"} ${chartIsCapped ? "mx-auto" : ""}`}
        style={chartIsCapped ? { maxWidth: chartTargetWidthPx } : undefined}
      >
        {ChartImpl ? (
          <ChartImpl
            key={`${showPlanned ? "proposed" : "current"}${chartRemountKey != null ? `-${chartRemountKey}` : ""}`}
            className="w-full min-w-0"
            projectedData={chartData}
            paymentEvents={chartEvents}
            highlightDayIndex={chartHighlightDayIndex}
            highlightBandStart={
              linking.enabled ? linking.activeBandStart : null
            }
            highlightBandEnd={linking.enabled ? linking.activeBandEnd : null}
            highlightSeverity={chartHighlightSeverity}
            draggableThreshold={chartDraggableThreshold}
            mergeHighlightWithProtectDot={chartMergeHighlightWithProtectDot}
          />
        ) : (
          <div className="min-h-[220px] w-full min-w-0" aria-hidden />
        )}
      </div>
    </div>
  );

  const awaitingBillsEl =
    awaitingBillsBelowChart &&
    billsTable && (
      <div
        className="min-w-0 ml-[4px] mr-[4px] w-[calc(100%-8px)]"
        style={chartIsCapped ? { maxWidth: chartTargetWidthPx } : undefined}
      >
        <BankBalanceAwaitingBillsAccordion
          rows={awaitingAccordionRows}
          showPlanned={showPlanned}
          showPlannedColumn={hasViewToggle}
          cashflowInsight={cashflowInsight}
          integrateInsightInHeader={integratePlanInAccordion}
          planActionsOpen={planActionsOpen}
          integratedPlanInteractiveTable={
            integratePlanInAccordion && hasBillTable
          }
          proposedToggleOnLeft={proposedToggleOnLeft}
          onPlannedViewChange={setShowPlanned}
          showBillTableActionColumn={showBillTableActionColumn}
          updatePlannedDate={updatePlannedDate}
          billTableScrollable={billTableScrollable}
          billTableMaxHeightClass={billTableMaxHeightClass}
          planBillLinking={{
            enabled: false,
            activeLinkId: null,
            setActiveLink: linking.setActiveLink,
          }}
          planRowHover={planRowHover}
          setPlanRowHover={setPlanRowHover}
          planEmergencyContent={
            integratePlanInAccordion && planActionsOpen
              ? emergencyInnerContent
              : null
          }
          showHeaderApplyPlan={!isEmergency}
        />
      </div>
    );

  const toggleBelowEl =
    billsTable &&
    toggleBelowChart &&
    !toggleInlineWithRecommendedTitle &&
    hasViewToggle &&
    actionsPlanChrome && (
      <div
        className={`mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-2 ${chartUsesTileLayout ? "mx-auto w-full min-w-0" : ""}`}
        style={chartIsCapped ? { maxWidth: chartTargetWidthPx } : undefined}
      >
        <ActionPlanViewToggle
          showPlanned={showPlanned}
          onPlannedViewChange={setShowPlanned}
          proposedToggleOnLeft={proposedToggleOnLeft}
        />
      </div>
    );

  const toggleInlineStandaloneEl =
    billsTable &&
    actionsPlanChrome &&
    hasViewToggle &&
    !hasBillTable &&
    toggleInlineWithRecommendedTitle &&
    !toggleBelowChart && (
      <div
        className={
          toggleInlineWithRecommendedTitle ? "mt-0 flex justify-end pt-0" : "mt-3 flex justify-end"
        }
      >
        <ActionPlanViewToggle
          showPlanned={showPlanned}
          onPlannedViewChange={setShowPlanned}
          proposedToggleOnLeft={proposedToggleOnLeft}
        />
      </div>
    );

  const tableEl =
    billsTable &&
    hasBillTable &&
    actionsPlanChrome && (
      <div
        className={toggleInlineWithRecommendedTitle ? "mt-0 pt-0" : "mt-4 pt-4"}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <h3 className="text-[13px]/[20px] font-bold text-content-primary">
            {recommendedTitle}
          </h3>
          {toggleInlineWithRecommendedTitle && (
            <ActionPlanViewToggle
              showPlanned={showPlanned}
              onPlannedViewChange={setShowPlanned}
              proposedToggleOnLeft={proposedToggleOnLeft}
            />
          )}
        </div>
        <div className="mt-2">
          <ActionPlanBillTable
            tableRows={tableRows}
            showPlanned={showPlanned}
            showBillTableActionColumn={showBillTableActionColumn}
            updatePlannedDate={updatePlannedDate}
            billTableScrollable={billTableScrollable}
            billTableMaxHeightClass={billTableMaxHeightClass}
            linking={{
              enabled: linking.enabled,
              activeLinkId: linking.activeLinkId,
              setActiveLink: linking.setActiveLink,
            }}
            planRowHover={planRowHover}
            setPlanRowHover={setPlanRowHover}
          />
        </div>
      </div>
    );

  const emergencyEl =
    showPlanActions &&
    !integratePlanInAccordion &&
    emergencyInnerContent && (
      <div
        className={
          toggleInlineWithRecommendedTitle && !hasBillTable
            ? "mt-0 pt-0"
            : "mt-4 pt-4"
        }
      >
        {emergencyInnerContent}
      </div>
    );

  /** Avoid an empty actions wrapper (`mt-3` / `pb-5`) when integrated plan UI lives only in the accordion. */
  const hasActionsSectionContent = Boolean(
    toggleBelowEl || toggleInlineStandaloneEl || tableEl || emergencyEl
  );

  if (rootContents) {
    return (
      <div
        className={[className?.trim() && className, "contents"]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={chartSectionClassName}>
          {chartHeaderEl}
          {chartBodyEl}
          {awaitingBillsEl}
        </div>
        {showPlanActions && hasActionsSectionContent && (
          <div className={actionsSectionClassName}>
            {toggleBelowEl}
            {toggleInlineStandaloneEl}
            {tableEl}
            {emergencyEl}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {chartHeaderEl}
      {chartBodyEl}
      {awaitingBillsEl}
      {toggleBelowEl}
      {toggleInlineStandaloneEl}
      {tableEl}
      {emergencyEl}
    </div>
  );
}
