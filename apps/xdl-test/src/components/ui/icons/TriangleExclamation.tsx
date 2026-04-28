interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function TriangleExclamation({
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
        d="M34.9999 44C34.9999 45.6568 33.6568 47 31.9999 47C30.3431 47 28.9999 45.6568 28.9999 44C28.9999 42.3431 30.3431 41 31.9999 41C33.6568 41 34.9999 42.3431 34.9999 44ZM57.997 54H6.00287C4.46332 54 3.50116 52.3333 4.27093 51L30.2679 5.97173C31.0377 4.63841 32.9622 4.63841 33.732 5.97173L59.7289 51C60.4987 52.3333 59.5366 54 57.997 54ZM54.5329 50L31.9999 10.9717L9.46698 50H54.5329ZM29.4999 22V28C29.4999 28.0415 29.5009 28.083 29.5038 28.125L30.0038 36.125C30.0693 37.1787 30.9443 38 31.9999 38C33.0556 38 33.9306 37.1787 33.996 36.125L34.496 28.125C34.499 28.083 34.4999 28.0415 34.4999 28V22C34.4999 20.8955 33.6044 20 32.4999 20H31.4999C30.3954 20 29.4999 20.8955 29.4999 22Z"
      />
    </svg>
  );
}
