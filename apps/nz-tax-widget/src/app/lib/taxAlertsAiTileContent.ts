import type { Region } from "@/app/lib/regions";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import { countTaxActionPanelStats } from "@/app/lib/taxActionsPanelContent";
import { getTaxAlertRowsForRegion } from "@/app/lib/taxAlertsRegionalContent";

export type TaxAiNzWorkloadFilter = {
  filterRole: WorkloadFilterRole;
  personId: string;
};

export type TaxAiActionTabId =
  | "all"
  | "tax"
  | "payroll"
  | "insights"
  | "bookkeeping";

/** Lower `priority` = more important (shown first when sorted by priority). */
export type TaxAiActionRow = {
  id: string;
  title: string;
  subtitle: string;
  priority: number;
};

/** Priority for tax-tab rows from {@link getTaxAlertRowsForRegion} stub ids. */
const TAX_STUB_PRIORITY: Record<string, number> = {
  "returns-errors": 1,
  disputed: 2,
  "notices-different": 4,
  "transfers-different": 5,
  "missed-payments": 6,
  "au-bas": 4,
  "au-tfn": 8,
  "au-super": 6,
  "uk-nics": 5,
  "uk-ct": 6,
  "uk-mtd": 3,
  "us-ext": 7,
  "us-1099": 5,
  "us-est": 2,
  "row-vat": 5,
  "row-fx": 9,
};

function sortByPriority(rows: TaxAiActionRow[]): TaxAiActionRow[] {
  return [...rows].sort((a, b) => a.priority - b.priority);
}

function mapTaxStubsToAiRows(
  region: Region | string,
  nzWorkload?: TaxAiNzWorkloadFilter
): TaxAiActionRow[] {
  return sortByPriority(
    getTaxAlertRowsForRegion(
      region,
      nzWorkload ? { workloadFilter: nzWorkload } : undefined
    ).map((r) => {
      const id = region === "NZ" ? `nz-${r.id}` : r.id;
      return {
        id,
        title: r.title,
        subtitle: r.subtitle,
        priority: TAX_STUB_PRIORITY[r.id] ?? 10,
      };
    })
  );
}

function nzPayrollRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "nz-paye-due",
      title: "PAYE and deductions payment due",
      subtitle: "3 employers · due 20th",
      priority: 6,
    },
    {
      id: "nz-kiwisaver",
      title: "KiwiSaver employer contribution variance",
      subtitle: "2 clients · review before filing",
      priority: 10,
    },
    {
      id: "nz-payday",
      title: "Payday filing overdue",
      subtitle: "1 client · 4 days late",
      priority: 3,
    },
    {
      id: "nz-student-loan",
      title: "Student loan deduction notices",
      subtitle: "9 adjustments · 5 employers",
      priority: 8,
    },
    {
      id: "nz-pr-green-fyi",
      title: "PAYE filing health",
      subtitle: "All employers current · 6 schemes · nothing to file",
      priority: 22,
    },
  ]);
}

function nzInsightsRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "nz-prov",
      title: "Provisional tax instalment coming up",
      subtitle: "6 clients · P3 FY26",
      priority: 8,
    },
    {
      id: "nz-gst-freq",
      title: "GST filing frequency review",
      subtitle: "2 entities · turnover threshold",
      priority: 11,
    },
    {
      id: "nz-residential",
      title: "Residential land withholding (RLWT)",
      subtitle: "1 property settlement · checklist",
      priority: 9,
    },
    {
      id: "nz-fbt-proxy",
      title: "FBT proxy benefit modelling",
      subtitle: "18 motor vehicles · 6 employers · CO₂ bands",
      priority: 10,
    },
    {
      id: "nz-ins-rhythm-fyi",
      title: "Firm-wide filing rhythm",
      subtitle: "On track · 4 client groups · next 45 days",
      priority: 21,
    },
  ]);
}

function nzBookkeepingRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "nz-bank-rules",
      title: "Bank feed rules suggested",
      subtitle: "8 accounts · recurring transactions",
      priority: 15,
    },
    {
      id: "nz-old-unreconciled",
      title: "Unreconciled bank lines (90+ days)",
      subtitle: "12 clients · oldest 238 days",
      priority: 12,
    },
    {
      id: "nz-missing-docs",
      title: "GST return missing attachments",
      subtitle: "5 returns · source documents",
      priority: 7,
    },
    {
      id: "nz-spend-money",
      title: "Spend money transactions uncoded",
      subtitle: "47 lines · 9 clients · month close",
      priority: 9,
    },
    {
      id: "nz-bk-rules-applied-fyi",
      title: "Bank rules applied overnight",
      subtitle: "JAX posted 3 rules · audit trail only · no review queue",
      priority: 20,
    },
  ]);
}

function auPayrollRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "au-stp",
      title: "Single Touch Payroll finalisation",
      subtitle: "4 employers · EOFY",
      priority: 5,
    },
    {
      id: "au-sgc-risk",
      title: "Super guarantee charge risk",
      subtitle: "2 clients · quarter reconciliation",
      priority: 2,
    },
    {
      id: "au-lsl",
      title: "Long service leave accrual uplift",
      subtitle: "7 employees · 3 states · award change",
      priority: 7,
    },
    {
      id: "au-stp-health-fyi",
      title: "STP event stream health",
      subtitle: "No gaps · 5 employers · last 14 days",
      priority: 22,
    },
  ]);
}

function auInsightsRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "au-cash",
      title: "Cash flow pressure flagged",
      subtitle: "3 clients · BAS vs bank trend",
      priority: 6,
    },
    {
      id: "au-tfn-pending",
      title: "TFN declaration follow-ups",
      subtitle: "6 employees · payroll",
      priority: 8,
    },
    {
      id: "au-ato-nudge",
      title: "ATO pre-fill vs ledger drift",
      subtitle: "11 data points · 4 clients · interest exposure",
      priority: 5,
    },
    {
      id: "au-ins-margin-fyi",
      title: "Gross margin vs prior BAS quarter",
      subtitle: "Stable · 7 clients · advisory snapshot",
      priority: 21,
    },
  ]);
}

function auBookkeepingRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "au-bas-draft",
      title: "BAS drafts not lodged",
      subtitle: "5 clients · prior quarter",
      priority: 4,
    },
    {
      id: "au-bank-rec",
      title: "Bank reconciliation backlog",
      subtitle: "9 clients · 50+ lines each",
      priority: 9,
    },
    {
      id: "au-lockbox",
      title: "Lockbox / undeposited funds build-up",
      subtitle: "6 clients · 31 payments not batched",
      priority: 8,
    },
    {
      id: "au-bk-feed-health-fyi",
      title: "Bank feed latency",
      subtitle: "Within SLA · 4 practices · no reconnect needed",
      priority: 20,
    },
  ]);
}

function ukPayrollRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "uk-ni",
      title: "NICs category changes (2026)",
      subtitle: "12 clients with increased employment costs · NICs to 15%",
      priority: 5,
    },
    {
      id: "uk-pension",
      title: "Workplace pension re-enrolment",
      subtitle: "3 employers · staging date",
      priority: 8,
    },
    {
      id: "uk-p32-fps",
      title: "P32 vs FPS payment mismatch",
      subtitle: "6 HMRC notices · 4 PAYE schemes",
      priority: 4,
    },
    {
      id: "uk-pension-file-fyi",
      title: "Pension contribution file sync",
      subtitle: "Matched to payroll · 4 employers · this month",
      priority: 22,
    },
  ]);
}

function ukInsightsRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "uk-mtd-nudge",
      title: "MTD for ITSA nudge list",
      subtitle: "4 sole traders · digital records",
      priority: 3,
    },
    {
      id: "uk-ct-instalment",
      title: "Corporation tax payment reminder",
      subtitle: "8 companies · CT600 window",
      priority: 6,
    },
    {
      id: "uk-cash-tax",
      title: "Quarterly instalment vs cash tax timing",
      subtitle: "5 groups · s455 and director loan overlap",
      priority: 7,
    },
    {
      id: "uk-ins-forecast-fyi",
      title: "Cash tax vs management forecast",
      subtitle: "Aligned · 3 groups · board pack appendix",
      priority: 21,
    },
  ]);
}

function ukBookkeepingRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "uk-vat-anom",
      title: "VAT return anomalies vs ledger",
      subtitle: "2 clients · bridging figures",
      priority: 4,
    },
    {
      id: "uk-cis",
      title: "CIS statements not matched",
      subtitle: "5 subcontractors · month end",
      priority: 7,
    },
    {
      id: "uk-bank-fees",
      title: "Bank charges coded to suspense",
      subtitle: "14 accounts · 3 practices · review queue",
      priority: 6,
    },
    {
      id: "uk-bk-vat-lock-fyi",
      title: "VAT period lock status",
      subtitle: "Returns locked after filing · 5 entities · no reopen",
      priority: 20,
    },
  ]);
}

function usPayrollRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "us-941",
      title: "Form 941 deposit schedule",
      subtitle: "2 clients · next federal deposit",
      priority: 5,
    },
    {
      id: "us-w2",
      title: "W-2 / W-3 prep checklist",
      subtitle: "7 employers · before January deadline",
      priority: 4,
    },
    {
      id: "us-tip-allocation",
      title: "Tip pooling and credit card fees",
      subtitle: "16 pay runs · 5 restaurants · FLSA check",
      priority: 6,
    },
    {
      id: "us-deposit-941-fyi",
      title: "Federal tax deposit schedule",
      subtitle: "Next deposits calculated · 4 clients · on schedule",
      priority: 22,
    },
  ]);
}

function usInsightsRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "us-insights-est",
      title: "Estimated tax shortfall risk",
      subtitle: "4 clients · safe harbour",
      priority: 2,
    },
    {
      id: "us-insights-ext",
      title: "Extension clients — return due soon",
      subtitle: "6 entities · calendar",
      priority: 5,
    },
    {
      id: "us-ubi-nfp",
      title: "Unrelated business income (UBI) screening",
      subtitle: "3 NFPs · 12 revenue streams · Form 990-T",
      priority: 6,
    },
    {
      id: "us-ins-cash-fyi",
      title: "Operating cash vs tax payments",
      subtitle: "Healthy buffer · 5 clients · rolling 90 days",
      priority: 21,
    },
  ]);
}

function usBookkeepingRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "us-nec-recon",
      title: "1099-NEC vendor mismatches",
      subtitle: "9 vendors · reconcile before filing",
      priority: 4,
    },
    {
      id: "us-cc",
      title: "Credit card feeds disconnected",
      subtitle: "3 clients · refresh bank link",
      priority: 9,
    },
    {
      id: "us-class-memo",
      title: "Class tracking vs tax return mapping",
      subtitle: "2 LLCs · 40 classes · K-1 tie-out",
      priority: 7,
    },
    {
      id: "us-bk-cc-cleared-fyi",
      title: "Corporate card clearing accounts",
      subtitle: "Balanced to zero · 3 clients · month end",
      priority: 20,
    },
  ]);
}

function rowPayrollRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "row-payroll",
      title: "Multi-country payroll cut-off",
      subtitle: "5 entities · local filing dates",
      priority: 5,
    },
    {
      id: "row-benefits",
      title: "Benefits in kind reporting",
      subtitle: "2 groups · statutory deadlines",
      priority: 7,
    },
    {
      id: "row-shadow-payroll",
      title: "Shadow payroll true-up",
      subtitle: "10 assignments · 4 host countries",
      priority: 3,
    },
    {
      id: "row-pr-clock-fyi",
      title: "Global payroll cut-off clock",
      subtitle: "All regions green · 5 entities · next cycle",
      priority: 22,
    },
  ]);
}

function rowInsightsRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "row-transfer",
      title: "Transfer pricing documentation",
      subtitle: "2 groups · year-end memo",
      priority: 6,
    },
    {
      id: "row-indirect-clash",
      title: "Indirect tax calendar clash",
      subtitle: "7 countries · next 30 days",
      priority: 2,
    },
    {
      id: "row-pillar-two",
      title: "Pillar Two top-up tax scenarios",
      subtitle: "4 jurisdictions · safe harbour vs detailed CbCR",
      priority: 4,
    },
    {
      id: "row-ins-liquidity-fyi",
      title: "Regional liquidity vs tax payments",
      subtitle: "Within policy · 2 SSCs · weekly dashboard",
      priority: 21,
    },
  ]);
}

