interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleFilter({
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
        d="M42 34C42 35.1046 41.1045 36 40 36H24C22.8955 36 22 35.1046 22 34C22 32.8954 22.8955 32 24 32H40C41.1045 32 42 32.8954 42 34ZM36 40H28C26.8955 40 26 40.8954 26 42C26 43.1046 26.8955 44 28 44H36C37.1045 44 38 43.1046 38 42C38 40.8954 37.1045 40 36 40ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32ZM44 24H20C18.8955 24 18 24.8954 18 26C18 27.1046 18.8955 28 20 28H44C45.1045 28 46 27.1046 46 26C46 24.8954 45.1045 24 44 24Z"
      ></path>
    </svg>
  );
}
