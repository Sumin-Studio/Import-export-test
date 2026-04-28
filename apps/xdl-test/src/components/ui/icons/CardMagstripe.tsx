interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CardMagstripe({
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
        d="M52 14H12C8.68628 14 6 16.6863 6 20V44C6 47.3137 8.68628 50 12 50H52C55.3137 50 58 47.3137 58 44V20C58 16.6863 55.3137 14 52 14ZM54 44C54 45.1046 53.1045 46 52 46H12C10.8955 46 10 45.1046 10 44V32H54V44ZM54 24H10V20C10 18.8954 10.8955 18 12 18H52C53.1045 18 54 18.8954 54 20V24Z"
      />
    </svg>
  );
}
