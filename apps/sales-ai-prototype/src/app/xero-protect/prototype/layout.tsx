import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prototypes",
};

export default function XeroProtectPrototypeLayout({ children }: { children: ReactNode }) {
  return children;
}
