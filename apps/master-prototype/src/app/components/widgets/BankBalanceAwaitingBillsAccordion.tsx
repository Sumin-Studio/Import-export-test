"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import JaxSparkleIcon from "@/app/assets/images/icon-sparkle-colour-small.svg";
import Chevron from "@/app/components/ui/icons/Chevron";
import { isPurchasesPrototypeV5 } from "@/app/lib/purchases-prototype-flags";
import type { BillRow } from "./actionPlanModalConfigs";
import {
  ActionPlanBillTable,
  type PlanBillTableLinking,
  type PlanRowHoverForTable,
} from "./ActionPlanBillTable";
import { ActionPlanViewToggle } from "./ActionPlanViewToggle";

/** Route where prototype 5’s Apply plan button hands off into the Melio payment prep flow. */
const MELIO_PAYMENT_PREP_HREF = "/purchases-overview/prototype/5/apply-plan";

export type BankBalanceCashflowInsight = {
  title: string;
  body: string;
  showMakePlan: boolean;
  onMakePlan: () => void;
};

function formatUsdTotal(n: number): string {
  const rounded = Math.round(n);
  return `$${rounded.toLocaleString("en-NZ")}`;
}

export function BankBalanceAwaitingBillsAccordion({
  rows,
  showPlanned,
  showPlannedColumn,
  cashflowInsight = null,
  integrateInsightInHeader = false,
  planActionsOpen = false,
  integratedPlanInteractiveTable = false,
  proposedToggleOnLeft = false,
  onPlannedViewChange,
  showBillTableActionColumn = true,
  updatePlannedDate,
  billTableScrollable = false,
  billTableMaxHeightClass = "max-h-[280px]",
  planBillLinking,
  planEmergencyContent = null,
  showHeaderApplyPlan = true,
  className = "",
  planRowHover = null,
  setPlanRowHover,
}: {
  rows: BillRow[];
  showPlanned: boolean;
  showPlannedColumn: boolean;
  cashflowInsight?: BankBalanceCashflowInsight | null;
  integrateInsightInHeader?: boolean;
  planActionsOpen?: boolean;
  /** When plan is open: full editable bill table (running low / shortfall). Critical uses a read-only list + LOC block. */
  integratedPlanInteractiveTable?: boolean;
  proposedToggleOnLeft?: boolean;
  onPlannedViewChange?: (planned: boolean) => void;
  showBillTableActionColumn?: boolean;
  updatePlannedDate?: (id: string, label: string) => void;
  billTableScrollable?: boolean;
  billTableMaxHeightClass?: string;
  planBillLinking?: PlanBillTableLinking;
  planEmergencyContent?: ReactNode | null;
  /** When false (e.g. critical scenario), the "Apply plan" button is hidden from the header — the LOC CTA inside the panel body acts as the primary action. */
  showHeaderApplyPlan?: boolean;
  className?: string;
  /** Sync chart highlight + Protect tooltip when hovering rows in the integrated plan table. */
  planRowHover?: PlanRowHoverForTable | null;
  setPlanRowHover?: (next: PlanRowHoverForTable | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [makePlanLoading, setMakePlanLoading] = useState(false);
  const [planApplied, setPlanApplied] = useState(false);
  const [showApplyToast, setShowApplyToast] = useState(false);
  const [appliedBillCount, setAppliedBillCount] = useState(0);
  const makePlanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId().replace(/:/g, "");
  const router = useRouter();
  const pathname = usePathname();
  /** Prototype 5: hand off Apply plan to the Melio payment prep screen instead of applying inline. */
  const applyPlanHandsOffToMelio = isPurchasesPrototypeV5(pathname);

  useEffect(() => {
    return () => {
      if (makePlanTimerRef.current) clearTimeout(makePlanTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);
  const headerId = `bank-awaiting-heading-${uid}`;
  const panelId = `bank-awaiting-panel-${uid}`;

  const useIntegratedHeader =
    integrateInsightInHeader && cashflowInsight != null;
  const integratedPlanOpen = useIntegratedHeader && planActionsOpen;

  const sorted = useMemo(() => {
    const list = [...rows];
    if (useIntegratedHeader && !integratedPlanOpen) {
      return list.sort((a, b) => a.originalDayIndex - b.originalDayIndex);
    }
    if (!useIntegratedHeader) {
      return list.sort((a, b) => {
        const da = showPlanned ? a.plannedDayIndex : a.originalDayIndex;
        const db = showPlanned ? b.plannedDayIndex : b.originalDayIndex;
        return da - db;
      });
    }
    return list;
  }, [rows, showPlanned, useIntegratedHeader, integratedPlanOpen]);

  const interactivePlanRows = useMemo(() => {
    if (!integratedPlanOpen || !integratedPlanInteractiveTable) return rows;
    return [...rows].sort((a, b) => {
      const da = showPlanned ? a.plannedDayIndex : a.originalDayIndex;
      const db = showPlanned ? b.plannedDayIndex : b.originalDayIndex;
      return da - db;
    });
  }, [
    rows,
    showPlanned,
    integratedPlanOpen,
    integratedPlanInteractiveTable,
  ]);

  const totalNumeric = useMemo(
    () =>
      sorted.reduce(
        (s, r) => s + (Number.isFinite(r.amountNumeric) ? r.amountNumeric : 0),
        0
      ),
    [sorted]
  );

  useEffect(() => {
    if (useIntegratedHeader && planActionsOpen) setOpen(true);
  }, [useIntegratedHeader, planActionsOpen]);

  const count = sorted.length;

  const planSummary = useMemo(() => {
    if (!integratedPlanOpen) return null;
    const deferred = rows.filter(
      (r) => r.billName.trim() !== "" && r.plannedDayIndex !== r.originalDayIndex
    );
    if (deferred.length === 0) return null;
    const total = deferred.reduce((s, r) => s + r.amountNumeric, 0);
    const n = deferred.length;
    return `${n} payment${n !== 1 ? "s" : ""} totalling ${formatUsdTotal(total)} deferred to improve your cash flow.`;
  }, [rows, integratedPlanOpen]);

  const accordionTableShowPlannedColumn = useIntegratedHeader
    ? false
    : showPlannedColumn;

  return (
    <div
      className={`mt-1 rounded-xl border border-border-primary bg-white ${className}`.trim()}
    >
      <style>{`
        @keyframes makePlanDotPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(6px); }
        }
      `}</style>
      {useIntegratedHeader ? (
        <div
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-controls={panelId}
          aria-labelledby={headerId}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
          className="flex w-full cursor-pointer flex-col py-3 pl-2 pr-3 text-left transition-colors hover:bg-[#eff1f2]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:pl-3 sm:pr-4"
        >
          {/* Title row — chevron + title + action button all centred on the same line */}
          <div className="flex w-full items-center gap-1.5">
            <span
              className="-ml-0.5 inline-flex size-8 shrink-0 items-center justify-center text-content-secondary pointer-events-none"
              aria-hidden
            >
              <span
                className={`inline-flex items-center justify-center transition-transform duration-200 ${
                  open ? "rotate-0" : "-rotate-90"
                }`}
              >
                <Chevron className="scale-110" fill="fill-current" />
              </span>
            </span>
            <p
              id={headerId}
              className="min-w-0 flex-1 text-[14px]/[22px] font-bold text-content-primary"
            >
              {cashflowInsight.title}
            </p>
            {integratedPlanOpen ? (
              planApplied ? (
                /* Plan applied → Revert button */
                <div className="shrink-0" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlanApplied(false);
                    }}
                    className="inline-flex items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-medium text-content-secondary transition-colors hover:bg-[#eff1f2]"
                  >
                    Revert
                  </button>
                </div>
              ) : open ? (
                /* Accordion open + plan active → toggle + Apply plan */
                onPlannedViewChange && (showPlannedColumn || showHeaderApplyPlan) ? (
                  <div
                    className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {showPlannedColumn && (
                      <ActionPlanViewToggle
                        showPlanned={showPlanned}
                        onPlannedViewChange={onPlannedViewChange}
                        proposedToggleOnLeft={proposedToggleOnLeft}
                      />
                    )}
                    {showHeaderApplyPlan && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (applyPlanHandsOffToMelio) {
                            router.push(MELIO_PAYMENT_PREP_HREF);
                            return;
                          }
                          const changed = rows.filter(
                            (r) => r.plannedDayIndex !== r.originalDayIndex,
                          ).length;
                          onPlannedViewChange?.(true);
                          setAppliedBillCount(changed);
                          setPlanApplied(true);
                          setShowApplyToast(true);
                          if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
                          toastTimerRef.current = setTimeout(
                            () => setShowApplyToast(false),
                            5000,
                          );
                        }}
                        className="inline-flex items-center rounded-[48px] bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
                      >
                        Apply plan
                      </button>
                    )}
                  </div>
                ) : null
              ) : (
                /* Accordion collapsed + plan active → View plan */
                <div className="shrink-0" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                    className="inline-flex items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
                  >
                    View plan
                  </button>
                </div>
              )
            ) : cashflowInsight.showMakePlan ? (
              <div
                className="shrink-0"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  disabled={makePlanLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMakePlanLoading(true);
                    makePlanTimerRef.current = setTimeout(() => {
                      cashflowInsight.onMakePlan();
                      setMakePlanLoading(false);
                    }, 4000);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-[600] text-brand-primary transition-colors hover:bg-[#eff1f2] disabled:cursor-default"
                >
                  {/* Keep original content for sizing; overlay dots when loading */}
                  <span className="relative inline-flex items-center gap-1.5">
                    <span className={makePlanLoading ? "invisible" : ""}>
                      <Image
                        src={JaxSparkleIcon}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 shrink-0"
                        aria-hidden
                      />
                    </span>
                    <span className={makePlanLoading ? "invisible" : ""}>Make a plan</span>
                    {makePlanLoading && (
                      <span className="absolute inset-0 flex items-center justify-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="inline-block rounded-full bg-brand-primary"
                            style={{
                              width: 8,
                              height: 8,
                              animation: "makePlanDotPulse 0.72s ease-in-out infinite",
                              animationDelay: `${i * 160}ms`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </span>
                </button>
              </div>
            ) : null}
          </div>
          {/* Body text — indented to clear the chevron */}
          {integratedPlanOpen && planSummary ? (
            <div className="flex items-start gap-1.5 pl-[2.375rem]">
              <Image
                src={JaxSparkleIcon}
                alt=""
                width={14}
                height={14}
                className="mt-px size-4 shrink-0"
                aria-hidden
              />
              <p className="text-pretty text-[12px]/[18px] text-content-secondary">
                {planSummary}
              </p>
            </div>
          ) : (
            <p className="pl-[2.375rem] text-pretty text-[12px]/[18px] text-content-secondary">
              {cashflowInsight.body}
            </p>
          )}
        </div>
      ) : (
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-2 px-3 py-3 text-left transition-colors hover:bg-[#eff1f2]/80 sm:px-4"
        >
          <span
            className={`inline-flex size-8 shrink-0 items-center justify-center text-content-secondary transition-transform duration-200 ${
              open ? "rotate-0" : "-rotate-90"
            }`}
            aria-hidden
          >
            <Chevron className="scale-110" fill="fill-current" />
          </span>
          <span className="min-w-0 flex-1 text-[13px]/[20px] font-bold text-content-primary">
            Bills awaiting payment
            <span className="font-normal text-content-primary"> {count}</span>
          </span>
          <span className="shrink-0 text-[13px]/[20px] font-bold tabular-nums text-content-primary">
            {formatUsdTotal(totalNumeric)}
          </span>
        </button>
      )}

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="border-t border-border-primary px-3 pb-3 pt-1 sm:px-4"
        >
          {!useIntegratedHeader &&
            cashflowInsight &&
            cashflowInsight.showMakePlan && (
              <div className="mb-3 flex gap-2.5 border-b border-background-tertiary pb-3">
                <Image
                  src={JaxSparkleIcon}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0 translate-y-0.5"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px]/[22px] font-bold text-content-primary">
                    {cashflowInsight.title}
                  </p>
                  <p className="mt-1 text-pretty text-[12px]/[18px] text-content-secondary">
                    {cashflowInsight.body}
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={cashflowInsight.onMakePlan}
                      className="inline-flex items-center rounded-[48px] bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
                    >
                      Make a plan
                    </button>
                  </div>
                </div>
              </div>
            )}

          {integratedPlanOpen ? (
            <>
              {integratedPlanInteractiveTable &&
              updatePlannedDate &&
              planBillLinking &&
              interactivePlanRows.length > 0 ? (
                <ActionPlanBillTable
                  tableRows={interactivePlanRows}
                  showPlanned={showPlanned}
                  showBillTableActionColumn={planApplied ? false : showBillTableActionColumn}
                  updatePlannedDate={updatePlannedDate}
                  billTableScrollable={billTableScrollable}
                  billTableMaxHeightClass={billTableMaxHeightClass}
                  linking={planBillLinking}
                  planRowHover={planRowHover}
                  setPlanRowHover={setPlanRowHover}
                />
              ) : sorted.length === 0 ? (
                <p className="py-4 text-center text-[13px]/[20px] text-content-secondary">
                  No upcoming bills in this view.
                </p>
              ) : (
                <div className={`overflow-x-auto overflow-y-auto ${billTableMaxHeightClass}`}>
                  <table className="w-full min-w-[280px] border-collapse text-[13px]/[20px]">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-border-primary text-left text-[11px]/[16px] text-content-secondary">
                        <th className="py-2 pr-3 font-medium">Bill</th>
                        <th className="py-2 pr-3 font-medium text-right">
                          Amount
                        </th>
                        <th className="min-w-[6.5rem] whitespace-nowrap py-2 pr-3 font-medium">
                          Due date
                        </th>
                        {accordionTableShowPlannedColumn && (
                          <th className="py-2 font-medium">
                            Planned payment
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b border-background-tertiary text-content-primary last:border-b-0"
                        >
                          <td className="py-2 pr-3 font-medium whitespace-nowrap">
                            {row.billName}
                          </td>
                          <td className="py-2 pr-3 text-right text-content-secondary whitespace-nowrap">
                            {row.amount}
                          </td>
                          <td className="min-w-[6.5rem] whitespace-nowrap py-2 pr-3 text-content-secondary">
                            {row.originalPayDate}
                          </td>
                          {accordionTableShowPlannedColumn && (
                            <td className="py-2 text-content-secondary whitespace-nowrap">
                              {showPlanned
                                ? row.plannedPayDate
                                : row.originalPayDate}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {planEmergencyContent ? (
                <div className="mt-4 border-t border-background-tertiary pt-4">
                  {planEmergencyContent}
                </div>
              ) : null}
            </>
          ) : sorted.length === 0 ? (
            <p className="py-4 text-center text-[13px]/[20px] text-content-secondary">
              No upcoming bills in this view.
            </p>
          ) : (
            <div className={`overflow-x-auto overflow-y-auto ${billTableMaxHeightClass}`}>
              <table className="w-full min-w-[280px] border-collapse text-[13px]/[20px]">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-border-primary text-left text-[11px]/[16px] text-content-secondary">
                    <th className="py-2 pr-3 font-medium">Bill</th>
                    <th className="min-w-[6.5rem] whitespace-nowrap py-2 pr-3 font-medium">
                      Due date
                    </th>
                    {accordionTableShowPlannedColumn && (
                      <th className="py-2 pr-3 font-medium">Planned payment</th>
                    )}
                    <th className="py-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-background-tertiary text-content-primary last:border-b-0"
                    >
                      <td className="py-2 pr-3 font-medium whitespace-nowrap">
                        {row.billName}
                      </td>
                      <td className="min-w-[6.5rem] whitespace-nowrap py-2 pr-3 text-content-secondary">
                        {row.originalPayDate}
                      </td>
                      {accordionTableShowPlannedColumn && (
                        <td className="py-2 pr-3 text-content-secondary whitespace-nowrap">
                          {showPlanned
                            ? row.plannedPayDate
                            : row.originalPayDate}
                        </td>
                      )}
                      <td className="py-2 text-right text-content-secondary whitespace-nowrap">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Toast — fixed bottom-left of viewport */}
      {showApplyToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-6 z-50 max-w-[340px] rounded-xl bg-[#1a1d23] px-4 py-3 shadow-xl"
          style={{ animation: "toastSlideIn 0.22s ease-out forwards" }}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#13A972]">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-[13px]/[18px] font-semibold text-white">
                Cash flow action plan successfully applied.
              </p>
              <p className="mt-0.5 text-[12px]/[17px] text-white/60">
                Updated planned payment date applied to {appliedBillCount} bill{appliedBillCount !== 1 ? "s" : ""}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowApplyToast(false)}
              className="ml-1 shrink-0 text-white/40 transition-colors hover:text-white/80"
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
