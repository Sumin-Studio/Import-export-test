import { ProgressChart } from "@/components/progress/progress-chart";
import type { getMilestoneCompletion } from "@/lib/builders";

type ProgressOverviewProps = {
  milestones: ReturnType<typeof getMilestoneCompletion>;
};

export function ProgressOverview({ milestones }: ProgressOverviewProps) {
  return (
    <section
      id="progress"
      className="rounded-3xl border border-border bg-white px-6 py-12 shadow-sm sm:px-10 lg:px-16"
    >
      <div className="grid gap-10 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            Progress Tracker
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Skill milestones across the cohort
          </h2>
          <p className="text-base leading-relaxed text-slate-600">
            Each milestone reflects a real skill unlocked with Cursor, GitHub,
            or hosting workflows. The chart shows how the cohort is pacing as
            builders graduate from local prototypes to live tools.
          </p>
          <div className="rounded-2xl border border-dashed border-border bg-slate-50/80 p-6 text-sm text-slate-600">
            <p className="font-medium text-slate-500">Milestone definitions</p>
            <ul className="mt-3 space-y-2">
              {milestones.map((item) => (
                <li key={item.key} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 flex-none rounded-full bg-primary/70" />
                  <div>
                    <p className="font-medium text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <ProgressChart data={milestones} />
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="min-w-full divide-y divide-border/80">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold text-slate-600">
                  <th className="px-4 py-3">Skill</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">% Complete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm text-slate-600">
                {milestones.map((item) => (
                  <tr key={item.key} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {item.label}
                    </td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">
                      {item.percent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

