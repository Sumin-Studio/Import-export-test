interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackNext({
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
        d="M54 16C52.8955 16 52 16.8955 52 18V28.3562L33.0742 16.3125C31.7487 15.468 30 16.4199 30 18V28.3562L11.0742 16.3125C9.74419 15.4665 8 16.4237 8 18V46C8 47.5887 9.75503 48.5263 11.0742 47.6875L30 35.6438V46C30 47.5887 31.755 48.5263 33.0742 47.6875L52 35.6438V46C52 47.1045 52.8955 48 54 48C55.1045 48 56 47.1045 56 46V18C56 16.8955 55.1045 16 54 16ZM12 42.3564V21.6436L28.2744 32L12 42.3564ZM34 42.3564V21.6436L50.2744 32L34 42.3564Z"
      />
    </svg>
  );
}
