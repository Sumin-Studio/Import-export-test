import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explainer",
  description:
    "Detailed explainer of the synthetic user process used to test and refine ideas for Bill AI Automation.",
};

const sections = [
  {
    id: "context-engine",
    heading: "1) Built a context engine first",
    summary: "Created a project-specific memory layer before any roleplay.",
    points: [
      "Used Cursor as a custom NotebookLM for the sprint.",
      "Pulled source context from Miro, Slack, workshop notes, strategy docs, prototype specs, and discussion threads.",
      "Stored everything as searchable markdown/text in one repo.",
      "Structured by type (meeting-notes, strategy, workshop, reference, raw-data) so retrieval stayed reliable.",
      "Tagged ideas with metadata like problem area, constraints, likely user type, and maturity.",
    ],
    why: "This kept outputs grounded in project facts rather than generic AI assumptions.",
  },
  {
    id: "synthetic-users",
    heading: "2) Created synthetic user agents by role",
    summary: "Defined specific personas and critique behavior, not one generic user.",
    points: [
      "Bill Creator (small/high-volume), Cautious Approver, and AP Clerk.",
      "Added a deliberate adversarial lens ('hater mode') to stress-test weak ideas.",
      "For each role, defined goals, constraints, anxieties, optimization priorities, and language/tone.",
      "Added explicit evaluation rules so each role had a consistent yes/no quality bar.",
    ],
    why: "The model was not improvising personas; it was operating from explicit role instructions and shared context.",
  },
  {
    id: "testing-loop",
    heading: "3) Ran every idea through a repeatable evaluation loop",
    summary: "Used the same prompt protocol across concepts and personas.",
    points: [
      "Collected first-person reactions for each concept.",
      "Captured likely failure modes, trust risks, and workflow friction.",
      "Asked what evidence each persona would need before trusting the idea.",
      "Requested concrete refinements, not just criticism.",
      "Compared cross-persona signals to find strong ideas, risky ideas, and ideas that needed safeguards.",
    ],
    why: "The stress-test mode surfaced brittle assumptions early, before deeper build investment.",
  },
  {
    id: "outcomes",
    heading: "4) Used it as a pre-research quality filter",
    summary: "Improved idea quality before design/engineering/research depth.",
    points: [
      "Weak concepts were cut quickly.",
      "Promising concepts were improved with targeted objections.",
      "Generated clearer hypotheses to validate with real customers.",
      "The process accelerated convergence while preserving critical scrutiny.",
    ],
    why: "This augmented user research; it did not replace user research.",
  },
  {
    id: "next-step",
    heading: "5) Next integration step: map 99 ideas to JTBD journey",
    summary: "Move from isolated ideas to one coherent customer experience.",
    points: [
      "Publish a matrix mapping each idea to journey stage and JTBD.",
      "Cluster overlaps and expose seams in the end-to-end flow.",
      "Prioritize connected narrative arcs over disconnected point ideas.",
      "Package into 2-3 coherent experience storylines for decision-making.",
    ],
    why: "This directly addresses the challenge of how ideas combine into a collective customer experience.",
  },
];

export default function ExplainerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-cyan-500"
          >
            ← Home
          </Link>
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Bill AI Automation
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Explainer
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            How the Idea Testing Worked
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Detailed walkthrough for how synthetic users were created, contextualized,
            and used to stress-test concepts before deeper delivery investment.
          </p>
        </div>

        <section className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Quick Summary
          </h2>
          <p className="mt-2 text-slate-700">
            A project-specific context base was built first, then role-based synthetic
            users were generated, including an adversarial stress-tester. Concepts were
            run through a repeatable loop to expose risk, refine direction, and produce
            stronger hypotheses for real user validation.
          </p>
        </section>

        <section className="space-y-4">
          {sections.map((section) => (
            <details
              key={section.id}
              id={section.id}
              className="group rounded-xl border border-slate-200 bg-white p-5 open:border-cyan-400 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none">
                <h2 className="text-xl font-semibold text-slate-900">
                  {section.heading}
                </h2>
                <p className="mt-1 text-slate-600">{section.summary}</p>
              </summary>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <p className="mt-4 border-l-2 border-cyan-400 pl-3 text-slate-800">
                <span className="font-semibold">Why it mattered:</span> {section.why}
              </p>
            </details>
          ))}
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            One-liner for leadership
          </p>
          <p className="mt-2 text-xl font-semibold">
            Context-first synthetic users + adversarial stress-testing accelerated idea
            quality and made the path to a coherent customer journey clearer.
          </p>
        </section>
      </main>
    </div>
  );
}
