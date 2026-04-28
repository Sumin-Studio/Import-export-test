interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function TextCursor({
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
        d="M34 34V44C34 47.3086 36.6914 50 40 50C41.1045 50 42 50.8955 42 52C42 53.1045 41.1045 54 40 54C36.7273 54 33.8254 52.4122 32 49.9742C30.1746 52.4122 27.2727 54 24 54C22.8955 54 22 53.1045 22 52C22 50.8955 22.8955 50 24 50C27.3086 50 30 47.3086 30 44V34H24C22.8955 34 22 33.1045 22 32C22 30.8955 22.8955 30 24 30H30V20C30 16.6914 27.3086 14 24 14C22.8955 14 22 13.1045 22 12C22 10.8955 22.8955 10 24 10C27.2727 10 30.1746 11.5878 32 14.0258C33.8254 11.5878 36.7273 10 40 10C41.1045 10 42 10.8955 42 12C42 13.1045 41.1045 14 40 14C36.6914 14 34 16.6914 34 20V30H40C41.1045 30 42 30.8955 42 32C42 33.1045 41.1045 34 40 34H34Z"
      />
    </svg>
  );
}
