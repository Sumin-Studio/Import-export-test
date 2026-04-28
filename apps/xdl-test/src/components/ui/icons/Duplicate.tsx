interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Duplicate({
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
        d="M54 22H42V10C42 8.89539 41.1045 8 40 8H10C8.89551 8 8 8.89539 8 10V40C8 41.1046 8.89551 42 10 42H22V54C22 55.1046 22.8955 56 24 56H34.6863C36.8081 56 38.8428 55.1571 40.3431 53.6569L53.6569 40.3431C55.1572 38.8428 56 36.808 56 34.6863V24C56 22.8954 55.1045 22 54 22ZM24 22C22.8954 22 22 22.8954 22 24V37.9999H12V11.9999H38V22H24ZM40 48.3431V40H48.3431L40 48.3431ZM52 34C52 35.1046 51.1045 36 50 36H37C36.4478 36 36 36.4477 36 37V50C36 51.1046 35.1045 52 34 52H26V26H52V34Z"
      ></path>
    </svg>
  );
}
