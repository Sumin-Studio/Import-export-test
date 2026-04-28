import type { Swimlane } from "@/walkthrough/data/swimlanes";

interface SwimlaneSummaryCardProps {
  swimlane: Swimlane;
}

export default function SwimlaneSummaryCard({ swimlane }: SwimlaneSummaryCardProps) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col h-full"
      style={{ background: swimlane.lightBg, border: `2px solid ${swimlane.borderColor}` }}
    >
      <div className="pb-3 mb-4" style={{ borderBottom: `2px solid ${swimlane.color}` }}>
        <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: swimlane.color }}>
          Swimlane {swimlane.number}
        </div>
        <h3 className="text-lg font-bold text-gray-900">{swimlane.name}</h3>
      </div>
      <p className="text-sm italic text-gray-600 mb-4">{swimlane.tagline}</p>
      <div className="mb-4 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Key Problems</div>
        <ul className="space-y-1.5">
          {swimlane.problemStatement.slice(0, 2).map((p, i) => (
            <li key={i} className="text-xs text-gray-600 leading-relaxed flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: swimlane.color }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg p-3 text-xs text-gray-700 leading-relaxed" style={{ background: `${swimlane.color}15` }}>
        <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">What the Agent Does</div>
        {swimlane.agentDescription.slice(0, 200)}...
      </div>
      <div className="mt-4 pt-3 text-xs text-gray-400" style={{ borderTop: `1px solid ${swimlane.borderColor}` }}>
        Items: {swimlane.workshopItems.map((n) => `#${n}`).join(", ")}
      </div>
    </div>
  );
}
