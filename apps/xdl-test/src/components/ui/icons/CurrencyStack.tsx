interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CurrencyStack({
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
        d="M12 18C12 16.8955 12.8955 16 14 16H50C51.1045 16 52 16.8955 52 18C52 19.1045 51.1045 20 50 20H14C12.8955 20 12 19.1045 12 18ZM18 12H46C47.1045 12 48 11.1045 48 10C48 8.89551 47.1045 8 46 8H18C16.8955 8 16 8.89551 16 10C16 11.1045 16.8955 12 18 12ZM56 26V54C56 55.1045 55.1045 56 54 56H10C8.89551 56 8 55.1045 8 54V26C8 24.8955 8.89551 24 10 24H54C55.1045 24 56 24.8955 56 26ZM47 28C47 30.7568 49.2432 33 52 33V28H47ZM12 33C14.7568 33 17 30.7568 17 28H12V33ZM17 52C17 49.2432 14.7568 47 12 47V52H17ZM43 52C43 47.0376 47.0376 43 52 43V37C47.0376 37 43 32.9624 43 28H21C21 32.9624 16.9624 37 12 37V43C16.9624 43 21 47.0376 21 52H43ZM52 47C49.2432 47 47 49.2432 47 52H52V47ZM40 40C40 45.2148 36.6357 49 32 49C27.3643 49 24 45.2148 24 40C24 34.7852 27.3643 31 32 31C36.6357 31 40 34.7852 40 40ZM36 40C36 37.0562 34.355 35 32 35C29.645 35 28 37.0562 28 40C28 42.9438 29.645 45 32 45C34.355 45 36 42.9438 36 40Z"
      />
    </svg>
  );
}
