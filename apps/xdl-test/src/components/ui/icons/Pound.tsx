interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Pound({
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
        d="M49 52C49 53.1045 48.1045 54 47 54H17C16.0264 54 15.1943 53.2998 15.0293 52.3398C14.8633 51.3809 15.4121 50.4424 16.3291 50.1162C16.5537 50.0342 22 47.9883 22 43C22 39.1408 21.2017 36.4631 20.3241 34H15C13.8955 34 13 33.1045 13 32C13 30.8955 13.8955 30 15 30H18.9313C18.3981 28.235 18 26.3094 18 24C18 17.1182 23.6104 10 33 10C40.8711 10 45.374 15.5156 45.5615 15.751C46.252 16.6133 46.1123 17.8721 45.249 18.5615C44.3906 19.249 43.1338 19.1123 42.4434 18.2559C42.2832 18.0596 38.8828 14 33 14C26.1143 14 22 19.084 22 24C22 26.3027 22.4875 28.1215 23.1366 30H41C42.1045 30 43 30.8955 43 32C43 33.1045 42.1045 34 41 34H24.55C25.3333 36.4042 26 39.2173 26 43C26 46.0234 24.8086 48.3164 23.3271 50H47C48.1045 50 49 50.8955 49 52Z"
      />
    </svg>
  );
}
