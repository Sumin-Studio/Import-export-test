import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
  size?: number | string;
}

export default function ExternalLink({
  className,
  stroke = "stroke-current",
  size = 16,
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6.281 9.577 8.75-8.608m0 4.919V.968h-5M8.078 4.094H1.516a.547.547 0 0 0-.547.547v9.843a.547.547 0 0 0 .547.547h9.843a.547.547 0 0 0 .547-.547V7.922"
      ></path>
    </svg>
  );
}
