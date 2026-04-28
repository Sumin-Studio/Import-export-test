/**
 * Prototype data for Workload insights widget (NZ FY, Apr–Mar).
 *
 * Return-type **filed** counts are aligned to the Annual tax returns widget: the sum of
 * `workloadByReturnType.filed` matches “Filed” from {@link getAnnualTaxReturnsForSelection}
 * (FY26 for “This year”; ×0.92 for “Last year”, same as time-period scaling).
 *
 * **Monthly `filed`** is generated so cumulative progress matches the **Filed tax returns**
 * widget at {@link LODGEMENTS_REFERENCE_DATE} (same pool D and lodged volume), then completes
 * the FY to the expected pool total (this year) or ~92% (last year).
 */

import { getAnnualTaxReturnsForSelection } from "./annualTaxReturns";
import { REGIONS } from "@/app/lib/regions";
import type { Region } from "@/app/lib/regions";
import type { PipelineStageId } from "@/app/lib/prototypeSettings";

export const MONTH_LABELS_FY = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
] as const;

/** Same order as MONTH_LABELS_FY — for tooltips and accessible copy */
export const MONTH_LABELS_FY_FULL = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
] as const;

/**
 * Month view: columns use `filed` only (split by return type). Return-type horizontal
 * bars use `filed` per return type only. Other buckets are for future views / copy only.
 */
export const workloadByMonth = {
  /** Filed — climbs through peak season; Mar >> Feb (end-of-year rush) */
  filed: [6, 9, 12, 16, 21, 28, 36, 44, 52, 58, 62, 124],
  /** In progress */
  inProgress: [18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 76],
  /** Waiting on client */
  waitingOnClient: [14, 16, 17, 18, 19, 21, 24, 26, 28, 30, 28, 46],
  /** Overdue */
  overdue: [4, 3, 3, 2, 2, 3, 2, 2, 1, 1, 1, 5],
} as const;

/**
 * Legacy cumulative series on profiles; month-view line uses
 * {@link getWorkloadComparisonMonthlyTotals} (prior FY, same metric as bar height).
 */
export const workloadTargetByMonth: number[] = [
  0, 22, 46, 72, 98, 124, 152, 178, 196, 212, 226, 360,
];

export const RETURN_TYPE_LABELS = [
  "IR3",
  "IR3NR",
  "IR4",
  "IR6",
  "IR7",
  "IR8",
  "IR9",
] as const;

/** Stacked counts by return type — IR3 and IR4 dominate */
export const workloadByReturnType = {
  filed: [90, 28, 88, 42, 22, 14, 9],
  inProgress: [72, 22, 72, 34, 18, 12, 4],
  waitingOnClient: [52, 16, 52, 24, 14, 8, 5],
  overdue: [6, 2, 6, 2, 1, 1, 0],
} as const;

export type WorkloadFilterRole = "firm" | "accountManager" | "manager";

/** NZ financial year window shown in the overflow menu (prototype dates). */
export type WorkloadTimePeriod = "thisYear" | "lastYear";

type WorkloadProfile = {
  workloadByMonth: { filed: number[]; inProgress: number[]; waitingOnClient: number[]; overdue: number[] };
  workloadByReturnType: { filed: number[]; inProgress: number[]; waitingOnClient: number[]; overdue: number[] };
  workloadTargetByMonth: number[];
};

/** Scale a profile for last year (slightly different historical pattern) */
function scaleForTimePeriod(profile: WorkloadProfile, timePeriod: WorkloadTimePeriod): WorkloadProfile {
  if (timePeriod === "thisYear") return profile;
  const scale = 0.92; // Last year ~8% lower volume
  return {
    workloadByMonth: {
      filed: profile.workloadByMonth.filed.map((v) => Math.max(0, Math.round(v * scale))),
      inProgress: profile.workloadByMonth.inProgress.map((v) => Math.max(0, Math.round(v * scale))),
      waitingOnClient: profile.workloadByMonth.waitingOnClient.map((v) => Math.max(0, Math.round(v * scale))),
      overdue: profile.workloadByMonth.overdue.map((v) => Math.max(0, Math.round(v * scale))),
    },
    workloadByReturnType: {
      filed: profile.workloadByReturnType.filed.map((v) => Math.max(0, Math.round(v * scale))),
      inProgress: profile.workloadByReturnType.inProgress.map((v) => Math.max(0, Math.round(v * scale))),
      waitingOnClient: profile.workloadByReturnType.waitingOnClient.map((v) => Math.max(0, Math.round(v * scale))),
      overdue: profile.workloadByReturnType.overdue.map((v) => Math.max(0, Math.round(v * scale))),
    },
    workloadTargetByMonth: profile.workloadTargetByMonth.map((v) => Math.max(0, Math.round(v * scale))),
  };
}

