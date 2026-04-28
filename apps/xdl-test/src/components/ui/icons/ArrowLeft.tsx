interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowLeft({
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
        d="M54 32C54 33.1045 53.1046 34 52 34H16.8283L29.4141 46.5857C30.1951 47.3668 30.1951 48.6332 29.4141 49.4142C28.6331 50.1952 27.3665 50.1954 26.5855 49.4143L10.5858 33.4142C9.80475 32.6331 9.80475 31.3668 10.5858 30.5858L26.5855 14.5856C27.3665 13.8046 28.6329 13.8046 29.4139 14.5856C30.1949 15.3667 30.1951 16.6332 29.4141 17.4142L16.8283 30H52C53.1046 30 54 30.8954 54 32Z"
      ></path>
    </svg>
  );
}
