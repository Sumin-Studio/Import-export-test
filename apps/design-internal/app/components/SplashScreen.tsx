import { useState, useCallback, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import splashAnimation from "~/assets/splash-animation.json";

const SPLASH_KEY = "splash-last-shown";
const SPLASH_INTERVAL_DAYS = 30;

function shouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("intro") === "true") return true;
  const stored = localStorage.getItem(SPLASH_KEY);
  if (!stored) return true;
  const lastShown = new Date(stored).getTime();
  if (isNaN(lastShown)) return true;
  const daysSince = (Date.now() - lastShown) / (1000 * 60 * 60 * 24);
  return daysSince >= SPLASH_INTERVAL_DAYS;
}

function markSplashShown(): void {
  localStorage.setItem(SPLASH_KEY, new Date().toISOString());
}

export function SplashScreen() {
  const [visible] = useState(() => shouldShowSplash());
  const [phase, setPhase] = useState<"animating" | "holding" | "exiting" | "done">(
    () => (shouldShowSplash() ? "animating" : "done")
  );
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const holdDuration = 100;
  const exitDuration = 400;
  const quickExitDuration = 300;

  const finish = useCallback(() => {
    markSplashShown();
    setPhase("done");
  }, []);

  const skip = useCallback(() => {
    if (phase === "exiting" || phase === "done") return;
    setPhase("exiting");
    setTimeout(finish, quickExitDuration);
  }, [phase, finish]);

  const handleAnimationComplete = useCallback(() => {
    setPhase("holding");
    setTimeout(() => setPhase("exiting"), holdDuration);
    setTimeout(finish, holdDuration + exitDuration);
  }, [finish]);

  if (!visible || phase === "done") return null;

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: phase === "exiting" ? 0 : 1,
        transition: `opacity ${phase === "exiting" ? quickExitDuration : exitDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: phase === "exiting" ? "none" : "auto",
      }}
    >
      <div style={{ width: 600, height: 400 }}>
        <Lottie
          lottieRef={lottieRef}
          animationData={splashAnimation}
          loop={false}
          autoplay={true}
          onComplete={handleAnimationComplete}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
