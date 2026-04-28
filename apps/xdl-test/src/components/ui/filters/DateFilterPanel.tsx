import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateFilter } from "./types";

interface DateFilterPanelProps {
  value: DateFilter | null;
  onApply: (filter: DateFilter | null) => void;
  onBack: () => void;
  showBack?: boolean;
  title?: string;
}

export function DateFilterPanel({
  value,
  onApply,
  onBack,
  showBack = true,
  title = "Date Range Filter",
}: DateFilterPanelProps) {
  const [from, setFrom] = useState(value?.from ?? "");
  const [to, setTo] = useState(value?.to ?? "");

  const handleApply = () => {
    if (from || to) {
      onApply({
        type: "date",
        from: from || undefined,
        to: to || undefined,
      });
    } else {
      onApply(null);
    }
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
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
        <div className="px-3 pt-3">
          <label className="text-label-small-semibold text-text-faint mb-1.5 block">
            From
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border-border-subtle focus:ring-action-default text-body-small-regular w-full rounded border px-2 py-1.5 focus:ring-2 focus:outline-none"
          />
        </div>

        <div className="p-3">
          <label className="text-label-small-semibold text-text-faint mb-1.5 block">
            To
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border-border-subtle focus:ring-action-default text-body-small-regular w-full rounded border px-2 py-1.5 focus:ring-2 focus:outline-none"
          />
        </div>

        {(from || to) && (
          <div className="border-border-soft flex gap-2 border-t p-3">
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
        )}
      </div>
    </>
  );
}
