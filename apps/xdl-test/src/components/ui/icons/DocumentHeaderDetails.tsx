interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DocumentHeaderDetails({
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
        d="M50 8H14C12.8954 8 12 8.89539 12 10V54C12 55.1046 12.8954 56 14 56H50C51.1046 56 52 55.1046 52 54V10C52 8.89539 51.1046 8 50 8ZM48 52H16V24H48V52ZM48 20H16V12H48V20ZM38 30C38 28.8954 38.8954 28 40 28H42C43.1046 28 44 28.8954 44 30C44 31.1046 43.1046 32 42 32H40C38.8954 32 38 31.1046 38 30ZM38 38C38 36.8954 38.8954 36 40 36H42C43.1046 36 44 36.8954 44 38C44 39.1046 43.1046 40 42 40H40C38.8954 40 38 39.1046 38 38ZM20 30C20 28.8954 20.8954 28 22 28H32C33.1046 28 34 28.8954 34 30C34 31.1046 33.1046 32 32 32H22C20.8954 32 20 31.1046 20 30ZM20 38C20 36.8954 20.8954 36 22 36H32C33.1046 36 34 36.8954 34 38C34 39.1046 33.1046 40 32 40H22C20.8954 40 20 39.1046 20 38Z"
      />
    </svg>
  );
}
