import { useState, useId, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { FilterConfig, FilterValue, ActiveFilter } from "./types";
import { TextFilterPanel } from "./TextFilterPanel";
import { NumberFilterPanel } from "./NumberFilterPanel";
import { DateFilterPanel } from "./DateFilterPanel";
import { MultiSelectFilterPanel } from "./MultiSelectFilterPanel";
import { usePopover } from "@/app/contexts/PopoverContext";

interface FilterDropdownProps {
  columns: Array<{
    id: string;
    label: string;
    filterConfig?: FilterConfig;
  }>;
  activeFilters: ActiveFilter[];
  onFilterChange: (columnId: string, filter: FilterValue | null) => void;
}

type ViewState =
  | { type: "main" }
  | { type: "filter"; columnId: string; config: FilterConfig };

function PopoverRegistrar({
  close,
  filterId,
  registerPopover,
  unregisterPopover,
}: {
  close: () => void;
  filterId: string;
  registerPopover: (id: string, fn: () => void) => void;
  unregisterPopover: (id: string) => void;
}) {
  useEffect(() => {
    registerPopover(filterId, close);
    return () => unregisterPopover(filterId);
  }, [close, filterId, registerPopover, unregisterPopover]);
  return null;
}

export function FilterDropdown({
  columns,
  activeFilters,
  onFilterChange,
}: FilterDropdownProps) {
  const { registerPopover, unregisterPopover } = usePopover();
  const filterPopoverId = useId();
  const [view, setView] = useState<ViewState>({ type: "main" });
  const [searchQuery, setSearchQuery] = useState("");

  const filterableColumns = columns.filter((col) => col.filterConfig);
  const filteredColumns = filterableColumns.filter((col) =>
    col.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeFilterCount = activeFilters.length;

  const getActiveFilterForColumn = (columnId: string): FilterValue | null => {
    return activeFilters.find((f) => f.columnId === columnId)?.filter ?? null;
  };

  const handleFilterApply = (columnId: string, filter: FilterValue | null) => {
    onFilterChange(columnId, filter);
    setView({ type: "main" });
  };

  const renderFilterPanel = () => {
    if (view.type !== "filter") return null;

    const { columnId, config } = view;
    const currentFilter = getActiveFilterForColumn(columnId);
    const column = columns.find((col) => col.id === columnId);
    const columnLabel = column?.label || "";
    const capitalizedLabel =
      columnLabel.charAt(0).toUpperCase() + columnLabel.slice(1);

    const onBack = () => setView({ type: "main" });

    switch (config.type) {
      case "text":
        return (
          <TextFilterPanel
            value={currentFilter?.type === "text" ? currentFilter : null}
            onApply={(filter) => handleFilterApply(columnId, filter)}
            onBack={onBack}
            title={capitalizedLabel}
          />
        );
      case "number":
        return (
          <NumberFilterPanel
            value={currentFilter?.type === "number" ? currentFilter : null}
            onApply={(filter) => handleFilterApply(columnId, filter)}
            onBack={onBack}
            title={capitalizedLabel}
          />
        );
      case "date":
        return (
          <DateFilterPanel
            value={currentFilter?.type === "date" ? currentFilter : null}
            onApply={(filter) => handleFilterApply(columnId, filter)}
            onBack={onBack}
            title={capitalizedLabel}
          />
        );
      case "multiSelect":
        return (
          <MultiSelectFilterPanel
            value={currentFilter?.type === "multiSelect" ? currentFilter : null}
            options={config.options ?? []}
            onApply={(filter) => handleFilterApply(columnId, filter)}
            onBack={onBack}
            title={capitalizedLabel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Popover className="relative">
      {({ close }) => {
        return (
          <>
            <PopoverRegistrar
              close={close}
              filterId={filterPopoverId}
              registerPopover={registerPopover}
              unregisterPopover={unregisterPopover}
            />
            <Button asChild variant="secondary" size="xs">
              <PopoverButton
                onClick={() => {
                  setView({ type: "main" });
                  setSearchQuery("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3.5"
                  fill="none"
                  viewBox="0 0 13 13"
                >
                  <path
                    fill="#1e3145"
                    d="M12.5 6.25c0 .345-.28.625-.625.625h-5v5a.625.625 0 1 1-1.25 0v-5h-5a.625.625 0 0 1 0-1.25h5v-5a.625.625 0 1 1 1.25 0v5h5c.345 0 .625.28.625.625"
                  ></path>
                </svg>
                Filter
              </PopoverButton>
            </Button>
            <PopoverPanel
              anchor={{ to: "bottom start" }}
              className="border-border-soft bg-background-primary shadow-pop z-30 w-75 origin-top translate-y-0 overflow-hidden! rounded-lg border opacity-100 transition ease-in-out [--anchor-gap:8px] data-closed:translate-y-1 data-closed:opacity-0"
              transition
            >
              <div className="relative overflow-hidden">
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    view.type === "main"
                      ? "relative translate-x-0 opacity-100"
                      : "absolute inset-x-0 top-0 -translate-x-full opacity-0"
                  }`}
                >
                  <div className="border-border-soft border-b p-3">
                    <div className="focus-within:ring-action-default border-border-subtle relative flex h-8 items-center gap-2 rounded-md border pr-8 pl-2 ring-2 ring-transparent ring-offset-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="none"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="#1e3145"
                          d="m14.817 13.933-4.264-4.264a5.937 5.937 0 1 0-.884.884l4.264 4.264a.625.625 0 1 0 .884-.884m-8.88-3.308a4.687 4.687 0 1 1 0-9.375 4.687 4.687 0 0 1 0 9.375"
                        ></path>
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="text-input-regular text-content-default placeholder:text-text-faint w-56 focus:outline-none"
                      />
                      {searchQuery && (
                        <button
                          className="hover:bg-tertiary absolute top-0.75 right-1 flex size-6 items-center justify-center rounded-sm"
                          onClick={() => setSearchQuery("")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="none"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fill="#1e3145"
                              d="M10.594 5.29 8.384 7.5l2.21 2.21a.625.625 0 1 1-.884.884L7.5 8.384l-2.21 2.21a.625.625 0 1 1-.884-.884l2.21-2.21-2.21-2.21a.625.625 0 0 1 .884-.884l2.21 2.21 2.21-2.21a.625.625 0 0 1 .884.884M15 7.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-1.25 0a6.25 6.25 0 1 0-12.5 0 6.25 6.25 0 0 0 12.5 0"
                            ></path>
                          </svg>
                          <span className="sr-only">Clear search</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col py-3">
                    {filteredColumns.map((column) => {
                      const hasFilter = activeFilters.some(
                        (f) => f.columnId === column.id
                      );
                      return (
                        <button
                          key={column.id}
                          onClick={() =>
                            setView({
                              type: "filter",
                              columnId: column.id,
                              config: column.filterConfig!,
                            })
                          }
                          className="text-input-regular group flex cursor-pointer items-center justify-between py-1 pr-3 pl-4 hover:bg-neutral-50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="capitalize">{column.label}</span>
                            {hasFilter && (
                              <span className="bg-action-default size-2 rounded-full" />
                            )}
                          </div>
                          <div className="flex size-8 items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="10"
                              fill="none"
                              viewBox="0 0 6 10"
                            >
                              <path
                                fill="#1e3145"
                                d="M5.442 5.442 1.067 9.817a.625.625 0 0 1-.884-.884L4.116 5 .183 1.067a.625.625 0 1 1 .884-.884l4.375 4.375a.625.625 0 0 1 0 .884"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={`transition-all duration-200 ease-in-out ${
                    view.type === "filter"
                      ? "relative translate-x-0 opacity-100"
                      : "absolute inset-x-0 top-0 translate-x-full opacity-0"
                  }`}
                >
                  {renderFilterPanel()}
                </div>
              </div>
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  );
}