/** Largest remainder: non-negative integer counts proportional to `weights`, summing to `target`. */
function allocateProportional(weights: readonly number[], target: number): number[] {
  const n = weights.length;
  if (n === 0) return [];
  if (target <= 0) return weights.map(() => 0);
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) {
    const base = Math.floor(target / n);
    const rem = target - base * n;
    return weights.map((_, i) => base + (i < rem ? 1 : 0));
  }
  const exact = weights.map((w) => (w * target) / sum);
  const base = exact.map((x) => Math.floor(x));
  let diff = target - base.reduce((a, b) => a + b, 0);
  const order = weights
    .map((_, i) => i)
    .sort(
      (i, j) =>
        exact[j]! - base[j]! - (exact[i]! - base[i]!)
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
 * Scales `workloadByReturnType.filed` so its sum matches Annual tax returns “Filed”
 * (same filter / person as the workload widget; FY26 baseline).
 */
function alignReturnTypeFiledWithAnnualWidget(
  profile: WorkloadProfile,
  filterRole: WorkloadFilterRole,
  personId: string,
  timePeriod: WorkloadTimePeriod
): WorkloadProfile {
  const annualFiledFY26 = getAnnualTaxReturnsForSelection(
    filterRole,
    personId,
    "fy26"
  ).filed;
  const target =
    timePeriod === "thisYear"
      ? annualFiledFY26
      : Math.max(0, Math.round(annualFiledFY26 * 0.92));

  const weights = profile.workloadByReturnType.filed;
  const filed = allocateProportional(weights, target);

  return {
    ...profile,
    workloadByReturnType: {
      ...profile.workloadByReturnType,
      filed,
    },
  };
}

/**
 * Per-person workload profiles — realistic, distinct patterns.
 * NZ FY Apr–Mar: extension filers busy Jul–Oct; standard filers peak Jan–Mar.
 * Account managers = smaller portfolios; managers = aggregated team views.
 */
const PERSON_PROFILES: Record<string, WorkloadProfile> = {
  // ——— Account managers ———
  "am-sophie": {
    // Sophie Chen: IR3-heavy (individuals), smaller portfolio, steady filer, low overdue. Peak Jan–Mar.
    workloadByMonth: {
      filed: [4, 6, 8, 10, 12, 18, 24, 28, 32, 38, 44, 92],
      inProgress: [12, 14, 15, 16, 18, 20, 22, 24, 26, 28, 28, 56],
      waitingOnClient: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 22, 44],
      overdue: [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 2],
    },
    workloadByReturnType: {
      filed: [65, 22, 22, 14, 6, 4, 2],
      inProgress: [48, 16, 18, 10, 4, 2, 2],
      waitingOnClient: [36, 12, 14, 8, 4, 2, 1],
      overdue: [1, 1, 0, 1, 0, 0, 0],
    },
    workloadTargetByMonth: [0, 14, 30, 48, 65, 82, 98, 112, 124, 134, 142, 148],
  },
  "am-james": {
    // James O'Connor: IR4/company-heavy, larger caseload, busy Jul–Oct (extension season), some overdue.
    workloadByMonth: {
      filed: [8, 12, 18, 28, 38, 48, 56, 52, 44, 38, 32, 68],
      inProgress: [22, 24, 26, 30, 34, 36, 34, 30, 26, 24, 22, 44],
      waitingOnClient: [18, 20, 22, 24, 26, 28, 26, 22, 18, 16, 14, 28],
      overdue: [3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 2, 4],
    },
    workloadByReturnType: {
      filed: [52, 18, 118, 52, 22, 14, 6],
      inProgress: [44, 14, 98, 44, 18, 12, 4],
      waitingOnClient: [32, 10, 74, 34, 14, 8, 4],
      overdue: [3, 1, 10, 4, 2, 1, 1],
    },
    workloadTargetByMonth: [0, 28, 58, 92, 124, 154, 182, 200, 212, 220, 226, 230],
  },
  "am-aroha": {
    // Aroha Williams: Partnerships (IR6) focus, mid-size, waiting-on-client heavy, moderate overdue.
    workloadByMonth: {
      filed: [5, 7, 10, 14, 18, 22, 26, 30, 34, 36, 32, 66],
      inProgress: [14, 16, 18, 20, 22, 24, 26, 28, 28, 26, 26, 52],
      waitingOnClient: [16, 18, 20, 22, 24, 28, 32, 34, 32, 28, 24, 18],
      overdue: [2, 2, 3, 2, 2, 3, 3, 2, 2, 1, 1, 2],
    },
    workloadByReturnType: {
      filed: [52, 18, 58, 88, 22, 12, 6],
      inProgress: [42, 14, 46, 72, 18, 8, 4],
      waitingOnClient: [38, 12, 42, 62, 14, 6, 4],
      overdue: [2, 1, 4, 6, 2, 1, 1],
    },
    workloadTargetByMonth: [0, 18, 38, 60, 82, 104, 124, 142, 156, 168, 178, 186],
  },
  "am-ryan": {
    // Ryan Patel: Balanced mix, good pipeline health, meets target. Peak Oct–Dec.
    workloadByMonth: {
      filed: [6, 9, 12, 16, 22, 30, 40, 48, 52, 54, 48, 98],
      inProgress: [16, 18, 20, 22, 24, 26, 28, 30, 32, 30, 28, 56],
      waitingOnClient: [12, 14, 15, 16, 18, 20, 22, 24, 24, 22, 18, 14],
      overdue: [2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 0, 1],
    },
    workloadByReturnType: {
      filed: [72, 24, 72, 38, 18, 10, 6],
      inProgress: [58, 20, 60, 30, 14, 8, 4],
      waitingOnClient: [42, 14, 48, 22, 10, 6, 4],
      overdue: [3, 1, 4, 2, 1, 1, 0],
    },
    workloadTargetByMonth: [0, 22, 46, 72, 98, 124, 152, 178, 196, 212, 224, 232],
  },
  "am-emma": {
    // Emma Taylor: Larger caseload, overdue concerns in Mar, waiting heavy. Busy Jan–Mar.
    workloadByMonth: {
      filed: [6, 8, 10, 14, 18, 24, 30, 36, 42, 50, 58, 118],
      inProgress: [20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 36, 72],
      waitingOnClient: [20, 22, 24, 26, 28, 32, 36, 38, 40, 38, 34, 26],
      overdue: [4, 4, 4, 3, 3, 4, 4, 3, 3, 2, 2, 6],
    },
    workloadByReturnType: {
      filed: [74, 26, 82, 44, 22, 14, 8],
      inProgress: [64, 22, 72, 38, 20, 10, 6],
      waitingOnClient: [52, 18, 58, 32, 16, 8, 6],
      overdue: [6, 2, 8, 4, 2, 1, 1],
    },
    workloadTargetByMonth: [0, 24, 50, 78, 106, 132, 158, 182, 200, 216, 230, 240],
  },
  // ——— Managers (aggregated team) ———
  "m-michael": {
    // Michael Hughes: Balanced team, meets targets, steady across the year.
    workloadByMonth: {
      filed: [18, 24, 32, 42, 54, 68, 82, 96, 108, 118, 124, 248],
      inProgress: [42, 46, 50, 54, 58, 62, 66, 68, 68, 64, 58, 116],
      waitingOnClient: [32, 36, 40, 44, 48, 54, 60, 64, 64, 58, 50, 40],
      overdue: [6, 5, 5, 4, 4, 5, 4, 4, 3, 2, 2, 4],
    },
    workloadByReturnType: {
      filed: [186, 62, 198, 92, 48, 28, 18],
      inProgress: [150, 50, 162, 74, 38, 22, 12],
      waitingOnClient: [115, 38, 122, 56, 28, 16, 10],
      overdue: [10, 4, 14, 6, 4, 2, 2],
    },
    workloadTargetByMonth: [0, 52, 108, 168, 228, 288, 348, 402, 448, 488, 522, 548],
  },
  "m-priya": {
    // Priya Nair: IR3-heavy team (more individual clients). Steady filing, low company mix.
    workloadByMonth: {
      filed: [22, 28, 36, 44, 52, 62, 72, 80, 86, 90, 88, 178],
      inProgress: [48, 52, 54, 56, 58, 60, 62, 62, 60, 56, 52, 104],
      waitingOnClient: [38, 42, 44, 46, 48, 52, 54, 54, 50, 46, 40, 34],
      overdue: [4, 4, 3, 3, 2, 3, 2, 2, 2, 1, 1, 2],
    },
    workloadByReturnType: {
      filed: [248, 78, 142, 62, 28, 18, 12],
      inProgress: [198, 62, 118, 50, 22, 14, 8],
      waitingOnClient: [152, 48, 88, 38, 16, 10, 8],
      overdue: [6, 2, 6, 2, 1, 1, 1],
    },
    workloadTargetByMonth: [0, 58, 118, 182, 244, 304, 362, 414, 460, 500, 534, 560],
  },
  "m-charlotte": {
    // Charlotte Fraser: Company-heavy team, extension season peak (Jul–Oct).
    workloadByMonth: {
      filed: [10, 16, 26, 42, 58, 72, 84, 88, 76, 62, 48, 96],
      inProgress: [38, 42, 48, 54, 60, 64, 62, 56, 50, 44, 40, 80],
      waitingOnClient: [28, 32, 38, 44, 50, 54, 50, 44, 38, 32, 28, 24],
      overdue: [6, 6, 6, 6, 5, 5, 4, 4, 3, 3, 2, 4],
    },
    workloadByReturnType: {
      filed: [108, 36, 286, 118, 48, 28, 18],
      inProgress: [90, 30, 232, 96, 38, 22, 14],
      waitingOnClient: [66, 22, 176, 72, 28, 16, 10],
      overdue: [4, 2, 16, 6, 4, 2, 2],
    },
    workloadTargetByMonth: [0, 44, 92, 148, 202, 254, 302, 342, 374, 400, 422, 440],
  },
  "m-david": {
    // David Kumar: Mixed team, some overdue issues. Higher waiting-on-client.
    workloadByMonth: {
      filed: [14, 18, 24, 32, 42, 54, 66, 78, 86, 92, 88, 180],
      inProgress: [44, 48, 52, 56, 60, 64, 68, 70, 68, 64, 58, 116],
      waitingOnClient: [52, 56, 60, 64, 68, 74, 78, 80, 76, 68, 58, 46],
      overdue: [8, 8, 7, 6, 5, 6, 6, 5, 4, 3, 3, 6],
    },
    workloadByReturnType: {
      filed: [150, 50, 168, 78, 42, 28, 20],
      inProgress: [126, 42, 142, 64, 34, 22, 16],
      waitingOnClient: [106, 36, 118, 54, 28, 18, 14],
      overdue: [12, 4, 16, 8, 6, 4, 4],
    },
    workloadTargetByMonth: [0, 48, 98, 154, 208, 262, 314, 362, 404, 442, 474, 498],
  },
};

