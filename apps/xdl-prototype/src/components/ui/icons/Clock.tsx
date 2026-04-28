interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Clock({
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
        d="M10 2.5C5.8575 2.5 2.5 5.8575 2.5 10C2.5 14.1425 5.8575 17.5 10 17.5C14.1425 17.5 17.5 14.1425 17.5 10C17.5 5.8575 14.1425 2.5 10 2.5ZM10 16.25C6.5475 16.25 3.75 13.4525 3.75 10C3.75 6.5475 6.5475 3.75 10 3.75C13.4525 3.75 16.25 6.5475 16.25 10C16.25 13.4525 13.4525 16.25 10 16.25ZM13.75 10C13.75 10.3452 13.4702 10.625 13.125 10.625H10C9.65483 10.625 9.375 10.3452 9.375 10V6.25C9.375 5.90481 9.65483 5.625 10 5.625C10.3452 5.625 10.625 5.90481 10.625 6.25V9.375H13.125C13.4702 9.375 13.75 9.65481 13.75 10Z"
      ></path>
    </svg>
  );
}
