"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "certification-prototype-demo-instructions-dismissed";

type DemoInstructionsContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const DemoInstructionsContext =
  createContext<DemoInstructionsContextValue | null>(null);

export function useDemoInstructions() {
  const ctx = useContext(DemoInstructionsContext);
  if (!ctx) {
    throw new Error(
      "useDemoInstructions must be used within DemoInstructionsProvider",
    );
  }
  return ctx;
}

function DemoInstructionsFlyout({ onClose }: { onClose: () => void }) {
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 z-50 bg-[rgb(0_10_30/0.45)]"
        style={{ top: 60 }}
        aria-label="Close demo instructions"
        onClick={onClose}
      />
      <div
        id="demo-instructions-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed bottom-0 right-0 z-[51] flex max-h-[calc(100vh-60px)] w-full max-w-md flex-col border-l border-border-secondary bg-white shadow-[0_8px_32px_rgb(0_10_30_/0.18)] md:rounded-tl-lg"
        style={{ top: 60 }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border-secondary px-5 py-4">
          <h2
            id={titleId}
            className="text-[16px] font-bold leading-snug text-content-primary"
          >
            How to use this demo
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded px-2 py-1 text-[13px] font-bold text-action-primary hover:bg-action-tertiary"
          >
            Close
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-[14px] leading-relaxed text-content-secondary">
          <p className="m-0 text-content-primary">
            This prototype shows an AI-assisted certification experience for
            Xero apps. Use it to explore layout, copy, and flow — not production
            behaviour.
          </p>

          <h3 className="mb-2 mt-5 text-[12px] font-bold uppercase tracking-wide text-content-primary">
            What you can try
          </h3>
          <ul className="m-0 list-disc space-y-2 pl-5">
            <li>
              Open an app from <strong className="font-bold">My Apps</strong>{" "}
              and browse app details and the left navigation.
            </li>
            <li>
              Use the certification entry points (banner or launcher) and step
              through the submission flow.
            </li>
            <li>
              Review AI-style suggestions and edit fields — interactions are
              local to this session.
            </li>
            <li>
              Open <strong className="font-bold">Prototype settings</strong> in
              the header to reset certification state and refresh the page.
            </li>
          </ul>

          <h3 className="mb-2 mt-5 text-[12px] font-bold uppercase tracking-wide text-content-primary">
            What it does not do
          </h3>
          <ul className="m-0 list-disc space-y-2 pl-5">
            <li>No real Xero API calls or live app data.</li>
            <li>
              Analysis, progress, and suggestions are mocked for demonstration.
            </li>
            <li>
              Nothing you enter is sent to a server; certification submission
              state is kept in this tab only (cleared when you close the tab).
            </li>
          </ul>

          <p className="mb-0 mt-5 rounded-md bg-action-tertiary px-3 py-2 text-[13px] text-content-tertiary">
            Tip: Press{" "}
            <kbd className="rounded border border-border-primary bg-white px-1.5 py-0.5 font-sans text-[12px] font-bold text-content-primary">
              Esc
            </kbd>{" "}
            or click outside this panel to close it. Use the{" "}
            <span className="font-bold text-content-primary">?</span> icon in
            the header to open these instructions again.
          </p>
        </div>
      </div>
    </>
  );
}

export function DemoInstructionsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
      setIsOpen(!dismissed);
    } catch {
      setIsOpen(true);
    }
  }, []);

  const close = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const value: DemoInstructionsContextValue = {
    open,
    close,
    isOpen,
  };

  return (
    <DemoInstructionsContext.Provider value={value}>
      {children}
      {isOpen ? <DemoInstructionsFlyout onClose={close} /> : null}
    </DemoInstructionsContext.Provider>
  );
}
