interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewSidebarLeft({
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
        d="M52 10L12 10C10.8955 10 10 10.8955 10 12L10 52C10 53.1045 10.8955 54 12 54L52 54C53.1045 54 54 53.1045 54 52L54 12C54 10.8955 53.1045 10 52 10ZM14 14L24 14L24 50H14L14 14ZM50 50L28 50L28 14L50 14L50 50Z"
      />
    </svg>
  );
}
