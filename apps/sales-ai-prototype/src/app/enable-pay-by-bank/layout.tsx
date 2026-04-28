import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Standalone full-viewport route — not under /sales/new-invoice, so RobbShell / global
 * prototype nav never mount here. Pairs with globals.css `.enable-pay-by-bank-fullscreen-root`.
 */
export const metadata: Metadata = {
  title: "Enable Pay by Bank",
};

export default function EnablePayByBankStandaloneLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="enable-pay-by-bank-fullscreen-root fixed inset-0 z-0 flex min-h-0 flex-col overflow-hidden bg-white text-[#000a1e] antialiased"
      data-route="enable-pay-by-bank-fullscreen"
    >
      {children}
    </div>
  );
}
