import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Plus({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <rect className={fill} height="16" rx="0.8" width="1.6" x="7" />
      <rect className={fill} height="1.6" rx="0.8" width="16" y="7" />
    </svg>
  );
}
