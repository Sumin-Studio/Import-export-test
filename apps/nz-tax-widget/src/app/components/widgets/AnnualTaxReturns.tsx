"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { MoreButton } from "@/components/global";
import { AnnualTaxReturnsChart } from "@/components/charts";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { AnnualTaxReturnsOverflow } from "./overflow";
import {
  WORKLOAD_ACCOUNT_MANAGERS,
  WORKLOAD_MANAGERS,
} from "./overflow/workload-insights";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import type { AnnualTaxChartPoint } from "@/components/charts/AnnualTaxReturns";
import {
  buildAuIncomeTaxChartSeries,
  getAnnualTaxReturnsForSelection,
  getPriorTaxYearIdForComparison,
  buildPriorYearSameTimeComparisonProfile,
  getAuIncomeTaxSummaryFromProfile,
  returnsPageTabForAuIncomeTaxChartCategory,
  scaleAnnualTaxReturnsProfileForNzGaCategory,
  scaleAnnualTaxReturnsProfileForUkReturnType,
  NZ_GA_TAX_RETURN_CATEGORY_OPTIONS,
  TAX_YEAR_OPTIONS,
  UK_TAX_RETURN_TYPE_FILTER_OPTIONS,
  type AnnualTaxReturnsProfile,
  type NzGaTaxReturnCategoryId,
  type TaxYearId,
  type UkTaxReturnTypeId,
} from "@/app/lib/mockData/annualTaxReturns";
import { useRegion } from "@/app/contexts/RegionContext";
import { getFirmStatementsPageTabCounts } from "@/app/lib/mockData/taxStatements";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";
import type { PipelineStageId } from "@/app/lib/prototypeSettings";
import { effectivePipelineStage } from "@/app/lib/prototypeSettings";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
  /** Widget heading (default “Tax returns”) */
  title?: string;
  /**
   * When false (returns-by-status): three summary tiles (two on NZ XPAC — no Ready to start);
   * no notices tile and no Filing errors tile;
   * chart omits the red Error bar. Labels follow the XPAC pipeline.
   */
  showNoticesDifferentTile?: boolean;
  /** Prefix for overflow menu radio `name`s when multiple instances exist */
  overflowRadioGroupPrefix?: string;
  /**
   * USA: show 1099-NEC / contractor pipeline (W-9 → review → file → e-file / reject)
   * instead of income tax returns. Matches Xero US 1099 reporting stages at a glance.
   */
  us1099Pipeline?: boolean;
}

/** Mock firm counts for the US 1099 pipeline chart (prototype). */
const US_1099_MOCK_PROFILE: AnnualTaxReturnsProfile = {
  readyToStart: 0,
  draft: 5,
  inProgress: 14,
  approved: 9,
  toSign: 0,
  toFile: 4,
  filed: 26,
  errors: 2,
  disputedStatements: 0,
};

function buildUs1099PipelineChartSeries(
  profile: AnnualTaxReturnsProfile
): AnnualTaxChartPoint[] {
  return [
    { category: "W-9 outstanding", value: profile.draft },
    { category: "In review", value: profile.inProgress },
    { category: "Ready to file", value: profile.approved },
    { category: "Submitted to IRS", value: profile.toFile },
    { category: "E-filed", value: profile.filed },
    ...(profile.errors > 0
      ? [{ category: "Rejected", value: profile.errors, tone: "error" as const }]
      : []),
  ];
}

type SummaryStatDef = {
  label: string;
  labelClass: string;
  /** `null` = not a returns deep-link */
  returnsTab: string | null;
  /** Optional `/tax/statements?tab=` deep-link */
  statementsTab?: string | null;
};

const NOTICES_STAT: SummaryStatDef = {
  label: "Notices that are different",
  labelClass: "text-content-secondary",
  returnsTab: null,
  statementsTab: "notices_different",
};

const ERRORS_STAT: SummaryStatDef = {
  label: "Filing errors",
  labelClass: "text-[#DE0E40]",
  returnsTab: "error",
};

function summaryStatDefs(_stage: PipelineStageId): SummaryStatDef[] {
  return [
    {
      label: "Completed",
      labelClass: "text-content-secondary",
      returnsTab: "completed",
    },
    {
      label: "Approved",
      labelClass: "text-content-secondary",
      returnsTab: "approved",
    },
    NOTICES_STAT,
    ERRORS_STAT,
  ];
}

