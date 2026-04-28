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
      return raw as PurchasesBankBalanceScenarioId;
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

interface PurchasesPrototypeScenarioContextValue {
  bankBalanceScenario: PurchasesBankBalanceScenarioId;
  setBankBalanceScenario: (id: PurchasesBankBalanceScenarioId) => void;
  bankBalanceConfigKey: PurchasesActionPlanConfigKey;
  bankBalanceWidgetColumnSpan: BankBalanceWidgetColumnSpan;
  setBankBalanceWidgetColumnSpan: (span: BankBalanceWidgetColumnSpan) => void;
  /** When true, hides bills status summary, Money going out, Customers you owe most, and the Purchase orders title + status banner on purchases overview. */
  hidePurchasesSupportingWidgets: boolean;
  setHidePurchasesSupportingWidgets: (hide: boolean) => void;
}

const PurchasesPrototypeScenarioContext =
  createContext<PurchasesPrototypeScenarioContextValue | null>(null);

export function PurchasesPrototypeScenarioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bankBalanceScenario, setBankBalanceScenarioState] =
    useState<PurchasesBankBalanceScenarioId>("shortfall");
  const [bankBalanceWidgetColumnSpan, setBankBalanceWidgetColumnSpanState] =
    useState<BankBalanceWidgetColumnSpan>(2);
  const [hidePurchasesSupportingWidgets, setHidePurchasesSupportingWidgetsState] =
    useState(true);

  useEffect(() => {
    const stored = readStoredScenario();
    if (stored) setBankBalanceScenarioState(stored);
    const storedSpan = readStoredWidgetSpan();
    if (storedSpan !== null) setBankBalanceWidgetColumnSpanState(storedSpan);
    const storedHide = readStoredHideSupportingWidgets();
    if (storedHide !== null) {
      setHidePurchasesSupportingWidgetsState(storedHide);
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

  const value = useMemo(
    () => ({
      bankBalanceScenario,
      setBankBalanceScenario,
      bankBalanceConfigKey: SCENARIO_TO_CONFIG[bankBalanceScenario],
      bankBalanceWidgetColumnSpan,
      setBankBalanceWidgetColumnSpan,
      hidePurchasesSupportingWidgets,
      setHidePurchasesSupportingWidgets,
    }),
    [
      bankBalanceScenario,
      setBankBalanceScenario,
      bankBalanceWidgetColumnSpan,
      setBankBalanceWidgetColumnSpan,
      hidePurchasesSupportingWidgets,
      setHidePurchasesSupportingWidgets,
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
