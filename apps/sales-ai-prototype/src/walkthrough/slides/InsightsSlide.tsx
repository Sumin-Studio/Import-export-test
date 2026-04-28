import SlideLayout from "@/walkthrough/components/SlideLayout";

const insights = [
  { number: 1, title: "Cash-aware planning dominated", color: "#2e7d50", body: '"No cash-aware payment planning or prioritization" was the #1 voted problem. The cluster of items around cash flow — uncertainty, guardrails, late payments, scenario testing — formed a clear gravitational centre. People kept orbiting cash awareness.', stat: "#1 voted problem", evidence: "Seven of the 14 retained items (half!) relate to cash awareness, planning, or payment timing." },
  { number: 2, title: "Approval = natural agent fit", color: "#1565c0", body: "Chasing approvers, fraud/risk detection, and guardrailed auto-approval all scored 5 on AI Benefit. These are things agents are born to do: chase, flag, escalate, auto-approve within guardrails. The payroll-chasing pattern already proves this works at Xero.", stat: "All scored 5 on AI", evidence: "Two of the four top-ranked items in the entire matrix (#8 and #10, both at 13) are in this cluster." },
  { number: 3, title: "The adoption gap is real but not agent-solvable", color: "#e65100", body: '"Low bill pay adoption" scored the highest raw severity (5 — only 10% of users create bills), but the lowest feasibility (2). You can\'t agent your way out of a value proposition problem. But you can make the journey so dramatically light that people start using it — which is the "Just Pay" insight.', stat: "Sev 5, Feas 2", evidence: 'The cluster tells a coherent story: meet pay-first behavior where it is. "Pay-first, account-second."' },
];

export default function InsightsSlide() {
  return (
    <SlideLayout slideNumber={7}>
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-8 py-16 w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What the Data Said</h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Three clear signals emerged from the scoring and voting. Each one points to a different kind of agent behavior.
          </p>
        </div>
        <div className="space-y-8">
          {insights.map((insight) => (
            <div key={insight.number} className="flex gap-6 items-start rounded-2xl border border-gray-100 p-6 md:p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg flex-shrink-0" style={{ background: insight.color }}>
                {insight.number}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">{insight.stat}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{insight.body}</p>
                <p className="text-xs text-gray-400 italic">{insight.evidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
