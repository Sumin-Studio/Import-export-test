import type { IssueSeverity } from '../types/domain';

/** User-facing labels — internal severity keys stay stable for logic. */
export function issueReviewTypeLabel(severity: IssueSeverity): string {
  switch (severity) {
    case 'critical':
      return 'Needs your review';
    case 'recommended':
      return 'Worth confirming';
    case 'optional':
      return 'Optional';
    default:
      return severity;
  }
}

/** Prefer warning over critical for badge styling — still clear, less alarming. */
export function badgeToneForIssueSeverity(severity: IssueSeverity): 'warning' | 'neutral' | 'info' {
  switch (severity) {
    case 'critical':
      return 'warning';
    case 'recommended':
      return 'info';
    default:
      return 'neutral';
  }
}
