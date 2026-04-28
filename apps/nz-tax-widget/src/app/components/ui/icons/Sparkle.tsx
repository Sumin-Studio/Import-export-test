import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

/** Small sparkle for JAX primary actions (Agentic Actions sidebar). */
export default function Sparkle({ className }: IconProps): ReactElement {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M7 1.2L8.1 5.3L12.2 6.4L8.1 7.5L7 11.6L5.9 7.5L1.8 6.4L5.9 5.3L7 1.2Z"
        fill="currentColor"
      />
      <path
        d="M11.2 2.2L11.6 3.6L13 4L11.6 4.4L11.2 5.8L10.8 4.4L9.4 4L10.8 3.6L11.2 2.2Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
