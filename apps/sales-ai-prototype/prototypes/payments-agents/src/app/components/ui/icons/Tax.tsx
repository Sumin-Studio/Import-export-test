import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Tax({
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
        d="M17.617 17.617a1.172 1.172 0 01-1.172 1.172H3.555a1.172 1.172 0 01-1.172-1.172V2.383A1.172 1.172 0 013.555 1.21h8.304c.31 0 .608.123.828.343l4.587 4.587c.22.22.343.518.343.829v10.647z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={stroke}
        d="M17.617 7.07H12.93a1.172 1.172 0 01-1.172-1.172V1.211M5.469 9.683a1.734 1.734 0 001.451.683c.89 0 1.612-.541 1.612-1.208 0-.667-.719-1.208-1.609-1.208-.889 0-1.61-.541-1.61-1.209s.721-1.209 1.61-1.209a1.74 1.74 0 011.452.684m-1.451 4.151v.805m0-6.445v.805M10 12.344h4.688m-8.79 3.515h8.79"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
