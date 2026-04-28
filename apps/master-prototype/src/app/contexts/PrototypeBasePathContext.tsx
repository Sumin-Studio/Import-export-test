"use client";

import { createContext, useContext, type ReactNode } from "react";

const PrototypeBasePathContext = createContext<string>("");

export function PrototypeBasePathProvider({
  basePath,
  children,
}: {
  basePath: string;
  children: ReactNode;
}) {
  const normalized = basePath.replace(/\/$/, "");
  return (
    <PrototypeBasePathContext.Provider value={normalized}>
      {children}
    </PrototypeBasePathContext.Provider>
  );
}

export function usePrototypeBasePath(): string {
  return useContext(PrototypeBasePathContext);
}

/** Join base + path for in-app navigation (no trailing slash on base). */
export function joinPrototypePath(basePath: string, path: string): string {
  if (!path) return basePath || "/";
  if (/^https?:\/\//i.test(path) || path.startsWith("//")) return path;
  if (!basePath) return path;
  const b = basePath.replace(/\/$/, "");
  if (path === "/") return b || "/";
  return `${b}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * When the cashflow prototype is mounted under a prefix (e.g. payments-agents hub),
 * only home and bills routes are mirrored there — other nav hrefs stay absolute to the host.
 */
function shouldPrefixForEmbeddedPrototype(href: string): boolean {
  if (href === "/") return true;
  if (href === "/bills") return true;
  if (href.startsWith("/bills/")) return true;
  if (href.startsWith("/bills?")) return true;
  if (href.startsWith("/purchases/")) return true;
  if (href === "/purchases-overview") return true;
  if (href.startsWith("/purchases-overview/")) return true;
  if (href === "/legacy") return true;
  return false;
}

export function usePrototypeHref(href?: string): string | undefined {
  const base = usePrototypeBasePath();
  if (href == null || href === "") return undefined;
  if (/^https?:\/\//i.test(href) || href.startsWith("//")) return href;
  if (!base || !shouldPrefixForEmbeddedPrototype(href)) return href;
  return joinPrototypePath(base, href);
}
