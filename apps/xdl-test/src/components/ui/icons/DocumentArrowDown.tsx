interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DocumentArrowDown({
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
        d="M49.6569 23.6569L36.3431 10.3431C34.8428 8.84283 32.808 8 30.6863 8H14C12.8954 8 12 8.89539 12 10V54C12 55.1046 12.8954 56 14 56H50C51.1046 56 52 55.1046 52 54V29.3137C52 27.192 51.1572 25.1571 49.6569 23.6569ZM36 15.6569L44.3431 24H36V15.6569ZM48 52H16V12H30C31.1046 12 32 12.8954 32 14V26C32 27.1046 32.8954 28 34 28H46C47.1046 28 48 28.8954 48 30V52ZM41.4673 38.5903C42.2461 39.3735 42.2422 40.6396 41.4585 41.4185L33.4097 49.4185C32.6271 50.1969 31.3603 50.1935 30.5815 49.4097L22.6304 41.4097C21.8516 40.6265 21.8555 39.3604 22.6392 38.5815C23.4219 37.8027 24.6885 37.8057 25.4673 38.5903L30 43.1505V32C30 30.8955 30.8955 30 32 30C33.1045 30 34 30.8955 34 32V43.1923L38.6392 38.5815C39.4219 37.8027 40.6885 37.8057 41.4673 38.5903Z"
      />
    </svg>
  );
}
