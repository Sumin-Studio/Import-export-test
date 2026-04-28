"use client";

import { useState, useRef } from "react";
import { Check } from "lucide-react";

interface Milestone {
  key: string;
  title: string;
  type: "getting-started" | "builder";
}

interface User {
  id: string;
  name: string;
  email: string;
  type: "supabase" | "builder";
}

interface Completion {
  milestoneKey: string;
  milestoneTitle: string;
  completedAt: string;
  type: "getting-started" | "builder";
}

interface UserWithCompletions extends User {
  completions: Completion[];
}

interface StatusGridProps {
  users: UserWithCompletions[];
  milestones: Milestone[];
}

export function StatusGrid({ users, milestones }: StatusGridProps) {
  // Helper to check if a user completed a milestone
  const hasCompleted = (userId: string, milestoneKey: string): Completion | null => {
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    
    const completion = user.completions.find((c) => c.milestoneKey === milestoneKey);
    return completion || null;
  };

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto overflow-y-visible">
      <div className="inline-block min-w-full">
        <div className="rounded-lg border border-neutral-200 bg-white shadow-sm p-4 overflow-visible">
          {/* User rows */}
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex gap-2 items-center overflow-visible">
                <div className="w-32 shrink-0 text-sm font-medium text-neutral-900 truncate">
                  {user.name}
                </div>
                <div className="flex gap-2 overflow-visible">
                  {milestones.map((milestone, index) => {
                    const completion = hasCompleted(user.id, milestone.key);
                    // Add extra spacing before the Making Stuff milestones (after the 6th milestone)
                    const isMakingStuffStart = index === 6;
                    // Add extra spacing before the GitHub milestones (after the 8th milestone, which is the last Making Stuff milestone)
                    const isGitHubStart = milestone.key.startsWith("github-") && index > 0 && !milestones[index - 1].key.startsWith("github-");
                    return (
                      <div key={`${user.id}-${milestone.key}`} className="flex items-center">
                        {isMakingStuffStart && (
                          <div className="w-8 shrink-0" aria-hidden="true" />
                        )}
                        {isGitHubStart && (
                          <div className="w-8 shrink-0" aria-hidden="true" />
                        )}
                        <GridCell
                          milestone={milestone}
                          completion={completion}
                          formatDate={formatDate}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface GridCellProps {
  milestone: Milestone;
  completion: Completion | null;
  formatDate: (dateString: string) => string;
}

function GridCell({ milestone, completion, formatDate }: GridCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const cellRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 10, // Position above the cell
        left: rect.left + rect.width / 2, // Center horizontally
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        ref={cellRef}
        className="w-9 h-9 shrink-0 flex items-center justify-center rounded border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {completion ? (
          <div className="w-7 h-7 rounded bg-brand flex items-center justify-center">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
        ) : (
          <div className="w-5 h-5 rounded bg-neutral-100" />
        )}
      </div>
      {/* Tooltip positioned fixed to escape overflow containers */}
      {isHovered && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-neutral-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg mb-2">
            <div className="font-semibold">{milestone.title}</div>
            {completion ? (
              <div className="text-neutral-300 mt-1">
                Completed: {formatDate(completion.completedAt)}
              </div>
            ) : (
              <div className="text-neutral-300 mt-1">Not completed</div>
            )}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
        </div>
      )}
    </>
  );
}

