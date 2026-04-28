interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Menu({
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
        d="M54 48C54 49.1046 53.1046 50 52 50H12C10.8954 50 10 49.1046 10 48C10 46.8954 10.8954 46 12 46H52C53.1046 46 54 46.8954 54 48ZM12 18H52C53.1046 18 54 17.1046 54 16C54 14.8954 53.1046 14 52 14H12C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18ZM52 30H12C10.8954 30 10 30.8954 10 32C10 33.1046 10.8954 34 12 34H52C53.1046 34 54 33.1046 54 32C54 30.8954 53.1046 30 52 30Z"
      ></path>
    </svg>
  );
}
