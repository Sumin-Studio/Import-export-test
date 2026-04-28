"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step {
  id: string;
  title: string;
  body: string;
}

interface HeroConfig {
  slug: string;
  label: string;
  intro: string;
  visualLabel: string;
  imageSrc: string;
  steps: Step[];
}

const HEROES: HeroConfig[] = [
  {
    slug: "auto-pay",
    label: "Bill Planner",
    intro:
      "Cash-aware auto-pay that prepares a plan for the week and quietly gets bills ready. You glance at tomorrow’s plan on the home screen, tweak if needed, and go back to running the business.",
    visualLabel: "Home screen widget and plan view",
    imageSrc: "/heroes/agent-1.png",
    steps: [
      {
        id: "glance-and-trust",
        title: "A single glance says, “you’re covered.”",
        body:
          "On the lock screen, the agent surfaces a calm summary: how many bills, how much cash, and when they’ll go out. It feels like a weather report for payables — simple, scannable, and reassuring.",
      },
      {
        id: "review-the-plan",
        title: "Tap in to see the plan, not a list.",
        body:
          "Inside the notification, bills are grouped into a coherent payment run: urgent, on‑time, and smart early‑pay opportunities. Each line explains why it belongs in today’s plan so approval never feels like a guess.",
      },
      {
        id: "teach-the-agent",
        title: "Teach it once; it remembers forever.",
        body:
          "When cash is tight or a one‑off expense is coming, you tell the agent in plain language. It reshapes the plan on the fly — deferring the right bills, preserving discounts, and learning your preferences for next time.",
      },
    ],
  },
  {
    slug: "auto-approval",
    label: "Auto approval agent",
    intro:
      "An approval layer that understands policy and context. It routes the right bills to the right people and only interrupts approvers when judgment is actually needed.",
    visualLabel: "Policy‑aware approvals dashboard",
    imageSrc: "/heroes/agent-2.png",
    steps: [
      {
        id: "see-what-matters",
        title: "One view that highlights what truly needs approval.",
        body:
          "Instead of a flat queue, the dashboard elevates high‑risk, high‑impact items: overdue bills, large amounts, and exceptions to policy. Everything routine stays quiet in the background.",
      },
      {
        id: "explain-the-why",
        title: "Every recommendation comes with a reason.",
        body:
          "For each bill, the agent explains why it’s prioritised — trade discounts, supplier history, cash position, or contract terms. Approvers can scan the story, not parse a chart of codes.",
      },
      {
        id: "approve-with-confidence",
        title: "Approve the run, not each line item.",
        body:
          "Once the agent has grouped and explained the bills, approval becomes a single, confident action: ‘Approve this week’s payment run.’ Edge cases are routed to the right person automatically.",
      },
    ],
  },
  {
    slug: "just-pay",
    label: "Just Pay",
    intro:
      "Bills appear in Xero already coded, matched, and sequenced. The agent takes raw invoices, supplier emails, and approvals and turns them into ready‑to‑pay bills without manual entry.",
    visualLabel: "Conversation with the bill agent",
    imageSrc: "/heroes/agent-3.png",
    steps: [
      {
        id: "intake-and-understand",
        title: "The agent handles the messy intake.",
        body:
          "Vendors send PDFs, photos, or email threads. The agent extracts the details, finds the supplier, and proposes the right account codes and tax treatment before anything hits your queue.",
      },
      {
        id: "align-with-cash",
        title: "It sequences payments around real‑world cash.",
        body:
          "As the agent creates bills, it’s constantly checking upcoming commitments, payroll, and known swings. Due dates become suggested payment dates that keep you inside covenants and out of the red.",
      },
      {
        id: "just-say-yes",
        title: "You approve the intent, not the data entry.",
        body:
          "In conversation, you confirm what matters — ‘Pay the regular suppliers, hold the rest until Thursday.’ The agent turns that intent into coded, scheduled bills, with an audit trail you can trust.",
      },
    ],
  },
];

function getHeroBySlug(slug: string): HeroConfig | undefined {
  return HEROES.find((hero) => hero.slug === slug);
}

export default function HeroDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const hero = useMemo(() => getHeroBySlug(slug), [slug]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (!hero) return;
    setActiveStepIndex(0);
  }, [hero]);

  useEffect(() => {
    if (!hero) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveStepIndex((prev) => {
          const next = prev + 1;
          if (next < hero.steps.length) return next;
          const currentIndex = HEROES.findIndex((h) => h.slug === hero.slug);
          const nextHero = HEROES[currentIndex + 1];
          if (nextHero) {
            router.push(`/app/heroes/${nextHero.slug}`);
          }
          return prev;
        });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveStepIndex((prev) => {
          const next = prev - 1;
          if (next >= 0) return next;
          const currentIndex = HEROES.findIndex((h) => h.slug === hero.slug);
          const prevHero = HEROES[currentIndex - 1];
          if (prevHero) {
            router.push(`/app/heroes/${prevHero.slug}`);
          }
          return prev;
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hero, router]);

  if (!hero) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="mx-auto max-w-md text-center text-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Bill Pay Agent
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Concept not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            This hero concept doesn&apos;t exist yet. Try one of the frames on the homepage.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-slate-800"
          >
            Back to heroes
          </button>
        </div>
      </main>
    );
  }

  const step = hero.steps[activeStepIndex];
  const isFirst = activeStepIndex === 0;
  const isLast = activeStepIndex === hero.steps.length - 1;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-slate-900">
              <span aria-hidden>←</span>
              <span className="font-medium">All frames</span>
            </Link>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {hero.label}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {hero.intro}
            </p>
          </div>
        </div>
      </header>

      {/* Main split layout */}
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-stretch">
        {/* Visual on the left */}
        <div className="flex flex-1 items-center justify-center">
          <Image
            src={hero.imageSrc}
            alt={hero.label}
            width={400}
            height={800}
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Divider */}
        <div className="mt-10 hidden w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:mt-0 lg:block" />

        {/* Narrative on the right */}
        <aside className="mt-10 flex w-full max-w-md flex-col justify-between gap-8 lg:mt-0 lg:w-[340px]">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {hero.visualLabel}
            </p>
            <h2 className="text-xl font-semibold leading-snug text-slate-900">
              {step.title}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {step.body}
            </p>
          </div>

          {/* Step navigation */}
          <div className="space-y-4 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex h-6 items-center justify-center rounded-full bg-slate-900 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white whitespace-nowrap">
                  Step {activeStepIndex + 1} of {hero.steps.length}
                </span>
                <span className="hidden sm:inline">
                  Use ← and → to walk through the moment.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((i) => Math.max(i - 1, 0))}
                  disabled={isFirst}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-white"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((i) => Math.min(i + 1, hero.steps.length - 1))}
                  disabled={isLast}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-900 text-white hover:bg-slate-800 disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-slate-900"
                  aria-label="Next step"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hero.steps.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    idx === activeStepIndex
                      ? "bg-slate-900"
                      : "bg-slate-200 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

