import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConceptById, getPrevNextIds } from "@/data/explorations";
import { ConceptConfidenceContent } from "../ConceptConfidenceContent";
import { ConceptDetailNav } from "./ConceptDetailNav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const concept = getConceptById(id);
  return {
    title: concept ? concept.conceptTitle : "Exploration",
  };
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concept = getConceptById(id);
  if (!concept) notFound();
  const { prevId, nextId } = getPrevNextIds(id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ConceptDetailNav prevId={prevId} nextId={nextId} />
      <header className="shrink-0 border-b border-slate-200 bg-white px-8 py-5">
        <h1 className="text-2xl font-semibold text-slate-900">
          {concept.conceptTitle}
        </h1>
      </header>

      <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8">
        <div className="max-w-5xl mx-auto rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <ConceptConfidenceContent concept={concept} />
        </div>
      </main>
    </div>
  );
}
