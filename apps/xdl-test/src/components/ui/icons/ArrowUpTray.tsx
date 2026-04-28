interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowUpTray({
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
        d="M54 42V50C54 53.3137 51.3137 56 48 56H16C12.6863 56 10 53.3137 10 50V42C10 40.8954 10.8955 40 12 40C13.1045 40 14 40.8954 14 42V50C14 51.1046 14.8955 52 16 52H48C49.1045 52 50 51.1046 50 50V42C50 40.8954 50.8955 40 52 40C53.1045 40 54 40.8954 54 42ZM18.5858 23.4141C19.3668 24.1951 20.6332 24.1951 21.4142 23.4141L30 14.8283V44C30 45.1046 30.8954 46 32 46C33.1045 46 34 45.1046 34 44V14.8283L42.5857 23.4142C43.3668 24.1952 44.6331 24.1952 45.4142 23.4142C46.1952 22.6331 46.1953 21.3666 45.4143 20.5855L33.4141 8.58575C32.6331 7.80475 31.3668 7.80475 30.5857 8.58575L18.5857 20.5854C17.8046 21.3665 17.8047 22.633 18.5858 23.4141Z"
      ></path>
    </svg>
  );
}
