import SlideLayout from "@/walkthrough/components/SlideLayout";
import PughMatrix from "@/walkthrough/components/PughMatrix";

export default function ScoringSlide() {
  return (
    <SlideLayout slideNumber={3}>
      <div className="flex-1 flex flex-col justify-start max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Then we organised via Pugh Matrix</h2>
          <p className="text-lg text-gray-500 max-w-3xl">
            We ranked pain points by severity, feasibility, and AI benefit.
          </p>
        </div>
        <PughMatrix />
      </div>
    </SlideLayout>
  );
}
