interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleArrowRight({
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
        d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8ZM32 52C21.6295 52 13.1047 44.1063 12.101 34H37.1717L28.5859 42.5858C27.8049 43.3668 27.8049 44.6331 28.5859 45.4142C29.367 46.1953 30.6335 46.1954 31.4146 45.4143L43.4142 33.4142C44.1953 32.6331 44.1953 31.3668 43.4142 30.5858L31.4146 18.5857C30.6335 17.8046 29.3672 17.8046 28.5861 18.5856C27.8051 19.3667 27.8049 20.6332 28.5859 21.4142L37.1717 30H12.101C13.1047 19.8937 21.6295 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52Z"
      ></path>
    </svg>
  );
}
