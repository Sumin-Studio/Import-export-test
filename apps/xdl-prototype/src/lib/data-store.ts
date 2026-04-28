"use client";

import { useMemo } from "react";

// --- Domain types ---

export type ReadinessTier = "ready" | "action_required" | "blocked";
export type NexusRisk = "low" | "medium" | "high";
export type ComplexityTier = "low" | "high";
export type BottleneckOwner = "client" | "internal";

export interface Client {
  id: string;
  entityName: string;
  readinessScore: number;
  readinessTier: ReadinessTier;
  services: string[];
  blockers: string[];
  lastActivity: Date;
  deadline: Date;
  partnerId: string;
  partnerName: string;
  nexusRisk: NexusRisk;
  complexityTier: ComplexityTier;
  bottleneckOwner: BottleneckOwner;
  blockerReason?: string;
  /** Main signal shown in table (Figma-style: unreconciled lines, missing docs, sales tax, 1099, etc.) */
  mainSignal?: string;
  /** Sales tax filing due date when client has sales tax work */
  salesTaxDueDate?: Date;
  /** Side panel: main signal block (title, description, CTA). If omitted, derived from mainSignal. */
  sidePanelMainSignal?: {
    title: string;
    description: string;
    viewAnalysisLabel?: string;
    ctaLabel?: string;
  };
  /** Side panel: contributing signals (clickable rows). If omitted, derived. */
  sidePanelContributingSignals?: { title: string; description: string }[];

  /** Bookkeeping: reconciliation status (e.g. "Complete", "8 items pending") */
  reconStatus?: string;
  /** Bookkeeping: last bank feed / sync date */
  lastSync?: Date;
  /** 1099/1040: extension filed (true) or not */
  extensionFiled?: boolean;
  /** 1040: organizer received from client */
  organizerReceived?: boolean;
  /** Sales tax: filing frequency */
  salesTaxFilingFrequency?: "Monthly" | "Quarterly";
  /** Advisory: next scheduled review date */
  nextReview?: Date;

  /** Payroll: run frequency */
  payrollFrequency?: "Weekly" | "Biweekly" | "Semimonthly" | "Monthly";
  /** Payroll: next scheduled run date */
  nextPayrollRun?: Date;
  /** Payroll: last run date */
  lastPayrollRun?: Date;
  /** Payroll: 941 / payroll tax deposit due date */
  payrollTaxDue?: Date;

  /** Advisory: last financial review / board pack date */
  lastReview?: Date;
  /** Advisory: engagement type (e.g. CFO advisory, board pack, KPI review) */
  engagementType?: string;
  /** Advisory: next key metrics / KPI report due date */
  keyMetricsDue?: Date;
  /** Advisory: management report status (e.g. "Sent", "Due", "Draft") */
  managementReportStatus?: string;
}

export type SortKey = "entityName" | "readiness" | "deadline" | "salesTaxDueDate" | "lastActivity" | "lastSync" | "nextReview" | "nextPayrollRun" | "lastReview" | "keyMetricsDue";
export type SortDirection = "asc" | "desc";

export type GoalValue = "Month-end" | "Year-end" | null;
export interface PeriodValue {
  label: string;
  start: Date;
  end: Date;
}

export interface FilterState {
  searchQuery: string;
  readinessTiers: ReadinessTier[];
  partners: string[];
  serviceLines: string[];
  nexusRisk: NexusRisk[];
  complexityTiers: ComplexityTier[];
  bottleneckOwners: BottleneckOwner[];
  goal: GoalValue;
  period: PeriodValue | null;
  sortKey: SortKey;
  sortDirection: SortDirection;
}

export const INITIAL_FILTER_STATE: FilterState = {
  searchQuery: "",
  readinessTiers: [],
  partners: [],
  serviceLines: [],
  nexusRisk: [],
  complexityTiers: [],
  bottleneckOwners: [],
  goal: "Month-end",
  period: getThisMonthPeriod(),
  sortKey: "deadline",
  sortDirection: "asc",
};

// --- Mock data: 50+ clients with full coverage for filters ---

const PARTNERS = [
  { id: "p1", name: "Sarah Chen" },
  { id: "p2", name: "Marcus Webb" },
  { id: "p3", name: "Elena Rodriguez" },
];

const SERVICE_OPTIONS = ["1040", "1099", "Sales Tax", "Bookkeeping", "Audit", "Payroll", "Advisory"];
const BLOCKER_OPTIONS = [
  "Missing 1099-K",
  "Missing 1099-NEC",
  "W-9 not collected",
  "Bank feed disconnected",
  "TIN mismatch",
  "Pending client response",
  "Documents overdue",
];

