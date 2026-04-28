interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Archive({
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
        d="M26 36C26 34.8954 26.8954 34 28 34H36C37.1046 34 38 34.8954 38 36C38 37.1046 37.1046 38 36 38H28C26.8954 38 26 37.1046 26 36ZM56 12V26C56 27.1046 55.1046 28 54 28H52V54C52 55.1046 51.1046 56 50 56H14C12.8954 56 12 55.1046 12 54V28H10C8.89545 28 8 27.1046 8 26V12C8 10.8954 8.89545 10 10 10H54C55.1046 10 56 10.8954 56 12ZM48 28H16V52H48V28ZM52 14H12V24H52V14Z"
      ></path>
    </svg>
  );
}
