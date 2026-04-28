import SlideLayout from "@/walkthrough/components/SlideLayout";
import Link from "next/link";

export default function WhatsNextSlide() {
  return (
    <SlideLayout slideNumber={5}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 text-center">From Swimlanes to One Prototype</h2>
        <p className="text-lg text-slate-600 max-w-3xl text-center mb-12">
          The next step is concept synthesis: compare candidate concepts, review the recommendation signal, and then launch the selected prototype.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/app/explorations"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Open concept explorations
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/app/prototype"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1F68DD] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1756b8]"
          >
            Launch selected prototype
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-14 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm text-slate-600">
          Sequence: 20 Problems -&gt; Scoring Matrix -&gt; Three Swimlanes -&gt; Concept Explorations -&gt; Prototype
        </div>
      </div>
    </SlideLayout>
  );
}
