interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Ellipsis({
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
        d="M20 32C20 34.2091 18.2091 36 16 36C13.7908 36 12 34.2091 12 32C12 29.7908 13.7908 28 16 28C18.2091 28 20 29.7908 20 32ZM48 28C45.7908 28 44 29.7908 44 32C44 34.2091 45.7908 36 48 36C50.2091 36 52 34.2091 52 32C52 29.7908 50.2091 28 48 28ZM32 28C29.7908 28 28 29.7908 28 32C28 34.2091 29.7908 36 32 36C34.2091 36 36 34.2091 36 32C36 29.7908 34.2091 28 32 28Z"
      ></path>
    </svg>
  );
}
