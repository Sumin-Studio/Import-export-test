import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Help({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="18"
      role="presentation"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5a4 4 0 017.67-1.59c.292.674.393 1.414.292 2.14a4 4 0 01-2.628 3.222A2.001 2.001 0 005 10.658V12"
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
      <path
        d="M5.001 17a.5.5 0 010-1m.001 1a.5.5 0 000-1"
        className={stroke}
        strokeWidth="1.3"
      />
    </svg>
  );
}
