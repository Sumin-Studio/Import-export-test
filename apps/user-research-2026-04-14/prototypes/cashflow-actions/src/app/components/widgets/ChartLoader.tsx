"use client";

import { useEffect, useState } from "react";

const FALLBACK = (
  <div className="min-h-[200px] flex items-center justify-center text-content-secondary text-sm">
    Chart unavailable in this browser
  </div>
);

interface ChartLoaderProps {
  importChart: () => Promise<{ default: React.ComponentType<{ className?: string }> }>;
  className?: string;
}

/**
 * Loads a chart in useEffect so any load error (e.g. in Cursor's embedded browser)
 * is caught and a fallback is shown instead of crashing.
 */
export function ChartLoader({ importChart, className }: ChartLoaderProps) {
  const [Chart, setChart] = useState<React.ComponentType<{ className?: string }> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    importChart()
      .then((mod) => {
        if (!cancelled) setChart(() => mod.default);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [importChart]);

  if (failed) return FALLBACK;
  if (!Chart) return <div className={className} style={{ minHeight: 200 }} />;
  return <Chart className={className} />;
}
