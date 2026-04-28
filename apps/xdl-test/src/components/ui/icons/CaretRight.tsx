interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CaretRight({
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
        d="M41.4141 33.4141L27.4141 47.4141C26.1662 48.6619 24 47.794 24 46V18C24 16.2282 26.1498 15.3238 27.4141 16.5859L41.4141 30.5859C42.1953 31.3672 42.1953 32.6328 41.4141 33.4141Z"
      ></path>
    </svg>
  );
}
