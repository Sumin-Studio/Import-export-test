"use client";

export function ActionPlanViewToggle({
  showPlanned,
  onPlannedViewChange,
  proposedToggleOnLeft = false,
}: {
  showPlanned: boolean;
  onPlannedViewChange: (planned: boolean) => void;
  /** Reserved for a mirrored toolbar layout; kept so parent panels can thread the flag. */
  proposedToggleOnLeft?: boolean;
}) {
  void proposedToggleOnLeft;
  return (
    <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded border border-border-primary px-2.5 py-1.5">
      <input
        type="checkbox"
        checked={showPlanned}
        onChange={(e) => onPlannedViewChange(e.target.checked)}
        className="h-3.5 w-3.5 cursor-pointer accent-brand-primary"
      />
      <span className="text-[11px]/[16px] font-normal text-content-secondary">
        Show proposed plan
      </span>
    </label>
  );
}
