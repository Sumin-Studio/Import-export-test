interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Check({
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
        d="M42 28C42 26.8954 42.8954 26 44 26H48C49.1046 26 50 26.8954 50 28C50 29.1046 49.1046 30 48 30H44C42.8954 30 42 29.1046 42 28ZM48 38H34C32.8954 38 32 38.8954 32 40C32 41.1046 32.8954 42 34 42H48C49.1046 42 50 41.1046 50 40C50 38.8954 49.1046 38 48 38ZM58 16V48C58 49.1046 57.1045 50 56 50H8C6.89545 50 6 49.1046 6 48V16C6 14.8954 6.89545 14 8 14H56C57.1045 14 58 14.8954 58 16ZM54 18H10V46H54V18ZM16 30H34C35.1046 30 36 29.1046 36 28C36 26.8954 35.1046 26 34 26H16C14.8954 26 14 26.8954 14 28C14 29.1046 14.8954 30 16 30Z"
      ></path>
    </svg>
  );
}
