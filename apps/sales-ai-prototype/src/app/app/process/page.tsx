import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Process",
  description:
    "From analysis to execution: how the cash-flow aware bill agent gets every bill ready to pay.",
};

const STEPS = [
  {
    number: "1",
    title: "Analysis",
    tagline: "Overdue and upcoming bills, in one place.",
    detail:
      "The agent pulls your bills and surfaces what's due when. No digging through lists — you see the full picture immediately.",
  },
  {
    number: "2",
    title: "Anomaly flagging",
    tagline: "Spots what's unusual before you have to.",
    detail:
      "Supplier billing 67% above their average? Overdue by 13 days? The agent flags risks and outliers so you can focus on the ones that matter.",
  },
  {
    number: "3",
    title: "Recommendations",
    tagline: "Pay now vs defer — with a clear reason.",
    detail:
      "Conservative, Standard, or Growth: pick a goal. The agent recommends which bills to pay now and which to defer, with cash position in mind.",
  },
  {
    number: "4",
    title: "Fine-tuning",
    tagline: "You stay in control.",
    detail:
      "Override priorities, adjust cash reserves, drag bills between pay-now and defer. The plan is a proposal — you own the final call.",
  },
  {
    number: "5",
    title: "Cash flow position",
    tagline: "Running total, all the way through.",
    detail:
      "Balance after each payment, updated as you change the plan. No surprises: you see exactly where you stand before anything is executed.",
  },
  {
    number: "6",
    title: "Execute",
    tagline: "Confirm, then pay.",
    detail:
      "Final review and confirmation. Execution hands off to your payment rail (e.g. Melio). The agent gets you to \"ready to pay\" — you approve the action.",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-cyan-500"
          >
            ← Back to app
          </Link>
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Bill Pay Agent
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The process
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-700">
            Know your cash flow. Protect your cash flow. Execute on your cash flow.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            From &ldquo;can I afford to pay my bills?&rdquo; to &ldquo;ready to
            pay.&rdquo; Click any step to expand.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <details
              key={step.number}
              className="group relative rounded-xl border-2 border-slate-200 bg-white p-5 open:border-cyan-400 open:shadow-lg"
            >
              <summary className="cursor-pointer list-none pr-8">
                <span className="absolute right-4 top-4 text-2xl font-bold tabular-nums text-cyan-400/30">
                  {step.number}
                </span>
                <span className="font-semibold text-slate-900">
                  {step.title}
                </span>
                <p className="mt-1 text-sm text-slate-600">{step.tagline}</p>
              </summary>
              <p className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-900">
                {step.detail}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            In one line
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            Analysis → anomaly flagging → recommendations → you fine-tune → cash
            position visible → execute.
          </p>
        </div>
      </main>
    </div>
  );
}
