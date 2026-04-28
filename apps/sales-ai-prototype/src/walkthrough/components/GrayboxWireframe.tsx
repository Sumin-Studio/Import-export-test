import type { Prototype } from "@/walkthrough/data/swimlanes";

interface GrayboxWireframeProps {
  prototype: Prototype;
  accentColor: string;
}

function wireframeIcon(num: number): string {
  const icons = ["\u25A1", "\u25CB", "\u25A0", "\u25C7", "\u25B3"];
  return icons[(num - 1) % icons.length];
}

function wireframeHint(sl: string, num: number): string {
  const hints: Record<string, string[]> = {
    sl1: ["Bills > Awaiting Payment", "JAX Chat Interface", "Homepage Dashboard", "Strategy Selection Modal", "Mobile Push + Quick Review"],
    sl2: ["Email Approval Summary", "In-Xero Approval Hub", "Slack Action Card", "Mobile Swipe Cards", "Risk-Column Triage"],
    sl3: ["Homepage Quick Action", "Bank Feed Reconciliation", "JAX Natural Input", "Dashboard Pattern Card", "3-Field Lite Form"],
  };
  return hints[sl]?.[num - 1] ?? "";
}

export default function GrayboxWireframe({ prototype, accentColor }: GrayboxWireframeProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full md:w-72 flex-shrink-0 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-5 min-h-[180px] flex flex-col items-center justify-center text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Approach {prototype.number} of 5
        </div>
        <div className="text-3xl text-gray-300 mb-2">{wireframeIcon(prototype.number)}</div>
        <div className="text-xs text-gray-400">{wireframeHint(prototype.swimlane, prototype.number)}</div>
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold text-gray-900 mb-1">{prototype.name}</h4>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{prototype.description}</p>
        <div className="text-sm text-gray-500 leading-relaxed p-3 rounded-lg border-l-3" style={{ background: `${accentColor}08`, borderColor: accentColor }}>
          <strong className="text-gray-700">Why this works: </strong>
          {prototype.whyItWorks}
        </div>
      </div>
    </div>
  );
}
