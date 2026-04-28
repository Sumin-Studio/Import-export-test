import type { Metadata } from "next";
import Link from "next/link";
import { HomeGrid } from "../HomeGrid";

export const metadata: Metadata = {
  title: "February pitch",
  description: "Archived concept frames from the February bill pay agent pitch.",
};

export default function FebruaryPitchPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#1e3145]">
      <header className="border-b border-white/20 bg-[linear-gradient(135deg,#173d78_0%,#1f68dd_44%,#7c3aed_100%)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Archived Pitch Material
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                The February Pitch
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                These are the original concept frames used to tell the early Predict, Protect, and
                Execute story before the repo shifted into a broader multi-agent workspace.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15"
            >
              Back to hub
            </Link>
          </div>
        </div>
      </header>

      <HomeGrid />
    </main>
  );
}
