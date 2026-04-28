interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewHeaderSidebarLeft({
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
        d="M52 10H12C10.8955 10 10 10.8955 10 12V52C10 53.1045 10.8955 54 12 54H52C53.1045 54 54 53.1045 54 52V12C54 10.8955 53.1045 10 52 10ZM50 14V22H14V14H50ZM14 26H24V50H14V26ZM28 50V26H50V50H28Z"
      />
    </svg>
  );
}
