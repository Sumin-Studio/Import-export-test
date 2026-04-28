"use client";
import React, { createContext, useContext, useCallback, useRef } from "react";

interface PopoverContextType {
  registerPopover: (id: string, closeFunc: () => void) => void;
  unregisterPopover: (id: string) => void;
  closeAllPopovers: () => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(
  undefined
);

export function PopoverProvider({ children }: { children: React.ReactNode }) {
  const popoversRef = useRef<Map<string, () => void>>(new Map());

  const registerPopover = useCallback((id: string, closeFunc: () => void) => {
    popoversRef.current.set(id, closeFunc);
  }, []);

  const unregisterPopover = useCallback((id: string) => {
    popoversRef.current.delete(id);
  }, []);

  const closeAllPopovers = useCallback(() => {
    // Store the current scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Store the currently focused element
    const activeElement = document.activeElement as HTMLElement;

    popoversRef.current.forEach((closeFunc) => closeFunc());

    // Restore scroll position and remove focus to prevent tooltips from triggering
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY);

      // If focus was moved to a button or interactive element (by Headless UI's focus restoration),
      // blur it to prevent tooltips from showing
      const newActiveElement = document.activeElement as HTMLElement;
      if (newActiveElement && newActiveElement !== activeElement && newActiveElement.tagName === 'BUTTON') {
        newActiveElement.blur();
      }
    });
  }, []);

  return (
    <PopoverContext.Provider
      value={{ registerPopover, unregisterPopover, closeAllPopovers }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}
