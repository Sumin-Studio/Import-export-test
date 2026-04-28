interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewSidebarRight({
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
        d="M12 54L52 54C53.1045 54 54 53.1045 54 52L54 12C54 10.8955 53.1045 10 52 10L12 10C10.8955 10 10 10.8955 10 12L10 52C10 53.1045 10.8955 54 12 54ZM50 50L40 50L40 14L50 14L50 50ZM14 14L36 14L36 50L14 50L14 14Z"
      />
    </svg>
  );
}
