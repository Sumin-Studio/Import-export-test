import type { WorkloadViewMode } from "@/app/components/charts/WorkloadInsights";
import type {
  WorkloadFilterRole,
  WorkloadTimePeriod,
} from "@/app/lib/mockData/workloadInsights";

/** NZ FY (Apr–Mar); prototype copy — adjust FY labels when refreshing the build. */
export const WORKLOAD_TIME_PERIOD_OPTIONS: readonly {
  id: WorkloadTimePeriod;
  label: string;
  rangeLabel: string;
}[] = [
  {
    id: "thisYear",
    label: "This year",
    rangeLabel: "Apr 2025 – Mar 2026",
  },
  {
    id: "lastYear",
    label: "Last year",
    rangeLabel: "Apr 2024 – Mar 2025",
  },
];

export const WORKLOAD_ACCOUNT_MANAGERS = [
  { id: "am-sophie", name: "Sophie Chen" },
  { id: "am-james", name: "James O’Connor" },
  { id: "am-aroha", name: "Aroha Williams" },
  { id: "am-ryan", name: "Ryan Patel" },
  { id: "am-emma", name: "Emma Taylor" },
] as const;

export const WORKLOAD_MANAGERS = [
  { id: "m-michael", name: "Michael Hughes" },
  { id: "m-priya", name: "Priya Nair" },
  { id: "m-charlotte", name: "Charlotte Fraser" },
  { id: "m-david", name: "David Kumar" },
] as const;

interface ComponentProps {
  className?: string;
  /** Unique prefix for radio `name` attributes when multiple workload widgets are on the page */
  radioGroupPrefix?: string;
  /** When true, omit the Month / Return type section (e.g. Returns by type widget). */
  hideDisplayFilter?: boolean;
  viewMode: WorkloadViewMode;
  onViewModeChange: (mode: WorkloadViewMode) => void;
  /** Month stacked chart: show columns split by IR3, IR4, … — off shows a single “Filed” total per month */
  monthBreakdownByReturnType?: boolean;
  onMonthBreakdownByReturnTypeChange?: (value: boolean) => void;
  timePeriod: WorkloadTimePeriod;
  onTimePeriodChange: (period: WorkloadTimePeriod) => void;
  filterRole: WorkloadFilterRole;
  onFilterRoleChange: (role: WorkloadFilterRole) => void;
  selectedAccountManagerId: string;
  onAccountManagerChange: (id: string) => void;
  selectedManagerId: string;
  onManagerChange: (id: string) => void;
}

const roleRadioClass = (checked: boolean) =>
  `hover:bg-background-primary flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 text-left transition-[color,box-shadow] duration-200 ease-out ${
    checked
      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
      : "text-content-primary"
  }`;

const personRadioClass = (checked: boolean) =>
  `hover:bg-background-primary flex w-full cursor-pointer items-start gap-3 px-5 py-2 text-left text-[15px]/[24px] transition-[color,box-shadow] duration-200 ease-out ${
    checked
      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
      : "text-content-primary"
  }`;

const timePeriodRowClass = (selected: boolean) =>
  `hover:bg-background-primary flex w-full min-w-0 items-center justify-between gap-2 px-5 py-2.5 text-left transition-[color,box-shadow] duration-200 ease-out ${
    selected
      ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
      : "text-content-primary"
  }`;

