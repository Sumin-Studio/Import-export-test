interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function FileSpreadsheet({
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
        d="M4 6H6V7H4V6ZM6 9V8H4V9H6ZM6 9.99995V10.99995H4V9.99995H6ZM10.99998 9.99995H7V10.99995H10.99998V9.99995ZM7 8H10.99998V9H7V8ZM10.99998 6H7V7H10.99998V6ZM13.99998 0H1C0.5 0 0 0.5 0 1V13.99995C0 14.49995 0.5 14.99995 1 14.99995H13.99998C14.49998 14.99995 14.99998 14.49995 14.99998 13.99995V1C14.99998 0.5 14.49998 0 13.99998 0ZM3 5V11.99995H11.99998V5H3Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