/** Main signal options (Figma-style + sales tax + 1099 + CRM + advisory) for the Main signal column */
const MAIN_SIGNAL_OPTIONS = [
  // Figma / bookkeeping style
  "Unreconciled statement lines",
  "Unreconciled account transactions",
  "Duplicate bank statement lines",
  "Duplicate account transactions",
  "Overdue active collection of missing documents",
  "Missing source documents",
  // Sales tax
  "Sales tax return overdue",
  "Pending sales tax filing",
  "Sales tax nexus review required",
  "Quarterly sales tax deadline approaching",
  // 1099
  "1099-K missing",
  "1099-NEC not filed",
  "1099 deadline approaching",
  "W-9 collection overdue for 1099",
  "1099-MISC vendor information incomplete",
  "1099-B reconciliation pending",
  // Payroll
  "Payroll run overdue",
  "941 deposit due",
  "W-2 review pending",
  "Payroll tax filing overdue",
  "Timesheet approval pending",
  // Advisory / Financial health
  "Cash flow review overdue",
  "Budget variance analysis pending",
  "KPI report due",
  "Forecast review required",
  "Board pack overdue",
  // CRM / pipeline (CPA relationship & follow-up)
  "Follow-up overdue",
  "Last contact 30+ days ago",
  "Proposal pending",
  "Engagement at risk",
  "Next review due",
  "Discovery call scheduled",
  "Upsell opportunity",
  "At risk – no contact 60 days",
];

/** Bookkeeping: reconciliation status options */
const RECON_STATUS_OPTIONS = ["Complete", "3 items pending", "8 items pending", "12 items pending", "Pending"];

const PAYROLL_SIGNAL_START = 18; // index after 1099 options
const ADVISORY_SIGNAL_START = 23; // index after payroll options
const CRM_SIGNAL_START = 28; // index after advisory options; length 8

/** Pick a main signal that fits the client's services (bookkeeping / sales tax / 1099 / payroll / advisory / CRM) */
function pickMainSignalForServices(services: string[], index: number): string {
  const hasBookkeeping = services.includes("Bookkeeping");
  const hasSalesTax = services.includes("Sales Tax");
  const has1099 = services.includes("1099") || services.includes("1040");
  const hasPayroll = services.includes("Payroll");
  const hasAdvisory = services.includes("Advisory") || services.includes("Audit");
  if (hasBookkeeping && !hasSalesTax && !has1099) {
    return MAIN_SIGNAL_OPTIONS[index % 6]; // first 6 are bookkeeping
  }
  if (hasSalesTax) {
    return MAIN_SIGNAL_OPTIONS[6 + (index % 4)]; // sales tax slice
  }
  if (has1099) {
    return MAIN_SIGNAL_OPTIONS[10 + (index % 8)]; // 1099 slice
  }
  if (hasPayroll) {
    return MAIN_SIGNAL_OPTIONS[PAYROLL_SIGNAL_START + (index % 5)]; // payroll slice
  }
  if (hasAdvisory) {
    return MAIN_SIGNAL_OPTIONS[ADVISORY_SIGNAL_START + (index % 5)]; // advisory slice
  }
  return MAIN_SIGNAL_OPTIONS[index % MAIN_SIGNAL_OPTIONS.length];
}

/** Slice indices into MAIN_SIGNAL_OPTIONS per "mode" (DashboardMode). */
const MAIN_SIGNAL_SLICE: Record<string, { start: number; length: number }> = {
  bookkeeping: { start: 0, length: 6 },
  tax: { start: 10, length: 8 },
  sales_tax: { start: 6, length: 4 },
  payroll: { start: PAYROLL_SIGNAL_START, length: 5 },
  advisory: { start: ADVISORY_SIGNAL_START, length: 5 },
  crm: { start: CRM_SIGNAL_START, length: 8 },
};

const CRM_SIGNAL_OPTIONS = MAIN_SIGNAL_OPTIONS.slice(CRM_SIGNAL_START, CRM_SIGNAL_START + 8);

/**
 * Returns a main signal string relevant to the current dashboard mode (job).
 * Use this when rendering the Main signal column so content matches the mode.
 * For CRM, uses client.mainSignal if it's a CRM signal, otherwise derives one from CRM slice so every row is relevant.
 */
