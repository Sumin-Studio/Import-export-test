/**
 * Mock data for Annual tax returns widget.
 * Pipeline stages: Ready to start → Draft → To approve → To sign (approved) → To file (toSign) → Filed → Assessed (toFile).
 * XPAC prototype stage uses: Ready to start, Completed, Approved, Signed for the same buckets.
 * Stats summary: To approve / Completed, To sign / Approved, Notices that are different (→ /tax/statements), Filing errors.
 * The “returns-by-status” widget variant shows three summary tiles (Ready to start, Completed, Approved; no notices or Filing errors tiles).
 *
 * Tax year: FY26 uses the full in-flight pipeline mix. FY25/FY24 redistribute the same
 * portfolio total so ~90% / ~98% are filed and only a thin tail of work is outstanding.
 */

import type { WorkloadFilterRole } from "./workloadInsights";

/** NZ income tax year for the widget filter (mock volumes scale by year). */
export type TaxYearId = "fy26" | "fy25" | "fy24";

/** Prior FY for “this time last year” comparisons (overflow only offers fy26 / fy25). */
export function getPriorTaxYearIdForComparison(
  taxYearId: TaxYearId
): TaxYearId | null {
  if (taxYearId === "fy26") return "fy25";
  if (taxYearId === "fy25") return "fy24";
  return null;
}

export const TAX_YEAR_OPTIONS: {
  id: TaxYearId;
  label: string;
  shortLabel: string;
}[] = [
  { id: "fy26", label: "2025–26 (FY26)", shortLabel: "FY26" },
  { id: "fy25", label: "2024–25 (FY25)", shortLabel: "FY25" },
  { id: "fy24", label: "2023–24 (FY24)", shortLabel: "FY24" },
];

/** Overflow filter: This year / Last year only (NZ FY ranges; maps to fy26 / fy25). */
export const ANNUAL_TAX_YEAR_FILTER_OPTIONS: readonly {
  id: TaxYearId;
  label: string;
  rangeLabel: string;
  shortLabel: string;
}[] = [
  {
    id: "fy26",
    label: "This year",
    rangeLabel: "Apr 2025 – Mar 2026",
    shortLabel: "FY26",
  },
  {
    id: "fy25",
    label: "Last year",
    rangeLabel: "Apr 2024 – Mar 2025",
    shortLabel: "FY25",
  },
];

export type AnnualTaxReturnsProfile = {
  /** Returns not yet opened for preparation (chart bar before Draft). */
  readyToStart: number;
  draft: number;
  inProgress: number;
  approved: number;
  toSign: number;
  toFile: number;
  filed: number;
  errors: number;
  /** Activity statement disputes (statements mock; not shown on annual widget summary). */
  disputedStatements: number;
};

/** Sum of in-pipeline stages (each return is in exactly one). */
function pipelineTotal(p: AnnualTaxReturnsProfile): number {
  return (
    p.readyToStart +
    p.draft +
    p.inProgress +
    p.approved +
    p.toSign +
    p.toFile +
    p.filed
  );
}

/**
 * Split integer `total` across buckets using proportional weights (largest-remainder method).
 */
function distributeIntegerByWeights(total: number, weights: number[]): number[] {
  const n = weights.length;
  if (n === 0) return [];
  if (total <= 0) return Array.from({ length: n }, () => 0);
  const w = weights.map((x) => Math.max(0, x));
  const sumW = w.reduce((a, b) => a + b, 0);
  if (sumW === 0) {
    const base = Math.floor(total / n);
    const out = Array.from({ length: n }, () => base);
    let diff = total - base * n;
    let i = 0;
    while (diff > 0) {
      out[i % n]++;
      i++;
      diff--;
    }
    return out;
  }
  const exact = w.map((wi) => (total * wi) / sumW);
  const base = exact.map((x) => Math.floor(x));
  let diff = total - base.reduce((a, b) => a + b, 0);
  const order = [...Array(n).keys()].sort(
    (i, j) => (exact[j]! - base[j]!) - (exact[i]! - base[i]!)
  );
  const out = [...base];
  let k = 0;
  while (diff > 0) {
    out[order[k % n]!]++;
    diff--;
    k++;
  }
  return out;
}