function rowBookkeepingRows(): TaxAiActionRow[] {
  return sortByPriority([
    {
      id: "row-fx-reval",
      title: "FX revaluation differences",
      subtitle: "3 entities · month close",
      priority: 8,
    },
    {
      id: "row-interco",
      title: "Intercompany balances unreconciled",
      subtitle: "4 pairs · elimination prep",
      priority: 4,
    },
    {
      id: "row-close-pack",
      title: "Month-end close pack incomplete",
      subtitle: "6 entities · 12 checklist items",
      priority: 5,
    },
    {
      id: "row-bk-ic-rec-fyi",
      title: "Intercompany rec status",
      subtitle: "Matched pairs · 4 entities · no exceptions this close",
      priority: 20,
    },
  ]);
}

/** Agentic Actions tile only — extra tax queues (classic Tax alerts unchanged). */
function nzAgenticExtraTaxRows(): TaxAiActionRow[] {
  return [
    {
      id: "nz-rwt-certs",
      title: "RWT certificate renewals",
      subtitle: "11 certificates · 4 clients",
      priority: 5,
    },
    {
      id: "nz-gst-adj",
      title: "GST filing adjustments pending approval",
      subtitle: "6 adjustments · 3 entities",
      priority: 7,
    },
    {
      id: "nz-rd-tax",
      title: "R&D tax credit documentation",
      subtitle: "4 claims · 2 groups · FY25 wash-up",
      priority: 9,
    },
  ];
}

function auAgenticExtraTaxRows(): TaxAiActionRow[] {
  return [
    {
      id: "au-div7a",
      title: "Division 7A minimum repayments",
      subtitle: "5 loans below benchmark · 3 corporate groups",
      priority: 3,
    },
    {
      id: "au-paygw",
      title: "PAYG withholding variance",
      subtitle: "14 pay events · 6 employers",
      priority: 5,
    },
  ];
}

function ukAgenticExtraTaxRows(): TaxAiActionRow[] {
  return [
    {
      id: "uk-badr",
      title: "Business Asset Disposal Relief (BADR) rate change",
      subtitle: "9 business exits reviewed · 4 clients · 10% → 14%",
      priority: 4,
    },
    {
      id: "uk-p11d-batch",
      title: "P11D(b) benefits corrections",
      subtitle: "22 benefit lines · 7 employers",
      priority: 6,
    },
  ];
}

function usAgenticExtraTaxRows(): TaxAiActionRow[] {
  return [
    {
      id: "us-nexus",
      title: "Economic nexus thresholds",
      subtitle: "6 new state registrations suggested · 4 clients",
      priority: 6,
    },
    {
      id: "us-179",
      title: "Section 179 / bonus depreciation tie-out",
      subtitle: "11 fixed assets · 3 partnerships",
      priority: 4,
    },
  ];
}

function rowAgenticExtraTaxRows(): TaxAiActionRow[] {
  return [
    {
      id: "row-pe",
      title: "Permanent establishment screening",
      subtitle: "8 travel patterns · 3 regional groups",
      priority: 5,
    },
    {
      id: "row-wht",
      title: "Withholding tax reclaim packages",
      subtitle: "5 treaty claims · 2 shared service centres",
      priority: 8,
    },
  ];
}

/** FYI / already aligned — client cards only in the Actions sidebar. */
function nzTaxInformativeMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "nz-fsj-fyi",
      title: "Foreign super disclosure (FY25)",
      subtitle: "Lodged · information only · 2 inbound assignees",
      priority: 24,
    },
    {
      id: "nz-ird-log-fyi",
      title: "IRD correspondence logged",
      subtitle: "No balance impact · 1 client · filed this week",
      priority: 26,
    },
  ];
}

function nzTaxActionableMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "nz-gst-dup-inv",
      title: "Duplicate GST invoice posting",
      subtitle: "JAX matched bank to bills · 2 clients · approve to tidy",
      priority: 7,
    },
  ];
}

function auTaxInformativeMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "au-loss-carry-fyi",
      title: "Tax losses carry-forward schedule",
      subtitle: "Validated · 5 entities · no amendment needed",
      priority: 25,
    },
    {
      id: "au-bas-velocity-fyi",
      title: "BAS lodgement cadence",
      subtitle: "On time · 14 clients · trailing 4 quarters",
      priority: 23,
    },
  ];
}

function auTaxActionableMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "au-gst-export-jax",
      title: "GST-free export evidence pack",
      subtitle: "JAX indexed AWBs vs BAS · 1 exporter · pick treatment",
      priority: 8,
    },
  ];
}

function ukTaxInformativeMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "uk-vat-dd-fyi",
      title: "VAT direct debit confirmations",
      subtitle: "Matched to HMRC · 6 clients · current month",
      priority: 24,
    },
    {
      id: "uk-ct-pmt-fyi",
      title: "Corporation tax instalment log",
      subtitle: "Payments aligned to forecast · 4 companies",
      priority: 26,
    },
  ];
}

function ukTaxActionableMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "uk-vat-partial-jax",
      title: "Partial exemption method (year-end)",
      subtitle: "JAX recalculated recovery % · 2 VAT groups · approve or switch",
      priority: 7,
    },
  ];
}

function usTaxInformativeMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "us-fed-wh-fyi",
      title: "Federal withholding reconciliation",
      subtitle: "Balanced · 9 employers · last Form 941",
      priority: 25,
    },
    {
      id: "us-ext-log-fyi",
      title: "Extension calendar sync",
      subtitle: "No drift · 6 entities · next 60 days",
      priority: 23,
    },
  ];
}

function usTaxActionableMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "us-charity-sub-jax",
      title: "Charitable contribution substantiation",
      subtitle: "JAX paired receipts to GL · 3 NFPs · approve non-cash grid",
      priority: 8,
    },
  ];
}

function rowTaxInformativeMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "row-cbcr-fyi",
      title: "CbCR XML validation",
      subtitle: "Passed OECD checks · 1 group · FY25 file",
      priority: 24,
    },
    {
      id: "row-tp-calendar-fyi",
      title: "Transfer pricing calendar",
      subtitle: "Local files on track · 3 regions · no deadline slip",
      priority: 26,
    },
  ];
}

function rowTaxActionableMixRows(): TaxAiActionRow[] {
  return [
    {
      id: "row-stc-wht-jax",
      title: "Service fee WHT double accrual",
      subtitle: "JAX found duplicate STC lines · 2 SSCs · approve reversal",
      priority: 7,
    },
  ];
}

/** Agentic GST-style sidebar queues: one tile row per region per tab (panel id `{prefix}-{tab}-action-queue`). */
const AGENTIC_QUEUE_TILE_META: Record<
  string,
  { title: string; subtitle: string }
> = {
  "nz-tax": {
    title: "GST anomaly queue",
    subtitle: "7 items · tables + Dismiss / adjust / JAX",
  },
  "nz-payroll": {
    title: "PAYE & STP exception queue",
    subtitle: "6 items · review payroll lines in sidebar",
  },
  "nz-insights": {
    title: "Advisory flags queue",
    subtitle: "5 scenarios · model with JAX",
  },
  "nz-bookkeeping": {
    title: "Reconciliation queues",
    subtitle: "8 bank & suspense items · JAX cleanup",
  },
  "au-tax": {
    title: "BAS anomaly queue",
    subtitle: "7 items · GST lines + JAX",
  },
  "au-payroll": {
    title: "STP & super exception queue",
    subtitle: "6 items · payroll tables in sidebar",
  },
  "au-insights": {
    title: "Cashflow flags queue",
    subtitle: "5 signals · refresh with JAX",
  },
  "au-bookkeeping": {
    title: "Bank feed queues",
    subtitle: "8 items · rules + suspense",
  },
  "uk-tax": {
    title: "VAT anomaly queue",
    subtitle: "7 items · MTD-style review",
  },
  "uk-payroll": {
    title: "FPS & pension exception queue",
    subtitle: "6 items · HMRC-aligned",
  },
  "uk-insights": {
    title: "Margin & CT timing queue",
    subtitle: "5 items · forecast with JAX",
  },
  "uk-bookkeeping": {
    title: "VAT control & bank queues",
    subtitle: "8 items · clearing accounts",
  },
  "us-tax": {
    title: "Sales tax anomaly queue",
    subtitle: "7 items · nexus + rates",
  },
  "us-payroll": {
    title: "941 & local tax exception queue",
    subtitle: "6 items · deposits + wages",
  },
  "us-insights": {
    title: "Estimate tax & cash queue",
    subtitle: "5 items · safe harbour checks",
  },
  "us-bookkeeping": {
    title: "1099 prep & class queues",
    subtitle: "8 vendor + class items",
  },
  "row-tax": {
    title: "Indirect tax anomaly queue",
    subtitle: "7 items · multi-country",
  },
  "row-payroll": {
    title: "Global payroll exception queue",
    subtitle: "6 items · shadow + local",
  },
  "row-insights": {
    title: "Group liquidity flags queue",
    subtitle: "5 items · SSC view",
  },
  "row-bookkeeping": {
    title: "Close & IC queues",
    subtitle: "8 checklist items · JAX",
  },
};

