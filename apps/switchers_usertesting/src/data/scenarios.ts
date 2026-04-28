import type { ReviewScenario } from '../types/domain';

export const REVIEW_SCENARIOS: ReviewScenario[] = [
  'smooth',
  'few-review',
  'many-review',
  'review-expert',
];

/** Support older bookmarked URLs during internal testing. */
export const SCENARIO_QUERY_ALIASES: Record<string, ReviewScenario> = {
  happy: 'smooth',
  'low-confidence': 'few-review',
  corrections: 'many-review',
  'missing-data': 'few-review',
  'expert-fallback': 'review-expert',
  'expert-review': 'review-expert',
};

export function parseScenarioQueryParam(raw: string | null): ReviewScenario | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if ((REVIEW_SCENARIOS as string[]).includes(trimmed)) return trimmed as ReviewScenario;
  const alias = SCENARIO_QUERY_ALIASES[trimmed.toLowerCase()];
  return alias ?? null;
}

export const SCENARIO_LABELS: Record<ReviewScenario, string> = {
  smooth: 'Scenario 1: Smooth switch',
  'few-review': 'Scenario 2: A few items to review',
  'many-review': 'Scenario 3: Many items to review',
  'review-expert': 'Scenario 4: Review + expert support consideration',
};
