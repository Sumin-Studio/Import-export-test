interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Government({
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
        d="M54 36H46V24C46 16.9489 40.782 11.1319 34 10.1591V8H36C37.1045 8 38 7.10455 38 6C38 4.89539 37.1045 4 36 4H32C30.8955 4 30 4.89539 30 6V10.1591C23.218 11.1319 18 16.9489 18 24V36H10C8.89551 36 8 36.8954 8 38V54C8 55.1046 8.89551 56 10 56H26C27.1045 56 28 55.1046 28 54V44C28 41.7908 29.7908 40 32 40C34.2092 40 36 41.7908 36 43.9999V54C36 55.1046 36.8955 56 38 56H54C55.1045 56 56 55.1046 56 54V38C56 36.8954 55.1045 36 54 36ZM52 39.9999V43.9999H40V39.9999H52ZM24 39.9999V43.9999H12V39.9999H24ZM12 51.9999V47.9999H24V51.9999H12ZM26 36H22V28H26V36ZM34 36H30V28H34V36ZM22 24C22 18.4771 26.4772 14 32 14C37.5228 14 42 18.4771 42 24H22ZM38 28H42V36H38V28ZM40 51.9999V47.9999H52V51.9999H40Z"
      ></path>
    </svg>
  );
}
