interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Footer({
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
      viewBox="0 0 13 13"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M1 11.99998H11.99998V0H12.99998V11.99998C12.99998 12.54548 12.49998 12.99998 11.99998 12.99998H1C0.5 12.99998 0 12.54548 0 11.99998V0H1V11.99998ZM2 10.99998V8H10.99998V10.99998H2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