/** Expected return pool per type — same formula as {@link getWorkloadExpectedReturnsByReturnType}. */
function expectedReturnsFromFiledByType(filedByType: readonly number[]): number[] {
  return filedByType.map((f) => Math.max(f + 1, Math.round(f * 1.18 + 6)));
}

/**
 * Core workload profile (return types aligned to Annual tax returns; template `filed` per month).
 * {@link getWorkloadDataForSelection} overlays {@link getLodgementAlignedMonthlyFiled} on `workloadByMonth.filed`.
 */
function buildWorkloadProfileCore(
  filterRole: WorkloadFilterRole,
  personId: string,
  timePeriod: WorkloadTimePeriod
): WorkloadProfile {
  if (filterRole === "firm") {
    const base: WorkloadProfile = {
      workloadByMonth: {
        filed: [...workloadByMonth.filed],
        inProgress: [...workloadByMonth.inProgress],
        waitingOnClient: [...workloadByMonth.waitingOnClient],
        overdue: [...workloadByMonth.overdue],
      },
      workloadByReturnType: {
        filed: [...workloadByReturnType.filed],
        inProgress: [...workloadByReturnType.inProgress],
        waitingOnClient: [...workloadByReturnType.waitingOnClient],
        overdue: [...workloadByReturnType.overdue],
      },
      workloadTargetByMonth: [...workloadTargetByMonth],
    };
    return alignReturnTypeFiledWithAnnualWidget(
      scaleForTimePeriod(base, timePeriod),
      filterRole,
      "",
      timePeriod
    );
  }

  const profile = PERSON_PROFILES[personId];
  if (!profile) {
    const base: WorkloadProfile = {
      workloadByMonth: {
        filed: workloadByMonth.filed.map((v) => Math.round(v * 0.35)),
        inProgress: workloadByMonth.inProgress.map((v) => Math.round(v * 0.35)),
        waitingOnClient: workloadByMonth.waitingOnClient.map((v) => Math.round(v * 0.35)),
        overdue: workloadByMonth.overdue.map((v) => Math.round(v * 0.35)),
      },
      workloadByReturnType: {
        filed: workloadByReturnType.filed.map((v) => Math.round(v * 0.35)),
        inProgress: workloadByReturnType.inProgress.map((v) => Math.round(v * 0.35)),
        waitingOnClient: workloadByReturnType.waitingOnClient.map((v) => Math.round(v * 0.35)),
        overdue: workloadByReturnType.overdue.map((v) => Math.round(v * 0.35)),
      },
      workloadTargetByMonth: workloadTargetByMonth.map((v) => Math.round(v * 0.35)),
    };
    return alignReturnTypeFiledWithAnnualWidget(
      scaleForTimePeriod(base, timePeriod),
      filterRole,
      personId,
      timePeriod
    );
  }

  return alignReturnTypeFiledWithAnnualWidget(
    scaleForTimePeriod(profile, timePeriod),
    filterRole,
    personId,
    timePeriod
  );
}

