"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK = (
  <div className="min-h-[200px] flex items-center justify-center text-content-secondary text-sm">
    Chart unavailable in this browser
  </div>
);

interface ChartLoaderProps {
  importChart: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;
  className?: string;
  chartProps?: Record<string, unknown>;
}

/**
 * Loads a chart in useEffect so any load error (e.g. in Cursor's embedded browser)
 * is caught and a fallback is shown instead of crashing.
 */
export function ChartLoader({ importChart, className, chartProps }: ChartLoaderProps) {
  // Store the loaded component inside an object. Chart modules default-export a function
  // component; passing that function directly to useState would make React treat it as a
  // functional updater (React calls it with previous state), which throws at runtime.
  const [loaded, setLoaded] = useState<{
    Chart: React.ComponentType<Record<string, unknown>>;
  } | null>(null);
  const [failed, setFailed] = useState(false);
  // Parents pass inline `() => import(...)`, which is a new function every render. If that
  // identity is a useEffect dependency, the effect re-runs, cancels the in-flight import, and
  // charts never leave the loading placeholder.
  const importChartRef = useRef(importChart);
  importChartRef.current = importChart;

  useEffect(() => {
    let cancelled = false;
    importChartRef
      .current()
      .then((mod) => {
        const Chart = mod?.default;
        // Default export may be a plain function or a memo/forwardRef object (typeof "object").
        if (!cancelled && Chart != null) {
          setLoaded({ Chart });
        } else if (!cancelled) {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return FALLBACK;
  if (!loaded) return <div className={className} style={{ minHeight: 200 }} />;
  const { Chart } = loaded;
  return <Chart className={className} {...chartProps} />;
}
