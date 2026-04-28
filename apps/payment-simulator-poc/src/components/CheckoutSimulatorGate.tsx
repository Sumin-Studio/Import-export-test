"use client";

import * as React from "react";

import { CheckoutSimulator } from "@/components/CheckoutSimulator";

/**
 * Mount-only gate (same idea as `HomePageClient`): avoids `next/dynamic({ ssr: false })`
 * lazy chunks that can leave the tab stuck on “Loading…”, and keeps XUI off SSR render.
 */
export function CheckoutSimulatorGate() {
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

  return <CheckoutSimulator />;
}
