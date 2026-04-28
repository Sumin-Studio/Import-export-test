interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function MessageSolid({
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
        d="M56 12V44C56 45.1 55.1 46 54 46H48V57.9959C48 59.7777 45.8457 60.67 44.5858 59.4102L31.1757 46H10C8.90002 46 8 45.1 8 44V12C8 10.9 8.90002 10 10 10H54C55.1 10 56 10.9 56 12Z"
      ></path>
    </svg>
  );
}
