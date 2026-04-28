interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Cross({
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
        d="M46.1422 43.3137C46.9232 44.0947 46.9232 45.3611 46.1422 46.1421C45.3611 46.9231 44.0948 46.9231 43.3137 46.1421L32 34.8284L20.6863 46.1421C19.9053 46.9231 18.6389 46.9231 17.8578 46.1421C17.0768 45.3611 17.0768 44.0947 17.8578 43.3137L29.1716 32L17.8578 20.6863C17.0768 19.9052 17.0768 18.6389 17.8578 17.8578C18.6389 17.0768 19.9052 17.0768 20.6863 17.8578L32 29.1716L43.3137 17.8578C44.0947 17.0768 45.3611 17.0768 46.1422 17.8578C46.9232 18.6389 46.9232 19.9052 46.1422 20.6863L34.8284 32L46.1422 43.3137Z"
      />
    </svg>
  );
}
