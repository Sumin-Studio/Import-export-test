"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {

  return (
    <Dialog
      transition
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 opacity-100 flex w-screen items-center z-60 justify-center bg-black/25 p-4 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative z-10 w-full max-w-md rounded-t-[10px] bg-[#F2F8FC] shadow-lg">
          <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-[#F2F8FC] pl-5 pr-3">
            <h2 className="text-[17px]/[28px] font-bold">Share feedback</h2>
            <button
              className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary transition-colors duration-200"
              onClick={onClose}
              type="button"
            >
              <span className="sr-only">Close</span>
              <Close className="text-[#5a606c]" />
            </button>
          </div>
          <div className="p-5">
            <p className="text-[13px]/[20px] text-content-secondary">
              Please reach out to Robb Schiller on Slack with any feedback.
            </p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

