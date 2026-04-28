import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

/** Withdraw / send payment (source: withdraw.svg). */
export default function Withdraw({ className }: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="32"
      role="presentation"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6602 13H16.6602V18H14.6602V13H12.6602L15.6602 10L18.6602 13ZM10 18H11.626C12.3609 19.4832 13.8891 20.5 15.6601 20.5C17.4312 20.5 18.9594 19.4832 19.6942 18H21.3203C20.4987 20.3331 18.2785 22 15.6601 22C13.0418 22 10.8215 20.3331 10 18Z"
        fill="currentColor"
      />
    </svg>
  );
}
