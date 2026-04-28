import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Bell({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      role="presentation"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.6 17.801a1.67 1.67 0 003.204 0M8.2 2.8V1m0 1.8a6 6 0 016.001 6c0 5.637 1.2 6.601 1.2 6.601H1S2.2 13.868 2.2 8.8c0-1.591.632-3.117 1.757-4.243A6.003 6.003 0 018.2 2.8z"
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}
