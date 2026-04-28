"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { SWIM_LANE_LABELS, SWIM_LANES } from "@/data/explorations/schema";
import type { ExplorationConcept, SwimLane } from "@/data/explorations/schema";
import type { ColumnDef } from "./TableHeader";

const SORTABLE_KEYS = ["lane", "concept", "total", "des", "ag", "feas"] as const;
type SortKey = (typeof SORTABLE_KEYS)[number];

function isSortKey(key: string): key is SortKey {
  return SORTABLE_KEYS.includes(key as SortKey);
}

/** 10-band scale: 1–7 nearly white → faint pink; 8–10 build to solid red. */
function scoreShadeClass(score: number): string {
  const band = Math.min(10, Math.max(1, Math.ceil(score / 10)));
  const shades: Record<number, string> = {
    1: "bg-[#fffafa] text-slate-600",
    2: "bg-[#fff5f5] text-slate-600",
    3: "bg-[#fff5f5] text-slate-600",
    4: "bg-[#ffebee] text-slate-600",
    5: "bg-[#ffebee] text-slate-700",
    6: "bg-[#ffebee] text-slate-700",
    7: "bg-[#ffebee] text-slate-700",
    8: "bg-[#ffcdd2] text-slate-800",
    9: "bg-[#ef9a9a] text-slate-900",
    10: "bg-[#e53935] text-white",
  };
  return shades[band] ?? "bg-white text-slate-600";
}

const CELL_BORDER = "border-b border-r border-slate-200 last:border-r-0";
const WRAP = "break-words whitespace-normal align-top";

function laneOrder(lane: SwimLane): number {
  const i = SWIM_LANES.indexOf(lane);
  return i >= 0 ? i : 999;
}

function compare(
  a: ExplorationConcept,
  b: ExplorationConcept,
  key: SortKey,
  dir: "asc" | "desc"
): number {
  const mult = dir === "asc" ? 1 : -1;
  switch (key) {
    case "lane":
      return mult * (laneOrder(a.swimLane) - laneOrder(b.swimLane));
    case "concept":
      return mult * (a.conceptTitle.localeCompare(b.conceptTitle));
    case "total":
      return mult * ((a.recommendationRank ?? 0) - (b.recommendationRank ?? 0));
    case "des":
      return mult * ((a.desirability ?? 0) - (b.desirability ?? 0));
    case "ag":
      return mult * ((a.agenticPotential ?? 0) - (b.agenticPotential ?? 0));
    case "feas":
      return mult * ((a.feasibility ?? 0) - (b.feasibility ?? 0));
    default:
      return 0;
  }
}

export interface DisplayItem {
  concept: ExplorationConcept;
  isMatch: boolean;
}

