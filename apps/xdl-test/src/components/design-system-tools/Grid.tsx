"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Grid({
  width = "standard",
  slideOver = false,
}: {
  width?: "full" | "standard";
  slideOver?: boolean;
}) {
  const [sidebarEnabled, setSidebarEnabled] = useState(false);
  const [widthState, setWidthState] = useState(width);
  const [slideOverEnabled, setSlideOverEnabled] = useState(slideOver);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-5 left-10">
        <Button onClick={() => setSidebarEnabled(!sidebarEnabled)}>
          Toggle Sidebar ({sidebarEnabled ? "On" : "Off"})
        </Button>
        <Button
          onClick={() => setSlideOverEnabled(!slideOverEnabled)}
          className="ml-2"
        >
          Toggle Slide Over ({slideOverEnabled ? "On" : "Off"})
        </Button>
        <Button
          onClick={() =>
            setWidthState(widthState === "full" ? "standard" : "full")
          }
          className="ml-2"
        >
          Toggle Width ({widthState === "full" ? "Full" : "Standard"})
        </Button>
      </div>

      <div
        className={`bg-background-secondary absolute top-0 right-0 bottom-0 left-0 z-50 flex w-full transform overflow-hidden transition-all duration-300 ease-in-out min-[641px]:left-auto min-[641px]:w-[320px] min-[1341px]:w-[400px] ${sidebarEnabled ? "translate-x-0" : "translate-x-full"}`}
      >
        <Button onClick={() => setSidebarEnabled(false)}>Close Sidebar</Button>
      </div>

      <div
        className={`mx-auto grid w-full max-w-[1260px] grid-cols-4 gap-5 px-5 transition-[padding] lg:grid-cols-12 ${widthState === "full" ? "max-w-full" : "max-w-[1260px]"} ${sidebarEnabled && !slideOverEnabled ? "min-[641px]:pr-[340px] min-[1341px]:pr-[420px]" : ""}`}
      >
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
        <div className="bg-background-quaternary h-96"></div>
      </div>
    </div>
  );
}
