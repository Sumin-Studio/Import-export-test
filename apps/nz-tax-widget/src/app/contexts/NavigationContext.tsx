"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect, useRef } from "react";

type PanelType =
  | "timer"
  | "search"
  | "jax"
  | "help"
  | "to-do"
  | "notifications"
  | "apps"
  | "tax-actions"
  | null;

interface NavigationContextType {
  activePanel: PanelType;
  activeSubPanel: string | null;
  isSubPanelVisible: boolean;
  isDirectNavigation: boolean;
  skipSubPanelAnimation: boolean;
  setActivePanel: (panel: PanelType) => void;
  openPanel: (panel: PanelType, subPanel?: string, isDirect?: boolean) => void;
  openSubPanel: (subPanel: string | null) => void;
  closeSubPanel: () => void;
  isScrolled: boolean;
  headerHeight: number;
  isPanelSwitching: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [activeSubPanel, setActiveSubPanel] = useState<string | null>(null);
  const [isSubPanelVisible, setIsSubPanelVisible] = useState(false);
  const [isDirectNavigation, setIsDirectNavigation] = useState(false);
  const [skipSubPanelAnimation, setSkipSubPanelAnimation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPanelSwitching, setIsPanelSwitching] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64); // Default: main header height (h-16)
  const [isHydrated, setIsHydrated] = useState(false);
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true);

    const calculateHeaderHeight = () => {
      // Find the feedback banner and main header elements
      const feedbackBanner = document.querySelector(
        '[class*="sticky"][class*="bg-[#F2F8FC]"]'
      ) as HTMLElement;
      const mainHeader = document.querySelector("#navigation") as HTMLElement;

      let totalHeight = 64; // Default main header height

      // Use requestAnimationFrame to batch reads after any pending DOM changes
      requestAnimationFrame(() => {
        if (mainHeader) {
          totalHeight = mainHeader.offsetHeight;
        }

        if (feedbackBanner) {
          totalHeight += feedbackBanner.offsetHeight;
        }

        setHeaderHeight(totalHeight);
      });
    };

    // Calculate on mount
    calculateHeaderHeight();

    // Use ResizeObserver for more precise height changes if available
    let resizeObserver: ResizeObserver | null = null;

    if (typeof window !== "undefined" && window.ResizeObserver) {
      const feedbackBanner = document.querySelector(
        '[class*="sticky"][class*="bg-[#F2F8FC]"]'
      ) as HTMLElement;
      const mainHeader = document.querySelector("#navigation") as HTMLElement;

      if (feedbackBanner || mainHeader) {
        resizeObserver = new ResizeObserver((entries) => {
          // Calculate total height from contentRect to avoid forced reflow
          let totalHeight = 0;
          for (const entry of entries) {
            totalHeight += entry.contentRect.height;
          }
          setHeaderHeight(totalHeight);
        });

        if (feedbackBanner) resizeObserver.observe(feedbackBanner);
        if (mainHeader) resizeObserver.observe(mainHeader);
      }
    } else {
      // Fallback to window resize only if ResizeObserver is not available
      const handleResize = () => {
        calculateHeaderHeight();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const handleScroll = () => {
      // Only update scroll state after hydration to prevent mismatch
      if (isHydrated) {
        setIsScrolled(window.scrollY > 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isHydrated]);

  const openPanel = (panel: PanelType, subPanel?: string, isDirect = false) => {
    if (activePanel && panel && activePanel !== panel) {
      // Switching between panels - no slide out animation
      setIsPanelSwitching(true);
      setActivePanel(panel);

      if (subPanel) {
        setActiveSubPanel(subPanel);
        // If direct navigation to a subpanel, show it immediately without animation
        setIsSubPanelVisible(true);
        setIsDirectNavigation(isDirect);
        setSkipSubPanelAnimation(isDirect);
      } else {
        setActiveSubPanel(null);
        setIsSubPanelVisible(false);
        setIsDirectNavigation(false);
        setSkipSubPanelAnimation(false);
      }

      // Reset the switching flag after animation
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
      switchTimeoutRef.current = setTimeout(() => {
        setIsPanelSwitching(false);
      }, 50);
    } else {
      // Opening or closing panel normally
      setActivePanel(panel);

      if (panel === null) {
        // Closing the panel entirely
        setActiveSubPanel(null);
        setIsSubPanelVisible(false);
        setIsDirectNavigation(false);
        setSkipSubPanelAnimation(false);
      } else if (subPanel) {
        // Opening with a sub-panel
        setActiveSubPanel(subPanel);
        // If direct navigation to a subpanel, show it immediately without animation
        setIsSubPanelVisible(true);
        setIsDirectNavigation(isDirect);
        setSkipSubPanelAnimation(isDirect);
      } else {
        // Opening without a sub-panel
        setActiveSubPanel(null);
        setIsSubPanelVisible(false);
        setIsDirectNavigation(false);
        setSkipSubPanelAnimation(false);
      }
    }
  };

  const openSubPanel = (subPanel: string | null) => {
    // This is always called from within a panel, so we want the animation
    setActiveSubPanel(subPanel);
    setIsSubPanelVisible(!!subPanel);
    setIsDirectNavigation(false);
    setSkipSubPanelAnimation(false);
  };

  const closeSubPanel = () => {
    // Always animate the subpanel closing
    setIsSubPanelVisible(false);
    // Keep skipSubPanelAnimation as is - we'll reset it when the panel is fully closed

    // We don't clear activeSubPanel immediately to allow for exit animations
    setTimeout(() => {
      if (!isSubPanelVisible) {
        setActiveSubPanel(null);
        setIsDirectNavigation(false);
        setSkipSubPanelAnimation(false);
      }
    }, 300);
  };

  return (
    <NavigationContext.Provider
      value={{
        activePanel,
        activeSubPanel,
        isSubPanelVisible,
        isDirectNavigation,
        skipSubPanelAnimation,
        setActivePanel,
        openPanel,
        openSubPanel,
        closeSubPanel,
        isScrolled,
        headerHeight,
        isPanelSwitching,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
