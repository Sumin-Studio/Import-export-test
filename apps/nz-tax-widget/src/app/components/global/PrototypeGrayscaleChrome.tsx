"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";

const GRAYSCALE_CLASS = "grayscale";
const MAIN_CLASS = "overflow-hidden";

/**
 * Applies DISPLAY modes to shell chrome and main:
 * - color: no filter
 * - grayscale: full shell + main
 * - highlight: chrome greyscale; on `/` main has no full-page greyscale (dashboard handles tiles + chrome rows); other routes full main greyscale
 */
export function PrototypeGrayscaleChrome({
  header,
  slidingPanel,
  main,
}: {
  header: ReactNode;
  slidingPanel: ReactNode;
  main: ReactNode;
}) {
  const { displayMode } = usePrototypeSettings();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const mainEl = (
    <main className={clsx(MAIN_CLASS)} id="content">
      {main}
    </main>
  );

  if (displayMode === "color") {
    return (
      <>
        {header}
        {slidingPanel}
        {mainEl}
      </>
    );
  }

  if (displayMode === "grayscale") {
    return (
      <div className={GRAYSCALE_CLASS}>
        {header}
        {slidingPanel}
        {mainEl}
      </div>
    );
  }

  // highlight — per-dashboard chrome + grid handled in dashboard / DraggableGrid
  return (
    <>
      <div className={GRAYSCALE_CLASS}>{header}</div>
      <div className={GRAYSCALE_CLASS}>{slidingPanel}</div>
      <main
        className={clsx(MAIN_CLASS, !isHome && GRAYSCALE_CLASS)}
        id="content"
      >
        {main}
      </main>
    </>
  );
}
