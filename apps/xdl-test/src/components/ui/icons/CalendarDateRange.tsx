interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CalendarDateEnd({
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
      />
      <path
        className={fill}
        d="M46 31.9999V35.9999C46 37.1046 45.1046 37.9999 44 37.9999H36V43.9999C36 45.1046 35.1046 45.9999 34 45.9999H20C18.8955 45.9999 18 45.1046 18 43.9999V39.9999C18 38.8954 18.8955 37.9999 20 37.9999H28V31.9999C28 30.8954 28.8955 29.9999 30 29.9999H44C45.1046 29.9999 46 30.8954 46 31.9999Z"
      />
    </svg>
  );
}
