interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function PenCompose({
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
        d="M48 38V50C48 53.3137 45.3137 56 42 56H14C10.6863 56 8 53.3137 8 50V22C8 18.6863 10.6863 16 14 16H25.9999C27.1045 16 27.9999 16.8954 27.9999 18C27.9999 19.1046 27.1045 20 25.9999 20H14C12.8954 20 12 20.8954 12 22V50C12 51.1046 12.8954 52 14 52H42C43.1046 52 44 51.1046 44 50V38C44 36.8954 44.8954 36 46 36C47.1046 36 48 36.8954 48 38ZM57.4142 17.8994L38.4824 36.8311C36.7261 38.5875 34.5848 39.9108 32.2285 40.6964L22.6359 43.8939C21.0725 44.4151 19.5849 42.9275 20.1061 41.3641L23.3035 31.7717C24.089 29.4152 25.4124 27.2739 27.1688 25.5175L46.1005 6.58575C46.8817 5.80473 48.1478 5.8046 48.929 6.58575L57.4142 15.0709C58.1953 15.852 58.1953 17.1183 57.4142 17.8994ZM53.1715 16.4852L47.5148 10.8284L29.9972 28.3459C28.6867 29.6564 27.6843 31.2784 27.0982 33.0366L25.1657 38.8342L30.9636 36.9016C32.7217 36.3156 34.3436 35.3131 35.654 34.0027L53.1715 16.4852Z"
      />
    </svg>
  );
}
