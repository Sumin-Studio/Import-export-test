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
        d="M47.4143 39.4139C46.6332 40.195 45.3668 40.1952 44.5857 39.4141L31.9999 26.8283L19.4141 39.4141C18.633 40.1952 17.3667 40.1952 16.5857 39.4141C15.8046 38.6331 15.8045 37.3665 16.5856 36.5855L30.5857 22.5858C31.3668 21.8047 32.633 21.8047 33.4141 22.5858L47.4143 36.5855C48.1954 37.3665 48.1954 38.6329 47.4143 39.4139Z"
      ></path>
    </svg>
  );
}
