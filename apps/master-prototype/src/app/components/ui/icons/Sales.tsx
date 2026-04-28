import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Sales({
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
      <g
        className={stroke}
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.374 10a8.626 8.626 0 1017.252 0 8.626 8.626 0 00-17.252 0z" />
        <path d="M7.889 12.521a2.512 2.512 0 002.111.994c1.294 0 2.342-.787 2.342-1.758s-1.048-1.75-2.342-1.75-2.344-.787-2.344-1.76c0-.972 1.045-1.757 2.344-1.757a2.53 2.53 0 012.11.994M10 13.515v1.171m0-9.372v1.17" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h20v20H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
