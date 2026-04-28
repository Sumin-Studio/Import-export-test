interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleSlash({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM12 32C12 27.1974 13.6957 22.7925 16.5172 19.3448L44.6547 47.4833C41.207 50.3044 36.8023 52 32 52C20.9543 52 12 43.0457 12 32ZM47.4828 44.6552L19.3453 16.5167C22.793 13.6956 27.1977 12 32 12C43.0457 12 52 20.9543 52 32C52 36.8026 50.3043 41.2075 47.4828 44.6552Z"
      ></path>
    </svg>
  );
}
