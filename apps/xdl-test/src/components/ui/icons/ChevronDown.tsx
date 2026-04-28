interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChevronDown({
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
        d="M47.4143 27.4145L33.4141 41.4142C32.633 42.1952 31.3668 42.1952 30.5857 41.4142L16.5856 27.4145C15.8045 26.6334 15.8045 25.3671 16.5856 24.586C17.3666 23.8049 18.633 23.8048 19.4141 24.5859L31.9999 37.1717L44.5857 24.5859C45.3668 23.8048 46.6331 23.8048 47.4142 24.5859C48.1952 25.3669 48.1954 26.6334 47.4143 27.4145Z"
      ></path>
    </svg>
  );
}
