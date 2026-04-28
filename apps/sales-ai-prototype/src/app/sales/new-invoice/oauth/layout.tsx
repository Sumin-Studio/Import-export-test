import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Akahu connection",
};

export default function NewInvoiceOauthLayout({ children }: { children: ReactNode }) {
  return children;
}
