"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PurchasesBankBalanceScenarioId =
  | "chart-only"
  | "running-low"
  | "shortfall"
  | "critical";

export type PurchasesActionPlanConfigKey =
  | "cashflow-chart-only"
  | "cashflow-low"
  | "cashflow-shortfall"
  | "cashflow-critical";

export type BankBalanceWidgetColumnSpan = 1 | 2;

const STORAGE_KEY = "cashflow-purchases-bank-balance-scenario";
const STORAGE_KEY_WIDGET_SPAN =
  "cashflow-purchases-bank-balance-widget-column-span";
const STORAGE_KEY_HIDE_SUPPORTING =
  "cashflow-purchases-hide-supporting-widgets";
/** Top four-column bills status strip on Purchases overview (separate from Money going out / Customers / PO). */
const STORAGE_KEY_SHOW_BILLS_STATUS_SUMMARY =
  "cashflow-purchases-show-bills-status-summary-banner";

/** One-time: research defaults — cash flow shortfall, supporting widgets on, bills status summary banner off. */
const STORAGE_RESEARCH_DEFAULTS_V2 =
  "cashflow-purchases-research-defaults-v2-applied";

/** One-time: move persisted "critical" to default "shortfall" for prototype sessions stuck on emergency scenario. */
const STORAGE_SCENARIO_MIGRATE_SHORTFALL =
  "cashflow-purchases-scenario-migrate-critical-to-shortfall-v1";

const SCENARIO_TO_CONFIG: Record<
  PurchasesBankBalanceScenarioId,
  PurchasesActionPlanConfigKey
> = {
  "chart-only": "cashflow-chart-only",
  "running-low": "cashflow-low",
  shortfall: "cashflow-shortfall",
  critical: "cashflow-critical",
};

const SCENARIOS: PurchasesBankBalanceScenarioId[] = [
  "chart-only",
  "running-low",
  "shortfall",
  "critical",
];

function readStoredScenario(): PurchasesBankBalanceScenarioId | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && SCENARIOS.includes(raw as PurchasesBankBalanceScenarioId)) {
      let id = raw as PurchasesBankBalanceScenarioId;
      if (
        id === "critical" &&
        localStorage.getItem(STORAGE_SCENARIO_MIGRATE_SHORTFALL) !== "1"
      ) {
        id = "shortfall";
        try {
          localStorage.setItem(STORAGE_KEY, "shortfall");
          localStorage.setItem(STORAGE_SCENARIO_MIGRATE_SHORTFALL, "1");
        } catch {
          /* ignore */
        }
      }
      return id;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function readStoredWidgetSpan(): BankBalanceWidgetColumnSpan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WIDGET_SPAN);
    if (raw === "1") return 1;
    if (raw === "2") return 2;
  } catch {
    /* ignore */
  }
  return null;
}

/** `null` = no stored preference (use React default). */
function readStoredHideSupportingWidgets(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HIDE_SUPPORTING);
    if (raw === "true") return true;
    if (raw === "false") return false;
    return null;
  } catch {
    return null;
  }
}

function readStoredShowBillsStatusSummaryBanner(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SHOW_BILLS_STATUS_SUMMARY);
    if (raw === "true") return true;
    if (raw === "false") return false;
    return null;
  } catch {
    return null;
  }
}

interface PurchasesPrototypeScenarioContextValue {
  bankBalanceScenario: PurchasesBankBalanceScenarioId;
  setBankBalanceScenario: (id: PurchasesBankBalanceScenarioId) => void;
  bankBalanceConfigKey: PurchasesActionPlanConfigKey;
  bankBalanceWidgetColumnSpan: BankBalanceWidgetColumnSpan;
  setBankBalanceWidgetColumnSpan: (span: BankBalanceWidgetColumnSpan) => void;
  /** When true, hides Money going out, Customers you owe most, and the Purchase orders title + status banner (not the optional top bills status summary row — see `showBillsStatusSummaryBanner`). */
  hidePurchasesSupportingWidgets: boolean;
  setHidePurchasesSupportingWidgets: (hide: boolean) => void;
  /** Four-column bills status summary strip above the widget row. Default off for research sessions. */
  showBillsStatusSummaryBanner: boolean;
  setShowBillsStatusSummaryBanner: (show: boolean) => void;
}

const PurchasesPrototypeScenarioContext =
  createContext<PurchasesPrototypeScenarioContextValue | null>(null);

