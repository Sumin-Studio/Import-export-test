interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function LockOpen({
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
        d="M50 22H24V14C24 9.58887 27.5889 6 32 6C36.4111 6 40 9.58887 40 14C40 15.1045 40.8955 16 42 16C43.1045 16 44 15.1045 44 14C44 7.3833 38.6167 2 32 2C25.3833 2 20 7.3833 20 14V22H14C12.8955 22 12 22.8955 12 24V54C12 55.1045 12.8955 56 14 56H50C51.1045 56 52 55.1045 52 54V24C52 22.8955 51.1045 22 50 22ZM48 52H16V26H48V52ZM28 36C28 33.7908 29.7908 32 32 32C34.2092 32 36 33.7908 36 36C36 37.4768 35.1907 38.7523 34 39.4452V44C34 45.1045 33.1045 46 32 46C30.8955 46 30 45.1045 30 44V39.4452C28.8093 38.7523 28 37.4768 28 36Z"
      ></path>
    </svg>
  );
}
