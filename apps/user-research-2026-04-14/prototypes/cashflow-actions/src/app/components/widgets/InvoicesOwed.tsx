import { MoreButton } from "../global";
import { InvoicesOwedOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { ChartLoader } from "./ChartLoader";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function InvoicesOwed({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[522px] lg:h-[522px] w-[440px] lg:min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
            Invoices owed to you
          </h3>
          <MoreButton
            menu={<InvoicesOwedOverflow />}
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative mt-1 flex gap-10 px-6">
          <div className="flex flex-col pr-6 text-[24px]/[32px] font-light">
            <span className="subpixel-antialiased">70,000.00</span>
            <span className="cursor-pointer text-[13px]/[18px] font-normal text-brand-primary hover:text-brand-secondary hover:underline">
              26 awaiting payment
            </span>
          </div>
          <div className="flex w-px bg-background-tertiary" />
          <div className="flex flex-col text-[24px]/[32px] font-light">
            <span className="subpixel-antialiased">5,000.00</span>
            <span className="cursor-pointer text-[13px]/[18px] font-normal text-[#D34246] hover:text-[#6E1923] hover:underline">
              6 of 26 overdue
            </span>
          </div>
        </div>
        <ChartLoader importChart={() => import("../charts/InvoicesOwed")} className="mt-4 px-[14px]" />
        <ul className="relative mx-6 border-t border-background-tertiary pt-3 text-[13px]/[16px]">
          <li className="flex w-full items-center justify-between">
            <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
              5 draft
            </span>
            <span>1,250.00</span>
          </li>
          <li className="mt-2 flex w-full items-center justify-between">
            <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
              3 awaiting approval
            </span>
            <span>2,000.00</span>
          </li>
        </ul>
        <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            New invoice
          </button>
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View all invoices
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default InvoicesOwed;
