"use client";

import Link from "next/link";
import { Check, Circle, ArrowRight } from "lucide-react";

const respondedTo = [
  {
    goal: "Spotlight will be our primary entry point for general traffic",
    comments: [
      "Bring insights to customers instead of scattering them across workflows",
      "Spotlight-style entry that lets customers step into an isolation review flow for risky bills",
      "Meet customers where they are – early on, people will be in muscle-memory spots (invoice lists, reports, dashboards)",
    ],
  },
  {
    goal: "We need to demonstrate what Quickview will look like",
    comments: [
      "Quick view is becoming the default bills interaction – we need to think early about how the JAX panel works with it",
      "Lean into quick view and the new bills page rather than embedding new components into the legacy page",
    ],
  },
  {
    goal: "We need to figure out how the CTAs will work",
    comments: [
      "Surface in context and help them take action",
      "The surface → trigger → JAX sidebar pattern feels reusable",
    ],
  },
  {
    goal: "A lot of this thinking is applicable across the system, not one-off for our agent",
    comments: [
      "Approach aligned with how we're surfacing forecasts and scenarios in Tax, weaving AI output and Review with JAX into existing interfaces",
      "Clear overlap with anomaly detection and summaries we're exploring in Payroll and Tax",
    ],
  },
  {
    goal: "Our competitors (notably Ramp) have a lot of patterns we can learn from",
    comments: [
      "Other platforms already do this – we should reverse-engineer their alert layers, risk types, resolutions, and audit trails",
    ],
  },
];

const notRespondedTo = [
  {
    theme: "Scope & eligibility",
    items: [
      "Clarity on whether risk status is for all bills customers, or only payment-enabled ones",
      "Everyone should get this feature, not just payments customers",
      "Valuable for all bill-paying customers regardless of payments enablement",
      "Better accuracy on risky bills that have previously gone through our payment partners",
    ],
  },
  {
    theme: "UI patterns & surfacing",
    items: [
      "If risks are rare, a permanent risk assessment column might waste table real estate – a symbol is fine",
      "Explicitly naming the type of risk instead of just low/medium/high",
      "Use the bigger AI layer (anomalies, cash forecasting) to inform visually and contextually – not walls of text",
      "If the AI suggestion is truly helpful, replace parts of the action area with the suggestion + action and be bold",
      "Consider turning the main action button (e.g. Approve) itself into the key communication moment about risk and next steps",
    ],
  },
  {
    theme: "JAX & human-in-the-loop",
    items: [
      "How to combine Spotlight with JAX",
      "JAX should be an opt-in drill-down, not an auto-deployed Clippy that pops up without being asked",
      "Earn the right to go fully hands-off by being human-in-the-loop and building trust first",
    ],
  },
  {
    theme: "Workflow integration",
    items: [
      "Think through how approval and dismissal play with standard bill approval, JAX, spotlight, and competitor patterns",
    ],
  },
  {
    theme: "Product & naming",
    items: [
      "Sanity-check the product name – some people may hear it as Zero Protect and joke about it",
    ],
  },
  {
    theme: "Agent autonomy & foundations",
    items: [
      "Baked-in decisions about how autonomous this agent is – is it fixed, a first step, or something to validate?",
      "Focus hard on the boring basics: smarter data extraction, learning repeated actions, better duplicates/PO matching inline without flashy AI branding",
    ],
  },
  {
    theme: "Brett Edmonds — prototype 4 (18 Mar)",
    items: [
      "Spotlight: Don't force a user decision; single CTA (e.g. Review Bills) → destination with all info needed to review",
      "Bills Overview: Don't add as new tab — tabs are workflow-oriented (left→right); Overview breaks that mental model",
      "Flagged items table: Expose reason item was flagged in the table, not behind another click",
      "JAX for deeper analysis: Why need JAX chat? Show everything users need to make a decision in the product experience itself",
    ],
  },
];

export default function FeedbackResponsesPage() {
  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-[#1a1a1a] sm:text-3xl">
            Feedback responses
          </h1>
          <p className="mt-2 text-[15px] text-[#5c5c5c]">
            What was addressed in the key goals and assumptions, and what remains
            open for continued exploration.
          </p>
          <Link
            href="/xero-protect/prototype/4"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#13b5ea] hover:text-[#0e9bc4]"
          >
            <ArrowRight className="size-3.5 rotate-180" />
            Back to prototype 4
          </Link>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#1a1a1a]">
            <Check className="size-5 text-[#13b5ea]" />
            What we responded to
          </h2>
          <p className="mb-6 text-[14px] text-[#5c5c5c]">
            These comments were distilled into the five key goals and assumptions
            for continued exploration.
          </p>
          <ul className="space-y-8">
            {respondedTo.map((block, i) => (
              <li
                key={i}
                className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-start gap-2">
                  <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#e0f7fc] px-2.5 py-0.5 text-[12px] font-medium text-[#154d58]">
                    Goal
                  </span>
                  <p className="font-medium text-[#1a1a1a]">{block.goal}</p>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {block.comments.map((c, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-[14px] text-[#5c5c5c]"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-[#13b5ea]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#1a1a1a]">
            <Circle className="size-5 text-[#9ca3af]" />
            What we didn&apos;t respond to
          </h2>
          <p className="mb-6 text-[14px] text-[#5c5c5c]">
            These comments were not explicitly reflected in the key goals. They
            remain open for validation, design, or future prioritisation.
          </p>
          <ul className="space-y-6">
            {notRespondedTo.map((group, i) => (
              <li
                key={i}
                className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
              >
                <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-[#5c5c5c]">
                  {group.theme}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-[14px] text-[#1a1a1a]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#9ca3af]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 border-t border-[#e5e7eb] pt-8 text-[13px] text-[#5c5c5c]">
          <p>
            This page documents the mapping between stakeholder feedback and the
            key goals and assumptions for prototype 4.
          </p>
        </footer>
      </div>
    </div>
  );
}
