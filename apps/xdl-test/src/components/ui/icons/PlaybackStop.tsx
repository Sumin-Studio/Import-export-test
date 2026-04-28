interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackStop({
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
        d="M50 12H14C12.8955 12 12 12.8955 12 14V50C12 51.1045 12.8955 52 14 52H50C51.1045 52 52 51.1045 52 50V14C52 12.8955 51.1045 12 50 12ZM48 48H16V16H48V48Z"
      />
    </svg>
  );
}
