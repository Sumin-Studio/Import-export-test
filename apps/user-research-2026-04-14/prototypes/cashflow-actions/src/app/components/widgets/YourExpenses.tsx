"use client";

import Link from "next/link";
import { MoreButton } from "@/app/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { ExpensesOverflow } from "./overflow";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function YourExpenses({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[251px] lg:h-[251px] w-[440px] lg:min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
          <Link href="/purchases/expenses">
            <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
              Your expenses
            </h3>
          </Link>
          <MoreButton
            menu={<ExpensesOverflow />}
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative mt-2 flex gap-6 pr-6">
          <div className="relative flex w-full flex-col pl-[23px] text-[24px]/[28px] font-light">
            <span className="subpixel-antialiased">120.80</span>
            <span className="text-[13px]/[16px] font-normal text-brand-primary">
              7 drafts
            </span>
          </div>
          <div className="relative mt-1 flex h-[38px] w-px flex-none bg-background-tertiary"></div>
          <div className="flex w-full flex-col text-[24px]/[28px] font-light">
            <span className="subpixel-antialiased">5,091.41</span>
            <span className="text-[13px]/[16px] font-normal text-brand-primary">
              5 awaiting approval
            </span>
          </div>
        </div>
        <ul className="relative mx-6 mt-[13px] border-t border-background-tertiary pt-3 text-[13px]/[16px]">
          <li className="flex w-full items-center justify-between">
            <span className="cursor-pointer text-[#D34246] hover:text-[#6E1923] hover:underline">
              4 declined
            </span>
            <span>1,425.84</span>
          </li>
          <li className="mt-2 flex w-full items-center justify-between">
            <span className="cursor-pointer text-brand-primary hover:text-brand-secondary hover:underline">
              3 to be paid
            </span>
            <span>734.78</span>
          </li>
        </ul>
        <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            Create new expense
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default YourExpenses;
