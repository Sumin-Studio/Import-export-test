"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

interface Milestone {
  key: string;
  title: string;
  type: "getting-started" | "builder";
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

interface GrowthViewProps {
  data: ApiResponse;
}

interface DataPoint {
  date: string;
  total: number;
}

function buildCumulativeData(data: ApiResponse): DataPoint[] {
  // Collect all completion dates
  const allDates: string[] = [];
  for (const user of data.completions) {
    for (const c of user.completions) {
      allDates.push(c.completedAt);
    }
  }

  if (allDates.length === 0) return [];

  // Group by day and count
  const dayCounts = new Map<string, number>();
  for (const dateStr of allDates) {
    const day = new Date(dateStr).toISOString().split("T")[0];
    dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
  }

  // Sort days chronologically
  const sortedDays = Array.from(dayCounts.keys()).sort();

  // Build cumulative
  let cumulative = 0;
  return sortedDays.map((day) => {
    cumulative += dayCounts.get(day)!;
    return { date: day, total: cumulative };
  });
}

function formatXAxisDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function GrowthView({ data }: GrowthViewProps) {
  const chartData = buildCumulativeData(data);

  if (chartData.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
        <p className="text-sm text-neutral-600">No completion data to graph yet.</p>
      </div>
    );
  }

  const totalCompletions = chartData[chartData.length - 1].total;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-baseline justify-between mb-4">
          <h4 className="text-sm font-semibold text-neutral-900">
            Cumulative Skills Learned
          </h4>
          <span className="text-sm text-neutral-500">
            {totalCompletions} total
          </span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxisDate}
                tick={{ fontSize: 12, fill: "#737373" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e5e5" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#737373" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e5e5" }}
                allowDecimals={false}
              />
              <Tooltip
                labelFormatter={(label: string) => formatXAxisDate(label)}
                formatter={(value: number) => [value, "Completions"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  fontSize: "13px",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--brand)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--brand)", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "var(--brand)", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
