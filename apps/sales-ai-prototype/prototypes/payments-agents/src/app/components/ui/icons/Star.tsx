import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Star({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="15"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        d="M8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236L8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0z"
      />
    </svg>
  );
}
