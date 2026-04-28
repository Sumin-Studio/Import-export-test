interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleDivideSolid({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 18C33.6569 18 35 19.3431 35 21C35 22.6569 33.6569 24 32 24C30.3431 24 29 22.6569 29 21C29 19.3431 30.3431 18 32 18ZM32 46C30.3431 46 29 44.6569 29 43C29 41.3431 30.3431 40 32 40C33.6569 40 35 41.3431 35 43C35 44.6569 33.6569 46 32 46ZM44 34H20C18.8954 34 18 33.1046 18 32C18 30.8954 18.8954 30 20 30H44C45.1046 30 46 30.8954 46 32C46 33.1046 45.1046 34 44 34Z"
      ></path>
    </svg>
  );
}
