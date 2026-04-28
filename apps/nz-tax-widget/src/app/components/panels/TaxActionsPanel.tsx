"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { Chevron, Close } from "@/app/components/ui/icons";
import { useRegion } from "@/app/contexts/RegionContext";
import {
  getTaxActionSidebarDetailForTab,
  getTaxActionSidebarTabListItemCounts,
  parseInitialTaxActionSidebarTab,
} from "@/app/lib/taxAlertsAiActionResolver";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import type { TaxAiActionTabId } from "@/app/lib/taxAlertsAiTileContent";
import { TaxActionQueueBundle } from "@/app/components/panels/TaxActionQueueBundle";
import type {
  TaxActionDecisionGroup,
  TaxActionDecisionUnit,
} from "@/app/lib/taxActionsPanelContent";
import clsx from "clsx";

type UnitOutcome = "pending" | "dismissed" | "approved";

function TaxActionDecisionStack({
  groups,
  keptRowByUnit,
  unitOutcome,
  onPickKeep,
  onDismissUnit,
  onApproveUnit,
}: {
  groups: TaxActionDecisionGroup[];
  keptRowByUnit: Record<string, string>;
  unitOutcome: Record<string, UnitOutcome>;
  onPickKeep: (unitId: string, rowIdToKeep: string) => void;
  onDismissUnit: (unitId: string) => void;
  onApproveUnit: (unitId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div
          key={group.id}
          className="border-border-primary rounded-xl border bg-white shadow-[0_1px_3px_rgba(0,10,30,0.06)]"
        >
          <div className="text-content-primary flex items-center gap-2 px-3 py-3 text-[15px] font-bold">
            <Chevron
              className="text-content-secondary size-4 shrink-0 -rotate-90"
              aria-hidden
            />
            {group.title}
          </div>
          <div className="border-border-primary space-y-4 border-t px-3 pt-2 pb-4">
            <p className="text-content-secondary text-[13px]/[18px]">{group.intro}</p>
            <p className="text-content-secondary mt-1.5 text-[12px]/[17px]">
              Nothing posts until you approve or dismiss. Tap a row to switch which
              side JAX keeps before you approve.
            </p>
            {group.units.map((unit) => (
              <TaxActionDecisionUnitCard
                key={unit.id}
                unit={unit}
                keptRowId={keptRowByUnit[unit.id] ?? unit.rows[1].id}
                outcome={unitOutcome[unit.id] ?? "pending"}
                onPickKeep={onPickKeep}
                onDismissUnit={onDismissUnit}
                onApproveUnit={onApproveUnit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TaxActionDecisionUnitCard({
  unit,
  keptRowId,
  outcome,
  onPickKeep,
  onDismissUnit,
  onApproveUnit,
}: {
  unit: TaxActionDecisionUnit;
  keptRowId: string;
  outcome: UnitOutcome;
  onPickKeep: (unitId: string, rowIdToKeep: string) => void;
  onDismissUnit: (unitId: string) => void;
  onApproveUnit: (unitId: string) => void;
}) {
  const settled = outcome !== "pending";

  return (
    <div
      className={clsx(
        "rounded-xl border border-[rgba(0,10,30,0.08)] bg-white p-3 shadow-[0_1px_3px_rgba(0,10,30,0.06)]",
        settled && "opacity-60"
      )}
    >
      {outcome === "approved" ? (
        <p className="text-content-secondary mb-2 text-[12px]/[16px] font-semibold">
          Approved (prototype)
        </p>
      ) : null}
      {outcome === "dismissed" ? (
        <p className="text-content-secondary mb-2 text-[12px]/[16px] font-semibold">
          Dismissed (prototype)
        </p>
      ) : null}
      <div className="flex flex-col gap-2">
        {unit.rows.map((row) => {
          const isKept = keptRowId === row.id;
          return (
            <button
              key={row.id}
              type="button"
              disabled={settled}
              onClick={() => {
                if (!isKept) onPickKeep(unit.id, row.id);
              }}
              aria-pressed={isKept}
              className={clsx(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                isKept
                  ? "border border-[#cfe8f7] bg-white shadow-[inset_0_0_0_1px_rgba(0,120,200,0.12)]"
                  : "bg-[#eef0f2] hover:bg-[#e6e9ec]",
                settled && "pointer-events-none"
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[15px]/[22px] font-bold text-[#0a0a0a]">
                  {row.title}
                </p>
                <p className="text-content-secondary text-[13px]/[18px]">
                  {row.subtitle}
                </p>
              </div>
              <span
                className={clsx(
                  "shrink-0 text-[13px]/[16px] font-semibold",
                  isKept
                    ? "rounded-full border-[1.5px] border-[#0078c8] bg-[#e8f4fc] px-3 py-1.5 text-[#0078c8]"
                    : "text-[#6b7280]"
                )}
              >
                {isKept ? "Keep" : "Remove"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        <button
          type="button"
          disabled={settled}
          className="text-brand-primary hover:text-brand-secondary text-[13px]/[16px] font-semibold disabled:opacity-40"
          onClick={() => onDismissUnit(unit.id)}
        >
          Dismiss
        </button>
        <button
          type="button"
          disabled={settled}
          className="border-border-primary text-content-primary hover:bg-background-primary rounded-full border bg-white px-4 py-1.5 text-[13px]/[16px] font-bold disabled:opacity-40"
          onClick={() => onApproveUnit(unit.id)}
        >
          Approve
        </button>
      </div>
    </div>
  );
}

const TAB_ORDER: TaxAiActionTabId[] = [
  "all",
  "tax",
  "payroll",
  "insights",
  "bookkeeping",
];

export default function TaxActionsPanel() {
  const { region } = useRegion();
  const { stage } = usePrototypeSettings();
  const isAgentic = stage === "ai";
  const { openPanel, activeSubPanel } = useNavigation();
  const [selectedTab, setSelectedTab] = useState<TaxAiActionTabId>(() =>
    parseInitialTaxActionSidebarTab(activeSubPanel, region)
  );

  useEffect(() => {
    setSelectedTab(parseInitialTaxActionSidebarTab(activeSubPanel, region));
  }, [activeSubPanel, region]);

  const tabCounts = useMemo(
    () => getTaxActionSidebarTabListItemCounts(activeSubPanel, region),
    [activeSubPanel, region]
  );

  const tabLabels = useMemo(() => {
    const map: Record<TaxAiActionTabId, string> = {
      all: `All (${tabCounts.all})`,
      tax: `Tax (${tabCounts.tax})`,
      payroll: `Payroll (${tabCounts.payroll})`,
      insights: `Insights (${tabCounts.insights})`,
      bookkeeping: `Bookkeeping (${tabCounts.bookkeeping})`,
    };
    return map;
  }, [tabCounts]);

  const detail = useMemo(
    () =>
      getTaxActionSidebarDetailForTab(activeSubPanel, region, selectedTab),
    [activeSubPanel, region, selectedTab]
  );

  const sectionGroupTitle = useMemo(() => {
    if (
      region === "NZ" &&
      stage === "xpac" &&
      activeSubPanel === "nz-returns-errors"
    ) {
      return "Errors";
    }
    return detail.groupTitle;
  }, [region, stage, activeSubPanel, detail.groupTitle]);

  const decisionUnitKey = useMemo(() => {
    const g = detail.decisionGroups;
    if (!g?.length) return "";
    return g
      .flatMap((grp) => grp.units.map((u) => u.id))
      .sort()
      .join("|");
  }, [detail.decisionGroups]);

  const [keptRowByUnit, setKeptRowByUnit] = useState<Record<string, string>>(
    {}
  );
  const [unitOutcome, setUnitOutcome] = useState<Record<string, UnitOutcome>>(
    {}
  );

  useEffect(() => {
    if (!detail.decisionGroups?.length) {
      setKeptRowByUnit({});
      setUnitOutcome({});
      return;
    }
    const nextKept: Record<string, string> = {};
    for (const group of detail.decisionGroups) {
      for (const unit of group.units) {
        nextKept[unit.id] = unit.rows[1].id;
      }
    }
    setKeptRowByUnit(nextKept);
    setUnitOutcome({});
  }, [decisionUnitKey, activeSubPanel, selectedTab]);

  const showDecisions =
    !!detail.decisionGroups && detail.decisionGroups.length > 0;
  const showQueue =
    isAgentic && !!detail.actionQueueBundle?.cards?.length;

  const clientCards = (
    <ul className="flex flex-col gap-3">
      {detail.clients.map((clientRow, index) => (
        <li
          key={`${clientRow.name}-${index}`}
          className="border-border-primary relative rounded-xl border bg-white p-3 pr-10 shadow-[0_1px_3px_rgba(0,10,30,0.06)]"
        >
          <div className="text-content-secondary pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
            <Chevron className="size-4 -rotate-90" />
          </div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-[15px]/[22px] font-bold text-[#0a0a0a]">
              {clientRow.name}
            </span>
            <span
              className={clsx(
                "rounded px-2 py-0.5 text-[11px]/[14px] font-bold",
                clientRow.dueVariant === "soon"
                  ? "bg-[#fff3e0] text-[#c65300]"
                  : "bg-[#e8f0fe] text-[#0078c8]"
              )}
            >
              {clientRow.dueTag}
            </span>
          </div>
          <p className="text-content-secondary mb-2 text-[12px]/[16px]">
            {clientRow.category}
          </p>
          <ul className="space-y-1.5">
            {clientRow.insights.map((line) => (
              <li key={line} className="text-[13px]/[18px] text-[#0a0a0a]">
                {line}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="border-border-primary fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-2 border-b bg-white py-3 pr-3 pl-5">
        <h2 className="text-[17px]/[28px] font-bold">Actions</h2>
        <button
          className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => openPanel(null)}
          type="button"
          aria-label="Close Actions panel"
        >
          <span className="sr-only">Close</span>
          <Close fill="fill-content-secondary" />
        </button>
      </div>

      <div className="absolute top-[65px] bottom-0 w-screen overflow-y-auto scroll-smooth bg-white px-4 pt-4 pb-32 md:w-[400px]">
        <div className="mb-4 flex gap-1 overflow-x-auto px-0">
          {TAB_ORDER.map((tabId) => {
            const isActive = selectedTab === tabId;
            return (
              <button
                key={tabId}
                type="button"
                onClick={() => setSelectedTab(tabId)}
                className={clsx(
                  "shrink-0 px-2 py-2 text-[12px]/[16px] font-semibold whitespace-nowrap transition-colors border-b-2",
                  isActive
                    ? "border-[#0078c8] text-[#0078c8]"
                    : "text-content-secondary hover:text-content-primary border-transparent"
                )}
              >
                {tabLabels[tabId]}
              </button>
            );
          })}
        </div>

        <p className="text-content-secondary mb-3 text-[12px]/[16px] font-semibold tracking-wide uppercase">
          {sectionGroupTitle}
        </p>

        {showQueue ? (
          <div className="flex flex-col gap-6">
            <TaxActionQueueBundle bundle={detail.actionQueueBundle!} />
            {showDecisions ? (
              <TaxActionDecisionStack
                groups={detail.decisionGroups!}
                keptRowByUnit={keptRowByUnit}
                unitOutcome={unitOutcome}
                onPickKeep={(unitId, rowIdToKeep) =>
                  setKeptRowByUnit((m) => ({ ...m, [unitId]: rowIdToKeep }))
                }
                onDismissUnit={(unitId) =>
                  setUnitOutcome((m) => ({ ...m, [unitId]: "dismissed" }))
                }
                onApproveUnit={(unitId) =>
                  setUnitOutcome((m) => ({ ...m, [unitId]: "approved" }))
                }
              />
            ) : null}
            {detail.clients.length > 0 ? (
              <div>
                <p className="text-content-secondary mb-2 text-[12px]/[16px] font-semibold tracking-wide uppercase">
                  Affected clients
                </p>
                {clientCards}
              </div>
            ) : null}
          </div>
        ) : showDecisions ? (
          <div className="flex flex-col gap-6">
            <TaxActionDecisionStack
              groups={detail.decisionGroups!}
              keptRowByUnit={keptRowByUnit}
              unitOutcome={unitOutcome}
              onPickKeep={(unitId, rowIdToKeep) =>
                setKeptRowByUnit((m) => ({ ...m, [unitId]: rowIdToKeep }))
              }
              onDismissUnit={(unitId) =>
                setUnitOutcome((m) => ({ ...m, [unitId]: "dismissed" }))
              }
              onApproveUnit={(unitId) =>
                setUnitOutcome((m) => ({ ...m, [unitId]: "approved" }))
              }
            />
            {detail.clients.length > 0 ? (
              <div>
                <p className="text-content-secondary mb-2 text-[12px]/[16px] font-semibold tracking-wide uppercase">
                  Affected clients
                </p>
                {clientCards}
              </div>
            ) : null}
          </div>
        ) : (
          clientCards
        )}
      </div>
    </>
  );
}
