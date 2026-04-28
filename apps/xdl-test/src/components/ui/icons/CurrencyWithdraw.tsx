interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CurrencyWithdraw({
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
        d="M45.4144 44.5861C46.1954 45.3671 46.1954 46.6335 45.4143 47.4146L33.4142 59.4142C32.6331 60.1953 31.3669 60.1953 30.5858 59.4142L18.5857 47.4146C17.8046 46.6335 17.8046 45.3671 18.5856 44.5861C19.3667 43.805 20.6332 43.8049 21.4142 44.5859L30 53.1717V24C30 22.8954 30.8954 22 32 22C33.1046 22 34 22.8954 34 24V53.1717L42.5858 44.5859C43.3668 43.8049 44.6333 43.805 45.4144 44.5861ZM56 10V38C56 39.1045 55.1045 40 54 40H45C43.8955 40 43 39.1045 43 38V36C43 31.0376 47.0376 27 52 27V21C47.0376 21 43 16.9624 43 12H21C21 16.9624 16.9624 21 12 21V27C16.9624 27 21 31.0376 21 36V38C21 39.1045 20.1045 40 19 40H10C8.89551 40 8 39.1045 8 38V10C8 8.89551 8.89551 8 10 8H54C55.1045 8 56 8.89551 56 10ZM12 31V36H17C17 33.2432 14.7568 31 12 31ZM17 12H12V17C14.7568 17 17 14.7568 17 12ZM52 31C49.2432 31 47 33.2432 47 36H52V31ZM52 17V12H47C47 14.7568 49.2432 17 52 17Z"
      />
    </svg>
  );
}
