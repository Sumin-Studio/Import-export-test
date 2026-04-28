"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CHART_COLORS = {
  ready: "var(--color-sentiment-positive-foreground)",
  action_required: "var(--color-sentiment-warning-foreground)",
  blocked: "var(--color-sentiment-negative-foreground)",
  primary: "var(--color-action-default)",
  grid: "var(--color-border-subtle)",
  text: "var(--color-text-default)",
  textMuted: "var(--color-text-muted)",
};

const datavizPalette = [
  "var(--color-dataviz-tonal-fill-04)",
  "var(--color-dataviz-tonal-fill-05)",
  "var(--color-dataviz-tonal-fill-06)",
  "var(--color-dataviz-tonal-fill-07)",
  "var(--color-dataviz-tonal-fill-08)",
];

interface ReadinessDonutProps {
  data: { name: string; value: number; tier: "ready" | "action_required" | "blocked" }[];
}

export function ReadinessDonutChart({ data }: ReadinessDonutProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const displayData = data.map((d) => ({
    ...d,
    fill: CHART_COLORS[d.tier],
    label: `${d.name}: ${d.value}`,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <Pie
          data={displayData}
          cx="50%"
          cy="50%"
          innerRadius={56}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {displayData.map((entry, i) => (
            <Cell key={entry.name} fill={entry.fill} stroke="var(--color-background-primary)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background-primary)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
          labelStyle={{ color: "var(--color-text-default)" }}
          formatter={(value) => [Number(value ?? 0), ""]}
          labelFormatter={(name) => `${name}: ${((displayData.find((d) => d.name === name)?.value ?? 0) / total * 100).toFixed(0)}%`}
        />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill={CHART_COLORS.text} style={{ fontSize: "24px", fontWeight: 700 }}>
          {total}
        </text>
        <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill={CHART_COLORS.textMuted} style={{ fontSize: "11px" }}>
          clients
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}

interface DeadlinesByWeekProps {
  data: { week: string; count: number; fullLabel: string }[];
}

export function DeadlinesByWeekChart({ data }: DeadlinesByWeekProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 24, left: 8 }} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
        <XAxis
          dataKey="week"
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: CHART_COLORS.grid }}
        />
        <YAxis
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          width={24}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background-primary)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
          labelStyle={{ color: "var(--color-text-default)" }}
          formatter={(value) => [Number(value ?? 0), "clients"]}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.fullLabel ?? ""}
        />
        <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} name="Clients" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface TeamWorkloadBarProps {
  data: { name: string; complete: number; incomplete: number }[];
}

export function TeamWorkloadBarChart({ data }: TeamWorkloadBarProps) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(140, data.length * 44)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
        barSize={20}
        barGap={4}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: CHART_COLORS.grid }}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background-primary)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
          formatter={(value, name) => [Number(value ?? 0), name === "complete" ? "Ready" : "Incomplete"]}
        />
        <Legend
          wrapperStyle={{ fontSize: "11px" }}
          formatter={(value) => (value === "complete" ? "Ready" : "Incomplete")}
          iconType="square"
          iconSize={10}
        />
        <Bar dataKey="complete" stackId="a" fill="var(--color-sentiment-positive-foreground)" radius={[0, 4, 4, 0]} name="complete" />
        <Bar dataKey="incomplete" stackId="a" fill="var(--color-sentiment-warning-foreground)" radius={[0, 4, 4, 0]} name="incomplete" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface ServiceLineBarProps {
  data: { service: string; count: number; incomplete: number }[];
}

export function ServiceLineChart({ data }: ServiceLineBarProps) {
  const chartData = data.map((d) => ({ ...d, complete: d.count - d.incomplete }));
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 24, left: 8 }} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
        <XAxis
          dataKey="service"
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: CHART_COLORS.grid }}
        />
        <YAxis
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          width={24}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background-primary)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
          formatter={(value, name) => [Number(value ?? 0), name === "incomplete" ? "Need attention" : "Ready"]}
        />
        <Bar dataKey="complete" stackId="svc" fill="var(--color-sentiment-positive-foreground)" radius={[4, 4, 0, 0]} name="complete" />
        <Bar dataKey="incomplete" stackId="svc" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} name="incomplete" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Time summary: stacked bar (billable, non-billable, capacity) by day. Your overview style. */
export interface TimeSummaryDay {
  day: string;
  billable: number;
  nonBillable: number;
  capacity: number;
}

export function TimeSummaryBarChart({ data }: { data: TimeSummaryDay[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 24, left: 8 }} barSize={24} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: CHART_COLORS.grid }}
        />
        <YAxis
          tick={{ fill: CHART_COLORS.textMuted, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          width={24}
          domain={[0, "dataMax + 2"]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background-primary)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius)",
            fontSize: "12px",
          }}
          formatter={(value, name) => [Number(value ?? 0), name === "billable" ? "Billable" : name === "nonBillable" ? "Non-billable" : "Capacity"]}
        />
        <Legend wrapperStyle={{ fontSize: "11px" }} iconType="circle" iconSize={8} formatter={(v) => (v === "billable" ? "Billable" : v === "nonBillable" ? "Non-billable" : "Capacity")} />
        <Bar dataKey="capacity" stackId="time" fill="var(--color-border-soft)" radius={[4, 4, 0, 0]} name="capacity" />
        <Bar dataKey="nonBillable" stackId="time" fill="var(--color-sentiment-negative-foreground)" radius={[0, 0, 0, 0]} name="nonBillable" />
        <Bar dataKey="billable" stackId="time" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} name="billable" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Billable hours donut: center label (e.g. 7h), expected/entered text. Your overview style. */
export function BillableHoursDonut({ enteredHours, expectedHours }: { enteredHours: number; expectedHours: number }) {
  const filled = Math.min(enteredHours, expectedHours);
  const over = Math.max(0, enteredHours - expectedHours);
  const remaining = Math.max(0, expectedHours - enteredHours);
  const data = [
    { name: "Entered", value: filled, fill: CHART_COLORS.primary },
    ...(over > 0 ? [{ name: "Over", value: over, fill: "var(--color-sentiment-positive-foreground)" }] : []),
    { name: "Remaining", value: remaining, fill: "var(--color-border-soft)" },
  ].filter((d) => d.value > 0) as { name: string; value: number; fill: string }[];
  if (data.length === 0) data.push({ name: "None", value: 1, fill: "var(--color-border-soft)" });
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative inline-flex items-center justify-center">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={56}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={entry.fill} stroke="var(--color-background-primary)" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="absolute inset-0 flex items-center justify-center text-data-large-bold tabular-nums text-text-default">
          {enteredHours}h
        </span>
      </div>
      <div className="text-center space-y-0.5">
        <p className="text-body-small-regular text-text-muted">Expected billable hours: {expectedHours}h</p>
        <p className="text-body-small-regular text-text-default">Entered billable hours: {enteredHours}h</p>
      </div>
    </div>
  );
}
