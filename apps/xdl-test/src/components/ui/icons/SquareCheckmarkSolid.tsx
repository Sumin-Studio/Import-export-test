interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SquareCheckmarkSolid({
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
        d="M52 10H12C10.8954 10 10 10.8954 10 12V52C10 53.1046 10.8954 54 12 54H52C53.1046 54 54 53.1046 54 52V12C54 10.8954 53.1046 10 52 10ZM45.4143 26.4144L30.4142 41.4141C29.6331 42.1951 28.3669 42.1951 27.5858 41.4141L19.5857 33.4145C18.8046 32.6334 18.8046 31.3671 19.5856 30.586C20.3667 29.805 21.6332 29.8048 22.4142 30.5858L29 37.1716L42.5858 23.5858C43.3668 22.8047 44.6331 22.8047 45.4142 23.5858C46.1953 24.3668 46.1954 25.6334 45.4143 26.4144Z"
      />
    </svg>
  );
}
