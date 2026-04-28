interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowDown({
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
        d="M49.4143 37.4145L33.4141 53.4142C32.633 54.1953 31.3668 54.1953 30.5857 53.4142L14.5856 37.4145C13.8045 36.6334 13.8045 35.3671 14.5856 34.5861C15.3666 33.805 16.6331 33.8048 17.4141 34.5859L29.9999 47.1717V12C29.9999 10.8954 30.8954 10 31.9999 10C33.1045 10 33.9999 10.8954 33.9999 12V47.1717L46.5857 34.5859C47.3667 33.8048 48.6331 33.8048 49.4141 34.5859C50.1952 35.3669 50.1954 36.6334 49.4143 37.4145Z"
      ></path>
    </svg>
  );
}
