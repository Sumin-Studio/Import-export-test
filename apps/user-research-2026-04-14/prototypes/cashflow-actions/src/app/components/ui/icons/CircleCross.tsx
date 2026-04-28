import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function CircleCross({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      role="presentation"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 10a8 8 0 0 0 4.939 7.391 7.995 7.995 0 0 0 8.718-1.734 8.003 8.003 0 0 0 0-11.314 8.003 8.003 0 0 0-11.314 0A8 8 0 0 0 2 10m5.144-2.857 5.714 5.714m0-5.714-5.714 5.714"
      ></path>
    </svg>
  );
}
