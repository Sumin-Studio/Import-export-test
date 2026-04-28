interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Exclamation({
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
        d="M35 51C35 52.6569 33.6569 54 32 54C30.3431 54 29 52.6569 29 51C29 49.3431 30.3431 48 32 48C33.6569 48 35 49.3431 35 51ZM30.001 40.0625C30.0352 41.1426 30.9199 42 32 42C33.0801 42 33.9648 41.1426 33.999 40.0625L34.5 24V10C34.5 8.89551 33.6045 8 32.5 8H31.5C30.3955 8 29.5 8.89551 29.5 10L29.501 24.0625L30.001 40.0625Z"
      ></path>
    </svg>
  );
}
