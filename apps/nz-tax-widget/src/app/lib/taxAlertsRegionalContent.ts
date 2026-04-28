import type { Region } from "@/app/lib/regions";
import type { PrototypeStageId } from "@/app/lib/prototypeSettings";
import type { WorkloadFilterRole } from "@/app/lib/mockData/workloadInsights";
import {
  getAnnualTaxReturnsForSelection,
  type AnnualTaxReturnsProfile,
  type TaxYearId,
} from "@/app/lib/mockData/annualTaxReturns";

const TAX_YEAR_ID: TaxYearId = "fy26";

/**
 * FY26 Tax alerts tile — firm-level volumes (prototype-only; reads plausibly at a glance).
 * Scoped Partner/Manager views scale from {@link nzAlertScopeWeight} and may omit rows at 0.
 */
const NZ_TAX_ALERTS_FY26_FIRM = {
  noticesDifferent: 14,
  disputed: 5,
  transfersDifferent: 11,
  missedPaymentClients: 23,
} as const;

function nzActivePipelineTotal(p: AnnualTaxReturnsProfile): number {
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

/** Share of active-return workload for the selected Practice / Partner / Manager (0–1). */
function nzAlertScopeWeight(
  filterRole: WorkloadFilterRole,
  personId: string
): number {
  if (filterRole === "firm") return 1;
  const firm = getAnnualTaxReturnsForSelection("firm", "", TAX_YEAR_ID);
  const scoped = getAnnualTaxReturnsForSelection(
    filterRole,
    personId,
    TAX_YEAR_ID
  );
  const tf = nzActivePipelineTotal(firm);
  const ts = nzActivePipelineTotal(scoped);
  if (tf <= 0) return 1;
  return Math.min(1, Math.max(0, ts / tf));
}

/** Floor scale so smaller books often drop low-volume alert types entirely. */
function nzScaleAlertCount(firmCount: number, weight: number): number {
  if (firmCount <= 0) return 0;
  if (weight >= 0.995) return firmCount;
  return Math.max(0, Math.floor(firmCount * weight));
}

export type TaxAlertRowStub = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  stripeClass: string;
};

const STRIPE_WARNING = "bg-[#fa8200]";
const STRIPE_ERROR = "bg-[#DE0E40]";
const STRIPE_INFO = "bg-[#0078c8]";

/** Red → orange → blue (left stripe severity). */
const STRIPE_IMPORTANCE_RANK: Record<string, number> = {
  [STRIPE_ERROR]: 0,
  [STRIPE_WARNING]: 1,
  [STRIPE_INFO]: 2,
};

function sortTaxAlertRowsByStripeImportance(
  rows: TaxAlertRowStub[]
): TaxAlertRowStub[] {
  return [...rows].sort((a, b) => {
    const ra = STRIPE_IMPORTANCE_RANK[a.stripeClass] ?? 99;
    const rb = STRIPE_IMPORTANCE_RANK[b.stripeClass] ?? 99;
    return ra - rb;
  });
}

function returnsLabel(n: number): string {
  return n === 1 ? "1 return" : `${n.toLocaleString()} returns`;
}

function nzRowsFromMocks(options?: {
  /** NZ XPAC overview omits this row (GA / Agentic / Tailor keep it). */
  omitMissedPayments?: boolean;
  nzPrototypeStage?: PrototypeStageId;
  /** NZ GA / Agentic Tax alerts scope (Practice / Partner / Manager). */
  workloadFilter?: {
    filterRole: WorkloadFilterRole;
    personId: string;
  };
}): TaxAlertRowStub[] {
  const fr = options?.workloadFilter?.filterRole ?? "firm";
  const pid = options?.workloadFilter?.personId ?? "";
  const weight = nzAlertScopeWeight(fr, pid);

  const notices = nzScaleAlertCount(
    NZ_TAX_ALERTS_FY26_FIRM.noticesDifferent,
    weight
  );
  const disputed = nzScaleAlertCount(NZ_TAX_ALERTS_FY26_FIRM.disputed, weight);
  const transfersDifferent = nzScaleAlertCount(
    NZ_TAX_ALERTS_FY26_FIRM.transfersDifferent,
    weight
  );
  const missedClients = nzScaleAlertCount(
    NZ_TAX_ALERTS_FY26_FIRM.missedPaymentClients,
    weight
  );

  const errorCount = getAnnualTaxReturnsForSelection(
    fr,
    pid,
    TAX_YEAR_ID
  ).errors;
  const xpacErrorsCopy = options?.nzPrototypeStage === "xpac";
  const rows: TaxAlertRowStub[] = [];

  if (errorCount > 0) {
    rows.push({
      id: "returns-errors",
      title:
        errorCount === 1
          ? xpacErrorsCopy
            ? "Error"
            : "Filing error"
          : xpacErrorsCopy
            ? "Errors"
            : "Filing errors",
      subtitle: returnsLabel(errorCount),
      href: "/tax/all-returns?tab=error",
      stripeClass: STRIPE_ERROR,
    });
  }

  if (notices > 0) {
    rows.push({
      id: "notices-different",
      title: "Notices that are different",
      subtitle: returnsLabel(notices),
      href: `/tax/statements?tab=notices_different&year=${TAX_YEAR_ID}`,
      stripeClass: STRIPE_WARNING,
    });
  }

  if (disputed > 0) {
    rows.push({
      id: "disputed",
      title: "Disputed statements",
      subtitle: returnsLabel(disputed),
      href: `/tax/statements?tab=disputed&year=${TAX_YEAR_ID}`,
      stripeClass: STRIPE_WARNING,
    });
  }

  if (transfersDifferent > 0) {
    rows.push({
      id: "transfers-different",
      title: "Transfers that are different",
      subtitle: returnsLabel(transfersDifferent),
      href: `/tax/statements?tab=transfers_different&year=${TAX_YEAR_ID}`,
      stripeClass: STRIPE_WARNING,
    });
  }

  if (!options?.omitMissedPayments && missedClients > 0) {
    const clientWord = missedClients === 1 ? "client" : "clients";
    const missedPaymentsHref =
      options?.nzPrototypeStage === "ga" ||
      options?.nzPrototypeStage === "ai"
        ? "/reports/report-builder"
        : "/tax/all-returns";
    rows.push({
      id: "missed-payments",
      title: "Missed payments",
      subtitle: `${missedClients.toLocaleString()} ${clientWord} · tax payment reminder letters`,
      href: missedPaymentsHref,
      stripeClass: STRIPE_WARNING,
    });
  }
  return rows;
}

