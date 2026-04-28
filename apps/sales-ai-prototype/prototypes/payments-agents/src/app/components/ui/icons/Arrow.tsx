import type { ReactElement } from "react";
interface IconProps {
  className?: string;
  fill?: string;
}

export default function Arrow({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="13"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        clipRule="evenodd"
        d="M10 7.5l-4 4L7.5 13 14 6.5 7.5 0 6 1.5l4 4H0v2h10z"
        fillRule="evenodd"
      />
    </svg>
  );
}