function agenticQueueTileRow(
  panelPrefix: "nz" | "au" | "uk" | "us" | "row",
  tab: "tax" | "payroll" | "insights" | "bookkeeping"
): TaxAiActionRow {
  const key = `${panelPrefix}-${tab}`;
  const meta = AGENTIC_QUEUE_TILE_META[key];
  return {
    id: `${panelPrefix}-${tab}-action-queue`,
    title: meta.title,
    subtitle: meta.subtitle,
    priority: 16,
  };
}

/** Round-robin first rows from each section so “All” shows a mix of categories. */
function buildAllTab(sections: TaxAiActionRow[][]): TaxAiActionRow[] {
  const out: TaxAiActionRow[] = [];
  const seen = new Set<string>();
  const cap = 8;
  let round = 0;
  let added = true;
  while (out.length < cap && added) {
    added = false;
    for (const section of sections) {
      const row = section[round];
      if (row && !seen.has(row.id)) {
        seen.add(row.id);
        out.push(row);
        added = true;
        if (out.length >= cap) break;
      }
    }
    round += 1;
    if (round > 24) break;
  }
  return sortByPriority(out);
}

type AggCategory = "tax" | "payroll" | "insights" | "bookkeeping";

/** Widget row: one Actions tile line; opens that alert’s sidebar panel. */
export type TaxAiAggregateRow = {
  id: string;
  title: string;
  subtitle: string;
  priority: number;
  actionCount: number;
};

function sortAggregateRows(rows: TaxAiAggregateRow[]): TaxAiAggregateRow[] {
  return [...rows].sort((a, b) => a.priority - b.priority);
}

function actionRowToAggregateRow(row: TaxAiActionRow): TaxAiAggregateRow {
  const { actionCount } = countTaxActionPanelStats([row.id]);
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    priority: row.priority,
    actionCount,
  };
}

/**
 * Rows shown in the Agentic Actions widget list.
 * `all` is every alert from Tax + Payroll + Insights + Bookkeeping in one list
 * (same rows as the other tabs, sorted by priority), not four category rollups.
 */
export function getTaxAiAggregateRows(
  region: Region | string,
  tab: TaxAiActionTabId,
  nzWorkload?: TaxAiNzWorkloadFilter
): TaxAiAggregateRow[] {
  const byTab = getTaxAiActionsByTab(region, nzWorkload);
  const order: AggCategory[] = [
    "tax",
    "payroll",
    "insights",
    "bookkeeping",
  ];
  if (tab === "all") {
    const combined: TaxAiActionRow[] = [];
    for (const cat of order) {
      combined.push(...byTab[cat]);
    }
    return sortAggregateRows(combined.map(actionRowToAggregateRow));
  }
  return sortAggregateRows(byTab[tab].map(actionRowToAggregateRow));
}

/** Tab badges on the Actions widget: one count per visible list row in that tab. */
export function getTaxAiActionTabListItemCounts(
  region: Region | string,
  nzWorkload?: TaxAiNzWorkloadFilter
): Record<TaxAiActionTabId, number> {
  const tabs: TaxAiActionTabId[] = [
    "all",
    "tax",
    "payroll",
    "insights",
    "bookkeeping",
  ];
  const out = {} as Record<TaxAiActionTabId, number>;
  for (const tabId of tabs) {
    out[tabId] = getTaxAiAggregateRows(region, tabId, nzWorkload).length;
  }
  return out;
}

/**
 * Prototype Actions tile: tabbed rows aligned to regional Tax alerts mocks where possible.
 */
