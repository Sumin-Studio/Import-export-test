interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Home({
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
        d="M57.9999 32.3282C57.9999 31.2673 57.5785 30.2499 56.8284 29.4998L33.4142 6.08594C32.6332 5.30487 31.3668 5.30487 30.5858 6.08594L7.17163 29.4998C6.42145 30.25 6 31.2674 6 32.3283V38C6 39.1046 6.89545 39.9999 8 40L12 40.0001V53.9999C12 55.1045 12.8954 55.9999 14 55.9999L25.9999 55.9999C27.1045 55.9999 27.9999 55.1044 27.9999 53.9999V39.9999H35.9999V53.9999C35.9999 55.1044 36.8954 55.9999 37.9999 55.9999L50 55.9999C51.1046 55.9999 52 55.1045 52 53.9999V40L56 39.9999C57.1046 39.9999 58 39.1046 58 37.9999L57.9999 32.3282ZM54 35.9999L48 36V52H40V36H24V52H16V36L10 35.9999V32.3281L32 10.3286L54 32.3281V35.9999Z"
      ></path>
    </svg>
  );
}
