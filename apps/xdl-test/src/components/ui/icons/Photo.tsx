interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Photo({
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
        d="M54 12H10C8.89551 12 8 12.8955 8 14V50C8 51.1045 8.89551 52 10 52H54C55.1045 52 56 51.1045 56 50V14C56 12.8955 55.1045 12 54 12ZM52 16V43.1719L47.4141 38.5859C46.6328 37.8047 45.3672 37.8047 44.5859 38.5859L38 45.1714L25.4141 32.5859C24.6328 31.8047 23.3672 31.8047 22.5859 32.5859L12 43.1719V16H52ZM51.1718 48H40.8282L46 42.8286L51.1718 48ZM35.1719 48H12.8281L24 36.8286L35.1719 48ZM38 36C42.4111 36 46 32.4111 46 28C46 23.5889 42.4111 20 38 20C33.5889 20 30 23.5889 30 28C30 32.4111 33.5889 36 38 36ZM38 24C40.2061 24 42 25.7944 42 28C42 30.2056 40.2061 32 38 32C35.7939 32 34 30.2056 34 28C34 25.7944 35.7939 24 38 24Z"
      />
    </svg>
  );
}
