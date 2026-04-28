interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleUser({
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
        d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8ZM20.0112 47.9811C20.129 41.5458 24.3696 38 32 38C39.6304 38 43.8704 41.5463 43.9881 47.9817C40.645 50.4935 36.5035 52 32 52C27.4962 52 23.3544 50.4933 20.0112 47.9811ZM26 27C26 22.813 28.4111 20 32 20C35.5889 20 38 22.813 38 27C38 31.187 35.5889 34 32 34C28.4111 34 26 31.187 26 27ZM47.5878 44.5148C46.5756 40.1078 43.6843 36.7245 39.0079 35.0879C40.8843 33.1315 42 30.315 42 27C42 20.5786 37.8376 16 32 16C26.1624 16 22 20.5786 22 27C22 30.315 23.1158 33.1315 24.9922 35.0879C20.3158 36.7245 17.4244 40.1078 16.4122 44.5148C13.657 41.0875 12 36.7396 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 36.7396 50.343 41.0875 47.5878 44.5148Z"
      ></path>
    </svg>
  );
}
