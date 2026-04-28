interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function FileWord({
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
      viewBox="0 0 15 16"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M10.99998 0V2H13.99998C14.49998 2 14.99998 2.5 14.99998 3V13.00002C14.99998 14.00002 14.49998 14.00002 13.99998 14.00002H10.99998V16.00002L0 14.00002V2L10.99998 0ZM10.99998 13.00002V3H13.99998V13.00002H10.99998ZM3 5H1.5L3 11.00002H4.5L5.5 7L6.5 11.00002H8L9.5 5H8L7 9.50002L6 5H5L4 9.50002L3 5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
