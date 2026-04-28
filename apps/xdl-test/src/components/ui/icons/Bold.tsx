interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Bold({
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
        d="M43.8212 30.5652C46.4171 28.5121 48 25.3066 48 21.5C48 14.8369 43.1636 10 36.5 10H16C14.8955 10 14 10.8955 14 12V52C14 53.1045 14.8955 54 16 54H37.5C44.7432 54 50 48.7432 50 41.5C50 36.6138 47.6018 32.6395 43.8212 30.5652ZM35.5 45H24V36H35.5C38.2334 36 40 37.7666 40 40.5C40 43.2334 38.2334 45 35.5 45ZM38 22.5C38 24.6592 36.6587 26 34.5 26H24V19H34.5C36.6587 19 38 20.3408 38 22.5Z"
      ></path>
    </svg>
  );
}
