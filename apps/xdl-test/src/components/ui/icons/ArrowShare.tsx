interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowShare({
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
        d="M52 32V50C52 53.3137 49.3137 56 46 56H18C14.6863 56 12 53.3137 12 50V32C12 28.6863 14.6863 26 18 26H22C23.1045 26 24 26.8954 24 28C24 29.1046 23.1045 30 22 30H18C16.8972 30 16 30.8972 16 32V50C16 51.1028 16.8972 52 18 52H46C47.1028 52 48 51.1028 48 50V32C48 30.8972 47.1028 30 46 30H42C40.8955 30 40 29.1046 40 28C40 26.8954 40.8955 26 42 26H46C49.3137 26 52 28.6863 52 32ZM18.5858 19.4141C19.3669 20.1951 20.6332 20.1951 21.4143 19.4141L30 10.8283V42C30 43.1046 30.8955 44 32 44C33.1045 44 34 43.1046 34 42V10.8283L42.5857 19.4141C43.3668 20.1952 44.6331 20.1952 45.4142 19.4141C46.1952 18.6331 46.1953 17.3666 45.4143 16.5855L33.4142 4.58575C32.6331 3.80475 31.3669 3.80475 30.5858 4.58575L18.5857 16.5854C17.8047 17.3665 17.8048 18.633 18.5858 19.4141Z"
      ></path>
    </svg>
  );
}
