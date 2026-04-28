import { MoreButton } from "../global";
import { BillsToPayOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { ChartLoader } from "./ChartLoader";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

interface ComponentProps {
  isCustomising?: boolean;
  title?: string;
  primaryAmount?: string;
  primaryLabel?: string;
  secondaryAmount?: string;
  secondaryLabel?: string;
  secondaryLinkStyle?: boolean;
  evenSplit?: boolean;
  hideFooter?: boolean;
  hideOverflow?: boolean;
  chartVariant?: "default" | "sales";
}

export function BillsToPay({ isCustomising = false, title = "Bills to pay", primaryAmount = "8,000.00", primaryLabel = "31 awaiting payment", secondaryAmount = "1,500.00", secondaryLabel = "2 of 31 overdue", secondaryLinkStyle = false, evenSplit = false, hideFooter = false, hideOverflow = false, chartVariant = "default" }: ComponentProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-[522px] w-[440px] min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        }`}
      >
        <div className={`relative flex items-center justify-between pb-1 pl-6 pr-2 ${hideFooter ? "pt-[13px]" : "pt-[10px]"}`}>
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
            {title}
          </h3>
          {!hideOverflow && (
            <MoreButton
              menu={<BillsToPayOverflow />}
              position={{ to: "bottom end", gap: "4px" }}
            />
          )}
        </div>
        <div className={`relative mt-1 flex px-6 ${evenSplit ? "gap-0" : "gap-10"}`}>
          <div className={`flex flex-col text-[24px]/[32px] font-light ${evenSplit ? "flex-1" : "pr-6"}`}>
            <span className="subpixel-antialiased">{primaryAmount}</span>
            <span className="cursor-pointer text-[13px]/[18px] font-normal text-brand-primary hover:text-brand-secondary hover:underline">
              {primaryLabel}
            </span>
          </div>
          <div className="flex w-px bg-background-tertiary" />
          <div className={`flex flex-col text-[24px]/[32px] font-light ${evenSplit ? "flex-1 pl-6" : ""}`}>
            <span className="subpixel-antialiased">{secondaryAmount}</span>
            <span className={`cursor-pointer text-[13px]/[18px] font-normal hover:underline ${secondaryLinkStyle ? "text-brand-primary hover:text-brand-secondary" : "text-[#D34246] hover:text-[#6E1923]"}`}>
              {secondaryLabel}
            </span>
          </div>
        </div>
        <ChartLoader importChart={() => import("../charts/BillsToPay")} className="mt-4 px-[14px]" chartProps={{ variant: chartVariant }} />
        {!hideFooter && (
          <>
            <ul className="relative mx-6 border-t border-background-tertiary pt-3 text-[13px]/[16px]">
              <li className="flex w-full items-center justify-between">
                <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
                  11 draft
                </span>
                <span>400.00</span>
              </li>
              <li className="mt-2 flex w-full items-center justify-between">
                <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
                  2 awaiting approval
                </span>
                <span>700.00</span>
              </li>
            </ul>
            <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
              <Popover>
                <PopoverButton className="flex w-auto flex-none items-center gap-2 rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]">
                  Add bill
                  <svg
                    fill="none"
                    height="5"
                    width="10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current"
                      clipRule="evenodd"
                      d="M0 0l5 5 5-5H0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </PopoverButton>
                <PopoverPanel
                  transition
                  anchor="bottom start"
                  className={`z-20 flex w-[250px] [--anchor-gap:4px] origin-top translate-y-0 flex-col overflow-visible rounded-[3px] border border-border-primary bg-background-secondary py-[10px] text-sm opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0`}
                >
                  <nav className="text-[15px]/[24px]">
                    <button
                      className="w-full px-4 py-1 flex items-center text-left hover:bg-background-primary"
                      type="button"
                    >
                      <span className="size-8 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="12"
                          fill="none"
                        >
                          <path
                            fill="#59606D"
                            fillRule="evenodd"
                            d="M4 12h2V7h2L5 4 2 7h2zm6-12v1H0V0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      Upload bill
                    </button>
                    <button
                      className="w-full px-4 py-1 flex items-center text-left hover:bg-background-primary"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                      >
                        <path
                          fill="#59606D"
                          fillRule="evenodd"
                          d="M17 11h-2v4h-4v2h4v4h2v-4h4v-2h-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Create new bill
                    </button>
                  </nav>
                </PopoverPanel>
              </Popover>
              <button
                className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
                type="button"
              >
                View all bills
              </button>
            </div>
          </>
        )}
      </div>
    </CustomizationOverlay>
  );
}

export default BillsToPay;
