interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleExclamationSolid({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM29.5 20C29.5 18.8955 30.3955 18 31.5 18H32.5C33.6045 18 34.5 18.8955 34.5 20V26C34.5 26.0415 34.499 26.083 34.4961 26.125L33.9961 34.125C33.9307 35.1787 33.0557 36 32 36C30.9443 36 30.0693 35.1787 30.0039 34.125L29.5039 26.125C29.501 26.083 29.5 26.0415 29.5 26V20ZM32 45C30.3431 45 29 43.6569 29 42C29 40.3431 30.3431 39 32 39C33.6569 39 35 40.3431 35 42C35 43.6569 33.6569 45 32 45Z"
      ></path>
    </svg>
  );
}
