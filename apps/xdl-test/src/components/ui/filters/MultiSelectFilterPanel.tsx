import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelectFilter } from "./types";

interface MultiSelectFilterPanelProps {
  value: MultiSelectFilter | null;
  options: string[];
  onApply: (filter: MultiSelectFilter | null) => void;
  onBack: () => void;
  showBack?: boolean;
  title?: string;
}

export function MultiSelectFilterPanel({
  value,
  options,
  onApply,
  onBack,
  showBack = true,
  title = "Multi-Select Filter",
}: MultiSelectFilterPanelProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(value?.values ?? [])
  );
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (option: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(option)) {
      newSelected.delete(option);
    } else {
      newSelected.add(option);
    }
    setSelected(newSelected);
  };

  const handleApply = () => {
    if (selected.size > 0) {
      onApply({
        type: "multiSelect",
        values: Array.from(selected),
      });
    } else {
      onApply(null);
    }
  };

  const handleClear = () => {
    setSelected(new Set());
    onApply(null);
  };

  return (
    <>
      <div className="border-border-soft border-b">
        {showBack ? (
          <button
            onClick={onBack}
            className="text-body-standard-semibold flex w-full cursor-pointer items-center justify-start gap-2 p-2 text-left"
          >
            <span className="flex size-8 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="12"
                fill="none"
                viewBox="0 0 14 12"
              >
                <path
                  fill="#1e3145"
                  d="M13.75 5.625c0 .345-.28.625-.625.625H2.134l3.933 3.933a.625.625 0 0 1-.884.884l-5-5a.625.625 0 0 1 0-.884l5-5a.625.625 0 1 1 .884.884L2.134 5h10.991c.345 0 .625.28.625.625"
                ></path>
              </svg>
            </span>
            {title}
          </button>
        ) : (
          <div className="px-3 pb-2">
            <span className="text-label-small-semibold text-text-faint tracking-wide">
              {title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="p-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search options..."
            className="border-border-subtle focus:ring-action-default text-body-small-regular w-full rounded border px-2 py-1.5 focus:ring-2 focus:outline-none"
          />
        </div>

        <div className="max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 hover:bg-neutral-50"
            >
              <Checkbox
                checked={selected.has(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              <span className="text-body-small-regular">{option}</span>
            </label>
          ))}
          {filteredOptions.length === 0 && (
            <div className="text-text-faint py-4 text-center">
              No options found
            </div>
          )}
        </div>

        {selected.size > 0 && (
          <div className="border-border-soft border-t p-3">
            <div className="text-label-small-semibold text-text-faint mb-2">
              {selected.size} selected
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="xs"
                onClick={handleClear}
                className="flex-1"
              >
                Clear
              </Button>
              <Button size="xs" onClick={handleApply} className="flex-1">
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
