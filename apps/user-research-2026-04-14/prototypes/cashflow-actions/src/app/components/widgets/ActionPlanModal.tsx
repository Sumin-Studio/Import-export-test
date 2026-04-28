"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Close } from "@/app/components/ui/icons";
import type { ActionPlanModalConfig } from "./actionPlanModalConfigs";
import { ActionPlanPanel } from "./ActionPlanPanel";

interface ActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ActionPlanModalConfig | null;
  /** When set (e.g. `?scenario=diya-demo`), runs before close — open JAX + Melio prep. */
  onApplyPlan?: () => void;
}

export function ActionPlanModal({
  isOpen,
  onClose,
  config,
  onApplyPlan,
}: ActionPlanModalProps) {
  if (!config) return null;

  const isEmergency = config.variant === "emergency";

  return (
    <Dialog
      transition
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-60 flex w-screen items-center justify-center bg-black/25 p-4 opacity-100 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative z-10 flex max-h-[85vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
          <div
            className={`flex shrink-0 items-center justify-between px-6 py-4 ${
              isEmergency ? "bg-[#FDF2F4]" : "bg-white"
            }`}
          >
            <div>
              {isEmergency && (
                <span className="mb-1 inline-block rounded-[3px] bg-[#DE0E40] px-1.5 py-0.5 text-[11px]/[16px] font-bold uppercase tracking-wide text-white">
                  Critical
                </span>
              )}
              <h2 className="text-[17px]/[28px] font-bold text-content-primary">
                {config.title}
              </h2>
              <p className="mt-1 text-[13px]/[20px] text-content-secondary">
                {config.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <Close fill="fill-content-secondary" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <ActionPlanPanel
              config={config}
              initialShowPlanned={!isEmergency}
            />
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-background-tertiary bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-colors hover:bg-[#eff1f2]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onApplyPlan?.();
                onClose();
              }}
              className="rounded-[48px] bg-brand-primary px-4 py-2 text-[13px]/[16px] font-bold text-white transition-colors hover:bg-brand-secondary"
            >
              Apply plan
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ActionPlanModal;
