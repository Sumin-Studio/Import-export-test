import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Filter({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="12"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        fillRule="evenodd"
        d="M10 2.5v-2H0v2l4 5v4h2v-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
