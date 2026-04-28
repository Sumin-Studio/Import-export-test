import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prototype 2",
};

export default function Prototype2Layout({ children }: { children: ReactNode }) {
  return children;
}
