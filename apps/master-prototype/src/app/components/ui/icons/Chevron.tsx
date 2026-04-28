import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Chevron({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="9"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        clipRule="evenodd"
        d="M6.324 5.2L2.08.957.667 2.371 4.91 6.614l1.414 1.414 1.414-1.414 4.243-4.243L10.566.957 6.324 5.2z"
        fillRule="evenodd"
      />
    </svg>
  );
}
