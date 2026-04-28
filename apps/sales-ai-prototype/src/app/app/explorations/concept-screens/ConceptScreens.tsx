import React from "react";
import { SWIM_LANE_LABELS } from "@/data/explorations/schema";
import type { ExplorationConcept } from "@/data/explorations/schema";
import type { ConceptVisualType } from "@/data/explorations/concept-visual-types";

const SCREEN_HEIGHT = "h-[600px]";
const SCREEN_ROOT = `${SCREEN_HEIGHT} flex flex-col bg-white rounded-b-lg overflow-hidden shadow-lg border border-slate-200/80`;

const BROWSER_CHROME = (
  <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200/90 shadow-sm">
    <div className="flex gap-2">
      <div className="w-3.5 h-3.5 rounded-full bg-red-400/90 shadow-sm" />
      <div className="w-3.5 h-3.5 rounded-full bg-amber-400/90 shadow-sm" />
      <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/90 shadow-sm" />
    </div>
    <div className="flex-1 flex justify-center">
      <div className="rounded-lg bg-white/90 border border-slate-200 shadow-inner px-5 py-2 text-sm text-slate-500 max-w-sm w-full text-center font-medium">
        app.xero.com/bills
      </div>
    </div>
  </div>
);

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max).trim() + "…";
}

/** Runway / forecast line chart */
function RunwayChartScreen({ concept }: { concept: ExplorationConcept }) {
  const laneLabel = SWIM_LANE_LABELS[concept.swimLane];
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">{concept.conceptTitle}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{laneLabel}</p>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="text-sm font-medium text-slate-500 mb-2">Cash runway (weeks)</div>
          <div className="flex-1 min-h-[200px] flex items-end gap-1 pb-8">
            {[72, 68, 61, 58, 52, 48, 44, 39, 35, 28, 22, 18].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-blue-500 shadow-sm"
                style={{ height: `${Math.max(12, (h / 72) * 100)}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-slate-400 mt-1">
            <span>Now</span>
            <span>12 weeks</span>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-amber-50/90 border border-amber-200/80 px-4 py-3 text-sm text-amber-800 shadow-sm">
          Runway drops below 4 weeks in week 10 — consider deferring 3 bills.
        </div>
      </div>
    </div>
  );
}

/** List of vendors with discount badges (radar) */
function DiscountRadarScreen({ concept }: { concept: ExplorationConcept }) {
  const vendors = ["Acme Corp", "Office Supplies Co", "Cloud Services Ltd", "Utilities Inc"];
  const discounts = ["2% net 10", "1.5% net 15", "2% net 10", "—"];
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight">{concept.conceptTitle}</h1>
        <p className="text-sm text-slate-500 mt-1 mb-4">Vendors offering early-pay discounts</p>
        <div className="flex-1 space-y-3 overflow-auto">
          {vendors.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-slate-200/90 px-4 py-3 bg-white shadow-sm hover:shadow transition-shadow"
            >
              <span className="text-sm font-medium text-slate-800">{v}</span>
              {discounts[i] !== "—" ? (
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1">
                  {discounts[i]}
                </span>
              ) : (
                <span className="text-sm text-slate-400">No discount</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Calendar / heatmap grid */
function CalendarHeatmapScreen({ concept }: { concept: ExplorationConcept }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const weeks = [1, 2, 3, 4];
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight">{concept.conceptTitle}</h1>
        <p className="text-sm text-slate-500 mt-1 mb-4">Due dates this month</p>
        <div className="flex gap-1.5 mb-3">
          {days.map((d, i) => (
            <div key={i} className="flex-1 text-center text-sm text-slate-500 font-semibold">
              {d}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 gap-1.5 min-h-0">
          {weeks.flatMap((w) =>
            days.map((_, d) => {
              const cell = (w - 1) * 7 + d + 1;
              const heat = cell % 5 === 0 ? "bg-rose-400/90 shadow-sm" : cell % 3 === 0 ? "bg-amber-300/90 shadow-sm" : "bg-slate-100";
              return (
                <div
                  key={`${w}-${d}`}
                  className={`rounded-lg ${heat} min-h-[36px] flex items-center justify-center text-sm font-medium text-slate-600`}
                >
                  {cell <= 28 ? cell : ""}
                </div>
              );
            })
          )}
        </div>
        <div className="mt-3 flex gap-6 text-sm text-slate-500">
          <span>■ Heavy</span>
          <span>■ Medium</span>
          <span>■ Light</span>
        </div>
      </div>
    </div>
  );
}

/** Split view / scenario compare */
function LiquiditySplitScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200/90 p-5 bg-slate-50/80">
            <div className="text-sm font-medium text-slate-500 mb-2">Account A</div>
            <div className="text-3xl font-bold text-slate-800 tracking-tight">$24,200</div>
            <div className="text-sm text-slate-500 mt-1">Available</div>
          </div>
          <div className="rounded-xl border border-slate-200/90 p-5 bg-slate-50/80">
            <div className="text-sm font-medium text-slate-500 mb-2">Account B</div>
            <div className="text-3xl font-bold text-slate-800 tracking-tight">$8,100</div>
            <div className="text-sm text-slate-500 mt-1">Available</div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-blue-50/90 border border-blue-200/80 px-4 py-3 text-sm text-blue-800">
          Suggested split: 70% A / 30% B for next payment run.
        </div>
      </div>
    </div>
  );
}

/** Alert card + list */
function AlertTriggerScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50/95 p-4 mb-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-2xl">⚠</span>
            <div>
              <div className="font-semibold text-amber-900 text-base">Payroll due in 2 days</div>
              <div className="text-sm text-amber-800 mt-1 leading-relaxed">
                $12,400 will leave Account A. Current balance may be insufficient after other scheduled payments.
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" className="rounded-xl bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-amber-700 transition-colors">
            Hold other payments
          </button>
          <button type="button" className="rounded-xl border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2.5 hover:bg-slate-50 transition-colors">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

/** Gauge / meter */
function MeterGaugeScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-1">{concept.conceptTitle}</h1>
        <p className="text-sm text-slate-500 mb-6">Current position</p>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-48 h-48 rounded-full border-[12px] border-slate-200 border-t-blue-500 border-r-blue-500 shadow-inner" style={{ transform: "rotate(-135deg)" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold text-slate-800 tracking-tight">68%</div>
            <div className="text-sm text-slate-500 mt-0.5">of cap</div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-slate-500 font-medium">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

/** Ranked list (ladder) */
function PriorityLadderScreen({ concept }: { concept: ExplorationConcept }) {
  const items = ["Vendor A — overdue 3 days", "Vendor B — early-pay discount", "Vendor C — due Friday"];
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-2">{concept.conceptTitle}</h1>
        <p className="text-sm text-slate-500 mb-4">Pay in this order</p>
        <div className="flex-1 space-y-3 overflow-auto">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200/90 px-4 py-3 bg-white shadow-sm">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white text-sm font-bold shadow-sm">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Approval queue: cards with Approve / Reject */
function ApprovalQueueScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 space-y-3 overflow-auto">
          <div className="rounded-xl border border-slate-200/90 p-4 bg-white shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Invoice #10234 — Acme Corp</div>
            <div className="text-sm text-slate-500 mt-1">$1,240.00 · Due 28 Feb</div>
            <div className="flex gap-2 mt-3">
              <button type="button" className="rounded-lg bg-emerald-600 text-white text-sm font-semibold px-3 py-1.5 shadow-sm">Approve</button>
              <button type="button" className="rounded-lg border border-slate-300 text-slate-600 text-sm font-medium px-3 py-1.5">Reject</button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/90 p-4 bg-white shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Invoice #10235 — Office Co</div>
            <div className="text-sm text-slate-500 mt-1">$890.00 · Due 1 Mar</div>
            <div className="flex gap-2 mt-3">
              <button type="button" className="rounded-lg bg-emerald-600 text-white text-sm font-semibold px-3 py-1.5 shadow-sm">Approve</button>
              <button type="button" className="rounded-lg border border-slate-300 text-slate-600 text-sm font-medium px-3 py-1.5">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Document with policy citations */
function PolicyDraftScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 text-sm overflow-auto shadow-inner">
          <p className="text-slate-700 font-medium">
            Payment request: <strong>$2,400</strong> to Acme Corp for Invoice #10234.
          </p>
          <div className="mt-3 rounded-lg bg-blue-50 border-l-4 border-blue-500 px-3 py-2.5 text-sm text-blue-900 shadow-sm">
            <strong>Policy §4.2</strong> — Payments over $2,000 require CFO approval. ✓ Criteria met.
          </div>
          <p className="text-slate-600 mt-3 leading-relaxed">
            {truncate(concept.pitch, 120)}
          </p>
        </div>
        <button type="button" className="mt-4 rounded-xl bg-blue-600 text-white text-sm font-semibold px-4 py-3 w-full shadow-sm hover:bg-blue-700 transition-colors">
          Approve with citation
        </button>
      </div>
    </div>
  );
}

/** Minimal intent capture (voice / one-tap) */
function IntentCaptureScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0 items-center justify-center">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-6 text-center">{concept.conceptTitle}</h1>
        <div className="w-full max-w-sm rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-10 text-center shadow-inner">
          <div className="w-20 h-20 rounded-full bg-slate-200/90 mx-auto mb-4 flex items-center justify-center text-4xl shadow-sm">
            🎤
          </div>
          <p className="text-base font-medium text-slate-600">Say or type what to pay</p>
          <p className="text-sm text-slate-400 mt-2">e.g. &ldquo;Pay Acme $1,200&rdquo;</p>
        </div>
        <button type="button" className="mt-6 rounded-full bg-blue-600 text-white text-base font-semibold px-8 py-3 shadow-md hover:bg-blue-700 transition-colors">
          Capture intent
        </button>
      </div>
    </div>
  );
}

/** Brief / digest cards */
function BriefDigestScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 space-y-4 overflow-auto">
          <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/80 shadow-sm">
            <div className="text-sm font-medium text-slate-500">Summary</div>
            <div className="text-sm text-slate-800 mt-2 leading-relaxed">{truncate(concept.pitch, 100)}</div>
          </div>
          <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/80 shadow-sm">
            <div className="text-sm font-medium text-slate-500">Next 7 days</div>
            <div className="text-base font-semibold text-slate-800 mt-2">3 bills due · $4,200 total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Deferral list with impact */
function DeferralAdvisorScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 space-y-3 overflow-auto">
          <div className="rounded-xl border border-slate-200/90 p-4 flex items-center justify-between bg-white shadow-sm">
            <div>
              <div className="text-sm font-semibold text-slate-800">Invoice #10234</div>
              <div className="text-sm text-slate-500 mt-0.5">Due 28 Feb · $1,240</div>
            </div>
            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 font-semibold">Defer 1 week</button>
              <div className="text-xs text-slate-500 mt-1">Runway +3 days</div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/90 p-4 flex items-center justify-between bg-white shadow-sm">
            <div>
              <div className="text-sm font-semibold text-slate-800">Invoice #10235</div>
              <div className="text-sm text-slate-500 mt-0.5">Due 1 Mar · $890</div>
            </div>
            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 font-semibold">Defer 1 week</button>
              <div className="text-xs text-slate-500 mt-1">Runway +2 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Timeline / sequence */
function BatchSequenceScreen({ concept }: { concept: ExplorationConcept }) {
  const steps = ["Batch 1 — 3 bills", "Batch 2 — 5 bills", "Batch 3 — 2 bills"];
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-md">{i + 1}</div>
                {i < steps.length - 1 && <div className="w-0.5 flex-1 min-h-[32px] bg-slate-200" />}
              </div>
              <div className="rounded-xl border border-slate-200/90 px-4 py-3 bg-white text-sm font-medium text-slate-800 flex-1 shadow-sm">
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Clusters / groups */
function ClusterPlannerScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-slate-200/90 p-4 bg-violet-50/90 shadow-sm">
            <div className="text-sm font-semibold text-violet-700">Cluster A</div>
            <div className="text-sm text-slate-700 mt-2">4 invoices · $2,100</div>
          </div>
          <div className="rounded-xl border-2 border-slate-200/90 p-4 bg-sky-50/90 shadow-sm">
            <div className="text-sm font-semibold text-sky-700">Cluster B</div>
            <div className="text-sm text-slate-700 mt-2">3 invoices · $1,800</div>
          </div>
          <div className="rounded-xl border-2 border-slate-200/90 p-4 bg-amber-50/90 shadow-sm">
            <div className="text-sm font-semibold text-amber-700">Cluster C</div>
            <div className="text-sm text-slate-700 mt-2">2 invoices · $890</div>
          </div>
          <div className="rounded-xl border-2 border-slate-200/90 p-4 bg-emerald-50/90 shadow-sm">
            <div className="text-sm font-semibold text-emerald-700">Cluster D</div>
            <div className="text-sm text-slate-700 mt-2">5 invoices · $3,200</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Narrative text block */
function NarrativeScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 rounded-xl border border-slate-200/90 bg-slate-50/80 p-5 overflow-auto shadow-inner">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
            {concept.pitch}
          </p>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-wrap break-words">
            {concept.problemStatement}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Guard / checklist */
function GuardChecklistScreen({ concept }: { concept: ExplorationConcept }) {
  const checks = ["Identity verified", "Duplicate check passed", "Within policy limit"];
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 space-y-3">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200/90 px-4 py-3 bg-white shadow-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">✓</span>
              <span className="text-sm font-medium text-slate-800">{c}</span>
            </div>
          ))}
        </div>
        <button type="button" className="mt-4 rounded-xl bg-slate-800 text-white text-sm font-semibold px-4 py-3 w-full shadow-md hover:bg-slate-900 transition-colors">
          Proceed
        </button>
      </div>
    </div>
  );
}

/** Form / template */
function TemplateFormScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 space-y-4 overflow-auto">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Amount</label>
            <div className="rounded-xl border border-slate-200/90 px-4 py-3 text-sm shadow-sm">$0.00</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Supplier</label>
            <div className="rounded-xl border border-slate-200/90 px-4 py-3 text-sm text-slate-400 shadow-sm">Select...</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Purpose</label>
            <div className="rounded-xl border border-slate-200/90 px-4 py-3 text-sm text-slate-400 shadow-sm">Select template...</div>
          </div>
        </div>
        <button type="button" className="mt-4 rounded-xl bg-blue-600 text-white text-sm font-semibold px-4 py-3 w-full shadow-md hover:bg-blue-700 transition-colors">
          Save & continue
        </button>
      </div>
    </div>
  );
}

/** Reminder / nudge */
function ReminderNudgerScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/95 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-amber-500 text-2xl">⏱</span>
            <div>
              <div className="text-base font-semibold text-amber-900">3 approvals pending over 2 days</div>
              <div className="text-sm text-amber-700 mt-1">SLA at risk — review now?</div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button type="button" className="rounded-xl bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-amber-700 transition-colors">Review</button>
          <button type="button" className="rounded-xl border border-slate-300 text-sm font-medium px-4 py-2.5 hover:bg-slate-50 transition-colors">Remind later</button>
        </div>
      </div>
    </div>
  );
}

/** Triage / priority queue */
function TriageQueueScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex gap-3 mb-3">
          <span className="rounded-full bg-red-100 text-red-800 text-sm font-semibold px-3 py-1">High</span>
          <span className="rounded-full bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1">Medium</span>
          <span className="rounded-full bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-1">Low</span>
        </div>
        <div className="flex-1 space-y-3 overflow-auto">
          <div className="rounded-xl border-l-4 border-red-500 bg-red-50/70 p-3 text-sm font-medium shadow-sm">Invoice #10234 — exception</div>
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/70 p-3 text-sm font-medium shadow-sm">Invoice #10235 — review</div>
          <div className="rounded-xl border-l-4 border-slate-300 bg-slate-50 p-3 text-sm font-medium shadow-sm">Invoice #10236 — standard</div>
        </div>
      </div>
    </div>
  );
}

/** Capture flow (drop zone / quick capture) */
function CaptureFlowScreen({ concept }: { concept: ExplorationConcept }) {
  return (
    <div className={`${SCREEN_ROOT}`}>
      {BROWSER_CHROME}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{concept.conceptTitle}</h1>
        <div className="flex-1 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 flex flex-col items-center justify-center p-10 shadow-inner">
          <div className="text-5xl mb-4">📄</div>
          <p className="text-base font-semibold text-slate-600">Drop invoice or receipt here</p>
          <p className="text-sm text-slate-400 mt-2">or paste from clipboard</p>
        </div>
      </div>
    </div>
  );
}

const SCREENS: Record<ConceptVisualType, React.FC<{ concept: ExplorationConcept }>> = {
  runway_chart: RunwayChartScreen,
  discount_radar: DiscountRadarScreen,
  calendar_heatmap: CalendarHeatmapScreen,
  liquidity_split: LiquiditySplitScreen,
  alert_trigger: AlertTriggerScreen,
  meter_gauge: MeterGaugeScreen,
  priority_ladder: PriorityLadderScreen,
  approval_queue: ApprovalQueueScreen,
  policy_draft: PolicyDraftScreen,
  intent_capture: IntentCaptureScreen,
  brief_digest: BriefDigestScreen,
  deferral_advisor: DeferralAdvisorScreen,
  batch_sequence: BatchSequenceScreen,
  cluster_planner: ClusterPlannerScreen,
  narrative: NarrativeScreen,
  guard_checklist: GuardChecklistScreen,
  template_form: TemplateFormScreen,
  reminder_nudger: ReminderNudgerScreen,
  triage_queue: TriageQueueScreen,
  capture_flow: CaptureFlowScreen,
};

export function ConceptScreenByType({
  type,
  concept,
}: {
  type: ConceptVisualType;
  concept: ExplorationConcept;
}) {
  const Screen = SCREENS[type];
  if (!Screen) return <BriefDigestScreen concept={concept} />;
  return <Screen concept={concept} />;
}
