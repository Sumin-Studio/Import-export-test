import type { ExplorationConcept } from "@/data/explorations/schema";

export interface BoardExportItem {
  id: string;
  title: string;
  description: string;
  swimLane: string;
  tags: string[];
  metadata: Record<string, string | number>;
}

export interface BoardExportEnvelope {
  formatVersion: string;
  generatedAt: string;
  source: "payments-agents-team/explorations";
  itemCount: number;
  items: BoardExportItem[];
}

export function toBoardExportItems(concepts: ExplorationConcept[]): BoardExportItem[] {
  return concepts.map((concept) => ({
    id: concept.id,
    title: concept.exportPayload.cardTitle,
    description: concept.exportPayload.cardDescription,
    swimLane: concept.swimLane,
    tags: concept.exportPayload.tags,
    metadata: {
      ...concept.exportPayload.metadata,
      recommendationRank: concept.recommendationRank,
      confidenceLevel: concept.confidenceLevel,
      status: concept.status,
      greyboxAssetPath: concept.greybox.preview1000.assetPath,
    },
  }));
}

// This intentionally has no API call yet. It creates a portable payload for
// future FigJam/Miro insertion implementations.
export function buildBoardExportEnvelope(
  concepts: ExplorationConcept[]
): BoardExportEnvelope {
  return {
    formatVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    source: "payments-agents-team/explorations",
    itemCount: concepts.length,
    items: toBoardExportItems(concepts),
  };
}
