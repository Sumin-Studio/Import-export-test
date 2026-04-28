interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PenSign({
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
        d="M56 52C56 53.1046 55.1046 54 54 54H30C28.8955 54 28 53.1046 28 52C28 50.8954 28.8955 50 30 50H54C55.1046 50 56 50.8954 56 52ZM53.4142 19.8994L26.4824 46.8312C24.7261 48.5875 22.5848 49.9109 20.2285 50.6964L10.6359 53.8939C9.07235 54.4148 7.58494 52.9276 8.10608 51.3641L11.3035 41.7717C12.089 39.4152 13.4124 37.2739 15.1688 35.5175L42.1005 8.58575C42.8816 7.80477 44.1477 7.80473 44.9289 8.58575L53.4142 17.071C54.1953 17.852 54.1953 19.1183 53.4142 19.8994ZM49.1715 18.4852L43.5147 12.8284L17.9972 38.3459C16.6868 39.6564 15.6843 41.2784 15.0982 43.0366L13.1657 48.8343L18.9636 46.9016C20.7217 46.3156 22.3436 45.3132 23.654 44.0027L49.1715 18.4852Z"
      />
    </svg>
  );
}