export function getMainSignalForMode(
  client: Client,
  mode: string
): string {
  if (mode === "crm") {
    const current = client.mainSignal ?? "";
    if (CRM_SIGNAL_OPTIONS.includes(current)) return current;
    const hash = client.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return CRM_SIGNAL_OPTIONS[Math.abs(hash) % CRM_SIGNAL_OPTIONS.length] ?? client.mainSignal ?? "—";
  }
  const slice = MAIN_SIGNAL_SLICE[mode];
  if (!slice) return client.mainSignal ?? client.blockerReason ?? client.blockers[0] ?? "—";
  const hash = client.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const index = slice.start + (Math.abs(hash) % slice.length);
  return MAIN_SIGNAL_OPTIONS[index] ?? client.mainSignal ?? "—";
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

/** Format reporting period for side panel e.g. "1 - 31 January 2026" */
function getReportingPeriodLabel(forDate: Date): string {
  const y = forDate.getFullYear();
  const m = forDate.toLocaleDateString("en-US", { month: "long" });
  const lastDay = new Date(y, forDate.getMonth() + 1, 0).getDate();
  return `1 - ${lastDay} ${m} ${y}`;
}

/** Default main signal copy for side panel when not set (derived from mainSignal string) */
const SIDE_PANEL_MAIN_SIGNAL_DEFAULTS: Record<string, { title: string; description: string; ctaLabel: string }> = {
  "Unreconciled statement lines": {
    title: "8 bank statement lines require reconciliation",
    description:
      "JAX identified **8 statement lines** from the Main Operating Account without matching ledger transactions. Potential missing data, these lines typically match to recurring supplier bills (e.g., AWS, Google) that haven't been created in Xero this month.",
    ctaLabel: "Go to bank rec",
  },
  "Unreconciled account transactions": {
    title: "12 ledger transactions need matching",
    description:
      "**12 transactions** in the ledger have no matching bank statement line. These may be timing differences or missing bank feeds. Review in Bank Reconciliation to clear or match.",
    ctaLabel: "Go to bank rec",
  },
  "Duplicate bank statement lines": {
    title: "Duplicate bank statement lines detected",
    description:
      "JAX found **3 duplicate statement lines** in the Main Operating Account. Duplicates can cause incorrect balances; merge or exclude in bank rec before closing.",
    ctaLabel: "Review duplicates",
  },
  "Overdue active collection of missing documents": {
    title: "Missing documents collection overdue",
    description:
      "**17 transactions** over $100 are missing receipts or source documents. Document collection is past the due date; follow up with the client to avoid audit risk.",
    ctaLabel: "View document requests",
  },
  "Missing source documents": {
    title: "Source documents missing for key transactions",
    description:
      "**9 transactions** require source documents. Missing docs can delay month-end close and increase review time. Request from client or attach from email.",
    ctaLabel: "Open document queue",
  },
  "Sales tax return overdue": {
    title: "Sales tax return is overdue",
    description:
      "The **Q4 sales tax return** has not been filed. Late filing may incur penalties. Complete the return in Tax or export for filing.",
    ctaLabel: "Go to sales tax",
  },
  "1099-K missing": {
    title: "1099-K information incomplete",
    description:
      "**1099-K** data is missing or incomplete for this entity. Gather payment processor summaries and complete the 1099-K workflow before the deadline.",
    ctaLabel: "Open 1099 workflow",
  },
  "1099-NEC not filed": {
    title: "1099-NEC filing pending",
    description:
      "**1099-NEC** forms are not yet filed. Vendor information has been collected; review and submit before the IRS deadline.",
    ctaLabel: "Go to 1099-NEC",
  },
  // Advisory / Financial health
  "Cash flow review overdue": {
    title: "Cash flow review overdue",
    description:
      "The scheduled **cash flow review** for this client has not been completed. Review current position and forecast to update advisory recommendations.",
    ctaLabel: "Open cash flow review",
  },
  "Board pack overdue": {
    title: "Board pack overdue",
    description:
      "The **board pack** for the next meeting is due. Compile financial summaries, KPIs, and commentary for the board.",
    ctaLabel: "Open board pack",
  },
  "KPI report due": {
    title: "KPI report due",
    description:
      "**Key metrics** are due for this engagement. Update dashboards and deliver the next KPI report to the client.",
    ctaLabel: "Open KPI report",
  },
  // CRM
  "Follow-up overdue": {
    title: "Follow-up overdue",
    description:
      "A **follow-up** was due and has not been completed. Schedule a call or meeting to maintain the relationship and address open items.",
    ctaLabel: "Log follow-up",
  },
  "Last contact 30+ days ago": {
    title: "No contact in 30+ days",
    description:
      "**Last contact** was more than 30 days ago. Reach out to check in and schedule the next review or engagement.",
    ctaLabel: "Schedule contact",
  },
  "Engagement at risk": {
    title: "Engagement at risk",
    description:
      "This **engagement** is flagged as at risk (e.g. scope creep, payment delays, or low satisfaction). Review and take action.",
    ctaLabel: "Review engagement",
  },
  "Proposal pending": {
    title: "Proposal pending",
    description:
      "A **proposal** has been sent and is awaiting client response. Follow up to move the opportunity forward.",
    ctaLabel: "View proposal",
  },
};

const CONTRIBUTING_SIGNALS_POOL: { title: string; description: string }[] = [
  { title: "Cash reconciliation optimisation", description: "77 unreconciled transactions are pending across 3 bank accounts" },
  { title: "Automate missing document collection", description: "17 transactions over $100 are missing receipts" },
  { title: "Duplicate transaction review", description: "5 potential duplicates in Accounts Payable" },
  { title: "Sales tax nexus review", description: "2 new states may require registration this quarter" },
  { title: "W-9 collection for 1099", description: "3 vendor W-9s outstanding for 1099 filing" },
  { title: "Bank feed health", description: "1 bank account has not synced in 7 days" },
  { title: "Next review scheduled", description: "Quarterly business review scheduled in 2 weeks" },
  { title: "Budget variance", description: "YTD variance vs budget exceeds 10%; recommend client discussion" },
  { title: "Pipeline – upsell", description: "Advisory scope expansion opportunity identified" },
];

export function getSidePanelData(client: Client) {
  const reportingPeriodLabel = getReportingPeriodLabel(client.deadline);
  const internalDueDate = client.deadline;
  const staffName = client.partnerName;

  const mainSignal = client.sidePanelMainSignal ?? (() => {
    const exact = client.mainSignal && SIDE_PANEL_MAIN_SIGNAL_DEFAULTS[client.mainSignal];
    const key = exact ? client.mainSignal : Object.keys(SIDE_PANEL_MAIN_SIGNAL_DEFAULTS).find((k) => client.mainSignal?.includes(k));
    const resolved = key ? SIDE_PANEL_MAIN_SIGNAL_DEFAULTS[key] : undefined;
    const def = resolved ?? SIDE_PANEL_MAIN_SIGNAL_DEFAULTS["Unreconciled statement lines"];
    return {
      title: def.title,
      description: def.description,
      viewAnalysisLabel: "View detailed analysis",
      ctaLabel: def.ctaLabel,
    };
  })();

  const contributingSignals =
    client.sidePanelContributingSignals ??
    CONTRIBUTING_SIGNALS_POOL.slice(0, 2 + (client.id.length % 3)).map((s) => ({ ...s }));

  return { reportingPeriodLabel, internalDueDate, staffName, mainSignal, contributingSignals };
}

function makeClient(
  overrides: Partial<Client> & { id: string; entityName: string }
): Client {
  const base: Client = {
    id: overrides.id,
    entityName: overrides.entityName,
    readinessScore: overrides.readinessScore ?? 75,
    readinessTier: overrides.readinessTier ?? "action_required",
    services: overrides.services ?? ["1040"],
    blockers: overrides.blockers ?? [],
    lastActivity: overrides.lastActivity ?? new Date(),
    deadline: overrides.deadline ?? addDays(new Date(), 14),
    partnerId: overrides.partnerId ?? PARTNERS[0].id,
    partnerName: overrides.partnerName ?? PARTNERS[0].name,
    nexusRisk: overrides.nexusRisk ?? "low",
    complexityTier: overrides.complexityTier ?? "low",
    bottleneckOwner: overrides.bottleneckOwner ?? "client",
    blockerReason: overrides.blockerReason,
  };
  return { ...base, ...overrides };
}

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

function dateInCurrentMonth(dayOfMonth: number): Date {
  const d = new Date(TODAY.getFullYear(), TODAY.getMonth(), dayOfMonth);
  d.setHours(12, 0, 0, 0);
  return d;
}

export const MOCK_CLIENTS: Client[] = [
  makeClient({
    id: "c1",
    entityName: "Acme Corp",
    readinessScore: 100,
    readinessTier: "ready",
    services: ["1040", "Bookkeeping"],
    blockers: [],
    mainSignal: "Unreconciled statement lines",
    partnerId: "p1",
    partnerName: "Noah Wilson",
    deadline: new Date(TODAY.getFullYear(), TODAY.getMonth(), 10),
    lastActivity: addDays(TODAY, -1),
    lastSync: addDays(TODAY, -1),
    reconStatus: "8 items pending",
    organizerReceived: true,
    extensionFiled: false,
    nextReview: addDays(TODAY, 30),
    nexusRisk: "low",
    complexityTier: "low",
    bottleneckOwner: "internal",
    sidePanelMainSignal: {
      title: "8 bank statement lines require reconciliation",
      description:
        "JAX identified **8 statement lines** from the Main Operating Account without matching ledger transactions. Potential missing data, these lines typically match to recurring supplier bills (e.g., AWS, Google) that haven't been created in Xero this month.",
      viewAnalysisLabel: "View detailed analysis",
      ctaLabel: "Go to bank rec",
    },
    sidePanelContributingSignals: [
      { title: "Cash reconciliation optimisation", description: "77 unreconciled transactions are pending across 3 bank accounts" },
      { title: "Automate missing document collection", description: "17 transactions over $100 are missing receipts" },
    ],
  }),
  makeClient({
    id: "c2",
    entityName: "Beta Industries LLC",
    readinessScore: 45,
    readinessTier: "blocked",
    services: ["1099", "Sales Tax"],
    blockers: ["Missing 1099-K", "W-9 not collected"],
    blockerReason: "Bank feed disconnected 3 days ago; W-9 not collected.",
    mainSignal: "1099-K missing",
    salesTaxDueDate: addDays(TODAY, 12),
    salesTaxFilingFrequency: "Quarterly",
    organizerReceived: false,
    extensionFiled: true,
    partnerId: "p1",
    partnerName: "Sarah Chen",
    deadline: addDays(TODAY, 5),
    lastActivity: addDays(TODAY, -5),
    nexusRisk: "high",
    complexityTier: "high",
    bottleneckOwner: "client",
  }),
  makeClient({
    id: "c3",
    entityName: "Gamma Services Inc",
    readinessScore: 72,
    readinessTier: "action_required",
    services: ["1040", "Bookkeeping", "Payroll"],
    blockers: ["Pending client response"],
    blockerReason: "Awaiting signed engagement letter.",
    mainSignal: "Duplicate bank statement lines",
    lastSync: addDays(TODAY, -3),
    reconStatus: "3 items pending",
    organizerReceived: true,
    extensionFiled: false,
    partnerId: "p2",
    partnerName: "Marcus Webb",
    deadline: addDays(TODAY, 12),
    lastActivity: addDays(TODAY, -2),
    nexusRisk: "medium",
    complexityTier: "high",
    bottleneckOwner: "client",
  }),
  makeClient({
    id: "c4",
    entityName: "Delta Holdings",
    readinessScore: 0,
    readinessTier: "blocked",
    services: ["1040", "Audit"],
    blockers: ["TIN mismatch", "Documents overdue"],
    blockerReason: "TIN mismatch on file; documents overdue by 2 weeks.",
    mainSignal: "Missing source documents",
    organizerReceived: false,
    extensionFiled: false,
    nextReview: addDays(TODAY, 14),
    partnerId: "p2",
    partnerName: "Marcus Webb",
    deadline: addDays(TODAY, 3),
    lastActivity: addDays(TODAY, -14),
    nexusRisk: "high",
    complexityTier: "high",
    bottleneckOwner: "client",
  }),
  makeClient({
    id: "c5",
    entityName: "Epsilon Consulting",
    readinessScore: 88,
    readinessTier: "action_required",
    services: ["1099"],
    blockers: ["Missing 1099-NEC"],
    blockerReason: "One 1099-NEC still outstanding.",
    mainSignal: "1099-NEC not filed",
    organizerReceived: true,
    extensionFiled: false,
    nextReview: addDays(TODAY, 45),
    partnerId: "p3",
    partnerName: "Elena Rodriguez",
    deadline: addDays(TODAY, 21),
    lastActivity: addDays(TODAY, 0),
    nexusRisk: "low",
    complexityTier: "low",
    bottleneckOwner: "internal",
  }),
  makeClient({
    id: "c6",
    entityName: "Zeta Advisory Group",
    readinessScore: 65,
    readinessTier: "action_required",
    services: ["Advisory", "1040"],
    blockers: [],
    mainSignal: "Board pack overdue",
    lastActivity: addDays(TODAY, -12),
    deadline: addDays(TODAY, 18),
    partnerId: "p2",
    partnerName: "Marcus Webb",
    nextReview: addDays(TODAY, 14),
    lastReview: addDays(TODAY, -45),
    engagementType: "Board pack",
    keyMetricsDue: addDays(TODAY, 7),
    nexusRisk: "low",
    complexityTier: "high",
    bottleneckOwner: "internal",
    sidePanelMainSignal: {
      title: "Board pack overdue",
      description:
        "The **board pack** for the next meeting is due. Compile financial summaries, KPIs, and commentary for the board.",
      viewAnalysisLabel: "View detailed analysis",
      ctaLabel: "Open board pack",
    },
    sidePanelContributingSignals: [
      { title: "Next review scheduled", description: "Quarterly business review scheduled in 2 weeks" },
      { title: "Budget variance", description: "YTD variance vs budget exceeds 10%; recommend client discussion" },
    ],
  }),
  makeClient({
    id: "c7",
    entityName: "Eta Partners LLC",
    readinessScore: 40,
    readinessTier: "blocked",
    services: ["Bookkeeping", "Advisory"],
    blockers: ["Pending client response"],
    mainSignal: "Follow-up overdue",
    lastActivity: addDays(TODAY, -42),
    deadline: addDays(TODAY, 30),
    partnerId: "p1",
    partnerName: "Sarah Chen",
    nextReview: addDays(TODAY, 5),
    lastReview: addDays(TODAY, -90),
    engagementType: "CFO advisory",
    keyMetricsDue: addDays(TODAY, -3),
    nexusRisk: "medium",
    complexityTier: "high",
    bottleneckOwner: "client",
    blockerReason: "No response to last 2 outreach emails.",
  }),
];

// Extra clients for Sarah Chen with deadlines in current month (so default filters show a full table)
const SARAH_CURRENT_MONTH_PREFIXES = [
  "Summit", "Ridge", "Pine", "Cascade", "Haven", "Nova", "Vega", "Quill",
  "Brio", "Lumen", "Mosaic", "Terra", "Willow", "Apex", "Frost", "Globe",
  "Ivy", "Jade", "Kite", "Orbit", "Prime", "Core", "North", "East",
  "Unity", "Zephyr", "Yarrow", "Dune", "Echo", "West",
];
const SARAH_SUFFIXES = ["Corp", "LLC", "Inc", "Partners", "Group", "Co", "Services", "Holdings"];
let sarahSeq = 100;
const daysInMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0).getDate();
for (let i = 0; i < SARAH_CURRENT_MONTH_PREFIXES.length; i++) {
  const day = Math.max(1, Math.min(daysInMonth, 5 + (i % Math.max(1, daysInMonth - 4))));
  const tier = (["ready", "action_required", "blocked"] as const)[i % 3];
  const score = tier === "ready" ? 82 + (i % 18) : tier === "action_required" ? 48 + (i % 40) : 20 + (i % 35);
  const numServices = 1 + (i % 6);
  const services = SERVICE_OPTIONS.slice(0, numServices);
  const numBlockers = tier === "blocked" ? 1 + (i % 3) : tier === "action_required" ? (i % 2) : 0;
  const blockers = BLOCKER_OPTIONS.slice(0, numBlockers);
  const suffix = SARAH_SUFFIXES[i % SARAH_SUFFIXES.length];
  const hasSalesTax = services.includes("Sales Tax");
  const hasBookkeeping = services.includes("Bookkeeping");
  const has1099 = services.includes("1099") || services.includes("1040");
  const hasPayroll = services.includes("Payroll");
  const hasAdvisory = services.includes("Advisory") || services.includes("Audit");
  const payrollFreqs = ["Weekly", "Biweekly", "Semimonthly", "Monthly"] as const;
  const engagementTypes = ["CFO advisory", "Board pack", "KPI review", "Cash flow", "Forecast"];
  MOCK_CLIENTS.push(
    makeClient({
      id: `c${sarahSeq++}`,
      entityName: `${SARAH_CURRENT_MONTH_PREFIXES[i]} ${suffix}`,
      readinessScore: score,
      readinessTier: tier,
      services,
      blockers,
      blockerReason: blockers.length > 0 ? `${blockers[0]}.` : undefined,
      mainSignal: pickMainSignalForServices(services, i),
      salesTaxDueDate: hasSalesTax ? addDays(dateInCurrentMonth(day), i % 14) : undefined,
      salesTaxFilingFrequency: hasSalesTax ? (i % 2 === 0 ? "Quarterly" : "Monthly") : undefined,
      lastSync: hasBookkeeping ? addDays(TODAY, -(i % 5)) : undefined,
      reconStatus: hasBookkeeping ? RECON_STATUS_OPTIONS[i % RECON_STATUS_OPTIONS.length] : undefined,
      organizerReceived: has1099 ? i % 3 !== 0 : undefined,
      extensionFiled: has1099 ? i % 4 === 0 : undefined,
      nextReview: addDays(TODAY, 14 + (i % 60)),
      payrollFrequency: hasPayroll ? payrollFreqs[i % 4] : undefined,
      nextPayrollRun: hasPayroll ? addDays(TODAY, (i % 14) + 1) : undefined,
      lastPayrollRun: hasPayroll ? addDays(TODAY, -(i % 7)) : undefined,
      payrollTaxDue: hasPayroll ? addDays(TODAY, (i % 15) + 5) : undefined,
      lastReview: hasAdvisory ? addDays(TODAY, -(i % 30)) : undefined,
      engagementType: hasAdvisory ? engagementTypes[i % engagementTypes.length] : undefined,
      keyMetricsDue: hasAdvisory ? addDays(TODAY, (i % 14) + 3) : undefined,
      managementReportStatus: hasAdvisory ? (["Sent", "Due", "Draft", "In review"] as const)[i % 4] : undefined,
      partnerId: "p1",
      partnerName: "Sarah Chen",
      deadline: dateInCurrentMonth(day),
      lastActivity: addDays(TODAY, -(i % 10)),
      nexusRisk: (["low", "medium", "high"] as const)[i % 3],
      complexityTier: (["low", "high"] as const)[i % 2],
      bottleneckOwner: (["client", "internal"] as const)[i % 2],
    })
  );
}

