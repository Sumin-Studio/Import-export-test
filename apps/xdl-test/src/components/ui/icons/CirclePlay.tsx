interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CirclePlay({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM44.8945 30.2109L24.8945 20.2109C23.5649 19.5482 22 20.5143 22 22V42C22 43.4857 23.5648 44.4516 24.8945 43.7891L44.8945 33.7891C46.3661 33.0533 46.3661 30.9467 44.8945 30.2109ZM26 38.7637V25.2363L39.5283 32L26 38.7637Z"
      ></path>
    </svg>
  );
}
