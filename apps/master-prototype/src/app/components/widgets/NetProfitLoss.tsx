import { useClientLazyImport } from "@/app/hooks/useClientLazyImport";
import { getRegionContent } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";
import { MoreButton } from "../global";
import { NetProfitLossOverflow } from "./overflow";
import { CustomizationOverlay } from "./CustomizationOverlay";

const loadNetProfitLossChart = () =>
  import(/* webpackMode: "eager" */ "../charts/NetProfitLoss");

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function NetProfitLoss({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  const { region } = useRegion();
  const Chart = useClientLazyImport<{ className?: string }>(
    loadNetProfitLossChart
  );
  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[521px] lg:h-[521px] w-[440px] lg:min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
          <div className="flex items-center">
            <h3 className="text-[17px]/[28px]">
              <span className="cursor-pointer font-bold hover:underline">
                Net profit or loss
              </span>{" "}
              • Year to date
            </h3>
          </div>
          <MoreButton
            menu={<NetProfitLossOverflow />}
            menuClassName="w-[400px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative flex flex-col px-6 text-[24px]/[32px] font-light">
          <span className="subpixel-antialiased">
            {getRegionContent("text", "netProfitLoss", region)?.netProfitLoss}
          </span>
          <span className="text-[13px]/[20px] font-normal text-[#404756]">
            {
              getRegionContent("text", "netProfitLoss", region)
                ?.thisFinancialYear
            }
          </span>
          <span className="flex items-center text-[13px]/[20px] font-normal text-[#00823C]">
            Up 5% from{" "}
            {
              getRegionContent("text", "netProfitLoss", region)
                ?.lastFinancialYear
            }
            <svg
              className="ml-[2px] mt-[-1px]"
              fill="none"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M9.5 5l4 4L15 7.5 8.5 1 2 7.5 3.5 9l4-4v10h2V5z"
                fill="#27AE60"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {Chart ? (
          <Chart className="mb-2 mt-4 px-[14px]" />
        ) : (
          <div
            className="mb-2 mt-4 px-[14px]"
            style={{ minHeight: 260 }}
            aria-hidden
          />
        )}
        <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            Go to business snapshot
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default NetProfitLoss;
