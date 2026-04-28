type HeroProps = {
  title: string;
  subtitle: string;
  cta: {
    href: string;
    label: string;
  };
};

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-white to-slate-100 px-6 py-16 shadow-sm sm:px-10 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            Pilot Program
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">{subtitle}</p>
          <div>
            <a
              href={cta.href}
              className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              {cta.label}
            </a>
          </div>
        </div>
        <div className="relative hidden h-full lg:block">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <dl className="relative grid gap-6 rounded-2xl border border-dashed border-primary/30 bg-white/80 p-8 text-sm text-slate-600 shadow-sm backdrop-blur">
            <div>
              <dt className="font-medium text-slate-500">Built with</dt>
              <dd className="text-base font-semibold text-slate-800">
                Cursor · GitHub · Local prototypes
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Why it matters</dt>
              <dd className="text-base">
                Designers become confident “builders” by practicing in real
                workflows and shipping small tools.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Current cohort</dt>
              <dd className="text-base font-semibold text-slate-800">
                November 2025 pilot · 6 designers
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute -right-10 top-10 hidden h-36 w-36 rounded-full bg-primary/10 blur-2xl lg:block" />
      <div className="absolute -bottom-12 left-8 hidden h-24 w-24 rounded-full bg-primary/20 blur-2xl lg:block" />
    </section>
  );
}

