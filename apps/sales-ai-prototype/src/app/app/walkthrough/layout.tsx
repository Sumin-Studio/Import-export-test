import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Walkthrough",
};

export default function WalkthroughLayout({ children }: { children: ReactNode }) {
  return children;
}
