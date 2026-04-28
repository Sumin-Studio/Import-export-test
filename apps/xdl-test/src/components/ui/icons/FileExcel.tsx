interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function FileExcel({
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
        d="M10.99998 2V0L0 2V14.00002L10.99998 16.00002V14.00002H13.99998C14.49998 14.00002 14.99998 14.00002 14.99998 13.00002V3C14.99998 2.5 14.49998 2 13.99998 2H10.99998ZM13.99998 3H10.99998V13.00002H13.99998V3ZM3 5H4.5L5.5 6.71429L6.5 5H8L6.25 8L8 11.00002H6.5L5.5 9.28571L4.5 11.00002H3L4.75 8L3 5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
