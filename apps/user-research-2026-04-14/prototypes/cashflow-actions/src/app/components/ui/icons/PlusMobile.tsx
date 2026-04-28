import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function PlusMobile({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      className={className}
    >
      <rect width="1.2" height="12" x="5.25" className={fill} rx="0.6"></rect>
      <rect width="12" height="1.2" y="5.25" className={fill} rx="0.6"></rect>
    </svg>
  );
}
