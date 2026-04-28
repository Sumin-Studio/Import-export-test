"use client";

/**
 * Cycles between Apple Pay and Google Pay mock buttons every 15 seconds
 * with the same gradient / background-position “light sweep” pattern used in
 * common open-source button demos (not hover-driven). Interaction on the cycle
 * cancels the timer — no further sweeps and buttons stay inert.
 */

import * as React from "react";

import { MockApplePayButton } from "./MockApplePayButton";
import { MockGooglePayButton } from "./MockGooglePayButton";

import "./ExpressCheckoutCycle.scss";
import "./PocPaymentTile.scss";

const CYCLE_INTERVAL_MS = 15_000;
/** Match pspoc-mock-wallet-light + crossfade */
const SWEEP_DURATION_MS = 1000;

export interface ExpressCheckoutCycleProps {
  demoMessage?: string;
}

export function ExpressCheckoutCycle({
  demoMessage = "Demo only — Apple Pay / Google Pay is not processed on this screen.",
}: ExpressCheckoutCycleProps) {
  const [showApplePay, setShowApplePay] = React.useState(true);
  const [isSweeping, setIsSweeping] = React.useState(false);
  const [userCancelled, setUserCancelled] = React.useState(false);
  /** Ignore pointer noise during hydration / tooling — only real user gestures cancel the cycle */
  const cancelEnabledRef = React.useRef(false);

  React.useEffect(() => {
    const enable = window.setTimeout(() => {
      cancelEnabledRef.current = true;
    }, 400);
    return () => window.clearTimeout(enable);
  }, []);

  React.useEffect(() => {
    if (userCancelled) {
      return;
    }
    let sweepClear: number | undefined;
    const id = window.setInterval(() => {
      if (sweepClear !== undefined) {
        window.clearTimeout(sweepClear);
        sweepClear = undefined;
      }
      setShowApplePay((prev) => !prev);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsSweeping(true);
          sweepClear = window.setTimeout(() => {
            setIsSweeping(false);
            sweepClear = undefined;
          }, SWEEP_DURATION_MS);
        });
      });
    }, CYCLE_INTERVAL_MS);
    return () => {
      window.clearInterval(id);
      if (sweepClear !== undefined) {
        window.clearTimeout(sweepClear);
      }
    };
  }, [userCancelled]);

  const handlePointerDownCapture = (e: React.PointerEvent) => {
    if (!e.isTrusted || !cancelEnabledRef.current) {
      return;
    }
    setUserCancelled(true);
    setIsSweeping(false);
  };

  const appleSweep = !userCancelled && isSweeping && showApplePay;
  const googleSweep = !userCancelled && isSweeping && !showApplePay;

  return (
    <div
      className="pspoc-ExpressCheckoutCycle"
      onPointerDownCapture={handlePointerDownCapture}
      role="presentation"
    >
      <div
        className={`pspoc-ExpressCheckoutCycle__apple ${showApplePay ? "pspoc-ExpressCheckoutCycle__visible" : "pspoc-ExpressCheckoutCycle__hidden"}`}
      >
        <MockApplePayButton
          demoMessage={demoMessage}
          lightSweep={appleSweep}
          disableInteraction
        />
      </div>
      <div
        className={`pspoc-ExpressCheckoutCycle__google ${showApplePay ? "pspoc-ExpressCheckoutCycle__hidden" : "pspoc-ExpressCheckoutCycle__visible"}`}
      >
        <MockGooglePayButton
          demoMessage={demoMessage}
          lightSweep={googleSweep}
          disableInteraction
        />
      </div>
    </div>
  );
}
