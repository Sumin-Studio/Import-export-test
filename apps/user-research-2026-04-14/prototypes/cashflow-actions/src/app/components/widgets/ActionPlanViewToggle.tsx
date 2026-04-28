"use client";

export function ActionPlanViewToggle({
  showPlanned,
  onPlannedViewChange,
  proposedToggleOnLeft = false,
}: {
  showPlanned: boolean;
  onPlannedViewChange: (planned: boolean) => void;
  proposedToggleOnLeft?: boolean;
}) {
  const proposedBtn = (
    <button
      key="proposed"
      type="button"
      onClick={() => onPlannedViewChange(true)}
      className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
        showPlanned
          ? "bg-[#E8F4FC] text-brand-primary"
          : "text-content-secondary hover:text-content-primary"
      }`}
    >
      Proposed plan
    </button>
  );
  const currentBtn = (
    <button
      key="current"
      type="button"
      onClick={() => onPlannedViewChange(false)}
      className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
        !showPlanned
          ? "bg-[#E8F4FC] text-brand-primary"
          : "text-content-secondary hover:text-content-primary"
      }`}
    >
      Current
    </button>
  );
  return (
    <div className="flex shrink-0 rounded-full border border-border-primary p-0.5 text-[11px]/[16px]">
      {proposedToggleOnLeft ? [proposedBtn, currentBtn] : [currentBtn, proposedBtn]}
    </div>
  );
}
