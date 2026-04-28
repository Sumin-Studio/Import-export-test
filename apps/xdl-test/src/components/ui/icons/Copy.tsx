interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Copy({
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
        d="M16.875 6.875H13.125V3.125C13.125 2.77981 12.8452 2.5 12.5 2.5H3.125C2.77985 2.5 2.5 2.77981 2.5 3.125V12.5C2.5 12.8452 2.77985 13.125 3.125 13.125H6.875V16.875C6.875 17.2202 7.15485 17.5 7.5 17.5H10.8395C11.5025 17.5 12.1384 17.2366 12.6072 16.7678L16.7678 12.6072C17.2366 12.1384 17.5 11.5025 17.5 10.8395V7.5C17.5 7.15481 17.2202 6.875 16.875 6.875ZM7.5 6.875C7.15482 6.875 6.875 7.15482 6.875 7.5V11.875H3.75V3.74998H11.875V6.875H7.5ZM12.5 15.1072V12.5H15.1072L12.5 15.1072ZM16.25 10.625C16.25 10.9702 15.9702 11.25 15.625 11.25H11.5625C11.3899 11.25 11.25 11.3899 11.25 11.5625V15.625C11.25 15.9702 10.9702 16.25 10.625 16.25H8.125V8.125H16.25V10.625Z"
      ></path>
    </svg>
  );
}
