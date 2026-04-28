interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function LogOut({
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
        d="M40 42V50C40 53.3137 37.3137 56 34 56H14C10.6863 56 8 53.3137 8 50V14C8 10.6863 10.6863 8 14 8H34C37.3137 8 40 10.6863 40 14V22C40 23.1046 39.1045 24 38 24C36.8955 24 36 23.1046 36 22V14C36 12.8972 35.1028 12 34 12H14C12.8972 12 12 12.8972 12 14V50C12 51.1028 12.8972 52 14 52H34C35.1028 52 36 51.1028 36 50V42C36 40.8954 36.8955 40 38 40C39.1045 40 40 40.8954 40 42ZM59.4143 30.5858L47.4146 18.5857C46.6335 17.8046 45.3672 17.8046 44.5861 18.5856C43.8051 19.3667 43.8049 20.6332 44.5859 21.4142L53.1716 30H22C20.8955 30 20 30.8954 20 32C20 33.1046 20.8955 34 22 34H53.1716L44.5859 42.5858C43.8048 43.3668 43.8048 44.6331 44.5859 45.4142C45.3671 46.1953 46.6334 46.1954 47.4146 45.4143L59.4143 33.4142C60.1953 32.6331 60.1953 31.3668 59.4143 30.5858Z"
      ></path>
    </svg>
  );
}