// Generate 50+ clients with variety
const ENTITY_PREFIXES = [
  "Apex", "Brio", "Cascade", "Dune", "Echo", "Frost", "Globe", "Haven",
  "Ivy", "Jade", "Kite", "Lumen", "Mosaic", "Nova", "Orbit", "Pine",
  "Quill", "Ridge", "Summit", "Terra", "Unity", "Vega", "Willow", "Xylo",
  "Yarrow", "Zephyr", "North", "South", "East", "West", "Prime", "Core",
];
const ENTITY_SUFFIXES = ["Corp", "LLC", "Inc", "Partners", "Group", "Co", "Services", "Holdings"];

let idSeq = 10;
for (let i = 0; i < 50; i++) {
  const tier = (["ready", "action_required", "blocked"] as const)[i % 3];
  const score = tier === "ready" ? 85 + (i % 15) : tier === "action_required" ? 50 + (i % 35) : i % 50;
  const partner = PARTNERS[i % PARTNERS.length];
  const numServices = 1 + (i % 6);
  const services = SERVICE_OPTIONS.slice(0, numServices);
  const numBlockers = tier === "blocked" ? 1 + (i % 3) : tier === "action_required" ? (i % 2) : 0;
  const blockers = BLOCKER_OPTIONS.slice(0, numBlockers);
  const nexus = (["low", "medium", "high"] as const)[i % 3];
  const complexity = (["low", "high"] as const)[i % 2];
  const bottleneck = (["client", "internal"] as const)[i % 2];
  const name = `${ENTITY_PREFIXES[i % ENTITY_PREFIXES.length]} ${ENTITY_SUFFIXES[i % ENTITY_SUFFIXES.length]}`;
  const hasSalesTax = services.includes("Sales Tax");
  const hasBookkeeping = services.includes("Bookkeeping");
  const has1099 = services.includes("1099") || services.includes("1040");
  const hasPayroll = services.includes("Payroll");
  const hasAdvisory = services.includes("Advisory") || services.includes("Audit");
  const payrollFreqs = ["Weekly", "Biweekly", "Semimonthly", "Monthly"] as const;
  const engagementTypes = ["CFO advisory", "Board pack", "KPI review", "Cash flow", "Forecast"];
  MOCK_CLIENTS.push(
    makeClient({
      id: `c${idSeq++}`,
      entityName: name,
      readinessScore: score,
      readinessTier: tier,
      services,
      blockers,
      blockerReason:
        blockers.length > 0
          ? `${blockers[0]}${blockers.length > 1 ? `; ${blockers[1]}` : ""}.`
          : undefined,
      mainSignal: pickMainSignalForServices(services, i),
      salesTaxDueDate: hasSalesTax ? addDays(TODAY, (i % 30) + 1) : undefined,
      salesTaxFilingFrequency: hasSalesTax ? (i % 2 === 0 ? "Quarterly" : "Monthly") : undefined,
      lastSync: hasBookkeeping ? addDays(TODAY, -(i % 7)) : undefined,
      reconStatus: hasBookkeeping ? RECON_STATUS_OPTIONS[i % RECON_STATUS_OPTIONS.length] : undefined,
      organizerReceived: has1099 ? i % 3 !== 1 : undefined,
      extensionFiled: has1099 ? i % 5 === 0 : undefined,
      nextReview: addDays(TODAY, 7 + (i % 90)),
      payrollFrequency: hasPayroll ? payrollFreqs[i % 4] : undefined,
      nextPayrollRun: hasPayroll ? addDays(TODAY, (i % 14) - 2) : undefined,
      lastPayrollRun: hasPayroll ? addDays(TODAY, -(i % 10)) : undefined,
      payrollTaxDue: hasPayroll ? addDays(TODAY, (i % 20) + 3) : undefined,
      lastReview: hasAdvisory ? addDays(TODAY, -(i % 45)) : undefined,
      engagementType: hasAdvisory ? engagementTypes[i % engagementTypes.length] : undefined,
      keyMetricsDue: hasAdvisory ? addDays(TODAY, (i % 21) + 1) : undefined,
      managementReportStatus: hasAdvisory ? (["Sent", "Due", "Draft", "In review"] as const)[i % 4] : undefined,
      partnerId: partner.id,
      partnerName: partner.name,
      deadline: addDays(TODAY, i % 60),
      lastActivity: addDays(TODAY, -(i % 14)),
      nexusRisk: nexus,
      complexityTier: complexity,
      bottleneckOwner: bottleneck,
    })
  );
}

