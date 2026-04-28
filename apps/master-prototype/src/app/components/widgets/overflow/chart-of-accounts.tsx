"use-client";
import { Checkbox, Field, Label } from "@headlessui/react";

interface ComponentProps {
  className?: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

export default function ChartOfAccountsOverflow({
  className = "",
  enabled,
  setEnabled,
}: ComponentProps) {
  return (
    <div className={className}>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Edit accounts watchlist
        </button>
        <button
          className="flex w-full items-center px-5 py-2 text-left hover:bg-background-primary"
          type="button"
        >
          Edit budgets
        </button>
      </nav>
      <nav className="mb-[11px] border-b border-border-primary pb-3 text-[15px]/[24px]">
        <Field className="flex w-full cursor-pointer items-center gap-2 px-5 py-2 text-left hover:bg-background-primary">
          <Checkbox
            checked={enabled}
            className="group flex size-6 items-center justify-center rounded border border-border-primary bg-white data-[checked]:border-brand-primary data-[checked]:bg-brand-primary"
            onChange={setEnabled}
          >
            <svg
              className="opacity-0 group-data-[checked]:opacity-100"
              fill="none"
              height="11"
              viewBox="0 0 14 11"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="stroke-white"
                d="M1 4.744l4.128 4.128L13 1"
                strokeWidth="2"
              />
            </svg>
          </Checkbox>
          <Label className="cursor-pointer">Show budgets</Label>
        </Field>
      </nav>
      <p className="px-5 py-1 text-[13px]/[20px] text-[#404756]">
        This widget uses the accounting basis set in this organisation&apos;s
        reporting preferences
      </p>
    </div>
  );
}
