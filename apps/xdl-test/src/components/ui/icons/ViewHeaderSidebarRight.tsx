interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewHeaderSidebarRight({
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
        d="M12 10H52C53.1045 10 54 10.8955 54 12V52C54 53.1045 53.1045 54 52 54H12C10.8955 54 10 53.1045 10 52V12C10 10.8955 10.8955 10 12 10ZM14 14V22H50V14H14ZM50 26H40V50H50V26ZM36 50V26H14V50H36Z"
      />
    </svg>
  );
}
