interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Coffee({
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
        d="M56 52C56 53.1045 55.1045 54 54 54H10C8.89551 54 8 53.1045 8 52C8 50.8955 8.89551 50 10 50H54C55.1045 50 56 50.8955 56 52ZM60 20V26C60 29.3086 57.3086 32 54 32H52V36C52 41.5142 47.5137 46 42 46H22C16.4863 46 12 41.5142 12 36V12C12 10.8955 12.8955 10 14 10H50C51.1045 10 52 10.8955 52 12V14H54C57.3086 14 60 16.6914 60 20ZM48 14H16V36C16 39.3086 18.6914 42 22 42H42C45.3086 42 48 39.3086 48 36V14ZM56 20C56 18.897 55.1025 18 54 18H52V28H54C55.1025 28 56 27.103 56 26V20Z"
      ></path>
    </svg>
  );
}
