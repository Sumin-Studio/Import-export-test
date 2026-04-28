interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Paperclip({
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
        d="M46 22V46C46 54.1123 40.1123 60 32 60C23.8877 60 18 54.1123 18 46V14.5C18 8.41602 22.416 4 28.5 4C34.584 4 39 8.41602 39 14.5V41C39 45.0562 36.0557 48 32 48C27.9443 48 25 45.0562 25 41V22C25 20.8955 25.8955 20 27 20C28.1045 20 29 20.8955 29 22V41C29 42.8223 30.1777 44 32 44C33.8223 44 35 42.8223 35 41V14.5C35 10.6729 32.3271 8 28.5 8C24.6729 8 22 10.6729 22 14.5V46C22 51.8877 26.1123 56 32 56C37.8877 56 42 51.8877 42 46V22C42 20.8955 42.8955 20 44 20C45.1045 20 46 20.8955 46 22Z"
      ></path>
    </svg>
  );
}
