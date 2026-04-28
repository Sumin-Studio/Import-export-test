interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function EllipsesVertical({
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
        d="M28 16C28 13.7909 29.7908 12 32 12C34.2091 12 36 13.7909 36 16C36 18.2092 34.2091 20 32 20C29.7908 20 28 18.2092 28 16ZM32 28C29.7908 28 28 29.7909 28 32C28 34.2092 29.7908 36 32 36C34.2091 36 36 34.2092 36 32C36 29.7909 34.2091 28 32 28ZM32 44C29.7908 44 28 45.7909 28 48C28 50.2092 29.7908 52 32 52C34.2091 52 36 50.2092 36 48C36 45.7909 34.2091 44 32 44Z"
      ></path>
    </svg>
  );
}
