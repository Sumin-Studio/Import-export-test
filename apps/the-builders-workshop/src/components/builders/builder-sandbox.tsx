import type { Builder } from "@/lib/builders";

type BuilderSandboxProps = {
  builder: Builder;
};

export function BuilderSandbox({ builder }: BuilderSandboxProps) {
  return (
    <section className="rounded-3xl border border-border bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-16">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Sandbox notes
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Quick reflections, prototype highlights, and resources they&apos;re
            collecting during the cohort.
          </p>
        </div>
        <article className="prose prose-slate max-w-none">
          {builder.notes ? (
            builder.notes.split("\n\n").map((paragraph, index) => (
              <p key={`${builder.slug}-note-${index}`}>{paragraph}</p>
            ))
          ) : (
              <p className="text-sm text-slate-500">
                Notes coming soon—check back after their next milestone update.
              </p>
          )}
        </article>
      </div>
    </section>
  );
}

