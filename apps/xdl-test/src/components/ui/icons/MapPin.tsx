interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function MapPin({
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
        d="M43 19C43 12.9346 38.0654 8 32 8C25.9346 8 21 12.9346 21 19C21 24.3817 24.8875 28.8646 30 29.8089V54C30 55.1045 30.8955 56 32 56C33.1045 56 34 55.1045 34 54V29.8089C39.1125 28.8646 43 24.3817 43 19ZM32 26C28.1406 26 25 22.8599 25 19C25 15.1401 28.1406 12 32 12C35.8594 12 39 15.1401 39 19C39 22.8599 35.8594 26 32 26Z"
      ></path>
    </svg>
  );
}
