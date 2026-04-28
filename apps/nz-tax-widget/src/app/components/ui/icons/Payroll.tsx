import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Payroll({
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
        <path d="M15.274 11.758h-1.59a1.045 1.045 0 00-1.028.849c-.046.239-.008.487.108.701.117.213.304.38.53.471l1.612.644a1.048 1.048 0 01-.391 2.022H12.93m1.172-4.687v-.586m0 5.859v-.586" />
        <path d="M9.414 14.102a4.687 4.687 0 109.374 0 4.687 4.687 0 00-9.374 0zm-.366-5.264a4.73 4.73 0 00-3.15-1.182 4.687 4.687 0 00-4.687 4.102m2.051-7.91a2.637 2.637 0 105.274 0 2.637 2.637 0 00-5.274 0zm8.203-.586a2.05 2.05 0 104.1 0 2.05 2.05 0 00-4.1 0zm5.098 4.394a3.523 3.523 0 00-2.703-1.74 3.512 3.512 0 00-2.988 1.186" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h20v20H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
