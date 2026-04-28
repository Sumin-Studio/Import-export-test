import { MoreButton } from "@/app/components/global";
import { VatOverflow } from "./overflow";
import { getRegionContent } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";
import { CustomizationOverlay } from "./CustomizationOverlay";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function Vat({ className = "", isCustomising = false }: ComponentProps) {
  const { region } = useRegion();
  const taxContent = getRegionContent("text", "tax", region);

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[251px] lg:h-[251px] w-[440px] lg:min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
          <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
            {taxContent?.type}
          </h3>
          <MoreButton
            menu={<VatOverflow />}
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative flex flex-col px-6 text-[24px]/[32px] font-light">
          <span className="subpixel-antialiased">{taxContent?.due}</span>
          <span className="text-[13px]/[20px] font-normal text-[#0078C8]">
            {taxContent?.dueDate}
          </span>
        </div>
        {(taxContent?.period || taxContent?.ammountDue) && (
          <ul className="relative mx-6 mt-3 border-t border-background-tertiary pt-3">
            <li>
              <button
                className="relative flex w-full items-center justify-between text-left text-[13px]/[20px]"
                type="button"
              >
                <span className="text-left text-[#0078C8]">
                  {taxContent?.period}
                </span>
                <span className="text-right">{taxContent?.ammountDue}</span>
              </button>
            </li>
          </ul>
        )}
        <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2">
          <button
            className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
            type="button"
          >
            View {taxContent?.type}
          </button>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default Vat;
