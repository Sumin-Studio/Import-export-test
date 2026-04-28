"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkReviewSubmit: () => void;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  onClearSelection,
  onBulkReviewSubmit,
  className,
}: BulkActionBarProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (selectedCount === 0) return null;

  const handleSubmitClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onBulkReviewSubmit();
    setShowConfirm(false);
    onClearSelection();
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-background-secondary px-4 py-3",
        className
      )}
      role="region"
      aria-label="Bulk actions"
    >
      <div className="flex items-center gap-3">
        <span className="text-body-small-regular text-text-default">
          {selectedCount} client{selectedCount !== 1 ? "s" : ""} selected
        </span>
        <button
          type="button"
          onClick={onClearSelection}
          className="text-body-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] rounded-small cursor-pointer"
        >
          Clear selection
        </button>
      </div>
      <div className="flex items-center gap-2">
        {!showConfirm ? (
          <button
            type="button"
            onClick={handleSubmitClick}
            className="rounded-medium bg-[var(--color-action-default)] px-4 py-2 text-button-small-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-action-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer"
          >
            Bulk Review & Submit
          </button>
        ) : (
          <>
            <span className="text-body-small-regular text-text-muted mr-2">
              Submit selected for review?
            </span>
            <button
              type="button"
              onClick={handleCancelConfirm}
              className="rounded-medium border border-border-regular px-4 py-2 text-button-small-medium text-text-default hover:bg-background-tertiary focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-medium bg-[var(--color-action-default)] px-4 py-2 text-button-small-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-action-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
}
