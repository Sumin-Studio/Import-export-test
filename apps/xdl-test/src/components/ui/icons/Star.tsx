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
        d="M56.1337 21.8088L39.76 20.9034L33.8391 5.61078C33.1886 3.93073 30.8114 3.93073 30.1609 5.61078L24.24 20.9034L7.86636 21.8088C6.06741 21.9083 5.33279 24.1692 6.72976 25.307L19.4441 35.6638L15.2454 51.516C14.7842 53.2576 16.7073 54.6548 18.2211 53.678L32 44.7863L45.779 53.678C47.2928 54.6548 49.2158 53.2576 48.7547 51.516L44.5559 35.6638L57.2703 25.307C58.6673 24.1692 57.9326 21.9083 56.1337 21.8088ZM40.0283 34.1927L43.5469 47.4771L32 40.0258L20.4532 47.4771L23.9717 34.1927L13.3168 25.5135L27.0381 24.7548L32 11.9393L36.9619 24.7548L50.6833 25.5135L40.0283 34.1927Z"
      />
    </svg>
  );
}
