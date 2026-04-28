import SlideLayout from "@/walkthrough/components/SlideLayout";

const whyReasons = [
  { label: "Coverage", stat: "2 of 7", detail: "Most teams use AI for idea generation and refinement only. The Swarm uses it across all 7 stages — scope definition, knowledge base, opportunity mapping, generation, refinement, evaluation, and selection." },
  { label: "Volume", stat: "90 ideas", detail: "Brett's team generated ~90 ideas with 50+ genuinely distinct concepts in 4 days. Volume replaces ego — you evaluate options instead of defending the one you already drew." },
  { label: "Grounding", stat: "2 rounds", detail: "Real user testing at two checkpoints. AI evaluates against personas and business goals, but humans decide what ships. Every cut is documented with reasoning." },
];

const howSteps = [
  { number: 1, name: "Curate context", color: "#1F68DD", description: "Build a structured knowledge base the AI reads before generating anything — VOC data, strategy docs, constraints, personas." },
  { number: 2, name: "Diverge with AI", color: "#1F68DD", description: "Generate along design spectrums and forced structures. Push to extremes. The AI holds more context than any workshop room." },
  { number: 3, name: "Converge with humans", color: "#1F68DD", description: "Four-lens evaluation, stakeholder review, real user testing. AI evaluates, you decide. Output spans near-term buildable and long-horizon vision." },
];

export default function SwarmSlide() {
  return (
    <SlideLayout slideNumber={3}>
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-8 py-16 w-full">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#1F68DD] mb-2">The Method</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">A2A</h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Developed by Brett Edmonds, Di, and Darryl on the Agent Platform team. A new way of working where AI is a co-designer across every stage — not just a brainstorming tool.
          </p>
        </div>
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">Why we&apos;re adopting it</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyReasons.map((reason) => (
              <div key={reason.label} className="rounded-xl border border-gray-100 p-5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-[#1F68DD]">{reason.stat}</span>
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400">{reason.label}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{reason.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">How it works</div>
          <div className="flex gap-3">
            {howSteps.map((step, i) => (
              <div key={step.number} className="flex-1 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: step.color }}>
                  {step.number}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{step.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
                {i < howSteps.length - 1 && <div className="text-gray-300 font-bold self-center flex-shrink-0 ml-1">&rarr;</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
