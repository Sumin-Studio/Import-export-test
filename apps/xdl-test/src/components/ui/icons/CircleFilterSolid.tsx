interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleFilterSolid({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM36 44H28C26.8955 44 26 43.1046 26 42C26 40.8954 26.8955 40 28 40H36C37.1045 40 38 40.8954 38 42C38 43.1046 37.1045 44 36 44ZM40 36H24C22.8955 36 22 35.1046 22 34C22 32.8954 22.8955 32 24 32H40C41.1045 32 42 32.8954 42 34C42 35.1046 41.1045 36 40 36ZM44 28H20C18.8955 28 18 27.1046 18 26C18 24.8954 18.8955 24 20 24H44C45.1045 24 46 24.8954 46 26C46 27.1046 45.1045 28 44 28Z"
      ></path>
    </svg>
  );
}
