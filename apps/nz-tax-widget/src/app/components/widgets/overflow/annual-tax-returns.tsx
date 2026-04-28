"use client";

import { useEffect, useState } from "react";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import {
  ANNUAL_TAX_YEAR_FILTER_OPTIONS,
  NZ_GA_TAX_RETURN_CATEGORY_OPTIONS,
  UK_TAX_RETURN_TYPE_FILTER_OPTIONS,
  type NzGaTaxReturnCategoryId,
  type TaxYearId,
  type UkTaxReturnTypeId,
} from "@/app/lib/mockData/annualTaxReturns";
import {
  overflowLabeledPrimaryLabelClass,
  overflowLabeledRangeRowClass,
  overflowLabeledRangeTextClass,
  overflowLabeledSectionTitleClass,
} from "./overflowLabeledRows";
import WorkloadFilterRoleDrilldown, {
  type WorkloadFilterSubmenu,
} from "./WorkloadFilterRoleDrilldown";

interface ComponentProps {
  className?: string;
  /** Unique radio group prefix when multiple Annual tax returns widgets are on the page */
  radioGroupPrefix?: string;
  filterRole: WorkloadFilterRole;
  onFilterRoleChange: (role: WorkloadFilterRole) => void;
  selectedAccountManagerId: string;
  onAccountManagerChange: (id: string) => void;
  selectedManagerId: string;
  onManagerChange: (id: string) => void;
  /** NZ XPAC: This year / Last year (FY26 / FY25) in overflow */
  showTimePeriodFilter?: boolean;
  taxYearId?: TaxYearId;
  onTaxYearChange?: (id: TaxYearId) => void;
  /** UK “Tax returns” (returns-by-status): filter pipeline counts by return type */
  showUkReturnTypeFilter?: boolean;
  ukReturnTypeId?: UkTaxReturnTypeId;
  onUkReturnTypeChange?: (id: UkTaxReturnTypeId) => void;
  /** NZ GA / Agentic “Tax returns” (returns-by-status): Type = All returns / Sales tax / Income tax; Filter firm row = Practice */
  showNzGaReturnCategoryFilter?: boolean;
  nzGaReturnCategoryId?: NzGaTaxReturnCategoryId;
  onNzGaReturnCategoryChange?: (id: NzGaTaxReturnCategoryId) => void;
  /** NZ GA / Agentic: grouped chart vs prior FY. */
  showThisTimeLastYearCompare?: boolean;
  thisTimeLastYearEnabled?: boolean;
  onThisTimeLastYearChange?: (enabled: boolean) => void;
}

export default function AnnualTaxReturnsOverflow({
  className = "",
  radioGroupPrefix = "annual-tax-returns",
  filterRole,
  onFilterRoleChange,
  selectedAccountManagerId,
  onAccountManagerChange,
  selectedManagerId,
  onManagerChange,
  showTimePeriodFilter = false,
  taxYearId,
  onTaxYearChange,
  showUkReturnTypeFilter = false,
  ukReturnTypeId = "all",
  onUkReturnTypeChange,
  showNzGaReturnCategoryFilter = false,
  nzGaReturnCategoryId = "all",
  onNzGaReturnCategoryChange,
  showThisTimeLastYearCompare = false,
  thisTimeLastYearEnabled = false,
  onThisTimeLastYearChange,
}: ComponentProps) {
  const p = radioGroupPrefix;
  const ttlCheckboxId = `${p}-this-time-last-year`;
  const [filterSubmenu, setFilterSubmenu] =
    useState<WorkloadFilterSubmenu>("main");

  useEffect(() => {
    if (filterRole === "firm") {
      setFilterSubmenu("main");
    }
  }, [filterRole]);

  const drillProps = {
    radioGroupPrefix: p,
    filterRole,
    onFilterRoleChange,
    selectedAccountManagerId,
    onAccountManagerChange,
    selectedManagerId,
    onManagerChange,
    onSubmenuChange: setFilterSubmenu,
    firmFilterRowLabel: showNzGaReturnCategoryFilter ? "Practice" : undefined,
  };

  return (
    <div className={className}>
      {filterSubmenu === "main" ? (
        <>
          {showTimePeriodFilter &&
          taxYearId != null &&
          onTaxYearChange ? (
            <div className="border-border-primary min-w-0 border-b">
              <h3 className={overflowLabeledSectionTitleClass}>Time period</h3>
              <div
                className="flex flex-col pb-1"
                role="group"
                aria-label="Time period"
              >
                {ANNUAL_TAX_YEAR_FILTER_OPTIONS.map((y) => {
                  const selected = taxYearId === y.id;
                  return (
                    <button
                      key={y.id}
                      type="button"
                      className={overflowLabeledRangeRowClass(selected)}
                      onClick={() => onTaxYearChange(y.id)}
                    >
                      <span className={overflowLabeledPrimaryLabelClass}>
                        {y.label}
                      </span>
                      <span className={overflowLabeledRangeTextClass}>
                        {y.rangeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {showThisTimeLastYearCompare && onThisTimeLastYearChange ? (
            <div className="border-border-primary min-w-0 border-b">
              <h3 className={overflowLabeledSectionTitleClass}>Compare</h3>
              <div className="text-content-primary flex flex-col pb-2 pl-5 pr-5 pt-1 text-[15px]/[24px]">
                <div className="hover:bg-background-primary flex w-full items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id={ttlCheckboxId}
                    className="h-4 w-4 shrink-0 cursor-pointer"
                    checked={thisTimeLastYearEnabled}
                    onChange={(e) =>
                      onThisTimeLastYearChange(e.target.checked)
                    }
                  />
                  <label
                    htmlFor={ttlCheckboxId}
                    className="cursor-pointer font-normal"
                  >
                    This time last year
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          {showUkReturnTypeFilter && onUkReturnTypeChange ? (
            <div className="border-border-primary min-w-0 border-b">
              <h3 className={overflowLabeledSectionTitleClass}>Return type</h3>
              <div
                className="flex flex-col pb-1"
                role="radiogroup"
                aria-label="Return type"
              >
                {UK_TAX_RETURN_TYPE_FILTER_OPTIONS.map((opt) => {
                  const selected = ukReturnTypeId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={overflowLabeledRangeRowClass(selected)}
                      onClick={() => onUkReturnTypeChange(opt.id)}
                    >
                      <span className={overflowLabeledPrimaryLabelClass}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {showNzGaReturnCategoryFilter && onNzGaReturnCategoryChange ? (
            <div className="border-border-primary min-w-0 border-b">
              <h3 className={overflowLabeledSectionTitleClass}>Type</h3>
              <div
                className="flex flex-col pb-1"
                role="radiogroup"
                aria-label="Return type"
              >
                {NZ_GA_TAX_RETURN_CATEGORY_OPTIONS.map((opt) => {
                  const selected = nzGaReturnCategoryId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={overflowLabeledRangeRowClass(selected)}
                      onClick={() => onNzGaReturnCategoryChange(opt.id)}
                    >
                      <span className={overflowLabeledPrimaryLabelClass}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <WorkloadFilterRoleDrilldown submenu="main" {...drillProps} />
        </>
      ) : (
        <WorkloadFilterRoleDrilldown
          submenu={filterSubmenu}
          {...drillProps}
        />
      )}
    </div>
  );
}
