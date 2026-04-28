interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function FileCSV({
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
        d="M13.74998 0H1.25C0.625 0 0 0.625 0 1.25V13.75002C0 14.37502 0.625 15.00002 1.25 15.00002H13.74998C14.37498 15.00002 14.99998 14.37502 14.99998 13.75002V1.25C14.99998 0.625 14.37498 0 13.74998 0ZM5 5H2V10.00002H5V9H3V6H5V5ZM9.99998 5H10.99998V9H9.99998V5ZM11.99998 9V10.00002H10.99998V9H11.99998ZM11.99998 9V5H12.99998V9H11.99998ZM9 5H6V7H7V8H8V9H6V10.00002H9V8H8V7H7V6H9V5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
