interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DocumentArrowUp({
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
        d="M49.6569 23.6569L36.3431 10.3431C34.8428 8.84283 32.808 8 30.6863 8H14C12.8954 8 12 8.89539 12 10V54C12 55.1046 12.8954 56 14 56H50C51.1046 56 52 55.1046 52 54V29.3137C52 27.192 51.1572 25.1571 49.6569 23.6569ZM36 15.6569L44.3431 24H36V15.6569ZM48 52H16V12H30C31.1046 12 32 12.8954 32 14V26C32 27.1046 32.8954 28 34 28H46C47.1046 28 48 28.8954 48 30V52ZM41.4673 38.5903C42.2461 39.3735 42.2422 40.6401 41.4585 41.4185C40.6743 42.1968 39.4077 42.1929 38.6304 41.4097L34.0981 36.8497V48C34.0981 49.1045 33.2026 50 32.0981 50C30.9937 50 30.0981 49.1045 30.0981 48V36.8075L25.4585 41.4185C24.675 42.197 23.4085 42.1936 22.6304 41.4097C21.8516 40.6265 21.8555 39.3599 22.6392 38.5815L30.6885 30.5815C31.4712 29.8029 32.7378 29.8065 33.5166 30.5903L41.4673 38.5903Z"
      />
    </svg>
  );
}
