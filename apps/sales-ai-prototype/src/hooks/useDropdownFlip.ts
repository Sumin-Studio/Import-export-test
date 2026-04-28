"use client";

import { useLayoutEffect, useRef, useState } from "react";

const GAP = 4;

/**
 * Positions a dropdown above the anchor when there is not enough viewport space below.
 * Attach contentRef to the floating panel and use positionClass instead of top-full mt-1.
 */
export function useDropdownFlip(open: boolean, getAnchor: () => HTMLElement | null | undefined) {
  const contentRef = useRef<HTMLDivElement>(null);
  const getAnchorRef = useRef(getAnchor);
  getAnchorRef.current = getAnchor;
  const [placeAbove, setPlaceAbove] = useState(false);

  useLayoutEffect(() => {
    if (!open) {
      setPlaceAbove(false);
      return;
    }

    const measure = () => {
      const anchor = getAnchorRef.current?.();
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const panel = contentRef.current;
      const h = panel ? panel.getBoundingClientRect().height : 280;
      const spaceBelow = window.innerHeight - rect.bottom - GAP;
      const spaceAbove = rect.top - GAP;
      if (spaceBelow >= h) setPlaceAbove(false);
      else if (spaceAbove >= h) setPlaceAbove(true);
      else setPlaceAbove(spaceAbove >= spaceBelow);
    };

    measure();
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });

    const panel = contentRef.current;
    const ro =
      panel &&
      new ResizeObserver(() => {
        measure();
      });
    if (panel && ro) ro.observe(panel);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      cancelAnimationFrame(raf1);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open]);

  return {
    contentRef,
    positionClass: placeAbove ? "bottom-full mb-1" : "top-full mt-1",
  } as const;
}
