interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Currency({
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
        d="M56 14H8C6.89545 14 6 14.8954 6 16V48C6 49.1046 6.89545 50 8 50H56C57.1046 50 58 49.1046 58 48V16C58 14.8954 57.1046 14 56 14ZM10 18H16C16 21.3086 13.3086 24 10 24V18ZM10 46V40C13.3086 40 16 42.6914 16 46H10ZM54 46H48C48 42.6914 50.6914 40 54 40V46ZM54 36C48.4863 36 44 40.4858 44 46H20C20 40.4858 15.5137 36 10 36V28C15.5137 28 20 23.5142 20 18H44C44 23.5142 48.4863 28 54 28V36ZM54 24C50.6914 24 48 21.3086 48 18H54V24ZM32 20C26.2061 20 22 25.0469 22 32C22 38.9531 26.2061 44 32 44C37.7939 44 42 38.9531 42 32C42 25.0469 37.7939 20 32 20ZM32 40C28.4678 40 26 36.7104 26 32C26 27.2896 28.4678 24 32 24C35.5322 24 38 27.2896 38 32C38 36.7104 35.5322 40 32 40Z"
      />
    </svg>
  );
}