/**
 * Prior FY **monthly filed** counts (same definition as each column’s stacked
 * height in month view: total filed that month, before split by return type).
 */
export function getWorkloadComparisonMonthlyTotals(
  filterRole: WorkloadFilterRole,
  personId: string,
  timePeriod: WorkloadTimePeriod
): number[] {
  if (timePeriod === "thisYear") {
    const prior = getWorkloadDataForSelection(filterRole, personId, "lastYear");
    return [...prior.workloadByMonth.filed];
  }
  const priorFy = getWorkloadDataForSelection(filterRole, personId, "lastYear");
  return priorFy.workloadByMonth.filed.map((v) =>
    Math.max(0, Math.round(v * 0.92))
  );
}

/**
 * IR EOT filing checkpoints (income tax returns, illustrative FY 2025–26).
 * Cumulative % filed by date; month-end targets linearly interpolate in time.
 */
const EOT_CHECKPOINTS_UTC_MS: { t: number; pct: number }[] = [
  { t: Date.UTC(2025, 3, 1), pct: 0 },
  { t: Date.UTC(2025, 8, 4), pct: 40 },
  { t: Date.UTC(2025, 10, 9), pct: 60 },
  { t: Date.UTC(2026, 1, 8), pct: 80 },
  { t: Date.UTC(2026, 2, 31), pct: 100 },
];

const IRD_EOT_MILESTONE_PCTS = [40, 60, 80, 100] as const;

/**
 * Nearest IRD EOT milestone % (40 / 60 / 80 / 100) to the interpolated schedule — one tick on the bar.
 */
export function nearestIrdEotMilestonePct(scheduleTargetPct: number): number {
  const s = Math.min(100, Math.max(0, scheduleTargetPct));
  return IRD_EOT_MILESTONE_PCTS.reduce<number>(
    (best, x) => {
      const db = Math.abs(best - s);
      const dx = Math.abs(x - s);
      if (dx < db) return x;
      if (dx === db) return Math.max(best, x);
      return best;
    },
    IRD_EOT_MILESTONE_PCTS[0]
  );
}

