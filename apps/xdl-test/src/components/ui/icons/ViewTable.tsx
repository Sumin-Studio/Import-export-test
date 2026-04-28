interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewTable({
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
        d="M52 9.99994H12C10.8955 9.99994 10 10.8953 10 11.9999V51.9999C10 53.1045 10.8955 53.9999 12 53.9999H52C53.1045 53.9999 54 53.1045 54 51.9999V11.9999C54 10.8953 53.1045 9.99994 52 9.99994ZM24 49.9999H14V40H24V49.9999ZM24 36H14V25.9999H24V36ZM50 49.9999H28V40H50V49.9999ZM50 36H28V25.9999H50V36ZM50 22H14V14H50V22Z"
      />
    </svg>
  );
}
