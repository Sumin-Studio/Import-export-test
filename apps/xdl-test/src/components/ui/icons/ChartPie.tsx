interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChartPie({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM47.483 44.6549L34.8284 31.9998L47.483 19.3451C50.3043 22.7928 52 27.1975 52 32C52 36.8024 50.3043 41.2072 47.483 44.6549ZM34 12.101C38.0221 12.5005 41.6919 14.0923 44.6549 16.517L34 27.1719V12.101ZM12 32C12 21.6295 19.8938 13.1047 30 12.101V32C30 32.47 30.1854 33.0133 30.5859 33.4141L44.6549 47.483C41.2073 50.3043 36.8025 52 32 52C20.9543 52 12 43.0457 12 32Z"
      ></path>
    </svg>
  );
}
