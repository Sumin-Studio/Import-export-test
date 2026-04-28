interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Note({
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
        d="M52 10H12C10.8954 10 10 10.8954 10 12V52C10 53.1046 10.8954 54 12 54H32.6863C34.808 54 36.8428 53.1571 38.3431 51.6569L51.6569 38.3431C53.1572 36.8428 54 34.808 54 32.6863V12C54 10.8954 53.1046 10 52 10ZM38 46.3431V38H46.3431L38 46.3431ZM50 32C50 33.1046 49.1046 34 48 34H36C34.8954 34 34 34.8954 34 36V48C34 49.1046 33.1046 50 32 50H14V14H50V32Z"
      ></path>
    </svg>
  );
}
