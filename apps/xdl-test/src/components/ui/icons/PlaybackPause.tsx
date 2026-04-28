interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackPause({
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
        d="M28 12H16C14.8955 12 14 12.8955 14 14V50C14 51.1045 14.8955 52 16 52H28C29.1045 52 30 51.1045 30 50V14C30 12.8955 29.1045 12 28 12ZM26 48H18V16H26V48ZM48 12H36C34.8955 12 34 12.8955 34 14V50C34 51.1045 34.8955 52 36 52H48C49.1045 52 50 51.1045 50 50V14C50 12.8955 49.1045 12 48 12ZM46 48H38V16H46V48Z"
      />
    </svg>
  );
}