export function getTaxAiActionsByTab(
  region: Region | string,
  nzWorkload?: TaxAiNzWorkloadFilter
): Record<TaxAiActionTabId, TaxAiActionRow[]> {
  switch (region) {
    case "NZ": {
      const tax = sortByPriority([
        ...mapTaxStubsToAiRows("NZ", nzWorkload),
        ...nzAgenticExtraTaxRows(),
        ...nzTaxInformativeMixRows(),
        ...nzTaxActionableMixRows(),
        agenticQueueTileRow("nz", "tax"),
      ]);
      const payroll = sortByPriority([
        ...nzPayrollRows(),
        agenticQueueTileRow("nz", "payroll"),
      ]);
      const insights = sortByPriority([
        ...nzInsightsRows(),
        agenticQueueTileRow("nz", "insights"),
      ]);
      const bookkeeping = sortByPriority([
        ...nzBookkeepingRows(),
        agenticQueueTileRow("nz", "bookkeeping"),
      ]);
      return {
        tax,
        payroll,
        insights,
        bookkeeping,
        all: buildAllTab([tax, payroll, insights, bookkeeping]),
      };
    }
    case "AU": {
      const tax = sortByPriority([
        ...mapTaxStubsToAiRows("AU"),
        ...auAgenticExtraTaxRows(),
        ...auTaxInformativeMixRows(),
        ...auTaxActionableMixRows(),
        agenticQueueTileRow("au", "tax"),
      ]);
      const payroll = sortByPriority([
        ...auPayrollRows(),
        agenticQueueTileRow("au", "payroll"),
      ]);
      const insights = sortByPriority([
        ...auInsightsRows(),
        agenticQueueTileRow("au", "insights"),
      ]);
      const bookkeeping = sortByPriority([
        ...auBookkeepingRows(),
        agenticQueueTileRow("au", "bookkeeping"),
      ]);
      return {
        tax,
        payroll,
        insights,
        bookkeeping,
        all: buildAllTab([tax, payroll, insights, bookkeeping]),
      };
    }
    case "UK": {
      const tax = sortByPriority([
        ...mapTaxStubsToAiRows("UK"),
        ...ukAgenticExtraTaxRows(),
        ...ukTaxInformativeMixRows(),
        ...ukTaxActionableMixRows(),
        agenticQueueTileRow("uk", "tax"),
      ]);
      const payroll = sortByPriority([
        ...ukPayrollRows(),
        agenticQueueTileRow("uk", "payroll"),
      ]);
      const insights = sortByPriority([
        ...ukInsightsRows(),
        agenticQueueTileRow("uk", "insights"),
      ]);
      const bookkeeping = sortByPriority([
        ...ukBookkeepingRows(),
        agenticQueueTileRow("uk", "bookkeeping"),
      ]);
      return {
        tax,
        payroll,
        insights,
        bookkeeping,
        all: buildAllTab([tax, payroll, insights, bookkeeping]),
      };
    }
    case "USA": {
      const tax = sortByPriority([
        ...mapTaxStubsToAiRows("USA"),
        ...usAgenticExtraTaxRows(),
        ...usTaxInformativeMixRows(),
        ...usTaxActionableMixRows(),
        agenticQueueTileRow("us", "tax"),
      ]);
      const payroll = sortByPriority([
        ...usPayrollRows(),
        agenticQueueTileRow("us", "payroll"),
      ]);
      const insights = sortByPriority([
        ...usInsightsRows(),
        agenticQueueTileRow("us", "insights"),
      ]);
      const bookkeeping = sortByPriority([
        ...usBookkeepingRows(),
        agenticQueueTileRow("us", "bookkeeping"),
      ]);
      return {
        tax,
        payroll,
        insights,
        bookkeeping,
        all: buildAllTab([tax, payroll, insights, bookkeeping]),
      };
    }
    default: {
      const tax = sortByPriority([
        ...mapTaxStubsToAiRows("REST_OF_WORLD"),
        ...rowAgenticExtraTaxRows(),
        ...rowTaxInformativeMixRows(),
        ...rowTaxActionableMixRows(),
        agenticQueueTileRow("row", "tax"),
      ]);
      const payroll = sortByPriority([
        ...rowPayrollRows(),
        agenticQueueTileRow("row", "payroll"),
      ]);
      const insights = sortByPriority([
        ...rowInsightsRows(),
        agenticQueueTileRow("row", "insights"),
      ]);
      const bookkeeping = sortByPriority([
        ...rowBookkeepingRows(),
        agenticQueueTileRow("row", "bookkeeping"),
      ]);
      return {
        tax,
        payroll,
        insights,
        bookkeeping,
        all: buildAllTab([tax, payroll, insights, bookkeeping]),
      };
    }
  }
}
