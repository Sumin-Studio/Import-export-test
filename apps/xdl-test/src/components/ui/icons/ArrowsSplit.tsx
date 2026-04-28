interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowsSplit({
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
        d="M40 54C38.8955 54 38 53.1045 38 52C38 50.8955 38.8955 50 40 50H49.1719L44.5859 45.4141C36.6924 37.5215 31.2695 34 20 34H10C8.89551 34 8 33.1045 8 32C8 30.8955 8.89551 30 10 30H20C31.2695 30 36.6924 26.4785 44.5859 18.5859L49.1719 14H40C38.8955 14 38 13.1045 38 12C38 10.8955 38.8955 10 40 10H54C55.1046 10 56 10.8954 56 12V26C56 27.1045 55.1045 28 54 28C52.8955 28 52 27.1045 52 26V16.8281L47.4141 21.4141C42.3746 26.4535 37.9897 29.9842 32.5537 32C37.9897 34.0158 42.3746 37.5465 47.4141 42.5859L52 47.1719V38C52 36.8955 52.8955 36 54 36C55.1045 36 56 36.8955 56 38V52C56 53.1046 55.1046 54 54 54H40Z"
      ></path>
    </svg>
  );
}
