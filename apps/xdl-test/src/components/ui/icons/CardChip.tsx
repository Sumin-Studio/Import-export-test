interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CardChip({
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
        d="M26 30V34C26 35.1046 25.1045 36 24 36H16C14.8955 36 14 35.1046 14 34V30C14 28.8954 14.8955 28 16 28H24C25.1045 28 26 28.8954 26 30ZM58 20V44C58 47.3137 55.3137 50 52 50H12C8.68628 50 6 47.3137 6 44V20C6 16.6863 8.68628 14 12 14H52C55.3137 14 58 16.6863 58 20ZM54 20C54 18.8972 53.1028 18 52 18H12C10.8972 18 10 18.8972 10 20V44C10 45.1028 10.8972 46 12 46H52C53.1028 46 54 45.1028 54 44V20Z"
      />
    </svg>
  );
}
