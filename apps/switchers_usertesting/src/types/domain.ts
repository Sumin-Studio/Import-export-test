export type IssueSeverity = 'critical' | 'recommended' | 'optional';

export type IssueCategory =
  | 'deduction'
  | 'employee'
  | 'tax'
  | 'payroll-history'
  | 'earnings'
  | 'other';

/** Moderator-facing names: Scenario 1–4 in ModeratorControls. */
export type ReviewScenario =
  | 'smooth'
  | 'few-review'
  | 'many-review'
  | 'review-expert';

export type ProgressVariant = 'clean' | 'hint';

export type FinalVariant = 'ready' | 'expert-sent' | 'follow-up';

/** Primary path: accept / adjust the suggested import (confirmation flow). */
/** Alternate paths: different flows — not equivalent radio options. */
export type IssueAlternateType =
  | 'remap'
  | 'expert'
  | 'stub_navigate'
  | 'resolve_as';

export interface IssueAlternateAction {
  id: string;
  type: IssueAlternateType;
  label: string;
  description?: string;
  /** remap: pick a different Xero label, then resolve */
  remapTargets?: string[];
  /** resolve_as: one-click resolve with this recorded choice and Xero label */
  resolvedSummary?: string;
  resolvedXeroLabel?: string;
  /** stub_navigate: informational only — does not resolve */
  stubMessage?: string;
}

export interface FlaggedIssue {
  id: string;
  severity: IssueSeverity;
  category: IssueCategory;
  title: string;
  description: string;
  sourceValue: string;
  suggestedValue: string;
  /** Wording for the main confirm action (saved on resolve). */
  primaryConfirmLabel: string;
  /** Other approaches — not the same interaction as confirming above. */
  alternateActions: IssueAlternateAction[];
  sectionId: string;
  rowRef?: string;
  employeeName?: string;
}

/** Paid expert review tier shown in the expert signup flow. */
export interface ExpertReviewPlan {
  id: string;
  name: string;
  price: string;
  billingNote: string;
  summary: string;
  includes: string[];
  bestFor: string;
  popular?: boolean;
}

/** Saved when the participant applies an adjustment in the issue drawer. */
export interface IssueAdjustmentRecord {
  resolutionChoice: string;
  effectiveXeroLabel: string;
  note?: string;
}

export interface Company {
  legalName: string;
  ein: string;
  address: string;
  payrollStartDate: string;
  filingFrequency: string;
}

export interface Employee {
  id: string;
  name: string;
  status: string;
  payType: string;
  payRate: string;
  deductionsCount: number;
  issueIds: string[];
}

export interface PaySchedule {
  id: string;
  label: string;
  frequency: string;
  payDates: string;
  nextRun: string;
}

export interface EarningsRow {
  id: string;
  type: string;
  qbLabel: string;
  xeroLabel: string;
  count: number;
  status: 'imported' | 'needs-review' | 'confirmed';
}

export interface YtdSummary {
  gross: string;
  taxesWithheld: string;
  deductions: string;
  employerTaxes: string;
  runsImported: number;
}

export interface TaxSummary {
  federal: string;
  state: string;
  employer: string;
  filingSetup: string;
  itemsNeedingConfirmation: number;
}

export interface ReviewBundle {
  company: Company;
  employees: Employee[];
  paySchedules: PaySchedule[];
  earningsDeductions: EarningsRow[];
  ytd: YtdSummary;
  tax: TaxSummary;
  issues: FlaggedIssue[];
  summaries: {
    employeesImported: number;
    paySchedulesFound: number;
    lastPayrollPeriod: string;
    issuesNeedingReview: number;
    criticalCount?: number;
    recommendedCount?: number;
    optionalCount?: number;
  };
}

export interface ExpertSupportOption {
  id: string;
  title: string;
  description: string;
  action: 'chat' | 'schedule' | 'specialist_review' | 'dismiss';
}

export interface PricingPackage {
  id: string;
  name: string;
  headline: string;
  description: string;
  notes: string;
  priceHint?: string;
}

export interface SwitchConcept {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  tradeoffs: string[];
  timeExpectation: string;
  userInvolvement: string;
  expertInvolvement: string;
}
