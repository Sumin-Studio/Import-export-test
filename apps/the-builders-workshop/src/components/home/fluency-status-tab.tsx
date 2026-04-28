"use client";

import { useState, useEffect } from "react";
import { StatusGrid } from "./status-grid";
import { StatusChangelog } from "./status-changelog";
import { updateLastLoginTime, getLastLoginTime } from "@/lib/session";
import { ViewToggle, type ViewType } from "./fluency-views/view-toggle";
import { StatsView } from "./fluency-views/stats-view";
import { GrowthView } from "./fluency-views/growth-view";

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

export function FluencyStatusTab() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSinceLastLogin, setShowSinceLastLogin] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("stats");

  useEffect(() => {
    // Update last login time on mount
    const currentLastLogin = getLastLoginTime();
    setLastLoginTime(currentLastLogin);
    updateLastLoginTime();

    // Fetch data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/milestones/all");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching status data:", err);
        setError(err instanceof Error ? err.message : "Failed to load status data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 py-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-neutral-900">Fluency Tracker</h2>
          <p className="mt-2 text-base text-neutral-600">
            Charts and graphs tracking how we&apos;re upskilling across the team.
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-8 py-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-neutral-900">Fluency Tracker</h2>
          <p className="mt-2 text-base text-neutral-600">
            Charts and graphs tracking how we&apos;re upskilling across the team.
          </p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            {error || "Failed to load status data. Please try refreshing the page."}
          </p>
        </div>
      </div>
    );
  }

  const changesSinceLastLogin = lastLoginTime
    ? data.changelog.filter((entry) => {
        const completedDate = new Date(entry.completedAt);
        const lastLoginDate = new Date(lastLoginTime);
        return completedDate > lastLoginDate;
      }).length
    : 0;

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-neutral-900">Fluency Tracker</h2>
          <p className="mt-2 text-base text-neutral-600">
            Charts and graphs tracking how we&apos;re upskilling across the team.
          </p>
        </div>
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />
      </div>

      {activeView === "stats" && <StatsView data={data} />}

      {activeView === "growth" && <GrowthView data={data} />}

      {activeView === "grid" && (
        <>
          {/* Since Last Login Banner */}
          {lastLoginTime && changesSinceLastLogin > 0 && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-900">
                  {changesSinceLastLogin} {changesSinceLastLogin === 1 ? "change" : "changes"} since your last login
                </p>
                <button
                  onClick={() => setShowSinceLastLogin(!showSinceLastLogin)}
                  className="text-sm font-medium text-blue-700 hover:text-blue-900 underline"
                >
                  {showSinceLastLogin ? "Show all" : "Show only new"}
                </button>
              </div>
            </div>
          )}

          {/* Status Grid */}
          <div className="space-y-4 overflow-visible">
            <div className="overflow-visible">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Activity Overview</h3>
              <StatusGrid users={data.completions} milestones={data.milestones} />
            </div>
          </div>

          {/* Changelog */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Changelog</h3>
              {lastLoginTime && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSinceLastLogin}
                    onChange={(e) => setShowSinceLastLogin(e.target.checked)}
                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
                  />
                  <span className="text-sm text-neutral-600">Show only since last login</span>
                </label>
              )}
            </div>
            <StatusChangelog
              entries={data.changelog}
              showSinceLastLogin={showSinceLastLogin}
              lastLoginTime={lastLoginTime}
            />
          </div>
        </>
      )}
    </div>
  );
}

