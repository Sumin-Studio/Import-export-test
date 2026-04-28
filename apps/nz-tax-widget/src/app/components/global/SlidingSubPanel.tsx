"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { Close, Arrow } from "@/app/components/ui/icons";

interface SlidingSubPanelProps {
  title: string;
  children: React.ReactNode;
}

export function SlidingSubPanel({ title, children }: SlidingSubPanelProps) {
  const {
    isSubPanelVisible,
    closeSubPanel,
    openPanel,
    isScrolled,
    headerHeight,
    skipSubPanelAnimation,
  } = useNavigation();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  // Handle the animation when subpanel becomes visible
  useEffect(() => {
    if (isSubPanelVisible) {
      if (skipSubPanelAnimation) {
        // Direct navigation - no animation, show immediately
        setShouldAnimate(false);
        isInitialRender.current = false;
      } else {
        // Normal navigation - animate in
        setShouldAnimate(false);
        // Trigger animation on next frame
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
        isInitialRender.current = false;
      }
    } else {
      // Closing - animate out if not initial render
      if (!isInitialRender.current) {
        setShouldAnimate(false);
      }
    }
  }, [isSubPanelVisible, skipSubPanelAnimation]);

  // Handle escape key to close sub-panel
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isSubPanelVisible) {
        closeSubPanel();
      }
    }

    if (isSubPanelVisible) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isSubPanelVisible, closeSubPanel]);

  const panelHeight = isScrolled ? "100vh" : `calc(100vh - ${headerHeight}px)`;

  // Determine the transform and transition classes
  const getTransformClass = () => {
    if (skipSubPanelAnimation && isSubPanelVisible) {
      // Direct navigation - show immediately without animation
      return "translate-x-0";
    }

    if (isSubPanelVisible && shouldAnimate) {
      // Normal navigation - animate to visible
      return "translate-x-0";
    }

    // Hidden state
    return "translate-x-full";
  };

  const getTransitionClass = () => {
    // Only apply transition if it's not direct navigation
    return skipSubPanelAnimation && isSubPanelVisible
      ? ""
      : "transition-transform duration-300 ease-in-out";
  };

  return (
    <div
      ref={panelRef}
      data-subpanel="true"
      className={`calc(100vh - 64px) fixed top-0 right-0 z-[60] w-[400px] bg-white ${getTransitionClass()} ${getTransformClass()}`}
    >
      {/* Sub-Panel Header */}
      <div className="border-border-primary sticky top-0 z-10 flex items-center justify-between gap-2 border-b py-3 pr-3 pl-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={closeSubPanel}
            className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
            aria-label="Back to main panel"
          >
            <Arrow className="rotate-180" fill="fill-content-secondary" />
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-[17px]/[28px] font-bold capitalize">{title}</h2>
          </div>
        </div>
        <button
          className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => openPanel(null)}
          type="button"
        >
          <span className="sr-only">Close</span>
          <Close fill="fill-content-secondary" />
        </button>
      </div>

      {/* Sub-Panel Content */}
      <div
        className="overflow-y-auto"
        style={{ height: `calc(${panelHeight} - 73px)` }}
      >
        {children}
      </div>
    </div>
  );
}
