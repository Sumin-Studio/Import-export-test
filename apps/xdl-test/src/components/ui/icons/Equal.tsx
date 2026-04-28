interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Equal({
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
        d="M12 22C12 20.8954 12.8954 20 14 20H50C51.1046 20 52 20.8954 52 22C52 23.1046 51.1046 24 50 24H14C12.8954 24 12 23.1046 12 22ZM50 40H14C12.8954 40 12 40.8954 12 42C12 43.1046 12.8954 44 14 44H50C51.1046 44 52 43.1046 52 42C52 40.8954 51.1046 40 50 40Z"
      ></path>
    </svg>
  );
}
