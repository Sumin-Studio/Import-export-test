interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Subtract({
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
        d="M52 32C52 33.1046 51.1046 34 50 34H14C12.8954 34 12 33.1046 12 32C12 30.8954 12.8954 30 14 30H50C51.1046 30 52 30.8954 52 32Z"
      />
    </svg>
  );
}
