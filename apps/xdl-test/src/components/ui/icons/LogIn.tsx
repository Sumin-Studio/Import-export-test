interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function LogIn({
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
        d="M54 14V50C54 53.3137 51.3137 56 48 56H28C24.6863 56 22 53.3137 22 50V42C22 40.8954 22.8955 40 24 40C25.1045 40 26 40.8954 26 42V50C26 51.1028 26.8972 52 28 52H48C49.1028 52 50 51.1028 50 50V14C50 12.8972 49.1028 12 48 12H28C26.8972 12 26 12.8972 26 14V22C26 23.1046 25.1045 24 24 24C22.8955 24 22 23.1046 22 22V14C22 10.6863 24.6863 8 28 8H48C51.3137 8 54 10.6863 54 14ZM30.5859 42.5858C29.8048 43.3668 29.8048 44.6331 30.5859 45.4142C31.3671 46.1953 32.6334 46.1954 33.4146 45.4143L45.4143 33.4142C46.1953 32.6331 46.1953 31.3668 45.4143 30.5858L33.4146 18.5857C32.6335 17.8046 31.3672 17.8046 30.5861 18.5856C29.8051 19.3667 29.8049 20.6332 30.5859 21.4142L39.1716 30H8C6.89551 30 6 30.8954 6 32C6 33.1046 6.89551 34 8 34H39.1716L30.5859 42.5858Z"
      ></path>
    </svg>
  );
}
