import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function ChevronMobile({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="10"
      width="6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={stroke} d="m1 9 3.293-3.293a1 1 0 0 0 0-1.414L1 1" />
    </svg>
  );
}
