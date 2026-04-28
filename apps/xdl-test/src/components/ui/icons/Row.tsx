interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Row({
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
        d="M54 11.9999V27.9999C54 29.1045 53.1046 29.9999 52 29.9999H12C10.8954 29.9999 10 29.1045 10 27.9999V11.9999C10 10.8954 10.8954 9.99994 12 9.99994H52C53.1046 9.99994 54 10.8954 54 11.9999ZM54 35.9999V51.9999C54 53.1045 53.1046 53.9999 52 53.9999H12C10.8954 53.9999 10 53.1045 10 51.9999V35.9999C10 34.8954 10.8954 33.9999 12 33.9999H52C53.1046 33.9999 54 34.8954 54 35.9999ZM50.0001 37.9999H14.0001V49.9999H50.0001V37.9999Z"
      />
    </svg>
  );
}
