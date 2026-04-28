interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Filter({
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
        d="M48 32C48 33.1046 47.1045 34 46 34H18C16.8955 34 16 33.1046 16 32C16 30.8954 16.8955 30 18 30H46C47.1045 30 48 30.8954 48 32ZM38 44H26C24.8955 44 24 44.8954 24 46C24 47.1046 24.8955 48 26 48H38C39.1045 48 40 47.1046 40 46C40 44.8954 39.1045 44 38 44ZM54 16H10C8.89551 16 8 16.8954 8 18C8 19.1046 8.89551 20 10 20H54C55.1045 20 56 19.1046 56 18C56 16.8954 55.1045 16 54 16Z"
      ></path>
    </svg>
  );
}
