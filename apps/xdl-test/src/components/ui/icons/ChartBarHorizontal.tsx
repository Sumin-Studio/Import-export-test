interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChartBarHorizontal({
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
        d="M54 24H30V14C30 12.8954 29.1046 12 28 12H12V8C12 6.89539 11.1045 6 10 6C8.89551 6 8 6.89539 8 8V56C8 57.1046 8.89551 58 10 58C11.1045 58 12 57.1046 12 56V52H40C41.1046 52 42 51.1046 42 50V40H54C55.1046 40 56 39.1046 56 38V26C56 24.8954 55.1046 24 54 24ZM12 16H26V24H12V16ZM38 48H12V40H38V48ZM52 36H12V28H52V36Z"
      ></path>
    </svg>
  );
}
