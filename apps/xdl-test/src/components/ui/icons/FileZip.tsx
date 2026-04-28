interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function FileZip({
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
        d="M10.99998 6H10V7H10.99998V6ZM1.25 0H13.74998C14.37498 0 14.99998 0.625 14.99998 1.25V13.75002C14.99998 14.37502 14.37498 15.00002 13.74998 15.00002H1.25C0.625 15.00002 0 14.37502 0 13.75002V1.25C0 0.625 0.625 0 1.25 0ZM9 5H11.99998V8H10V10.00002H9V5ZM6 5H3V6H5V7H4V8H3V10.00002H6V9H4V8H5V7H6V5ZM7 5H8V10.00002H7V5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
