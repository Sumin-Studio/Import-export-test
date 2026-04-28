import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

export default function Hamburger({ className }: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="14"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="fill-current" height="1.6" rx="0.8" width="24" y="0.2" />
      <rect className="fill-current" height="1.6" rx="0.8" width="24" y="6.2" />
      <rect
        className="fill-current"
        height="1.6"
        rx="0.8"
        width="24"
        y="12.2"
      />
    </svg>
  );
}