function interpolateEotCumulativePct(timeMs: number): number {
  const cps = EOT_CHECKPOINTS_UTC_MS;
  if (timeMs <= cps[0]!.t) return 0;
  const last = cps[cps.length - 1]!;
  if (timeMs >= last.t) return last.pct;
  for (let i = 0; i < cps.length - 1; i++) {
    const a = cps[i]!;
    const b = cps[i + 1]!;
    if (timeMs <= b.t) {
      const denom = b.t - a.t;
      const r = denom === 0 ? 0 : (timeMs - a.t) / denom;
      return a.pct + r * (b.pct - a.pct);
    }
  }
  return last.pct;
}

/**
 * NZ FY month index 0–11 (Apr–Mar), aligned with `WorkloadInsights` month charts.
 */
export function getNzFyMonthIndex(d: Date): number {
  const m = d.getMonth();
  if (m >= 3) return m - 3;
  return m + 9;
}

/**
 * FY month index (0–11, Apr–Mar) using **UTC** calendar parts — matches {@link LODGEMENTS_REFERENCE_DATE}.
 * On the **first** UTC day of a month, returns the **prior** FY month index so cumulative filed is
 * “through last month-end” (e.g. 1 Mar UTC → February, index 10), aligned with the Filed tax returns widget.
 */
export function getNzFyLastCompleteMonthIndex(d: Date): number {
  const m = d.getUTCMonth();
  const idx = m >= 3 ? m - 3 : m + 9;
  if (d.getUTCDate() <= 1) {
    return Math.max(0, idx - 1);
  }
  return idx;
}

/**
 * Month-line chart “as of” (~mid March FY26 UTC). Cumulative series truncate after this point
 * (no line into the rest of March / past FY).
 */
export const WORKLOAD_MONTH_LINE_AS_OF_DATE = new Date(
  Date.UTC(2026, 2, 16, 12, 0, 0)
);

/**
 * Actual cumulative on the month-line chart is scaled below the IRD guideline so progress looks
 * realistically slightly behind schedule (bars / other views still use unscaled mock counts).
 */
export const WORKLOAD_MONTH_LINE_ACTUAL_PACE_FACTOR = 0.94;

/**
 * NZ FY month bucket (0–11) containing `d`, and fraction 0–1 through that calendar month (UTC).
 */
export function getWorkloadMonthLineAsOfProgress(d: Date): {
  monthIndex: number;
  fractionInMonth: number;
} {
  const m = d.getUTCMonth();
  const fyIdx = m >= 3 ? m - 3 : m + 9;
  const y = d.getUTCFullYear();
  const monthStart = Date.UTC(y, m, 1, 0, 0, 0, 0);
  const nextMonthStart =
    m === 11 ? Date.UTC(y + 1, 0, 1, 0, 0, 0, 0) : Date.UTC(y, m + 1, 1, 0, 0, 0, 0);
  const span = nextMonthStart - monthStart;
  const frac =
    span <= 0 ? 0 : Math.min(1, Math.max(0, (d.getTime() - monthStart) / span));
  return { monthIndex: fyIdx, fractionInMonth: frac };
}

/** Month-line “This year”: values after the as-of month are `null` so the line stops; as-of month is partial. */
export function buildWorkloadMonthLineActualData(
  monthEndCumulative: readonly number[],
  monthlyFiled: readonly number[],
  asOfDate: Date,
  paceFactor: number = WORKLOAD_MONTH_LINE_ACTUAL_PACE_FACTOR
): (number | null)[] {
  const { monthIndex: M, fractionInMonth: f } =
    getWorkloadMonthLineAsOfProgress(asOfDate);
  const n = monthEndCumulative.length;
  const out: (number | null)[] = [];
  for (let i = 0; i < n; i++) {
    if (i < M) {
      out.push(Math.max(0, Math.round(monthEndCumulative[i]! * paceFactor)));
    } else if (i === M) {
      const prev = M > 0 ? monthEndCumulative[M - 1]! : 0;
      const mid = prev + f * (monthlyFiled[M] ?? 0);
      out.push(Math.max(0, Math.round(mid * paceFactor)));
    } else {
      out.push(null);
    }
  }
  return out;
}

/** Month-line IRD guideline: month-ends to as-of, then IRD % × pool at `asOfDate`; trailing months `null`. */
export function buildWorkloadMonthLineTargetData(
  monthEndCumulative: readonly number[],
  poolD: number,
  asOfDate: Date
): (number | null)[] {
  const { monthIndex: M } = getWorkloadMonthLineAsOfProgress(asOfDate);
  const n = monthEndCumulative.length;
  const pctAsOf = getEotScheduleTargetPercentForDate(asOfDate.getTime());
  const yAsOf = Math.round((poolD * pctAsOf) / 100);
  const out: (number | null)[] = [];
  for (let i = 0; i < n; i++) {
    if (i < M) {
      out.push(monthEndCumulative[i]!);
    } else if (i === M) {
      out.push(Math.max(0, yAsOf));
    } else {
      out.push(null);
    }
  }
  return out;
}

/**
 * Cumulative % of returns that should be filed by this instant (IR EOT schedule).
 */
