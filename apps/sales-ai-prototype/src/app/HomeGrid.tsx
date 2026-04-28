"use client";

import Link from "next/link";
import { Suspense } from "react";

const CONCEPTS = [
  {
    id: "1",
    href: "/concept/1",
    image: "/heroes/agent-1.png",
    heading: "Predict",
    color: "#7c3aed",
    subtext: "Cash Flow Planner recommends what to pay and when based on cash and terms.",
  },
  {
    id: "2",
    href: "/concept/2",
    image: "/heroes/agent-2.png",
    heading: "Protect",
    color: "#B22222",
    subtext: "Bill Approval Protector flags anomalies and routes approvals so you sign off with confidence.",
  },
  {
    id: "3",
    href: "/concept/3",
    image: "/heroes/agent-3.png",
    heading: "Execute",
    color: "#2E9E47",
    subtext: "Just Pay: talk to your agent and have the right payments happen automatically.",
  },
] as const;

function HomeGridInner() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-8 items-start md:grid-cols-3">
          {CONCEPTS.map(({ id, href, image, heading, color, subtext }) => (
            <Link
              key={id}
              href={href}
              id={`concept-${id}`}
              className="scroll-mt-8 flex min-w-0 flex-col text-left group"
            >
              <div className="mb-5">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color }}>
                  {heading}
                </h3>
                <p className="text-sm text-[#616b7a] mt-2 leading-relaxed">
                  {subtext}
                </p>
              </div>
              <div className="overflow-hidden rounded-lg transition-shadow group-hover:ring-2 group-hover:ring-[#1F68DD] group-hover:ring-offset-2">
                <img src={image} alt={heading} className="w-full h-auto" />
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1F68DD] group-hover:underline">
                Open prototype <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function HomeGrid() {
  return (
    <Suspense fallback={null}>
      <HomeGridInner />
    </Suspense>
  );
}
