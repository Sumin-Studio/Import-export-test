import Link from "next/link";
import SlideLayout from "@/walkthrough/components/SlideLayout";
import BillPayPanel from "@/components/concepts/bill-pay-panel";
import IntelligentBillApprovalPanel from "@/components/concepts/intelligent-bill-approval-panel";
import NoBillBillPayPanel from "@/components/concepts/no-bill-bill-pay-panel";

const CONCEPTS = [
  {
    id: "1",
    href: "/concept/1",
    Component: BillPayPanel,
    heading: "Predict your cash flow.",
    subtext: "Bill Planner recommends what to pay and when based on cash and terms.",
  },
  {
    id: "2",
    href: "/concept/2",
    Component: IntelligentBillApprovalPanel,
    heading: "Protect your cash flow.",
    subtext: "Bill Approval Protector flags anomalies and routes approvals so you sign off with confidence.",
  },
  {
    id: "3",
    href: "/concept/3",
    Component: NoBillBillPayPanel,
    heading: "Execute your cash flow.",
    subtext: "Just Pay: talk to your agent and have the right payments happen automatically.",
  },
] as const;

export default function FinalPrototypeSlide() {
  return (
    <SlideLayout slideNumber={6}>
      <div className="flex-1 flex flex-col max-w-6xl mx-auto px-8 py-16 w-full">
        <div className="grid grid-cols-3 gap-6 items-start">
          {CONCEPTS.map(({ id, href, Component, heading, subtext }) => (
            <section key={id} id={`concept-${id}`} className="scroll-mt-8 flex flex-col min-w-0">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{heading}</h3>
                  <p className="text-sm text-slate-500 mt-1">{subtext}</p>
                </div>
                <Link
                  href={href}
                  className="shrink-0 text-xs font-medium text-[#1F68DD] hover:underline"
                >
                  Full screen →
                </Link>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Component />
              </div>
            </section>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
