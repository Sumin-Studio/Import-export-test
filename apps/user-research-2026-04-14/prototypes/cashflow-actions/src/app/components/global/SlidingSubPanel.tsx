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
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Animation state needs synchronous update
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
      className={`fixed right-0 bg-white top-0 calc(100vh - 64px) w-[400px] z-[60] ${getTransitionClass()} ${getTransformClass()}`}
    >
      {/* Sub-Panel Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border-primary py-3 pl-4 pr-3 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={closeSubPanel}
            className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
            aria-label="Back to main panel"
          >
            <Arrow className="rotate-180" fill="fill-content-secondary" />
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-[17px]/[28px] font-bold capitalize">{title}</h2>
            {title === "Just Ask Xero" && (
              <span className="rounded-[3px] border border-[#81848d] px-1 text-[13px] leading-[20px] text-content-secondary/75">
                Beta
              </span>
            )}
          </div>
        </div>
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
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
