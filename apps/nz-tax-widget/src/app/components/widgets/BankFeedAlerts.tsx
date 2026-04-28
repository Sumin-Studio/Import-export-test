"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Arrow, ExternalLink, Close } from "@/app/components/ui/icons";
import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionContent } from "@/app/lib/RegionContent";
// import { MoreButton } from "../global";
import { CustomizationOverlay } from "./CustomizationOverlay";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

interface ClientDetails {
  name: string;
  phone: string;
  email: string;
  lastConnectedBy: string;
}

interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: "major" | "planned" | "resolved";
  sentimentColor: string;
  type: "credential" | "major" | "planned" | "resolved";
  clientCount: number;
  clients?: string[];
  clientDetails?: ClientDetails[];
  detailedDescription?: string;
  scheduledTime?: string;
  firstReported?: string;
  resolvedDate?: string;
}

// Modal component for alert details
function AlertModal({
  alert,
  isOpen,
  onClose,
}: {
  alert: AlertItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedClient, setSelectedClient] = useState<ClientDetails | null>(
    null
  );
  const [showClientDetails, setShowClientDetails] = useState(false);

  // Reset client details modal when main modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowClientDetails(false);
      setSelectedClient(null);
    }
  }, [isOpen]);

  if (!alert) return null;

  const handleClientClick = (clientName: string) => {
    const clientDetail = alert.clientDetails?.find(
      (c) => c.name === clientName
    );
    if (clientDetail) {
      setSelectedClient(clientDetail);
      setShowClientDetails(true);
    }
  };

  const handleBackToList = () => {
    setShowClientDetails(false);
    setTimeout(() => setSelectedClient(null), 200);
  };

  const getSeverityTag = () => {
    switch (alert.severity) {
      case "major":
        return (
          <div className="rounded-sm border border-solid border-[#ee99a3] bg-[#f3b7be] px-1 py-0">
            <p className="text-[15px]/[24px] text-[#4d1219]">Major</p>
          </div>
        );
      case "planned":
        return (
          <div className="rounded-sm border border-solid border-[#fdc180] bg-[#fdd3a6] px-1 py-0">
            <p className="text-[15px]/[24px] text-[#582e00]">Minor</p>
          </div>
        );
      case "resolved":
        return (
          <div className="rounded-sm border border-solid border-[rgba(0,10,30,0.5)] bg-white px-1 py-0">
            <p className="text-[15px]/[24px] text-[rgba(0,10,30,0.75)]">
              Resolved
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const getTypeTag = () => {
    switch (alert.type) {
      case "credential":
        return (
          <div className="rounded-sm border border-solid border-[rgba(0,10,30,0.5)] bg-white px-1 py-0">
            <p className="text-[15px]/[24px] text-[rgba(0,10,30,0.75)]">
              Credential error
            </p>
          </div>
        );
      case "major":
        return (
          <div className="rounded-sm border border-solid border-[rgba(0,10,30,0.5)] bg-white px-1 py-0">
            <p className="text-[15px]/[24px] text-[rgba(0,10,30,0.75)]">
              Major outage
            </p>
          </div>
        );
      case "planned":
        return (
          <div className="rounded-sm border border-solid border-[rgba(0,10,30,0.5)] bg-white px-1 py-0">
            <p className="text-[15px]/[24px] text-[rgba(0,10,30,0.75)]">
              Planned outage
            </p>
          </div>
        );
      case "resolved":
        return (
          <div className="rounded-sm border border-solid border-[rgba(0,10,30,0.5)] bg-white px-1 py-0">
            <p className="text-[15px]/[24px] text-[rgba(0,10,30,0.75)]">
              Operational
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      transition
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-60 flex w-screen items-center justify-center bg-black/25 p-4 opacity-100 transition-all duration-200 ease-in-out data-closed:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/25 duration-300 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative z-10 max-h-[90vh] w-[400px] overflow-y-auto rounded-[10px] bg-white">
          {/* Header */}
          <div className="flex items-center justify-between py-3 pr-[18px] pl-5">
            <h3 className="text-content-primary flex-1 text-[17px]/[28px] font-bold">
              {alert.title}
            </h3>
            {/* <button
              onClick={onClose}
              className="flex items-center justify-center transition-opacity hover:opacity-70"
            >
              <Close className="size-8" />
            </button> */}
            <button
              className="hover:bg-background-primary flex size-10 items-center justify-center rounded-full"
              onClick={onClose}
              type="button"
            >
              <span className="sr-only">Close</span>
              <Close className="text-[#5a606c]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col overflow-x-clip overflow-y-auto bg-white">
            <div className="flex flex-col gap-6 bg-white px-5 pt-2 pb-5">
              {/* Show client details sub-modal or main alert content */}
              {showClientDetails && selectedClient ? (
                <>
                  {/* Back button and title row */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToList}
                      className="flex items-center justify-center p-2 transition-opacity hover:opacity-70"
                    >
                      <svg
                        width="14"
                        height="13"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5 0.5L0.5 6.5L6.5 12.5M1 6.5H13.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <h3 className="text-content-primary flex-1 text-[17px]/[28px] font-bold">
                      {selectedClient.name}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="flex items-start gap-3">
                    {getSeverityTag()}
                    {getTypeTag()}
                  </div>

                  {/* Client detail content */}
                  <div className="text-content-primary text-[15px]/[24px]">
                    <p className="mb-0">
                      Bank connections for {alert.title} will stop importing
                      transactions on 15/Oct.
                    </p>
                    <p className="mb-0">
                      Please update your clients&apos; bank connections to
                      continue automatically importing transactions in Xero.
                    </p>
                    <p>
                      You can do this by clicking the &apos;Update bank
                      connection&apos; button on Xero dashboards.
                    </p>
                  </div>

                  {/* Last connected by */}
                  <div className="flex flex-col gap-2 rounded-md border border-solid border-[#e6e7e9] px-4 py-3">
                    <p className="text-content-primary text-[15px]/[24px] font-bold">
                      Last connected by
                    </p>
                    <p className="text-content-primary text-[15px]/[24px]">
                      {selectedClient.lastConnectedBy}
                    </p>
                  </div>

                  {/* Contact info */}
                  <div className="flex flex-col gap-2 rounded-md border border-solid border-[#e6e7e9] px-4 py-3">
                    <p className="text-content-primary text-[15px]/[24px] font-bold">
                      Contact {selectedClient.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="text-content-primary text-[15px]/[24px]">
                        {selectedClient.phone}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="text-content-primary text-[15px]/[24px]">
                        {selectedClient.email}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-start gap-2">
                    <button className="rounded-pill flex items-center justify-center gap-1 border border-solid border-[#ccced2] bg-white py-[6px] pr-2 pl-4 transition-colors hover:bg-[#eff1f2]">
                      <p className="text-brand-primary text-[13px]/[16px] font-bold">
                        View bank account
                      </p>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button className="rounded-pill flex items-center justify-center gap-1 border border-solid border-[#ccced2] bg-white px-4 py-[6px] transition-colors hover:bg-[#eff1f2]">
                      <p className="text-brand-primary text-[13px]/[16px] font-bold">
                        View client
                      </p>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Tags */}
                  <div className="flex items-start gap-3">
                    {getSeverityTag()}
                    {getTypeTag()}
                  </div>

                  {/* Credential Error Type - Shows client list */}
                  {alert.type === "credential" && alert.clients && (
                    <div className="flex flex-col gap-2">
                      <p className="text-content-primary text-[17px]/[28px] font-bold">
                        {alert.clientCount} clients impacted
                      </p>
                      <div className="flex flex-col items-center justify-center rounded-md border border-solid border-[#ccced2] bg-white px-px py-[13px]">
                        {alert.clients.map((client, index) => (
                          <button
                            key={index}
                            onClick={() => handleClientClick(client)}
                            className="w-full bg-white px-5 py-2 text-left transition-colors hover:bg-[#f8f8f9]"
                          >
                            <p className="text-content-primary text-[15px]/[24px]">
                              {client}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Major Outage Type */}
                  {alert.type === "major" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-content-primary text-[17px]/[28px] font-bold">
                        {alert.clientCount} clients impacted
                      </p>
                      <div className="text-content-primary text-[15px]/[24px]">
                        <p className="mb-0">{alert.detailedDescription}</p>
                        <p className="mb-0">
                          [While we investigate, new {alert.title} bank feeds
                          may not be able to be set up or receive new
                          transactions.]
                        </p>
                        {alert.firstReported && (
                          <p className="mt-2">
                            First reported: {alert.firstReported}
                          </p>
                        )}
                      </div>
                      <button className="rounded-pill flex items-center justify-center gap-1 self-start border border-solid border-[#ccced2] bg-white px-4 py-[6px] transition-colors hover:bg-[#eff1f2]">
                        <p className="text-brand-primary text-[13px]/[16px] font-bold">
                          View impacted clients
                        </p>
                      </button>
                    </div>
                  )}

                  {/* Planned Outage Type */}
                  {alert.type === "planned" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-content-primary text-[17px]/[28px] font-bold">
                        {alert.clientCount} clients
                      </p>
                      <p className="text-content-primary text-[15px]/[24px]">
                        {alert.detailedDescription}
                      </p>
                      <button className="rounded-pill flex items-center justify-center gap-1 self-start border border-solid border-[#ccced2] bg-white px-4 py-[6px] transition-colors hover:bg-[#eff1f2]">
                        <p className="text-brand-primary text-[13px]/[16px] font-bold">
                          View impacted clients
                        </p>
                      </button>
                    </div>
                  )}

                  {/* Resolved Type */}
                  {alert.type === "resolved" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-content-primary text-[17px]/[28px] font-bold">
                        {alert.clientCount} clients
                      </p>
                      <div className="text-content-primary text-[15px]/[24px]">
                        <p className="mb-0">{alert.detailedDescription}</p>
                        {alert.resolvedDate && (
                          <p className="mt-2">
                            Resolved date: {alert.resolvedDate}
                          </p>
                        )}
                      </div>
                      <button className="rounded-pill flex items-center justify-center gap-1 self-start border border-solid border-[#ccced2] bg-white px-4 py-[6px] transition-colors hover:bg-[#eff1f2]">
                        <p className="text-brand-primary text-[13px]/[16px] font-bold">
                          View impacted clients
                        </p>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export function BankFeedAlerts({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const { region } = useRegion();
  const regionData = getRegionContent("text", "bankFeedAlerts", region) as {
    stats: Array<{ value: string; label: string; color: string }>;
    alerts: AlertItem[];
  };

  const statsData = regionData.stats;
  const alertsData = regionData.alerts;

  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlertClick = (alert: AlertItem) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Wait for animation to complete before clearing selection
    setTimeout(() => setSelectedAlert(null), 200);
  };

  return (
    <>
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
          <div className="relative flex items-center justify-between pt-3.5 pr-2 pb-1 pl-6">
            <h3 className="text-[17px]/[24px] font-bold">Bank feed alerts</h3>
          </div>

          {/* Stats Section */}
          <div className="divide-background-tertiary grid grid-cols-2 gap-x-6 divide-x px-6 pb-[18px]">
            {statsData.map((stat, index) => (
              <div key={index}>
                <p className={`text-[24px]/[24px] font-light`}>{stat.value}</p>
                <p className={`text-[13px]/[20px] ${stat.color}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Alerts List */}
          <div className="flex-1 overflow-hidden">
            {alertsData.map((alert) => (
              <button
                key={alert.id}
                onClick={() => handleAlertClick(alert)}
                disabled={isCustomising}
                className="border-background-tertiary group relative flex w-full items-start gap-2 border-t py-1 pr-2 pl-6 text-left transition-colors hover:bg-[#f8f8f9]"
              >
                {/* Sentiment indicator */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-[3px] ${alert.sentimentColor}`}
                />

                {/* Content */}
                <div className="flex-1 py-[6px]">
                  <p className="text-content-primary text-[13px]/[20px]">
                    {alert.title}
                  </p>
                  <p className="text-content-secondary text-[13px]/[1.45]">
                    {alert.description}
                  </p>
                </div>
                <div className="flex size-8 items-center justify-center py-1">
                  <Arrow className="text-brand-primary group-hover:text-brand-secondary transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Modal */}
          <AlertModal
            alert={selectedAlert}
            isOpen={isModalOpen}
            onClose={closeModal}
          />

          {/* Footer */}
          <div className="relative mt-auto mr-auto mb-6 ml-6 flex gap-2">
            <button
              className="border-border-primary text-brand-primary inline-flex w-auto flex-none cursor-pointer items-center gap-4 rounded-[48px] border bg-white px-3 py-[6px] text-[13px]/[16px] font-bold transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
              type="button"
            >
              View all disruptions
              <ExternalLink className="text-brand-primary group-hover:text-brand-secondary" />
            </button>
          </div>
        </div>
      </CustomizationOverlay>
    </>
  );
}

export default BankFeedAlerts;
