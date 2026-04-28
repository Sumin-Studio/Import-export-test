import { MoreButton } from "@/components/global";
import { ActivityStatementsChart } from "@/components/charts";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { ExternalLink } from "@/app/components/ui/icons";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

const statsData = [
  { value: "591", label: "In progress", color: "text-content-secondary" },
  { value: "24", label: "Filed", color: "text-content-secondary" },
  { value: "2", label: "Errors", color: "text-[#DE0E40]" },
];

export function ActivityStatements({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[522px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between pt-3.5 pr-2 pb-2 pl-6">
          <div className="flex items-center gap-1">
            <h3 className="cursor-pointer text-[17px]/[24px] font-bold hover:underline">
              Activity statements
            </h3>
            {/* <span className="text-lg font-bold">・</span>
            <span className="text-content-secondary text-[17px]/[24px]">
              My activity statements
            </span>
            <span className="text-lg font-bold">・</span>
            <span className="text-content-secondary text-[17px]/[24px]">
              Due this month
            </span> */}
          </div>
          <MoreButton
            menu={
              <button className="flex items-center gap-2 bg-white px-5 py-2 text-left text-[15px]/[24px] hover:bg-gray-50">
                <span className="text-[15px] leading-[24px] whitespace-nowrap text-[#000a1e]">
                  Learn how this widget works
                </span>
                <ExternalLink className="shrink-0" />
              </button>
            }
            menuClassName="max-w-[320px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Stats Section */}
        <div
          className={`divide-background-tertiary grid items-start gap-x-6 gap-y-2 px-6 pb-2 ${colSpan === 2 ? "grid-cols-4 divide-x" : "grid-cols-2"}`}
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={
                colSpan === 1
                  ? "border-background-tertiary last:!border-r-0 odd:border-r"
                  : ""
              }
            >
              <div className="flex items-baseline pb-[2px]">
                <p className={`text-[24px]/[28px] font-light`}>{stat.value}</p>
              </div>
              <p className={` ${stat.color} text-[13px]/[16px]`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="flex-1 px-4 pt-2">
          <ActivityStatementsChart colSpan={colSpan} />
        </div>

        {/* Footer */}
        <div className="relative mt-auto mr-auto mb-6 ml-6 flex gap-2">
          <button
            className="border-border-primary text-brand-primary inline-block w-auto flex-none cursor-pointer rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            Go to tax manager
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default ActivityStatements;
