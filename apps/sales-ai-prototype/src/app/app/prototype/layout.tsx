import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Bills agent prototype",
};

export default function AppPrototypeLayout({ children }: { children: ReactNode }) {
  return children;
}
