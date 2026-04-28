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
      <div className="relative flex items-center justify-between gap-2 border-b border-border-primary py-3 pl-5 pr-3">
        <h2 className="text-[17px]/[28px] font-bold capitalize">
          Notifications
        </h2>
        <div className="flex items-center gap-3">
          <button
            className="rounded-[3px] px-3 py-[6px] cursor-pointer text-[13px]/[20px] font-bold text-brand-primary hover:bg-background-primary"
            type="button"
          >
            Mark all as read
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-full hover:bg-background-primary cursor-pointer"
            onClick={() => openPanel(null)}
            type="button"
          >
            <span className="sr-only">Close</span>
            <Close fill="fill-content-secondary" />
          </button>
        </div>
      </div>
      <div className="absolute top-[65px] bottom-0 w-screen overflow-y-scroll scroll-smooth bg-white md:w-[400px]">
        <ul className="w-full text-left">
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-action-primary group-data-[open]:bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold">
                    Quarterly Superannuation deadline approaching
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    4 days ago
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
              <DisclosurePanel className="flex flex-col pb-4 pl-10 pr-5 pt-1 text-[13px]/[20px]">
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
                  className="ml-auto mt-3 rounded-[3px] px-3 py-[6px] text-body-small-regular font-bold text-[#DC3246] hover:bg-secondary"
                  type="button"
                >
                  Delete
                </button>
              </DisclosurePanel>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col gap-1 py-2">
                  <span className="text-[15px]/[20px] font-bold">
                    We’ve updated our terms of use
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    4 days ago
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-action-primary" />
                </div>
                <div className="flex w-full flex-col items-start gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold">
                    Act now: payment declined for Foxglove Studios
                  </span>
                  <span className="rounded-[3px] border border-[#EE99A3] bg-[#F3B7BE] px-1 text-[13px]/[20px] text-[#4D1219]">
                    High priority
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold">
                    AFL Grand Final Friday public holiday added to Xero payroll
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col items-start gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold text-[#404756]">
                    Payment received for Xero billing account
                  </span>
                  <span className="rounded-[3px] border border-[#80C19E] bg-[#A6D3BB] px-1 text-[13px]/[20px] text-[#002E15]">
                    Success
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col items-start gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold text-[#404756]">
                    New Expense to review for (AU) Fanning’s Punches
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col items-start gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold text-[#404756]">
                    New Expense to review for (AU) Fanning’s Punches
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li className="border-b border-border-primary">
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col items-start gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold text-[#404756]">
                    New Expense to review for (AU) Fanning’s Punches
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
          <li>
            <Disclosure>
              <DisclosureButton className="group cursor-pointer flex w-full items-start justify-between gap-3 py-2 pl-5 pr-3 text-left hover:bg-background-primary">
                <div className="py-3">
                  <span className="flex h-2 w-2 rounded-full bg-background-tertiary" />
                </div>
                <div className="flex w-full flex-col items-start gap-2 py-2">
                  <span className="text-[11px]/[16px] text-[#404756]">
                    Foxglove Studios
                  </span>
                  <span className="text-[15px]/[20px] font-bold text-[#404756]">
                    New Expense to review for (AU) Fanning’s Punches
                  </span>
                  <span className="text-[13px]/[20px] text-[#404756]">
                    28 Jan
                  </span>
                </div>
                <div className="flex size-10 flex-none items-center justify-center rounded-full group-hover:bg-content-secondary/5 group-data-[open]:rotate-180">
                  <Chevron fill="fill-content-secondary" />
                </div>
              </DisclosureButton>
            </Disclosure>
          </li>
        </ul>
        {/* <div className="fixed bottom-0 right-0 z-20 flex h-[56px] w-screen items-center justify-end gap-2 border-t border-border-primary bg-white px-6 text-body-standard-regular sm:w-[400px]">
          Allow notification pop-ups
          <Switch
            checked
            className="group inline-flex h-[22px] w-10 items-center rounded-full bg-gray-200 transition data-[checked]:bg-action-primary"
          >
            <span className="size-[18px] translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-5" />
          </Switch>
        </div> */}
      </div>
    </>
  );
}
