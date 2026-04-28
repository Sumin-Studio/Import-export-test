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
            inert
            suppressHydrationWarning
            className={buttonClassName}
          />
          <PopoverPanel
            anchor={{ to: "left start" }}
            className="border-border-primary z-30 flex w-[400px] -translate-x-3 -translate-y-1 flex-col !overflow-visible rounded-lg border bg-white text-[15px]/[20px] opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0"
            transition
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="8"
              fill="none"
              className="absolute top-4 -right-[14px] z-10 rotate-90"
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
              This prototype allows you to rearrange and temporarily save the
              layout.
            </p>
            <p className="mx-5 my-3 text-[15px]/[24px]">
              Full customisation, including the ability to show and hide
              widgets, will be available when the new homepage launches.
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