export function getEotScheduleTargetPercentForDate(dateMs: number): number {
  return interpolateEotCumulativePct(dateMs);
}

export type LodgementStackedPct = {
  onTime: number;
  due: number;
  late: number;
};

export type LodgementMetrics = {
  scheduleTargetPct: number;
  /**
   * “On-time lodgements YTD” headline: **on-time lodged count / total pool** × 100 — matches the dark blue bar width.
   */
  onTimeYtdPct: number;
  /** Quality among lodged returns A/(A+B)×100 (100% when B=0). Tooltips / “among lodged” copy. */
  onTimeQualityYtdPct: number;
  /**
   * Cumulative % of pool lodged (on-time + late) — volume progress vs IRD EOT milestones (bar tick).
   */
  lodgementProgressYtdPct: number;
  eoyEstimatePct: number;
  stackedPct: LodgementStackedPct;
  /**
   * Counts for tooltips / bar — aligned with AU widget buckets (OM: “85% lodgment widget calculations”):
   * A = on-time bucket, B = filed late + overdue, C = due (not overdue). D = A+B+C = pool.
   */
  snapshot: {
    filedCum: number;
    dueCount: number;
    lateCount: number;
    totalExpected: number;
  };
};

/** Fixed “today” for the Lodgements widget — start of March FY26 (see `EOT_CHECKPOINTS_UTC_MS` above). */
export const LODGEMENTS_REFERENCE_DATE = new Date(Date.UTC(2026, 2, 1, 0, 0, 0));

/**
 * NZ income-tax returns aren’t “late” until after the FY lodgement period ends (31 March).
 * Prototype pool is FY26 — no late bucket before then.
 */
export const NZ_FY26_LODGEMENT_CUTOFF_UTC_MS = Date.UTC(
  2026,
  2,
  31,
  23,
  59,
  59,
  999
);

/**
 * AU EOY colour: programme floor when not on IRD/ATO schedule (aligned with NZ Meet Targets band).
 */
export const LODGEMENT_EOY_GREEN_MIN_PCT = 90;

/**
 * NZ IRD “Meet Targets”: if less than this % of required returns are filed, practice may receive
 * a letter of caution and monitoring — EOY headline uses this as the green threshold (not vs-schedule alone).
 */
export const NZ_IRD_MONITORING_MIN_PCT = 90;

/**
 * Filed tax returns / Lodgments widget: YTD green state and bar marker use this % target (not the IRD EOT schedule).
 */
export const LODGEMENT_FILED_WIDGET_TARGET_PCT = 85;

/** YTD headline green when on-time share of the pool meets {@link LODGEMENT_FILED_WIDGET_TARGET_PCT}. */
export function lodgementYtdMeetsWidgetTarget(onTimeYtdPct: number): boolean {
  return Math.round(onTimeYtdPct) >= LODGEMENT_FILED_WIDGET_TARGET_PCT;
}

/**
 * EOY green: AU uses programme floor or on/above schedule. NZ uses Meet Targets only — projected
 * % of required returns filed must be at least {@link NZ_IRD_MONITORING_MIN_PCT}.
 */
export function lodgementEoyMeetsExpectation(
  eoyEstimatePct: number,
  scheduleTargetPct: number,
  region?: Region
): boolean {
  const vsSchedule =
    Math.round(eoyEstimatePct) >= Math.round(scheduleTargetPct);
  if (region === "NZ") {
    return Math.round(eoyEstimatePct) >= NZ_IRD_MONITORING_MIN_PCT;
  }
  return (
    eoyEstimatePct >= LODGEMENT_EOY_GREEN_MIN_PCT || vsSchedule
  );
}

/**
 * Lodgements widget: firm-level, this year.
 *
 * **Headlines + NZ IRD:** Volume follows **IRD EOT** (`lodgedTotal ≈ D×schedule/100`) for mock splits. Bar marker and
 * YTD green/red use **{@link LODGEMENT_FILED_WIDGET_TARGET_PCT}** (not the EOT schedule %). **On-time YTD headline** = **A/D×100** (same as blue bar segment).
 * **Quality** (for tooltips) = A/(A+B)×100. **Lodgement progress** = (A+B)/D.
 *
 * **EOY** = (A+C)/D. **Bar** partitions D into On time / Due / Late.
 *
 * **NZ:** No late bucket until after 31 March FY26; **AU:** small late bucket when lodged.
 *
 * @param referenceDate — “Today” for EOT schedule and implied lodged volume.
 * @param region — NZ suppresses late until after the FY March cutoff.
 */
