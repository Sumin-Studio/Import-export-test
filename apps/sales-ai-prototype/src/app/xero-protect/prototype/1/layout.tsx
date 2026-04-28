import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prototype 1",
};

export default function Prototype1Layout({ children }: { children: ReactNode }) {
  return children;
}
