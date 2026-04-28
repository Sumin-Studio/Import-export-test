"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@/app/contexts/NavigationContext";
import {
  SearchPanel,
  JaxPanel,
  HelpPanel,
  ToDoPanel,
  NotificationsPanel,
  AppsPanel,
} from "@/app/components/panels";

export function SlidingPanel() {
  const { activePanel, openPanel } = useNavigation();
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState({
    top: "108px",
    height: "calc(100vh - 108px)",
  });

  useEffect(() => {
    const updatePanelStyle = () => {
      if (window.innerWidth >= 1200) {
        const scrollY = window.scrollY;
        const topOffset = Math.max(40, 104 - scrollY);
        setPanelStyle({
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        });
      } else if (window.innerWidth >= 800) {
        const scrollY = window.scrollY;
        const topOffset = Math.max(68, 132 - scrollY);
        setPanelStyle({
          top: `${topOffset}px`,
          height: `calc(100vh - ${topOffset}px)`,
        });
      } else {
        setPanelStyle({
          top: "0px",
          height: "100vh",
        });
      }
    };

    window.addEventListener("scroll", updatePanelStyle, { passive: true });
    window.addEventListener("resize", updatePanelStyle, { passive: true });
    updatePanelStyle(); // Set initial state

    return () => {
      window.removeEventListener("scroll", updatePanelStyle);
      window.removeEventListener("resize", updatePanelStyle);
    };
  }, []);

  // Handle click outside to close panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        // Check if the click is on a header button or sub-panel
        const headerButton = (event.target as Element).closest("[aria-label]");
        const subPanel = (event.target as Element).closest("[data-subpanel]");
        if (!headerButton && !subPanel) {
          openPanel(null);
        }
      }
    }

    if (activePanel) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activePanel, openPanel]);

  // Handle escape key to close panel
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        openPanel(null);
      }
    }

    if (activePanel) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [activePanel, openPanel]);

  const renderPanelContent = () => {
    switch (activePanel) {
      case "search":
        return <SearchPanel />;
      case "jax":
        return <JaxPanel />;
      case "help":
        return <HelpPanel />;
      case "to-do":
        return <ToDoPanel />;
      case "notifications":
        return <NotificationsPanel />;
      case "apps":
        return <AppsPanel />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Panel */}
      {/* pointer-events-none when closed: this node stays z-50 above #content; without it,
          the off-canvas translate can still steal mousedown so dropdowns and buttons in main never receive clicks. */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 bottom-0 z-50 w-screen overflow-x-hidden bg-white shadow-[-7px_10px_14px_0px_rgba(0,42,70,0.10)] transition-transform duration-300 ease-in-out focus:outline-none md:top-[132px] md:w-[400px] xl:top-[104px] ${
          activePanel
            ? "translate-x-0 pointer-events-auto"
            : "pointer-events-none translate-x-[calc(100%+20px)]"
        }`}
        style={panelStyle}
      >
        {/* Panel Content */}
        <div className="overflow-y-auto scroll-smooth h-full">
          {renderPanelContent()}
        </div>
      </div>
    </>
  );
}
