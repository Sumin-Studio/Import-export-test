interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function User({
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
        d="M40.4684 37.0269C43.8998 34.2105 46 29.593 46 24C46 14.6598 40.1727 8 32 8C23.8273 8 18 14.6598 18 24C18 29.593 20.1002 34.2105 23.5316 37.0269C11.8281 40.0997 8 49.3364 8 54.0236C8 55.0916 8.89514 56 10.0115 56H53.9885C55.1049 56 56 55.0916 56 54.0236C56 49.3364 52.1719 40.0997 40.4684 37.0269ZM22 24C22 16.9346 26.1121 12 32 12C37.8879 12 42 16.9346 42 24C42 31.0654 37.8879 36 32 36C26.1121 36 22 31.0654 22 24ZM12.3165 52C13.4667 47.7341 18.1147 40 32 40C45.8854 40 50.5334 47.7341 51.6836 52H12.3165Z"
      />
    </svg>
  );
}
