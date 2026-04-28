interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DeviceTablet({
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
        d="M46 8H18C14.6863 8 12 10.6863 12 14V50C12 53.3137 14.6863 56 18 56H46C49.3137 56 52 53.3137 52 50V14C52 10.6863 49.3137 8 46 8ZM48 50C48 51.1046 47.1046 52 46 52H18C16.8954 52 16 51.1046 16 50V14C16 12.8954 16.8954 12 18 12H46C47.1046 12 48 12.8954 48 14V50ZM40 46C40 47.1046 39.1046 48 38 48H26C24.8954 48 24 47.1046 24 46C24 44.8954 24.8954 44 26 44H38C39.1046 44 40 44.8954 40 46Z"
      />
    </svg>
  );
}
