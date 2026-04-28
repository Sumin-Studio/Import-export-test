interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewTableColumn({
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
        d="M18 43.9999V19.9999C18 18.8953 18.8954 17.9999 20 17.9999H24C25.1046 17.9999 26 18.8953 26 19.9999V43.9999C26 45.1044 25.1046 45.9999 24 45.9999H20C18.8954 45.9999 18 45.1044 18 43.9999ZM54 11.9999V51.9999C54 53.1045 53.1046 53.9999 52 53.9999H12C10.8954 53.9999 10 53.1045 10 51.9999V11.9999C10 10.8953 10.8954 9.99994 12 9.99994H52C53.1046 9.99994 54 10.8953 54 11.9999ZM30 13.9999H14V49.9999H30V13.9999ZM50 13.9999H34V49.9999H50V13.9999Z"
      />
    </svg>
  );
}
