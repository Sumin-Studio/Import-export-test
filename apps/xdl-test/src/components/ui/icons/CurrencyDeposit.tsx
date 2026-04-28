interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CurrencyDeposit({
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
        d="M18.5856 19.4139C17.8046 18.6328 17.8046 17.3665 18.5857 16.5854L30.5858 4.58575C31.3669 3.80475 32.6331 3.80475 33.4142 4.58575L45.4143 16.5854C46.1954 17.3665 46.1954 18.6328 45.4144 19.4139C44.6333 20.1949 43.3668 20.1951 42.5858 19.4141L34 10.8283V40C34 41.1046 33.1046 42 32 42C30.8954 42 30 41.1046 30 40V10.8283L21.4142 19.4141C20.6332 20.1951 19.3667 20.1949 18.5856 19.4139ZM56 26V54C56 55.1045 55.1045 56 54 56H10C8.89551 56 8 55.1045 8 54V26C8 24.8955 8.89551 24 10 24H19C20.1045 24 21 24.8955 21 26V28C21 32.9624 16.9624 37 12 37V43C16.9624 43 21 47.0376 21 52H43C43 47.0376 47.0376 43 52 43V37C47.0376 37 43 32.9624 43 28V26C43 24.8955 43.8955 24 45 24H54C55.1045 24 56 24.8955 56 26ZM12 33C14.7568 33 17 30.7568 17 28H12V33ZM17 52C17 49.2432 14.7568 47 12 47V52H17ZM52 33V28H47C47 30.7568 49.2432 33 52 33ZM52 47C49.2432 47 47 49.2432 47 52H52V47Z"
      />
    </svg>
  );
}
