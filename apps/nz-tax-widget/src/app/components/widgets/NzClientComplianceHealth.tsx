"use client";

import { CustomizationOverlay } from "./CustomizationOverlay";
import {
  nzClientComplianceMock,
  type ComplianceLevel,
} from "@/app/lib/mockData/nzTax";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

function levelDot(level: ComplianceLevel): string {
  switch (level) {
    case "on_track":
      return "bg-[#0f7a45]";
    case "attention":
      return "bg-[#c27a00]";
    case "at_risk":
      return "bg-[#b4232c]";
    default:
      return "bg-[#59606d]";
  }
}

function levelLabel(level: ComplianceLevel): string {
  switch (level) {
    case "on_track":
      return "On track";
    case "attention":
      return "Needs attention";
    case "at_risk":
      return "At risk";
    default:
      return "";
  }
}

export function NzClientComplianceHealth({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const data = nzClientComplianceMock;

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
        <div className="relative pt-3.5 pr-2 pb-2 pl-6">
          <h3 className="text-[17px]/[24px] font-bold">Client compliance</h3>
          <p className="text-content-secondary mt-0.5 text-[13px]/[20px]">
            Snapshot across your practice (sample data)
          </p>
        </div>

        <div className="mx-6 grid grid-cols-3 gap-2 border-t border-[rgba(0,10,30,0.08)] pt-4">
          <div className="rounded-lg bg-[rgba(15,122,69,0.08)] px-2 py-3 text-center">
            <p className="text-[21px]/[28px] font-bold text-[#0f7a45]">
              {data.onTrack}
            </p>
            <p className="text-content-secondary text-[11px]/[16px] font-bold uppercase">
              On track
            </p>
          </div>
          <div className="rounded-lg bg-[rgba(194,122,0,0.1)] px-2 py-3 text-center">
            <p className="text-[21px]/[28px] font-bold text-[#8a5a00]">
              {data.attention}
            </p>
            <p className="text-content-secondary text-[11px]/[16px] font-bold uppercase">
              Attention
            </p>
          </div>
          <div className="rounded-lg bg-[rgba(180,35,44,0.08)] px-2 py-3 text-center">
            <p className="text-[21px]/[28px] font-bold text-[#b4232c]">
              {data.atRisk}
            </p>
            <p className="text-content-secondary text-[11px]/[16px] font-bold uppercase">
              At risk
            </p>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden px-2 pb-4">
          <p className="text-content-secondary mb-2 px-4 text-[13px]/[20px] font-bold uppercase tracking-wide">
            Highlights
          </p>
          <div className="min-h-0 flex-1 overflow-auto">
            {data.clients.map((c) => (
              <div
                key={c.name}
                className="border-background-tertiary hover:bg-background-secondary border-t py-2 pr-4 pl-6 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${levelDot(c.level)}`}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-content-primary text-[15px]/[24px] font-bold">
                      {c.name}
                    </p>
                    <p className="text-content-secondary text-[13px]/[20px]">
                      {levelLabel(c.level)} · {c.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default NzClientComplianceHealth;
