interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function FilePDF({
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
      viewBox="0 0 15 15"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M4 6H3V7H4V6ZM8 6V9H7V6H8ZM13.74998 0H1.25C0.625 0 0 0.625 0 1.25V13.75002C0 14.37502 0.625 15.00002 1.25 15.00002H13.74998C14.37498 15.00002 14.99998 14.37502 14.99998 13.75002V1.25C14.99998 0.625 14.37498 0 13.74998 0ZM5 5H2V10.00002H3V8H5V5ZM10 5H12.99998V6H10.99998V7H11.99998V8H10.99998V10.00002H10V5ZM8 5H6V10.00002H8V9H9V6H8V5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
