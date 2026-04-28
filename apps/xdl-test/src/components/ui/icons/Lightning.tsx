interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Lightning({
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
        d="M54.0001 24H34.0001V6C34.0001 4.04126 31.4638 3.25476 30.3516 4.86719L8.35163 36.8672C7.44001 38.1913 8.39246 40 10.0001 40H30.0001V58C30.0001 59.96 32.5364 60.7468 33.6485 59.1328L55.6485 27.1328C56.5601 25.8087 55.6077 24 54.0001 24ZM34.0001 51.5605V36H13.8018L30.0001 12.4395V28H50.1983L34.0001 51.5605Z"
      ></path>
    </svg>
  );
}
