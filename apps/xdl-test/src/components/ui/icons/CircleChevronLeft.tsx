interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleChevronDown({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM37.4141 23.4142L28.8284 32L37.4141 40.5858C38.1951 41.3668 38.1951 42.6331 37.4141 43.4142C36.6329 44.1953 35.3665 44.1954 34.5854 43.4143L24.5857 33.4142C23.8047 32.6331 23.8047 31.3668 24.5857 30.5858L34.5854 20.5856C35.3665 19.8046 36.6328 19.8046 37.4139 20.5856C38.1949 21.3667 38.1951 22.6332 37.4141 23.4142Z"
      ></path>
    </svg>
  );
}
