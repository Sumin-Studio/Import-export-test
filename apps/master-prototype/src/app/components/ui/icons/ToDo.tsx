import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function ToDo({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      className={className}
    >
      <path
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M12.033 5.963 8.101 9.895a.577.577 0 0 1-.814 0L5.97 8.579"
      ></path>
      <path
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="m16.292 12.79-3.51 3.51a2.1 2.1 0 0 1-1.492.618H3.2a2.11 2.11 0 0 1-2.11-2.11v-11.6a2.11 2.11 0 0 1 2.11-2.11h11.6a2.11 2.11 0 0 1 2.11 2.11V11.3a2.1 2.1 0 0 1-.618 1.49"
      ></path>
      <path
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M11.637 16.89v-3.136a2.11 2.11 0 0 1 2.11-2.11h3.134"
      ></path>
    </svg>
  );
}
