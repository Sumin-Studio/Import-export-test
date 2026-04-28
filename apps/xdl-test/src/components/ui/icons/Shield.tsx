interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Shield({
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
        d="M52 14C43.0205 14 39.373 12.5449 33.4141 6.58594C32.6328 5.80469 31.3672 5.80469 30.5859 6.58594C24.627 12.5449 20.9795 14 12 14C10.8955 14 10 14.8955 10 16V34C10 47.2788 16.3096 49.9604 22.4121 52.5537C25.2451 53.7578 28.1738 55.0024 30.5859 57.4141C30.9766 57.8047 31.4883 58 32 58C32.5117 58 33.0234 57.8047 33.4141 57.4141C35.8262 55.0024 38.7549 53.7578 41.5879 52.5537C47.6904 49.9604 54 47.2788 54 34V16C54 14.8955 53.1045 14 52 14ZM14 34V17.9727C21.0602 17.7708 25.304 16.3968 30 12.5438V51.8636C27.9795 50.5739 25.8972 49.6886 23.9766 48.8721C18.1846 46.4111 14 44.6328 14 34ZM50 34C50 44.6328 45.8154 46.4111 40.0234 48.8721C38.1028 49.6886 36.0205 50.5739 34 51.8636V12.5438C38.696 16.3968 42.9398 17.7708 50 17.9727V34Z"
      />
    </svg>
  );
}
