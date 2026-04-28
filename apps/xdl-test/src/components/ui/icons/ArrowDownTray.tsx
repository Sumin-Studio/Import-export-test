interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowDownTray({
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
        d="M54 42V50C54 53.3137 51.3137 56 48 56H16C12.6863 56 10 53.3137 10 50V42C10 40.8954 10.8955 40 12 40C13.1045 40 14 40.8954 14 42V50C14 51.1046 14.8955 52 16 52H48C49.1045 52 50 51.1046 50 50V42C50 40.8954 50.8955 40 52 40C53.1045 40 54 40.8954 54 42ZM30.5858 45.4142C31.3669 46.1953 32.6331 46.1953 33.4142 45.4142L45.4143 33.4146C46.1953 32.6335 46.1953 31.3671 45.4143 30.5861C44.6332 29.805 43.3668 29.8049 42.5857 30.5859L34 39.1717V10C34 8.89539 33.1045 8 32 8C30.8955 8 30 8.89539 30 10V39.1717L21.4142 30.5858C20.6332 29.8047 19.3668 29.8047 18.5858 30.5858C17.8047 31.3668 17.8046 32.6334 18.5857 33.4144L30.5858 45.4142Z"
      ></path>
    </svg>
  );
}
