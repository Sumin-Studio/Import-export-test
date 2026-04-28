interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChevronRight({
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
        d="M41.4142 33.4142L27.4144 47.4144C26.6333 48.1954 25.367 48.1954 24.586 47.4144C23.8049 46.6333 23.8047 45.3668 24.5858 44.5858L37.1716 32L24.5858 19.4142C23.8047 18.6331 23.8047 17.3668 24.5858 16.5858C25.3668 15.8047 26.6333 15.8046 27.4144 16.5856L41.4142 30.5858C42.1952 31.3668 42.1952 32.6331 41.4142 33.4142Z"
      ></path>
    </svg>
  );
}
