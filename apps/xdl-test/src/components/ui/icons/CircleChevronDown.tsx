interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleChevronDown({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM43.4143 26.5861C44.1954 27.3671 44.1954 28.6335 43.4143 29.4145L33.4142 39.4142C32.6331 40.1953 31.3669 40.1953 30.5858 39.4142L20.5857 29.4145C19.8046 28.6335 19.8046 27.3671 20.5857 26.5861C21.3667 25.8051 22.6332 25.8049 23.4143 26.5859L32 35.1717L40.5857 26.5859C41.3668 25.8049 42.6333 25.8051 43.4143 26.5861Z"
      ></path>
    </svg>
  );
}