export function ExplorationsTable({
  displayList,
  columns,
}: {
  displayList: DisplayItem[];
  columns: ColumnDef[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedList = useMemo(() => {
    if (!isSortKey(sortKey)) return displayList;
    return [...displayList].sort((a, b) =>
      compare(a.concept, b.concept, sortKey, sortDir)
    );
  }, [displayList, sortKey, sortDir]);


  const handleSort = (key: string) => {
    if (!isSortKey(key)) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleMouseEnter = (key: string, e: React.MouseEvent<HTMLTableCellElement>) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    const col = columns.find((c) => c.key === key);
    if (col?.tooltip?.trim() || isSortKey(key)) {
      setHoveredKey(key);
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({ top: rect.bottom + 6, left: rect.left });
    }
  };
  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => setHoveredKey(null), 150);
  };

  const hoveredCol = hoveredKey ? columns.find((c) => c.key === hoveredKey) : null;
  const tooltipText =
    hoveredCol?.tooltip?.trim() ||
    (hoveredKey && isSortKey(hoveredKey) ? `Sort by ${hoveredCol?.label ?? hoveredKey}` : null);
  const showTooltip = mounted && !!hoveredKey && !!tooltipText;

  return (
    <>
      <table className="w-full border-collapse table-auto">
        <thead className="sticky top-0 z-10 bg-[#334155] text-white shadow">
          <tr>
            {columns.map((col) => {
              const sortable = isSortKey(col.key);
              const active = sortKey === col.key;
              const isDetractorPOV = col.key === "redTeam";
              return (
                <th
                  key={col.key}
                  onClick={() => sortable && handleSort(col.key)}
                  onMouseEnter={(e) => handleMouseEnter(col.key, e)}
                  onMouseLeave={handleMouseLeave}
                  className={`${col.widthClass} border-r px-2 py-2 text-xs font-semibold ${col.align === "center" ? "text-center" : "text-left"} ${CELL_BORDER} last:border-r-0 ${isDetractorPOV ? "bg-red-800 text-white border-red-700 hover:bg-red-700" : "border-slate-400 " + (sortable ? "cursor-pointer select-none hover:bg-slate-600" : "")} ${(col.tooltip?.trim() || sortable) ? "cursor-help" : ""}`}
                >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortable && active && (
                    <span className={isDetractorPOV ? "text-red-200" : "text-slate-300"} aria-hidden>
                      {sortDir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedList.map(({ concept, isMatch }) => (
          <ExplorationRow
            key={concept.id}
            concept={concept}
            isMatch={isMatch}
            hasQuery={false}
            scoreShadeClass={scoreShadeClass}
          />
        ))}
      </tbody>
    </table>
    {showTooltip &&
      typeof document !== "undefined" &&
      createPortal(
        <div
          className="fixed z-[100] max-w-sm rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-normal text-white shadow-xl pointer-events-none"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
          role="tooltip"
        >
          {tooltipText}
        </div>,
        document.body
      )}
    </>
  );
}

function ExplorationRow({
  concept,
  isMatch,
  hasQuery,
  scoreShadeClass,
}: {
  concept: ExplorationConcept;
  isMatch: boolean;
  hasQuery: boolean;
  scoreShadeClass: (score: number) => string;
}) {
  const rowBg =
    isMatch && hasQuery
      ? "bg-amber-50/90"
      : hasQuery && !isMatch
        ? "bg-gray-100/60"
        : "bg-white";
  const borderLeft = isMatch && hasQuery ? "border-l-4 border-amber-400" : "";
  const totalScore = concept.recommendationRank ?? 0;

  return (
    <tr className={`${rowBg} ${borderLeft} border-b border-slate-200`}>
      <td className={`px-3 py-2.5 text-sm font-medium text-slate-800 ${CELL_BORDER} ${WRAP}`}>
        {SWIM_LANE_LABELS[concept.swimLane]}
      </td>
      <td className={`px-3 py-2.5 text-base font-semibold ${CELL_BORDER} ${WRAP}`}>
        <Link
          href={`/app/explorations/${concept.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
        >
          {concept.conceptTitle}
        </Link>
      </td>
      <td
        title={concept.pitch}
        className={`px-3 py-2.5 text-center text-sm font-bold tabular-nums ${scoreShadeClass(totalScore)} ${CELL_BORDER} min-w-[2.5rem]`}
      >
        {concept.recommendationRank != null ? concept.recommendationRank : "—"}
      </td>
      <td className={`px-3 py-2.5 text-center text-sm font-bold tabular-nums ${scoreShadeClass(concept.desirability)} ${CELL_BORDER} min-w-[2.5rem]`}>
        {concept.desirability != null ? concept.desirability : "—"}
      </td>
      <td className={`px-3 py-2.5 text-center text-sm font-bold tabular-nums ${scoreShadeClass(concept.agenticPotential)} ${CELL_BORDER} min-w-[2.5rem]`}>
        {concept.agenticPotential != null ? concept.agenticPotential : "—"}
      </td>
      <td className={`px-3 py-2.5 text-center text-sm font-bold tabular-nums ${scoreShadeClass(concept.feasibility)} ${CELL_BORDER} min-w-[2.5rem]`}>
        {concept.feasibility != null ? concept.feasibility : "—"}
      </td>
      <td className={`px-3 py-2.5 text-base text-slate-700 leading-snug ${CELL_BORDER} ${WRAP}`}>
        {concept.pitch}
      </td>
      <td className={`px-3 py-2.5 text-base ${CELL_BORDER} ${WRAP}`}>
        <div className="space-y-1.5">
          {concept.syntheticUserQuotes.map((q, i) => {
            const sentiment = q.sentiment ?? "neutral";
            const quoteClass =
              sentiment === "positive"
                ? "text-green-700"
                : sentiment === "negative"
                  ? "text-red-700"
                  : "text-slate-800";
            return (
              <div key={i} className={quoteClass}>
                <span className="font-medium opacity-90">{q.persona}:</span>{" "}
                &ldquo;{q.quote}&rdquo;
              </div>
            );
          })}
        </div>
      </td>
      <td className={`px-3 py-2.5 text-base bg-red-50 text-red-900 border-red-200 ${CELL_BORDER} ${WRAP}`}>
        {concept.redTeam ? concept.redTeam : "—"}
      </td>
    </tr>
  );
}
