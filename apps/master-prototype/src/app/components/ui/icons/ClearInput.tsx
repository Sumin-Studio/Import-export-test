import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function ClearInput({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 10a8.003 8.003 0 004.939 7.391 7.995 7.995 0 008.718-1.734 8.003 8.003 0 000-11.314 8.003 8.003 0 00-11.314 0A7.997 7.997 0 002 10zm5.144-2.857l5.714 5.714m0-5.714l-5.714 5.714"
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
