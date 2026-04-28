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
        d="M59.7289 51L33.732 5.97173C32.9622 4.63841 31.0377 4.63841 30.2679 5.97173L4.27093 51C3.50116 52.3333 4.46332 54 6.00287 54H57.997C59.5366 54 60.4987 52.3333 59.7289 51ZM29.4999 22C29.4999 20.8955 30.3954 20 31.4999 20H32.4999C33.6044 20 34.4999 20.8955 34.4999 22V28C34.4999 28.0415 34.499 28.083 34.496 28.125L33.996 36.125C33.9306 37.1787 33.0556 38 31.9999 38C30.9443 38 30.0693 37.1787 30.0038 36.125L29.5038 28.125C29.5009 28.083 29.4999 28.0415 29.4999 28V22ZM31.9999 47C30.3431 47 28.9999 45.6568 28.9999 44C28.9999 42.3431 30.3431 41 31.9999 41C33.6568 41 34.9999 42.3431 34.9999 44C34.9999 45.6568 33.6568 47 31.9999 47Z"
      />
    </svg>
  );
}
