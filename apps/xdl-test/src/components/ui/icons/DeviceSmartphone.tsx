interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DeviceSmartphone({
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
        d="M40 46C40 47.1046 39.1046 48 38 48H26C24.8954 48 24 47.1046 24 46C24 44.8954 24.8954 44 26 44H38C39.1046 44 40 44.8954 40 46ZM48 14V50C48 53.3137 45.3137 56 42 56H22C18.6863 56 16 53.3137 16 50V14C16 10.6863 18.6863 8 22 8H42C45.3137 8 48 10.6863 48 14ZM44 14C44 12.8954 43.1046 12 42 12H22C20.8954 12 20 12.8954 20 14V50C20 51.1046 20.8954 52 22 52H42C43.1046 52 44 51.1046 44 50V14Z"
      />
    </svg>
  );
}
