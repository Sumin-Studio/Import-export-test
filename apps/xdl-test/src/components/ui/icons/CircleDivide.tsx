interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleDivide({
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
        d="M35 43C35 44.6569 33.6569 46 32 46C30.3431 46 29 44.6569 29 43C29 41.3431 30.3431 40 32 40C33.6569 40 35 41.3431 35 43ZM32 24C33.6569 24 35 22.6569 35 21C35 19.3431 33.6569 18 32 18C30.3431 18 29 19.3431 29 21C29 22.6569 30.3431 24 32 24ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32ZM44 30H20C18.8954 30 18 30.8954 18 32C18 33.1046 18.8954 34 20 34H44C45.1046 34 46 33.1046 46 32C46 30.8954 45.1046 30 44 30Z"
      ></path>
    </svg>
  );
}
