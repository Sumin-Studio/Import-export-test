"use client";

import { useState } from "react";
import { VideoButton } from "./VideoButton";
import { VideoPopup } from "./VideoPopup";

export function VideoComponents() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <VideoPopup isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <VideoButton onClick={() => setIsVideoOpen(true)} />
    </>
  );
}
