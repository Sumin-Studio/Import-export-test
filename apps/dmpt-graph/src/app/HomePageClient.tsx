"use client";

import dynamic from "next/dynamic";

const RadarApp = dynamic(() => import("@/components/RadarApp").then((m) => m.RadarApp), {
  ssr: false,
  loading: () => (
    <main style={{ padding: "2rem", color: "var(--text)", background: "var(--bg-app)" }}>
      Loading graph…
    </main>
  ),
});

export function HomePageClient({ jiraBrowseBase }: { jiraBrowseBase: string }) {
  return <RadarApp jiraBrowseBase={jiraBrowseBase} />;
}
