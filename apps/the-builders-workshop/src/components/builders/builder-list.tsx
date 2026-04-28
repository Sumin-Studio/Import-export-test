import type { Builder } from "@/lib/builders";
import { getBuilderMilestones, hasSequentialMilestones, getNextMilestone } from "@/lib/builders";

type BuilderListProps = {
  builders: Builder[];
};

export function BuilderList({ builders }: BuilderListProps) {
  // Filter out builders with non-sequential milestones
  const validBuilders = builders.filter(hasSequentialMilestones);

  return (
    <section
      id="builders"
      className="rounded-3xl border border-border bg-white px-6 py-12 shadow-sm sm:px-10 lg:px-16"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Pilot members
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            See each builder&apos;s progress through the milestones.
          </p>
        </div>
        
        <div className="space-y-4">
          {validBuilders.map((builder) => {
            const milestones = getBuilderMilestones(builder);
            const nextMilestone = getNextMilestone(builder);

            return (
              <div
                key={builder.slug}
                className="flex items-center gap-6 rounded-2xl border border-border bg-slate-50/80 p-5"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {builder.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-slate-900 truncate">
                      {builder.name}
                    </p>
                    <p className="text-sm text-slate-500 truncate">{builder.role}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 shrink-0 ml-auto">
                  <div className="flex items-center gap-2">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.key}
                        className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                          milestone.status === "completed"
                            ? "bg-green-400 border-green-500"
                            : "bg-white border-slate-300"
                        }`}
                        title={`${milestone.label}: ${milestone.status === "completed" ? "Completed" : "Pending"}`}
                      >
                        {milestone.status === "completed" && (
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  {nextMilestone && (
                    <p className="text-xs text-slate-600">
                      Next step: {nextMilestone.label}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

