"use client";

interface Milestone {
  key: string;
  title: string;
  type: "getting-started" | "builder";
}

interface User {
  id: string;
  name: string;
  email: string;
  type: "supabase" | "builder";
}

interface Completion {
  milestoneKey: string;
  milestoneTitle: string;
  completedAt: string;
  type: "getting-started" | "builder";
}

interface UserWithCompletions extends User {
  completions: Completion[];
}

interface ChangelogEntry {
  userName: string;
  userEmail: string;
  milestoneKey: string;
  milestoneTitle: string;
  completedAt: string;
  type: "getting-started" | "builder";
}

interface ApiResponse {
  users: User[];
  milestones: Milestone[];
  completions: UserWithCompletions[];
  changelog: ChangelogEntry[];
}

interface StatsViewProps {
  data: ApiResponse;
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function StatsView({ data }: StatsViewProps) {
  const totalPeople = data.completions.length;
  const totalCompletions = data.completions.reduce(
    (sum, user) => sum + user.completions.length,
    0
  );
  const totalMilestones = data.milestones.length;
  const avgProgress = totalPeople > 0 ? totalCompletions / totalPeople : 0;
  const avgPercent = totalMilestones > 0 ? (avgProgress / totalMilestones) * 100 : 0;

  // Per-milestone counts
  const milestoneCounts = data.milestones.map((milestone) => {
    const count = data.completions.filter((user) =>
      user.completions.some((c) => c.milestoneKey === milestone.key)
    ).length;
    return { ...milestone, count };
  });

  // Per-person progress, sorted by completions descending
  const personProgress = data.completions
    .map((user) => ({
      name: user.name,
      completed: user.completions.length,
    }))
    .sort((a, b) => b.completed - a.completed);

  // Recent activity (last 5)
  const recentActivity = data.changelog.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">People Tracking</p>
          <p className="mt-1 text-3xl font-semibold text-neutral-900">{totalPeople}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Skills Completed</p>
          <p className="mt-1 text-3xl font-semibold text-neutral-900">{totalCompletions}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Avg. Progress</p>
          <p className="mt-1 text-3xl font-semibold text-neutral-900">
            {avgProgress.toFixed(1)}
            <span className="text-lg text-neutral-400">/{totalMilestones}</span>
          </p>
          <p className="text-sm text-neutral-400">{avgPercent.toFixed(0)}%</p>
        </div>
      </div>

      {/* Milestone breakdown */}
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-neutral-900 mb-4">Milestone Completion</h4>
        <div className="space-y-3">
          {milestoneCounts.map((m) => (
            <div key={m.key}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-neutral-700 truncate mr-2">{m.title}</span>
                <span className="text-neutral-500 shrink-0">
                  {m.count}/{totalPeople}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-100">
                <div
                  className="h-2 rounded-full bg-brand transition-all"
                  style={{
                    width: `${totalPeople > 0 ? (m.count / totalPeople) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Person breakdown */}
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-neutral-900 mb-4">Per-Person Progress</h4>
        <div className="space-y-3">
          {personProgress.map((person) => (
            <div key={person.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-neutral-700 font-medium">{person.name}</span>
                <span className="text-neutral-500">
                  {person.completed}/{totalMilestones}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-100">
                <div
                  className="h-2 rounded-full bg-brand transition-all"
                  style={{
                    width: `${totalMilestones > 0 ? (person.completed / totalMilestones) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      {recentActivity.length > 0 && (
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-neutral-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity.map((entry) => (
              <div
                key={`${entry.userName}-${entry.milestoneKey}-${entry.completedAt}`}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <p className="text-neutral-700">
                  <span className="font-medium">{entry.userName}</span>
                  {" completed "}
                  <span className="font-medium">{entry.milestoneTitle}</span>
                </p>
                <span className="text-neutral-400 shrink-0">
                  {formatRelativeDate(entry.completedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
