import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function OverflowSearch({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        d="M1.513 9.965a6.445 6.445 0 1011.863-5.041A6.445 6.445 0 001.513 9.965zM12.002 12.001L17 17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}
