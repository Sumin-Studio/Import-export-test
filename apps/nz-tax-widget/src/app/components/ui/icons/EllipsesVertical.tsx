import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function EllipsesVertical({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="13"
      role="presentation"
      width="3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        fillRule="evenodd"
        d="M1.5 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M3 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
