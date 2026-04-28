interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ListArrowDown({
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
        d="M30 32C30 33.1046 29.1046 34 28 34H8C6.89545 34 6 33.1046 6 32C6 30.8954 6.89545 30 8 30H28C29.1046 30 30 30.8954 30 32ZM28 46H8C6.89545 46 6 46.8954 6 48C6 49.1046 6.89545 50 8 50H28C29.1046 50 30 49.1046 30 48C30 46.8954 29.1046 46 28 46ZM28 14H8C6.89545 14 6 14.8954 6 16C6 17.1046 6.89545 18 8 18H28C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14ZM59.4143 38.5861C58.6333 37.805 57.3668 37.8049 56.5858 38.5859L48 47.1717V12C48 10.8954 47.1046 10 46 10C44.8954 10 44 10.8954 44 12V47.1717L35.4142 38.5859C34.6332 37.8048 33.3668 37.8048 32.5858 38.5859C31.8047 39.3669 31.8046 40.6334 32.5856 41.4145L44.5858 53.4142C45.3668 54.1953 46.6331 54.1953 47.4142 53.4142L59.4143 41.4146C60.1954 40.6335 60.1954 39.3671 59.4143 38.5861Z"
      ></path>
    </svg>
  );
}
