"use client";

import * as React from "react";

/**
 * Subscribes to a CSS media query. SSR-safe: always `false` until after mount
 * (avoids server vs client mismatch if this tree is ever pre-rendered).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
