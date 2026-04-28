"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import {
  INVOICE_SENT_STORAGE_KEY,
  type InvoiceSentSnapshot,
} from "@/components/bill-cash-flow/invoiceSentSnapshot";

type InvoiceSentContextValue = {
  snapshot: InvoiceSentSnapshot | null;
  setSnapshot: (s: InvoiceSentSnapshot | null) => void;
};

const InvoiceSentContext = createContext<InvoiceSentContextValue | null>(null);

export function InvoiceSentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [snapshot, setSnapshot] = useState<InvoiceSentSnapshot | null>(null);

  /** Hydrate from sessionStorage on invoice email / pay routes (full reload or direct open). */
  useLayoutEffect(() => {
    const hydratePaths = ["/sent-invoice", "/gmail-invoice", "/online-invoice"];
    if (!pathname || !hydratePaths.includes(pathname)) return;
    try {
      const raw = sessionStorage.getItem(INVOICE_SENT_STORAGE_KEY);
      if (!raw) return;
      setSnapshot(JSON.parse(raw) as InvoiceSentSnapshot);
    } catch {
      /* ignore corrupt JSON */
    }
  }, [pathname]);

  const value = useMemo(
    () => ({
      snapshot,
      setSnapshot,
    }),
    [snapshot]
  );

  return <InvoiceSentContext.Provider value={value}>{children}</InvoiceSentContext.Provider>;
}

export function useInvoiceSent() {
  const ctx = useContext(InvoiceSentContext);
  if (!ctx) {
    throw new Error("useInvoiceSent must be used within InvoiceSentProvider");
  }
  return ctx;
}