// --- Filter engine ---

export function useFilteredClients(
  clients: Client[],
  filterState: FilterState
): Client[] {
  return useMemo(() => {
    let result = clients.slice();

    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.trim().toLowerCase();
      result = result.filter((c) =>
        c.entityName.toLowerCase().includes(q)
      );
    }
    if (filterState.readinessTiers.length > 0) {
      result = result.filter((c) =>
        filterState.readinessTiers.includes(c.readinessTier)
      );
    }
    if (filterState.partners.length > 0) {
      result = result.filter((c) =>
        filterState.partners.includes(c.partnerName)
      );
    }
    if (filterState.serviceLines.length > 0) {
      result = result.filter((c) =>
        c.services.some((s) => filterState.serviceLines.includes(s))
      );
    }
    if (filterState.nexusRisk.length > 0) {
      result = result.filter((c) =>
        filterState.nexusRisk.includes(c.nexusRisk)
      );
    }
    if (filterState.complexityTiers.length > 0) {
      result = result.filter((c) =>
        filterState.complexityTiers.includes(c.complexityTier)
      );
    }
    if (filterState.bottleneckOwners.length > 0) {
      result = result.filter((c) =>
        filterState.bottleneckOwners.includes(c.bottleneckOwner)
      );
    }

    if (filterState.goal === "Month-end") {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      result = result.filter((c) => {
        const t = c.deadline.getTime();
        return t >= monthStart.getTime() && t <= monthEnd.getTime();
      });
    }
    if (filterState.goal === "Year-end") {
      const now = new Date();
      const yearStart = new Date(now.getFullYear(), 0, 1);
      const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      result = result.filter((c) => {
        const t = c.deadline.getTime();
        return t >= yearStart.getTime() && t <= yearEnd.getTime();
      });
    }

    if (filterState.period) {
      const { start, end } = filterState.period;
      const startT = start.getTime();
      const endT = end.getTime();
      result = result.filter((c) => {
        const t = c.deadline.getTime();
        return t >= startT && t <= endT;
      });
    }

    const { sortKey, sortDirection } = filterState;
    const mult = sortDirection === "asc" ? 1 : -1;
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "entityName") {
        cmp = a.entityName.localeCompare(b.entityName);
      } else if (sortKey === "readiness") {
        cmp = a.readinessScore - b.readinessScore;
      } else if (sortKey === "deadline") {
        cmp = a.deadline.getTime() - b.deadline.getTime();
      } else if (sortKey === "salesTaxDueDate") {
        const aDate = a.salesTaxDueDate ?? a.deadline;
        const bDate = b.salesTaxDueDate ?? b.deadline;
        cmp = aDate.getTime() - bDate.getTime();
      } else if (sortKey === "lastActivity") {
        cmp = a.lastActivity.getTime() - b.lastActivity.getTime();
      } else if (sortKey === "lastSync") {
        const aT = a.lastSync?.getTime() ?? 0;
        const bT = b.lastSync?.getTime() ?? 0;
        cmp = aT - bT;
      } else if (sortKey === "nextReview") {
        const aT = a.nextReview?.getTime() ?? 0;
        const bT = b.nextReview?.getTime() ?? 0;
        cmp = aT - bT;
      } else if (sortKey === "nextPayrollRun") {
        const aT = a.nextPayrollRun?.getTime() ?? 0;
        const bT = b.nextPayrollRun?.getTime() ?? 0;
        cmp = aT - bT;
      } else if (sortKey === "lastReview") {
        const aT = a.lastReview?.getTime() ?? 0;
        const bT = b.lastReview?.getTime() ?? 0;
        cmp = aT - bT;
      } else if (sortKey === "keyMetricsDue") {
        const aT = a.keyMetricsDue?.getTime() ?? 0;
        const bT = b.keyMetricsDue?.getTime() ?? 0;
        cmp = aT - bT;
      }
      return mult * cmp;
    });

    return result;
  }, [clients, filterState]);
}

