import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ActiveFilter, FilterConfig, FilterValue } from "./types";
import { TextFilterPanel } from "./TextFilterPanel";
import { NumberFilterPanel } from "./NumberFilterPanel";
import { DateFilterPanel } from "./DateFilterPanel";
import { MultiSelectFilterPanel } from "./MultiSelectFilterPanel";

interface ActiveFilterBadgesProps {
  filters: ActiveFilter[];
  columns: Array<{
    id: string;
    label: string;
    filterConfig?: FilterConfig;
  }>;
  onRemove: (columnId: string) => void;
  onFilterChange: (columnId: string, filter: FilterValue | null) => void;
}

function formatFilterValue(filterValue: FilterValue): string {
  switch (filterValue.type) {
    case "text":
      return `"${filterValue.value}"`;
    case "number": {
      const parts: string[] = [];
      if (filterValue.min !== undefined) parts.push(`≥ ${filterValue.min}`);
      if (filterValue.max !== undefined) parts.push(`≤ ${filterValue.max}`);
      return parts.join(" and ");
    }
    case "date": {
      const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-");
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
      };
      const parts: string[] = [];
      if (filterValue.from) parts.push(`from ${formatDate(filterValue.from)}`);
      if (filterValue.to) parts.push(`to ${formatDate(filterValue.to)}`);
      return parts.join(" ");
    }
    case "multiSelect": {
      const count = filterValue.values.length;
      if (count === 1) {
        return filterValue.values[0];
      }
      if (count === 2) {
        return filterValue.values.join(", ");
      }
      return `${count} selected`;
    }
    default:
      return "";
  }
}

export function ActiveFilterBadges({
  filters,
  columns,
  onRemove,
  onFilterChange,
}: ActiveFilterBadgesProps) {
  if (filters.length === 0) {
    return null;
  }

  const renderFilterPanel = (
    columnId: string,
    columnLabel: string,
    config: FilterConfig,
    currentFilter: FilterValue | null,
    close: () => void
  ) => {
    const handleApply = (filter: FilterValue | null) => {
      onFilterChange(columnId, filter);
      close();
    };

    const capitalizedLabel =
      columnLabel.charAt(0).toUpperCase() + columnLabel.slice(1);
    const title = `Filter by: ${capitalizedLabel}`;

    switch (config.type) {
      case "text":
        return (
          <TextFilterPanel
            value={currentFilter?.type === "text" ? currentFilter : null}
            onApply={handleApply}
            onBack={close}
            showBack={false}
            title={title}
          />
        );
      case "number":
        return (
          <NumberFilterPanel
            value={currentFilter?.type === "number" ? currentFilter : null}
            onApply={handleApply}
            onBack={close}
            showBack={false}
            title={title}
          />
        );
      case "date":
        return (
          <DateFilterPanel
            value={currentFilter?.type === "date" ? currentFilter : null}
            onApply={handleApply}
            onBack={close}
            showBack={false}
            title={title}
          />
        );
      case "multiSelect":
        return (
          <MultiSelectFilterPanel
            value={currentFilter?.type === "multiSelect" ? currentFilter : null}
            options={config.options ?? []}
            onApply={handleApply}
            onBack={close}
            showBack={false}
            title={title}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {filters.map((filter) => {
        const column = columns.find((col) => col.id === filter.columnId);
        const config = column?.filterConfig;

        return (
          <Popover key={filter.columnId} className="relative">
            {({ close }) => (
              <>
                <div className="text-button-small-medium border-border-subtle flex h-6 items-center overflow-hidden rounded-md border">
                  <span className="pr-2 pl-3 capitalize">
                    {filter.columnLabel}
                  </span>
                  <PopoverButton className="text-action-default border-border-subtle h-6 border-r border-l px-2 hover:bg-neutral-50">
                    {formatFilterValue(filter.filter)}
                  </PopoverButton>
                  <button
                    onClick={() => onRemove(filter.columnId)}
                    className="flex h-6 items-center justify-center px-3 hover:bg-neutral-50"
                    aria-label={`Remove ${filter.columnLabel} filter`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        fill="currentColor"
                        d="M5.884 5 9.442 1.442a.625.625 0 1 0-.884-.884L5 4.116 1.442.558a.625.625 0 1 0-.884.884L4.116 5 .558 8.558a.625.625 0 1 0 .884.884L5 5.884l3.558 3.558a.625.625 0 1 0 .884-.884z"
                      ></path>
                    </svg>
                  </button>
                </div>
                {config && (
                  <PopoverPanel
                    anchor={{ to: "bottom start" }}
                    className="text-input-regular border-border-soft bg-background-primary shadow-lift z-30 w-50 origin-top translate-y-0 overflow-hidden! rounded-lg border opacity-100 transition ease-in-out [--anchor-gap:4px] data-closed:translate-y-1 data-closed:opacity-0"
                    transition
                  >
                    {renderFilterPanel(
                      filter.columnId,
                      filter.columnLabel,
                      config,
                      filter.filter,
                      close
                    )}
                  </PopoverPanel>
                )}
              </>
            )}
          </Popover>
        );
      })}
    </>
  );
}
