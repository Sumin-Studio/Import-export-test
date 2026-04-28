import SlideLayout from "@/walkthrough/components/SlideLayout";

export default function CoverSlide() {
  return (
    <SlideLayout slideNumber={1}>
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">
          Bill AI Agent &middot; Design Sprint Feb 2026
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] max-w-4xl mb-6 text-slate-900">
          From 99 concepts
          <br />
          to <span className="text-[#1F68DD]">one direction</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-12">
          How the team moved from broad pain points to focused swimlanes, then into concept exploration to select a prototype.
        </p>
      </div>
    </SlideLayout>
  );
}
