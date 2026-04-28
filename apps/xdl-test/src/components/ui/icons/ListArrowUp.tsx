interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ListArrowUp({
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
        d="M30 48C30 49.1046 29.1046 50 28 50H8C6.89545 50 6 49.1046 6 48C6 46.8954 6.89545 46 8 46H28C29.1046 46 30 46.8954 30 48ZM28 30H8C6.89545 30 6 30.8954 6 32C6 33.1046 6.89545 34 8 34H28C29.1046 34 30 33.1046 30 32C30 30.8954 29.1046 30 28 30ZM28 14H8C6.89545 14 6 14.8954 6 16C6 17.1046 6.89545 18 8 18H28C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14ZM59.4143 22.5854L47.4142 10.5858C46.6331 9.80475 45.3668 9.80475 44.5858 10.5858L32.5856 22.5854C31.8046 23.3665 31.8046 24.6329 32.5856 25.4139C33.3667 26.195 34.6332 26.1951 35.4142 25.4141L44 16.8283V52C44 53.1046 44.8954 54 46 54C47.1046 54 48 53.1046 48 52V16.8283L56.5858 25.4141C57.3668 26.1951 58.6331 26.1951 59.4142 25.4141C60.1953 24.633 60.1954 23.3665 59.4143 22.5854Z"
      ></path>
    </svg>
  );
}
