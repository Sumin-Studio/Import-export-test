interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CirclePlaySolid({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM42.8945 33.7891L26.8945 41.7891C25.5649 42.4516 24 41.4856 24 40V24C24 22.5186 25.5608 21.5472 26.8945 22.2109L42.8945 30.2109C44.3662 30.9467 44.3662 33.0532 42.8945 33.7891Z"
      ></path>
    </svg>
  );
}
