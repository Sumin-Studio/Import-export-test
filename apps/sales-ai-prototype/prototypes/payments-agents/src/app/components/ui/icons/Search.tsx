import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Search({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="18"
      role="presentation"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        d="M1.513 9.965a6.445 6.445 0 108.343-8.497 6.449 6.449 0 00-8.388 3.565 6.448 6.448 0 00.045 4.932zm10.489 2.036L17 17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}
