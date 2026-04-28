import type { Metadata } from "next";
import { getExplorationsForDisplay } from "@/data/explorations";
import type { ColumnDef } from "./TableHeader";
import { ExplorationsTable } from "./ExplorationsTable";

export const metadata: Metadata = {
  title: "Explorations",
};

const COLUMNS: ColumnDef[] = [
  { key: "lane", label: "Lane", tooltip: "", widthClass: "w-20 min-w-[4rem]", align: "left" },
  { key: "concept", label: "Concept", tooltip: "", widthClass: "w-40 min-w-[8rem]", align: "left" },
  { key: "total", label: "Total", tooltip: "Recommendation score (1–100). Why we recommend this concept.", widthClass: "w-14 min-w-[2.5rem]", align: "center" },
  { key: "des", label: "Des", tooltip: "Desirability (1–100). How much users want this.", widthClass: "w-14 min-w-[2.5rem]", align: "center" },
  { key: "ag", label: "AI", tooltip: "Agentic potential — Is this better as an agent or not?", widthClass: "w-14 min-w-[2.5rem]", align: "center" },
  { key: "feas", label: "Feas", tooltip: "Feasibility (1–100). How buildable this is.", widthClass: "w-14 min-w-[2.5rem]", align: "center" },
  { key: "pitch", label: "Pitch", tooltip: "Why this is the best combo and why we should do it.", widthClass: "w-52 min-w-[10rem]", align: "left" },
  { key: "explainer", label: "Synthetic quotes", tooltip: "Quote(s) from synthetic user personas (Bill Creator, Cautious Approver, AP Clerk) when evaluating this concept.", widthClass: "w-52 min-w-[10rem]", align: "left" },
  { key: "redTeam", label: "Detractor POV", tooltip: "Strongest argument for why this idea sucks (detractor perspective).", widthClass: "w-52 min-w-[10rem]", align: "left" },
];

export default async function ExplorationsPage() {
  const displayList = getExplorationsForDisplay("");

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50">
      <header className="shrink-0 border-b border-slate-200 bg-white px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-lg font-semibold text-slate-900">
            Concept Explorer
          </h1>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              Swim lane {i}
            </span>
          ))}
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-auto px-8 py-6">
        <p className="mb-3 text-base text-slate-600">
          Click Lane, Concept, Total, Des, AI, or Feas to sort. Hover headers for definitions.
        </p>
        <div className="inline-block min-w-full rounded border border-slate-300 bg-white shadow">
          <ExplorationsTable displayList={displayList} columns={COLUMNS} />
        </div>
      </main>
    </div>
  );
}
