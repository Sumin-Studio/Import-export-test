"use client";

import { AlertTriangle, Wrench, Sparkles } from "lucide-react";
import { rankedProblems } from "@/walkthrough/data/problems";

const scoreColor = (score: number): string => {
  switch (score) {
    case 1: return "bg-white text-slate-500";
    case 2: return "bg-[#ffcdd2] text-slate-700";
    case 3: return "bg-[#ef9a9a] text-slate-800";
    case 4: return "bg-[#e57373] text-white";
    case 5: return "bg-[#c62828] text-white";
    default: return "";
  }
};

const totalColor = (total: number): string => {
  if (total >= 13) return "bg-[#c62828] text-white";
  if (total >= 12) return "bg-[#e57373] text-white";
  if (total >= 11) return "bg-[#ef9a9a] text-slate-800";
  return "bg-[#ffcdd2] text-slate-600";
};

export default function PughMatrix() {
  const stopAtArea = "No clear cash position or simple guardrail before payment";
  const stopIndex = rankedProblems.findIndex((p) => p.area === stopAtArea);
  const visibleProblems = stopIndex >= 0 ? rankedProblems.slice(0, stopIndex + 1) : rankedProblems;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" aria-hidden />
            Severity
          </div>
          <div className="text-xs text-gray-500">How painful? Customer impact, strategic weight, scale of harm.</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-1">
            <Wrench className="w-4 h-4 text-slate-600" aria-hidden />
            Feasibility
          </div>
          <div className="text-xs text-gray-500">Can we build it? 5 = doable now. 1 = blocked or major infra.</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-1">
            <Sparkles className="w-4 h-4 text-violet-600" aria-hidden />
            Benefit of AI
          </div>
          <div className="text-xs text-gray-500">Is AI the right tool, or should we &quot;just fix&quot; with product/UX?</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 text-xs text-gray-400">
        <span className="font-semibold">Scale:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex items-center gap-1">
            <div className={`w-5 h-4 rounded ${scoreColor(n)}`} />
            <span>{n}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#334155] text-white text-xs uppercase tracking-wide">
              <th className="px-3 py-2.5 text-left font-semibold w-10">Rank</th>
              <th className="px-3 py-2.5 text-left font-semibold min-w-[200px]">Area of opportunity</th>
              <th className="px-2 py-2.5 text-center font-semibold w-12" title="Severity">
                <span className="inline-flex justify-center w-full">
                  <AlertTriangle className="w-4 h-4 text-white" aria-hidden />
                </span>
              </th>
              <th className="px-2 py-2.5 text-center font-semibold w-12" title="Feasibility">
                <span className="inline-flex justify-center w-full">
                  <Wrench className="w-4 h-4 text-white" aria-hidden />
                </span>
              </th>
              <th className="px-2 py-2.5 text-center font-semibold w-12" title="Benefit of AI">
                <span className="inline-flex justify-center w-full">
                  <Sparkles className="w-4 h-4 text-white" aria-hidden />
                </span>
              </th>
              <th className="px-2 py-2.5 text-center font-semibold w-14">Total</th>
            </tr>
          </thead>
          <tbody>
            {visibleProblems.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? "" : "bg-gray-50/50"}>
                <td className="px-3 py-2.5 text-center font-extrabold text-gray-700 tabular-nums">{p.rank}</td>
                <td className="px-3 py-2.5 font-semibold text-sm text-gray-800">{p.area}</td>
                <td className={`px-2 py-2.5 text-center font-bold tabular-nums ${scoreColor(p.severity)}`}>{p.severity}</td>
                <td className={`px-2 py-2.5 text-center font-bold tabular-nums ${scoreColor(p.feasibility)}`}>{p.feasibility}</td>
                <td className={`px-2 py-2.5 text-center font-bold tabular-nums ${scoreColor(p.aiBenefit)}`}>{p.aiBenefit}</td>
                <td className={`px-2 py-2.5 text-center font-extrabold tabular-nums ${totalColor(p.total)}`}>{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
