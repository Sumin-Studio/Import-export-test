interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function EllipsesVertical({
  className,
  fill = "fill-current",
  size = 20,
  width,
  height,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M10 6.25C11.0355 6.25 11.875 5.41053 11.875 4.375C11.875 3.33947 11.0355 2.5 10 2.5C8.96447 2.5 8.125 3.33947 8.125 4.375C8.125 5.41053 8.96447 6.25 10 6.25ZM10 11.875C11.0355 11.875 11.875 11.0355 11.875 10C11.875 8.96447 11.0355 8.125 10 8.125C8.96447 8.125 8.125 8.96447 8.125 10C8.125 11.0355 8.96447 11.875 10 11.875ZM10 17.5C11.0355 17.5 11.875 16.6605 11.875 15.625C11.875 14.5895 11.0355 13.75 10 13.75C8.96447 13.75 8.125 14.5895 8.125 15.625C8.125 16.6605 8.96447 17.5 10 17.5Z"
      ></path>
    </svg>
  );
}
