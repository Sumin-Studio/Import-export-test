"use client";

import { useState, useMemo } from "react";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { JobsOverflow } from "./overflow";
import type { JobFilterType } from "./overflow/jobs";
import { MoreButton } from "@/components/global";
import { useRegion } from "@/app/contexts/RegionContext";
import { getRegionContent } from "@/app/lib/RegionContent";

interface JobsProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

interface Job {
  jobNumber: string;
  service: string;
  client: string;
  status: string;
  timeBudget: string;
  daysFromToday: number;
  assignedTo?: "staff" | "manager" | "partner"; // Added for filtering
}

function JobTableRow({
  job,
  colSpan,
  showTimeBudget,
}: {
  job: Job;
  colSpan: 1 | 2;
  showTimeBudget: boolean;
}) {
  const { displayText, isOverdue } = useFormatRelativeDate(job.daysFromToday);

  return (
    <tr className="border-t border-[#e6e7e9]">
      <td className="py-[9px] text-[13px] leading-[1.45] font-normal text-[#0078c8]">
        {job.jobNumber} - {job.service}
      </td>
      {colSpan === 2 && (
        <>
          <td className="py-[9px] text-[13px] leading-[20px] text-[#000a1e]">
            {job.client}
          </td>
          <td className="py-[9px] text-[13px] leading-[20px] text-[#000a1e]">
            {job.status}
          </td>
          {showTimeBudget && (
            <td className="py-[9px] text-right text-[13px] leading-[20px] text-[#000a1e]">
              {job.timeBudget}
            </td>
          )}
        </>
      )}
      <td
        className={`w-24 min-w-0 py-[9px] pl-12 text-[13px] leading-[20px] ${
          isOverdue ? "text-[#de0e40]" : "text-[#000a1e]"
        }`}
      >
        {displayText}
      </td>
    </tr>
  );
}

import { useFormatRelativeDate } from "@/app/hooks/useFormatRelativeDate";

export function Jobs({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 2,
  canToggleSize = false,
}: JobsProps) {
  const { region } = useRegion();
  const content = getRegionContent("text", "jobs", region);
  const jobsData = content || { dueThisWeek: 0, items: [] };

  const [selectedFilter, setSelectedFilter] = useState<JobFilterType>("all");
  const [showTimeBudget, setShowTimeBudget] = useState(true);

  // Add mock assignedTo field to jobs if not present
  const jobsWithAssignment = useMemo(() => {
    return jobsData.items.map((job: Job, index: number) => ({
      ...job,
      assignedTo:
        job.assignedTo || (["staff", "manager", "partner"] as const)[index % 3],
    }));
  }, [jobsData.items]);

  // Filter jobs based on selected filter
  const filteredJobs = useMemo(() => {
    if (selectedFilter === "all") {
      return jobsWithAssignment;
    }
    return jobsWithAssignment.filter(
      (job: Job) => job.assignedTo === selectedFilter
    );
  }, [jobsWithAssignment, selectedFilter]);

  const overdueDates = filteredJobs.filter((job: Job) => {
    return job.daysFromToday < 0;
  });

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
              Jobs
            </h3>
            {selectedFilter !== "all" && (
              <>
                <span className="text-lg font-bold">・</span>
                <span className="text-content-secondary text-[17px]/[24px]">
                  Assigned to me as {selectedFilter}
                </span>
              </>
            )}
          </div>
          <MoreButton
            menu={
              <JobsOverflow
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                showTimeBudget={showTimeBudget}
                onToggleTimeBudget={setShowTimeBudget}
                colSpan={colSpan}
              />
            }
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>
        <div className="relative flex w-full shrink-0 flex-col content-stretch items-start overflow-clip">
          {/* Stats Summary */}
          <div className="relative flex w-full shrink-0 flex-wrap content-start items-start gap-0 overflow-clip px-0 pt-0 pb-[18px]">
            <div className="relative box-border flex min-h-px max-w-[225px] min-w-[160px] shrink-0 grow basis-0 flex-col content-stretch items-start px-[24px] py-0">
              <div className="relative flex w-full shrink-0 content-stretch items-baseline gap-[4px]">
                <p className="relative min-h-px min-w-px shrink-0 grow basis-0 text-[24px] leading-[normal] font-light text-[#000a1e] not-italic">
                  {jobsData.dueThisWeek}
                </p>
              </div>
              <p
                className="relative min-w-full shrink-0 text-[13px] leading-[20px] text-[#59606d] not-italic"
                style={{ width: "min-content" }}
              >
                Due this week
              </p>
              <div className="absolute top-[4px] bottom-[4px] left-[-1px] w-px bg-[#e6e7e9]" />
            </div>
            <div className="relative flex min-h-px max-w-[225px] min-w-[160px] shrink-0 grow basis-0 flex-col content-stretch items-start px-[24px] py-0">
              <div className="relative flex w-full shrink-0 content-stretch items-baseline justify-center gap-[4px]">
                <p className="relative min-h-px min-w-px shrink-0 grow basis-0 text-[24px] leading-[normal] font-light text-[#000a1e] not-italic">
                  {overdueDates.length}
                </p>
              </div>
              <p
                className="relative min-w-full shrink-0 text-[13px] leading-[20px] text-[#de0e40] not-italic"
                style={{ width: "min-content" }}
              >
                Overdue
              </p>
              <div className="absolute top-[4px] bottom-[4px] left-[-1px] w-px bg-[#e6e7e9]" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative w-full flex-1 px-6 py-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                  Job
                </th>
                {colSpan === 2 && (
                  <>
                    <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Client
                    </th>
                    <th className="py-2 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                      Status
                    </th>
                    {showTimeBudget && (
                      <th className="py-2 text-right text-[11px] leading-[normal] font-normal text-[#59606d]">
                        Time budget
                      </th>
                    )}
                  </>
                )}
                <th className="w-24 min-w-0 py-2 pl-12 text-left text-[11px] leading-[normal] font-normal text-[#59606d]">
                  Due
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job: Job, index: number) => (
                <JobTableRow
                  key={index}
                  job={job}
                  colSpan={colSpan}
                  showTimeBudget={showTimeBudget}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-start justify-center px-0 pt-0 pb-[8px]">
          <div className="relative box-border flex w-full shrink-0 content-stretch items-center gap-[8px] px-[24px] pt-[5px] pb-[12px]">
            <div className="relative box-border flex h-[30px] shrink-0 content-stretch items-center justify-center gap-[4px] rounded-[100px] border border-solid border-[#ccced2] bg-white px-[16px] py-0">
              <p className="relative shrink-0 text-[13px] leading-[20px] font-bold text-nowrap whitespace-pre text-[#0078c8] not-italic">
                View jobs
              </p>
            </div>
            <div className="relative box-border flex h-[30px] shrink-0 content-stretch items-center justify-center gap-[4px] rounded-[100px] border border-solid border-[#ccced2] bg-white px-[16px] py-0">
              <p className="relative shrink-0 text-[13px] leading-[20px] font-bold text-nowrap whitespace-pre text-[#0078c8] not-italic">
                Create job
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomizationOverlay>
  );
}
