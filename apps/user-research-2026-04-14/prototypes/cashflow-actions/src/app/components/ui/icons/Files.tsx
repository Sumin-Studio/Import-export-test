import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Files({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="14"
      role="presentation"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        d="M13.188 5.688V3.813a.938.938 0 00-.938-.938H5.687v-.938A.937.937 0 004.75 1H1.937A.937.937 0 001 1.938v10.187a1.062 1.062 0 002.085.274l1.47-6.036a.937.937 0 01.9-.676h8.67a.937.937 0 01.906 1.18l-1.375 5.624a.937.937 0 01-.906.697H2.06"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
