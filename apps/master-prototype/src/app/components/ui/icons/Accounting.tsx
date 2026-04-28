import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Accounting({
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
        d="M18.203 17.617a1.172 1.172 0 01-1.172 1.172H2.969a1.172 1.172 0 01-1.172-1.172V2.383a1.172 1.172 0 011.172-1.172h11.719c.305 0 .599.119.818.333l2.343 2.252a1.176 1.176 0 01.354.839v12.982zM4.727 15.273h1.757m2.344 0h1.758M4.727 12.93h1.757m-1.757-2.344h1.757M4.727 8.242h1.757m2.344 4.688h1.758m2.344 2.343h1.758M12.93 12.93h1.758m-1.758-2.344h1.758"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
