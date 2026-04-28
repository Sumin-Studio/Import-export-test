interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleAdd({
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
        d="M46 32C46 33.1046 45.1045 34 44 34H34V44C34 45.1046 33.1045 46 32 46C30.8955 46 30 45.1046 30 44V34H20C18.8955 34 18 33.1046 18 32C18 30.8954 18.8955 30 20 30H30V20C30 18.8954 30.8955 18 32 18C33.1045 18 34 18.8954 34 20V30H44C45.1045 30 46 30.8954 46 32ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32Z"
      ></path>
    </svg>
  );
}
