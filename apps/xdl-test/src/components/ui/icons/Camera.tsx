interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Camera({
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
        d="M50 16H45.2363L42.8945 11.3164C41.8711 9.27051 39.8154 8 37.5283 8H26.4717C24.1846 8 22.1289 9.27051 21.1055 11.3164L18.7637 16H14C10.6914 16 8 18.6914 8 22V46C8 49.3086 10.6914 52 14 52H50C53.3086 52 56 49.3086 56 46V22C56 18.6914 53.3086 16 50 16ZM52 46C52 47.1046 51.1045 48 50 48H14C12.8955 48 12 47.1046 12 46V22C12 20.8954 12.8955 20 14 20H21.2363L24.6836 13.1055C25.0223 12.428 25.7148 12 26.4723 12H37.5283C38.2854 12 38.9775 12.4277 39.3162 13.1049L42.7637 20H50C51.1045 20 52 20.8954 52 22V46ZM32 21C25.9346 21 21 25.9346 21 32C21 38.0654 25.9346 43 32 43C38.0654 43 43 38.0654 43 32C43 25.9346 38.0654 21 32 21ZM32 39C28.1406 39 25 35.8599 25 32C25 28.1401 28.1406 25 32 25C35.8594 25 39 28.1401 39 32C39 35.8599 35.8594 39 32 39Z"
      />
    </svg>
  );
}