/**
 * Prior FY at the **same point in the income-year calendar** as the current mock snapshot:
 * same portfolio total, but filed share and in-flight mix shift so YoY comparison reads as
 * ahead/behind. Not the same as {@link applyTaxYearMaturity} for `fy25` (near year-end filed).
 */
export function buildPriorYearSameTimeComparisonProfile(
  current: AnnualTaxReturnsProfile
): AnnualTaxReturnsProfile {
  const T = pipelineTotal(current);
  if (T <= 0) {
    return { ...current };
  }

  const h =
    (current.readyToStart * 11 +
      current.draft * 7 +
      current.inProgress * 5 +
      current.approved * 3 +
      current.toFile * 2 +
      current.filed) %
    97;

  const filedShareCurrent = current.filed / T;
  const delta = (h / 96 - 0.5) * 0.28;
  const priorFiledShare = Math.min(0.9, Math.max(0.05, filedShareCurrent + delta));
  const filed = Math.min(T, Math.max(0, Math.round(T * priorFiledShare)));
  const rem = T - filed;

  const weights = [
    current.readyToStart + 0.25,
    current.draft + 0.25,
    current.inProgress + 0.25,
    current.approved + 0.25,
    current.toSign + 0.25,
    current.toFile + 0.25,
  ];
  const parts = distributeIntegerByWeights(rem, weights);
  const readyToStart = parts[0] ?? 0;
  const draft = parts[1] ?? 0;
  const inProgress = parts[2] ?? 0;
  const approved = parts[3] ?? 0;
  const toSign = parts[4] ?? 0;
  const toFile = parts[5] ?? 0;

  const errFactor = 0.78 + (h % 9) * 0.03;
  const errors = Math.max(
    0,
    Math.min(current.errors + 2, Math.round(current.errors * errFactor))
  );

  return {
    readyToStart,
    draft,
    inProgress,
    approved,
    toSign,
    toFile,
    filed,
    errors,
    disputedStatements: Math.max(
      0,
      Math.min(
        current.disputedStatements,
        Math.round(current.disputedStatements * 0.85)
      )
    ),
  };
}

/** Split integer `remainder` across 5 buckets using proportional weights (deterministic). */
function splitOutstanding(
  remainder: number,
  weights: readonly [number, number, number, number, number]
): [number, number, number, number, number] {
  if (remainder <= 0) {
    return [0, 0, 0, 0, 0];
  }
  const sumW = weights[0] + weights[1] + weights[2] + weights[3] + weights[4];
  const exact = weights.map((w) => (remainder * w) / sumW);
  const base = exact.map((x) => Math.floor(x));
  let diff = remainder - base.reduce((a, b) => a + b, 0);
  const order = [0, 1, 2, 3, 4].sort(
    (i, j) =>
      (exact[j]! - base[j]!) - (exact[i]! - base[i]!)
  );
  const out = [...base] as [number, number, number, number, number];
  let k = 0;
  while (diff > 0) {
    out[order[k % 5]]++;
    diff--;
    k++;
  }
  return out;
}

/**
 * Past income years: almost everything is filed; only a thin tail of outstanding work.
 * Current year (FY26): use baseline pipeline mix as-is.
 */
