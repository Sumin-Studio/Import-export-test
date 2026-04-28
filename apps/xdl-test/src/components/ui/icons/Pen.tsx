interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Pen({
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
        d="M55.4142 17.071L46.929 8.58575C46.1478 7.80478 44.8815 7.80471 44.1005 8.58575L17.1687 35.5175C15.4124 37.2739 14.089 39.4152 13.3035 41.7717L10.1061 51.3641C9.58491 52.9278 11.0721 54.4149 12.6359 53.8939L22.2284 50.6964C24.5849 49.9109 26.7261 48.5875 28.4825 46.8312L55.4142 19.8994C56.1954 19.1183 56.1954 17.852 55.4142 17.071ZM25.654 44.0027C24.3437 45.3132 22.7217 46.3156 20.9635 46.9016L15.1657 48.8342L17.0982 43.0366C17.6842 41.2784 18.6868 39.6564 19.9972 38.3459L45.5148 12.8284L51.1716 18.4852L25.654 44.0027Z"
      />
    </svg>
  );
}
