interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleChevronRight({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM39.4143 30.5858C40.1953 31.3668 40.1953 32.6331 39.4143 33.4142L29.4146 43.4143C28.6335 44.1954 27.3672 44.1954 26.5862 43.4144C25.8052 42.6333 25.8049 41.3668 26.5859 40.5858L35.1716 32L26.5859 23.4142C25.8049 22.6332 25.8049 21.3668 26.5859 20.5858C27.3669 19.8047 28.6335 19.8046 29.4146 20.5856L39.4143 30.5858Z"
      ></path>
    </svg>
  );
}
