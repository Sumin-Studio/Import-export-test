import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Apps({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="17"
      role="presentation"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        d="M15.043 2.912a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm-6.794 0a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm-6.793 0a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm0 6.792a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm6.793 0a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm6.794 0a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm0 6.797a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm-6.794 0a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912zm-6.793 0a1.456 1.456 0 100-2.912 1.456 1.456 0 000 2.912z"
      />
    </svg>
  );
}
