"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Welcome from "@/app/assets/images/welcome.webp";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false); // Start with false to prevent hydration mismatch
  const [isHydrated, setIsHydrated] = useState(false);

  // Only show the popup after hydration to prevent hydration mismatch
  useEffect(() => {
    setIsHydrated(true);
    setIsOpen(true); // Now show the popup after hydration
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      if (typeof window !== "undefined") {
        // Mark dismissal on window to help late listeners
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__welcomeDismissed = true;
        window.dispatchEvent(new CustomEvent("welcome-dismissed"));
      }
    } catch {
      // no-op
    }
  };

  // Don't render anything until after hydration
  if (!isHydrated) {
    return null;
  }
  return (
    <Dialog
      transition
      open={isOpen}
      onClose={handleClose}
      aria-label="Preview a reimagined Xero"
      className="fixed inset-0 z-60 flex w-screen items-center justify-center bg-[#000A1E]/75 p-4 opacity-100 transition-all duration-200 ease-in-out outline-none data-closed:opacity-0"
    >
      <DialogPanel className="relative max-h-[calc(100vh-2rem)] w-full max-w-[600px] overflow-x-hidden overflow-y-auto rounded-2xl">
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
          >
            <rect
              width="32"
              height="32"
              fill="#fff"
              fillOpacity="0.65"
              rx="16"
            ></rect>
            <path
              fill="#59606D"
              fillRule="evenodd"
              d="M15.657 14.243 11.414 10 10 11.414l4.243 4.243L10 19.899l1.414 1.415 4.243-4.243 4.242 4.243 1.415-1.415-4.243-4.242 4.243-4.243L19.899 10z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {/* <video
          src="/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full aspect-[600/222] object-cover"
        /> */}
        <Image
          src={Welcome}
          alt="Intro"
          width={800}
          height={252}
          className="w-full"
          priority
          fetchPriority="high"
        />
        <div className="bg-white px-8 py-6 text-[15px]/[24px]">
          <h2 className="mb-4 text-[24px]/[133%] font-bold">
            You’re previewing Xero Partner Hub
          </h2>
          <h3 className="mb-3">What’s different?</h3>
          <h4 className="font-bold">Simplified navigation</h4>
          <p className="mb-4 text-[#404756]">
            Get everything you use today across Xero’s practice tools connected
            and unified as one.
          </p>
          <h4>
            <span className="font-bold">Customisable homepage</span>
          </h4>
          <p className="mb-5 text-[#404756]">
            A new personalised homepage puts the information you need at your
            fingertips. Customise to show what’s most useful to you.
          </p>
          <h4>
            <span className="font-bold">AI powered insights</span>
          </h4>
          <p className="mb-5 text-[#404756]">
            Easily access Just Ask Xero (JAX), your AI financial superagent, to
            help handle prep work and get actionable insights across your client
            base.
          </p>
          <h4>
            <span className="font-bold">Run your practice your way</span>
          </h4>
          <p className="mb-5 text-[#404756]">
            Customise your Xero Partner Hub with an ecosystem of connected apps,
            now available to all practices.
          </p>
          <div className="mb-6 inline-flex items-start gap-2 rounded-lg border border-[#E6E7E9] px-3 py-1.5 text-[13px]/[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              className="mt-1 flex-none"
            >
              <path
                fill="#59606D"
                fillRule="evenodd"
                d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15M7 3h1.998v1.998H7zm2 7V6H6v1h1v3H6v1h4v-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Please note this is a prototype. Functionality is limited and the
            design may change as we get your feedback.
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="border-brand-primary bg-brand-primary relative inline-block w-auto flex-none rounded-[48px] border px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-all duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF]"
            >
              Continue to prototype
            </button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
