"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Welcome from "@/app/assets/images/welcome.webp";

export function WelcomePopup() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Only render Dialog after mount to avoid hydration mismatch (Headless UI Dialog portals to body)
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
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

  if (!mounted) {
    return null;
  }

  return (
    <Dialog
      transition
      open={isOpen}
      onClose={handleClose}
      aria-label="Preview this interactive design prototype"
      className="fixed inset-0 opacity-100 flex w-screen items-center z-60 justify-center bg-[#000A1E]/75 outline-none p-4 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <DialogPanel className="w-full max-w-[600px] rounded-2xl overflow-hidden relative">
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
        <Image src={Welcome} alt="Intro" className="w-full" />
        <div className="bg-white py-6 px-8 text-[15px]/[24px]">
          <h2 className="text-[24px]/[133%] font-bold mb-4">
            You’re previewing an interactive design prototype
          </h2>
          <h3 className="mb-3">What to expect</h3>
          <h4 className="font-bold">Sample experience</h4>
          <p className="mb-4 text-[#404756]">
            Layouts, widgets, and flows here use placeholder content so you can explore interactions
            without real customer data.
          </p>
          <h4>
            <span className="font-bold">Customise this shell</span>
          </h4>
          <p className="mb-5 text-[#404756]">
            Fork or duplicate the project to swap copy, regions, and components for your own concept
            tests and usability sessions.
          </p>
          <div className="text-[13px]/[20px] inline-flex items-start gap-2 mb-6 border border-[#E6E7E9] rounded-lg py-1.5 px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              className="flex-none mt-1"
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
              className="relative inline-block w-auto flex-none rounded-[48px] border border-brand-primary bg-brand-primary px-3 py-[6px] text-[13px]/[16px] font-bold text-white transition-all duration-200 ease-in-out hover:border-[#0073BF] hover:bg-[#0073BF]"
            >
              Continue
            </button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}