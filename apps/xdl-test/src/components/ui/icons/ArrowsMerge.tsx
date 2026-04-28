interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowsMerge({
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
        d="M57.4141 33.4141L47.4141 43.4141C46.6328 44.1953 45.3672 44.1953 44.5859 43.4141C43.8047 42.6328 43.8047 41.3672 44.5859 40.5859L51.1719 34H42C30.7305 34 25.3076 37.5215 17.4141 45.4141L9.41406 53.4141C8.63281 54.1953 7.36719 54.1953 6.58594 53.4141C5.80469 52.6328 5.80469 51.3672 6.58594 50.5859L14.5859 42.5859C19.6254 37.5465 24.0103 34.0158 29.4463 32C24.0103 29.9842 19.6254 26.4535 14.5859 21.4141L6.58594 13.4141C5.80469 12.6328 5.80469 11.3672 6.58594 10.5859C7.36719 9.80469 8.63281 9.80469 9.41406 10.5859L17.4141 18.5859C25.3076 26.4785 30.7305 30 42 30H51.1719L44.5859 23.4141C43.8047 22.6328 43.8047 21.3672 44.5859 20.5859C45.3672 19.8047 46.6328 19.8047 47.4141 20.5859L57.4141 30.5859C58.1953 31.3672 58.1953 32.6328 57.4141 33.4141Z"
      ></path>
    </svg>
  );
}
