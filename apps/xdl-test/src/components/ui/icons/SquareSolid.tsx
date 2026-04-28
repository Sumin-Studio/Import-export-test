interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SquareSolid({
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
        d="M54 12V52C54 53.1046 53.1046 54 52 54H12C10.8954 54 10 53.1046 10 52V12C10 10.8954 10.8954 10 12 10H52C53.1046 10 54 10.8954 54 12Z"
      />
    </svg>
  );
}
