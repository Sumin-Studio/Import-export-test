interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function MessagePair({
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
        d="M60 20H42V10C42 8.90002 41.1001 8 40 8H4C2.90002 8 2 8.90002 2 10V34C2 35.1 2.90002 36 4 36H10V45.9959C10 47.7778 12.1543 48.6701 13.4143 47.4102L22 38.8244V46C22 47.1 22.9 48 24 48H39.1758L50.5859 59.4102C51.8457 60.67 54 59.7777 54 57.9959V48H60C61.1001 48 62 47.1 62 46V22C62 20.9 61.1001 20 60 20ZM22 22V33.1672L14 41.1675V32H6V12H38V20H24C22.9 20 22 20.9 22 22ZM58 44H50V53.1675L40.833 44H26V24H58V44Z"
      ></path>
    </svg>
  );
}
