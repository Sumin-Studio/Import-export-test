"use client";

import { ExternalLink } from "@/app/components/ui/icons";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { MoreButton } from "@/components/global";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

interface ClientContact {
  name: string;
  fieldsMissing: string;
}

const mockClientContacts: ClientContact[] = [
  {
    name: "Dolores Gleichner",
    fieldsMissing: "Address, Phone, and 1 more",
  },
  {
    name: "Friesen, Mraz and Tremblay",
    fieldsMissing: "Address, Phone, and 1 more",
  },
  {
    name: "Heller Group",
    fieldsMissing: "Address and Email",
  },
  {
    name: "Nora Thiel",
    fieldsMissing: "Phone",
  },
  {
    name: "Dicki Inc",
    fieldsMissing: "Industry",
  },
  {
    name: "Jeanne Mosciski",
    fieldsMissing: "Email",
  },
  {
    name: "Nick Paucek",
    fieldsMissing: "Email",
  },
];

export function ClientContactInformation({
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
      <div className="relative flex size-full h-[522px] flex-col content-stretch items-start rounded-xl bg-white">
        {/* Header */}
        <div className="relative flex w-full shrink-0 flex-col content-stretch items-start overflow-clip">
          <div className="relative box-border flex min-h-[55px] w-full shrink-0 flex-col content-stretch items-start px-0 pt-3.5 pb-1">
            <div className="relative box-border flex h-[32px] w-full shrink-0 content-stretch items-center gap-[8px] py-0 pr-2 pl-6">
              <div className="relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center gap-[8px] overflow-clip px-0 py-[4px]">
                <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 flex-wrap content-start items-start gap-0">
                  <p className="relative shrink-0 overflow-hidden text-[17px] leading-[24px] font-bold text-nowrap overflow-ellipsis whitespace-pre text-[#000a1e] not-italic">
                    Client contact information
                  </p>
                </div>
              </div>
              <div className="relative flex shrink-0 content-stretch items-center gap-[8px]">
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
            </div>
          </div>

          {/* Stats Summary */}
          <div className="relative flex w-full shrink-0 flex-wrap content-start items-start gap-0 overflow-clip px-0 pt-0 pb-[18px]">
            <div className="relative box-border flex min-h-px max-w-[225px] min-w-[160px] shrink-0 grow basis-0 flex-col content-stretch items-start px-[24px] py-0">
              <div className="relative flex w-full shrink-0 content-stretch items-baseline gap-[4px]">
                <p className="relative min-h-px min-w-px shrink-0 grow basis-0 text-[24px] leading-[normal] font-light text-[#000a1e] not-italic">
                  {mockClientContacts.length}
                </p>
              </div>
              <p
                className="relative min-w-full shrink-0 text-[13px] leading-[20px] text-[#59606d] not-italic"
                style={{ width: "min-content" }}
              >
                With missing information
              </p>
              <div className="absolute top-[4px] bottom-[4px] left-[-1px] w-px bg-[#e6e7e9]" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative w-full flex-1 overflow-hidden px-6 py-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                  Client
                </th>
                <th className="py-2 text-right text-[11px] leading-[normal] font-normal text-[#59606d]">
                  Fields missing
                </th>
              </tr>
            </thead>
            <tbody>
              {mockClientContacts.map((client, index) => (
                <tr key={index} className="border-t border-[#e6e7e9]">
                  <td className="py-[9px] text-[13px] leading-[20px] font-normal text-[#0078c8]">
                    {client.name}
                  </td>
                  <td className="py-[9px] text-right text-[13px] leading-[20px] text-[#000a1e]">
                    {client.fieldsMissing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No footer in this design */}
      </div>
    </CustomizationOverlay>
  );
}
