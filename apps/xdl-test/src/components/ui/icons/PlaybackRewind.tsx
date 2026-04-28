interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackRewind({
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
        d="M50.9257 16.3125L31.9999 28.3562V18C31.9999 16.4235 30.2559 15.4664 28.9257 16.3125L6.92571 30.3125C5.69273 31.0983 5.69273 32.9017 6.92571 33.6875L28.9257 47.6875C30.2453 48.5265 31.9999 47.5883 31.9999 46V35.6438L50.9257 47.6875C52.2453 48.5265 53.9999 47.5883 53.9999 46V18C53.9999 16.4235 52.2559 15.4664 50.9257 16.3125ZM27.9999 42.3564L11.7255 32L27.9999 21.6436V42.3564ZM49.9999 42.3564L33.7255 32L49.9999 21.6436V42.3564Z"
      />
    </svg>
  );
}
