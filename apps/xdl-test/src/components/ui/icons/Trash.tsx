interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Trash({
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
        d="M54 14H42V8C42 6.89539 41.1046 6 40 6H24C22.8954 6 22 6.89539 22 8V14H10C8.89545 14 8 14.8954 8 16V26C8 27.1046 8.89545 28 10 28H12.2653L16.0203 54.2828C16.1611 55.2681 17.0049 56 18.0002 56H45.9998C46.9951 56 47.8389 55.2681 47.9797 54.2828L51.7347 28H54C55.1046 28 56 27.1046 56 26V16C56 14.8954 55.1046 14 54 14ZM26 13.8928V10H38V13.8928C38 13.929 38.0073 13.964 38.0091 14H25.9909C25.9927 13.964 26 13.929 26 13.8928ZM19.7344 52L16.3062 28H23.9972L25.3076 52H19.7344ZM34.6862 52H29.3136L28.0032 28H35.9972L34.6862 52ZM44.2656 52H38.6923L40.0032 28H47.6938L44.2656 52ZM52 24H12V18H52V24Z"
      />
    </svg>
  );
}
