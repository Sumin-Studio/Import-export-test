"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import crossSmall from "@xero/xui-icon/icons/cross-small";
import XUIIcon from "@xero/xui/react/icon";

import styles from "./PreviewWalkthrough.module.scss";

export const PSPOC_WALKTHROUGH_POPOVER_ID = "pspoc-preview-walkthrough-dialog";

const CARD_WIDTH = 380;
/** Used to align the card before first paint; updated after mount via measurement. */
const CARD_HEIGHT_ESTIMATE = 308;

const VIEWPORT_MARGIN = 16;
const GAP = 18;
const HOLE_PADDING = 10;

type Placement = "left" | "right" | "top" | "bottom";

const TOUR_STEPS: Array<{
  title: string;
  body: string;
  preferred: Placement;
}> = [
  {
    title: "See what your customers see",
    body: "This preview mirrors the online payment flow your customers see. Scroll and explore it as they would—then use the panel to see how your choices change the experience.",
    preferred: "left",
  },
  {
    title: "Customise your preview",
    body: "Add branding and choose which payment methods appear. Changes apply instantly so you can compare options quickly.",
    preferred: "right",
  },
  {
    title: "Match your customers' region",
    body: "Pick a region to reflect where your customers pay. Only methods available there are shown, so the preview stays realistic for checkout.",
    preferred: "top",
  },
];

const STEP_COUNT = TOUR_STEPS.length;

export type PreviewWalkthroughState = ReturnType<typeof usePreviewWalkthrough>;

export function usePreviewWalkthrough() {
  /** Session-only: dismiss hides the tour until the next full page load / refresh. */
  const [phase, setPhase] = React.useState<"active" | "done">("active");
  const [step, setStep] = React.useState(0);

  const dismiss = React.useCallback(() => {
    setPhase("done");
  }, []);

  const goNext = React.useCallback(() => {
    setStep((s) => Math.min(STEP_COUNT - 1, s + 1));
  }, []);

  const goPrev = React.useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  return {
    phase,
    step,
    dismiss,
    goNext,
    goPrev,
  };
}

export interface PreviewWalkthroughAnchors {
  previewFrameRef: React.RefObject<HTMLDivElement | null>;
  panelBodyRef: React.RefObject<HTMLDivElement | null>;
  regionRef: React.RefObject<HTMLElement | null>;
}

function getPlacementOrder(preferred: Placement): Placement[] {
  const map: Record<Placement, Placement[]> = {
    left: ["left", "right", "bottom", "top"],
    right: ["right", "left", "bottom", "top"],
    top: ["top", "bottom", "left", "right"],
    bottom: ["bottom", "top", "left", "right"],
  };
  return map[preferred];
}

function rawBoxForPlacement(
  anchor: DOMRect,
  placement: Placement,
  cardW: number,
  cardH: number,
): { left: number; top: number } {
  switch (placement) {
    case "left":
      return {
        left: anchor.left - cardW - GAP,
        top: anchor.top + anchor.height / 2 - cardH / 2,
      };
    case "right":
      return {
        left: anchor.right + GAP,
        top: anchor.top + anchor.height / 2 - cardH / 2,
      };
    case "top":
      return {
        left: anchor.left + anchor.width / 2 - cardW / 2,
        top: anchor.top - cardH - GAP,
      };
    case "bottom":
      return {
        left: anchor.left + anchor.width / 2 - cardW / 2,
        top: anchor.bottom + GAP,
      };
    default:
      return { left: VIEWPORT_MARGIN, top: VIEWPORT_MARGIN };
  }
}

function clamp(
  left: number,
  top: number,
  cardW: number,
  cardH: number,
  vw: number,
  vh: number,
): { left: number; top: number } {
  return {
    left: Math.max(
      VIEWPORT_MARGIN,
      Math.min(left, vw - cardW - VIEWPORT_MARGIN),
    ),
    top: Math.max(
      VIEWPORT_MARGIN,
      Math.min(top, vh - cardH - VIEWPORT_MARGIN),
    ),
  };
}

