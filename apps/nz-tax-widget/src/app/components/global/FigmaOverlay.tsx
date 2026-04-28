"use client";

import { useState, useEffect } from "react";
import { useIframe } from "@/app/contexts/IframeContext";

const STORAGE_KEY = "figma-overlay-settings";

interface OverlaySettings {
  opacity: number;
  topOffset: number;
  leftOffset: number;
  src: string;
  pointerEvents: boolean;
  isVisible: boolean;
}

const DEFAULT_SETTINGS: OverlaySettings = {
  opacity: 50,
  topOffset: 40,
  leftOffset: 0,
  src: "",
  pointerEvents: false,
  isVisible: true,
};

export function FigmaOverlay() {
  const { isIframeVisible } = useIframe();
  const [settings, setSettings] = useState<OverlaySettings>(DEFAULT_SETTINGS);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved iframe settings:", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isHydrated]);

  if (!isHydrated || !isIframeVisible) {
    return null;
  }

  const handleOpacityChange = (value: number) => {
    setSettings((prev) => ({ ...prev, opacity: value }));
  };

  const handleTopOffsetChange = (value: number) => {
    setSettings((prev) => ({ ...prev, topOffset: value }));
  };

  const handleLeftOffsetChange = (value: number) => {
    setSettings((prev) => ({ ...prev, leftOffset: value }));
  };

  const handleSrcChange = (value: string) => {
    setSettings((prev) => ({ ...prev, src: value }));
  };

  const handlePointerEventsToggle = () => {
    setSettings((prev) => ({ ...prev, pointerEvents: !prev.pointerEvents }));
  };

  const handleVisibilityToggle = () => {
    setSettings((prev) => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {/* Figma iframe */}
      <iframe
        src={settings.src}
        className="absolute inset-0 z-50 h-full w-[1600px]"
        style={{
          top: `${settings.topOffset}px`,
          left: `${settings.leftOffset}px`,
          opacity: settings.opacity / 100,
          pointerEvents: settings.pointerEvents ? "auto" : "none",
          display: settings.isVisible ? "block" : "none",
        }}
        aria-hidden="true"
      />

      {/* Control Panel Button */}
      <button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className="bg-brand-primary fixed right-4 bottom-4 z-50 flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-[#0073BF]"
        aria-label="Toggle overlay controls"
        title="Figma overlay controls"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </button>

      {/* Control Panel */}
      {isControlsOpen && (
        <div className="fixed right-4 bottom-16 z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold">Figma Overlay Settings</h3>
            <button
              onClick={() => setIsControlsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close controls"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Visibility Toggle */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.isVisible}
                  onChange={handleVisibilityToggle}
                  className="rounded border-gray-300"
                />
                <span className="text-xs font-semibold text-gray-700">
                  Show Overlay
                </span>
              </label>
              <p className="mt-1 text-xs text-gray-500">
                {settings.isVisible
                  ? "Overlay is visible"
                  : "Overlay is hidden"}
              </p>
            </div>

            {/* Opacity Control */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Opacity: {settings.opacity}%
              </label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.opacity}
                  onChange={(e) => handleOpacityChange(Number(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.opacity}
                  onChange={(e) => handleOpacityChange(Number(e.target.value))}
                  className="focus:ring-brand-primary w-16 rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-700 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Top Offset Control */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Top Offset: {settings.topOffset}px
              </label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={settings.topOffset}
                  onChange={(e) =>
                    handleTopOffsetChange(Number(e.target.value))
                  }
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={settings.topOffset}
                  onChange={(e) =>
                    handleTopOffsetChange(Number(e.target.value))
                  }
                  className="focus:ring-brand-primary w-16 rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-700 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Left Offset Control */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Left Offset: {settings.leftOffset}px
              </label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={settings.leftOffset}
                  onChange={(e) =>
                    handleLeftOffsetChange(Number(e.target.value))
                  }
                  className="flex-1"
                />
                <input
                  type="number"
                  min="-200"
                  max="200"
                  value={settings.leftOffset}
                  onChange={(e) =>
                    handleLeftOffsetChange(Number(e.target.value))
                  }
                  className="focus:ring-brand-primary w-16 rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-700 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Pointer Events Toggle */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.pointerEvents}
                  onChange={handlePointerEventsToggle}
                  className="rounded border-gray-300"
                />
                <span className="text-xs font-semibold text-gray-700">
                  Enable Pointer Events
                </span>
              </label>
              <p className="mt-1 text-xs text-gray-500">
                {settings.pointerEvents
                  ? "Overlay is interactive"
                  : "Overlay is clickthrough"}
              </p>
            </div>

            {/* URL Control */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700">
                Figma URL
              </label>
              <textarea
                value={settings.src}
                onChange={(e) => handleSrcChange(e.target.value)}
                className="focus:ring-brand-primary w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 font-mono text-xs focus:ring-2 focus:outline-none"
                rows={4}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full rounded bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </>
  );
}
