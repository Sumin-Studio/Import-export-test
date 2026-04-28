import type { ReactNode } from "react";

export default function Field({
  label,
  htmlFor,
  helper,
  error,
  optional,
  children,
  right,
}: {
  label: string;
  htmlFor?: string;
  helper?: ReactNode;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="min-w-0 flex-1 break-words text-[13px] font-bold leading-5 text-[#404756]"
        >
          {label}
          {optional && (
            <span className="ml-1 font-normal text-[rgba(0,10,30,0.75)]">
              (optional)
            </span>
          )}
        </label>
        {right}
      </div>
      {children}
      {helper && !error && (
        <div className="text-[11px] leading-4 text-[rgba(0,10,30,0.75)]">
          {helper}
        </div>
      )}
      {error && (
        <div className="text-[11px] leading-4 text-negative">{error}</div>
      )}
    </div>
  );
}
