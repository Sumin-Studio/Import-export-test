interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChartBar({
  className,
  fill = "fill-current",
  size = 64,
  width,
  height,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      fill="none"
      viewBox="0 0 64 64"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M56 52H52V24C52 22.8954 51.1046 22 50 22H40V10C40 8.89545 39.1046 8 38 8H26C24.8954 8 24 8.89545 24 10V34H14C12.8954 34 12 34.8954 12 36V52H8C6.89551 52 6 52.8954 6 54C6 55.1046 6.89551 56 8 56H56C57.1045 56 58 55.1046 58 54C58 52.8954 57.1045 52 56 52ZM16 52V38H24V52H16ZM28 52V12H36V52H28ZM40 52V26H48V52H40Z"
      ></path>
    </svg>
  );
}
