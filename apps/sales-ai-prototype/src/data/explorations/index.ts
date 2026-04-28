import rawExplorationSeeds from "./explorations.json";
import {
  normalizeConcept,
  SWIM_LANES,
  type ExplorationConcept,
  type SwimLane,
  validateSeedDataset,
} from "./schema";

const seedDataset = validateSeedDataset(rawExplorationSeeds);

export const explorations: ExplorationConcept[] = seedDataset.lanes.flatMap(
  (lane, laneIndex) =>
    lane.concepts.map((seed, conceptIndex) =>
      normalizeConcept(lane.name, seed, laneIndex, conceptIndex)
    )
);

export const explorationsBySwimLane: Record<SwimLane, ExplorationConcept[]> = SWIM_LANES.reduce(
  (acc, lane) => {
    acc[lane] = explorations
      .filter((concept) => concept.swimLane === lane)
      .sort((a, b) => b.recommendationRank - a.recommendationRank);
    return acc;
  },
  {} as Record<SwimLane, ExplorationConcept[]>
);

export interface ExplorationStats {
  total: number;
  laneCounts: Record<SwimLane, number>;
}

export function getExplorationStats(): ExplorationStats {
  const laneCounts = SWIM_LANES.reduce(
    (acc, lane) => {
      acc[lane] = explorationsBySwimLane[lane].length;
      return acc;
    },
    {} as Record<SwimLane, number>
  );

  return {
    total: explorations.length,
    laneCounts,
  };
}

export function queryExplorations(query: string): ExplorationConcept[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return explorations;
  }

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  return explorations
    .filter((concept) =>
      queryTokens.every(
        (token) =>
          concept.searchText.includes(token) ||
          concept.searchTokens.some((searchToken) => searchToken.includes(token))
      )
    )
    .sort((a, b) => b.recommendationRank - a.recommendationRank);
}

export interface ExplorationForDisplay {
  concept: ExplorationConcept;
  isMatch: boolean;
}

export function getConceptById(id: string): ExplorationConcept | null {
  return explorations.find((c) => c.id === id) ?? null;
}

/** Prev/next concept ids in the same order as the explorations table (display order, empty query). */
export function getPrevNextIds(
  currentId: string,
  query: string = ""
): { prevId: string | null; nextId: string | null } {
  const list = getExplorationsForDisplay(query);
  const index = list.findIndex(({ concept }) => concept.id === currentId);
  if (index < 0) return { prevId: null, nextId: null };
  return {
    prevId: index > 0 ? list[index - 1].concept.id : null,
    nextId: index >= 0 && index < list.length - 1 ? list[index + 1].concept.id : null,
  };
}

/** Returns all concepts in display order: matches first (by recommendationRank), then non-matches. Used for "light up" grid. */
export function getExplorationsForDisplay(query: string): ExplorationForDisplay[] {
  const matched = queryExplorations(query);
  const matchedIds = new Set(matched.map((c) => c.id));

  const matchedForDisplay: ExplorationForDisplay[] = matched.map((concept) => ({
    concept,
    isMatch: true,
  }));

  const nonMatched = explorations
    .filter((c) => !matchedIds.has(c.id))
    .sort((a, b) => b.recommendationRank - a.recommendationRank);

  const nonMatchedForDisplay: ExplorationForDisplay[] = nonMatched.map((concept) => ({
    concept,
    isMatch: false,
  }));

  return [...matchedForDisplay, ...nonMatchedForDisplay];
}
