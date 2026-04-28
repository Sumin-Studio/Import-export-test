"use client";

import * as React from "react";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";

type NavHintPopoverProps = {
  containerClassName?: string;
  buttonClassName?: string;
  children: React.ReactNode;
};

export default function NavHintPopover({
  containerClassName = "relative",
  buttonClassName = "absolute inset-0 h-full w-full opacity-0 pointer-events-none",
  children,
}: NavHintPopoverProps) {
  const hintButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [shouldTrigger, setShouldTrigger] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: number | undefined;
    const onWelcomeDismissed = () => {
      // Wait a bit longer to ensure the widget is fully rendered
      timeoutId = window.setTimeout(() => {
        setShouldTrigger(true);
        // Try multiple times to ensure it works
        const attemptClick = () => {
          if (hintButtonRef.current) {
            hintButtonRef.current.click();
          } else {
            // Retry if button not ready
            setTimeout(attemptClick, 100);
          }
        };
        attemptClick();
      }, 1500);
    };

    window.addEventListener(
      "welcome-dismissed",
      onWelcomeDismissed as EventListener
    );
    // Fallback: if welcome already dismissed before this mounted, open once
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alreadyDismissed = (window as any).__welcomeDismissed === true;
    if (alreadyDismissed) {
      // Wait a bit for the component to mount
      const mountTimeout = window.setTimeout(() => {
        onWelcomeDismissed();
      }, 1000);
      return () => {
        window.removeEventListener(
          "welcome-dismissed",
          onWelcomeDismissed as EventListener
        );
        if (timeoutId) window.clearTimeout(timeoutId);
        window.clearTimeout(mountTimeout);
      };
    }
    return () => {
      window.removeEventListener(
        "welcome-dismissed",
        onWelcomeDismissed as EventListener
      );
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  // Try to click the button when shouldTrigger becomes true
  React.useEffect(() => {
    if (!shouldTrigger) return;

    // Wait for the button to be in the DOM and try multiple times
    const attemptClick = (attempts = 0) => {
      if (attempts > 10) {
        console.warn("NavHintPopover: Could not find button after 10 attempts");
        return;
      }

      if (hintButtonRef.current) {
        try {
          hintButtonRef.current.click();
        } catch (error) {
          console.error("NavHintPopover: Error clicking button", error);
        }
      } else {
        // Retry if button not ready
        setTimeout(() => attemptClick(attempts + 1), 100);
      }
    };

    // Start attempting after a short delay
    const timer = setTimeout(() => {
      attemptClick();
    }, 200);

    return () => clearTimeout(timer);
  }, [shouldTrigger]);

  return (
    <Popover key="hint" className={containerClassName}>
      {({ close }) => (
        <>
          {children}
          {/* Hidden button overlaying the target widget to anchor the panel */}
          <PopoverButton
            ref={hintButtonRef}
            aria-hidden="true"
            tabIndex={-1}
            suppressHydrationWarning
            className={buttonClassName}
            onClick={(e) => {
              // Ensure click works even with pointer-events-none
              e.stopPropagation();
            }}
          />
          <PopoverPanel
            anchor={{ to: "right start" }}
            className="z-30 flex w-[400px] -ml-3 -translate-y-1 !overflow-visible flex-col rounded-lg border border-border-primary bg-white text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
            transition
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="8"
              fill="none"
              className="absolute -left-[14px] top-4 z-10 rotate-90"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="m3 8 7-7 7 7z"
                clipRule="evenodd"
              ></path>
              <path stroke="#ccced2" d="M1.793 8.5 10 .293 18.207 8.5z"></path>
            </svg>
            <div className="flex gap-2 items-center justify-between ml-5 mr-3 mt-3">
              <h3 className="text-[17px]/[28px] font-bold">
                Spend card widget
              </h3>
              <CloseButton
                className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
                onClick={close}
              >
                <span className="sr-only">Close</span>
                <Close fill="fill-content-secondary" />
              </CloseButton>
            </div>
            <p className="mx-5 my-3 text-[15px]/[24px]">
              The Spend Card widget gives you quick access to your card balance and
              recent activity. Click on it to view all your cards and transactions.
            </p>
            <CloseButton
              className="relative mb-4 mr-5 ml-auto mt-1 inline-block w-auto flex-none rounded-[48px] border border-brand-primary bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-all duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF]"
              onClick={close}
            >
              Close
            </CloseButton>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
