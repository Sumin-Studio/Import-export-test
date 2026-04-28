"use client";

import type { BillRow } from "./actionPlanModalConfigs";
import { DATE_LABELS } from "./actionPlanModalConfigs";
import { ProtectBillNameCell } from "./ProtectBillNameCell";

export type PlanBillTableLinking = {
  enabled: boolean;
  activeLinkId: string | null;
  setActiveLink: (
    id: string | null,
    ctx?: {
      severity: "normal" | "warning" | "risk";
      dayIndex: number;
      bandStart: number | null;
      bandEnd: number | null;
    }
  ) => void;
};

/** @deprecated Row hover → chart linking removed. */
export type PlanRowHoverForTable = {
  billId: string;
  dayIndex: number;
  severity: "normal" | "warning" | "risk";
  snapToProtectDot: boolean;
};

export function ActionPlanBillTable({
  tableRows,
  showPlanned,
  showBillTableActionColumn,
  updatePlannedDate,
  billTableScrollable,
  billTableMaxHeightClass,
}: {
  tableRows: BillRow[];
  showPlanned: boolean;
  showBillTableActionColumn: boolean;
  updatePlannedDate: (id: string, label: string) => void;
  billTableScrollable: boolean;
  billTableMaxHeightClass: string;
  /** Kept for call-site compatibility; chart linking from row hover is no longer used. */
  linking?: PlanBillTableLinking;
  planRowHover?: PlanRowHoverForTable | null;
  setPlanRowHover?: (next: PlanRowHoverForTable | null) => void;
}) {
  const wrapClass = billTableScrollable
    ? `min-w-0 overflow-auto overscroll-contain ${billTableMaxHeightClass}`
    : "overflow-x-auto";

  return (
    <div className={wrapClass}>
      <table
        className={`w-full border-collapse text-[13px]/[20px] ${
          showBillTableActionColumn ? "min-w-[640px]" : "min-w-0"
        }`}
      >
        <thead>
          <tr className="border-b border-border-primary text-left text-[11px]/[16px] text-content-secondary">
            <th className="py-2 pr-3 font-medium">Bill</th>
            <th className="py-2 pr-3 font-medium text-right">Amount</th>
            <th className="min-w-[6.5rem] whitespace-nowrap py-2 pr-3 font-medium">
              Due date
            </th>
            <th className="py-2 pr-3 font-medium">Planned payment</th>
            {showBillTableActionColumn && (
              <th className="py-2 font-medium">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => {
            const isAdjusted =
              showPlanned && row.plannedDayIndex !== row.originalDayIndex;
            return (
              <tr
                key={row.id}
                className={`border-b border-background-tertiary text-content-primary ${
                  isAdjusted ? "bg-[#E8F4FC]/40" : ""
                }`}
              >
                <td className="py-2 pr-3 whitespace-nowrap">
                  <ProtectBillNameCell billName={row.billName} />
                </td>
                <td className="py-2 pr-3 text-right text-content-secondary whitespace-nowrap">
                  {row.amount}
                </td>
                <td className="min-w-[6.5rem] whitespace-nowrap py-2 pr-3 text-content-secondary">
                  {row.originalPayDate}
                </td>
                <td className="py-2 pr-3">
                  {showPlanned ? (
                    <select
                      value={row.plannedPayDate}
                      onChange={(e) =>
                        updatePlannedDate(row.id, e.target.value)
                      }
                      className="w-28 rounded border border-border-primary bg-white px-2 py-0.5 pr-6 text-[13px]/[20px] text-content-primary outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    >
                      {DATE_LABELS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-content-secondary whitespace-nowrap">
                      {row.originalPayDate}
                    </span>
                  )}
                </td>
                {showBillTableActionColumn && (
                  <td className="py-2 text-content-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <span>
                        {showPlanned ? row.action : "Pay on due date."}
                      </span>
                      {showPlanned && isAdjusted ? (
                        <span className="group relative inline-flex">
                          <button
                            type="button"
                            aria-label="Why this recommendation"
                            className="inline-flex size-4 items-center justify-center rounded-full border border-[#cdd5e0] text-[10px] font-bold text-[#5c6470]"
                          >
                            i
                          </button>
                          <span className="pointer-events-none absolute right-0 top-[calc(100%+6px)] z-20 hidden min-w-[220px] rounded-md border border-[#d8dbe1] bg-white p-2 text-[12px]/[16px] text-content-primary shadow-lg group-hover:block">
                            <span className="mr-1.5 inline-block">✦</span>
                            JAX recommendation: shifting this payment smooths
                            the projected dip and lowers near-term risk.
                          </span>
                        </span>
                      ) : null}
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
