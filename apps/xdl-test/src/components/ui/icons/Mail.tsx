interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Mail({
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
        d="M54 12H10C8.89545 12 8 12.8954 8 14V50C8 51.1046 8.89545 52 10 52H54C55.1046 52 56 51.1046 56 50V14C56 12.8954 55.1046 12 54 12ZM12 48V25.8685L29.7812 37.7227C31.1249 38.6184 32.8751 38.6184 34.2188 37.7227L52 25.8685V48H12ZM52 21.0612L32 34.3945L12 21.0612V16H52V21.0612Z"
      ></path>
    </svg>
  );
}
