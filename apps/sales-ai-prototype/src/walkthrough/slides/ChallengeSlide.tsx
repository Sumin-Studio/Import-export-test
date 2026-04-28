import SlideLayout from "@/walkthrough/components/SlideLayout";
import StatCallout from "@/walkthrough/components/StatCallout";

export default function ChallengeSlide() {
  return (
    <SlideLayout slideNumber={2}>
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-8 py-16 w-full">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">The Challenge</h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Bill payments at Xero: a feature most users skip. The manual effort required exceeds perceived value for most.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <StatCallout value="10%" label="create bills" detail="Only 1 in 10 Xero users bother creating bills at all" red />
          <StatCallout value="1%" label="use bill payments" detail="The end-to-end bill payment flow is virtually unused" red />
          <StatCallout value="25%" label="created after paid" detail="A quarter of bills are entered after the payment has already happened" red />
          <StatCallout value="44%" label='"caught short"' detail="Nearly half of small businesses have been surprised by cash shortfalls" red />
        </div>
      </div>
    </SlideLayout>
  );
}
