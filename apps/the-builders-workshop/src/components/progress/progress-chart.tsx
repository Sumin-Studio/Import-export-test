 "use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProgressChartProps = {
  data: Array<{
    key: string;
    label: string;
    percent: number;
  }>;
};

type ChartDatum = {
  label: string;
  percent: number;
};

export function ProgressChart({ data }: ProgressChartProps) {
  const chartData = useMemo<ChartDatum[]>(
    () =>
      data.map((item) => ({
        label: item.label,
        percent: item.percent,
      })),
    [data],
  );

  return (
    <div className="space-y-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Team completion
        </p>
        <p className="text-sm text-primary/80">
          Snapshot of milestone progress · updates weekly
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" barSize={18}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="rgba(11, 114, 133, 0.08)"
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#0b7285" }}
            />
            <YAxis
              type="category"
              width={160}
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#0d1b2a" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(11, 114, 133, 0.08)" }}
              formatter={(value: number) => [`${value}% complete`, "Milestone"]}
              labelStyle={{ color: "#0d1b2a", fontWeight: 600 }}
              wrapperStyle={{
                borderRadius: "12px",
                border: "1px solid rgba(11, 114, 133, 0.2)",
                background: "#ffffff",
                boxShadow:
                  "0 12px 30px -12px rgba(13, 27, 42, 0.2), 0 6px 18px -6px rgba(13, 27, 42, 0.1)",
              }}
            />
            <Bar
              dataKey="percent"
              radius={[12, 12, 12, 12]}
              fill="#0b7285"
              background={{ fill: "rgba(11, 114, 133, 0.12)", radius: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

