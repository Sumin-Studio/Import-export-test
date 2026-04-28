"use client";

import React, { useEffect } from "react";
import type { ExplorationConcept } from "@/data/explorations/schema";
import { ConceptConfidenceContent } from "./ConceptConfidenceContent";

const BACKDROP = "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4";
const PANEL = "bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col";
const HEADER = "shrink-0 border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between";
const BODY = "flex-1 overflow-y-auto px-4 py-4";

export function ConfidenceModal({
  concept,
  onClose,
}: {
  concept: ExplorationConcept;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className={BACKDROP} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="confidence-modal-title">
      <div className={PANEL} onClick={(e) => e.stopPropagation()}>
        <header className={HEADER}>
          <h2 id="confidence-modal-title" className="text-base font-semibold text-slate-900">
            Confidence: {concept.confidenceScore} — {concept.conceptTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className={BODY}>
          <ConceptConfidenceContent concept={concept} />
        </div>
      </div>
    </div>
  );
}
