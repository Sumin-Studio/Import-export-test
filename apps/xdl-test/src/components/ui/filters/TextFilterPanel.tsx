import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextFilter } from "./types";

interface TextFilterPanelProps {
  value: TextFilter | null;
  onApply: (filter: TextFilter | null) => void;
  onBack: () => void;
  showBack?: boolean;
  title?: string;
}

export function TextFilterPanel({
  value,
  onApply,
  onBack,
  showBack = true,
  title = "Text Filter",
}: TextFilterPanelProps) {
  const [text, setText] = useState(value?.value ?? "");

  const handleApply = () => {
    if (text.trim()) {
      onApply({ type: "text", value: text.trim() });
    } else {
      onApply(null);
    }
  };

  const handleClear = () => {
    setText("");
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

      <div className="flex flex-col gap-3 p-3">
        <div>
          <label className="text-label-small-semibold text-text-faint mb-1.5 block">
            Contains
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="border-border-subtle focus:ring-action-default text-body-small-regular w-full rounded border px-2 py-1.5 focus:ring-2 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApply();
              }
            }}
          />
        </div>

        {text.trim() && (
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
        )}
      </div>
    </>
  );
}
