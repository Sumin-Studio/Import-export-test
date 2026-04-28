import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function OverflowNotifications({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        d="M6.601 17.801A1.663 1.663 0 008.203 19a1.671 1.671 0 001.602-1.199M8.2 2.8V1m0 1.8a6 6 0 016.001 6c0 5.637 1.2 6.601 1.2 6.601H1S2.2 13.868 2.2 8.8c0-1.591.632-3.117 1.757-4.243A6.003 6.003 0 018.2 2.8z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}
