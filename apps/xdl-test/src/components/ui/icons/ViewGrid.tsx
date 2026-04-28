interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewGrid({
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
        d="M52 10H12C10.8954 10 10 10.8954 10 12V52C10 53.1046 10.8954 54 12 54H52C53.1046 54 54 53.1046 54 52V12C54 10.8954 53.1046 10 52 10ZM30 50H14V34H30V50ZM30 30H14V14H30V30ZM50 50H34V34H50V50ZM50 30H34V14H50V30Z"
      />
    </svg>
  );
}
