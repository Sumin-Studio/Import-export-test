import type { ReactNode } from "react";

type TwoColumnSectionProps = {
  overline?: string;
  title: string;
  left: ReactNode;
  right: ReactNode;
};

export function TwoColumnSection({
  overline,
  title,
  left,
  right,
}: TwoColumnSectionProps) {
  return (
    <section className="rounded-3xl border border-border bg-white px-6 py-12 shadow-sm sm:px-10 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {overline ? (
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              {overline}
            </span>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-slate-600">
            {left}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3 rounded-2xl border border-dashed border-border bg-slate-50/80 p-6 text-slate-600">
            {right}
          </div>
        </div>
      </div>
    </section>
  );
}

