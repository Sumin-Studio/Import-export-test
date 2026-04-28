interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Eye({
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
        d="M59.8018 31.1323C59.4258 30.3511 50.3789 12 32 12C13.6211 12 4.57422 30.3511 4.19824 31.1323C3.93359 31.6807 3.93359 32.3193 4.19824 32.8677C4.57422 33.6489 13.6211 52 32 52C50.3789 52 59.4258 33.6489 59.8018 32.8677C60.0664 32.3193 60.0664 31.6807 59.8018 31.1323ZM32 48C18.2725 48 10.2236 35.4546 8.26855 32C10.2236 28.5454 18.2725 16 32 16C45.7295 16 53.7783 28.5488 55.7314 32C53.7764 35.4546 45.7275 48 32 48ZM32 21C25.9346 21 21 25.9346 21 32C21 38.0654 25.9346 43 32 43C38.0654 43 43 38.0654 43 32C43 25.9346 38.0654 21 32 21ZM32 39C28.1406 39 25 35.8599 25 32C25 28.1401 28.1406 25 32 25C35.8594 25 39 28.1401 39 32C39 35.8599 35.8594 39 32 39Z"
      ></path>
    </svg>
  );
}
