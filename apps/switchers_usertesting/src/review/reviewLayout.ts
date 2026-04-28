import type { ReviewBundle, ReviewScenario } from '../types/domain';

export type ReviewLayoutMode = 'summaryFirst' | 'attention' | 'deepReview';

export interface ReviewLayoutState {
  mode: ReviewLayoutMode;
  openIssueCount: number;
  criticalOpen: number;
  recommendedOpen: number;
  optionalOpen: number;
  showSectionNav: boolean;
  importSectionsStartCollapsed: boolean;
  compactKpis: boolean;
  slimRail: boolean;
}

function countOpen(
  bundle: ReviewBundle,
  resolved: Record<string, boolean>,
) {
  const open = bundle.issues.filter((i) => !resolved[i.id]);
  return {
    open,
    criticalOpen: open.filter((i) => i.severity === 'critical').length,
    recommendedOpen: open.filter((i) => i.severity === 'recommended').length,
    optionalOpen: open.filter((i) => i.severity === 'optional').length,
  };
}

export function getReviewLayoutState(
  scenario: ReviewScenario,
  bundle: ReviewBundle,
  resolved: Record<string, boolean>,
): ReviewLayoutState {
  const { open, criticalOpen, recommendedOpen, optionalOpen } = countOpen(
    bundle,
    resolved,
  );
  const n = open.length;

  const onlyOptional =
    n > 0 &&
    optionalOpen === n &&
    criticalOpen === 0 &&
    recommendedOpen === 0;

  let mode: ReviewLayoutMode;
  if (n === 0 || onlyOptional) {
    mode = 'summaryFirst';
  } else if (scenario === 'many-review' || n >= 5) {
    mode = 'deepReview';
  } else {
    mode = 'attention';
  }

  return {
    mode,
    openIssueCount: n,
    criticalOpen,
    recommendedOpen,
    optionalOpen,
    showSectionNav: true,
    importSectionsStartCollapsed: mode !== 'deepReview',
    compactKpis: mode === 'summaryFirst',
    slimRail: mode === 'summaryFirst' && criticalOpen === 0 && scenario !== 'review-expert',
  };
}

/** Lead for the Review step — only flagged / attention items. */
export function attentionReviewLeadCopy(
  openIssueCount: number,
  criticalOpen: number,
): string {
  if (openIssueCount === 0) {
    return 'Nothing needs attention here. Continue to confirm to walk through every imported detail before you finish.';
  }
  if (criticalOpen > 0) {
    return 'Resolve mappings tagged Needs review below before continuing. You will review the full transfer on the next step.';
  }
  return 'Approve or edit each suggestion below. Items tagged Quick review can wait until you are comfortable. The next step is a full summary of everything we imported.';
}

/** Lead for the Confirm step — full imported detail review. */
export function confirmImportLeadCopy(): string {
  return 'This is your full transfer summary — every area we brought over from QuickBooks. Confirm each section matches how you run payroll, then finish when you are ready.';
}

export function reviewLeadCopy(layout: ReviewLayoutState): string {
  if (layout.mode === 'summaryFirst') {
    if (layout.openIssueCount === 0) {
      return 'Everything below reflects what we imported. Green tags mean Looks consistent — edit anything that still needs to match how you work.';
    }
    if (layout.optionalOpen > 0 && layout.criticalOpen === 0 && layout.recommendedOpen === 0) {
      return 'Amber tags mean Quick review on those rows or sections; optional checks can wait if you prefer.';
    }
    return 'Tags show how the transfer lines up for each area. Start with Needs review or Quick review, then continue when you are ready.';
  }
  if (layout.mode === 'attention') {
    return 'Red and amber highlights point to where we suggest a quick confirmation or edit. Green means Looks consistent for that row or section.';
  }
  return 'Use the section nav or Next to confirm to move through items tagged Needs review. Everything imported is visible in one place.';
}