function applyTaxYearMaturity(
  p: AnnualTaxReturnsProfile,
  taxYearId: TaxYearId
): AnnualTaxReturnsProfile {
  if (taxYearId === "fy26") {
    return { ...p };
  }

  const total = pipelineTotal(p);
  if (total === 0) {
    return {
      ...p,
      errors: 0,
      disputedStatements: 0,
    };
  }

  if (taxYearId === "fy25") {
    // Prior year: mostly complete; small outstanding mix
    const filedRatio = 0.9;
    const filed = Math.round(total * filedRatio);
    const rem = Math.max(0, total - filed);
    const [earlyDraft, inProgress, approved, toSign, toFile] = splitOutstanding(
      rem,
      [0.14, 0.32, 0.2, 0.1, 0.24]
    );
    const readyToStart =
      earlyDraft <= 0
        ? 0
        : Math.max(0, Math.round(earlyDraft * 0.22));
    const draft = Math.max(0, earlyDraft - readyToStart);
    return {
      readyToStart,
      draft,
      inProgress,
      approved,
      toSign,
      toFile,
      filed,
      errors: Math.max(0, Math.min(5, Math.round(p.errors * 0.35))),
      disputedStatements: Math.max(
        0,
        Math.min(1, Math.round(p.disputedStatements * 0.35))
      ),
    };
  }

  // fy24 — older year: essentially closed
  const filedRatio = 0.978;
  const filed = Math.round(total * filedRatio);
  const rem = Math.max(0, total - filed);
  const [earlyDraft, inProgress, approved, toSign, toFile] = splitOutstanding(
    rem,
    [0.1, 0.22, 0.18, 0.08, 0.42]
  );
  const readyToStart =
    earlyDraft <= 0 ? 0 : Math.max(0, Math.round(earlyDraft * 0.22));
  const draft = Math.max(0, earlyDraft - readyToStart);
  return {
    readyToStart,
    draft,
    inProgress,
    approved,
    toSign,
    toFile,
    filed,
    errors: Math.max(0, Math.min(2, Math.round(p.errors * 0.15))),
    disputedStatements: 0,
  };
}

/** Firm-wide baseline — same totals as original widget */
const FIRM_PROFILE: AnnualTaxReturnsProfile = {
  readyToStart: 138,
  draft: 490,
  inProgress: 591,
  approved: 118,
  toSign: 52,
  toFile: 84,
  filed: 124,
  errors: 8,
  disputedStatements: 3,
};

/**
 * Firm disputed-statement count for Tax Statements summary (aligned with widget tax year).
 */
export function getScaledDisputedStatementsForTaxYear(
  taxYearId: TaxYearId
): number {
  return applyTaxYearMaturity(FIRM_PROFILE, taxYearId).disputedStatements;
}

/**
 * Per-person profiles — subsets of firm totals.
 * Account managers partition the firm (sum = firm).
 * Managers partition the firm (sum = firm).
 * No individual exceeds firm totals.
 */
const PERSON_PROFILES: Record<string, AnnualTaxReturnsProfile> = {
  // ——— Account managers (partition of firm) ———
  "am-sophie": {
    readyToStart: 17,
    draft: 58,
    inProgress: 71,
    approved: 14,
    toSign: 6,
    toFile: 10,
    filed: 15,
    errors: 1,
    disputedStatements: 0,
  },
  "am-james": {
    readyToStart: 28,
    draft: 98,
    inProgress: 118,
    approved: 24,
    toSign: 10,
    toFile: 17,
    filed: 25,
    errors: 2,
    disputedStatements: 1,
  },
  "am-aroha": {
    readyToStart: 21,
    draft: 73,
    inProgress: 89,
    approved: 18,
    toSign: 8,
    toFile: 13,
    filed: 19,
    errors: 1,
    disputedStatements: 0,
  },
  "am-ryan": {
    readyToStart: 25,
    draft: 88,
    inProgress: 106,
    approved: 21,
    toSign: 9,
    toFile: 15,
    filed: 22,
    errors: 1,
    disputedStatements: 0,
  },
  "am-emma": {
    readyToStart: 48,
    draft: 172,
    inProgress: 207,
    approved: 41,
    toSign: 19,
    toFile: 29,
    filed: 43,
    errors: 3,
    disputedStatements: 0,
  },
  // ——— Managers (partition of firm by team) ———
  "m-michael": {
    readyToStart: 41,
    draft: 147,
    inProgress: 177,
    approved: 35,
    toSign: 16,
    toFile: 25,
    filed: 37,
    errors: 2,
    disputedStatements: 0,
  },
  "m-priya": {
    readyToStart: 39,
    draft: 137,
    inProgress: 165,
    approved: 33,
    toSign: 15,
    toFile: 24,
    filed: 35,
    errors: 2,
    disputedStatements: 1,
  },
  "m-charlotte": {
    readyToStart: 30,
    draft: 108,
    inProgress: 130,
    approved: 26,
    toSign: 11,
    toFile: 18,
    filed: 27,
    errors: 2,
    disputedStatements: 0,
  },
  "m-david": {
    readyToStart: 28,
    draft: 98,
    inProgress: 119,
    approved: 24,
    toSign: 10,
    toFile: 17,
    filed: 25,
    errors: 2,
    disputedStatements: 0,
  },
};