export function getLodgementMetrics(
  referenceDate: Date = new Date(),
  region?: Region
): LodgementMetrics {
  const filterRole: WorkloadFilterRole = "firm";
  const personId = "";
  const timePeriod: WorkloadTimePeriod = "thisYear";
  const expectedByType = getWorkloadExpectedReturnsByReturnType(
    filterRole,
    personId,
    timePeriod
  );
  const D = expectedByType.reduce((a, b) => a + b, 0);

  if (D <= 0) {
    return {
      scheduleTargetPct: 0,
      onTimeYtdPct: 0,
      onTimeQualityYtdPct: 0,
      lodgementProgressYtdPct: 0,
      eoyEstimatePct: 0,
      stackedPct: { onTime: 0, due: 0, late: 0 },
      snapshot: {
        filedCum: 0,
        dueCount: 0,
        lateCount: 0,
        totalExpected: 0,
      },
    };
  }

  const scheduleTargetPct = getEotScheduleTargetPercentForDate(
    referenceDate.getTime()
  );

  const s = scheduleTargetPct;
  /** Cumulative lodged (on-time + late) implied by EOT schedule to date. */
  const lodgedTotal = Math.max(0, Math.round((D * s) / 100));
  /** NZ: no late returns until after 31 March (prototype FY26). AU: small B so Late segment can show. */
  const allowLateBucket =
    region !== "NZ" ||
    referenceDate.getTime() > NZ_FY26_LODGEMENT_CUTOFF_UTC_MS;
  const B =
    !allowLateBucket || lodgedTotal <= 0
      ? 0
      : Math.min(lodgedTotal, Math.max(0, Math.round(D * 0.012)));
  const A = lodgedTotal - B;
  const C = Math.max(0, D - A - B);

  const lodgementProgressYtdPct = Math.round(((A + B) / D) * 100);
  /** Headline — matches blue bar: on-time share of full-year pool. */
  const onTimeYtdPct = Math.round((A / D) * 100);
  /** Among lodged only — tooltips. */
  const onTimeQualityYtdPct =
    A + B <= 0 ? 0 : B === 0 ? 100 : Math.round((A / (A + B)) * 100);
  const eoyEstimatePct = Math.round(((A + C) / D) * 100);

  const stackedPct: LodgementStackedPct = {
    onTime: (A / D) * 100,
    due: (C / D) * 100,
    late: (B / D) * 100,
  };

  return {
    scheduleTargetPct,
    onTimeYtdPct,
    onTimeQualityYtdPct,
    lodgementProgressYtdPct,
    eoyEstimatePct,
    stackedPct,
    snapshot: {
      filedCum: A,
      dueCount: C,
      lateCount: B,
      totalExpected: D,
    },
  };
}

/** FY month ends Apr–Mar (UTC noon on last calendar day of each month). */
function fyMonthEndUtcMs(): number[] {
  const y = 2025;
  return [
    Date.UTC(y, 3, 30, 12, 0, 0),
    Date.UTC(y, 4, 31, 12, 0, 0),
    Date.UTC(y, 5, 30, 12, 0, 0),
    Date.UTC(y, 6, 31, 12, 0, 0),
    Date.UTC(y, 7, 31, 12, 0, 0),
    Date.UTC(y, 8, 30, 12, 0, 0),
    Date.UTC(y, 9, 31, 12, 0, 0),
    Date.UTC(y, 10, 30, 12, 0, 0),
    Date.UTC(y, 11, 31, 12, 0, 0),
    Date.UTC(y + 1, 0, 31, 12, 0, 0),
    Date.UTC(y + 1, 1, 28, 12, 0, 0),
    Date.UTC(y + 1, 2, 31, 12, 0, 0),
  ];
}

function eotCumulativePercentAtMonthEnd(): number[] {
  return fyMonthEndUtcMs().map((t) => interpolateEotCumulativePct(t));
}

/** Cumulative return counts at each FY month-end: `pool × IRD EOT %`, monotonic; March = 100% of pool. */
function eotCumulativeTargetCountsForPool(pool: number): number[] {
  const pct = eotCumulativePercentAtMonthEnd();
  const out: number[] = [];
  let prev = 0;
  for (let i = 0; i < 12; i++) {
    let c = Math.round((pool * (pct[i] ?? 0)) / 100);
    if (c < prev) c = prev;
    out.push(c);
    prev = c;
  }
  out[11] = pool;
  for (let i = 10; i >= 0; i--) {
    if ((out[i] ?? 0) > (out[i + 1] ?? 0)) {
      out[i] = out[i + 1];
    }
  }
  return out;
}

/**
 * Legend / series label for the cumulative target line (Returns by month). i2: “Interim target”; XPAC: “IRD interim target”
 * in the UI; values still follow IRD EOT milestones (40% / 60% / 80% / 100% by prototype checkpoints),
 * scaled to the **expected return pool** (same total as {@link getLodgementMetrics}
 * `snapshot.totalExpected`) — see {@link getWorkloadEotTargetMonthlyTotals}.
 */
export const WORKLOAD_EOT_TARGET_LINE_LABEL = "Interim target";

export function workloadEotTargetLineLabel(
  _stage: PipelineStageId
): string {
  return "IRD interim target";
}

/**
 * Legend / chart: grey backdrop on the “Returns by return type” view — expected
 * returns per type (see {@link getWorkloadExpectedReturnsByReturnType}).
 */
export const WORKLOAD_EXPECTED_RETURNS_LABEL = "Expected";

/**
 * Expected return counts per return type: active clients with a signed tax
 * authority and a return type assigned.
 *
 * Prototype: derived from filed counts so the chart stays consistent with the
 * selection; product would query client records.
 */
export function getWorkloadExpectedReturnsByReturnType(
  filterRole: WorkloadFilterRole,
  personId: string,
  timePeriod: WorkloadTimePeriod
): number[] {
  const core = buildWorkloadProfileCore(filterRole, personId, timePeriod);
  return expectedReturnsFromFiledByType(core.workloadByReturnType.filed);
}

