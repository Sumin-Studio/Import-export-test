interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleArrowLeft({
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
        d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C42.3705 12 50.8953 19.8937 51.899 30H26.8283L35.4141 21.4142C36.1951 20.6332 36.1951 19.3669 35.4141 18.5858C34.633 17.8047 33.3665 17.8046 32.5854 18.5857L20.5858 30.5858C19.8047 31.3668 19.8047 32.6331 20.5858 33.4142L32.5854 45.4143C33.3665 46.1954 34.6329 46.1954 35.4139 45.4143C36.195 44.6332 36.1951 43.3668 35.4141 42.5858L26.8283 34H51.899C50.8953 44.1063 42.3705 52 32 52Z"
      ></path>
    </svg>
  );
}
