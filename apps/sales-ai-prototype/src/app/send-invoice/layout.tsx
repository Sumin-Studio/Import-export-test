import type { ReactNode } from "react";

/** Client page only; no force-dynamic (avoids unnecessary dynamic RSC + hosting edge 500s). */
export default function SendInvoiceLayout({ children }: { children: ReactNode }) {
  return children;
}
