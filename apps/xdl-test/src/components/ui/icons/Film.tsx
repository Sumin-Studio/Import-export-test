interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Film({
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
        d="M54 10H10C8.89551 10 8 10.8955 8 12V52C8 53.1045 8.89551 54 10 54H54C55.1045 54 56 53.1045 56 52V12C56 10.8955 55.1045 10 54 10ZM46 30H52V34H46V30ZM46 26V22H52V26H46ZM42 30H22V14H42V30ZM18 34H12V30H18V34ZM18 26H12V22H18V26ZM12 38H18V42H12V38ZM22 34H42V50H22V34ZM46 38H52V42H46V38ZM52 18H46V14H52V18ZM18 14V18H12V14H18ZM12 46H18V50H12V46ZM46 50V46H52V50H46Z"
      ></path>
    </svg>
  );
}
