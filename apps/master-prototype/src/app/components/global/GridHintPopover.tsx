"use client";

import * as React from "react";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";

type GridHintPopoverProps = {
  openOnMount?: boolean;
  containerClassName?: string;
  buttonClassName?: string;
};

export default function GridHintPopover({
  openOnMount = false,
  containerClassName = "relative",
  buttonClassName = "absolute inset-0 h-full w-full opacity-0 pointer-events-none",
}: GridHintPopoverProps) {
  const hintButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!openOnMount || typeof window === "undefined") return;
    // Delay slightly to ensure layout has stabilized, then open every mount
    const id = window.setTimeout(() => {
      hintButtonRef.current?.click();
    }, 300);
    return () => window.clearTimeout(id);
  }, [openOnMount]);

  return (
    <Popover key="grid-hint" className={containerClassName}>
      {({ close }) => (
        <>
          {/* Hidden button overlaying the target (Add widget) to anchor the panel */}
          <PopoverButton
            ref={hintButtonRef}
            aria-hidden="true"
            tabIndex={-1}
            suppressHydrationWarning
            className={buttonClassName}
          />
          <PopoverPanel
            anchor={{ to: "left start" }}
            className="z-30 flex w-[400px] -translate-x-3 -translate-y-1 !overflow-visible flex-col rounded-lg border border-border-primary bg-white text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
            transition
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="8"
              fill="none"
              className="absolute -right-[14px] top-4 z-10 rotate-90"
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
                Functionality is limited
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
              This prototype allows you to rearrange and temporarily save the
              layout.
            </p>
            <p className="mx-5 my-3 text-[15px]/[24px]">
              Full customisation, including the ability to show and hide
              widgets, will be available when the new homepage launches.
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
