"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  topOffset: 0,
  leftOffset: 0,
  src: "",
  pointerEvents: false,
  isVisible: true,
};

export function FigmaOverlay() {
  const [settings, setSettings] = useState<OverlaySettings>(DEFAULT_SETTINGS);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  // Load settings from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional SSR-safe localStorage init
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved iframe settings:", e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change (after initial render)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

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
      {/* Figma iframe in portal for absolute positioning relative to document */}
      {settings.src &&
        createPortal(
          <iframe
            src={settings.src}
            className="fixed inset-0 h-full w-full"
            style={{
              top: `${settings.topOffset}px`,
              left: `${settings.leftOffset}px`,
              opacity: settings.opacity / 100,
              pointerEvents: settings.pointerEvents ? "auto" : "none",
              display: settings.isVisible ? "block" : "none",
            }}
            aria-hidden={!settings.isVisible}
            suppressHydrationWarning
          />,
          document.body
        )}

      {/* Control Panel Button */}
      <Button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className="size-10 rounded-full"
        size="icon"
        aria-label="Toggle overlay controls"
        title="Figma overlay controls"
      >
        <Icon name="EllipsesVertical" size="large" />
      </Button>

      {/* Control Panel Dialog */}
      <Dialog
        open={isControlsOpen}
        onOpenChange={setIsControlsOpen}
        modal={false}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Figma Overlay Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Visibility Toggle */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="visibility"
                checked={settings.isVisible}
                onCheckedChange={handleVisibilityToggle}
              />
              <div className="flex-1">
                <label
                  htmlFor="visibility"
                  className="cursor-pointer font-semibold"
                >
                  Show Overlay
                </label>
                <p className="text-muted-foreground mt-1 text-sm">
                  {settings.isVisible
                    ? "Overlay is visible"
                    : "Overlay is hidden"}
                </p>
              </div>
            </div>

            {/* Opacity Control */}
            <div>
              <label className="mb-3 block font-semibold">
                Opacity: {settings.opacity}%
              </label>
              <Slider
                value={[settings.opacity]}
                onValueChange={(value) => handleOpacityChange(value[0])}
                min={0}
                max={100}
                step={1}
                className="mb-2"
              />
            </div>

            {/* Top Offset Control */}
            <div>
              <label className="mb-3 block font-semibold">
                Top Offset: {settings.topOffset}px
              </label>
              <Slider
                value={[settings.topOffset]}
                onValueChange={(value) => handleTopOffsetChange(value[0])}
                min={-1000}
                max={1000}
                step={1}
                className="mb-2"
              />
            </div>

            {/* Left Offset Control */}
            <div>
              <label className="mb-3 block font-semibold">
                Left Offset: {settings.leftOffset}px
              </label>
              <Slider
                value={[settings.leftOffset]}
                onValueChange={(value) => handleLeftOffsetChange(value[0])}
                min={-1000}
                max={1000}
                step={1}
                className="mb-2"
              />
            </div>

            {/* Pointer Events Toggle */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="pointerEvents"
                checked={settings.pointerEvents}
                onCheckedChange={handlePointerEventsToggle}
              />
              <div className="flex-1">
                <label
                  htmlFor="pointerEvents"
                  className="cursor-pointer font-semibold"
                >
                  Enable Pointer Events
                </label>
                <p className="text-muted-foreground mt-1 text-sm">
                  {settings.pointerEvents
                    ? "Overlay is interactive"
                    : "Overlay is clickthrough"}
                </p>
              </div>
            </div>

            {/* URL Control */}
            <div>
              <label className="mb-2 block font-semibold">Figma URL</label>
              <Textarea
                value={settings.src}
                onChange={(e) => handleSrcChange(e.target.value)}
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            {/* Reset Button */}
            <Button onClick={handleReset} variant="tertiary" className="w-full">
              Reset to Defaults
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
