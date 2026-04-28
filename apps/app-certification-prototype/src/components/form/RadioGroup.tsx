"use client";

import { useId } from "react";

export type RadioOption = {
  value: string;
  label: string;
};

const rowClass =
  "relative flex h-10 w-full cursor-pointer items-center gap-2.5 border border-[#a6a9b0] bg-white px-2.5 hover:z-[1] hover:bg-[#f7f8f9] focus-within:z-[2] focus-within:border-[#0078c8] focus-within:shadow-[0_0_0_2px_rgba(0,120,200,0.2)]";

const radioClass =
  "h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-[#a6a9b0] bg-white checked:border-[6px] checked:border-[#0078c8] checked:bg-white";

export default function RadioGroup({
  name,
  value,
  onChange,
  options,
  inline = false,
}: {
  name: string;
  value: string | null;
  onChange: (value: string) => void;
  options: RadioOption[];
  /** Horizontal radios — default is XUI stacked bordered list (dev-onboarding). */
  inline?: boolean;
}) {
  const uid = useId();

  if (inline) {
    return (
      <div className="flex flex-row flex-wrap gap-6">
        {options.map((opt) => {
          const id = `${uid}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2.5 text-[15px] leading-6 text-[#000a1e]"
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className={radioClass}
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      {options.map((opt, i) => {
        const id = `${uid}-${opt.value}`;
        const isFirst = i === 0;
        const isLast = i === options.length - 1;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={[
              rowClass,
              !isLast ? "-mb-px" : "",
              isFirst ? "rounded-t-[3px]" : "",
              isLast ? "rounded-b-[3px]" : "",
            ].join(" ")}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={radioClass}
            />
            <span className="flex-1 cursor-pointer text-[15px] leading-6 text-[#000a1e]">
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
