interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackPrevious({
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
        d="M52.9258 16.3125L34 28.3562V18C34 16.4235 32.256 15.4664 30.9258 16.3125L12 28.3562V18C12 16.8955 11.1045 16 10 16C8.89551 16 8 16.8955 8 18V46C8 47.1045 8.89551 48 10 48C11.1045 48 12 47.1045 12 46V35.6438L30.9258 47.6875C32.2453 48.5265 34 47.5883 34 46V35.6438L52.9258 47.6875C54.2453 48.5265 56 47.5883 56 46V18C56 16.4235 54.256 15.4664 52.9258 16.3125ZM30 42.3564L13.7256 32L30 21.6436V42.3564ZM52 42.3564L35.7256 32L52 21.6436V42.3564Z"
      />
    </svg>
  );
}
