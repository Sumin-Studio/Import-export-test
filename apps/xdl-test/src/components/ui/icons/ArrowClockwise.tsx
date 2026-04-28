interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowClockwise({
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
        d="M63.4097 30.4189L55.3608 38.4189C54.5761 39.1986 53.3099 39.1914 52.5327 38.4102L44.5815 30.4102C43.8027 29.626 43.8066 28.3604 44.5903 27.5811C45.373 26.8018 46.6396 26.8066 47.4185 27.5898L51.9919 32.1917C51.9926 32.1282 52 32.0633 52 32C52 20.9717 43.0278 12 32 12C20.9722 12 12 20.9717 12 32C12 43.0283 20.9722 52 32 52C36.769 52 41.3901 50.2891 45.0117 47.1816C45.8491 46.4609 47.1118 46.5586 47.832 47.3965C48.5513 48.2354 48.4546 49.498 47.6162 50.2168C43.27 53.9463 37.7241 56 32 56C18.7661 56 8 45.2334 8 32C8 18.7666 18.7661 8 32 8C45.2339 8 56 18.7666 56 32C56 32.0497 55.994 32.1005 55.9937 32.1503L60.5903 27.5811C61.373 26.8018 62.6396 26.8066 63.4185 27.5898C64.1973 28.373 64.1934 29.6396 63.4097 30.4189Z"
      ></path>
    </svg>
  );
}
