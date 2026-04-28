interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowLeftLine({
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
        d="M56 32C56 33.1045 55.1046 34 54 34H22.8282L35.4141 46.5857C36.1951 47.3668 36.1951 48.6332 35.4141 49.4142C34.633 50.1952 33.3665 50.1954 32.5854 49.4143L16.5857 33.4142C15.8047 32.6331 15.8047 31.3668 16.5857 30.5858L32.5854 14.5856C33.3665 13.8046 34.6328 13.8046 35.4139 14.5856C36.1949 15.3667 36.1951 16.6332 35.4141 17.4142L22.8282 30H54C55.1046 30 56 30.8954 56 32ZM10 14C8.89551 14 8 14.8955 8 16V48C8 49.1045 8.89551 50 10 50C11.1045 50 12 49.1045 12 48V16C12 14.8955 11.1045 14 10 14Z"
      ></path>
    </svg>
  );
}
