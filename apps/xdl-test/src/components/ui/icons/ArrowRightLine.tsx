interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowRightLine({
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
        d="M47.4143 30.5858C48.1953 31.3668 48.1953 32.6331 47.4143 33.4142L31.4146 49.4143C30.6335 50.1954 29.3672 50.1954 28.5861 49.4144C27.8051 48.6333 27.8049 47.3668 28.5859 46.5857L41.1718 34H10C8.89545 34 8 33.1045 8 32C8 30.8954 8.89545 30 10 30H41.1718L28.5859 17.4142C27.8049 16.6332 27.8049 15.3668 28.5859 14.5857C29.367 13.8047 30.6335 13.8046 31.4146 14.5856L47.4143 30.5858ZM54 14C52.8955 14 52 14.8955 52 16V48C52 49.1045 52.8955 50 54 50C55.1045 50 56 49.1045 56 48V16C56 14.8955 55.1045 14 54 14Z"
      ></path>
    </svg>
  );
}
