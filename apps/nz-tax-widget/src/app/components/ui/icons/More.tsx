import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function More({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="17"
      role="presentation"
      viewBox="0 0 4 17"
      width="4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse className={fill} cx="2.249" cy="1.456" rx="1.456" ry="1.456" />
      <ellipse className={fill} cx="2.249" cy="8.248" rx="1.456" ry="1.456" />
      <ellipse className={fill} cx="2.249" cy="15.044" rx="1.456" ry="1.456" />
    </svg>
  );
}
