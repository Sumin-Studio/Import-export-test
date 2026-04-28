"use client";

import { ControlsProvider, useControls } from "@/app/contexts/ControlsContext";
import ThemeSwitcher from "@/components/design-system-tools/ThemeSwitcher";
import DesignSystemSheet from "@/components/design-system-tools/DesignSystemSheet";
import { FigmaOverlay } from "@/components/global";
import { useHotkeys } from "react-hotkeys-hook";
import { KbdGroup, Kbd } from "@/components/ui/kbd";

function ControlsContent() {
  const { isControlsVisible, toggleControls } = useControls();

  useHotkeys(
    "alt+c, option+c",
    () => {
      toggleControls();
    },
    { enableOnFormTags: true }
  );

  return (
    <>
      {/* Delete these before going to production */}
      <div
        className="fixed right-4 bottom-4 z-50 flex items-center gap-4"
        style={{ display: isControlsVisible ? "flex" : "none" }}
      >
        <KbdGroup>
          toggle with <Kbd>⌥</Kbd>+<Kbd>c</Kbd>
        </KbdGroup>
        <ThemeSwitcher />
        <DesignSystemSheet />
        <FigmaOverlay />
      </div>
    </>
  );
}

export default function PrototypeControls() {
  return (
    <ControlsProvider>
      <ControlsContent />
    </ControlsProvider>
  );
}
