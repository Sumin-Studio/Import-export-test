import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Purchases({
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
        d="M17.031 18.789V2.383a1.172 1.172 0 00-1.172-1.172H4.141a1.172 1.172 0 00-1.172 1.172v16.406l2.344-2.344 2.343 2.344L10 16.445l2.344 2.344 2.344-2.344 2.343 2.344zM5.313 5.313H10M5.313 8.828H10m-4.687 3.516H10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={stroke}
        d="M14.395 8.828a.293.293 0 110-.586m0 .586a.293.293 0 000-.586m0 4.102a.293.293 0 110-.586m0 .586a.293.293 0 000-.586m0-6.445a.293.293 0 010-.586m0 .586a.293.293 0 000-.586"
      />
    </svg>
  );
}
