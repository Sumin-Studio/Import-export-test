import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Subscriptions({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${stroke} ${className}`}
    >
      <path
        d="M2.05467 1H15.7653C15.7653 1 16.82 1 16.82 2.05467V11.5467C16.82 11.5467 16.82 12.6013 15.7653 12.6013H2.05467C2.05467 12.6013 1 12.6013 1 11.5467V2.05467C1 2.05467 1 1 2.05467 1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1 4.16406H16.82" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.16394 7.32812H9.96461"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16394 9.4375H7.85527"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
