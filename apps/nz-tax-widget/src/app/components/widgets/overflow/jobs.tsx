export type JobFilterType = "all" | "staff" | "manager" | "partner";

interface ComponentProps {
  className?: string;
  selectedFilter: JobFilterType;
  onFilterChange: (filter: JobFilterType) => void;
  showTimeBudget: boolean;
  onToggleTimeBudget: (show: boolean) => void;
  colSpan: 1 | 2;
}

export default function JobsOverflow({
  className = "",
  selectedFilter,
  onFilterChange,
  showTimeBudget,
  onToggleTimeBudget,
  colSpan,
}: ComponentProps) {
  const filters: Array<{ value: JobFilterType; label: string }> = [
    { value: "all", label: "All jobs" },
    { value: "staff", label: "Assigned to me as staff" },
    { value: "manager", label: "Assigned to me as manager" },
    { value: "partner", label: "Assigned to me as partner" },
  ];

  return (
    <div className={className}>
      <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
        Filter
      </h3>
      <nav className="text-[15px]/[24px]">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left ${
              selectedFilter === filter.value
                ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                : ""
            }`}
            type="button"
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </nav>
      {colSpan === 2 && (
        <nav className="border-border-primary border-t pt-3 text-[15px]/[24px]">
          <h3 className="text-content-secondary px-5 py-2 pt-3 text-[13px]/[20px]">
            Columns
          </h3>
          <div className="hover:bg-background-primary flex w-full items-center gap-2 px-5 py-2">
            <input
              type="checkbox"
              id="time-budget"
              className="h-4 w-4 cursor-pointer"
              checked={showTimeBudget}
              onChange={(e) => onToggleTimeBudget(e.target.checked)}
            />
            <label htmlFor="time-budget" className="cursor-pointer">
              Time budget
            </label>
          </div>
        </nav>
      )}
    </div>
  );
}
