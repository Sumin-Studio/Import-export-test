interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Column({
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
        d="M30 11.9999V51.9999C30 53.1045 29.1046 53.9999 28 53.9999H12C10.8954 53.9999 10 53.1045 10 51.9999V11.9999C10 10.8953 10.8954 9.99994 12 9.99994H28C29.1046 9.99994 30 10.8953 30 11.9999ZM54 11.9999V51.9999C54 53.1045 53.1046 53.9999 52 53.9999H36C34.8954 53.9999 34 53.1045 34 51.9999V11.9999C34 10.8953 34.8954 9.99994 36 9.99994H52C53.1046 9.99994 54 10.8953 54 11.9999ZM50 13.9999H38V49.9999H50V13.9999Z"
      ></path>
    </svg>
  );
}
