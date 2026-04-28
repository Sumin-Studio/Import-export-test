"use client";

import { useEffect } from "react";

/**
 * Development only: some failures (blocked third-party scripts, asset loads) surface as
 * `Promise.reject(Event)` instead of `Error`. Next.js dev overlay then shows `[object Event]`,
 * which is confusing and can feel like the app is broken.
 *
 * We `preventDefault()` on those rejections so the shell keeps running and log a clear hint.
 * Production is unchanged.
 */
export function DevClientStability() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const onUnhandledRejection = (ev: PromiseRejectionEvent) => {
      const r = ev.reason;
      if (r instanceof Event) {
        ev.preventDefault();
        console.warn(
          "[dev] Unhandled rejection was a DOM Event (not Error). Often a blocked/failed third-party script or network asset. Type:",
          r.type,
          r
        );
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => window.removeEventListener("unhandledrejection", onUnhandledRejection);
  }, []);

  return null;
}