export function PurchasesPrototypeScenarioProvider({
  children,
}: {
  children: ReactNode;
}) {
  /** Default for Purchases Overview: shortfall shows cash pressure + Make a plan (research default per Robb). Use Prototype settings → "Cash flow running low" when facilitators need draggable threshold. */
  const [bankBalanceScenario, setBankBalanceScenarioState] =
    useState<PurchasesBankBalanceScenarioId>("shortfall");
  const [bankBalanceWidgetColumnSpan, setBankBalanceWidgetColumnSpanState] =
    useState<BankBalanceWidgetColumnSpan>(2);
  const [hidePurchasesSupportingWidgets, setHidePurchasesSupportingWidgetsState] =
    useState(false);
  const [showBillsStatusSummaryBanner, setShowBillsStatusSummaryBannerState] =
    useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_RESEARCH_DEFAULTS_V2) !== "1") {
        setBankBalanceScenarioState("shortfall");
        setBankBalanceWidgetColumnSpanState(2);
        setHidePurchasesSupportingWidgetsState(false);
        setShowBillsStatusSummaryBannerState(false);
        localStorage.setItem(STORAGE_KEY, "shortfall");
        localStorage.setItem(STORAGE_KEY_WIDGET_SPAN, "2");
        localStorage.setItem(STORAGE_KEY_HIDE_SUPPORTING, "false");
        localStorage.setItem(STORAGE_KEY_SHOW_BILLS_STATUS_SUMMARY, "false");
        localStorage.setItem(STORAGE_RESEARCH_DEFAULTS_V2, "1");
        return;
      }
    } catch {
      /* fall through */
    }

    const stored = readStoredScenario();
    if (stored) setBankBalanceScenarioState(stored);
    const storedSpan = readStoredWidgetSpan();
    if (storedSpan !== null) setBankBalanceWidgetColumnSpanState(storedSpan);
    const storedHide = readStoredHideSupportingWidgets();
    if (storedHide !== null) {
      setHidePurchasesSupportingWidgetsState(storedHide);
    }
    const storedSummary = readStoredShowBillsStatusSummaryBanner();
    if (storedSummary !== null) {
      setShowBillsStatusSummaryBannerState(storedSummary);
    }
  }, []);

  const setBankBalanceScenario = useCallback(
    (id: PurchasesBankBalanceScenarioId) => {
      setBankBalanceScenarioState(id);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* ignore */
      }
    },
    []
  );

  const setBankBalanceWidgetColumnSpan = useCallback(
    (span: BankBalanceWidgetColumnSpan) => {
      setBankBalanceWidgetColumnSpanState(span);
      try {
        localStorage.setItem(STORAGE_KEY_WIDGET_SPAN, String(span));
      } catch {
        /* ignore */
      }
    },
    []
  );

  const setHidePurchasesSupportingWidgets = useCallback((hide: boolean) => {
    setHidePurchasesSupportingWidgetsState(hide);
    try {
      localStorage.setItem(STORAGE_KEY_HIDE_SUPPORTING, hide ? "true" : "false");
    } catch {
      /* ignore */
    }
  }, []);

  const setShowBillsStatusSummaryBanner = useCallback((show: boolean) => {
    setShowBillsStatusSummaryBannerState(show);
    try {
      localStorage.setItem(
        STORAGE_KEY_SHOW_BILLS_STATUS_SUMMARY,
        show ? "true" : "false"
      );
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      bankBalanceScenario,
      setBankBalanceScenario,
      bankBalanceConfigKey: SCENARIO_TO_CONFIG[bankBalanceScenario],
      bankBalanceWidgetColumnSpan,
      setBankBalanceWidgetColumnSpan,
      hidePurchasesSupportingWidgets,
      setHidePurchasesSupportingWidgets,
      showBillsStatusSummaryBanner,
      setShowBillsStatusSummaryBanner,
    }),
    [
      bankBalanceScenario,
      setBankBalanceScenario,
      bankBalanceWidgetColumnSpan,
      setBankBalanceWidgetColumnSpan,
      hidePurchasesSupportingWidgets,
      setHidePurchasesSupportingWidgets,
      showBillsStatusSummaryBanner,
      setShowBillsStatusSummaryBanner,
    ]
  );

  return (
    <PurchasesPrototypeScenarioContext.Provider value={value}>
      {children}
    </PurchasesPrototypeScenarioContext.Provider>
  );
}

export function usePurchasesPrototypeScenario(): PurchasesPrototypeScenarioContextValue {
  const ctx = useContext(PurchasesPrototypeScenarioContext);
  if (!ctx) {
    throw new Error(
      "usePurchasesPrototypeScenario must be used within PurchasesPrototypeScenarioProvider"
    );
  }
  return ctx;
}
