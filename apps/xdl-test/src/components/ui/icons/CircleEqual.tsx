interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleEqual({
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
        d="M46 38C46 39.1046 45.1046 40 44 40H20C18.8954 40 18 39.1046 18 38C18 36.8954 18.8954 36 20 36H44C45.1046 36 46 36.8954 46 38ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32ZM44 24H20C18.8954 24 18 24.8954 18 26C18 27.1046 18.8954 28 20 28H44C45.1046 28 46 27.1046 46 26C46 24.8954 45.1046 24 44 24Z"
      ></path>
    </svg>
  );
}
