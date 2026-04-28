interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Telephone({
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
        d="M54.5498 38.0771L40.5498 34.0771C39.5986 33.8047 38.5986 34.2671 38.1846 35.1611L36.0615 39.7544C31.1709 36.935 27.0654 32.8296 24.2461 27.9375L28.8389 25.8154C29.7334 25.4023 30.1943 24.3984 29.9229 23.4507L25.9229 9.45067C25.6475 8.48876 24.6982 7.87547 23.7168 8.02001L9.7168 10.02C8.73145 10.1606 8 11.0049 8 12C8 36.2617 27.7383 56 52 56C52.9951 56 53.8389 55.2681 53.9795 54.2827L55.9795 40.2827C56.1211 39.2934 55.5107 38.3515 54.5498 38.0771ZM50.2705 51.9629C29.5859 51.0796 12.9199 34.414 12.0371 13.7295L22.5557 12.2265L25.6064 22.9028L20.6455 25.1948C19.6247 25.6665 19.1937 26.8857 19.6904 27.8945C23.1855 34.9858 29.0146 40.8154 36.1055 44.3096C37.1215 44.8093 38.3378 44.367 38.8047 43.3545L41.0977 38.3935L51.7734 41.4438L50.2705 51.9629Z"
      />
    </svg>
  );
}
