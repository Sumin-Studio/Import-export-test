import { MoreButton } from "../global";
import { CashInAndOutOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { ChartLoader } from "./ChartLoader";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function CashInAndOut({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[522px] lg:h-[522px] w-[440px] min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
          <div className="flex items-center">
            <h3 className="text-[17px]/[28px]">
              <span className="cursor-pointer font-bold hover:underline">
                Cash in and out
              </span>{" "}
              • Last 6 months
            </h3>
          </div>
          <MoreButton
            menu={<CashInAndOutOverflow />}
            menuClassName="w-[300px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative mb-4 mt-1 flex flex-wrap gap-x-6 gap-y-3.5 pl-[23px] pr-6">
          <div className="relative flex flex-col text-[24px]/[32px] font-light lg:min-w-40">
            <span className="subpixel-antialiased">1,000,000.00</span>
            <span className="text-[13px]/[20px] font-normal text-content-secondary">
              Cash in
            </span>
          </div>
          <div className="flex w-px flex-none bg-background-tertiary" />
          <div className="flex flex-col text-[24px]/[32px] font-light lg:min-w-40">
            <span className="subpixel-antialiased">650,000.00</span>
            <span className="text-[13px]/[20px] font-normal text-content-secondary">
              Cash out
            </span>
          </div>
          <div className="flex flex-col text-[24px]/[32px] font-light lg:min-w-40">
            <span className="subpixel-antialiased">350,000.00</span>
            <span className="text-[13px]/[20px] font-normal text-content-secondary">
              Difference
            </span>
          </div>
        </div>
        <ChartLoader importChart={() => import("../charts/CashInAndOut")} className="px-[14px]" />
        <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            Go to Bank Summary report
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default CashInAndOut;
