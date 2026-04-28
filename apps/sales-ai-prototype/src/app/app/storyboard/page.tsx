import type { Metadata } from "next";
import Link from "next/link";
import { getBeatsBySection, getScreenBeatsByConcept, storyboardBeats } from "@/walkthrough/data/storyboard-beats";

export const metadata: Metadata = {
  title: "Storyboard",
  description: "Story beats for the Bill Pay Agent narrative. Background thinking and the actual screens. Click any beat for full screen.",
};

export default function StoryboardPage() {
  const sections = getBeatsBySection();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">
            Storyboard <span className="font-normal text-slate-500">({storyboardBeats.length} screens)</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Story beats we&apos;ll use for the narrative. Click any card for full screen. Use left/right arrows in full screen to move.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {sections.map(({ sectionId, sectionTitle, beats }) => (
          <section key={sectionId} className="mb-12">
            <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-slate-500">
              {sectionTitle}
            </h2>
            {sectionId === "screens" ? (
              getScreenBeatsByConcept().map(({ conceptId, conceptTitle, beats: conceptBeats }) => (
                <div key={conceptId} className="mb-10 last:mb-0">
                  <h3 className="mb-3 text-sm font-semibold text-slate-600">
                    {conceptTitle}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {conceptBeats.map((beat) => (
                      <Link
                        key={beat.id}
                        href={`/app/storyboard/${beat.id}`}
                        className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1F68DD] focus:ring-offset-2"
                      >
                        <span className="text-xs font-medium text-slate-400">
                          Beat {beat.order}
                        </span>
                        <h4 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-[#1F68DD]">
                          {beat.title}
                        </h4>
                        {beat.subtitle && (
                          <p className="mt-1 text-sm text-slate-500">{beat.subtitle}</p>
                        )}
                        <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                          {beat.body}
                        </p>
                        <span className="mt-3 text-xs font-medium text-[#1F68DD] group-hover:underline">
                          View full screen →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {beats.map((beat) => (
                  <Link
                    key={beat.id}
                    href={`/app/storyboard/${beat.id}`}
                    className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1F68DD] focus:ring-offset-2"
                  >
                    <span className="text-xs font-medium text-slate-400">
                      Beat {beat.order}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-[#1F68DD]">
                      {beat.title}
                    </h3>
                    {beat.subtitle && (
                      <p className="mt-1 text-sm text-slate-500">{beat.subtitle}</p>
                    )}
                    <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                      {beat.body}
                    </p>
                    <span className="mt-3 text-xs font-medium text-[#1F68DD] group-hover:underline">
                      View full screen →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
          <Link href="/app/walkthrough/1" className="hover:text-slate-900">
            Walkthrough
          </Link>
          <span aria-hidden>·</span>
          <Link href="/app/story/1" className="hover:text-slate-900">
            Diya Review
          </Link>
          <span aria-hidden>·</span>
          <Link href="/app/process" className="hover:text-slate-900">
            The process
          </Link>
        </div>
      </main>
    </div>
  );
}
