interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PlaybackFastForward({
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
        d="M57.0742 30.3125L35.0742 16.3125C33.7442 15.4665 32 16.4237 32 18V28.3562L13.0742 16.3125C11.7442 15.4665 10 16.4237 10 18V46C10 47.5887 11.755 48.5263 13.0742 47.6875L32 35.6438V46C32 47.5887 33.755 48.5263 35.0742 47.6875L57.0742 33.6875C58.3072 32.9017 58.3072 31.0983 57.0742 30.3125ZM14 42.3564V21.6436L30.2744 32L14 42.3564ZM36 42.3564V21.6436L52.2744 32L36 42.3564Z"
      />
    </svg>
  );
}
