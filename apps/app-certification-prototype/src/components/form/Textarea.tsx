import type { TextareaHTMLAttributes } from "react";

export default function Textarea({
  invalid,
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      {...rest}
      className={`min-h-[120px] w-full resize-y rounded-[3px] border border-[#a6a9b0] bg-white px-[15px] py-2 text-[15px] leading-normal text-[#000a1e] placeholder:text-content-secondary focus-visible:border-[#0078c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,120,200,0.2)] ${
        invalid
          ? "border-negative focus-visible:border-negative focus-visible:ring-[rgba(208,2,27,0.15)]"
          : ""
      } ${className}`}
    />
  );
}
