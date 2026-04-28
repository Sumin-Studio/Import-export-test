"use client";

import type { MarketingEntryId } from "./types";
import { FakeXeroMarketingEntry } from "./fake-xero-com/FakeXeroMarketingEntry";

/**
 * Which shell to render on `/`. Set `NEXT_PUBLIC_MARKETING_ENTRY` to switch or disable.
 * To remove marketing entirely, point `app/page.tsx` at `HomePageClient` (or another route).
 */
function getEntryId(): MarketingEntryId {
  const v = process.env.NEXT_PUBLIC_MARKETING_ENTRY?.trim();
  if (v === "none") {
    return "none";
  }
  return "fake-xero-com";
}

/** Minimal fallback when the marketing shell is turned off — keeps `/` usable in dev. */
function MarketingDisabledStub() {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        color: "#5c6c80",
      }}
    >
      <p style={{ margin: 0, maxWidth: 420, textAlign: "center" }}>
        Marketing entry is disabled (
        <code>NEXT_PUBLIC_MARKETING_ENTRY=none</code>). Open the{" "}
        <a href="/preview" style={{ color: "#0071c2", fontWeight: 600 }}>
          checkout preview
        </a>{" "}
        directly.
      </p>
    </div>
  );
}

export function ActiveMarketingEntry() {
  const id = getEntryId();
  switch (id) {
    case "none":
      return <MarketingDisabledStub />;
    case "fake-xero-com":
    default:
      return <FakeXeroMarketingEntry />;
  }
}
