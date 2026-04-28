interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Comment({
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
        d="M16.875 2.1875H3.125C2.78126 2.1875 2.5 2.46874 2.5 2.8125V12.8125C2.5 13.1562 2.78126 13.4375 3.125 13.4375H9.74239L13.9331 17.6282C14.3268 18.0219 15 17.743 15 17.1862V13.4375H16.875C17.2187 13.4375 17.5 13.1562 17.5 12.8125V2.8125C17.5 2.46874 17.2187 2.1875 16.875 2.1875ZM16.25 12.1875H13.75V15.6774L10.2603 12.1875H3.75V3.4375H16.25V12.1875Z"
      ></path>
    </svg>
  );
}