export default function WorkloadInsightsOverflow({
  className = "",
  radioGroupPrefix,
  hideDisplayFilter = false,
  viewMode,
  onViewModeChange,
  monthBreakdownByReturnType = true,
  onMonthBreakdownByReturnTypeChange = () => {},
  timePeriod,
  onTimePeriodChange,
  filterRole,
  onFilterRoleChange,
  selectedAccountManagerId,
  onAccountManagerChange,
  selectedManagerId,
  onManagerChange,
}: ComponentProps) {
  return (
    <div className={className}>
      {/* Time period — first section */}
      <div className="border-border-primary border-b">
        <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
          Time period
        </h3>
        <div className="flex flex-col pb-1" role="group" aria-label="Time period">
          {WORKLOAD_TIME_PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={timePeriodRowClass(timePeriod === opt.id)}
              onClick={() => onTimePeriodChange(opt.id)}
            >
              <span className="shrink-0 text-[15px]/[24px] font-normal">
                {opt.label}
              </span>
              <span className="text-content-secondary min-w-0 shrink text-right text-[11px]/[14px] whitespace-nowrap">
                {opt.rangeLabel}
              </span>
            </button>
          ))}
        </div>
      </div>

      {viewMode === "month" ? (
        <div className="border-border-primary border-b">
          <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
            Chart
          </h3>
          <div className="text-content-primary flex items-center justify-between px-5 py-2.5 pb-3 text-[15px]/[24px]">
            <span className="pr-3 font-normal">
              Break down by return type
            </span>
            <div className="relative inline-block h-5 w-9 shrink-0">
              <input
                type="checkbox"
                checked={monthBreakdownByReturnType}
                className="peer sr-only"
                id={`${radioGroupPrefix ?? "workload"}-month-breakdown-rt`}
                onChange={(e) =>
                  onMonthBreakdownByReturnTypeChange(e.target.checked)
                }
              />
              <label
                htmlFor={`${radioGroupPrefix ?? "workload"}-month-breakdown-rt`}
                className={`block h-5 w-9 cursor-pointer rounded-full transition-colors duration-200 ${
                  monthBreakdownByReturnType
                    ? "bg-brand-primary"
                    : "bg-[#ccd0d5]"
                }`}
              />
              <span
                className={`pointer-events-none absolute top-[2px] left-[2px] size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
                  monthBreakdownByReturnType ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>
      ) : null}

      {!hideDisplayFilter ? (
        <div>
          <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
            Display
          </h3>
          <nav className="flex flex-col pb-1 text-[15px]/[24px]">
            <button
              type="button"
              className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left font-normal transition-[color,box-shadow] duration-300 ease-out ${
                viewMode === "month"
                  ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                  : "text-content-primary"
              }`}
              onClick={() => onViewModeChange("month")}
            >
              Month
            </button>
            <button
              type="button"
              className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left font-normal transition-[color,box-shadow] duration-300 ease-out ${
                viewMode === "returnType"
                  ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                  : "text-content-primary"
              }`}
              onClick={() => onViewModeChange("returnType")}
            >
              Return type
            </button>
          </nav>
        </div>
      ) : null}

      <div className="min-w-0">
        <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
          Filter
        </h3>
        <div
          className="flex flex-col pb-1"
          role="radiogroup"
          aria-label="Filter"
        >
          <label className={roleRadioClass(filterRole === "firm")}>
            <input
              type="radio"
              name="workload-insights-filter-role"
              value="firm"
              checked={filterRole === "firm"}
              onChange={() => onFilterRoleChange("firm")}
              className="border-border-primary text-brand-primary mt-0.5 size-4 shrink-0 cursor-pointer accent-[#0078c8]"
            />
            <span className="font-normal">All returns</span>
          </label>
          <label className={roleRadioClass(filterRole === "accountManager")}>
            <input
              type="radio"
              name="workload-insights-filter-role"
              value="accountManager"
              checked={filterRole === "accountManager"}
              onChange={() => onFilterRoleChange("accountManager")}
              className="border-border-primary text-brand-primary mt-0.5 size-4 shrink-0 cursor-pointer accent-[#0078c8]"
            />
            <span className="font-normal">Partner</span>
          </label>
          <label className={roleRadioClass(filterRole === "manager")}>
            <input
              type="radio"
              name="workload-insights-filter-role"
              value="manager"
              checked={filterRole === "manager"}
              onChange={() => onFilterRoleChange("manager")}
              className="border-border-primary text-brand-primary mt-0.5 size-4 shrink-0 cursor-pointer accent-[#0078c8]"
            />
            <span className="font-normal">Manager</span>
          </label>
        </div>
      </div>

      {filterRole === "accountManager" ? (
        <div className="border-border-primary min-w-0 border-t">
          <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
            Partner
          </h3>
          <div
            className="flex flex-col pb-2"
            role="radiogroup"
            aria-label="Partner"
          >
            {WORKLOAD_ACCOUNT_MANAGERS.map((person) => (
              <label
                key={person.id}
                className={personRadioClass(
                  selectedAccountManagerId === person.id
                )}
              >
                <input
                  type="radio"
                  name="workload-insights-account-manager"
                  value={person.id}
                  checked={selectedAccountManagerId === person.id}
                  onChange={() => {
                    onFilterRoleChange("accountManager");
                    onAccountManagerChange(person.id);
                  }}
                  className="border-border-primary text-brand-primary mt-0.5 size-4 shrink-0 cursor-pointer accent-[#0078c8]"
                />
                <span>{person.name}</span>
              </label>
            ))}
          </div>
        </div>
      ) : filterRole === "manager" ? (
        <div className="border-border-primary min-w-0 border-t">
          <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
            Manager
          </h3>
          <div
            className="flex flex-col pb-2"
            role="radiogroup"
            aria-label="Manager"
          >
            {WORKLOAD_MANAGERS.map((person) => (
              <label
                key={person.id}
                className={personRadioClass(selectedManagerId === person.id)}
              >
                <input
                  type="radio"
                  name="workload-insights-manager"
                  value={person.id}
                  checked={selectedManagerId === person.id}
                  onChange={() => {
                    onFilterRoleChange("manager");
                    onManagerChange(person.id);
                  }}
                  className="border-border-primary text-brand-primary mt-0.5 size-4 shrink-0 cursor-pointer accent-[#0078c8]"
                />
                <span>{person.name}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
