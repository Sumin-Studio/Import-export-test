"use client";

import { useClientLazyImport } from "@/app/hooks/useClientLazyImport";

const loadMoneyGoingOutChart = () =>
  import(/* webpackMode: "eager" */ "../charts/MoneyGoingOut");

interface MoneyGoingOutProps {
  className?: string;
}

export function MoneyGoingOut({ className = "" }: MoneyGoingOutProps) {
  const Chart = useClientLazyImport<{ className?: string }>(
    loadMoneyGoingOutChart
  );
  return (
    <div
      className={`relative flex min-h-0 w-full min-w-0 flex-col rounded-xl bg-white ${className}`}
    >
      <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
        <div className="flex items-center">
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">Money going out</h3>
        </div>
      </div>
      <div className="relative mb-4 mt-1 flex flex-wrap gap-x-6 gap-y-3.5 pl-[23px] pr-6">
        <div className="relative flex flex-col text-[24px]/[32px] font-light lg:min-w-40">
          <span className="subpixel-antialiased">4,250.00</span>
          <span className="cursor-pointer text-[13px]/[18px] font-normal text-brand-primary hover:text-brand-secondary hover:underline">
            Due this week
          </span>
        </div>
        <div className="flex w-px flex-none bg-background-tertiary" />
        <div className="flex flex-col text-[24px]/[32px] font-light lg:min-w-40">
          <span className="subpixel-antialiased">1,890.50</span>
          <span className="cursor-pointer text-[13px]/[18px] font-normal text-brand-primary hover:text-brand-secondary hover:underline">
            Due next week
          </span>
        </div>
      </div>
      {Chart ? (
        <Chart className="block w-full shrink-0 px-[14px] pb-4" />
      ) : (
        <div
          className="block w-full shrink-0 px-[14px] pb-4"
          style={{ minHeight: 240 }}
          aria-hidden
        />
      )}
    </div>
  );
}

export default MoneyGoingOut;
