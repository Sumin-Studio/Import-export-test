interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CaretDown({
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
        d="M47.4141 27.4141L33.4141 41.4141C32.6328 42.1953 31.3672 42.1953 30.5859 41.4141L16.5859 27.4141C15.3286 26.1568 16.2219 24 18 24H46C47.778 24 48.6713 26.1568 47.4141 27.4141Z"
      ></path>
    </svg>
  );
}
