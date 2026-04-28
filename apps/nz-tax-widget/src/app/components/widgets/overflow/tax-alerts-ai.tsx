export type TaxAiSortMode = "priority" | "due";

interface TaxAlertsAiOverflowProps {
  className?: string;
  sortMode: TaxAiSortMode;
  onSortChange: (mode: TaxAiSortMode) => void;
}

const SORT_OPTIONS: { value: TaxAiSortMode; label: string }[] = [
  { value: "priority", label: "Priority (recommended)" },
  { value: "due", label: "Due date" },
];

export default function TaxAlertsAiOverflow({
  className = "",
  sortMode,
  onSortChange,
}: TaxAlertsAiOverflowProps) {
  return (
    <div className={className}>
      <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
        Sort
      </h3>
      <nav className="text-[15px]/[24px]">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left ${
              sortMode === opt.value
                ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                : ""
            }`}
            onClick={() => onSortChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
