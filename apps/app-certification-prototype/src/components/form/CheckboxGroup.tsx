"use client";

import { useId } from "react";

export type CheckOption = {
  value: string;
  label: string;
};

const rowClass =
  "relative flex min-h-10 w-full cursor-pointer items-center gap-2.5 border border-[#a6a9b0] bg-white px-2.5 py-1.5 hover:z-[1] hover:bg-[#f7f8f9] focus-within:z-[2] focus-within:border-[#0078c8] focus-within:shadow-[0_0_0_2px_rgba(0,120,200,0.2)]";

const cellClass =
  "flex min-h-10 w-full cursor-pointer items-center gap-2.5 rounded-[3px] border border-[#a6a9b0] bg-white px-2.5 py-1.5 hover:bg-[#f7f8f9] focus-within:border-[#0078c8] focus-within:shadow-[0_0_0_2px_rgba(0,120,200,0.2)]";

export default function CheckboxGroup({
  values,
  onChange,
  options,
  columns = 1,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  options: CheckOption[];
  columns?: 1 | 2 | 3;
}) {
  const uid = useId();

  const toggle = (v: string) => {
    if (values.includes(v)) onChange(values.filter((x) => x !== v));
    else onChange([...values, v]);
  };

  if (columns !== 1) {
    const colClass =
      columns === 3
        ? "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
        : "grid grid-cols-1 gap-2 sm:grid-cols-2";

    return (
      <div className={colClass}>
        {options.map((opt) => {
          const id = `${uid}-${opt.value}`;
          return (
            <label key={opt.value} htmlFor={id} className={cellClass}>
              <input
                id={id}
                type="checkbox"
                checked={values.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="xui-checkbox"
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
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="xui-checkbox"
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