/**
 * Returns annual tax returns data for the selected filter and tax year.
 */
/** UK “Tax returns” (returns-by-status) sidebar filter — scales mock pipeline counts. */
export type UkTaxReturnTypeId =
  | "all"
  | "company_accounts_and_tax"
  | "partnership_tax"
  | "personal_tax"
  | "vat"
  | "mtd_income_tax";

const UK_RETURN_TYPE_WEIGHTS: Record<UkTaxReturnTypeId, number> = {
  all: 1,
  company_accounts_and_tax: 0.28,
  partnership_tax: 0.12,
  personal_tax: 0.34,
  vat: 0.16,
  mtd_income_tax: 0.1,
};

export const UK_TAX_RETURN_TYPE_FILTER_OPTIONS: readonly {
  id: UkTaxReturnTypeId;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "company_accounts_and_tax", label: "Company accounts and tax" },
  { id: "partnership_tax", label: "Partnership tax" },
  { id: "personal_tax", label: "Personal tax" },
  { id: "vat", label: "VAT" },
  { id: "mtd_income_tax", label: "MTD for Income Tax" },
];

/**
 * Applies the UK return-type filter to firm/manager mock volumes (prototype).
 */
export function scaleAnnualTaxReturnsProfileForUkReturnType(
  p: AnnualTaxReturnsProfile,
  typeId: UkTaxReturnTypeId
): AnnualTaxReturnsProfile {
  if (typeId === "all") {
    return { ...p };
  }
  const w = UK_RETURN_TYPE_WEIGHTS[typeId];
  const scale = (n: number) => Math.max(0, Math.round(n * w));
  return {
    readyToStart: scale(p.readyToStart),
    draft: scale(p.draft),
    inProgress: scale(p.inProgress),
    approved: scale(p.approved),
    toSign: scale(p.toSign),
    toFile: scale(p.toFile),
    filed: scale(p.filed),
    errors: scale(p.errors),
    disputedStatements: scale(p.disputedStatements),
  };
}

/** NZ GA “Tax returns” (returns-by-status) — Type: All returns / Sales tax / Income tax (prototype). */
export type NzGaTaxReturnCategoryId = "all" | "sales_tax" | "income_tax";

const NZ_GA_CATEGORY_WEIGHTS: Record<NzGaTaxReturnCategoryId, number> = {
  all: 1,
  /** GST / sales-tax workload slice */
  sales_tax: 0.26,
  /** Income tax returns slice */
  income_tax: 0.74,
};

export const NZ_GA_TAX_RETURN_CATEGORY_OPTIONS: readonly {
  id: NzGaTaxReturnCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All returns" },
  { id: "sales_tax", label: "Sales tax" },
  { id: "income_tax", label: "Income tax" },
];

export function scaleAnnualTaxReturnsProfileForNzGaCategory(
  p: AnnualTaxReturnsProfile,
  categoryId: NzGaTaxReturnCategoryId
): AnnualTaxReturnsProfile {
  if (categoryId === "all") {
    return { ...p };
  }
  const w = NZ_GA_CATEGORY_WEIGHTS[categoryId];
  const scale = (n: number) => Math.max(0, Math.round(n * w));
  return {
    readyToStart: scale(p.readyToStart),
    draft: scale(p.draft),
    inProgress: scale(p.inProgress),
    approved: scale(p.approved),
    toSign: scale(p.toSign),
    toFile: scale(p.toFile),
    filed: scale(p.filed),
    errors: scale(p.errors),
    disputedStatements: scale(p.disputedStatements),
  };
}