const AU_STUBS: TaxAlertRowStub[] = [
  {
    id: "au-bas",
    title: "Activity statement variances",
    subtitle: "12 clients · GST and PAYG review",
    href: "/tax/all-returns",
    stripeClass: STRIPE_WARNING,
  },
  {
    id: "au-tfn",
    title: "TFN reporting due",
    subtitle: "3 clients",
    href: "/tax/all-returns",
    stripeClass: STRIPE_INFO,
  },
  {
    id: "au-super",
    title: "Super guarantee reconciliation",
    subtitle: "5 employers",
    href: "/tax/all-returns",
    stripeClass: STRIPE_WARNING,
  },
];

const UK_STUBS: TaxAlertRowStub[] = [
  {
    id: "uk-nics",
    title: "NICs and payroll changes",
    subtitle: "12 clients with increased employment costs",
    href: "/tax/all-returns",
    stripeClass: STRIPE_WARNING,
  },
  {
    id: "uk-ct",
    title: "Corporation tax reminders",
    subtitle: "8 companies · CT600 prep",
    href: "/tax/all-returns",
    stripeClass: STRIPE_INFO,
  },
  {
    id: "uk-mtd",
    title: "MTD for ITSA readiness",
    subtitle: "4 sole traders",
    href: "/tax/all-returns",
    stripeClass: STRIPE_ERROR,
  },
];

const USA_STUBS: TaxAlertRowStub[] = [
  {
    id: "us-ext",
    title: "Extension filings",
    subtitle: "6 clients · S-corp and partnership",
    href: "/tax/all-returns",
    stripeClass: STRIPE_INFO,
  },
  {
    id: "us-1099",
    title: "1099-NEC mismatches",
    subtitle: "9 vendors to reconcile",
    href: "/tax/all-returns",
    stripeClass: STRIPE_WARNING,
  },
  {
    id: "us-est",
    title: "Estimated tax shortfalls",
    subtitle: "4 clients flagged",
    href: "/tax/all-returns",
    stripeClass: STRIPE_ERROR,
  },
];

const ROW_STUBS: TaxAlertRowStub[] = [
  {
    id: "row-vat",
    title: "Indirect tax filings",
    subtitle: "7 clients · multi-country",
    href: "/tax/all-returns",
    stripeClass: STRIPE_WARNING,
  },
  {
    id: "row-fx",
    title: "FX and transfer pricing notes",
    subtitle: "2 groups",
    href: "/tax/all-returns",
    stripeClass: STRIPE_INFO,
  },
];

/**
 * Default Tax alerts list rows for the overview tile (prototype stubs outside NZ).
 * NZ uses FY26 mock statement and returns data.
 */
export function getTaxAlertRowsForRegion(
  region: Region | string,
  options?: {
    /** When `xpac`, NZ omits the Missed payments row. */
    nzPrototypeStage?: PrototypeStageId;
    /** NZ GA / Agentic: scope filter for filing-error counts. */
    workloadFilter?: {
      filterRole: WorkloadFilterRole;
      personId: string;
    };
  }
): TaxAlertRowStub[] {
  let rows: TaxAlertRowStub[];
  switch (region) {
    case "NZ":
      rows = nzRowsFromMocks({
        omitMissedPayments: options?.nzPrototypeStage === "xpac",
        nzPrototypeStage: options?.nzPrototypeStage,
        workloadFilter: options?.workloadFilter,
      });
      break;
    case "AU":
      rows = AU_STUBS;
      break;
    case "UK":
      rows = UK_STUBS;
      break;
    case "USA":
      rows = USA_STUBS;
      break;
    case "REST_OF_WORLD":
      rows = ROW_STUBS;
      break;
    default:
      rows = ROW_STUBS;
  }
  return sortTaxAlertRowsByStripeImportance(rows);
}
