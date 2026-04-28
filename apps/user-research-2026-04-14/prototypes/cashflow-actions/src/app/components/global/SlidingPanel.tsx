"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useNavigation } from "@/app/contexts/NavigationContext";
import { useJaxChatOptional } from "@/app/contexts/JaxChatContext";
import { useJustPayJaxUi } from "@/app/contexts/JustPayJaxUiContext";
import {
  SearchPanel,
  JaxPanel,
  HelpPanel,
  ToDoPanel,
  NotificationsPanel,
  AppsPanel,
} from "@/app/components/panels";

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function SlidingPanel() {
  const { activePanel, activeSubPanel, openPanel } = useNavigation();
  const justPayChatVariant = useJustPayJaxUi();
  const jaxChat = useJaxChatOptional();
  const clearThread = jaxChat?.clearThread;
  const panelRef = useRef<HTMLDivElement>(null);
  /** Last JAX sub-panel while the JAX panel was open — used to reset just-pay on close. */
  const lastJaxSubPanelRef = useRef<string | null>(null);
  const mounted = useIsClient();
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

  useEffect(() => {
    if (activePanel === "jax") {
      lastJaxSubPanelRef.current = activeSubPanel;
    } else if (activePanel !== null) {
      lastJaxSubPanelRef.current = null;
    }
  }, [activePanel, activeSubPanel]);

  useEffect(() => {
    if (!clearThread) return;
    if (
      activePanel === null &&
      lastJaxSubPanelRef.current === "just-pay"
    ) {
      clearThread("just-pay");
      lastJaxSubPanelRef.current = null;
    }
  }, [activePanel, clearThread]);

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
        return <JaxPanel justPayChatVariant={justPayChatVariant} />;
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

  const panelEl = (
    <div
      ref={panelRef}
      className={`fixed top-0 right-0 bottom-0 z-[9999] w-screen overflow-x-hidden bg-white shadow-[-7px_10px_14px_0px_rgba(0,42,70,0.10)] transition-transform duration-300 ease-in-out focus:outline-none md:top-[132px] md:w-[400px] xl:top-[104px] ${
        activePanel ? "translate-x-0" : "translate-x-[calc(100%+20px)]"
      }`}
      style={panelStyle}
    >
      {/* Panel Content */}
      <div className="overflow-y-auto scroll-smooth h-full">
        {renderPanelContent()}
      </div>
    </div>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(panelEl, document.body);
}
