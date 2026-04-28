interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleEqualSolid({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM44 40H20C18.8954 40 18 39.1046 18 38C18 36.8954 18.8954 36 20 36H44C45.1046 36 46 36.8954 46 38C46 39.1046 45.1046 40 44 40ZM44 28H20C18.8954 28 18 27.1046 18 26C18 24.8954 18.8954 24 20 24H44C45.1046 24 46 24.8954 46 26C46 27.1046 45.1046 28 44 28Z"
      ></path>
    </svg>
  );
}
