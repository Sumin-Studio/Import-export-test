interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Tag({
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
        d="M16 32C16 29.7908 17.7908 28 20 28C22.2092 28 24 29.7908 24 32C24 34.2091 22.2092 36 20 36C17.7908 36 16 34.2091 16 32ZM58 16V48C58 49.1045 57.1045 50 56 50H16C15.3701 50 14.7773 49.7036 14.4004 49.2002L2.40039 33.2002C1.86621 32.4888 1.86621 31.5112 2.40039 30.7998L14.4004 14.7998C14.7773 14.2964 15.3701 14 16 14H56C57.1045 14 58 14.8955 58 16ZM54 18H17L6.5 32L17 46H54V18Z"
      />
    </svg>
  );
}
