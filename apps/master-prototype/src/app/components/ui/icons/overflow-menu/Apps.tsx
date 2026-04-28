import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function OverflowApps({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="17"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={fill} cx="15.043" cy="1.456" r="1.456" />
      <circle className={fill} cx="8.25" cy="1.456" r="1.456" />
      <circle className={fill} cx="1.456" cy="1.456" r="1.456" />
      <circle className={fill} cx="1.456" cy="8.248" r="1.456" />
      <circle className={fill} cx="8.25" cy="8.248" r="1.456" />
      <circle className={fill} cx="15.043" cy="8.248" r="1.456" />
      <circle className={fill} cx="15.043" cy="15.044" r="1.456" />
      <circle className={fill} cx="8.25" cy="15.044" r="1.456" />
      <circle className={fill} cx="1.456" cy="15.044" r="1.456" />
    </svg>
  );
}
