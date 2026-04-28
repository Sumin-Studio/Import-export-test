import SlideLayout from "@/walkthrough/components/SlideLayout";

const steps = [
  { number: 1, phase: "Preparation", title: "Knowledge Base Assembly", label: "Structured Markdown", description: "Research reports, VOC data, competitive analysis, persona profiles with critique and testing instructions — all converted to structured markdown. No PDFs, no slides. The AI reads everything before touching anything." },
  { number: 2, phase: "Divergence", title: "Individual Pain Points", label: "Dating Game", description: 'Everyone came with their own top problems, independently, no groupthink. Based on research, VOC, domain expertise. The AI generated along design spectrums: autonomous ↔ supervised, aggressive ↔ protective.' },
  { number: 3, phase: "Divergence", title: "Scoring on 3 Dimensions", label: "Pugh Matrix", description: "Each of the 20 items scored on Severity (how much does this hurt?), Feasibility (can we build it?), and Benefit of AI (is an agent the right tool?). AI evaluated against personas and business goals." },
  { number: 4, phase: "Rough Synthesis", title: "2x2 Mapping & Voting", label: "Three Rounds", description: "Physically placed on three canvases: Good Agent vs. Less Good, Feasible vs. Stretch, Real User Need vs. Nice-to-Have. One vote for the single top problem, then a second round. Clear signal emerged." },
  { number: 5, phase: "Rough Synthesis", title: "Cluster & Converge", label: "Three Swimlanes", description: "Follow-up conversations with Chong, Lili, David, and Angus mapped the top clusters to three complementary swimlanes. Every cut documented with reasoning." },
];

const phaseColors: Record<string, string> = {
  Preparation: "#1F68DD",
  Divergence: "#1F68DD",
  "Rough Synthesis": "#1F68DD",
};

export default function ApproachSlide() {
  return (
    <SlideLayout slideNumber={4}>
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-8 py-16 w-full">
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#1F68DD] mb-2">A2A</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Workshop 1</h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            A2A. Workshop 1 on Friday Feb 13 was the pivot point.
          </p>
        </div>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-6 items-start">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm" style={{ background: phaseColors[step.phase] }}>
                  {step.number}
                </div>
                {i < steps.length - 1 && <div className="w-px h-full min-h-[60px] bg-gray-200 my-1" />}
              </div>
              <div className="pb-8">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{step.label}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
          <strong className="text-gray-700">Team:</strong> Jon Bell, Chong Xu, Lili, David Brown, Angus Tait, Neeraj, Kait, Jenny Nedanovski
        </div>
      </div>
    </SlideLayout>
  );
}
