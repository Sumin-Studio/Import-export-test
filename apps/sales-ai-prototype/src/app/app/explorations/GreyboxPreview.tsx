import React from "react";
import { getVisualTypeForConcept } from "@/data/explorations/concept-visual-types";
import type { ExplorationConcept } from "@/data/explorations/schema";
import { ConceptScreenByType } from "./concept-screens/ConceptScreens";

/**
 * Renders a screenshot-style visual for this concept. Each concept is mapped to a
 * visual type (runway chart, approval queue, intent capture, etc.) and the
 * matching component draws what that feature would actually look like.
 */
export function GreyboxPreview({ concept }: { concept: ExplorationConcept }) {
  const type = getVisualTypeForConcept(concept.conceptTitle);
  return (
    <div className="h-[640px] min-w-[720px] flex-shrink-0 rounded-lg overflow-hidden shadow-xl border border-slate-200 bg-white">
      <ConceptScreenByType type={type} concept={concept} />
    </div>
  );
}
