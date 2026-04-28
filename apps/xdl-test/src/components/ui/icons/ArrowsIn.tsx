interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowsIn({
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
        d="M34 28V14C34 12.8955 34.8955 12 36 12C37.1045 12 38 12.8955 38 14V23.1719L52.5859 8.58592C53.3662 7.80469 54.6338 7.80469 55.4141 8.58592C56.1953 9.36717 56.1953 10.6328 55.4141 11.414L40.8281 26H50C51.1045 26 52 26.8955 52 28C52 29.1045 51.1045 30 50 30H36C34.8954 30 34 29.1046 34 28ZM11.4141 55.414L26 40.8281V50C26 51.1045 26.8955 52 28 52C29.1045 52 30 51.1045 30 50V36C30 34.8954 29.1046 34 28 34H14C12.8955 34 12 34.8955 12 36C12 37.1045 12.8955 38 14 38H23.1719L8.58594 52.5859C7.80469 53.3672 7.80469 54.6328 8.58594 55.414C9.36618 56.1953 10.6338 56.1953 11.4141 55.414Z"
      ></path>
    </svg>
  );
}
