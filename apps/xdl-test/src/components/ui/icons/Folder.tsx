interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Folder({
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
        d="M50 15.9999H34.4719C33.7144 15.9999 33.0219 15.572 32.683 14.8944L30.8942 11.3167C29.8779 9.284 27.8003 7.99994 25.5276 7.99994H14C10.6863 7.99994 8 10.6863 8 13.9999V48C8 51.3137 10.6863 54 14 54H50C53.3137 54 56 51.3137 56 48V21.9999C56 18.6863 53.3137 15.9999 50 15.9999ZM14 11.9999H25.5276C26.2852 11.9999 26.9777 12.428 27.3165 13.1055L29.1053 16.6832C30.1217 18.7159 32.1993 19.9999 34.4719 19.9999H50C51.1046 19.9999 52 20.8954 52 21.9999V24.3488C51.3736 24.127 50.7024 24 50 24H14C13.2976 24 12.6264 24.127 12 24.3488V13.9999C12 12.8954 12.8954 11.9999 14 11.9999ZM52 48C52 49.103 51.103 50 50 50H14C12.897 50 12 49.103 12 48V30C12 28.897 12.897 28 14 28H50C51.103 28 52 28.897 52 30V48Z"
      ></path>
    </svg>
  );
}
