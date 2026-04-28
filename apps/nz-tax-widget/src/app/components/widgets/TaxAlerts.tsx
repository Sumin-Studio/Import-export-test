"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/app/components/ui/icons";
import { MoreButton } from "@/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { TaxAlertsAiTile } from "./TaxAlertsAiTile";
import TaxAlertsScopeOverflow from "./overflow/tax-alerts-scope-overflow";
import {
  WORKLOAD_ACCOUNT_MANAGERS,
  WORKLOAD_MANAGERS,
} from "./overflow/workload-insights";
import { useRegion } from "@/app/contexts/RegionContext";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import { getTaxAlertRowsForRegion } from "@/app/lib/taxAlertsRegionalContent";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
  /** Short tile (251px) like Quick actions; no footer CTA; list scrolls if needed. */
  compact?: boolean;
}

export function TaxAlerts({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
  compact = false,
}: ComponentProps) {
  const { region } = useRegion();
  const { stage } = usePrototypeSettings();
  const [filterRole, setFilterRole] = useState<WorkloadFilterRole>("firm");
  const [accountManagerId, setAccountManagerId] = useState<string>(
    WORKLOAD_ACCOUNT_MANAGERS[0].id
  );
  const [managerId, setManagerId] = useState<string>(WORKLOAD_MANAGERS[0].id);

  const showNzGaScopeFilter =
    region === "NZ" && stage === "ga";

  const workloadPersonId =
    filterRole === "accountManager"
      ? accountManagerId
      : filterRole === "manager"
        ? managerId
        : "";

  const listRows = useMemo(
    () =>
      getTaxAlertRowsForRegion(region, {
        nzPrototypeStage: region === "NZ" ? stage : undefined,
        workloadFilter:
          showNzGaScopeFilter
            ? { filterRole, personId: workloadPersonId }
            : undefined,
      }),
    [
      region,
      stage,
      showNzGaScopeFilter,
      filterRole,
      workloadPersonId,
    ]
  );

  /** NZ GA: show Partner/Manager name only; Practice (firm) has no extra title segment. */
  const titleScopeSubtitle = useMemo(() => {
    if (!showNzGaScopeFilter) return null;
    if (filterRole === "firm") return null;
    if (filterRole === "accountManager") {
      return (
        WORKLOAD_ACCOUNT_MANAGERS.find((p) => p.id === accountManagerId)
          ?.name ?? "Partner"
      );
    }
    return WORKLOAD_MANAGERS.find((p) => p.id === managerId)?.name ?? "Manager";
  }, [showNzGaScopeFilter, filterRole, accountManagerId, managerId]);

  if (stage === "ai") {
    return (
      <TaxAlertsAiTile
        className={className}
        isCustomising={isCustomising}
        onToggleColSpan={onToggleColSpan}
        colSpan={colSpan}
        canToggleSize={canToggleSize}
        compact={compact}
      />
    );
  }

  const rowPad = "py-[6px]";
  const titleClass = compact
    ? "text-content-primary text-[13px]/[18px]"
    : "text-content-primary text-[13px]/[20px]";
  const subClass = compact
    ? "text-content-secondary text-[12px]/[16px]"
    : "text-content-secondary text-[13px]/[1.45]";

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex min-h-0 ${
          compact ? "h-[251px] overflow-hidden" : "h-[522px]"
        } ${colSpan === 2 ? "w-full" : "w-[440px]"} min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex h-[54px] shrink-0 items-center justify-between gap-2 pt-3.5 pr-2 pb-2 pl-6">
          <div className="text-content-primary flex min-w-0 flex-1 flex-wrap items-baseline gap-0 text-[17px]/[24px]">
            <h3 className="min-w-0 text-left">
              <span className="font-bold">Tax alerts</span>
              {titleScopeSubtitle != null ? (
                <span className="font-normal"> • {titleScopeSubtitle}</span>
              ) : null}
            </h3>
          </div>
          {showNzGaScopeFilter ? (
            <div className="flex shrink-0 items-center gap-2">
              <MoreButton
                menu={
                  <TaxAlertsScopeOverflow
                    radioGroupPrefix="tax-alerts-nz-ga"
                    filterRole={filterRole}
                    onFilterRoleChange={setFilterRole}
                    selectedAccountManagerId={accountManagerId}
                    onAccountManagerChange={setAccountManagerId}
                    selectedManagerId={managerId}
                    onManagerChange={setManagerId}
                  />
                }
                menuClassName="min-w-[300px] max-w-[360px]"
                position={{ to: "bottom end", gap: "4px" }}
              />
            </div>
          ) : null}
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
            {listRows.map((row) => (
              <Link
                key={row.id}
                href={row.href}
                className={`border-background-tertiary group relative flex w-full items-start gap-2 border-t pr-2 pl-6 text-left transition-colors hover:bg-[#f8f8f9] ${
                  compact ? "py-0" : "py-1"
                }`}
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 w-[3px] ${row.stripeClass}`}
                  aria-hidden
                />
                <div className={`flex flex-1 flex-col ${rowPad}`}>
                  <p className={titleClass}>{row.title}</p>
                  <p className={subClass}>{row.subtitle}</p>
                </div>
                <div className="flex size-8 shrink-0 items-center justify-center py-1">
                  <Arrow className="text-brand-primary group-hover:text-brand-secondary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {!compact ? (
          <div className="relative mt-auto mr-auto mb-6 ml-6 flex shrink-0 gap-2">
            <Link
              href="/tax/all-returns"
              className="border-border-primary text-brand-primary inline-block w-auto flex-none cursor-pointer rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            >
              {region === "NZ" ? "Go to tax" : "Go to tax manager"}
            </Link>
          </div>
        ) : null}
      </div>
    </CustomizationOverlay>
  );
}

export default TaxAlerts;
