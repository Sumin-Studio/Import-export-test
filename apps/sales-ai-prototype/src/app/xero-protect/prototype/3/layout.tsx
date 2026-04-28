import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prototype 3",
};

export default function Prototype3Layout({ children }: { children: ReactNode }) {
  return children;
}
