import SlideLayout from "@/walkthrough/components/SlideLayout";
import GrayboxWireframe from "@/walkthrough/components/GrayboxWireframe";
import { swimlanes, prototypes } from "@/walkthrough/data/swimlanes";

export default function SL1Slide() {
  const sl = swimlanes[0];
  const protos = prototypes.filter((p) => p.swimlane === "sl1");

  return (
    <SlideLayout slideNumber={9}>
      <div className="flex-1 max-w-5xl mx-auto px-8 py-16 w-full">
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: sl.color }}>Swimlane 1</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">{sl.name}</h2>
          <p className="text-lg italic text-gray-500 max-w-2xl">{sl.tagline}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl p-6" style={{ background: sl.lightBg, border: `1px solid ${sl.borderColor}` }}>
            <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">The Problem</div>
            <ul className="space-y-2">
              {sl.problemStatement.map((p, i) => (
                <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: sl.color }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-100 p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">What the Agent Does</div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{sl.agentDescription}</p>
            <div className="text-xs text-gray-400">Workshop items: {sl.workshopItems.map((n) => `#${n}`).join(", ")}</div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Early Concepts</h3>
          <p className="text-sm text-gray-500 mb-8">Five different UI approaches for how this agent could appear in the product.</p>
          <div className="space-y-8">
            {protos.map((proto, i) => (
              <div key={proto.number}>
                <GrayboxWireframe prototype={proto} accentColor={sl.color} />
                {i < protos.length - 1 && <hr className="mt-8 border-gray-100" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
