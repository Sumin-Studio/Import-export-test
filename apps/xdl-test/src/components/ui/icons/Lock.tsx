interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Lock({
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
        d="M50 22H44V16C44 9.3833 38.6167 4 32 4C25.3833 4 20 9.3833 20 16V22H14C12.8955 22 12 22.8955 12 24V54C12 55.1045 12.8955 56 14 56H50C51.1045 56 52 55.1045 52 54V24C52 22.8955 51.1045 22 50 22ZM24 16C24 11.5889 27.5889 8 32 8C36.4111 8 40 11.5889 40 16V22H24V16ZM48 52H16V26H48V52ZM36 36C36 37.4768 35.1907 38.7523 34 39.4452V44C34 45.1045 33.1045 46 32 46C30.8955 46 30 45.1045 30 44V39.4452C28.8093 38.7523 28 37.4768 28 36C28 33.7908 29.7908 32 32 32C34.2092 32 36 33.7908 36 36Z"
      ></path>
    </svg>
  );
}
