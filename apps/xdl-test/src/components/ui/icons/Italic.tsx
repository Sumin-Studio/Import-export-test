interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Italic({
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
        d="M51 12C51 13.1045 50.1045 14 49 14H38.5618L29.5618 50H39C40.1045 50 41 50.8955 41 52C41 53.1045 40.1045 54 39 54H15C13.8955 54 13 53.1045 13 52C13 50.8955 13.8955 50 15 50H25.4382L34.4382 14H25C23.8955 14 23 13.1045 23 12C23 10.8955 23.8955 10 25 10H49C50.1045 10 51 10.8955 51 12Z"
      ></path>
    </svg>
  );
}
