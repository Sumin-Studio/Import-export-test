interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowAnticlockwise({
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
        d="M56 32c0 13.233-10.766 24-24 24a24 24 0 0 1-15.616-5.783 2 2 0 1 1 2.604-3.035A20 20 0 0 0 32 52c11.028 0 20-8.972 20-20s-8.972-20-20-20-20 8.972-20 20c0 .063.008.128.008.192l4.574-4.602a2.001 2.001 0 0 1 2.837 2.82l-7.952 8a2 2 0 0 1-2.828.009l-8.049-8a2 2 0 0 1 2.82-2.838l4.596 4.57C8.006 32.1 8 32.05 8 32 8 18.767 18.766 8 32 8s24 10.767 24 24"
      ></path>
    </svg>
  );
}
