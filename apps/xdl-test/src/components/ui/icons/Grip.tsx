interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Grip({
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
        d="M54 40C54 41.1046 53.1046 42 52 42H12C10.8954 42 10 41.1046 10 40C10 38.8954 10.8954 38 12 38H52C53.1046 38 54 38.8954 54 40ZM52 22H12C10.8954 22 10 22.8954 10 24C10 25.1046 10.8954 26 12 26H52C53.1046 26 54 25.1046 54 24C54 22.8954 53.1046 22 52 22ZM52 30H12C10.8954 30 10 30.8954 10 32C10 33.1046 10.8954 34 12 34H52C53.1046 34 54 33.1046 54 32C54 30.8954 53.1046 30 52 30Z"
      ></path>
    </svg>
  );
}
