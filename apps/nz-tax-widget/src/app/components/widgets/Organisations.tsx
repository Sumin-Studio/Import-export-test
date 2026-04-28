"use client";

import { useState } from "react";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { MoreButton } from "@/components/global";
import { OrganisationsOverflow } from "./overflow";
import type {
  OrganisationsTabType,
  ClientFilterType,
  ClientColumnType,
  OrgColumnType,
} from "./overflow";
import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionContent } from "@/app/lib/RegionContent";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

interface Organisation {
  name: string;
  lastStaffAccess: string;
  staffAccess: string;
  subscription: string;
}

interface Client {
  name: string;
  email: string;
  phone: string;
  businessNumber: string;
  businessStructure: string;
  financialYear: string;
  subscriptionType: string;
  bankFeedExpiry: string;
  bankFeedDeprecation: string;
}
export function Organisations({
  isCustomising = false,
  onToggleColSpan,
  colSpan = 2,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  const organisations = getRegionContent(
    "text",
    "watchlistOrganisations",
    region
  ) as Organisation[];
  const clients =
    (getRegionContent("text", "watchlistClients", region) as Client[]) || [];

  const [activeTab, setActiveTab] =
    useState<OrganisationsTabType>("organisations");
  const [clientFilter, setClientFilter] = useState<ClientFilterType>("all");
  const [selectedClientColumns, setSelectedClientColumns] = useState<
    Set<ClientColumnType>
  >(new Set());
  const [selectedOrgColumns, setSelectedOrgColumns] = useState<
    Set<OrgColumnType>
  >(new Set());

  const handleClientColumnToggle = (column: ClientColumnType) => {
    const newColumns = new Set(selectedClientColumns);
    if (newColumns.has(column)) {
      newColumns.delete(column);
    } else {
      newColumns.add(column);
    }
    setSelectedClientColumns(newColumns);
  };

  const handleOrgColumnToggle = (column: OrgColumnType) => {
    const newColumns = new Set(selectedOrgColumns);
    if (newColumns.has(column)) {
      newColumns.delete(column);
    } else {
      newColumns.add(column);
    }
    setSelectedOrgColumns(newColumns);
  };

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-auto min-h-[521px] flex-col rounded-xl bg-white lg:h-[521px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-4.5 pr-2 pb-3 pl-6">
          <h2 className="text-[17px] leading-[24px] font-bold text-[#000a1e]">
            Organisations
          </h2>
          <MoreButton
            menu={
              <OrganisationsOverflow
                activeTab={activeTab}
                onTabChange={setActiveTab}
                clientFilter={clientFilter}
                onClientFilterChange={setClientFilter}
                selectedClientColumns={selectedClientColumns}
                onClientColumnToggle={handleClientColumnToggle}
                selectedOrgColumns={selectedOrgColumns}
                onOrgColumnToggle={handleOrgColumnToggle}
              />
            }
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Table */}
        <div className="relative w-full flex-1 overflow-hidden px-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {activeTab === "clients" ? (
                  <>
                    <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Clients
                    </th>
                    <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Subscription type
                    </th>
                    {colSpan === 2 && (
                      <>
                        <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                          Bank feed expiry
                        </th>
                      </>
                    )}
                    <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Bank feed deprecation
                    </th>
                  </>
                ) : (
                  <>
                    <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Organisations
                    </th>
                    {colSpan === 2 && (
                      <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                        Last staff access
                      </th>
                    )}
                    <th className="py-2 text-center text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Staff access
                    </th>
                    <th className="py-2 text-right text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Subscription
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === "clients"
                ? clients.map((client, index) => (
                    <tr key={index} className="border-t border-[#e6e7e9]">
                      <td className="py-[9px] text-[13px] leading-[20px] font-normal text-[#0078c8]">
                        {client.name}
                      </td>
                      <td className="py-[9px] text-[13px] leading-[20px] text-[#000a1e]">
                        {client.subscriptionType}
                      </td>
                      {colSpan === 2 && (
                        <>
                          <td className="py-[9px] text-[13px] leading-[20px] text-[#000a1e]">
                            {client.bankFeedExpiry}
                          </td>
                        </>
                      )}
                      <td className="py-[9px] text-[13px] leading-[20px] text-[#000a1e]">
                        {client.bankFeedDeprecation}
                      </td>
                    </tr>
                  ))
                : organisations.map((org, index) => (
                    <tr key={index} className="border-t border-[#e6e7e9]">
                      <td className="py-[9px] text-[13px] leading-[20px] font-normal text-[#0078c8]">
                        {org.name}
                      </td>
                      {colSpan === 2 && (
                        <td className="py-[9px] text-[13px] leading-[20px] text-[#000a1e]">
                          {org.lastStaffAccess}
                        </td>
                      )}
                      <td className="py-[9px] text-center text-[13px] leading-[20px] text-[#000a1e]">
                        {org.staffAccess}
                      </td>
                      <td className="py-[9px] text-right text-[13px] leading-[20px] text-[#000a1e]">
                        {org.subscription}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-auto mb-2 px-4 pt-1.5 pb-3">
          {activeTab === "clients" ? (
            <button className="relative shrink-0 rounded-[100px] border border-[#ccced2] bg-white px-4 py-1 text-[13px] leading-[20px] font-bold text-[#0078c8] hover:bg-[#f5f6f7]">
              View client list
            </button>
          ) : (
            <button className="relative shrink-0 rounded-[100px] border border-[#ccced2] bg-white px-4 py-1 text-[13px] leading-[20px] font-bold text-[#0078c8] hover:bg-[#f5f6f7]">
              Add favourite Xero organisations
            </button>
          )}
        </div>
      </div>
    </CustomizationOverlay>
  );
}