export function getAnnualTaxReturnsForSelection(
  filterRole: WorkloadFilterRole,
  personId: string,
  taxYearId: TaxYearId = "fy26"
): AnnualTaxReturnsProfile {
  let base: AnnualTaxReturnsProfile;

  if (filterRole === "firm") {
    base = { ...FIRM_PROFILE };
  } else {
    const profile = PERSON_PROFILES[personId];
    if (!profile) {
      const draftPart = Math.round(FIRM_PROFILE.draft * 0.3);
      const rtsPart = Math.round(FIRM_PROFILE.readyToStart * 0.3);
      base = {
        readyToStart: rtsPart,
        draft: draftPart,
        inProgress: Math.round(FIRM_PROFILE.inProgress * 0.3),
        approved: Math.round(FIRM_PROFILE.approved * 0.3),
        toSign: Math.round(FIRM_PROFILE.toSign * 0.3),
        toFile: Math.round(FIRM_PROFILE.toFile * 0.3),
        filed: Math.round(FIRM_PROFILE.filed * 0.3),
        errors: Math.round(FIRM_PROFILE.errors * 0.3),
        disputedStatements: Math.max(
          0,
          Math.round(FIRM_PROFILE.disputedStatements * 0.3)
        ),
      };
    } else {
      base = { ...profile };
    }
  }

  return applyTaxYearMaturity(base, taxYearId);
}

/** Tab counts for `/tax/all-returns` — firm view, aligned with Annual Tax Returns + chart pipeline */
export function getFirmReturnsPageTabCounts() {
  const p = FIRM_PROFILE;
  return {
    all:
      p.readyToStart +
      p.draft +
      p.inProgress +
      p.approved +
      p.toSign +
      p.toFile +
      p.filed +
      p.errors,
    ready_to_start: p.readyToStart,
    draft: p.draft,
    completed: p.inProgress,
    approved: p.approved,
    /** toSign — tab label "To file" (i2) or "Signed" (XPAC) */
    signed: p.toSign,
    filed: p.filed,
    /** toFile — chart label "Assessed", tab "Assessed" */
    assessed: p.toFile,
    error: p.errors,
  } as const;
}

export type ReturnsPageTabId =
  | "all"
  | "ready_to_start"
  | "draft"
  | "completed"
  | "approved"
  | "signed"
  | "filed"
  | "assessed"
  | "error";

/**
 * Maps Annual Tax Returns chart x-axis labels to `/tax/all-returns?tab=` values
 * (aligned with {@link getFirmReturnsPageTabCounts}).
 */
export function returnsPageTabForChartCategory(
  category: string
): ReturnsPageTabId | null {
  const map: Record<string, ReturnsPageTabId> = {
    "Ready to start": "ready_to_start",
    "Not started": "ready_to_start",
    Draft: "draft",
    "To approve": "completed",
    "To sign": "approved",
    "To file": "signed",
    Completed: "completed",
    Approved: "approved",
    Signed: "signed",
    Filed: "filed",
    Assessed: "assessed",
    Errors: "error",
    "Filing errors": "error",
  };
  return map[category] ?? null;
}

/**
 * AU Income tax returns widget chart (Draft → Submitted) → `/tax/all-returns` tabs.
 */
export function returnsPageTabForAuIncomeTaxChartCategory(
  category: string
): ReturnsPageTabId | null {
  const map: Record<string, ReturnsPageTabId> = {
    Draft: "draft",
    Completed: "completed",
    Approved: "approved",
    "To sign": "signed",
    "To file": "assessed",
    Submitted: "filed",
  };
  return map[category] ?? null;
}

/**
 * AU summary row (Income tax returns widget): Ready to start = ready + draft buckets;
 * In progress = stages after those, before filed; Filed = Submitted.
 */
export function getAuIncomeTaxSummaryFromProfile(
  profile: AnnualTaxReturnsProfile
): {
  readyToStart: number;
  inProgress: number;
  filed: number;
} {
  return {
    readyToStart: profile.readyToStart + profile.draft,
    inProgress:
      profile.inProgress + profile.approved + profile.toSign + profile.toFile,
    filed: profile.filed,
  };
}

/** Six-column AU pipeline chart (labels match Income tax returns / AU design). */
export function buildAuIncomeTaxChartSeries(
  profile: AnnualTaxReturnsProfile
): {
  category: string;
  value: number;
}[] {
  return [
    { category: "Draft", value: profile.draft },
    { category: "Completed", value: profile.inProgress },
    { category: "Approved", value: profile.approved },
    { category: "To sign", value: profile.toSign },
    { category: "To file", value: profile.toFile },
    { category: "Submitted", value: profile.filed },
  ];
}
