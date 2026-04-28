"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type ReleaseStage = "closedBeta" | "beta" | "ga";

export interface DupeConfig {
  /** Closed Beta / Beta = no list Protect hub; bill alert + legacy dupes. GA = list action centre + combined CTA on detail unless pin is on */
  releaseStage: ReleaseStage;
  /**
   * Bill detail only. Controls where the Protect alert sits:
   * - "top": full-width top banner under the header (prototype 6 detail)
   * - "middle": detached alert above Payments (Closed Beta default)
   * - "cta" (bottom): fused with the primary CTA / Payments section (Open Beta / GA default)
   * - "legacy": match production — quickview from All tab hides CTAs and defers the primary workflow to the full page
   *
   * Bills list always uses a separate Protect card above the list.
   */
  detailPlacement?: "top" | "middle" | "cta" | "legacy";
  /**
   * Legacy flag for pin-to-top behaviour; kept for backward compatibility with saved configs.
   * New UIs should prefer `detailPlacement`.
   */
  optInListBannerTop: boolean;
  allowDismiss: boolean;
  displayMode: "color" | "grayscale" | "highlight";
  /** When true, duplicate risks use Xero Protect action centre; legacy duplicate list banner + duplicate review entry hidden. */
  dupeUnification: boolean;
  /** GA list: “Since you last logged in…” summary strip + action centre card above the bills table. */
  showSummaryBanner: boolean;
}

interface DupeOptionContextValue {
  config: DupeConfig;
  setConfig: (c: Partial<DupeConfig>) => void;
}

const DEFAULT_CONFIG: DupeConfig = {
  releaseStage: "ga",
  detailPlacement: "cta",
  optInListBannerTop: false,
  allowDismiss: true,
  displayMode: "color",
  // Duplicates are always unified into Xero Protect in this prototype
  dupeUnification: true,
  showSummaryBanner: true,
};

/** Strip legacy keys from older localStorage saves */
function sanitizeLoaded(raw: Record<string, unknown>): Partial<DupeConfig> {
  const allowed: (keyof DupeConfig)[] = [
    "releaseStage",
    "detailPlacement",
    "optInListBannerTop",
    "allowDismiss",
    "displayMode",
    "dupeUnification",
    "showSummaryBanner",
  ];
  const out: Partial<DupeConfig> = {};
  for (const k of allowed) {
    if (k in raw && raw[k] !== undefined) {
      (out as Record<string, unknown>)[k] = raw[k];
    }
  }
  // Prototype 9 is GA-only in this phase, regardless of persisted config.
  out.releaseStage = "ga";
  return out;
}

const DupeOptionContext = createContext<DupeOptionContextValue>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
});

/** Shared with prototype 7 so list/detail dupes banners and gear toggles stay identical between routes. */
const STORAGE_KEY = "xero-protect-p7-config";
/** One-time: pin-to-top was persisted on; policy is off by default — reset once and rewrite storage. */
const PIN_TOP_DEFAULT_OFF_MIGRATION = "xero-protect-p7-pin-top-default-off-v1";

function loadConfig(): DupeConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Record<string, unknown>;
      const { showRowHover: _removed, ...rest } = parsed;
      void _removed;
      let merged: DupeConfig = { ...DEFAULT_CONFIG, ...sanitizeLoaded(rest) };
      if (localStorage.getItem(PIN_TOP_DEFAULT_OFF_MIGRATION) !== "1") {
        merged = { ...merged, optInListBannerTop: false };
        localStorage.setItem(PIN_TOP_DEFAULT_OFF_MIGRATION, "1");
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
          /* ignore */
        }
      }
      return merged;
    }
    localStorage.setItem(PIN_TOP_DEFAULT_OFF_MIGRATION, "1");
  } catch {
    /* ignore */
  }
  return DEFAULT_CONFIG;
}

export function DupeOptionProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<DupeConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    setConfigState(loadConfig());
  }, []);

  const setConfig = (partial: Partial<DupeConfig>) =>
    setConfigState((prev) => {
      const next = { ...prev, ...partial, releaseStage: "ga" as const };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });

  return (
    <DupeOptionContext.Provider value={{ config, setConfig }}>
      {children}
    </DupeOptionContext.Provider>
  );
}

export function useDupeOption() {
  return useContext(DupeOptionContext);
}
