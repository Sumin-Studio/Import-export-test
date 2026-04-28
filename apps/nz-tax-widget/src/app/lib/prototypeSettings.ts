/**
 * Prototype demo controls (pipeline stage, display modes). Persisted in localStorage on the client.
 */

export const PROTOTYPE_SETTINGS_STORAGE_KEY = "nz-tax-widget-prototype-settings";

export type PrototypeStageId = "xpac" | "ga" | "ai" | "tailor";

/** Pipeline copy variant for tax charts and tables (i2 removed; prototype is XPAC-shaped). */
export type PipelineStageId = "xpac";

export type PrototypeDisplayMode = "color" | "grayscale" | "highlight";

/** Dashboard widget filter: tax overview tiles only, or full overview. */
export type PrototypeWidgetScope = "tax" | "all";

export interface PrototypeSettingsState {
  stage: PrototypeStageId;
  displayMode: PrototypeDisplayMode;
  widgetScope: PrototypeWidgetScope;
  /**
   * NZ Tailor: after a successful tax submit, the full tax grid is shown while `stage`
   * stays `tailor` (no jump to GA).
   */
  tailorNzTaxDashboardRevealed: boolean;
}

export const DEFAULT_PROTOTYPE_SETTINGS: PrototypeSettingsState = {
  /** Default landing: GA (region defaults to NZ via cookie / middleware). */
  stage: "ga",
  displayMode: "color",
  /** Prototype settings → Widgets → “All” (full overview); not “Tax”. */
  widgetScope: "all",
  tailorNzTaxDashboardRevealed: false,
};

const STAGES = new Set<PrototypeStageId>(["xpac", "ga", "ai", "tailor"]);
const DISPLAY_MODES = new Set<PrototypeDisplayMode>([
  "color",
  "grayscale",
  "highlight",
]);

const WIDGET_SCOPES = new Set<PrototypeWidgetScope>(["tax", "all"]);

export function parsePrototypeSettings(
  raw: string | null
): PrototypeSettingsState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PrototypeSettingsState>;
    if (
      typeof parsed.stage === "string" &&
      typeof parsed.displayMode === "string" &&
      DISPLAY_MODES.has(parsed.displayMode as PrototypeDisplayMode)
    ) {
      let stageId = parsed.stage as string;
      if (stageId === "i2") stageId = "xpac";
      if (!STAGES.has(stageId as PrototypeStageId)) {
        return null;
      }
      const ws = parsed.widgetScope;
      const widgetScope: PrototypeWidgetScope =
        typeof ws === "string" && WIDGET_SCOPES.has(ws as PrototypeWidgetScope)
          ? (ws as PrototypeWidgetScope)
          : "all";
      const tailorNzTaxDashboardRevealed =
        typeof parsed.tailorNzTaxDashboardRevealed === "boolean"
          ? parsed.tailorNzTaxDashboardRevealed
          : false;
      return {
        stage: stageId as PrototypeStageId,
        displayMode: parsed.displayMode as PrototypeDisplayMode,
        widgetScope,
        tailorNzTaxDashboardRevealed,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function serializePrototypeSettings(
  state: PrototypeSettingsState
): string {
  return JSON.stringify(state);
}

/**
 * Read persisted stage synchronously (e.g. dashboard hidden-widget defaults on first paint).
 * Matches what {@link PrototypeSettingsProvider} applies after hydration.
 */
export function readInitialPrototypeStage(): PrototypeStageId {
  if (typeof window === "undefined") {
    return DEFAULT_PROTOTYPE_SETTINGS.stage;
  }
  const saved = parsePrototypeSettings(
    localStorage.getItem(PROTOTYPE_SETTINGS_STORAGE_KEY)
  );
  return saved?.stage ?? DEFAULT_PROTOTYPE_SETTINGS.stage;
}

/** Full prototype settings for synchronous first paint (e.g. hidden-widget defaults). */
export function readInitialPrototypeSettings(): PrototypeSettingsState {
  if (typeof window === "undefined") {
    return DEFAULT_PROTOTYPE_SETTINGS;
  }
  const saved = parsePrototypeSettings(
    localStorage.getItem(PROTOTYPE_SETTINGS_STORAGE_KEY)
  );
  return saved ?? DEFAULT_PROTOTYPE_SETTINGS;
}

/**
 * Map demo-only stages to pipeline copy. The prototype no longer exposes i2; all
 * product surfaces use the XPAC-shaped pipeline (including Agentic, GA, and Tailor).
 */
export function effectivePipelineStage(
  _stage: PrototypeStageId
): PipelineStageId {
  return "xpac";
}
