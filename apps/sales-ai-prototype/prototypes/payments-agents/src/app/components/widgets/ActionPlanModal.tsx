"use client";

import { useState, useMemo, useCallback } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";
import type {
  ActionPlanChartKey,
  ActionPlanModalConfig,
  BillRow,
} from "./actionPlanModalConfigs";
import { computeProjectedCash, dateIndexFromLabel, DATE_LABELS } from "./actionPlanModalConfigs";
import CashflowPlanChart from "@/app/components/charts/CashflowPlanChart";
import CashflowShortfallChart from "@/app/components/charts/CashflowShortfallChart";
import type { PaymentEventForChart } from "@/app/components/charts/CashflowPlanChart";

const CHART_BY_KEY: Record<
  ActionPlanChartKey,
  React.ComponentType<{
    className?: string;
    projectedData?: number[];
    paymentEvents?: PaymentEventForChart[];
  }>
> = {
  CashflowPlanChart,
  CashflowShortfallChart,
};

interface ActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ActionPlanModalConfig | null;
}

export function ActionPlanModal({
  isOpen,
  onClose,
  config,
}: ActionPlanModalProps) {
  const [showPlanned, setShowPlanned] = useState(true);

  const billsTable = config?.billsTable;

  const [editableBills, setEditableBills] = useState<BillRow[]>(() =>
    billsTable?.bills ?? []
  );

  const isEmergency = config?.variant === "emergency";

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

  const { projectedData, currentData, projectedEvents, currentEvents } = useMemo(() => {
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

    const curEvents: PaymentEventForChart[] = editableBills
      .filter((b) => b.originalDayIndex >= 0 && b.originalDayIndex < 8)
      .map((b) => ({
        payDayIndex: b.originalDayIndex,
        billName: b.billName,
        amount: b.amount,
      }));

    const propEvents: PaymentEventForChart[] = editableBills
      .filter((b) => b.plannedDayIndex >= 0 && b.plannedDayIndex < 8)
      .map((b) => ({
        payDayIndex: b.plannedDayIndex,
        billName: b.billName,
        amount: b.amount,
      }));

    return {
      projectedData: proposed,
      currentData: current,
      projectedEvents: propEvents,
      currentEvents: curEvents,
    };
  }, [billsTable, editableBills]);

  if (!config) return null;

  const Chart = CHART_BY_KEY[config.chartKey];

  const chartData = showPlanned ? projectedData : currentData;
  const chartEvents = showPlanned ? projectedEvents : currentEvents;

  return (
    <Dialog
      transition
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-60 flex w-screen items-center justify-center bg-black/25 p-4 opacity-100 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative z-10 w-full max-w-[760px] overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Header */}
          <div
            className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 ${
              isEmergency ? "bg-[#FDF2F4]" : "bg-white"
            }`}
          >
            <div>
              {isEmergency && (
                <span className="mb-1 inline-block rounded-[3px] bg-[#DE0E40] px-1.5 py-0.5 text-[11px]/[16px] font-bold uppercase tracking-wide text-white">
                  Critical
                </span>
              )}
              <h2 className="text-[17px]/[28px] font-bold text-content-primary">
                {config.title}
              </h2>
              <p className="mt-1 text-[13px]/[20px] text-content-secondary">
                {config.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <Close fill="fill-content-secondary" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {/* Chart title row + toggle */}
            {billsTable && (
              <div className="flex items-center justify-between">
                <p className="text-[13px]/[20px] font-bold text-content-primary">
                  Cashflow projection
                </p>
                <div className="flex rounded-full border border-border-primary p-0.5 text-[11px]/[16px]">
                  <button
                    type="button"
                    onClick={() => setShowPlanned(false)}
                    className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                      !showPlanned
                        ? "bg-[#E8F4FC] text-brand-primary"
                        : "text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    Current
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPlanned(true)}
                    className={`rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                      showPlanned
                        ? "bg-[#E8F4FC] text-brand-primary"
                        : "text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    Proposed plan
                  </button>
                </div>
              </div>
            )}

            {/* Chart — key forces full remount so Highcharts redraws on toggle */}
            <div className="mt-3 min-h-[220px]">
              <Chart
                key={showPlanned ? "proposed" : "current"}
                className="w-full"
                projectedData={chartData}
                paymentEvents={chartEvents}
              />
            </div>

            {/* Bills table (strategic) */}
            {billsTable && (
              <div className="mt-4 pt-4">
                <h3 className="text-[13px]/[20px] font-bold text-content-primary">
                  Recommended actions
                </h3>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full border-collapse text-[13px]/[20px]">
                    <thead>
                      <tr className="border-b border-border-primary text-left text-[11px]/[16px] text-content-secondary">
                        <th className="py-2 pr-3 font-medium">Bill</th>
                        <th className="py-2 pr-3 font-medium text-right">Amount</th>
                        <th className="py-2 pr-3 font-medium">Due date</th>
                        <th className="py-2 pr-3 font-medium">Planned payment</th>
                        <th className="py-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editableBills.map((row) => (
                        <tr key={row.id} className="border-b border-background-tertiary text-content-primary">
                          <td className="py-2 pr-3 font-medium">{row.billName}</td>
                          <td className="py-2 pr-3 text-right text-content-secondary">{row.amount}</td>
                          <td className="py-2 pr-3 text-content-secondary">{row.originalPayDate}</td>
                          <td className="py-2 pr-3">
                            {showPlanned ? (
                              <select
                                value={row.plannedPayDate}
                                onChange={(e) => updatePlannedDate(row.id, e.target.value)}
                                className="w-28 rounded border border-border-primary bg-white px-2 py-0.5 pr-6 text-[13px]/[20px] text-content-primary outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                              >
                                {DATE_LABELS.map((d) => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-content-secondary">{row.originalPayDate}</span>
                            )}
                          </td>
                          <td className="py-2 text-content-secondary">
                            {showPlanned ? row.action : "Pay on due date."}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Emergency card list */}
            {isEmergency && config.emergencyActions && (
              <div className="mt-4 pt-4">
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
                          <span className="text-content-secondary">
                            {item.amount}
                          </span>
                        )}
                      </div>
                      {item.payDate !== "—" && (
                        <p className="mt-0.5 text-[12px]/[18px] text-content-secondary">
                          Pay: {item.payDate}
                        </p>
                      )}
                      <p className="mt-1 text-content-secondary">
                        {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="sticky bottom-0 -mx-6 flex justify-end gap-2 bg-white px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[48px] bg-brand-primary px-4 py-2 text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
              >
                Apply plan
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ActionPlanModal;
