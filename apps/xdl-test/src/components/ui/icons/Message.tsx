interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Message({
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
        d="M54 10H10C8.90002 10 8 10.9 8 12V44C8 45.1 8.90002 46 10 46H31.1757L44.5858 59.4102C45.8457 60.67 48 59.7777 48 57.9959V46H54C55.1 46 56 45.1 56 44V12C56 10.9 55.1 10 54 10ZM52 42H44V53.1675L32.833 42H12V14H52V42Z"
      ></path>
    </svg>
  );
}
