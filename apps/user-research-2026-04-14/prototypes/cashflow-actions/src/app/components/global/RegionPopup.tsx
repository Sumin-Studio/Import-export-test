"use client";

import { useRegion } from "@/app/contexts/RegionContext";
import { RegionSelector } from "@/app/components/global/RegionSelector";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

export function RegionPopup() {
  const { region, showPopup, dismissPopup } = useRegion();

  const regionNames: Record<string, string> = {
    UK: "the United Kingdom",
    USA: "the United States",
    CA: "Canada",
    NZ: "New Zealand",
    AU: "Australia",
  };

  return (
    <Dialog
      transition
      open={showPopup}
      onClose={dismissPopup}
      className="fixed inset-0 opacity-100 flex w-screen items-center z-60 justify-center bg-black/25 p-4 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 mb-2">
            Welcome to our Beta
          </DialogTitle>
          <Description className="text-sm text-gray-500 mb-4">
            We detected you&apos;re from {regionNames[region] || region}.
          </Description>

          <div className="flex flex-col space-y-4 py-4">
            <p>
              If we&apos;ve made a mistake, you can select your region below:
            </p>
            <RegionSelector />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={dismissPopup}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
