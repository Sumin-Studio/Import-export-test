interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Bookmark({
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
        d="M48 8H16C14.8955 8 14 8.89539 14 10V53.9963C14 55.6606 15.9142 56.5967 17.2279 55.575L32 44.0856L46.7721 55.575C48.0858 56.5967 50 55.6606 50 53.9963V10C50 8.89539 49.1045 8 48 8ZM46 49.907L32 39.0181L18 49.907V12H46V49.907Z"
      ></path>
    </svg>
  );
}
