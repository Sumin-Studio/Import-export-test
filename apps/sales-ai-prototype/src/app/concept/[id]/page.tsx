import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { KeyboardNav } from "./keyboard-nav";
import BillPayPanel from "@/components/concepts/bill-pay-panel";
import Concept2WithLockScreen from "@/components/concepts/concept2-lock-screen";
import NoBillBillPayPanel from "@/components/concepts/no-bill-bill-pay-panel";

const concepts: Record<string, { title: string; component: ComponentType; screenBg: string }> = {
  "1": { title: "Cash Flow Planner", component: BillPayPanel, screenBg: "bg-[#f3f4f6]" },
  "2": { title: "Bill Approval Protector", component: Concept2WithLockScreen, screenBg: "bg-[#0d0d0f]" },
  "3": { title: "Just Pay", component: NoBillBillPayPanel, screenBg: "bg-[#1a5c2a]" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const concept = concepts[id];
  return {
    title: concept ? concept.title : "Concept",
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concept = concepts[id];

  if (!concept) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              ← Back
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-2xl font-bold text-foreground">Concept not found</h1>
          <p className="mt-2 text-muted-foreground">
            Concept {id} does not exist yet. Try one of:
          </p>
          <ul className="mt-2 space-y-1">
            {Object.entries(concepts).map(([key, c]) => (
              <li key={key}>
                <Link href={`/concept/${key}`} className="text-primary hover:underline">
                  /concept/{key}
                </Link>
                {" "}&mdash; {c.title}
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }

  const ConceptComponent = concept.component;
  const ids = Object.keys(concepts);
  const idx = ids.indexOf(id);
  const prevId = idx > 0 ? ids[idx - 1] : null;
  const nextId = idx < ids.length - 1 ? ids[idx + 1] : null;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back
          </Link>
          <h1 className="text-sm font-semibold text-slate-900">{concept.title}</h1>
          <div className="w-12" />
        </div>
      </header>
      <main className="flex items-start justify-center px-6 py-10">
        {/* Left arrow */}
        {prevId ? (
          <Link
            href={`/concept/${prevId}`}
            className="mt-[calc(50vh-100px)] mr-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Previous concept"
          >
            ←
          </Link>
        ) : (
          <div className="mt-[calc(50vh-100px)] mr-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/50 shadow-sm text-slate-200">
            ←
          </div>
        )}

        {/* iPhone frame */}
        <div
          className="relative flex-shrink-0"
          style={{ width: 390, height: "calc(100vh - 120px)" }}
        >
          {/* Outer shell */}
          <div className="absolute inset-0 rounded-[50px] bg-black shadow-2xl" />
          {/* Screen area with scroll */}
          <div
            className={`absolute overflow-y-auto rounded-[42px] ${concept.screenBg}`}
            style={{
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
            }}
          >
            <div style={{ paddingTop: 54 }} />
            <ConceptComponent />
          </div>
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-10"
            style={{ top: 14, width: 120, height: 34 }}
          />
        </div>

        {/* Right arrow */}
        {nextId ? (
          <Link
            href={`/concept/${nextId}`}
            className="mt-[calc(50vh-100px)] ml-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Next concept"
          >
            →
          </Link>
        ) : (
          <div className="mt-[calc(50vh-100px)] ml-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/50 shadow-sm text-slate-200">
            →
          </div>
        )}
      </main>
      <KeyboardNav prevId={prevId} nextId={nextId} />
    </div>
  );
}