function fitsUnclamped(
  left: number,
  top: number,
  cardW: number,
  cardH: number,
  vw: number,
  vh: number,
): boolean {
  return (
    left >= VIEWPORT_MARGIN &&
    top >= VIEWPORT_MARGIN &&
    left + cardW <= vw - VIEWPORT_MARGIN &&
    top + cardH <= vh - VIEWPORT_MARGIN
  );
}

function computeCardPosition(
  anchor: DOMRect,
  cardW: number,
  cardH: number,
  preferred: Placement,
): { left: number; top: number; placement: Placement } {
  if (typeof window === "undefined") {
    return { left: VIEWPORT_MARGIN, top: VIEWPORT_MARGIN, placement: preferred };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (const p of getPlacementOrder(preferred)) {
    const raw = rawBoxForPlacement(anchor, p, cardW, cardH);
    if (fitsUnclamped(raw.left, raw.top, cardW, cardH, vw, vh)) {
      return { left: raw.left, top: raw.top, placement: p };
    }
  }
  const raw = rawBoxForPlacement(anchor, preferred, cardW, cardH);
  const c = clamp(raw.left, raw.top, cardW, cardH, vw, vh);
  return { left: c.left, top: c.top, placement: preferred };
}

interface HoleRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function padHole(el: HTMLElement): HoleRect {
  const r = el.getBoundingClientRect();
  return {
    top: r.top - HOLE_PADDING,
    left: r.left - HOLE_PADDING,
    width: r.width + HOLE_PADDING * 2,
    height: r.height + HOLE_PADDING * 2,
  };
}

function FourRectBackdrop({
  hole,
  onDimClick,
}: {
  hole: HoleRect;
  onDimClick: () => void;
}) {
  const { top, left, width, height } = hole;
  const vw =
    typeof window !== "undefined" ? window.innerWidth : 0;
  const vh =
    typeof window !== "undefined" ? window.innerHeight : 0;
  const seg = styles.fourRectSegment;

  return (
    <div className={styles.fourRectRoot} aria-hidden>
      <div
        role="presentation"
        className={seg}
        style={{ top: 0, left: 0, width: vw, height: Math.max(0, top) }}
        onClick={onDimClick}
      />
      <div
        role="presentation"
        className={seg}
        style={{
          top: top + height,
          left: 0,
          width: vw,
          height: Math.max(0, vh - top - height),
        }}
        onClick={onDimClick}
      />
      <div
        role="presentation"
        className={seg}
        style={{
          top,
          left: 0,
          width: Math.max(0, left),
          height,
        }}
        onClick={onDimClick}
      />
      <div
        role="presentation"
        className={seg}
        style={{
          top,
          left: left + width,
          width: Math.max(0, vw - left - width),
          height,
        }}
        onClick={onDimClick}
      />
    </div>
  );
}

export function PreviewWalkthroughPopover({
  walkthrough,
  anchors,
  /** When false, step 1 panel body (and step 2 footer) are not in the DOM — remeasure when this becomes true. */
  sidePanelExpanded,
}: {
  walkthrough: PreviewWalkthroughState;
  anchors: PreviewWalkthroughAnchors;
  sidePanelExpanded: boolean;
}) {
  const { phase, step, dismiss, goNext, goPrev } = walkthrough;
  const { previewFrameRef, panelBodyRef, regionRef } = anchors;
  const anchorRefs = [previewFrameRef, panelBodyRef, regionRef] as const;
  const anchorRef = anchorRefs[step] ?? previewFrameRef;

  const [, bump] = React.useReducer((n: number) => n + 1, 0);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
    null,
  );
  const [layout, setLayout] = React.useState<{
    hole: HoleRect;
    cardPos: { left: number; top: number; placement: Placement };
  } | null>(null);

  const measure = React.useCallback(() => {
    if (phase !== "active") return;
    const el = anchorRef.current;
    // Missing anchor: do not clear layout (refs do not re-render when they attach).
    // A follow-up measure is scheduled in useEffect after paint.
    if (!el) {
      return;
    }
    const anchorRect = el.getBoundingClientRect();
    const cardH =
      cardRef.current && cardRef.current.offsetHeight > 48
        ? cardRef.current.getBoundingClientRect().height
        : CARD_HEIGHT_ESTIMATE;
    const nextHole = padHole(el);
    const nextPos = computeCardPosition(
      anchorRect,
      CARD_WIDTH,
      cardH,
      TOUR_STEPS[step].preferred,
    );
    setLayout((prev) => {
      if (
        prev &&
        Math.abs(prev.hole.top - nextHole.top) < 0.75 &&
        Math.abs(prev.hole.left - nextHole.left) < 0.75 &&
        Math.abs(prev.hole.width - nextHole.width) < 0.75 &&
        Math.abs(prev.hole.height - nextHole.height) < 0.75 &&
        Math.abs(prev.cardPos.left - nextPos.left) < 0.75 &&
        Math.abs(prev.cardPos.top - nextPos.top) < 0.75 &&
        prev.cardPos.placement === nextPos.placement
      ) {
        return prev;
      }
      return { hole: nextHole, cardPos: nextPos };
    });
  }, [phase, step, anchorRef]);

  React.useLayoutEffect(() => {
    if (phase !== "active") return;
    bump();
  }, [phase, step]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure, bump, sidePanelExpanded]);

  /** Catch anchors that mount after the layout pass (e.g. conditional panel body, lazy children). */
  React.useEffect(() => {
    if (phase !== "active") return;
    const id = window.requestAnimationFrame(() => {
      measure();
    });
    return () => window.cancelAnimationFrame(id);
  }, [phase, step, sidePanelExpanded, measure]);

  React.useLayoutEffect(() => {
    if (phase !== "active") return;
    const el = anchorRef.current;
    if (step === STEP_COUNT - 1 && el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [phase, step, anchorRef]);

  React.useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    setPortalTarget(document.body);
  }, []);

  React.useEffect(() => {
    if (phase !== "active") return;
    if (typeof ResizeObserver === "undefined") {
      const onWin = () => measure();
      window.addEventListener("resize", onWin);
      window.addEventListener("scroll", onWin, true);
      return () => {
        window.removeEventListener("resize", onWin);
        window.removeEventListener("scroll", onWin, true);
      };
    }
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(() => measure());
    });
    const el = anchorRef.current;
    if (el) ro.observe(el);
    const card = cardRef.current;
    if (card) ro.observe(card);
    const onWin = () => measure();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, [phase, measure, anchorRef, step, sidePanelExpanded]);

  React.useEffect(() => {
    if (phase !== "active") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, dismiss]);

  if (phase !== "active" || !layout) {
    return null;
  }

  const current = TOUR_STEPS[step];
  const atStart = step === 0;
  const atEnd = step === STEP_COUNT - 1;
  const { hole, cardPos } = layout;

  const tour = (
    <div className={styles.layer}>
      <FourRectBackdrop hole={hole} onDimClick={dismiss} />
      <div
        className={styles.spotlightRingDom}
        style={{
          top: hole.top - 3,
          left: hole.left - 3,
          width: hole.width + 6,
          height: hole.height + 6,
          borderRadius: 14,
        }}
      />
      <div
        ref={cardRef}
        id={PSPOC_WALKTHROUGH_POPOVER_ID}
        className={styles.tourCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-placement={cardPos.placement}
        style={{
          left: cardPos.left,
          top: cardPos.top,
          width: CARD_WIDTH,
        }}
      >
        <div className={styles.tourCardHeader}>
          <span className={styles.stepLabel}>
            Step {step + 1} of {STEP_COUNT}
          </span>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Skip tour"
            onClick={dismiss}
          >
            <XUIIcon icon={crossSmall} title="" color="white" />
          </button>
        </div>
        <h2 id={titleId} className={styles.tourTitle}>
          {current.title}
        </h2>
        <p className={`${styles.tourBody} xui-text-medium`}>{current.body}</p>
        <div className={styles.tourFooter}>
          {!atStart && (
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={goPrev}
            >
              Back
            </button>
          )}
          {atStart && (
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={dismiss}
            >
              Skip
            </button>
          )}
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={atEnd ? dismiss : goNext}
          >
            {atEnd ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  if (!portalTarget) return null;
  return createPortal(tour, portalTarget);
}
