"use client";

import { useEffect, useState } from "react";
import { resetAllCertStatuses } from "@/lib/certification/status";
import { Button } from "@/components/form";

export default function PrototypeSettingsButton() {
  const [open, setOpen] = useState(false);
  const [justReset, setJustReset] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleReset = () => {
    resetAllCertStatuses();
    setJustReset(true);
    window.setTimeout(() => setJustReset(false), 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 items-center gap-1.5 rounded px-2.5 text-[13px] font-bold text-white hover:bg-white/12"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="2.2" />
          <path
            d="M10 3v2m0 10v2m7-7h-2M5 10H3m12.07-4.07l-1.4 1.4M6.34 13.66l-1.4 1.4m0-10.13l1.4 1.4m7.32 7.33l1.4 1.4"
            strokeLinecap="round"
          />
        </svg>
        Prototype settings
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="prototype-settings-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border-secondary px-5 py-4">
              <div>
                <div
                  id="prototype-settings-title"
                  className="text-[16px] font-bold text-content-primary"
                >
                  Prototype settings
                </div>
                <div className="mt-0.5 text-[12px] text-content-secondary">
                  Controls for demo and review purposes only.
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="-mr-1 inline-flex h-8 w-8 items-center justify-center rounded text-content-secondary hover:bg-background-tertiary"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3l8 8M11 3l-8 8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4 px-5 py-4">
              <div>
                <div className="text-[14px] font-bold text-content-primary">
                  Reset prototype
                </div>
                <div className="mt-1 text-[13px] text-content-secondary">
                  Clears submitted certification for this tab&apos;s session so
                  you can run through the flow again. Other visitors or tabs are
                  unaffected.
                </div>
              </div>

              {justReset && (
                <div className="rounded border border-positive/30 bg-positive/10 px-3 py-2 text-[13px] text-positive">
                  Prototype reset. You can submit again.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border-secondary bg-background-tertiary/40 px-5 py-3">
              <Button variant="tertiary" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button variant="secondary" size="sm" onClick={handleReset}>
                Reset prototype
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
