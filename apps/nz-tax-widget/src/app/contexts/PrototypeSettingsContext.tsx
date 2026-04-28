"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { isTaxBetaWidgetId } from "@/app/lib/taxBetaWidgetIds";
import {
  DEFAULT_PROTOTYPE_SETTINGS,
  PROTOTYPE_SETTINGS_STORAGE_KEY,
  parsePrototypeSettings,
  serializePrototypeSettings,
  type PrototypeDisplayMode,
  type PrototypeSettingsState,
  type PrototypeStageId,
  type PrototypeWidgetScope,
} from "@/app/lib/prototypeSettings";

interface PrototypeSettingsContextValue extends PrototypeSettingsState {
  setStage: (stage: PrototypeStageId) => void;
  setDisplayMode: (mode: PrototypeDisplayMode) => void;
  setWidgetScope: (scope: PrototypeWidgetScope) => void;
  setTailorNzTaxDashboardRevealed: (revealed: boolean) => void;
  /**
   * Call before leaving Tailor (typed send or voice) so the dashboard can run a
   * one-shot entrance animation on the widget grid.
   */
  armTailorDashboardEntrance: () => void;
  /** Returns true once if an entrance was armed; clears the arm. */
  consumeTailorDashboardEntrance: () => boolean;
  /** True when tax-beta widgets stay in colour (Highlight mode). */
  isTaxHighlightWidgetId: (widgetId: string) => boolean;
  isPrototypePanelOpen: boolean;
  setPrototypePanelOpen: (open: boolean) => void;
  togglePrototypePanel: () => void;
  /** Ref for the header “Prototype settings” button — used to anchor the floating panel. */
  prototypeSettingsTriggerRef: RefObject<HTMLButtonElement | null>;
}

const PrototypeSettingsContext = createContext<
  PrototypeSettingsContextValue | undefined
>(undefined);

export function PrototypeSettingsProvider({ children }: { children: ReactNode }) {
  const prototypeSettingsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const tailorDashboardEntranceArmedRef = useRef(false);
  const [state, setState] = useState<PrototypeSettingsState>(
    DEFAULT_PROTOTYPE_SETTINGS
  );
  const [hydrated, setHydrated] = useState(false);
  const [isPrototypePanelOpen, setPrototypePanelOpen] = useState(false);

  /** Apply persisted settings before first paint so NZ Tailor never briefly renders as XPAC (dashboard flash). */
  useLayoutEffect(() => {
    const saved = parsePrototypeSettings(
      typeof window !== "undefined"
        ? localStorage.getItem(PROTOTYPE_SETTINGS_STORAGE_KEY)
        : null
    );
    if (saved) setState(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      PROTOTYPE_SETTINGS_STORAGE_KEY,
      serializePrototypeSettings(state)
    );
  }, [state, hydrated]);

  const setStage = useCallback((next: PrototypeStageId) => {
    setState((prev) => ({
      ...prev,
      stage: next,
      tailorNzTaxDashboardRevealed: false,
    }));
  }, []);

  const setTailorNzTaxDashboardRevealed = useCallback((revealed: boolean) => {
    setState((prev) => ({ ...prev, tailorNzTaxDashboardRevealed: revealed }));
  }, []);

  const setDisplayMode = useCallback((displayMode: PrototypeDisplayMode) => {
    setState((prev) => ({ ...prev, displayMode }));
  }, []);

  const setWidgetScope = useCallback((widgetScope: PrototypeWidgetScope) => {
    setState((prev) => ({ ...prev, widgetScope }));
  }, []);

  const armTailorDashboardEntrance = useCallback(() => {
    tailorDashboardEntranceArmedRef.current = true;
  }, []);

  const consumeTailorDashboardEntrance = useCallback((): boolean => {
    if (!tailorDashboardEntranceArmedRef.current) return false;
    tailorDashboardEntranceArmedRef.current = false;
    return true;
  }, []);

  const togglePrototypePanel = useCallback(() => {
    setPrototypePanelOpen((o) => !o);
  }, []);

  const value = useMemo<PrototypeSettingsContextValue>(
    () => ({
      ...state,
      setStage,
      setDisplayMode,
      setWidgetScope,
      setTailorNzTaxDashboardRevealed,
      armTailorDashboardEntrance,
      consumeTailorDashboardEntrance,
      isTaxHighlightWidgetId: isTaxBetaWidgetId,
      isPrototypePanelOpen,
      setPrototypePanelOpen,
      togglePrototypePanel,
      prototypeSettingsTriggerRef,
    }),
    [
      state,
      setStage,
      setDisplayMode,
      setWidgetScope,
      setTailorNzTaxDashboardRevealed,
      armTailorDashboardEntrance,
      consumeTailorDashboardEntrance,
      isPrototypePanelOpen,
      togglePrototypePanel,
    ]
  );

  return (
    <PrototypeSettingsContext.Provider value={value}>
      {children}
    </PrototypeSettingsContext.Provider>
  );
}

export function usePrototypeSettings(): PrototypeSettingsContextValue {
  const ctx = useContext(PrototypeSettingsContext);
  if (!ctx) {
    throw new Error(
      "usePrototypeSettings must be used within PrototypeSettingsProvider"
    );
  }
  return ctx;
}
