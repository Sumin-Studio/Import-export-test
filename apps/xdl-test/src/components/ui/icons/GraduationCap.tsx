interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function GraduationCap({
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
        d="M62.8945 23.2109L32.8945 8.21094C32.332 7.92969 31.668 7.92969 31.1055 8.21094L1.10547 23.2109C0.427734 23.5498 0 24.2427 0 25C0 25.7573 0.427734 26.4502 1.10547 26.7891L12 32.2363V45C12 51.1685 20.7852 56 32 56C43.2148 56 52 51.1685 52 45V32.2363L62.8945 26.7891C63.5723 26.4502 64 25.7573 64 25C64 24.2427 63.5723 23.5498 62.8945 23.2109ZM48 45C48 48.311 41.4287 52 32 52C22.5713 52 16 48.311 16 45V34.2363L31.1055 41.7891C31.3867 41.9297 31.6934 42 32 42C32.3066 42 32.6133 41.9297 32.8945 41.7891L48 34.2363V45ZM32 37.7642L6.47168 25L32 12.2358L42.5278 17.4998L31.1055 23.2109C30.1172 23.7051 29.7168 24.9062 30.2109 25.8945C30.5615 26.5952 31.2676 27.0005 32.002 27.0005C32.3018 27.0005 32.6074 26.9326 32.8945 26.7891L47.0005 19.7361L57.5283 25L32 37.7642Z"
      ></path>
    </svg>
  );
}
