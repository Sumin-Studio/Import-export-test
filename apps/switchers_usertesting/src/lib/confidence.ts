import type { FlaggedIssue, IssueSeverity } from '../types/domain';

/** Visual confidence for imported data (maps from issue severity when present). */
export type ImportConfidence = 'high' | 'moderate' | 'low';

const SEV_ORDER: Record<IssueSeverity, number> = {
  critical: 0,
  recommended: 1,
  optional: 2,
};

export function worstSeverity(
  issues: FlaggedIssue[],
  resolved: Record<string, boolean>,
): IssueSeverity | null {
  let worst: IssueSeverity | null = null;
  for (const i of issues) {
    if (resolved[i.id]) continue;
    if (!worst || SEV_ORDER[i.severity] < SEV_ORDER[worst]) worst = i.severity;
  }
  return worst;
}

export function confidenceFromSeverity(severity: IssueSeverity | null): ImportConfidence {
  if (severity === null) return 'high';
  if (severity === 'critical') return 'low';
  if (severity === 'recommended') return 'moderate';
  return 'high';
}

export function confidenceLabel(c: ImportConfidence): string {
  switch (c) {
    case 'high':
      return 'Looks consistent';
    case 'moderate':
      return 'Quick review';
    case 'low':
      return 'Needs review';
    default:
      return c;
  }
}

export function confidenceBadgeTone(
  c: ImportConfidence,
): 'success' | 'warning' | 'critical' {
  switch (c) {
    case 'high':
      return 'success';
    case 'moderate':
      return 'warning';
    case 'low':
      return 'critical';
    default:
      return 'success';
  }
}

export function worstSeverityFromIds(
  issueIds: string[],
  allIssues: FlaggedIssue[],
  resolved: Record<string, boolean>,
): IssueSeverity | null {
  const set = new Set(issueIds);
  const relevant = allIssues.filter((i) => set.has(i.id));
  return worstSeverity(relevant, resolved);
}

export function issueConfidenceBadgeTone(
  severity: IssueSeverity,
): 'success' | 'warning' | 'critical' {
  return confidenceBadgeTone(confidenceFromSeverity(severity));
}
