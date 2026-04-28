"use client";

import * as React from "react";

import { PreviewWithSidePanel } from "@/components/PreviewWithSidePanel";

/**
 * Mount-only gate: preview UI uses XUI / portals that expect `document` during render.
 * Avoids `next/dynamic({ ssr: false })` lazy chunks that can leave the tab stuck on “Loading…”.
 */
export default function HomePageClient() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <p className="xui-text-minor" style={{ padding: 24 }}>
        Loading…
      </p>
    );
  }

  return <PreviewWithSidePanel />;
}
