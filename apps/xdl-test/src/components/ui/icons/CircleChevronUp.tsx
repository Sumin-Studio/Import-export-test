interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleChevronUp({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM43.4143 34.5854C44.1954 35.3665 44.1954 36.6329 43.4143 37.4139C42.6333 38.195 41.3668 38.1951 40.5857 37.4141L32 28.8283L23.4143 37.4141C22.6332 38.1951 21.3668 38.1951 20.5858 37.4141C19.8047 36.633 19.8046 35.3665 20.5857 34.5854L30.5858 24.5858C31.3669 23.8047 32.6331 23.8047 33.4142 24.5858L43.4143 34.5854Z"
      ></path>
    </svg>
  );
}
