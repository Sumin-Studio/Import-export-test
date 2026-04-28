import React from "react";
import { SWIM_LANE_LABELS } from "@/data/explorations/schema";
import type { ExplorationConcept } from "@/data/explorations/schema";

const PERSONA_ORDER = ["Bill Creator", "Cautious Approver", "AP Clerk"] as const;

export function ConceptConfidenceContent({ concept }: { concept: ExplorationConcept }) {
  const quotesByPersona = React.useMemo(() => {
    const map = new Map<string, { quote: string; sentiment: string }[]>();
    for (const p of PERSONA_ORDER) map.set(p, []);
    concept.syntheticUserQuotes.forEach((q) => {
      const list = map.get(q.persona);
      if (list) list.push({ quote: q.quote, sentiment: q.sentiment ?? "neutral" });
    });
    return map;
  }, [concept.syntheticUserQuotes]);

  return (
    <div className="space-y-10 text-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black tracking-tight">
            Why this is a great concept
          </h2>
          <p className="text-slate-800 leading-relaxed">{concept.pitch}</p>
          <p className="text-slate-700 leading-relaxed text-base">{concept.problemStatement}</p>
          <p className="text-slate-600 text-base">
            <span className="font-semibold text-slate-800">Target user:</span> {concept.targetUser}
            {" · "}
            <span className="font-semibold text-slate-800">Lane:</span> {SWIM_LANE_LABELS[concept.swimLane]}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-black tracking-tight">
            How confident the AI model is
          </h2>
          <p className="text-slate-800 leading-relaxed">
            {concept.confidenceLevel} ({concept.confidenceScore}/100) — high ≥76, medium 51–75, low ≤50.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 text-base">
            <li><strong>Recommendation (total):</strong> {concept.recommendationRank}</li>
            <li><strong>Desirability:</strong> {concept.desirability}</li>
            <li><strong>Agentic potential:</strong> {concept.agenticPotential}</li>
            <li><strong>Feasibility:</strong> {concept.feasibility}</li>
          </ul>
          {concept.assumptions.length > 0 && (
            <div className="pt-2">
              <p className="font-semibold text-slate-800 mb-1">Assumptions</p>
              <ul className="list-disc pl-6 space-y-0.5 text-slate-700 text-base">
                {concept.assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-black tracking-tight">
          User voice
        </h2>
        <p className="text-slate-600 text-base">
          Synthetic feedback from all three personas: Bill Creator, Cautious Approver, AP Clerk.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONA_ORDER.map((persona) => {
            const quotes = quotesByPersona.get(persona) ?? [];
            return (
              <div key={persona} className="rounded-lg border border-slate-200 bg-slate-50/60 p-5 space-y-2">
                <h3 className="font-bold text-black text-base">{persona}</h3>
                {quotes.length > 0 ? (
                  quotes.map(({ quote, sentiment }, i) => (
                    <p
                      key={i}
                      className={`text-base leading-relaxed ${
                        sentiment === "positive"
                          ? "text-green-800"
                          : sentiment === "negative"
                            ? "text-red-800"
                            : "text-slate-700"
                      }`}
                    >
                      &ldquo;{quote}&rdquo;
                    </p>
                  ))
                ) : (
                  <p className="text-slate-500 text-base">—</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
