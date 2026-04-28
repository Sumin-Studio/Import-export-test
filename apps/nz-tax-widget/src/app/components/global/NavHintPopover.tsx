"use client";

import * as React from "react";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";

export default function NavHintPopover() {
  const hintButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: number | undefined;
    const onWelcomeDismissed = () => {
      timeoutId = window.setTimeout(() => {
        if (hintButtonRef.current) {
          hintButtonRef.current.click();
        }
      }, 1000);
    };

    window.addEventListener(
      "welcome-dismissed",
      onWelcomeDismissed as EventListener
    );
    // Fallback: if welcome already dismissed before this mounted, open once
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alreadyDismissed = (window as any).__welcomeDismissed === true;
    if (alreadyDismissed) {
      onWelcomeDismissed();
    }
    return () => {
      window.removeEventListener(
        "welcome-dismissed",
        onWelcomeDismissed as EventListener
      );
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Popover key="hint" className="relative">
      {({ close }) => (
        <>
          {/* Hidden button used to programmatically open the popover.
              Keep it in-layout so anchoring positions the panel correctly. */}
          <PopoverButton
            ref={hintButtonRef}
            inert
            suppressHydrationWarning
            className="absolute top-1 left-0 h-8 w-8 opacity-0"
          />
          <PopoverPanel
            anchor={{ to: "bottom start" }}
            className="border-border-primary z-30 -mt-2 flex w-[400px] translate-y-0 flex-col !overflow-visible rounded-lg border bg-white text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
            transition
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="8"
              fill="none"
              className="absolute -top-2 left-3 z-10"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="m3 8 7-7 7 7z"
                clipRule="evenodd"
              ></path>
              <path stroke="#ccced2" d="M1.793 8.5 10 .293 18.207 8.5z"></path>
            </svg>
            <div className="mt-3 mr-3 ml-5 flex items-center justify-between gap-2">
              <h3 className="text-[17px]/[28px] font-bold">
                Prototype navigation
              </h3>
              <CloseButton
                className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
                onClick={close}
              >
                <span className="sr-only">Close</span>
                <Close fill="fill-content-secondary" />
              </CloseButton>
            </div>
            <p className="mx-5 my-3 text-[15px]/[24px]">
              Navigation will reflect the existing tools you have today across
              Xero HQ, XPM and Tax. You can add the Xero practice tools you
              need, so that items like &apos;Jobs&apos; will appear if they are
              included in your Xero Partner Hub subscription.
            </p>
            <CloseButton
              className="border-brand-primary bg-brand-primary relative mt-1 mr-5 mb-4 ml-auto inline-block w-auto flex-none rounded-[48px] border px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-all duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF]"
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
