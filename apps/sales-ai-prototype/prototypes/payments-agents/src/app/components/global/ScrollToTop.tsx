"use client";

import { useEffect, useRef } from "react";

/**
 * Component that scrolls to the top of the page whenever the route changes.
 * This ensures users always start at the top when navigating to a new page.
 */
export function ScrollToTop() {
  const pathnameRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Initialize with current pathname
    pathnameRef.current = window.location.pathname;

    // Function to scroll to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    // Check for pathname changes periodically (Next.js client-side routing)
    const checkPathname = () => {
      const currentPathname = window.location.pathname;
      if (currentPathname !== pathnameRef.current) {
        pathnameRef.current = currentPathname;
        scrollToTop();
      }
    };

    // Check immediately on mount
    scrollToTop();

    // Set up interval to check for route changes
    const intervalId = setInterval(checkPathname, 100);

    // Also listen to popstate for browser back/forward
    const handlePopState = () => {
      pathnameRef.current = window.location.pathname;
      scrollToTop();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}

