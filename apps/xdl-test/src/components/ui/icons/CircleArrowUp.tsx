interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleArrowUp({
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
        d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8ZM34 51.899V26.8283L42.5858 35.4141C43.3668 36.1951 44.6331 36.1951 45.4142 35.4141C46.1952 34.633 46.1954 33.3665 45.4143 32.5854L33.4142 20.5858C32.6331 19.8047 31.3669 19.8047 30.5858 20.5858L18.5857 32.5854C17.8046 33.3665 17.8046 34.6328 18.5856 35.4139C19.3667 36.1949 20.6332 36.1951 21.4142 35.4141L30 26.8283V51.899C19.8937 50.8953 12 42.3705 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 42.3705 44.1063 50.8953 34 51.899Z"
      ></path>
    </svg>
  );
}
