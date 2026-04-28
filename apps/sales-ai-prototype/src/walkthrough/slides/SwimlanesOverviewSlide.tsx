import SlideLayout from "@/walkthrough/components/SlideLayout";
import SwimlaneSummaryCard from "@/walkthrough/components/SwimlaneSummaryCard";
import { swimlanes } from "@/walkthrough/data/swimlanes";

export default function SwimlanesOverviewSlide() {
  return (
    <SlideLayout slideNumber={4}>
      <div className="flex-1 flex flex-col justify-start max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Which gave us 3 strong swimlanes to explore, backed by data
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Each swimlane resolves a different decision bottleneck in the bill-to-pay journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {swimlanes.map((sl) => (
            <SwimlaneSummaryCard key={sl.id} swimlane={sl} />
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
