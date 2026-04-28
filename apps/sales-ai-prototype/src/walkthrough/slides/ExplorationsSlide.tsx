import { getExplorationsForDisplay } from "@/data/explorations";
import type { ColumnDef } from "@/app/app/explorations/TableHeader";
import { ExplorationsTable } from "@/app/app/explorations/ExplorationsTable";
import SlideLayout from "@/walkthrough/components/SlideLayout";

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

export default function ExplorationsSlide() {
  const displayList = getExplorationsForDisplay("");

  return (
    <SlideLayout slideNumber={5}>
      <div className="flex-1 flex flex-col justify-start w-full px-8 py-16">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Concept Explorations</h2>
          <p className="text-lg text-gray-500 max-w-3xl">
            From three swimlanes to a ranked set of candidate concepts.
          </p>
        </div>

        <div className="mb-3 text-base text-slate-600">
          Click Lane, Concept, Total, Des, AI, or Feas to sort. Hover headers for definitions. Detractor POV = strongest argument for why this idea sucks.
        </div>

        <div className="w-full overflow-x-auto rounded border border-slate-300 bg-white shadow">
          <ExplorationsTable displayList={displayList} columns={COLUMNS} />
        </div>
      </div>
    </SlideLayout>
  );
}
