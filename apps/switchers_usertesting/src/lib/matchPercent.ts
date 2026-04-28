import type { FlaggedIssue } from '../types/domain';

/** Display-only % match for inline review (prototype). */
export function matchPercentForIssue(issue: FlaggedIssue): number {
  const base =
    issue.severity === 'critical' ? 66 : issue.severity === 'recommended' ? 73 : 86;
  const jitter =
    issue.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 9;
  return Math.min(94, Math.max(58, base + jitter - 4));
}

/** First line like "Xmas Bonus (QBO)" for inline list titles. */
export function qbSourceTitle(issue: FlaggedIssue): string {
  const raw = (issue.rowRef ?? issue.sourceValue.split('\n')[0] ?? issue.title).trim();
  if (/\([Qq][Bb][Oo]\)/.test(raw)) return raw;
  const cleaned = raw.replace(/\s*\(QBO\)\s*$/i, '').trim();
  return `${cleaned} (QBO)`;
}
