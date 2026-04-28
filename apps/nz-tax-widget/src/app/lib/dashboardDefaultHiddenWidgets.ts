import {
  NZ_DEFAULT_HIDDEN_WIDGET_IDS,
  NZ_TAX_INSIGHT_WIDGET_IDS,
  NZ_TAX_INSIGHT_WIDGET_ID_SET,
  NZ_XPAC_DEFAULT_EXTRA_HIDDEN_WIDGET_IDS,
} from "@/app/lib/nzDashboardCanonical";
import {
  effectivePipelineStage,
  type PrototypeStageId,
} from "@/app/lib/prototypeSettings";
import { TAX_BETA_WIDGET_IDS } from "@/app/lib/taxBetaWidgetIds";

/** NZ insight tiles appear on the draggable grid after GA, or on Tailor once the tax grid is revealed. */
export function nzInsightsUnlockedOnNzGrid(
  stage: PrototypeStageId,
  tailorNzTaxDashboardRevealed: boolean
): boolean {
  return stage === "ga" || (stage === "tailor" && tailorNzTaxDashboardRevealed);
}

export function isNzInsightWidgetForcedHiddenForStage(
  region: string,
  stage: PrototypeStageId,
  widgetId: string,
  tailorNzTaxDashboardRevealed: boolean
): boolean {
  return (
    region === "NZ" &&
    NZ_TAX_INSIGHT_WIDGET_ID_SET.has(widgetId) &&
    !nzInsightsUnlockedOnNzGrid(stage, tailorNzTaxDashboardRevealed)
  );
}

/**
 * Widget IDs hidden on first load and after Reset layout.
 * NZ: {@link NZ_DEFAULT_HIDDEN_WIDGET_IDS} plus XPAC-only extras when stage is `xpac`.
 */

export function getDefaultHiddenWidgetIds(
  region: string,
  stage: PrototypeStageId
): string[] {
  const pipeline = effectivePipelineStage(stage);
  if (region === "NZ") {
    const base = [...NZ_DEFAULT_HIDDEN_WIDGET_IDS];
    if (pipeline === "xpac") {
      return [...base, ...NZ_XPAC_DEFAULT_EXTRA_HIDDEN_WIDGET_IDS];
    }
    return base;
  }
  return [];
}

/**
 * Merge persisted hidden-widget ids with prototype stage so NZ XPAC-only defaults
 * (e.g. Filed tax returns) apply when switching stages without a full reset.
 */
export function reconcileSavedHiddenWidgetsWithStage(
  region: string,
  stage: PrototypeStageId,
  hiddenIds: readonly string[],
  tailorNzTaxDashboardRevealed: boolean
): string[] {
  if (region !== "NZ") {
    return [...hiddenIds];
  }
  const pipeline = effectivePipelineStage(stage);
  const next = new Set(hiddenIds);
  for (const id of NZ_XPAC_DEFAULT_EXTRA_HIDDEN_WIDGET_IDS) {
    if (pipeline === "xpac") {
      next.add(id);
    } else {
      next.delete(id);
    }
  }
  for (const id of NZ_TAX_INSIGHT_WIDGET_IDS) {
    if (stage === "ga") {
      continue;
    }
    if (stage === "tailor") {
      if (tailorNzTaxDashboardRevealed) {
        next.delete(id);
      } else {
        next.add(id);
      }
    } else {
      next.add(id);
    }
  }
  return [...next];
}

/**
 * Prototype **ALL** widget scope: every overview tile except optional tax
 * duplicates (full Tax returns, Returns by type) — same ids as
 * {@link NZ_DEFAULT_HIDDEN_WIDGET_IDS}, applied for any region where that
 * widget exists. Always includes {@link getDefaultHiddenWidgetIds} (e.g. NZ
 * XPAC lodgements).
 */
export function getHiddenWidgetIdsForAllWidgetScope(
  region: string,
  stage: PrototypeStageId,
  isWidgetInRegion: (widgetId: string) => boolean
): string[] {
  const hidden = new Set(getDefaultHiddenWidgetIds(region, stage));
  for (const id of NZ_DEFAULT_HIDDEN_WIDGET_IDS) {
    if (isWidgetInRegion(id)) {
      hidden.add(id);
    }
  }
  return [...hidden];
}

/**
 * Widget ids shown in **TAX** widget scope. For NZ, tax-overview tiles that are
 * visible on the **ALL** overview, plus insight tiles when they belong on the grid
 * (GA, or Tailor after submit reveal).
 */
export function getTaxOnlyVisibleWidgetIdsForRegion(
  region: string,
  stage: PrototypeStageId,
  sortedWidgetIdsForRegion: string[],
  isWidgetInRegion: (widgetId: string) => boolean,
  tailorNzTaxDashboardRevealed: boolean
): string[] {
  if (region !== "NZ") {
    return sortedWidgetIdsForRegion.filter(
      (id) => TAX_BETA_WIDGET_IDS.has(id) && isWidgetInRegion(id)
    );
  }
  const allScopeHidden = new Set(
    getHiddenWidgetIdsForAllWidgetScope(region, stage, isWidgetInRegion)
  );
  return sortedWidgetIdsForRegion.filter((id) => {
    if (!isWidgetInRegion(id)) return false;
    if (NZ_TAX_INSIGHT_WIDGET_ID_SET.has(id)) {
      return nzInsightsUnlockedOnNzGrid(stage, tailorNzTaxDashboardRevealed);
    }
    if (!TAX_BETA_WIDGET_IDS.has(id)) return false;
    return !allScopeHidden.has(id);
  });
}
