interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CaretUp({
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
        d="M46 40H18C16.2219 40 15.3286 37.8432 16.5859 36.5859L30.5859 22.5859C31.3671 21.8047 32.6328 21.8047 33.414 22.5859L47.414 36.5859C48.6713 37.8432 47.778 40 46 40Z"
      ></path>
    </svg>
  );
}
