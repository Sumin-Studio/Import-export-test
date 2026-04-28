interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function StarSolid({
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
        d="M57.2703 25.307L44.5559 35.6638L48.7547 51.516C49.2158 53.2576 47.2928 54.6548 45.779 53.678L32 44.7863L18.2211 53.678C16.7073 54.6548 14.7842 53.2576 15.2454 51.516L19.4441 35.6638L6.72976 25.307C5.33279 24.1692 6.06741 21.9083 7.86636 21.8088L24.24 20.9034L30.1609 5.61078C30.8114 3.93073 33.1886 3.93073 33.8391 5.61078L39.76 20.9034L56.1337 21.8088C57.9326 21.9083 58.6673 24.1692 57.2703 25.307Z"
      />
    </svg>
  );
}
