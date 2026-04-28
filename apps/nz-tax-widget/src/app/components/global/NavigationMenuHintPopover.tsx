"use client";

import * as React from "react";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";

interface ElementRect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

export default function NavigationMenuHintPopover() {
  const hintButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [isClient, setIsClient] = React.useState(false);
  const [elementRect, setElementRect] = React.useState<ElementRect | null>(
    null
  );

  React.useEffect(() => {
    setIsClient(true);

    // Check if hint was already dismissed (only during this session)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isDismissed = (window as any).__navigationMenuHintDismissed === true;

    if (isDismissed) return;

    const onNavigationMenuTriggered = (
      event: CustomEvent & {
        detail?: {
          element?: HTMLElement;
          navKey?: string;
          rect?: ElementRect;
        };
      }
    ) => {
      // Skip hint for these items (no "Functionality is limited" popover)
      const skipNavKeys = new Set(["workpapers", "tax"]);
      if (
        event.detail?.navKey &&
        skipNavKeys.has(event.detail.navKey)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__navigationMenuHintDismissed = true;
        window.removeEventListener(
          "navigationMenuTriggered",
          onNavigationMenuTriggered as EventListener
        );
        return;
      }
      // Store element rect from event
      if (event.detail?.rect) {
        setElementRect(event.detail.rect);
      }
      if (hintButtonRef.current) {
        hintButtonRef.current.click();
      }
      // Mark as dismissed for this session only
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__navigationMenuHintDismissed = true;
      // Remove listener after first trigger
      window.removeEventListener(
        "navigationMenuTriggered",
        onNavigationMenuTriggered as EventListener
      );
    };

    window.addEventListener(
      "navigationMenuTriggered",
      onNavigationMenuTriggered as EventListener
    );

    return () => {
      window.removeEventListener(
        "navigationMenuTriggered",
        onNavigationMenuTriggered as EventListener
      );
    };
  }, []);

  if (!isClient) return null;

  return (
    <Popover key="navigationMenuHint" className="relative">
      {({ close }) => (
        <>
          {/* Hidden button used to programmatically open the popover.
              Position it at the center bottom of the clicked element's location. */}
          <PopoverButton
            ref={hintButtonRef}
            inert
            suppressHydrationWarning
            className="fixed ml-[180px] h-0 w-0 opacity-0"
            style={{
              left: elementRect
                ? `${elementRect.left + elementRect.width / 2}px`
                : "0px",
              top: elementRect ? `${elementRect.bottom + 28}px` : "0px",
            }}
          />
          <PopoverPanel
            anchor={{ to: "bottom" }}
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
                Functionality is limited
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
              The prototype shows this initial screen only as there is no change
              to your current experience.
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