function buildChartSeries(
  profile: {
    readyToStart: number;
    draft: number;
    inProgress: number;
    approved: number;
    toSign: number;
    toFile: number;
    filed: number;
    errors: number;
  },
  includeErrorBar: boolean,
  _stage: PipelineStageId,
  /** NZ XPAC: single Draft bucket (ready + draft), no Ready to start bar. */
  includeReadyToStartBar: boolean,
  /** NZ XPAC uses “Errors” on the bar; other stages use “Filing errors”. */
  errorBarCategory: string,
  /** NZ GA / Agentic: “Not started” bar label; default matches legacy copy. */
  readyStageCategoryLabel = "Ready to start"
) {
  const pipeline = includeReadyToStartBar
    ? ([
        { category: readyStageCategoryLabel, value: profile.readyToStart },
        { category: "Draft", value: profile.draft },
      ] as const)
    : ([
        {
          category: "Draft",
          value: profile.readyToStart + profile.draft,
        },
      ] as const);
  const rest = [
    {
      category: "Completed",
      value: profile.inProgress,
    },
    {
      category: "Approved",
      value: profile.approved,
    },
    {
      category: "Signed",
      value: profile.toSign,
    },
    { category: "Filed", value: profile.filed },
    { category: "Assessed", value: profile.toFile },
  ] as const;
  const series = [...pipeline, ...rest] as const;
  if (!includeErrorBar) {
    return [...series];
  }
  return [
    ...series,
    {
      category: errorBarCategory,
      value: profile.errors,
      tone: "error" as const,
    },
  ];
}

function subtitleForFilter(
  filterRole: WorkloadFilterRole,
  accountManagerId: string,
  managerId: string,
  taxYearShort: string
): string {
  if (filterRole === "firm") return `${taxYearShort} • All returns`;
  if (filterRole === "accountManager") {
    const person = WORKLOAD_ACCOUNT_MANAGERS.find((p) => p.id === accountManagerId);
    return person
      ? `${taxYearShort} • ${person.name}`
      : `${taxYearShort} • Partner`;
  }
  const person = WORKLOAD_MANAGERS.find((p) => p.id === managerId);
  return person
    ? `${taxYearShort} • ${person.name}`
    : `${taxYearShort} • Manager`;
}

