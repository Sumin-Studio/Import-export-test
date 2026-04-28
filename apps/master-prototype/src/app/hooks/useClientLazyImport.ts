"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Loads `import()` default export after mount. Prefer this over `next/dynamic` for Highcharts
 * widgets: lazy app-router chunks can throw `Cannot read properties of undefined (reading 'call')`.
 * Call sites should add a webpack magic comment `webpackMode: "eager"` on the dynamic import so
 * charts stay in the parent chunk instead of a separate `_app-pages-browser_*` async bundle.
 */
export function useClientLazyImport<P extends object = object>(
  load: () => Promise<{ default: ComponentType<P> }>
): ComponentType<P> | null {
  const [C, setC] = useState<ComponentType<P> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void load().then((mod) => {
      if (!cancelled) {
        setC(() => mod.default);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  return C;
}
