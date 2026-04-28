interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowPopOut({
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
        d="M48 38V50C48 53.3137 45.3137 56 42 56H14C10.6863 56 8 53.3137 8 50V22C8 18.6863 10.6863 16 14 16H26C27.1045 16 28 16.8954 28 18C28 19.1046 27.1045 20 26 20H14C12.8955 20 12 20.8954 12 22V50C12 51.1046 12.8955 52 14 52H42C43.1045 52 44 51.1046 44 50V38C44 36.8954 44.8955 36 46 36C47.1045 36 48 36.8954 48 38ZM55.9998 10.0002C55.9998 8.89569 55.1042 8.00031 53.9998 8.00031L36 8C34.8955 7.99994 34 8.89539 34 10C34 11.1046 34.8955 12.0002 36 12.0002H49.1714L26.5859 34.5858C25.8048 35.3668 25.8048 36.6331 26.5859 37.4142C27.3669 38.1952 28.6333 38.1952 29.4143 37.4142L51.9998 14.8287V28C51.9998 29.1046 52.8953 30 53.9998 30C55.1044 30 56 29.1046 56 27.9999L55.9998 10.0002Z"
      ></path>
    </svg>
  );
}
