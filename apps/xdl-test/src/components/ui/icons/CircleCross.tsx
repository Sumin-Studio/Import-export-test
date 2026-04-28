interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleCross({
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
        d="M41.8995 24.9289L34.8284 32L41.8995 39.071C42.6805 39.8521 42.6806 41.1184 41.8995 41.8995C41.1185 42.6805 39.8521 42.6805 39.071 41.8995L32 34.8284L24.929 41.8995C24.1479 42.6805 22.8815 42.6805 22.1005 41.8995C21.3195 41.1185 21.3195 39.8521 22.1005 39.071L29.1716 32L22.1005 24.9289C21.3195 24.1479 21.3195 22.8815 22.1005 22.1005C22.8816 21.3194 24.1479 21.3195 24.929 22.1005L32 29.1716L39.071 22.1005C39.8522 21.3194 41.1185 21.3195 41.8995 22.1005C42.6805 22.8815 42.6806 24.1478 41.8995 24.9289ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32Z"
      ></path>
    </svg>
  );
}
