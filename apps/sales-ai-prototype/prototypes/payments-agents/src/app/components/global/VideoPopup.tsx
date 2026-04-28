"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import YouTube from "react-youtube";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPopup({ isOpen, onClose }: VideoPopupProps) {
  return (
    <Dialog
      transition
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 opacity-100 flex w-screen items-center z-60 justify-center bg-black/25 p-4 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full h-auto max-w-4xl rounded-lg overflow-hidden">
          <YouTube
            iframeClassName="aspect-video w-full h-auto"
            videoId="cZE6GEjnfjc"
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
