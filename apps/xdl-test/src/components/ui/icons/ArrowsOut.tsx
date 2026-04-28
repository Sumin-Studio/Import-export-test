interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowsOut({
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
        d="M56 10V24C56 25.1045 55.1045 26 54 26C52.8955 26 52 25.1045 52 24V14.8281L37.4141 29.4141C36.6338 30.1953 35.3662 30.1953 34.5859 29.4141C33.8047 28.6328 33.8047 27.3672 34.5859 26.5859L49.1719 12H40C38.8955 12 38 11.1045 38 10C38 8.89551 38.8955 8 40 8H54C55.1046 8 56 8.89539 56 10ZM26.5859 34.5859L12 49.1719V40C12 38.8955 11.1045 38 10 38C8.89551 38 8 38.8955 8 40V54C8 55.1046 8.89545 56 10 56H24C25.1045 56 26 55.1045 26 54C26 52.8955 25.1045 52 24 52H14.8281L29.4141 37.4141C30.1953 36.6328 30.1953 35.3672 29.4141 34.5859C28.6338 33.8047 27.3662 33.8047 26.5859 34.5859Z"
      ></path>
    </svg>
  );
}
