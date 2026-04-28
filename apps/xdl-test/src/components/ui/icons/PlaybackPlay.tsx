interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackPlay({
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
        d="M52.8945 30.2109L16.8945 12.2109C15.5632 11.5484 14 12.5161 14 14V50C14 51.4857 15.5648 52.4516 16.8945 51.7891L52.8945 33.7891C54.3661 33.0533 54.3661 30.9467 52.8945 30.2109ZM18 46.7637V17.2363L47.5283 32L18 46.7637Z"
      />
    </svg>
  );
}
