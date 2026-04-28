interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewTableRow({
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
        d="M52 9.99994H12C10.8955 9.99994 10 10.8953 10 11.9999V51.9999C10 53.1045 10.8955 53.9999 12 53.9999H52C53.1045 53.9999 54 53.1045 54 51.9999V11.9999C54 10.8953 53.1045 9.99994 52 9.99994ZM50 49.9999H14V33.9999H50V49.9999ZM50 29.9999H14V13.9999H50V29.9999ZM18 23.9999V19.9999C18 18.8953 18.8955 17.9999 20 17.9999H44C45.1046 17.9999 46 18.8953 46 19.9999V23.9999C46 25.1045 45.1046 25.9999 44 25.9999H20C18.8955 25.9999 18 25.1045 18 23.9999Z"
      />
    </svg>
  );
}
