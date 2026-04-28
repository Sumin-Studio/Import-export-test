"use client";

import { useMemo, useState } from "react";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { ExpandDiagonal } from "@/app/components/ui/icons";
import { MoreButton } from "@/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { TaxAlertsAiOverflow, type TaxAiSortMode } from "./overflow";
import TaxAlertsScopeOverflow from "./overflow/tax-alerts-scope-overflow";
import {
  WORKLOAD_ACCOUNT_MANAGERS,
  WORKLOAD_MANAGERS,
} from "./overflow/workload-insights";
import { useRegion } from "@/app/contexts/RegionContext";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import {
  getTaxAiActionTabListItemCounts,
  getTaxAiAggregateRows,
  type TaxAiActionTabId,
} from "@/app/lib/taxAlertsAiTileContent";

const TAB_ORDER: TaxAiActionTabId[] = [
  "all",
  "tax",
  "payroll",
  "insights",
  "bookkeeping",
];

interface TaxAlertsAiTileProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
  compact?: boolean;
}

export function TaxAlertsAiTile({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
  compact = false,
}: TaxAlertsAiTileProps) {
  const { region } = useRegion();
  const { openPanel } = useNavigation();
  const [activeFilter, setActiveFilter] = useState<TaxAiActionTabId>("all");
  const [sortMode, setSortMode] = useState<TaxAiSortMode>("priority");
  const [filterRole, setFilterRole] = useState<WorkloadFilterRole>("firm");
  const [accountManagerId, setAccountManagerId] = useState<string>(
    WORKLOAD_ACCOUNT_MANAGERS[0].id
  );
  const [managerId, setManagerId] = useState<string>(WORKLOAD_MANAGERS[0].id);

  const nzWorkload = useMemo(() => {
    if (region !== "NZ") return undefined;
    const personId =
      filterRole === "accountManager"
        ? accountManagerId
        : filterRole === "manager"
          ? managerId
          : "";
    return { filterRole, personId };
  }, [region, filterRole, accountManagerId, managerId]);

  const tabCounts = useMemo(
    () => getTaxAiActionTabListItemCounts(region, nzWorkload),
    [region, nzWorkload]
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

  const displayRows = useMemo(() => {
    const rows = [...getTaxAiAggregateRows(region, activeFilter, nzWorkload)];
    rows.sort((a, b) =>
      sortMode === "due" ? b.priority - a.priority : a.priority - b.priority
    );
    return rows;
  }, [region, activeFilter, sortMode, nzWorkload]);

  /** NZ Agentic: Partner/Manager only; Practice has no extra title segment. */
  const titleScopeSubtitle = useMemo(() => {
    if (region !== "NZ") return null;
    if (filterRole === "firm") return null;
    if (filterRole === "accountManager") {
      return (
        WORKLOAD_ACCOUNT_MANAGERS.find((p) => p.id === accountManagerId)
          ?.name ?? "Partner"
      );
    }
    return WORKLOAD_MANAGERS.find((p) => p.id === managerId)?.name ?? "Manager";
  }, [region, filterRole, accountManagerId, managerId]);

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex min-h-0 flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          compact ? "h-[251px] overflow-hidden" : "h-[522px]"
        } ${colSpan === 2 ? "w-full" : "w-[440px]"} min-w-[440px] ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex h-[54px] shrink-0 items-center justify-between gap-2 pt-3.5 pr-2 pb-2 pl-6">
          <div className="text-content-primary flex min-w-0 flex-1 flex-wrap items-baseline gap-0 text-[17px]/[24px]">
            <h3 className="min-w-0 text-left">
              <span className="font-bold">Actions</span>
              {titleScopeSubtitle != null ? (
                <span className="font-normal"> • {titleScopeSubtitle}</span>
              ) : null}
            </h3>
          </div>
          <MoreButton
            menu={
              region === "NZ" ? (
                <TaxAlertsScopeOverflow
                  radioGroupPrefix="tax-alerts-nz-ai"
                  filterRole={filterRole}
                  onFilterRoleChange={setFilterRole}
                  selectedAccountManagerId={accountManagerId}
                  onAccountManagerChange={setAccountManagerId}
                  selectedManagerId={managerId}
                  onManagerChange={setManagerId}
                >
                  <div className="border-background-tertiary border-b pb-2">
                    <TaxAlertsAiOverflow
                      sortMode={sortMode}
                      onSortChange={setSortMode}
                    />
                  </div>
                </TaxAlertsScopeOverflow>
              ) : (
                <TaxAlertsAiOverflow
                  sortMode={sortMode}
                  onSortChange={setSortMode}
                />
              )
            }
            menuClassName={
              region === "NZ"
                ? "min-w-[300px] max-w-[360px]"
                : "w-[300px]"
            }
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        <div className="flex shrink-0 gap-1 overflow-x-auto px-2">
          {TAB_ORDER.map((tabId) => {
            const isActive = activeFilter === tabId;
            return (
              <button
                key={tabId}
                type="button"
                onClick={() => setActiveFilter(tabId)}
                className={`shrink-0 px-2 py-2 text-[12px]/[16px] font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-[#0078c8] text-[#0078c8] border-b-2"
                    : "text-content-secondary hover:text-content-primary border-b-2 border-transparent"
                }`}
              >
                {tabLabels[tabId]}
              </button>
            );
          })}
        </div>

        <div
          className={
            compact
              ? "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
              : "flex min-h-0 flex-1 flex-col overflow-hidden"
          }
        >
          <div
            className={
              compact
                ? "min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2"
                : "contents"
            }
          >
            {displayRows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => openPanel("tax-actions", row.id, true)}
                className="border-background-tertiary group relative flex w-full items-center gap-2 border-t pr-2 pl-6 text-left transition-colors hover:bg-[#f8f8f9]"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1 py-3">
                  <p className="text-content-primary text-[13px]/[20px] font-medium">
                    {row.title}
                  </p>
                  <p className="text-content-secondary text-[12px]/[16px]">
                    {row.subtitle}
                  </p>
                </div>
                <div className="text-brand-primary group-hover:text-brand-secondary flex size-8 shrink-0 items-center justify-center transition-colors">
                  <ExpandDiagonal className="size-5" aria-hidden />
                </div>
              </button>
            ))}
          </div>
        </div>

        {!compact ? (
          <div className="relative mt-auto mr-auto mb-6 ml-6 flex shrink-0 gap-2">
            <button
              type="button"
              className="border-border-primary text-brand-primary inline-block w-auto flex-none cursor-pointer rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            >
              Go to Actions manager
            </button>
          </div>
        ) : null}
      </div>
    </CustomizationOverlay>
  );
}
