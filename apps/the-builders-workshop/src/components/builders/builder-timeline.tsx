import {
  getBuilderMilestones,
  getLastUpdatedForBuilder,
  type Builder,
} from "@/lib/builders";

type BuilderTimelineProps = {
  builder: Builder;
};

export function BuilderTimeline({ builder }: BuilderTimelineProps) {
  const milestones = getBuilderMilestones(builder);
  const completedMilestones = milestones.filter(
    (milestone) => milestone.status === "completed",
  );
  const lastUpdated = getLastUpdatedForBuilder(builder);

  return (
    <section className="space-y-8 rounded-3xl border border-border bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Builder timeline
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Milestone dates track meaningful moments in the cohort—setting up the
            environment, shipping the first commit, and getting prototypes into
            teammates&apos; hands.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {completedMilestones.length > 0 ? (
            completedMilestones.map((milestone) => (
              <span
                key={milestone.key}
                className="rounded-full bg-primary/10 px-3 py-1 text-primary"
              >
                {milestone.label}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-500">
              No milestones completed yet
            </span>
          )}
        </div>
      </div>

      <ol className="relative space-y-6 border-s-2 border-dashed border-primary/30 ps-6">
        {milestones.map((milestone) => (
          <li key={milestone.key} className="relative">
            <span
              className={`absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                milestone.status === "completed"
                  ? "border-primary bg-primary"
                  : "border-primary/40 bg-white"
              }`}
            >
              <span className="sr-only">{milestone.status}</span>
            </span>
            <div className="rounded-2xl border border-border bg-slate-50/80 px-4 py-3">
              <p className="text-sm font-semibold text-slate-800">
                {milestone.label}
              </p>
              <p className="text-xs text-slate-500">{milestone.description}</p>
              <p className="mt-2 text-xs font-medium text-primary">
                {milestone.date
                  ? new Date(milestone.date).toLocaleDateString()
                  : "In progress"}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-dashed border-border bg-slate-50/70 px-5 py-4 text-xs text-slate-500">
        <p>
          {lastUpdated
            ? `Last updated ${new Date(lastUpdated).toLocaleDateString()}`
            : "No milestones logged yet"}
        </p>
      </div>
    </section>
  );
}

