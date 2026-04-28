interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleArrowDown({
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
        d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 21.6295 19.8937 13.1047 30 12.101V37.1717L21.4142 28.5859C20.6332 27.8049 19.3669 27.8049 18.5858 28.5859C17.8048 29.367 17.8046 30.6335 18.5857 31.4146L30.5858 43.4142C31.3669 44.1953 32.6331 44.1953 33.4142 43.4142L45.4143 31.4146C46.1954 30.6335 46.1954 29.3671 45.4144 28.5861C44.6333 27.805 43.3668 27.8049 42.5858 28.5859L34 37.1717V12.101C44.1063 13.1047 52 21.6295 52 32C52 43.0457 43.0457 52 32 52Z"
      ></path>
    </svg>
  );
}
