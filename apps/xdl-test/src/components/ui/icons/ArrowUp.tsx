interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowUp({
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
        d="M49.4143 29.4139C48.6333 30.195 47.3667 30.1951 46.5857 29.4141L33.9999 16.8283V52C33.9999 53.1046 33.1045 54 31.9999 54C30.8954 54 29.9999 53.1046 29.9999 52V16.8283L17.4141 29.4141C16.6331 30.1951 15.3667 30.1951 14.5857 29.4141C13.8047 28.633 13.8045 27.3665 14.5856 26.5854L30.5857 10.5858C31.3668 9.80475 32.633 9.80475 33.4141 10.5858L49.4143 26.5854C50.1954 27.3665 50.1954 28.6329 49.4143 29.4139Z"
      ></path>
    </svg>
  );
}
