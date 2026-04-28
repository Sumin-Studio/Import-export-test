import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

/** Double-headed diagonal arrow (open / expand affordance), matches Actions widget spec. */
export default function ExpandDiagonal({
  className,
}: IconProps): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5.5 14.5 L14.5 5.5 M14.5 5.5 L11.5 5.5 M14.5 5.5 L14.5 8.5 M5.5 14.5 L5.5 11.5 M5.5 14.5 L8.5 14.5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