/**
 * Monthly **target** increments for the IRD EOT guideline: cumulative at each month-end is
 * **pool × IRD EOT %** (40% / 60% / 80% / 100% milestones interpolated in time), with March = 100%
 * of the expected return pool — same total as {@link getLodgementMetrics} `snapshot.totalExpected`.
 */
export function getWorkloadEotTargetMonthlyTotals(
  filterRole: WorkloadFilterRole,
  personId: string,
  timePeriod: WorkloadTimePeriod
): number[] {
  const expectedByType = getWorkloadExpectedReturnsByReturnType(
    filterRole,
    personId,
    timePeriod
  );
  const pool = expectedByType.reduce((a, b) => a + b, 0);
  if (pool <= 0) {
    return new Array(12).fill(0);
  }
  const cum = eotCumulativeTargetCountsForPool(pool);
  const monthly: number[] = [];
  let prev = 0;
  for (let i = 0; i < 12; i++) {
    monthly.push(cum[i]! - prev);
    prev = cum[i]!;
  }
  return monthly;
}

/**
 * Monthly **filed** counts: same cumulative **through {@link LODGEMENTS_REFERENCE_DATE}** as the
 * Filed tax returns widget (firm NZ pace applied to this selection’s pool), then the remaining
 * months complete the FY toward the pool total (this year) or ~92% (last year).
 */
function getLodgementAlignedMonthlyFiled(
  core: WorkloadProfile,
  timePeriod: WorkloadTimePeriod
): number[] {
  const expectedByType = expectedReturnsFromFiledByType(
    core.workloadByReturnType.filed
  );
  const D = expectedByType.reduce((a, b) => a + b, 0);
  if (D <= 0) return new Array(12).fill(0);

  const cumPct = eotCumulativePercentAtMonthEnd();
  const k = getNzFyLastCompleteMonthIndex(LODGEMENTS_REFERENCE_DATE);

  const eoyTotal =
    timePeriod === "thisYear" ? D : Math.max(0, Math.round(D * 0.92));

  let cumulativeAtK: number;
  if (timePeriod === "thisYear") {
    const firmM = getLodgementMetrics(LODGEMENTS_REFERENCE_DATE, REGIONS.NZ);
    const dFirm = firmM.snapshot.totalExpected;
    const lodgedFirm =
      dFirm > 0 ? firmM.snapshot.filedCum + firmM.snapshot.lateCount : 0;
    const pace = dFirm > 0 ? lodgedFirm / dFirm : 0;
    cumulativeAtK = Math.min(D, Math.max(0, Math.round(D * pace)));
  } else {
    cumulativeAtK = Math.min(
      D,
      Math.max(0, Math.round((D * (cumPct[k] ?? 0)) / 100 * 0.87))
    );
  }

  cumulativeAtK = Math.min(cumulativeAtK, eoyTotal);

  const weights: number[] = [];
  let prevPct = 0;
  for (let i = 0; i <= k; i++) {
    weights.push(Math.max(0, (cumPct[i] ?? 0) - prevPct));
    prevPct = cumPct[i] ?? 0;
  }
  const sumW = weights.reduce((a, b) => a + b, 0);
  const prefix =
    sumW > 0 && cumulativeAtK > 0
      ? allocateProportional(weights, cumulativeAtK)
      : weights.map(() => 0);

  const monthly = new Array(12).fill(0);
  for (let i = 0; i <= k; i++) {
    monthly[i] = prefix[i] ?? 0;
  }

  const tailWeights: number[] = [];
  let p = cumPct[k] ?? 0;
  for (let i = k + 1; i < 12; i++) {
    tailWeights.push(Math.max(0, (cumPct[i] ?? 0) - p));
    p = cumPct[i] ?? 0;
  }
  const sumThroughK = monthly.slice(0, k + 1).reduce((a, b) => a + b, 0);
  let remainder = Math.max(0, eoyTotal - sumThroughK);
  const twSum = tailWeights.reduce((a, b) => a + b, 0);
  if (twSum > 0 && remainder > 0) {
    const tailAllocated = allocateProportional(tailWeights, remainder);
    for (let j = 0; j < tailAllocated.length; j++) {
      monthly[k + 1 + j] = tailAllocated[j] ?? 0;
    }
  } else if (remainder > 0) {
    monthly[11] = remainder;
  }

  const diff = eoyTotal - monthly.reduce((a, b) => a + b, 0);
  if (diff !== 0) {
    monthly[11] += diff;
  }

  return monthly;
}

/**
 * Workload data for the selected filter: `workloadByMonth.filed` is aligned to the Filed tax
 * returns widget; return-type filed counts stay aligned to the Annual tax returns widget.
 */
export function getWorkloadDataForSelection(
  filterRole: WorkloadFilterRole,
  personId: string,
  timePeriod: WorkloadTimePeriod = "thisYear"
): WorkloadProfile {
  const core = buildWorkloadProfileCore(filterRole, personId, timePeriod);
  const filed = getLodgementAlignedMonthlyFiled(core, timePeriod);
  return {
    ...core,
    workloadByMonth: {
      ...core.workloadByMonth,
      filed,
    },
  };
}
