"use client";

import { Close, Chevron } from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

export default function NotificationsPanel() {
  const { openPanel } = useNavigation();

  return (
    <>
      <div className="border-border-primary relative flex items-center justify-between gap-2 border-b py-3 pr-3 pl-5">
        <h2 className="text-[17px]/[28px] font-bold capitalize">
          Notifications
        </h2>
        <div className="flex items-center gap-3">
          <button
            className="text-brand-primary hover:bg-background-primary cursor-pointer rounded-[3px] px-3 py-[6px] text-[13px]/[20px] font-bold"
            type="button"
            aria-label="Mark all notifications as read"
          >
            Mark all as read
          </button>
          <button
            className="hover:bg-background-primary flex size-10 cursor-pointer items-center justify-center rounded-full"
            onClick={() => openPanel(null)}
            type="button"
            aria-label="Close notifications panel"
          >
            <span className="sr-only">Close</span>
            <Close fill="fill-content-secondary" />
          </button>
        </div>
      </div>
      <div className="absolute top-[65px] bottom-0 w-screen overflow-y-scroll scroll-smooth bg-white md:w-[400px]">
        <ul className="w-full text-left">
          <li className="border-border-primary border-b">
            <Disclosure>
              <DisclosureButton className="group hover:bg-background-primary flex w-full cursor-pointer items-start justify-between gap-3 py-2 pr-3 pl-5 text-left">
                <div className="py-3">
                  <span className="bg-action-primary group-data-[open]:bg-background-tertiary flex h-2 w-2 rounded-full" />
                </div>
                <div className="flex w-full flex-col gap-2 py-2">
                  {/* <span className="text-[11px]/[16px] text-[#404756]">
                    Hornblower Enterprises
                  </span> */}
                  <span className="text-[15px]/[20px] font-bold">
                    We’ve updated our terms of user, partner agreement and
                    partner code of conduct
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    Just now
                  </span>
                </div>
                <div className="group-hover:bg-content-secondary/5 flex size-10 flex-none items-center justify-center rounded-full group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
              <DisclosurePanel className="flex flex-col pt-1 pr-5 pb-4 pl-10 text-[13px]/[20px]">
                <p className="mb-5">
                  A reminder that the Superannuation Guarantee quarterly payment
                  deadline for the April to June 2024 period is due Sunday 28th
                  July 2024.
                </p>
                <p className="mb-5">
                  We suggest you submit and approve Auto Super batches before
                  2.00pm AEST, Friday 19th July 2024, which should allow for
                  contributions to reach super fund providers no later than the
                  payment deadline of 28th July.
                </p>
                <p>
                  For help, see our guide to processing superannuation payments
                  using Auto Super.
                </p>
                <button
                  className="text-body-small-regular hover:bg-secondary mt-3 ml-auto rounded-[3px] px-3 py-[6px] font-bold text-[#DC3246]"
                  type="button"
                >
                  Delete
                </button>
              </DisclosurePanel>
            </Disclosure>
          </li>
        </ul>
      </div>
    </>
  );
}
