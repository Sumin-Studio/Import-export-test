interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function TextCursorField({
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
        d="M56 20H34C34 16.6914 36.6914 14 40 14C41.1045 14 42 13.1045 42 12C42 10.8955 41.1045 10 40 10C36.7273 10 33.8254 11.5878 32 14.0258C30.1746 11.5878 27.2727 10 24 10C22.8955 10 22 10.8955 22 12C22 13.1045 22.8955 14 24 14C27.3086 14 30 16.6914 30 20H8C6.89551 20 6 20.8955 6 22V42C6 43.1045 6.89551 44 8 44H30C30 47.3086 27.3086 50 24 50C22.8955 50 22 50.8955 22 52C22 53.1045 22.8955 54 24 54C27.2727 54 30.1746 52.4122 32 49.9742C33.8254 52.4122 36.7273 54 40 54C41.1045 54 42 53.1045 42 52C42 50.8955 41.1045 50 40 50C36.6914 50 34 47.3086 34 44H56C57.1045 44 58 43.1045 58 42V22C58 20.8955 57.1045 20 56 20ZM10 40V24H30V30H24C22.8955 30 22 30.8955 22 32C22 33.1045 22.8955 34 24 34H30V40H10ZM54 40H34V34H40C41.1045 34 42 33.1045 42 32C42 30.8955 41.1045 30 40 30H34V24H54V40Z"
      />
    </svg>
  );
}