export function AnnualTaxReturns({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
  title = "Tax returns",
  showNoticesDifferentTile = true,
  overflowRadioGroupPrefix = "annual-tax-returns",
  us1099Pipeline = false,
}: ComponentProps) {
  const { region } = useRegion();
  const isUs1099 = Boolean(us1099Pipeline) && region === "USA";
  const isAuIncomeTaxLayout =
    region === "AU" && !showNoticesDifferentTile && !isUs1099;
  const isUkReturnsByStatusLayout =
    region === "UK" && !showNoticesDifferentTile && !isUs1099;
  const isNzReturnsByStatusLayout =
    region === "NZ" && !showNoticesDifferentTile && !isUs1099;
  const { stage } = usePrototypeSettings();
  /** NZ XPAC: no Ready to start tile/bar (combined into Draft on chart). */
  const nzHideReadyToStart = region === "NZ" && stage === "xpac";
  const errorBarCategory = nzHideReadyToStart ? "Errors" : "Filing errors";
  const isNzGaTaxReturnsCategoryChrome =
    isNzReturnsByStatusLayout && (stage === "ga" || stage === "ai");
  const nzReadyStageLabel = isNzGaTaxReturnsCategoryChrome
    ? "Not started"
    : "Ready to start";
  const pipelineScopeTooltipId = `nz-tr-pipeline-info-${useId().replace(/:/g, "")}`;
  const pipelineStage = useMemo(
    () => effectivePipelineStage(stage),
    [stage]
  );
  const [filterRole, setFilterRole] = useState<WorkloadFilterRole>("firm");
  const [accountManagerId, setAccountManagerId] = useState<string>(
    WORKLOAD_ACCOUNT_MANAGERS[0].id
  );
  const [managerId, setManagerId] = useState<string>(
    WORKLOAD_MANAGERS[0].id
  );
  const [taxYearId, setTaxYearId] = useState<TaxYearId>("fy26");
  const [ukReturnTypeId, setUkReturnTypeId] =
    useState<UkTaxReturnTypeId>("all");
  const [nzGaReturnCategoryId, setNzGaReturnCategoryId] =
    useState<NzGaTaxReturnCategoryId>("all");
  const [thisTimeLastYearCompare, setThisTimeLastYearCompare] =
    useState(false);

  const showTimePeriodFilterInOverflow =
    region === "NZ" && stage === "xpac";

  useEffect(() => {
    if (taxYearId === "fy24") setTaxYearId("fy26");
  }, [taxYearId]);

  useEffect(() => {
    if (!isNzGaTaxReturnsCategoryChrome) {
      setNzGaReturnCategoryId("all");
      setThisTimeLastYearCompare(false);
    }
  }, [isNzGaTaxReturnsCategoryChrome]);

  const priorTaxYearId = useMemo(
    () =>
      isNzGaTaxReturnsCategoryChrome
        ? getPriorTaxYearIdForComparison(taxYearId)
        : null,
    [isNzGaTaxReturnsCategoryChrome, taxYearId]
  );

  useEffect(() => {
    if (priorTaxYearId == null) {
      setThisTimeLastYearCompare(false);
    }
  }, [priorTaxYearId]);

  const personId =
    filterRole === "accountManager"
      ? accountManagerId
      : filterRole === "manager"
        ? managerId
        : "";

  const baseProfile = useMemo(() => {
    if (isUs1099) return US_1099_MOCK_PROFILE;
    return getAnnualTaxReturnsForSelection(filterRole, personId, taxYearId);
  }, [isUs1099, filterRole, personId, taxYearId]);

  const profile = useMemo(() => {
    if (isUs1099) return baseProfile;
    if (isUkReturnsByStatusLayout) {
      return scaleAnnualTaxReturnsProfileForUkReturnType(
        baseProfile,
        ukReturnTypeId
      );
    }
    if (isNzGaTaxReturnsCategoryChrome) {
      return scaleAnnualTaxReturnsProfileForNzGaCategory(
        baseProfile,
        nzGaReturnCategoryId
      );
    }
    return baseProfile;
  }, [
    baseProfile,
    isUkReturnsByStatusLayout,
    ukReturnTypeId,
    isUs1099,
    isNzGaTaxReturnsCategoryChrome,
    nzGaReturnCategoryId,
  ]);

  /** Prior FY at same calendar point vs current NZ GA view (not year-end fy25 mock). */
  const profilePrior = useMemo(() => {
    if (!isNzGaTaxReturnsCategoryChrome || priorTaxYearId == null) {
      return null;
    }
    return buildPriorYearSameTimeComparisonProfile(profile);
  }, [isNzGaTaxReturnsCategoryChrome, priorTaxYearId, profile]);

  const statDefs = useMemo(() => summaryStatDefs(pipelineStage), [pipelineStage]);

  const statsData = useMemo(() => {
    if (isUs1099) {
      return [
        {
          value: String(profile.inProgress),
          label: "In review",
          labelClass: "text-content-secondary",
          returnsTab: "all" as const,
        },
        {
          value: String(profile.approved),
          label: "Ready to file",
          labelClass: "text-content-secondary",
          returnsTab: "approved" as const,
        },
      ];
    }
    if (isAuIncomeTaxLayout) {
      const au = getAuIncomeTaxSummaryFromProfile(profile);
      return [
        {
          value: String(au.readyToStart),
          label: "Ready to start",
          labelClass: "text-content-secondary",
          returnsTab: "draft" as const,
        },
        {
          value: String(au.inProgress),
          label: "In progress",
          labelClass: "text-content-secondary",
          returnsTab: "all" as const,
        },
        {
          value: String(au.filed),
          label: "Filed",
          labelClass: "text-content-secondary",
          returnsTab: "filed" as const,
        },
      ];
    }

    const readyToStartStat = {
      label: nzReadyStageLabel,
      labelClass: "text-content-secondary",
      returnsTab: "ready_to_start" as const,
      value: String(profile.readyToStart),
    };
    const toApprove = {
      ...statDefs[0],
      value: String(profile.inProgress),
    };
    const toSign = { ...statDefs[1], value: String(profile.approved) };
    const errors = {
      ...statDefs[3],
      value: String(profile.errors),
      label:
        profile.errors === 1
          ? nzHideReadyToStart
            ? "Error"
            : "Filing error"
          : nzHideReadyToStart
            ? "Errors"
            : "Filing errors",
    };

    if (showNoticesDifferentTile) {
      const noticesDifferent =
        getFirmStatementsPageTabCounts(taxYearId).notices_different;
      const notices = {
        ...statDefs[2],
        value: String(noticesDifferent),
      };
      return [notices, errors, toSign, toApprove];
    }

    if (nzHideReadyToStart) {
      return [toApprove, toSign];
    }
    return [readyToStartStat, toApprove, toSign];
  }, [
    profile,
    taxYearId,
    showNoticesDifferentTile,
    statDefs,
    isAuIncomeTaxLayout,
    isUs1099,
    nzHideReadyToStart,
    nzReadyStageLabel,
  ]);

  const chartSeriesData = useMemo(() => {
    if (isUs1099) {
      return buildUs1099PipelineChartSeries(profile);
    }
    if (isAuIncomeTaxLayout) {
      return buildAuIncomeTaxChartSeries(profile);
    }
    return buildChartSeries(
      profile,
      showNoticesDifferentTile,
      pipelineStage,
      !nzHideReadyToStart,
      errorBarCategory,
      nzReadyStageLabel
    );
  }, [
    profile,
    showNoticesDifferentTile,
    pipelineStage,
    isAuIncomeTaxLayout,
    isUs1099,
    nzHideReadyToStart,
    errorBarCategory,
    nzReadyStageLabel,
  ]);

  const chartPriorSeriesData = useMemo(() => {
    if (isUs1099 || profilePrior == null) {
      return null;
    }
    if (isAuIncomeTaxLayout) {
      return buildAuIncomeTaxChartSeries(profilePrior);
    }
    return buildChartSeries(
      profilePrior,
      showNoticesDifferentTile,
      pipelineStage,
      !nzHideReadyToStart,
      errorBarCategory,
      nzReadyStageLabel
    );
  }, [
    profilePrior,
    showNoticesDifferentTile,
    pipelineStage,
    isAuIncomeTaxLayout,
    isUs1099,
    nzHideReadyToStart,
    errorBarCategory,
    nzReadyStageLabel,
  ]);

  const pipelineAccessibilityDescription = useMemo(() => {
    if (isUs1099) {
      return (
        "1099 pipeline by stage: W-9 outstanding, In review, Ready to file, Submitted to IRS, E-filed, and Rejected."
      );
    }
    if (isAuIncomeTaxLayout) {
      return (
        "Income tax returns pipeline by stage: Draft, Completed, Approved, To sign, To file, and Submitted."
      );
    }
    if (nzHideReadyToStart) {
      return showNoticesDifferentTile
        ? "Tax returns pipeline by stage: Draft, Completed, Approved, Signed, Filed, Assessed, and Errors."
        : "Tax returns pipeline by stage: Draft, Completed, Approved, Signed, Filed, Assessed.";
    }
    return showNoticesDifferentTile
      ? `Tax returns pipeline by stage: ${nzReadyStageLabel}, Draft, Completed, Approved, Signed, Filed, Assessed, and Filing errors.`
      : `Tax returns pipeline by stage: ${nzReadyStageLabel}, Draft, Completed, Approved, Signed, Filed, Assessed, and Filing errors.`;
  }, [
    showNoticesDifferentTile,
    isAuIncomeTaxLayout,
    isUs1099,
    nzHideReadyToStart,
    nzReadyStageLabel,
  ]);

  const taxYearShort =
    TAX_YEAR_OPTIONS.find((y) => y.id === taxYearId)?.shortLabel ?? "FY26";
  const pipelineAccessibilityDescriptionEffective = useMemo(() => {
    const compareOn =
      thisTimeLastYearCompare &&
      chartPriorSeriesData != null &&
      chartPriorSeriesData.length === chartSeriesData.length;
    if (!compareOn) return pipelineAccessibilityDescription;
    return `${pipelineAccessibilityDescription} Bars compare this year to last year; a legend below the chart labels the two series.`;
  }, [
    pipelineAccessibilityDescription,
    thisTimeLastYearCompare,
    chartPriorSeriesData,
    chartSeriesData.length,
  ]);

  const subtitle = useMemo(() => {
    if (isUs1099) {
      return `${taxYearShort} · All clients`;
    }
    if (isAuIncomeTaxLayout) {
      return taxYearShort;
    }
    if (isUkReturnsByStatusLayout && ukReturnTypeId !== "all") {
      const opt = UK_TAX_RETURN_TYPE_FILTER_OPTIONS.find(
        (o) => o.id === ukReturnTypeId
      );
      return opt ? `${taxYearShort} • ${opt.label}` : taxYearShort;
    }
    if (isNzGaTaxReturnsCategoryChrome) {
      const scopeLabel =
        NZ_GA_TAX_RETURN_CATEGORY_OPTIONS.find(
          (o) => o.id === nzGaReturnCategoryId
        )?.label ?? "All returns";
      if (filterRole === "firm") {
        return scopeLabel;
      }
      const person =
        filterRole === "accountManager"
          ? WORKLOAD_ACCOUNT_MANAGERS.find((p) => p.id === accountManagerId)
              ?.name ?? "Partner"
          : WORKLOAD_MANAGERS.find((p) => p.id === managerId)?.name ?? "Manager";
      return `${scopeLabel} • ${person}`;
    }
    return subtitleForFilter(
      filterRole,
      accountManagerId,
      managerId,
      taxYearShort
    );
  }, [
    isUs1099,
    isAuIncomeTaxLayout,
    isUkReturnsByStatusLayout,
    isNzGaTaxReturnsCategoryChrome,
    nzGaReturnCategoryId,
    ukReturnTypeId,
    filterRole,
    accountManagerId,
    managerId,
    taxYearShort,
  ]);

  const headingTitle = isAuIncomeTaxLayout ? "Income tax returns" : title;

  const statsGrid = (
        <div
          className={`divide-background-tertiary grid shrink-0 items-start gap-x-6 gap-y-2 px-6 pb-2 ${
            isAuIncomeTaxLayout
              ? "grid-cols-3 divide-x"
              : showNoticesDifferentTile
                ? colSpan === 2
                  ? "grid-cols-4 divide-x"
                  : "grid-cols-2"
                : nzHideReadyToStart
                  ? "grid-cols-2 divide-x"
                  : "grid-cols-3 divide-x"
          }`}
        >
          {statsData.map((stat) => {
            const href =
              "statementsTab" in stat && stat.statementsTab != null
                ? `/tax/statements?tab=${stat.statementsTab}&year=${taxYearId}`
                : "returnsTab" in stat && stat.returnsTab != null
                  ? `/tax/all-returns?tab=${stat.returnsTab}`
                  : null;
            const isLinkable = href != null;
            const inner = (
              <>
                <div className="flex items-baseline pb-[2px]">
                  <p
                    className={`text-[24px]/[28px] font-light text-[#404756] ${isLinkable ? "transition-colors group-hover:text-[#0078c8]" : ""}`}
                  >
                    {stat.value}
                  </p>
                </div>
                <p
                  className={`${stat.labelClass} text-[13px]/[16px] underline-offset-2 ${isLinkable ? `transition-colors group-hover:underline ${String(stat.labelClass).includes("DE0E40") ? "group-hover:text-[#b90e32]" : "group-hover:text-[#0078c8]"}` : ""}`}
                >
                  {stat.label}
                </p>
              </>
            );
            return (
              <div
                key={stat.label}
                className={`min-w-0 ${
                  !isAuIncomeTaxLayout &&
                  colSpan === 1 &&
                  showNoticesDifferentTile
                    ? "border-background-tertiary odd:border-r last:!border-r-0"
                    : ""
                }`}
              >
                {!isLinkable ? (
                  <div className="block cursor-default py-1 px-2">{inner}</div>
                ) : (
                  <Link
                    href={href}
                    className="group block py-1 px-2 transition-colors"
                  >
                    {inner}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
  );

  const comparisonActive =
    isNzGaTaxReturnsCategoryChrome &&
    thisTimeLastYearCompare &&
    chartPriorSeriesData != null &&
    chartPriorSeriesData.length === chartSeriesData.length;

  const chartBlock = (
        <div className="mt-4 flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 pt-2">
            <AnnualTaxReturnsChart
              className="min-h-0"
              colSpan={colSpan}
              emphasizedBarIndex={null}
              seriesData={chartSeriesData}
              accessibilityPipelineDescription={
                pipelineAccessibilityDescriptionEffective
              }
              smallCountYAxis={isAuIncomeTaxLayout || isUs1099}
              categoryToTab={
                isUs1099
                  ? () => null
                  : isAuIncomeTaxLayout
                    ? returnsPageTabForAuIncomeTaxChartCategory
                    : undefined
              }
              comparisonSeriesData={
                comparisonActive ? chartPriorSeriesData : null
              }
              comparisonThisYearLegend={
                comparisonActive ? "This year" : undefined
              }
              comparisonPriorYearLegend={
                comparisonActive ? "Last year" : undefined
              }
            />
          </div>
        </div>
  );

  const footerBlock = (
        <div className="relative mt-auto mr-auto mb-6 ml-6 flex shrink-0 gap-2">
          <Link
            href="/tax/all-returns"
            className="border-border-primary text-brand-primary inline-block w-auto flex-none cursor-pointer rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
          >
            {isUs1099
              ? "View 1099 work"
              : region === "NZ"
                ? "Go to tax"
                : "Go to tax manager"}
          </Link>
        </div>
  );

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[522px] min-h-0 ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex h-[54px] shrink-0 items-center justify-between gap-2 pt-3.5 pr-2 pb-2 pl-6">
          <div className="text-content-primary flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-[17px]/[24px]">
            <h3 className="flex min-w-0 cursor-pointer flex-wrap items-center gap-1.5 text-left">
              <span className="font-bold hover:underline">{headingTitle}</span>
              <span className="font-normal">• {subtitle}</span>
              {isNzGaTaxReturnsCategoryChrome ? (
                <>
                  <button
                    type="button"
                    className="text-content-secondary hover:text-content-primary inline-flex size-5 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0078c8]/40"
                    aria-label="Excludes L letter and D status clients"
                    data-tooltip-id={pipelineScopeTooltipId}
                    data-tooltip-content="Excludes L letter and D status clients"
                    data-tooltip-offset={8}
                    data-tooltip-place="top"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="size-4"
                      aria-hidden
                    >
                      <circle cx="12" cy="12" r="9" fill="none" />
                      <circle cx="12" cy="8" r="0.85" fill="currentColor" />
                      <path strokeLinecap="round" d="M12 11.25V16.5" />
                    </svg>
                  </button>
                  <Tooltip className="tooltip" id={pipelineScopeTooltipId} />
                </>
              ) : null}
            </h3>
          </div>
          {!isUs1099 ? (
            <div className="flex shrink-0 items-center gap-2">
              <MoreButton
                menu={
                  <AnnualTaxReturnsOverflow
                    radioGroupPrefix={overflowRadioGroupPrefix}
                    filterRole={filterRole}
                    onFilterRoleChange={setFilterRole}
                    selectedAccountManagerId={accountManagerId}
                    onAccountManagerChange={setAccountManagerId}
                    selectedManagerId={managerId}
                    onManagerChange={setManagerId}
                    showTimePeriodFilter={showTimePeriodFilterInOverflow}
                    taxYearId={taxYearId}
                    onTaxYearChange={setTaxYearId}
                    showUkReturnTypeFilter={isUkReturnsByStatusLayout}
                    ukReturnTypeId={ukReturnTypeId}
                    onUkReturnTypeChange={setUkReturnTypeId}
                    showNzGaReturnCategoryFilter={isNzGaTaxReturnsCategoryChrome}
                    nzGaReturnCategoryId={nzGaReturnCategoryId}
                    onNzGaReturnCategoryChange={setNzGaReturnCategoryId}
                    showThisTimeLastYearCompare={
                      isNzGaTaxReturnsCategoryChrome &&
                      priorTaxYearId != null
                    }
                    thisTimeLastYearEnabled={thisTimeLastYearCompare}
                    onThisTimeLastYearChange={setThisTimeLastYearCompare}
                  />
                }
                menuClassName="min-w-[300px] max-w-[360px]"
                position={{ to: "bottom end", gap: "4px" }}
              />
            </div>
          ) : null}
        </div>

        {statsGrid}
        {chartBlock}
        {footerBlock}
      </div>
    </CustomizationOverlay>
  );
}

export default AnnualTaxReturns;
