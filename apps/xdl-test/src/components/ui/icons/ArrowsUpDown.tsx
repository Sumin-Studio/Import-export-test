interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowsUpDown({
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
        d="M31.4145 25.4139C30.6335 26.195 29.3669 26.1951 28.5859 25.4141L20.0001 16.8283V52C20.0001 53.1046 19.1047 54 18.0001 54C16.8956 54 16.0001 53.1046 16.0001 52V16.8283L7.41436 25.4141C6.63329 26.1951 5.367 26.1951 4.58593 25.4141C3.80492 24.633 3.80474 23.3665 4.58581 22.5854L16.5859 10.5858C17.367 9.80475 18.6332 9.80475 19.4143 10.5858L31.4145 22.5854C32.1955 23.3665 32.1955 24.6329 31.4145 25.4139ZM59.4143 38.5861C58.6332 37.805 57.3668 37.8049 56.5857 38.5859L48 47.1717V12C48 10.8954 47.1045 10 46 10C44.8954 10 44 10.8954 44 12V47.1717L35.4142 38.5859C34.6332 37.8048 33.3668 37.8048 32.5857 38.5859C31.8047 39.3669 31.8046 40.6334 32.5856 41.4145L44.5858 53.4142C45.3668 54.1953 46.6331 54.1953 47.4142 53.4142L59.4143 41.4146C60.1954 40.6335 60.1954 39.3671 59.4143 38.5861Z"
      ></path>
    </svg>
  );
}
