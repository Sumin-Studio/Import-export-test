interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Printer({
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
        d="M56 24H48V10C48 8.89551 47.1045 8 46 8H18C16.8955 8 16 8.89551 16 10V24H8C6.89551 24 6 24.8955 6 26V46C6 47.1045 6.89551 48 8 48H16V54C16 55.1045 16.8955 56 18 56H46C47.1045 56 48 55.1045 48 54V48H56C57.1045 48 58 47.1045 58 46V26C58 24.8955 57.1045 24 56 24ZM20 12H44V24H20V12ZM44 52H20V40H44V52ZM54 44H48V38C48 36.8955 47.1045 36 46 36H18C16.8955 36 16 36.8955 16 38V44H10V28H54V44Z"
      />
    </svg>
  );
}