export function getUniquePartners(clients: Client[]): string[] {
  const set = new Set(clients.map((c) => c.partnerName));
  return Array.from(set).sort();
}

export function getUniqueServiceLines(clients: Client[]): string[] {
  const set = new Set(clients.flatMap((c) => c.services));
  return Array.from(set).sort();
}

export function createPeriod(label: string, year: number, month: number): PeriodValue {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return { label, start, end };
}

export function getThisMonthPeriod(): PeriodValue {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const label = `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString("en-GB", { month: "long" })} ${start.getFullYear()}`;
  return { label, start, end };
}

export function getLastMonthPeriod(): PeriodValue {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  const label = `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString("en-GB", { month: "long" })} ${start.getFullYear()}`;
  return { label, start, end };
}

export function getThisQuarterPeriod(): PeriodValue {
  const now = new Date();
  const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
  const start = new Date(now.getFullYear(), quarterMonth, 1);
  const end = new Date(now.getFullYear(), quarterMonth + 3, 0, 23, 59, 59);
  const label = `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`;
  return { label, start, end };
}

export function getThisYearPeriod(): PeriodValue {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  const label = `${now.getFullYear()}`;
  return { label, start, end };
}

export function getLastYearPeriod(): PeriodValue {
  const now = new Date();
  const y = now.getFullYear() - 1;
  const start = new Date(y, 0, 1);
  const end = new Date(y, 11, 31, 23, 59, 59);
  const label = `${y}`;
  return { label, start, end };
}
