"use client";

interface ChangelogEntry {
  userName: string;
  userEmail: string;
  milestoneKey: string;
  milestoneTitle: string;
  completedAt: string;
  type: "getting-started" | "builder";
}

interface StatusChangelogProps {
  entries: ChangelogEntry[];
  showSinceLastLogin?: boolean;
  lastLoginTime: string | null;
}

export function StatusChangelog({
  entries,
  showSinceLastLogin = false,
  lastLoginTime,
}: StatusChangelogProps) {
  // Filter entries if showing since last login
  const filteredEntries = showSinceLastLogin && lastLoginTime
    ? entries.filter((entry) => {
        const completedDate = new Date(entry.completedAt);
        const lastLoginDate = new Date(lastLoginTime);
        return completedDate > lastLoginDate;
      })
    : entries;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (filteredEntries.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
        <p className="text-sm text-neutral-600">
          {showSinceLastLogin
            ? "No changes since your last login."
            : "No completions yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
        <div className="divide-y divide-neutral-200">
          {filteredEntries.map((entry) => (
            <div
              key={`${entry.userName}-${entry.milestoneKey}-${entry.completedAt}`}
              className="px-6 py-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-neutral-900">
                    <span className="font-semibold">{entry.userName}</span>
                    {" completed "}
                    <span className="font-medium">{entry.milestoneTitle}</span>
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {formatFullDate(entry.completedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      entry.type === "getting-started"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {entry.type === "getting-started" ? "Getting Started" : "Builder"}
                  </span>
                  <span className="text-xs text-neutral-400">{formatDate(entry.completedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



