import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function OverflowSetup({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      >
        <path d="M12.032 5.962L8.1 9.894a.577.577 0 01-.814 0L5.968 8.578" />
        <path d="M16.292 12.79l-3.51 3.51a2.108 2.108 0 01-1.492.618H3.2a2.11 2.11 0 01-2.11-2.11V3.208a2.11 2.11 0 012.11-2.11h11.6a2.11 2.11 0 012.11 2.11v8.092a2.11 2.11 0 01-.618 1.49z" />
        <path d="M11.637 16.89v-3.136a2.11 2.11 0 012.11-2.11h3.134" />
      </g>
    </svg>
  );
}
