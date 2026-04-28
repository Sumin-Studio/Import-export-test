import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function OverflowHelp({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="18"
      viewBox="0 0 10 18"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        d="M1 5a4 4 0 115.334 3.772A2 2 0 005 10.658V12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
      <path
        className={stroke}
        d="M5.001 17a.5.5 0 010-1M5.002 17a.5.5 0 000-1"
        strokeWidth="1.3"
      />
    </svg>
  );
}
