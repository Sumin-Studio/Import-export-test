interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CaretLeft({
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
        d="M40 18V46C40 47.7927 37.8345 48.6627 36.5859 47.4141L22.5859 33.4141C21.8047 32.6328 21.8047 31.3672 22.5859 30.586L36.5859 16.586C37.8424 15.3274 40 16.2216 40 18Z"
      ></path>
    </svg>
  );
}
