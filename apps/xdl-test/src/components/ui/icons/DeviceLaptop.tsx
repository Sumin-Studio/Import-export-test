interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DeviceLaptop({
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
        d="M61.4141 48.5859L54 41.1719V14C54 12.8955 53.1045 12 52 12H12C10.8955 12 10 12.8955 10 14V41.1719L2.58594 48.5859C2.01368 49.1577 1.84278 50.0181 2.15235 50.7651C2.46192 51.5127 3.19092 52 4.00001 52H60C60.8091 52 61.5381 51.5127 61.8477 50.7651C62.1572 50.0181 61.9863 49.1577 61.4141 48.5859ZM14 16H50V40H14V16ZM8.82862 48L12.8286 44H51.1714L55.1714 48H8.82862ZM46.0001 21.9999V23.9999C46.0001 25.1045 45.1046 25.9999 44.0001 25.9999H42.0001C40.8955 25.9999 40.0001 25.1045 40.0001 23.9999V21.9999C40.0001 20.8953 40.8955 19.9999 42.0001 19.9999H44.0001C45.1046 19.9999 46.0001 20.8953 46.0001 21.9999ZM46.0001 31.9999V33.9999C46.0001 35.1045 45.1046 35.9999 44.0001 35.9999H42.0001C40.8955 35.9999 40.0001 35.1045 40.0001 33.9999V31.9999C40.0001 30.8953 40.8955 29.9999 42.0001 29.9999H44.0001C45.1046 29.9999 46.0001 30.8953 46.0001 31.9999Z"
      />
    </svg>
  );
}
