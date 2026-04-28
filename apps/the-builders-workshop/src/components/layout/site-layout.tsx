"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    setIsEmbedded(window.self !== window.top);
  }, []);

  if (isEmbedded) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="mx-auto w-full" style={{ maxWidth: "1200px", padding: "32px" }}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main
        className="mx-auto w-full flex-1"
        style={{ maxWidth: "1200px", padding: "24px 32px 64px" }}
      >
        {children}
      </main>
      <footer className="mt-auto border-t border-border">
        <div
          className="mx-auto flex flex-col gap-2 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between"
          style={{ maxWidth: "1200px", padding: "32px" }}
        >
          <p>© {new Date().getFullYear()} Xero Design · The Builders Workshop</p>
        </div>
      </footer>
    </div>
  );
}
