interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function BookmarkSolid({
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
        d="M50 10V53.9963C50 55.6606 48.0858 56.5967 46.7721 55.575L32 44.0856L17.2279 55.575C15.9142 56.5967 14 55.6606 14 53.9963V10C14 8.89539 14.8955 8 16 8H48C49.1045 8 50 8.89539 50 10Z"
      ></path>
    </svg>
  );
}
