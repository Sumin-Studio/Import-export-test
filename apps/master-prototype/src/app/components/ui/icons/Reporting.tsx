import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Reporting({
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
        <path d="M17.617 4.727V1.21h-3.515" />
        <path d="M17.617 1.211l-3.945 3.945a1.753 1.753 0 01-1.75.438L7.461 4.406a1.751 1.751 0 00-1.695.453L1.211 9.414m0 9.375h17.578M5.313 13.711H2.969a.59.59 0 00-.586.586v4.492h3.515v-4.492a.593.593 0 00-.585-.586zm5.859-5.078H8.828a.59.59 0 00-.586.586v9.57h3.516v-9.57a.594.594 0 00-.586-.586zm5.859 2.734h-2.343a.595.595 0 00-.586.586v6.836h3.515v-6.836a.592.592 0 00-.586-.586z" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h20v20H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
