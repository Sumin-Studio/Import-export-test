import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "New invoice sign in",
};

export default function NewInvoiceLoginLayout({ children }: { children: ReactNode }) {
  return children;
}
