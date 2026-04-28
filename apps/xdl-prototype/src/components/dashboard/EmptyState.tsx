"use client";

import { FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  onClearFilters: () => void;
  className?: string;
}

export function EmptyState({ onClearFilters, className }: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-large border border-border-subtle border-dashed bg-background-secondary px-8 py-16 text-center",
        className
      )}
      aria-label="No results"
    >
      <FileSearch
        className="size-12 text-text-faint"
        aria-hidden
      />
      <h2 className="text-heading-tiny-bold text-text-default">
        No clients match your filters
      </h2>
      <p className="max-w-sm text-body-standard-regular text-text-muted">
        Try adjusting your filters or search query to see more clients.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="rounded-medium bg-[var(--color-action-default)] px-4 py-2 text-button-small-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-action-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-focus)] cursor-pointer"
      >
        Clear filters
      </button>
    </section>
  );
}
