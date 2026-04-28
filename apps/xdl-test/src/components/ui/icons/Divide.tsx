interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Divide({
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
        d="M52 32C52 33.1046 51.1046 34 50 34H14C12.8954 34 12 33.1046 12 32C12 30.8954 12.8954 30 14 30H50C51.1046 30 52 30.8954 52 32ZM31.9999 22C34.2091 22 35.9999 20.2092 35.9999 18C35.9999 15.7909 34.2091 14 31.9999 14C29.7908 14 27.9999 15.7909 27.9999 18C27.9999 20.2092 29.7908 22 31.9999 22ZM31.9999 42C29.7908 42 27.9999 43.7908 27.9999 46C27.9999 48.2091 29.7908 50 31.9999 50C34.2091 50 35.9999 48.2091 35.9999 46C35.9999 43.7908 34.2091 42 31.9999 42Z"
      />
    </svg>
  );
}
