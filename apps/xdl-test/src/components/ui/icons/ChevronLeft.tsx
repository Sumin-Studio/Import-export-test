interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChevronLeft({
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
        d="M39.4141 44.5858C40.1951 45.3668 40.1951 46.6332 39.4141 47.4143C38.6331 48.1953 37.3665 48.1954 36.5855 47.4144L22.5858 33.4142C21.8047 32.6331 21.8047 31.3668 22.5858 30.5858L36.5855 16.5856C37.3665 15.8046 38.6329 15.8045 39.4139 16.5856C40.1949 17.3667 40.1951 18.6331 39.4141 19.4142L26.8283 32L39.4141 44.5858Z"
      ></path>
    </svg>
  );
}
