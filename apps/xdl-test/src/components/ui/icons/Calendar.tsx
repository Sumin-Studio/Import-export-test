interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Calendar({
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
      viewBox="0 0 64 64"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M52 10H48V6C48 4.89539 47.1045 4 46 4C44.8955 4 44 4.89539 44 6V10H20V6C20 4.89539 19.1045 4 18 4C16.8955 4 16 4.89539 16 6V10H12C10.8955 10 10 10.8954 10 12V48C10 51.3137 12.6863 54 16 54H48C51.3137 54 54 51.3137 54 48V12C54 10.8954 53.1045 10 52 10ZM50 48C50 49.1046 49.1045 50 48 50H16C14.8955 50 14 49.1046 14 48V26H50V48ZM50 22H14V14H50V22Z"
      ></path>
    </svg>
  );
}
