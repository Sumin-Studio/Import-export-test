"use client";

import { useState } from "react";
import { Arrow } from "@/app/components/ui/icons";
import { MoreButton } from "@/components/global";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { QuickActionsOverflow } from "@/app/components/widgets/overflow";
import type { ActionType } from "@/app/components/widgets/overflow/quick-actions";
import { actions } from "@/app/components/widgets/overflow/quick-actions";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
  onToggleColSpan?: () => void;
  colSpan?: 1 | 2;
  canToggleSize?: boolean;
}

export function QuickActions({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
  canToggleSize = false,
}: ComponentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<ActionType, boolean>>(
    {
      addOrganisations: true,
      createOrganisation: true,
      createClient: true,
      createJob: true,
      createQuote: false,
      enterCost: false,
    }
  );

  const toggleCheck = (key: ActionType) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const visibleActions = actions.filter((action) => checkedItems[action.value]);

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
      canToggleSize={canToggleSize}
    >
      <div
        className={`relative flex h-[251px] ${
          colSpan === 2 ? "w-full" : "w-[440px]"
        } min-w-[440px] flex-col rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between pt-3.5 pr-2 pb-2 pl-6">
          <h3 className="text-[17px]/[24px] font-bold">Quick actions</h3>
          <MoreButton
            menu={
              <QuickActionsOverflow
                checkedItems={checkedItems}
                onToggleCheck={toggleCheck}
              />
            }
            menuClassName="w-[300px]"
            position={{ to: "bottom end", gap: "4px" }}
          />
        </div>

        {/* Actions List */}
        <div className="flex-1 overflow-auto">
          {visibleActions.map((action) => (
            <button
              key={action.value}
              type="button"
              className="border-background-tertiary hover:bg-background-secondary relative flex w-full cursor-pointer items-center gap-2 border-t py-1 pr-2 pl-6 text-left transition-colors"
            >
              {/* Content */}
              <div className="flex-1 py-[6px]">
                <p className="text-content-primary text-[13px]/[20px]">
                  {action.label}
                </p>
              </div>

              <div className="flex size-8 items-center justify-center py-1">
                <Arrow className="text-brand-primary group-hover:text-brand-secondary" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </CustomizationOverlay>
  );
}

export default QuickActions;
