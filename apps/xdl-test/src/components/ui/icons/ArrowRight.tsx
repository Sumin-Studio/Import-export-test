interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowRight({
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
        d="M53.4143 33.4142L37.4146 49.4143C36.6335 50.1954 35.3672 50.1954 34.5861 49.4144C33.8051 48.6333 33.8049 47.3668 34.5859 46.5857L47.1718 34H12C10.8954 34 10 33.1045 10 32C10 30.8954 10.8954 30 12 30H47.1718L34.5859 17.4142C33.8049 16.6332 33.8049 15.3668 34.5859 14.5857C35.367 13.8047 36.6335 13.8046 37.4146 14.5856L53.4143 30.5858C54.1953 31.3668 54.1953 32.6331 53.4143 33.4142Z"
      ></path>
    </svg>
  );
}
